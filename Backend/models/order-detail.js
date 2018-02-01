var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);
var ProdProv = require('./prod-prov');

var schema = new Schema({
    number: {type: Number},
    subtotal: {type: Float, required: true},
    quantity: {type: Number, required: true},
    prodprov: {type: Schema.Types.ObjectId, ref: 'ProdProv'},
    order: {type: Schema.Types.ObjectId, ref: 'Order'}
});

schema.post('save', function(doc){
    var prod = ProdProv.findById(this.prodprov).exec().then((pp) => {
        pp.quantitySold += this.quantity;
        pp.save();
    });
  });

  
module.exports = mongoose.model('OrderDetail', schema);