import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
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
import Registration from './Registration';


function Login () {

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [admin, setAdmin] = useState(false);
    // // const [jwtToken, setJwtToken] = useState("");
    const {email, setEmail, password, setPassword, admin, setAdmin, currentUser, setCurrentUser, jwtToken, setJwtToken} = useContext(UserDataContext);


    console.log(jwtToken);

    console.log(email);
    console.log(password);


    const navigate = useNavigate();

    async function loginPostReq () {
        
        return await axios.post('http://localhost:8080/user/login', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
            setJwtToken(response.data);
            // return response.data;
            navigate('/store')
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
        console.log("Login successfully hit")
        navigate('/store');

    }
    console.log(jwtToken);


    return (
        <Box>
            <Typography variant='h3' component='div' gutterBottom>Login</Typography>
            <form onSubmit={loginToAcc}>
                <Box>
                    <label htmlFor="email">Email</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-email-input1" label="Enter email" 
                    variant="outlined" 
                    onChange={(event) => {setEmail(event.target.value)}} 
                    value = {email}
                    />

                </Box>
                <Box>
                    <label htmlFor="password">Password</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-password-input1" label="password" type="password"
                    variant="outlined" 
                    onChange={(event) => {setPassword(event.target.value)}} 
                    value = {password}
                    />
                </Box>

                <Box>
                    <label htmlFor="admin">Admin</label>
                    <br></br>
                    <br></br>
                    <TextField id="outlined-read-only-input1" label="Admin"
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
                <Route path="/registration" element={<Registration />} />
            </Routes> */}


        </Box>
    )
}

export default Login;