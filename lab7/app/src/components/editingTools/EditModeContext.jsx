import React, { createContext, useState, useContext } from "react";

const EditModeContext = createContext();

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider = ({ children }) => {
    const [editMode, setEditMode] = useState(false);

    return (
        <EditModeContext.Provider value={{ editMode, setEditMode }}>
            {children}
        </EditModeContext.Provider>
    );
};