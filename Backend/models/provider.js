var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 4);

var schema = new Schema({
    cuit: {type: String, required: true},
    company: {type: String, required: true},
    adress: {type: String, required: true},
    phone: {type: String},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('Provider', schema);