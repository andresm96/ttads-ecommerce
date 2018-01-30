var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');
var Category = require('./category');



var schema = new Schema({
    name: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

schema.post('remove', function(next){
    Product.remove({ subcategory: this._id }).exec();
})


module.exports = mongoose.model('SubCategory', schema);