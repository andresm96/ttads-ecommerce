var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: String, required: true}, 
    password: {type: String, required: true}, 
    admin: {type: Boolean, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    adress: {type: String, required: true},
    birthdate: {type: Date},
    phone: {type: String},
    email: {type: String},
    province: {type: String, required: true},
    city: {type: String, required: true},
    order: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

schema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }

module.exports = mongoose.model('Customer', schema);