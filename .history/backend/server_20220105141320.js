const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const connectDB = require('./config/db');
const User = require('./models/User');
const Item = require('./models/Item');

const port = 8080;

connectDB();



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