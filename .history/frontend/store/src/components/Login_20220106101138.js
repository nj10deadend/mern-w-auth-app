import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function postRequest () {

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