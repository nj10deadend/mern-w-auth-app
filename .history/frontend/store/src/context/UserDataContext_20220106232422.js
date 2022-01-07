import { createContext } from 'react';
import {useContext} from 'react';
import {useState, useEffect} from 'react';
import {useMemo} from 'react';

export const UserDataContext = createContext();

console.log(UserDataContext);
export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const [jwtToken, setJwtToken] = useState("private-key");

    return (
        // <UserDataContext.Provider value={currentUser, setCurrentUser, authChecked, setAuthChecked, jwtToken, setJwtToken}>
        // <UserDataContext.Provider value="This is my sanity check">
        // <UserDataContext.Provider value={{value1: [currentUser, setCurrentUser]}, 
        // {value2: [authChecked, setAuthChecked]}, {value3: [jwtToken, setJwtToken]}}>
        <UserDataContext.Provider 
        value={{name, setName, email, setEmail, password, setPassword, admin, setAdmin, currentUser, 
        setCurrentUser, authChecked, setAuthChecked, jwtToken, setJwtToken}}
        >

            {children}

        </UserDataContext.Provider>
    )
}