var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProdProv = require('./prod-prov');



var schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    subcategory: {type: Schema.Types.ObjectId, ref: 'SubCategory'},
    prodprovs: [{type: Schema.Types.ObjectId, ref: 'ProdProv'}],
    provider: [{type: Schema.Types.ObjectId, ref: 'Provider'}]
});

schema.post('remove', function(next){
    ProdProv.remove({ product: this._id }).exec();
})


module.exports = mongoose.model('Product', schema);