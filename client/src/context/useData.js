import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataProvider({children}) {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    return <DataContext.Provider value={{
        token,
        setToken,
        userId,
        setUserId
    }}>
        {children}
    </DataContext.Provider>
}