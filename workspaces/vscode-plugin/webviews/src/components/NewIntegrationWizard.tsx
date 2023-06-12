import {TextField, Button, Stack, Checkbox, FormGroup, FormControlLabel} from "@mui/material";
import React, { useState } from 'react';

export const NewIntegrationWizard = (props: any) => {
    const [groupId, setGroupId] = useState("com.example");
    const [artifactId, setArtifactId] = useState("example");
    const [enableEsbConfigs, setEnableEsbConfigs] = useState(false);
    const [configsProjectName, setConfigsProjectName] = useState("");
    const [enableComposite, setEnableComposite] = useState(false);
    const [compositeProjectName, setCompositeProjectName] = useState("");
    const [enableRegistry, setEnableRegistry] = useState(false);
    const [registryProjectName, setRegistryProjectName] = useState("");



    let artifactIdRegex = /^[a-zA-Z0-9_-]+$/;
    let groupIdRegex = /^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*$/;

    const handleArtifactIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setArtifactId(value);
        setConfigsProjectName(value + 'Configs');
        setCompositeProjectName(value + 'CompositeExporter')
        setRegistryProjectName(value + 'RegistryResource');
    };
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        vscode.postMessage({
            "command": "CreateNewIntegrationProject",
            "groupId": {groupId}.groupId,
            "artifactId": {artifactId}.artifactId,
            "version": "1.0.0-SNAPSHOT",
        });
    };
    

    return (
        <>
            <h3>Create New Integration Project</h3>
            <form noValidate>
                <Stack spacing={2} width={400}>
                    <TextField label="Group Id" required
                        value={groupId}
                        onChange={(e) => setGroupId(e.target.value)}
                        error={!groupIdRegex.test(groupId)}
                        helperText="Enter a valid group id"
                    />
                    <TextField label="Artifact Id" required onChange={handleArtifactIdChange}
                        value={artifactId}
                        error={!artifactIdRegex.test(artifactId)}
                        helperText="Enter a valid artifact id"
                    />
                    <TextField label="Version" required
                        defaultValue="1.0.0-SNAPSHOT"/>
                    <FormControlLabel control={<Checkbox checked={enableEsbConfigs} 
                        onChange={(e) => setEnableEsbConfigs(e.target.checked)}/>} 
                        label="Create ESB Configs Project"/>
                    {enableEsbConfigs && (
                        <TextField label="ESB Configs Project Name" value={configsProjectName}/>
                    )}
                    <FormControlLabel control={<Checkbox checked={enableComposite} 
                        onChange={(e) => setEnableComposite(e.target.checked)}/>} 
                        label="Create Composite Exporter Project" />
                    {enableComposite && (
                        <TextField label="Composite Exporter Project Name" value={compositeProjectName}/>
                    )}
                    <FormControlLabel control={<Checkbox checked={enableRegistry} 
                        onChange={(e) => setEnableRegistry(e.target.checked)}/>} 
                        label="Create Registry Resource Project" />
                    {enableRegistry && (
                        <TextField label="Registry Reource Project Name" value={registryProjectName}/>
                    )}
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>Create</Button>
                </Stack>   
            </form>
        </>
    )
}