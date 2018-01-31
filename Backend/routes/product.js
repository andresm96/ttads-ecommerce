var mongoose = require('mongoose');
var router=require('express').Router();
var Product = mongoose.model('Product');
var Subcategory = mongoose.model('SubCategory');
var ProdProv = mongoose.model('ProdProv');
var ProviderSchema = mongoose.model('Provider');
var ObjectId = mongoose.Types.ObjectId;
var async = require('async');

//Get all con solo el precio vigente
//No está funcionando
router.get('/', (req, res, next) => {
    Product.find({})
    .populate('subcategory')
    .then(product => {
        if(!product) {return res.sendStatus(401);}
        return res.json(product)
    })
    .catch(next);
})

//Search term
router.get('/search', (req, res, next)=> {
    var name = req.query.name;

    Product.find({name: new RegExp(name, 'i')}).then(products =>{
        if(!products) {return res.sendStatus(401);}
        var idProds = [];
        products.forEach( element => {
            idProds.push(element._id);
        });
        return idProds;  
    })
    .then(idProds => {
        ProdProv.find({}).where('idProduct').in(idProds).populate('idProduct').populate('idProvider')
        .then(prodprov => {
            if(!prodprov){
                res.send("Not found");
            }
            else{
                return res.json({'products': prodprov});
            }
        })
    })
    .catch(next);
});


//Get one
router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id).populate('subcategory')
    .then(product => {
        if(!product){
            res.send("Not found");
        }
        else{
            res.json(product);
        }
    });   
});


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
        provider: provider
    });

    product.save(function(err, doc){
        if(err){
           res.send('Error al intentar guardar el producto.');
        }
        else{
            res.json({ message: 'Producto agregado', data: doc });
        }
     })
     .then(() => {
         Subcategory.findById(subcategory, (err, doc) => {
             doc.products.push(product._id);
             doc.save();
         })
     });
    
});


router.delete('/delete/:id', (req, res, next) =>{
    let id = req.params.id;
    var idProdProvs = [];
    Product.findById(id, (err, prod) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            idProdProvs = prod.prodprovs;
            Subcategory.findById(prod.subcategory, (err, subcat) => {
                index = subcat.products.indexOf(id);
                subcat.products.splice(index, 1);
                subcat.save();
            })
            .then(() => {
                prod.remove();
                let response = {
                    message: "Producto eliminado correctamente",
                    data: prod
                };
                res.status(200).send(response);
            })
            .then(() => {
                deleteProdProvs(idProdProvs)
                               .then((idProviders) => {
                                   deleteReferenceProviders(idProviders, idProdProvs)
                                                           .then(() => {
                                                           })
                               })
            })
        }
    })

  
});


router.put('/update/:id', (req, res, next) =>{
    let query = {"_id": req.params.id};

    Product.findOne(query, (err, prod) => {
        if(prod.subcategory != req.body.subcategory){
            Subcategory.findOne({"_id": prod.subcategory}, (err, subcat) => {
                index = subcat.products.indexOf(prod._id);
                subcat.products.splice(index, 1);
                subcat.save();
            })
            .then(() => {
                Subcategory.findOne({"_id": req.body.subcategory}, (err, subcat) => {
                    index = subcat.products.indexOf(prod._id);
                    if(index === -1){
                        subcat.products.push(prod._id);
                        subcat.save();
                    }
                })
            })
            .then(() => {
                prod.name = req.body.name;
                prod.description = req.body.description;
                prod.subcategory = req.body.subcategory;

                prod.save((err, doc) =>{
                    if(err){
                        res.status(500).send(err);
                    }
                    else{
                        let response = {
                            message: "Producto modificado correctamente",
                            data: doc
                        };
                        res.status(200).send(response);
                    }
                })
            })
        }
        else{
            prod.name = req.body.name;
            prod.description = req.body.description;
            prod.subcategory = req.body.subcategory;

            prod.save((err, doc) =>{
                if(err){
                    res.status(500).send(err);
                }
                else{
                    let response = {
                        message: "Producto modificado correctamente",
                        data: doc
                    };
                    res.status(200).send(response);
                }
            })
        }
    })

})

function deleteReferenceProviders(idsProvider, idsProdProvs){
    return new Promise(function (resolve, reject){
        var indexEach = 0;
        async.eachSeries(idsProvider, function(idProv, next) {
            ProviderSchema.findById(idProv, (err, prov) => {
                indexPR = prov.prodprovs.indexOf(idsProdProvs[indexEach]);
                prov.prodprovs.splice(indexPR, 1);
                prov.save((err, doc) => {
                    if(indexEach === (idsProvider.length - 1)){
                        resolve();
                    }
                    indexEach++;                  
                    next();
                })
            })
        })
    })
}


function deleteProdProvs(arrIds){
    return new Promise(function (resolve, reject) {
        var idProviders = [];
        async.eachSeries(arrIds, function(id, next){
            ProdProv.findById(id, (err, prodprov) => {
                console.log("Encontro este prodprov en la promise: "+prodprov);
                idProviders.push(prodprov.idProvider);
                prodprov.remove();
                if(idProviders.length === arrIds.length){
                    resolve(idProviders);
                }
                next();
            })
        })
    })
}


module.exports=router;