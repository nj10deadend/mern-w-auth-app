const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

const registrationLoginRouter = express.Router();

const JWT_SECRET = 'vnqiowHoefbv2383u2r9f2FFDIEuvbiu42&!ifi2@@r20ddnf10f31fincA';

registrationLoginRouter.use(bodyParser.urlencoded({extended: true}));


registrationLoginRouter.get('/user/me', auth, async (req, res) => {

    // console.log(req.user);
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user._id);
        // console.log(user);
        res.json(user);
      } catch (e) {
        res.send({ message: "Error in Fetching user" });
      }

})


registrationLoginRouter.post('/user/login', async (req, res) => {

    const reqEmail = req.body.email;
    const reqPlainTextPassword = req.body.password;

    const foundUser = await User.findOne({email: reqEmail})

    if (!foundUser) {
        console.log("User not found. Invalid email/password");
        res.status(404).send("Invalid email/password");
    }

    if (await bcrypt.compare(reqPlainTextPassword, foundUser.password)) {

        const token = jwt.sign({
                id: foundUser._id, 
                email: foundUser.email
            }, 
            JWT_SECRET
        )

        console.log("Successfully logged in");

        return res.status(200).send(token);
    } else {
        console.log("Invalid email/password");
        res.status(403).json({status: 'error', error: "Invalid email/password"})
    }
})


registrationLoginRouter.post('/user/register', async (req, res) => {

    const reqName = req.body.name;
    const reqEmail = req.body.email;
    console.log(reqEmail);
    const reqPlainTextPassword = req.body.password;
    const reqAdmin = req.body.admin;
    // console.log(req.body);

    const hashedPassword = await bcrypt.hash(reqPlainTextPassword, 10);

    const alreadyRegisteredUser = await User.findOne({email: reqEmail});
    // console.log(User.find());
    console.log(alreadyRegisteredUser);
    const users = await User.find();
    console.log(users);
    let newUser;

    if (alreadyRegisteredUser) {
        console.log("User already registered in database");
        res.send("User already registered");
    } else {
        newUser = {
            name: reqName,
            email: reqEmail,
            password: hashedPassword,
            reqAdmin: reqAdmin
        }

        await User.create(newUser);

        const token = jwt.sign({
            id: newUser._id,
            email: newUser.email
            }, JWT_SECRET
        )
        console.log("User successfully registered");
        console.log(newUser)
        return res.status(201).send(token);

    }

})

module.exports = registrationLoginRouter, JWT_SECRET;
