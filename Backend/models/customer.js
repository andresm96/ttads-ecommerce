var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: String, required: true}, 
    password: {type: String, required: true}, 
    admin: {type: Boolean, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    adress: {type: String},
    birthdate: {type: Date},
    phone: {type: String},
    order: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

module.exports = mongoose.model('Customer', schema);