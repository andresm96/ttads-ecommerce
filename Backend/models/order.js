var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 4);

var schema = new Schema({
    total: {type: Float},
    idCustomer: {type: Schema.Types.ObjectId, ref: 'Customer'}
});

module.exports = mongoose.model('Order', schema);