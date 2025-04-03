import React from 'react';
import "../styles/header.css"
import {useEditMode} from "./editingTools/EditModeContext";
import {useNavigate} from "react-router";
import {useDataBaseMode} from "./editingTools/DataBaseModeContext";
import {useOopsyChaos} from "./editingTools/OopsyChaosContext.";



const Header = ({title, onCreateMeatAPI, onCreateChaosAPI}) => {

    const { editMode, setEditMode } = useEditMode();
    const { dataBaseMode, setDataBaseMode } = useDataBaseMode();
    const { oopsyChaos, setOopsyChaos} = useOopsyChaos();
    const navigate = useNavigate();

    return (

        <header id="root-header" className="header">
            <nav className="header-nav">
                <button id="home-button" onClick={() => {navigate("/"); setDataBaseMode(false)}}>{title}</button>
                <button disabled={dataBaseMode} id="create-meat-button" onClick={onCreateMeatAPI}>Создать мясо</button>
                <button id="db-button" onClick={() => {navigate("/db"); setDataBaseMode(true)}}>Лютая БДшка</button>
                <button disabled={dataBaseMode || oopsyChaos} id="help-me-pls-button" onClick={onCreateChaosAPI}>Впустить хаос</button>
            </nav>
            <div id="header-tools" className="header-tools">
                <p>Режим редактирования</p>
                <div className="toggle-container">
                    <input type="checkbox"
                           id="editModeToggle"
                           className="toggle-input"
                           checked={editMode}
                           onChange={() => setEditMode(!editMode)}/>
                    <label htmlFor="editModeToggle" className="toggle-label"></label>
                </div>
            </div>
        </header>
    );
};

export default Header;