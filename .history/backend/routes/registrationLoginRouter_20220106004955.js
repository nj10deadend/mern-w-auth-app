const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registrationLoginRouter = express.Router();

const JWT_SECRET = 'vnqiowHoefbv2383u2r9f2FFDIEuvbiu42&!ifi2@@r20ddnf10f31fincA'

registrationLoginRouter.use(bodyParser.urlencoded({extended: true}));


registrationLoginRouter.post('/user/login', async (req, res) => {

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

        return res.status(200).send(token);
    } else {
        console.log("Invalid username/password");
        res.status(403).json({status: 'error', error: "Invalid username/password"})
    }
})


registrationLoginRouter.post('/user/register', async (req, res) => {

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

        const token = jwt.sign({
            id: newUser._id,
            email: newUser.email
            }, JWT_SECRET
        )
        console.log("User successfully registered");
        console.log(newUser)
        return res.status(200).send(token);

    }

})

module.exports = registrationLoginRouter;
