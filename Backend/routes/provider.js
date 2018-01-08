var mongoose = require('mongoose');
var router=require('express').Router();
var Provider = mongoose.model('Provider');

var ObjectId = mongoose.Types.ObjectId;


//Get all
router.get('/', (req, res, next) => {
    Provider.find({}).populate('products').then(provider => {
        if(!provider) {return res.sendStatus(401);}
        return res.json(provider)
    })
    .catch(next);
})

//Create
router.post('/new', (req, res, err) => {
    let cuit = req.body.cuit;
    let company = req.body.company;
    let adress = req.body.adres;
    let phone = req.body.phone;
    let products = req.body.products;

    var provider = new Provider({   
        cuit: cuit,
        company: company,
        adress: adress,
        phone: phone,
        products: products
    });

    provider.save(function(err, doc){
        if(err){
           res.send('Error al intentar guardar el proveedor.');
        }
        else{
            res.json({ message: 'Proveedor agregado', data: doc });
        }
     });
    
});

router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    Provider.findByIdAndRemove(id, (err, provider)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            let response = {
                message: "Proveedor eliminado correctamente",
                id: provider._id
            };
            res.status(200).send(response);
        }
    });
});

module.exports=router;