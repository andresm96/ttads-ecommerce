
var mongoose = require('mongoose');
var router=require('express').Router();
var SubCategory = mongoose.model('SubCategory');
var Category = mongoose.model('Category');
var ProdProv = mongoose.model('ProdProv');
var Product = mongoose.model('Product');
var ProviderSchema = mongoose.model('Provider');
var auth = require('../middlewares/authenticate'); //import middleware to protect some routes

var ObjectId = mongoose.Types.ObjectId;
var async = require('async');


//Get all
router.get('/', (req, res, next) => {
    SubCategory.find({}).populate('products').populate('category').then(subcategory => {
        if(!subcategory) {return res.sendStatus(401);}
        return res.json(subcategory)
    })
    .catch(next);
})


//Create and update category with the reference
router.post('/new', auth, (req, res, err) => {
    let name = req.body.name;
    let category = req.body.category;
    let products = req.body.products;

    var subcategory = new SubCategory({   
        name: name,
        category: category,
        products: products
    });
    
//Ver si la response la pongo aca para devolver la subcategoría o abajo
//de ponerla aca no se si validaria el error de que falle al actualizar la categoría
//Donde está devuelve el json de la categoría con la subcategoría agregada.
    subcategory.save() 
       .then(Category.findById(category, function(err, doc){
           doc.subcategory.push(subcategory._id);
           doc.save(function(err, doc){
            if(err){
               res.send('Error al intentar guardar la sub-categoria.' + err);
            }
            else{
                res.json({ message: 'Sub-categoria agregada', data: doc})
            }
         })
       }));
});

router.delete('/delete/:id', auth, (req, res, next) =>{
    var id = req.params.id;
    var idProds = [];
    SubCategory.findById(id, (err, subcat) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            if(subcat.category !== null){
                Category.findById(subcat.category, (err, cat) => {
                if(cat !== null){
                    index = cat.subcategory.indexOf(id);
                    cat.subcategory.splice(index, 1);
                    cat.save();
                }
                })
                .then(() => {
                    idProds = subcat.products;
                    subcat.remove();
                    let response = {
                        message: "Subcategoria eliminada correctamente",
                        data: subcat
                    };
                    res.status(200).send(response);
                })
                .then(() => {
                    if(idProds != null){
                        async.eachSeries(idProds, function(idP, next) {    
                            Product.findById(idP, (err, prod)=>{                               
                                if(prod != null){
                                    var idProdProvs = prod.prodprovs;
                                    if(idProdProvs != null){
                                        deleteProdProvs(idProdProvs)
                                        .then((idsProvider) => {
                                            deleteReferenceProviders(idsProvider, idProdProvs)
                                            .then(() => {
                                                prod.remove();
                                                next();
                                            })
                                        })
                                    }
                                }
                            })
                        })
                    }
                })
            }

        }
    })
});

router.put('/update/:id', auth, (req, res, next) =>{
    let query = {"_id": req.params.id};

    SubCategory.findOne(query, (err, subcat) => {
        if(subcat.category != req.body.category){
            Category.findOne({"_id": subcat.category}, (err, cat) => {
                index = cat.subcategory.indexOf(subcat._id);
                cat.subcategory.splice(index, 1);
                cat.save((err, doc) => {
                });   
            })
            .then(() => {
                Category.findOne({"_id": req.body.category}, (err, cat) =>{
                    index = cat.subcategory.indexOf(subcat._id);
                    if(index === -1){
                        cat.subcategory.push(subcat._id);
                        cat.save();
                    }
                })
            })
            .then(() => {
                subcat.name = req.body.name;
                subcat.category = req.body.category;
                subcat.save((err, doc) => {
                    if(err){
                        res.status(500).send(err);
                    }
                    else{
                        let response = {
                            message: "Subcategoria modificada correctamente",
                            data: doc
                        };
                        res.status(200).send(response);
                    }
                })
            })
        }else{
            subcat.name = req.body.name;
            subcat.category = req.body.category;
            subcat.save((err, doc) => {
                if(err){
                    res.status(500).send(err);
                }
                else{
                    let response = {
                        message: "Subcategoria modificada correctamente",
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
                if(prov != null){
                    indexPR = prov.prodprovs.indexOf(idsProdProvs[indexEach]);
                    prov.prodprovs.splice(indexPR, 1);             
                         prov.save((err, doc) => {
                           if(indexEach === (idsProvider.length - 1)){
                              resolve();
                           }
                            indexEach++;                  
                             next();
                     })
                }

            })
        })
    })
}


function deleteProdProvs(arrIds){
    return new Promise(function (resolve, reject) {
        var idProviders = [];
        async.eachSeries(arrIds, function(id, next){
            ProdProv.findById(id, (err, prodprov) => {
                if(prodprov != null){
                    idProviders.push(prodprov.idProvider);
                    prodprov.remove();
                    if(idProviders.length === arrIds.length){
                        resolve(idProviders);
                    }
                    next();
                }
            })
        })
    })
}

module.exports=router;