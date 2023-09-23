import { createContext, useState } from "react";

export const Usercontext = createContext({})

export function UserContextProvider({ children }) {
    const [userData, setUserData] = useState({})

    return (
        <Usercontext.Provider value={{userData, setUserData}}>
            { children }
        </Usercontext.Provider>
    )
}