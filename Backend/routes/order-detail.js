var mongoose = require('mongoose');
var router=require('express').Router();
var OrderDetail = mongoose.model('OrderDetail');
var OrderSchema = mongoose.model('Order');
var ObjectId = mongoose.Types.ObjectId;

//Get all
router.get('/', (req, res, next) => {
    OrderDetail.find({}).populate('product').populate('order').then(orderdetail => {
        if(!orderdetail) {return res.sendStatus(401);}
        return res.json(orderdetail)
    })
    .catch(next);
})

//Create and update order
//Ver comentario en subcategory, mismo método
router.post('/new', (req, res, err) => {
    let number = req.body.number;
    let subtotal = req.body.subtotal;
    let quantity = req.body.quantity;
    let product = req.body.product;
    let order = req.body.order;

    var orderDetail = new OrderDetail({   
        number: number,
        subtotal: subtotal,
        quantity: quantity,
        product: product,
        order: order
    });

    orderDetail.save()
     .then(OrderSchema.findById(order, (err, doc) => {
        doc.order.push(orderDetail._id);
        doc.save(function(err, doc){
            if(err){
               res.send('Error al intentar guardar el detalle del pedido.');
            }
            else{
                res.json({ message: 'Detalle de pedido agregado', data: doc });
            }
         });
     }));
    
});

module.exports=router;