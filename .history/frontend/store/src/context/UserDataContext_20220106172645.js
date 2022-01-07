import { createContext } from 'react';
import {useContext} from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

const UserDataContext = createContext();
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
    console.log(authChecked);


    return (
        <UserDataContext.Provider value={currentUser, setCurrentUser, authChecked, setAuthChecked}>
            {children}

        </UserDataContext.Provider>
    )
}