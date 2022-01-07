import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from './Login';
import { UserDataContext } from '../context/UserDataContext';
import { useContext } from 'react';

function Registration () {
    const {name, setName, email, setEmail, password, setPassword, admin, setAdmin, currentUser, setCurrentUser, jwtToken, setJwtToken} = useContext(UserDataContext);



    const navigate = useNavigate();

    async function registrationPostReq () {
        
        return await axios.post('http://localhost:8080/user/register', {
            name: name,
            email: email,
            password: password,
            admin: admin
        })
        .then(function (response) {
            console.log(response);
            setJwtToken(response.data);
            // return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return null;
        });
    }
    async function createAcc (event) {
        event.preventDefault();
        setEmail("");
        setPassword("");
        await registrationPostReq();
        navigate('/store')

    }
    return (
        <Box>
            <Typography variant='h3' component='div' gutterBottom>Create Account</Typography>
            <form>
                <Box>
                    <label htmlFor="name">Name</label>
                    <br></br>
                    <br></br>
                    <TextField id="outlined-name-input" label="Enter your name" 
                    variant="outlined" 
                    onChange={(event) => {setName(event.target.value)}} 
                    value = {name}
                    />

                </Box>
                <Box>
                    <label htmlFor="email">Email</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-email-input2" label="Enter email" 
                    variant="outlined" 
                    onChange={(event) => {setEmail(event.target.value)}} 
                    value = {email}
                    />

                </Box>
                <Box>
                    <label htmlFor="password">Password</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-password-input2" label="password" type="password"
                    variant="outlined" 
                    onChange={(event) => {setPassword(event.target.value)}} 
                    value = {password}
                    />
                </Box>

                <Box>
                    <label htmlFor="admin">Admin</label>
                    <br></br>
                    <br></br>
                    <TextField id="outlined-read-only-input2" label="Admin"
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
            <p><Link to="/">Login</Link></p>


            {/* <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/items" element={<Items />} />
            </Routes> */}


        </Box>
    )
}

export default Registration;