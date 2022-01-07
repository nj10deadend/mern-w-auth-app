import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [jwtToken, setJwtToken] = useState("");

    const navigate = useNavigate();

    async function postRequest () {
        
        return await axios.post('http://localhost:8080/user/me', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return null;
        });


    }

    function handleSubmit (event) {
        event.preventDefault();
    }
    return (
        <div>

        </div>
    )
}

export default Login;