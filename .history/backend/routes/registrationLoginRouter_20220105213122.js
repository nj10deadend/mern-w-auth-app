const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User');

const registrationLoginRouter = express.Router();

registrationLoginRouter.use(bodyParser.urlencoded({extended: true}));


registrationLoginRouter.post('/api/register', async (req, res) => {

    const reqName = req.body.name;
    const reqEmail = req.body.email;
    const reqPlainTextPassword = req.body.password;
    const reqAdmin = req.body.admin;

    const hashedPassword = await bcrypt.hash(reqPlainTextPassword, 10);

    const alreadyRegisteredUser = User.find({email: reqEmail, password: reqPlainTextPassword});
    let newUser;

    if (alreadyRegisteredUser) {
        console.log("User already registered in database");
        throw new Error("User already registered");
    } else {
        newUser = {
            name: reqName,
            email: reqEmail,
            password: hashedPassword,
            reqAdmin: reqAdmin
        }

        await User.create(newUser);

        console.log("User successfully registered");
        res.status(201).send(newUser);
    }

})

module.exports = registrationLoginRouter;
