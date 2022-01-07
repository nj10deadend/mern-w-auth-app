import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';
import { UserDataContext } from './context/UserDataContext';
import { useContext } from 'react';

function Home() {


  //// Do this instead
  const {currentUser, setCurrentUser, authChecked, setAuthChecked, jwtToken, setJwtToken} = useContext(UserDataContext);
//   const {setCurrentUser} = useContext(UserDataContext);
//   const {authChecked} = useContext(UserDataContext);
//   const {setAuthChecked} = useContext(UserDataContext);
  /////////

  console.log(currentUser);
  console.log(jwtToken);
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

  if(currentUser !== undefined) {
    return (
      <div></div>
    )
  } 
  console.log(currentUser);


  return (
      <div className="App">
        {/* <p>{value}</p> */}
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
  );
}

export default Home;