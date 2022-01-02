var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    position: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

var Model = mongoose.model('product', productSchema);
module.exports = Model;