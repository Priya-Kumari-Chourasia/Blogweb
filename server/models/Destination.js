const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
      },
      description: {
        type: String,
        required: 'This field is required.'
      },
      
      category: {
        type: String,
        enum: ['India', 'America', 'Thailand', 'Korea', 'Australia','Italy','Nepal'],
        required: 'This field is required.'
      },
      image: {
        type: String,
        required: 'This field is required.'
      },

});





module.exports = mongoose.model('Destination',destinationSchema);