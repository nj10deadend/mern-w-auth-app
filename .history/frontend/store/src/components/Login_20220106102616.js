import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        <div>
            <Typography variant='h3' component='div' gutterBottom>Login</Typography>
            
            <form>


            </form>

        </div>
    )
}

export default Login;