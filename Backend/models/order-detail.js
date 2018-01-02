var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

var schema = new Schema({
    number: {type: Number, required: true},
    subtotal: {type: Float, required: true},
    quantity: {type: Number, required: true},
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    order: {type: Schema.Types.ObjectId, ref: 'Order'}
});

module.exports = mongoose.model('OrderDetail', schema);