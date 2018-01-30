var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    subcategory: {type: Schema.Types.ObjectId, ref: 'SubCategory'},
    prodprovs: [{type: Schema.Types.ObjectId, ref: 'ProdProv'}],
    provider: [{type: Schema.Types.ObjectId, ref: 'Provider'}]
});

schema.pre('findOneAndUpdate', function(){
    var v = this.getUpdate().v;
    console.log(v);
})

schema.post('findOneAndUpdate', function(result){
    console.log(JSON.stringify(result));
    
})

module.exports = mongoose.model('Product', schema);