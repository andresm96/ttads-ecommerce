var mongoose = require('mongoose');
var router=require('express').Router();
var Product = mongoose.model('Product');

var ObjectId = mongoose.Types.ObjectId;


//Get all con solo el precio vigente
//No está funcionando
router.get('/', (req, res, next) => {
    Product.find({})
    .populate({path: 'price', options: { $sort: {'fecha': -1}, limit: 1}})
    .then(product => {
        if(!product) {return res.sendStatus(401);}
        return res.json(product)
    })
    .catch(next);
})

//Create
router.post('/new', (req, res, err) => {
    let name = req.body.name;
    let description = req.body.description;
    let subcategory = req.body.subcategory;
    let price = req.body.price;
    let provider = req.body.provider;

    var product = new Product({
        name: name,
        description: description,
        subcategory: subcategory,
        price: price,
        provider: provider
    });

    product.save(function(err, doc){
        if(err){
           res.send('Error al intentar guardar el producto.');
        }
        else{
            res.json({ message: 'Producto agregado', data: doc });
        }
     });
    
});

module.exports=router;