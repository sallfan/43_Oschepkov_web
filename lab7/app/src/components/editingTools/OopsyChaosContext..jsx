import React, { createContext, useState, useContext } from "react";

const OopsyChaosContext = createContext();

export const useOopsyChaos = () => useContext(OopsyChaosContext);

export const OopsyChaosProvider = ({ children }) => {
    const [oopsyChaos, setOopsyChaos] = useState(false);

    return (
        <OopsyChaosContext.Provider value={{ oopsyChaos, setOopsyChaos }}>
            {children}
        </OopsyChaosContext.Provider>
    );
};