const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const connectDB = require('./config/db');
const User = require('./models/User');
const Item = require('./models/Item');
const app = express();

//// Route imports /////////////
const registrationLoginRouter = require('./routes/registrationLoginRouter');
/////////////////

const port = 8080;

connectDB();

/// creates a user and store item ////////////


// createUser();
// createItem();

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

async function createItem ()  {

    const newItem = await Item.create({
        name: "Cheese",
        price: "1.59",
        img: "https://cdn.cnn.com/cnnnext/dam/assets/200623110902-cheddar-cubes-full-169.jpg",
        // img: "https://thumbor.thedailymeal.com/W6NE9nprefEMEAAQcFjQP3r8xu8=//https://www.thedailymeal.com/sites/default/files/story/2017/raw%20steak.JPG",
        category: "dairy"
    })

    console.log(newItem);
}
////////////////////////////////////////////////////////////////


//// routes //////////////////////////
app.use('/', registrationLoginRouter);

/////////////////////////////////////////////

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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