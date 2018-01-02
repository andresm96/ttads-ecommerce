var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    subcategory: {type: Schema.Types.ObjectId, ref: 'SubCategory'},
    price: [{type: Schema.Types.ObjectId, ref: 'Price'}],
    provider: [{type: Schema.Types.ObjectId, ref: 'Provider'}]
});

module.exports = mongoose.model('Product', schema);