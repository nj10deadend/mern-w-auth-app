const mongoose = require('mongoose');
// import Bug from '../models/Bug.js';
// import User from '../models/User.js'

const connectDB = async () => {
    try {
        //database Name
        const databaseName='test-store';
        const con = await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;