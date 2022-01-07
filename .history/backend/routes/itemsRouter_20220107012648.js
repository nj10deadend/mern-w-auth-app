const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Item = require('../models/Item');
// const auth = require('../middleware/auth');
// const bcrypt = require('bcrypt');
const cors = require('cors');

// console.log(auth);

const itemsRouter = express.Router();

// const JWT_SECRET = 'vnqiowHoefbv2383u2r9f2FFDIEuvbiu42&!ifi2@@r20ddnf10f31fincA';

itemsRouter.use(bodyParser.urlencoded({extended: true}));

itemsRouter.use('/store/items', async (req, res) => {
    const items = await Item.find();
    console.log(items);
    res.status(200).send(items);
})

// registrationLoginRouter.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
module.exports = itemsRouter;