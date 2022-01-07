import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const JWT_SECRET = 'vnqiowHoefbv2383u2r9f2FFDIEuvbiu42&!ifi2@@r20ddnf10f31fincA';




  function getCurrentUser () {

    axios.get('http://localhost:8080/user/me', {
      // headers: {
      //   "Content-Type": "application/json",
      //   "Token": JWT_SECRET
      // },
      // withCredentials: true
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

  console.log(authChecked)
  console.log(currentUser)

  if(currentUser !== null) {
    return (
      <div></div>
    )
  } 



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {currentUser ? (
            <Route />
              


          ): (
            <UnauthenticatedApp 
            setCurrentUser={setCurrentUser}
            />
          )}
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
