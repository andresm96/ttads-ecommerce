var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 4);

var schema = new Schema({
    total: {type: Float},
    shipped: {type: boolean},
    idCustomer: {type: Schema.Types.ObjectId, ref: 'Customer'},
    order: [{type: Schema.Types.ObjectId, ref: 'OrderDetail'}]
});

module.exports = mongoose.model('Order', schema);