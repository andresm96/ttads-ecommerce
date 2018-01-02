var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 4);

var schema = new Schema({
    cuit: {type: String, required: true},
    company: {type: String, required: true},
    adress: {type: String, required: true},
    phone: {type: String}
});

module.exports = mongoose.model('Provider', schema);