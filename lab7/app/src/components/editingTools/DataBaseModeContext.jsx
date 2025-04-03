import React, { createContext, useState, useContext } from "react";

const DataBaseModeContext = createContext();

export const useDataBaseMode = () => useContext(DataBaseModeContext);

export const DataBaseModeProvider = ({ children }) => {
    const [dataBaseMode, setDataBaseMode] = useState(false);

    return (
        <DataBaseModeContext.Provider value={{ dataBaseMode, setDataBaseMode }}>
            {children}
        </DataBaseModeContext.Provider>
    );
};