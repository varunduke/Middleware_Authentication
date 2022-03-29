const mongoose = require('mongoose');

//regular expression validator
const regExpMatch = /[a-zA-Z]/;

//String Enumerators
const countries = ['USA', 'Canada', 'Japan', 'UK']; 

const customerSchema = new mongoose.Schema({
    name: {type: String, required: true, match: regExpMatch},
    address: String,
    city: String,
    state: String,
    country: {type: String, required: true, enum: countries},
    zipCode: String,
    createdDate: Date,
    isActive: {type: Boolean, required: true, default: true},
    disCount: {type: Number, min: 5, max: 12}
});

//adding a friendly error message
customerSchema.path('city').required(true, 
    'you forgot to add the name of the city. It cannot be empty');

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;