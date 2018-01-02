var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 4);

var schema = new Schema({
    monto: {type: Float, required: true},
    fecha: {type: Date, required: true},
    idProvider: {type: Schema.Types.ObjectId, ref: 'Provider'},
    idProduct: {type: Schema.Types.ObjectId, ref: 'Product'}
});

module.exports = mongoose.model('Price', schema);