require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const cors = require('cors');

// console.log(auth);

const registrationLoginRouter = express.Router();

// const JWT_SECRET = 'vnqiowHoefbv2383u2r9f2FFDIEuvbiu42&!ifi2@@r20ddnf10f31fincA';

registrationLoginRouter.use(bodyParser.urlencoded({extended: true}));


///// Authentication checker //////////////////////////////////


///////////////////////////////////

registrationLoginRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


registrationLoginRouter.get('/user/me', authenticateToken, async (req, res) => {

    // console.log(req.user);
    try {
        // request.user is getting fetched from Middleware after token authentication
        const foundUser = await User.findById(req.user._id);
        console.log(foundUser);
        // console.log(user);
        res.send(foundUser);
      } catch (e) {
        res.send({ message: "Error in Fetching user" });
      }

})

registrationLoginRouter.post('/user/login', async (req, res) => { ///// testing without cors() as a parameter
    console.log(req.body);

    const reqEmail = req.body.email;
    const reqPlainTextPassword = req.body.password;

    // const user = {_id: req.body._id, email: reqEmail}

    const foundUser = await User.findOne({email: reqEmail})
    console.log(foundUser);

    if (!foundUser) {
        console.log("User not found. Invalid email/password");
        res.status(404).send("Invalid email/password");
    }

    if (await bcrypt.compare(reqPlainTextPassword, foundUser.password)) {

        const user = {_id: foundUser._id, email: foundUser.email}

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

        console.log("Successfully logged in");

        return res.status(200).json({accessToken: accessToken});
    } else {
        console.log("Invalid email/password");
        res.status(403).json({status: 'error', error: "Invalid email/password"})
    }
})


registrationLoginRouter.post('/user/register', cors(), async (req, res) => {

    const reqName = req.body.name;
    const reqEmail = req.body.email;
    // console.log(reqEmail);
    const reqPlainTextPassword = req.body.password;
    const reqAdmin = req.body.admin;
    // console.log(req.body);

    const hashedPassword = await bcrypt.hash(reqPlainTextPassword, 10);

    const alreadyRegisteredUser = await User.findOne({email: reqEmail});
    // console.log(User.find());
    console.log(alreadyRegisteredUser);
    // const users = await User.find();
    // console.log(users);
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

        const newUserData = {_id: newUser._id, email: newUser.email}

        const accessToken = jwt.sign(newUserData, process.env.ACCESS_TOKEN_SECRET)

        console.log("User successfully registered");
        console.log(newUser)
        return res.status(201).json({accessToken: accessToken});

    }

})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader &&  authHeader.split(' ')[1];
    if (token === null) {
        return res.status(401).send("Invalid or non-existent authentication token")
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send("Unauthorized")
        }
        req.user = user;
        next()
    })
}

module.exports = registrationLoginRouter;
