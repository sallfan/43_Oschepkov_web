import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router";
import App from './App';
import "./styles/index.css"
import {EditModeProvider} from "./components/editingTools/EditModeContext";
import {DataBaseModeProvider} from "./components/editingTools/DataBaseModeContext";
import {OopsyChaosProvider} from "./components/editingTools/OopsyChaosContext.";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <DataBaseModeProvider>
            <EditModeProvider>
                <OopsyChaosProvider>
                    <App/>
                </OopsyChaosProvider>
            </EditModeProvider>
        </DataBaseModeProvider>
    </BrowserRouter>
);
