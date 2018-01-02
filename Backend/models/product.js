var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose, 4);

var schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Float},
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
});

module.exports = mongoose.model('Product', schema);