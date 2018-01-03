var mongoose = require('mongoose');
var router=require('express').Router();
var Price = mongoose.model('Price');

var ObjectId = mongoose.Types.ObjectId;

router.post('/new', (req, res, err) => {
    let monto = req.body.monto;
    let fecha = req.body.fecha;
    let idProvider = req.body.idProvider;
    let idProduct = req.body.idProduct;

    var price = new Price({   
        monto: monto,
        fecha: fecha,
        idProvider: idProvider,
        idProduct: idProduct
    });

    price.save(function(err, doc){
        if(err){
           res.send('Error al intentar guardar el precio.');
        }
        else{
            res.json({ message: 'Precio agregado', data: doc });
        }
     });
    
});

module.exports=router;