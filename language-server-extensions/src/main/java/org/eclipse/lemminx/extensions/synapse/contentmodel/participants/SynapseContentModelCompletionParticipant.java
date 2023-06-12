/*
Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
* WSO2 Inc. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/

package org.eclipse.lemminx.extensions.synapse.contentmodel.participants;

import com.google.gson.JsonObject;
import org.eclipse.lemminx.commons.BadLocationException;
import org.eclipse.lemminx.dom.DOMAttr;
import org.eclipse.lemminx.dom.DOMDocument;
import org.eclipse.lemminx.dom.DOMElement;
import org.eclipse.lemminx.extensions.contentmodel.model.ContentModelManager;
import org.eclipse.lemminx.extensions.contentmodel.participants.completion.AttributeNameCompletionResolver;
import org.eclipse.lemminx.extensions.contentmodel.participants.completion.AttributeValueCompletionResolver;
import org.eclipse.lemminx.extensions.synapse.contentmodel.completions.SynapseContentModelElementCompletionItem;
import org.eclipse.lemminx.extensions.synapse.contentmodel.model.SynapseContentModelManager;
import org.eclipse.lemminx.extensions.synapse.utils.Constants;
import org.eclipse.lemminx.extensions.synapse.xsd.contentmodel.SynapseCMXSDDocument;
import org.eclipse.lemminx.extensions.contentmodel.model.CMAttributeDeclaration;
import org.eclipse.lemminx.extensions.contentmodel.model.CMDocument;
import org.eclipse.lemminx.extensions.contentmodel.model.CMElementDeclaration;
import org.eclipse.lemminx.extensions.contentmodel.utils.XMLGenerator;
import org.eclipse.lemminx.services.data.DataEntryField;
import org.eclipse.lemminx.services.extensions.completion.AttributeCompletionItem;
import org.eclipse.lemminx.services.extensions.completion.CompletionParticipantAdapter;
import org.eclipse.lemminx.services.extensions.completion.ICompletionItemResolveParticipant;
import org.eclipse.lemminx.services.extensions.completion.ICompletionRequest;
import org.eclipse.lemminx.services.extensions.completion.ICompletionResponse;
import org.eclipse.lemminx.settings.SharedSettings;
import org.eclipse.lemminx.uriresolver.CacheResourceDownloadingException;
import org.eclipse.lemminx.utils.StringUtils;
import org.eclipse.lsp4j.CompletionItem;
import org.eclipse.lsp4j.CompletionItemKind;
import org.eclipse.lsp4j.InsertTextFormat;
import org.eclipse.lsp4j.MarkupContent;
import org.eclipse.lsp4j.Position;
import org.eclipse.lsp4j.Range;
import org.eclipse.lsp4j.TextEdit;
import org.eclipse.lsp4j.jsonrpc.CancelChecker;
import org.eclipse.lsp4j.jsonrpc.messages.Either;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Extension to support XML completion based on content model (XML Schema completion, etc).
 */
public class SynapseContentModelCompletionParticipant extends CompletionParticipantAdapter {

    private static final Logger LOGGER = Logger.getLogger(SynapseContentModelCompletionParticipant.class.getName());

    private final Map<String, ICompletionItemResolveParticipant> completionResolvers;

    public SynapseContentModelCompletionParticipant() {
        completionResolvers = new HashMap<>();
        completionResolvers.put(AttributeValueCompletionResolver.PARTICIPANT_ID,
                new AttributeValueCompletionResolver());
        completionResolvers.put(AttributeNameCompletionResolver.PARTICIPANT_ID, new AttributeNameCompletionResolver());
    }

    @Override
    public void onTagOpen(ICompletionRequest request, ICompletionResponse response, CancelChecker cancelChecker)
            throws Exception {
        try {
            DOMDocument document = request.getXMLDocument();
            SynapseContentModelManager contentModelManager = request.getComponent(SynapseContentModelManager.class);
            DOMElement parentElement = request.getParentElement();
            if (parentElement == null) {
                // XML is empty, in case of XML file associations, a XML Schema/DTD can be bound
                // check if it's root element (in the case of XML file associations, the link to
                // XML Schema is done with pattern and not with XML root element)
                Collection<CMDocument> cmDocuments = contentModelManager.findCMDocument(document, null);
                for (CMDocument cmDocument : cmDocuments) {

                    CMElementDeclaration cmElement = ((SynapseCMXSDDocument) cmDocument).findElementDeclaration(
                            "definitions", Constants.SYNAPSE_NAMESPACE);
                    Collection<CMElementDeclaration> cmElements = cmElement.getElements();

                    fillWithChildrenElementDeclaration(null, null, cmElements, true, null, false, request,
                            response);
                }
                return;
            }
            // Try to retrieve XML Schema/DTD element declaration for the parent element
            // where completion was triggered.
            Collection<CMDocument> cmRootDocuments = contentModelManager.findCMDocument(parentElement,
                    parentElement.getNamespaceURI());

            String defaultPrefix = null;
            for (CMDocument cmDocument : cmRootDocuments) {
                CMElementDeclaration cmElement = cmDocument.findCMElement(parentElement,
                        parentElement.getNamespaceURI());
                if (cmElement != null) {
                    defaultPrefix = parentElement.getPrefix();
                    fillWithPossibleElementDeclaration(parentElement, cmElement, false, defaultPrefix, contentModelManager,
                            request, response);
                }
            }
            if (parentElement.isDocumentElement()) {
                // completion on root document element
                Collection<String> prefixes = parentElement.getAllPrefixes();
                for (String prefix : prefixes) {
                    if (defaultPrefix != null && prefix.equals(defaultPrefix)) {
                        continue;
                    }
                    String namespaceURI = parentElement.getNamespaceURI(prefix);
                    if (!hasNamespace(namespaceURI, cmRootDocuments)) {
                        // The model document root doesn't define the namespace, try to load the
                        // external model document (XML Schema, DTD)
                        Collection<CMDocument> cmDocuments = contentModelManager.findCMDocument(parentElement,
                                namespaceURI);
                        for (CMDocument cmDocument : cmDocuments) {
                            fillWithChildrenElementDeclaration(parentElement, null, cmDocument.getElements(), true, prefix,
                                    true, request, response);
                        }
                    }
                }
            }
        } catch (CacheResourceDownloadingException e) {
            // XML Schema, DTD is loading, ignore this error
            LOGGER.log(Level.SEVERE, "Cannot download XML Schema: ", e);
        }
    }

    private boolean hasNamespace(String namespaceURI, Collection<CMDocument> cmRootDocuments) {
        if (cmRootDocuments.isEmpty()) {
            return false;
        }
        for (CMDocument cmDocument : cmRootDocuments) {
            if (cmDocument.hasNamespace(namespaceURI)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Fill with possible element declarations.
     *
     * @param parentElement       the parent DOM element
     * @param cmElement           the content model element declaration
     * @param rootElement
     * @param defaultPrefix
     * @param contentModelManager
     * @param request
     * @param response
     * @throws BadLocationException
     */
    private static void fillWithPossibleElementDeclaration(DOMElement parentElement, CMElementDeclaration cmElement, boolean rootElement,
                                                           String defaultPrefix, SynapseContentModelManager contentModelManager, ICompletionRequest request,
                                                           ICompletionResponse response) throws BadLocationException {
        // Get possible elements
        Collection<CMElementDeclaration> possibleElements = cmElement.getPossibleElements(parentElement,
                request.getOffset());
        boolean isAny = CMElementDeclaration.ANY_ELEMENT_DECLARATIONS.equals(possibleElements);
        Collection<CMDocument> cmDocuments = null;
        if (isAny) {
            // It's a xs:any, get the XML Schema/DTD document to retrieve the all elements
            // declarations
            cmDocuments = contentModelManager.findCMDocument(parentElement);
        }
        fillWithChildrenElementDeclaration(parentElement, cmDocuments, possibleElements, rootElement, defaultPrefix, false, request,
                response);
    }

    /**
     * Fill with children element declarations
     *
     * @param element
     * @param cmDocuments
     * @param cmElements
     * @param defaultPrefix
     * @param forceUseOfPrefix
     * @param request
     * @param response
     * @throws BadLocationException
     */
    private static void fillWithChildrenElementDeclaration(DOMElement element, Collection<CMDocument> cmDocuments,
                                                           Collection<CMElementDeclaration> cmElements, boolean rootElement, String defaultPrefix, boolean forceUseOfPrefix,
                                                           ICompletionRequest request, ICompletionResponse response) throws BadLocationException {
        XMLGenerator generator = request.getXMLGenerator();
        if (cmDocuments != null) {
            // xs:any case
            Set<String> tags = new HashSet<>();

            // Fill with all element declarations from the XML Schema/DTD document
            Set<CMElementDeclaration> processedElements = new HashSet<>();
            for (CMDocument cmDocument : cmDocuments) {
                Collection<CMElementDeclaration> elements = cmDocument.getElements();
                fillCompletionItem(elements, element, rootElement, defaultPrefix, forceUseOfPrefix, request, response, generator,
                        tags, processedElements);
            }
            // Fill with all element tags from the DOM document
            Document document = element.getOwnerDocument();
            NodeList list = document.getChildNodes();
            addTagName(list, tags, request, response);
        } else {
            for (CMElementDeclaration child : cmElements) {
                addTagCompletionItem(child, element, rootElement, defaultPrefix, forceUseOfPrefix, request, response, generator,
                        null);
            }
        }
    }

    private static void fillCompletionItem(Collection<CMElementDeclaration> elements, DOMElement element, boolean rootElement,
                                           String defaultPrefix, boolean forceUseOfPrefix, ICompletionRequest request, ICompletionResponse response,
                                           XMLGenerator generator, Set<String> tags, Set<CMElementDeclaration> processedElements) {
        for (CMElementDeclaration child : elements) {
            if (!processedElements.contains(child)) {
                processedElements.add(child);
                addTagCompletionItem(child, element, rootElement, defaultPrefix, forceUseOfPrefix, request, response, generator,
                        tags);
                fillCompletionItem(child.getElements(), element, rootElement, defaultPrefix, forceUseOfPrefix, request, response,
                        generator, tags, processedElements);
            }
        }
    }

    /**
     * Add completion item with all tag names of the node list.
     *
     * @param list
     * @param tags
     * @param request
     * @param response
     */
    private static void addTagName(NodeList list, Set<String> tags, ICompletionRequest request,
                                   ICompletionResponse response) {
        for (int i = 0; i < list.getLength(); i++) {
            Node node = list.item(i);
            if (Node.ELEMENT_NODE == node.getNodeType()) {
                DOMElement elt = (DOMElement) node;
                if (elt.hasTagName()) {
                    String tagName = elt.getTagName();
                    if (!tags.contains(tagName)) {
                        CompletionItem item = new CompletionItem(tagName);
                        item.setKind(CompletionItemKind.Property);
                        item.setFilterText(request.getFilterForStartTagName(tagName));
                        String xml = elt.getOwnerDocument().getText().substring(elt.getStart(), elt.getEnd());
                        item.setTextEdit(Either.forLeft(new TextEdit(request.getReplaceRange(), xml)));
                        response.addCompletionItem(item);
                        tags.add(item.getLabel());
                    }
                }
                addTagName(elt.getChildNodes(), tags, request, response);
            }
        }
    }

    private static void addTagCompletionItem(CMElementDeclaration elementDeclaration, DOMElement parentElement, boolean rootElement,
                                             String defaultPrefix, boolean forceUseOfPrefix, ICompletionRequest request, ICompletionResponse response,
                                             XMLGenerator generator, Set<String> tags) {
        String prefix = forceUseOfPrefix ? defaultPrefix
                : (parentElement != null ? parentElement.getPrefix(elementDeclaration.getNamespace()) : null);
        String tagName = elementDeclaration.getName(prefix);

        if (tags != null) {
            if (tags.contains(tagName)) {
                return;
            } else {
                tags.add(tagName);
            }
        }

        SynapseContentModelElementCompletionItem item = new SynapseContentModelElementCompletionItem(tagName,
                elementDeclaration, rootElement, generator, request);
        response.addCompletionItem(item, true);
    }

    @Override
    public void onAttributeName(boolean generateValue, ICompletionRequest request, ICompletionResponse response,
                                CancelChecker cancelChecker)
            throws Exception {
        // otherwise, manage completion based on XML Schema, DTD.
        DOMElement parentElement = request.getNode().isElement() ? (DOMElement) request.getNode() : null;
        if (parentElement == null) {
            return;
        }
        try {
            Range fullRange = request.getReplaceRange();
            boolean canSupportSnippet = request.isCompletionSnippetsSupported();
            SynapseContentModelManager contentModelManager = request.getComponent(SynapseContentModelManager.class);
            // Completion on attribute name based on
            // - internal grammar (ex: DOCTYPE with subset)
            // - external grammar (ex : DOCTYPE SYSTEM, xs:schemaLocation, etc)
            Collection<CMDocument> cmDocuments = contentModelManager.findCMDocument(parentElement);
            for (CMDocument cmDocument : cmDocuments) {
                CMElementDeclaration cmElement = cmDocument.findCMElement(parentElement,
                        parentElement.getNamespaceURI());
                if (cmElement != null) {
                    fillAttributesWithCMAttributeDeclarations(parentElement, fullRange, cmElement, canSupportSnippet,
                            generateValue, request, response);
                }
            }
        } catch (CacheResourceDownloadingException e) {
            // XML Schema, DTD is loading, ignore this error
        }
    }

    private void fillAttributesWithCMAttributeDeclarations(DOMElement parentElement, Range fullRange,
                                                           CMElementDeclaration elementDeclaration, boolean canSupportSnippet, boolean generateValue,
                                                           ICompletionRequest request, ICompletionResponse response) {

        Collection<CMAttributeDeclaration> attributes = elementDeclaration.getAttributes();
        if (attributes == null) {
            return;
        }
        for (CMAttributeDeclaration attributeDeclaration : attributes) {
            if (parentElement != null) {
                String prefix = parentElement.getPrefix(attributeDeclaration.getNamespace());
                String attrName = attributeDeclaration.getName(prefix);
                if (!parentElement.hasAttribute(attrName)) {
                    CompletionItem item = new AttributeCompletionItem(attrName, canSupportSnippet, fullRange,
                            generateValue,
                            attributeDeclaration.getDefaultValue(), attributeDeclaration.getEnumerationValues(),
                            request.getSharedSettings());
                    if (request.isResolveDocumentationSupported()) {
                        addResolveData(request, item, AttributeNameCompletionResolver.PARTICIPANT_ID);
                    } else {
                        MarkupContent documentation = XMLGenerator.createMarkupContent(attributeDeclaration,
                                elementDeclaration,
                                request);
                        item.setDocumentation(documentation);
                    }
                    response.addCompletionAttribute(item);
                }
            }
        }
    }

    @Override
    public void onAttributeValue(String valuePrefix, ICompletionRequest request, ICompletionResponse response,
                                 CancelChecker cancelChecker)
            throws Exception {
        DOMElement parentElement = request.getNode().isElement() ? (DOMElement) request.getNode() : null;
        if (parentElement == null) {
            return;
        }
        try {
            SynapseContentModelManager contentModelManager = request.getComponent(SynapseContentModelManager.class);
            // Completion on attribute value based on
            // - internal grammar (ex: DOCTYPE with subset)
            // - external grammar (ex : DOCTYPE SYSTEM, xs:schemaLocation, etc)
            Collection<CMDocument> cmDocuments = contentModelManager.findCMDocument(parentElement);
            for (CMDocument cmDocument : cmDocuments) {
                CMElementDeclaration cmElement = cmDocument.findCMElement(parentElement,
                        parentElement.getNamespaceURI());
                if (cmElement != null) {
                    fillAttributeValuesWithCMAttributeDeclarations(cmElement, request, response);
                }
            }
        } catch (CacheResourceDownloadingException e) {
            // XML Schema, DTD is loading, ignore this error
        }
    }

    private void fillAttributeValuesWithCMAttributeDeclarations(CMElementDeclaration cmElement,
                                                                ICompletionRequest request, ICompletionResponse response) {
        DOMAttr attr = request.getCurrentAttribute();
        if (attr == null) {
            return;
        }
        CMAttributeDeclaration cmAttribute = cmElement.findCMAttribute(attr);
        if (cmAttribute != null) {
            Range fullRange = request.getReplaceRange();
            cmAttribute.getEnumerationValues().forEach(value -> {
                CompletionItem item = new CompletionItem();
                String insertText = request.getInsertAttrValue(value);
                item.setLabel(value);
                item.setKind(CompletionItemKind.Value);
                item.setFilterText(insertText);
                item.setTextEdit(Either.forLeft(new TextEdit(fullRange, insertText)));

                if (request.isResolveDocumentationSupported()) {
                    addResolveData(request, item, AttributeValueCompletionResolver.PARTICIPANT_ID);
                } else {
                    item.setDocumentation(XMLGenerator.createMarkupContent(cmAttribute, value, cmElement,
                            request));
                }
                response.addCompletionItem(item);
            });
        }
    }

    @Override
    public void onXMLContent(ICompletionRequest request, ICompletionResponse response, CancelChecker cancelChecker)
            throws Exception {
        try {
            SynapseContentModelManager contentModelManager = request.getComponent(SynapseContentModelManager.class);
            DOMElement parentElement = request.getParentElement();
            if (parentElement != null) {
                Collection<CMDocument> cmDocuments = contentModelManager.findCMDocument(parentElement);
                for (CMDocument cmDocument : cmDocuments) {
                    CMElementDeclaration cmElement = cmDocument.findCMElement(parentElement,
                            parentElement.getNamespaceURI());
                    Collection<String> values = cmElement != null ? cmElement.getEnumerationValues()
                            : Collections.emptyList();
                    if (!values.isEmpty()) {
                        // Completion for xs:enumeration inside Element Text node
                        DOMDocument document = parentElement.getOwnerDocument();
                        int startOffset = parentElement.getStartTagCloseOffset() + 1;
                        Position start = parentElement.getOwnerDocument().positionAt(startOffset);
                        Position end = request.getPosition();
                        int endOffset = parentElement.getEndTagOpenOffset();
                        if (endOffset > 0) {
                            end = document.positionAt(endOffset);
                        }
                        int completionOffset = request.getOffset();
                        String tokenStart = StringUtils.getWhitespaces(document.getText(), startOffset,
                                completionOffset);
                        Range fullRange = new Range(start, end);
                        values.forEach(value -> {
                            CompletionItem item = new CompletionItem();
                            item.setLabel(value);
                            String insertText = value;
                            item.setLabel(value);
                            item.setKind(CompletionItemKind.Value);
                            item.setFilterText(tokenStart + insertText);
                            item.setTextEdit(Either.forLeft(new TextEdit(fullRange, insertText)));
                            MarkupContent documentation = XMLGenerator.createMarkupContent(cmElement, value, request);
                            item.setDocumentation(documentation);
                            response.addCompletionItem(item);
                        });
                    }
                }
            }
        } catch (CacheResourceDownloadingException e) {
            // XML Schema, DTD is loading, ignore this error
        }
    }

    @Override
    public ICompletionItemResolveParticipant getResolveCompletionItemParticipant(String participantId) {
        return completionResolvers.get(participantId);
    }

    private static void addResolveData(ICompletionRequest request, CompletionItem item, String participantId) {
        JsonObject data = DataEntryField.createCompletionData(request, participantId);
        item.setData(data);
    }
}