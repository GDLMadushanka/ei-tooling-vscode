import { Divider, Button, Stack, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import React, { useState } from 'react';

export const GettingStarted = (props: any) => {

    const handleNewInt = (event: React.MouseEvent<HTMLButtonElement>) => {
        vscode.postMessage({
            "command": "ShowNewIntegrationWizard",
        });
    };

    const handleNewDs = (event: React.MouseEvent<HTMLButtonElement>) => {
        vscode.postMessage({
            "command": "ShowNewDataServiceWizard",
        });
    }

    const handleNewDsc = (event: React.MouseEvent<HTMLButtonElement>) => {
        vscode.postMessage({
            "command": "ShowNewDataSourceWizard",
        });
    }

    const handleNewMediator = (event: React.MouseEvent<HTMLButtonElement>) => {
        vscode.postMessage({
            "command": "ShowNewMediatorWizard",
        });
    }

    const showSamples = (event: React.MouseEvent<HTMLButtonElement>) => {
        vscode.postMessage({
            "command": "ShowSampleWizard",
        });
    }
    
    return (
        <>
            <h4>Getting Started</h4>
            <form noValidate>
                <Button type="submit" variant="text" color="primary" onClick={handleNewInt}>New Integration project</Button>
                <Divider />
                <Button type="submit" variant="text" color="primary" onClick={handleNewDs}>New Data Service Configs</Button>
                <br/>
                <Button type="submit" variant="text" color="primary" onClick={handleNewDsc}>New Data Source Configs</Button>
                <Divider />
                <Button type="submit" variant="text" color="primary" onClick={handleNewMediator}>New Mediator Project</Button>
            </form>
            <form style={{ position: "absolute", bottom: 5}}>
                <h4>Help</h4>
                <Button type="submit" variant="text" color="primary" onClick={showSamples}>Try out a sample</Button>
            </form>
        </>
    )
}