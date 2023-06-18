const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    name: {
        type:String,
        required: 'This field is required.'
    },
    image: {
        type:String,
        required: 'This field is required.'
    }

});

module.exports = mongoose.model('Location',locationSchema);