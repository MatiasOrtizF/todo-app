import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataProvider({children}) {
    const [token, setToken] = useState("");

    return (
        <DataContext.Provider value={{
            token,
            setToken
        }}>
            {children}
        </DataContext.Provider>
    )

}