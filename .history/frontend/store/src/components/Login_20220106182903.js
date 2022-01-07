import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { useContext } from 'react';
// import { UserProvider } from '../context/UserDataContext';
import { UserDataContext } from '../context/UserDataContext';
import { useContext } from 'react';


function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    // const [jwtToken, setJwtToken] = useState("");

    // const authChecked = useContext(UserDataContext);
    // const currentUser = useContext(UserDataContext);
    // const jwtToken = useContext(UserDataContext);
    // const setJwtToken = useContext(UserDataContext);
    const value = useState(UserDataContext);
    console.log(value);


    // const { jwtToken } = useContext(UserProvider);
    // const {setJwtToken} = useContext(UserProvider);

    // console.log(setJwtToken("private key"))
    // console.log(jwtToken);

    // const {currentUser, setCurrentUser} = useContext(UserProvider);


    const navigate = useNavigate();

    async function loginPostReq () {
        
        return await axios.post('http://localhost:8080/user/me', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
            // setJwtToken(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return null;
        });
    }
    async function loginToAcc (event) {
        event.preventDefault();
        setEmail("");
        setPassword("");
        await loginPostReq();
    }
    // console.log(value.currentUser);
    // console.log(value.currentUser);
    // console.log(value.authChecked);
    // console.log(value.jwtToken);
    // console.log(value.jwtToken);

    return (
        <Box>
            {/* <p>{value.currentUser}</p> */}
            <Typography variant='h3' component='div' gutterBottom>Login</Typography>

            {/* <form>


            </form> */}
            <form>
                <Box>
                    <label htmlFor="email">Email</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-basic2" label="Enter email" 
                    variant="outlined" 
                    onChange={(event) => {setEmail(event.target.value)}} 
                    value = {email}
                    />

                </Box>
                <Box>
                    <label htmlFor="password">Password</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-password-input" label="password" type="password"
                    variant="outlined" 
                    onChange={(event) => {setPassword(event.target.value)}} 
                    value = {password}
                    />
                </Box>

                <Box>
                    <label htmlFor="admin">Admin</label>
                    <br></br>
                    <br></br>
                    <TextField id="outlined-read-only-input" label="Admin"
                    InputProps={{
                      readOnly: true,
                    }}
                    value = {admin}
                    />
                </Box>
                <br></br>
                <Button variant="contained" endIcon={<SendIcon />} type="submit">Login</Button>
            </form>

            <p>-- or --</p>
            <p><Link to="/registration">Create a new account</Link></p>


            {/* <Routes>
                <Route path="/bug-table" element={<BugTable userFormData={userFormData}/>} />
            </Routes> */}


        </Box>
    )
}

export default Login;