import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';
// import { UserProvider } from '../context/UserDataContext';
import { UserProvider } from './context/UserDataContext';
import {UserDataContext} from './context/UserDataContext';
import { useContext } from 'react';

function App() {
  // const [currentUser, setCurrentUser] = useState(null);
  // const [authChecked, setAuthChecked] = useState(false);

  // console.log(fetchCurrentUser);

  //// You can't destructure props that have a value of undefined //////
  /// Set them as variables instead ////////

  /////    DONT DO THIS (if undefined) ///////

  // const {currentUser, setCurrentUser} = useContext(UserProvider);
  // const {currentUser, setCurrentUser, authChecked, setAuthChecked} = useContext(UserProvider);
  ////////////////////////////////////

  //// Do this instead
  const currentUser = useContext(UserDataContext);
  const setCurrentUser = useContext(UserDataContext);
  const authChecked = useContext(UserDataContext);
  const setAuthChecked = useContext(UserDataContext);
  /////////

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
        console.log(authChecked);
        console.log("Unauthorized")
      }
    })

  }
  useEffect(getCurrentUser, []);

  console.log(authChecked);


  // fetchCurrentUser();

  if(currentUser !== undefined) {
    return (
      <div></div>
    )
  } 
  console.log(currentUser);


  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {currentUser ? (
              <Route path='*' 
              element= {
                <AuthenticatedApp 
                // setCurrentUser={setCurrentUser}
                // currentUser={currentUser}
                />
              }
              />
            ): (
              <Route path='*' 
              element={
                <UnauthenticatedApp 
                // setCurrentUser={setCurrentUser}
                />
              }
              />
            )}
          </Routes>

        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
