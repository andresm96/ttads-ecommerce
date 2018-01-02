var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    adress: {type: String},
    birthdate: {type: Date},
    phone: {type: String},
    order: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

module.exports = mongoose.model('Customer', schema);