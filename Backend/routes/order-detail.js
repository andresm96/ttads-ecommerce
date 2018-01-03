var mongoose = require('mongoose');
var router=require('express').Router();
var OrderDetail = mongoose.model('OrderDetail');

var ObjectId = mongoose.Types.ObjectId;

router.post('/new', (req, res, err) => {
    let number = req.body.number;
    let subtotal = req.body.subtotal;
    let quantity = req.body.quantity;
    let product = req.body.product;
    let order = req.body.order;

    var orderDetail = new OrderDetail({   
        name: name,
        subtotal: subtotal,
        quantity: quantity,
        product: product,
        order: order
    });

    orderDetail.save(function(err, doc){
        if(err){
           res.send('Error al intentar guardar el detalle del pedido.');
        }
        else{
            res.json({ message: 'Detalle de pedido agregado', data: doc });
        }
     });
    
});

module.exports=router;