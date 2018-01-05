var mongoose = require('mongoose');
var router=require('express').Router();
var Price = mongoose.model('Price');
var ProductSchema = mongoose.model('Product');
var ObjectId = mongoose.Types.ObjectId;


//Get all
router.get('/', (req, res, next) => {
    Price.find({}).populate('idProvider').populate('idProduct').then(price => {
        if(!price) {return res.sendStatus(401);}
        return res.json(price)
    })
    .catch(next);
})

//Create and update price in product
//Ver misma duda que en subcategory
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

    price.save()
     .then(ProductSchema.findById(idProduct, (err, doc) => {
         doc.price.push(price);
         doc.save(function(err, doc){
            if(err){
               res.send('Error al intentar guardar el precio.');
            }
            else{
                res.json({ message: 'Precio agregado', data: doc });
            }
         })
     }));
    
});

module.exports=router;