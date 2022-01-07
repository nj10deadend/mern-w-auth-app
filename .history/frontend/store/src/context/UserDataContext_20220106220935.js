import { createContext } from 'react';
import {useContext} from 'react';
import {useState, useEffect} from 'react';
import {useMemo} from 'react';
// import axios from 'axios';

export const UserDataContext = createContext();

console.log(UserDataContext);
// const GetCurrentUserContext = createContext();

// export function useUserData () {
//     return useContext(UserDataContext);
// }

// export function useGetCurrentUserFunc () {
//     return useContext(GetCurrentUserContext);
// }

export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [jwtToken, setJwtToken] = useState("private-key");

    // const providerValue = React.useMemo(() => ({
    //     valueA, setValueA,
    //     valueB, setValueB,
    // }), [valueA, valueB]);

    const providerValue = useMemo(() => ({
        currentUser, setCurrentUser,
        authChecked, setAuthChecked,
        jwtToken, setJwtToken
    }), [currentUser, authChecked, jwtToken])

    // console.log(authChecked);


    return (
        // <UserDataContext.Provider value={currentUser, setCurrentUser, authChecked, setAuthChecked, jwtToken, setJwtToken}>
        // <UserDataContext.Provider value="This is my sanity check">
        // <UserDataContext.Provider value={{value1: [currentUser, setCurrentUser]}, 
        // {value2: [authChecked, setAuthChecked]}, {value3: [jwtToken, setJwtToken]}}>
        <UserDataContext.Provider value={providerValue}>

            {children}

        </UserDataContext.Provider>
    )
}