var mongoose = require('mongoose');
var router=require('express').Router();
var Category = mongoose.model('Category');
var Subcategory = mongoose.model('SubCategory');
var Product = mongoose.model('Product');
var ProviderSchema = mongoose.model('Provider');
var ProdProv = mongoose.model('ProdProv');

var async = require('async');

var ObjectId = mongoose.Types.ObjectId;

//Get all
router.get('/', (req, res, next) => {
    Category.find({}).populate('subcategory').then(categories => {
        if(!categories) {return res.sendStatus(401);}
        return res.json(categories)
    })
    .catch(next);
})

//Get one
router.get('/:id', (req, res, next) => {
    Category.findById(req.params.id).populate('subcategory')
    .then(subcat => {
        if(!subcat){
            res.send("Not found");
        }
        else{
            res.json(subcat);
        }
    });   
});

//Create
router.post('/new', (req, res, err) => {
    let name = req.body.name;
    let subcategory = req.body.subcategory;

    var category = new Category({   
        name: name,
        subcategory: subcategory
    });

    category.save(function(err, doc){
        if(err){
           res.send('Error al intentar guardar la categoria.');
        }
        else{
            res.json({ message: 'Categoria agregada', data: doc });
        }
     });
    
});

router.delete('/delete/:id', (req, res, next) =>{
    let id = req.params.id;    
    let idSubcategories = [];
    Category.findById(id, (err, cat) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            idSubcategories = cat.subcategory;
            cat.remove();
            let response = {
                message: "Categoria eliminada correctamente",
                data: cat
            };
            res.status(200).send(response);
        }
    })
    .then(() => {
        if(idSubcategories != null){
            async.eachSeries(idSubcategories, function(idSubcat, next){
                var idProds =[];
                Subcategory.findById(idSubcat, (err, subcat) => {
                    idProds = subcat.products;
                    subcat.remove();
                })
                .then(() => {
                    if(idProds != null){
                        async.eachSeries(idProds, function(idPr, next2){
                            Product.findById(idPr, (err, prod) => {
                                if(prod.prodprovs != null){
                                    var idProdProvs = prod.prodprovs;
                                    deleteProdProvs(idProdProvs)
                                                   .then((idsProviders) => {
                                                       deleteReferenceProviders(idsProviders, idProdProvs)
                                                                               .then(() => {
                                                                                   prod.remove();
                                                                                   next2();
                                                                               });
                                                   });
                                }
                            });
                        }, function(err){
                            next();
                        })
                    }
                })
            })
        }
    })
});

router.put('/update/:id', (req, res, next) =>{
    let query = {"_id": req.params.id};
    Category.findOneAndUpdate(query, {$set: req.body},{new: true},function(err, category){
        if(err){
            res.send("got an error");
        }
        else{
            res.send(category);                
        }
    });
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