import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const [jwtToken, setJwtToken] = useState("");

    const navigate = useNavigate();

    async function loginPostReq () {
        
        return await axios.post('http://localhost:8080/user/me', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
            setJwtToken(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return null;
        });
    }
    async function loginToAcc (event) {
        event.preventDefault();
        await loginPostReq();
    }
    return (
        <Box>
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
                    <label for="password">Password</label>
                    <br></br>
                    <br></br>
                    <TextField required id="outlined-password-input" label="password" type="password"
                    variant="outlined" 
                    onChange={(event) => {setPassword(event.target.value)}} 
                    value = {password}
                    />
                </Box>

                <Box>
                    <label for="admin">Admin</label>
                    <br></br>
                    <br></br>
                    <TextField id="outlined-read-only-input" label="Admin"
                    defaultValue= {false}
                    InputProps={{
                      readOnly: true,
                    }}
                    value = {admin}
                    />
                </Box>
                <br></br>
                <Button variant="contained" endIcon={<SendIcon />} type="submit">Login</Button>
            </form>

            {/* <Routes>
                <Route path="/bug-table" element={<BugTable userFormData={userFormData}/>} />
            </Routes> */}


        </Box>
    )
}

export default Login;