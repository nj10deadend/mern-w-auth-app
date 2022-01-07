import { createContext } from 'react';
import {useContext} from 'react';
import {useState, useEffect} from 'react';

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
    useEffect(getCurrentUser, []);
    
    if(currentUser !== null) {
        return (
            <div></div>
        )
    } 


    return (
        <UserDataContext.Provider value={currentUser, setCurrentUser}>
            <GetCurrentUserContext.Provider value={getCurrentUser}>
            {children}

            </GetCurrentUserContext.Provider>
        </UserDataContext.Provider>
    )
}