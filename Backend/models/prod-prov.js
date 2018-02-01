var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 4);

var schema = new Schema({
    name: {type: String, required: true},
    price: {type: Float, required: true},
    idProvider: {type: Schema.Types.ObjectId, ref: 'Provider'},
    idProduct: {type: Schema.Types.ObjectId, ref: 'Product'},
    description: {type: String},
    quantitySold: {type: Number}
});

module.exports = mongoose.model('ProdProv', schema);