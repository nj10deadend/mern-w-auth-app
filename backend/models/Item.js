const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    
    name: {
        type: String, 
        unique: true
    },
    price: {
        type: String
    },
    img: String,
    category: String

})

const Item = mongoose.model('Item', listSchema);


module.exports = Item;