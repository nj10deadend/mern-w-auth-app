const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const connectDB = require('./config/db');
const User = require('./models/User');
const Item = require('./models/Item');
const app = express();

const port = 8080;

connectDB();

/// creates a user and store item ////////////


// createUser();
createItem();

async function createUser () {

    const plainTextPassword = 'DeadendPassword229'

    const hashedPassword = await bcrypt.hash(plainTextPassword, 5);

    console.log(hashedPassword);

    const newUser = await User.create({
        name: 'Naseer',
        email: 'nasjacks10@gmail.com',
        password: hashedPassword,
        admin: true,
        cart: []

    })
    console.log(newUser);
}
// async function addItemToUserCart () {
//     await User.findOne({name: Naseer}).populate('cart').exec(function (err, user) {
//         if (err) return handleError(err);
//         console.log('The author is %s', story.author.name);
//         // prints "The author is Ian Fleming"
//       });
// }

async function createItem ()  {

    const newItem = await Item.create({
        name: "Lays Chips",
        price: "1.50",
        img: "https://target.scene7.com/is/image/Target/GUEST_b536d933-802d-4cec-a620-b17e70db6b1a?wid=488&hei=488&fmt=pjpeg",
        // img: "https://thumbor.thedailymeal.com/W6NE9nprefEMEAAQcFjQP3r8xu8=//https://www.thedailymeal.com/sites/default/files/story/2017/raw%20steak.JPG",
        category: "Junk"
    })

    console.log(newItem);
}
////////////////////////////////////////////////////////////////

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});


app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`)
})

module.exports = app;