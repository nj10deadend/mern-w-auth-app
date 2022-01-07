import { createContext } from 'react';
import {useContext} from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

const UserDataContext = createContext();
const GetCurrentUserContext = createContext();

// export function useUserData () {
//     return useContext(UserDataContext);
// }

export function useGetCurrentUserFunc () {
    return useContext(GetCurrentUserContext);
}

export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    function getCurrentUser () {

        axios.get('http://localhost:8080/user/me', {
          credentials: 'include'
        }).then(res => {
          if (res.ok) {
            res.json().then((user) => {
              console.log(user);
              setCurrentUser(user)
              setAuthChecked(true);
            })
          } else {
            setAuthChecked(true)
            console.log("Unauthorized")
          }
        })
    
    }
    // useEffect(getCurrentUser, []);
    
    if(currentUser !== null) {
        return (
            <div></div>
        )
    } 
    // console.log(currentUser)


    return (
        <UserDataContext.Provider value={currentUser}>
            <GetCurrentUserContext.Provider value={getCurrentUser}>
            {children}

            </GetCurrentUserContext.Provider>
        </UserDataContext.Provider>
    )
}