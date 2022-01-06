const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registrationLoginRouter = express.Router();

const JWT_SECRET = 'vnqiowHoefbv2383u2r9f2FFDIEuvbiu42&!ifi2@@r20ddnf10f31fincA'

registrationLoginRouter.use(bodyParser.urlencoded({extended: true}));


registrationLoginRouter.post('/api/login', async (req, res) => {

    const reqEmail = req.body.email;
    const reqPlainTextPassword = req.body.password;

    const foundUser = await User.findOne({email: reqEmail}).lean()

    if (!foundUser) {
        console.log("User not found. Invalid username/password");
        res.status(404).send("Invalid username/password");
    }

    if (await bcrypt.compare(reqPlainTextPassword, foundUser.password)) {

        const token = jwt.sign({
                id: foundUser._id, 
                email: foundUser.email
            }, 
            JWT_SECRET
        )

        return res.json({status: 'ok', data: token})
    } else {
        console.log("Invalid username/password");
        res.json({status: 'error', error: "Invalid username/password"})
    }
})


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
