const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: String,
    email: {
        type: String,
        required: [true, 'User email can\'t be blank'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'User password can\'t be blank'],
    },
    admin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;