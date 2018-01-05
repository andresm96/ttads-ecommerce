var mongoose = require('mongoose');
var router=require('express').Router();
var Order = mongoose.model('Order');

var ObjectId = mongoose.Types.ObjectId;

//Get all
router.get('/', (req, res, next) => {
    Order.find({}).populate('idCustomer').populate('order').then(order => {
        if(!order) {return res.sendStatus(401);}
        return res.json(order)
    })
    .catch(next);
})

//Create
router.post('/new', (req, res, err) => {
    let total = req.body.total;
    let idCustomer = req.body.idCustomer;
    let order = req.body.order;

    var neworder = new Order({   
        total: total,
        idCustomer: idCustomer,
        order: order
    });

    neworder.save(function(err, doc){
        if(err){
           res.send('Error al intentar guardar el pedido.');
        }
        else{
            res.json({ message: 'Pedido agregado', data: doc });
        }
     });
    
});

module.exports=router;