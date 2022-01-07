import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';
// import { UserProvider } from '../context/UserDataContext';
import { UserProvider } from './context/UserDataContext';
import { useContext } from 'react';
import {useGetCurrentUserFunc} from './context/UserDataContext';

function App() {
  // const [currentUser, setCurrentUser] = useState(null);
  // const [authChecked, setAuthChecked] = useState(false);

  const fetchCurrentUser = useGetCurrentUserFunc();
  console.log(fetchCurrentUser);
  // console.log(fetchCurrentUser);
  // const {currentUser, setCurrentUser} = useContext(UserProvider);
  // const {currentUser, setCurrentUser, authChecked, setAuthChecked} = useContext(UserProvider);
  const currentUser = useContext(UserProvider);
  const setCurrentUser = useContext(UserProvider);
  const authChecked = useContext(UserProvider);
  const setAuthChecked = useContext(UserProvider);

  // const getCurrentUser = useContext(UserProvider);
  // console.log(getCurrentUser);

  // console.log(currentUser);

  // const userStates = useUserData();

  // const JWT_SECRET = 'vnqiowHoefbv2383u2r9f2FFDIEuvbiu42&!ifi2@@r20ddnf10f31fincA';

  // function getCurrentUser () {

  //   axios.get('http://localhost:8080/user/me', {
  //     credentials: 'include'
  //   }).then(res => {
  //     if (res.ok) {
  //       res.json().then((user) => {
  //         console.log(user);
  //         setCurrentUser(user)
  //         setAuthChecked(true);
  //       })
  //     } else {
  //       setAuthChecked(true)
  //       console.log("Unauthorized")
  //     }
  //   })

  // }
  // useEffect(getCurrentUser, []);
  useEffect(fetchCurrentUser, []);

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
