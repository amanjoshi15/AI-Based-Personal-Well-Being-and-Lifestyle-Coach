import React, { createContext, useState } from "react";

export const SomeContext = createContext();

export const SomeContextProvider = ({ children }) => {
    const [basename, setBasename] = useState("default_value");

    return (
        <SomeContext.Provider value={{ basename, setBasename }}>
            {children}
        </SomeContext.Provider>
    );
};
