var mongoose = require('mongoose');
var router=require('express').Router();
var ProdProv = mongoose.model('ProdProv');
var ProductSchema = mongoose.model('Product');
var ProviderSchema = mongoose.model('Provider');
var ObjectId = mongoose.Types.ObjectId;


//Get all
router.get('/', (req, res, next) => {
    ProdProv.find({}).populate('idProvider').populate('idProduct').then(ProdProv => {
        if(!ProdProv) {return res.sendStatus(401);}
        return res.json(ProdProv)
    })
    .catch(next);
})

//Create and update ProdProv in product
//Ver misma duda que en subcategory
router.post('/new', (req, res, err) => {
    let price = req.body.price;
    let description = req.body.description;
    let idProvider = req.body.idProvider;
    let idProduct = req.body.idProduct;

    var prodprov = new ProdProv({   
        price: price,
        description: description,
        idProvider: idProvider,
        idProduct: idProduct
    });

    prodprov.save()
     .then(ProductSchema.findById(idProduct, (err, doc) => {
         doc.prodprovs.push(prodprov._id);
         doc.save(function(err, doc){
            if(err){
               res.send('Error al intentar guardar el precio.');
            }
            else{
                res.json({ message: 'Precio agregado', data: doc });
            }
         })
     }))
     .then(ProviderSchema.findById(idProduct, (err, doc) => {
        doc.prodprovs.push(prodprov._id);
        doc.save();
    })); 
});

module.exports=router;