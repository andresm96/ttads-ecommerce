var mongoose = require('mongoose');
var router=require('express').Router();
var ProdProv = mongoose.model('ProdProv');
var ProductSchema = mongoose.model('Product');
var ProviderSchema = mongoose.model('Provider');
var ObjectId = mongoose.Types.ObjectId;
var Grid = require('gridfs-stream');
var mongodb = mongoose.connection;
var fs = require('fs');
var auth = require('../middlewares/authenticate'); //import middleware to protect some routes


//Get all
router.get('/', (req, res, next) => {
    ProdProv.find({}).populate('idProvider').populate('idProduct').then(ProdProv => {
        if(!ProdProv) {return res.sendStatus(401);}
        return res.json(ProdProv)
    })
    .catch(next);
})

//Get one
router.get('/:id', (req, res, next) => {
    ProdProv.findById(req.params.id).populate('idProvider').populate('idProduct')
    .then(prodprov => {
        if(!prodprov){
            res.send("Not found");
        }
        else{
            res.json(prodprov);
        }
    });   
});

router.get('/subcategory/:id', (req, res, next) =>{
    ProductSchema.find({}).where('subcategory').equals(req.params.id).then(prod => {
        var idProds = [];
        prod.forEach( element => {
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
                res.json(prodprov);
            }
        })
    });
});



//Create and update ProdProv in product
//Ver misma duda que en subcategory
router.post('/new', auth, (req, res, err) => {
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let idProvider = req.body.idProvider;
    let idProduct = req.body.idProduct;

    var prodprov = new ProdProv({   
        name: name,
        price: price,
        description: description,
        idProvider: idProvider,
        idProduct: idProduct
    });

    prodprov.save(function(err, doc){
        if(err){
           res.send('Error al intentar guardar el producto proveedor.');
        }
        else{
            res.json({ message: 'Producto proveedor agregado', data: doc });
        }
     })
     .then(ProductSchema.findById(idProduct, (err, doc) => {
         doc.prodprovs.push(prodprov._id);
         doc.save()
     }))
     .then(ProviderSchema.findById(idProvider, (err, doc) => {
        doc.prodprovs.push(prodprov._id);
        doc.save();
    })); 
});


//add image to prodprov
router.post('/new/:idProdProv/image', auth, (request, response) =>{
    var gfs = Grid(mongodb.db, mongoose.mongo);

    var idProdProv = request.params.idProdProv;
    var dirname = require('path').dirname(__dirname);
    var filename = request.files[0].filename;
    var path = request.files[0].path;
    var writestream = gfs.createWriteStream({
    _id : idProdProv,
    filename : 'image',
    mode : 'w',
    content_type: 'image/jpeg'
    });
    var read_stream = fs.createReadStream(dirname + "/uploads/" + filename).pipe(writestream);

    read_stream.on('close', function(file){
            fs.unlink(path, function(){
                response.json(200, file);

            })
        });
});
    
//Get image of prodprov
router.get('/:idProdProv/image', function(request, response){
    var gfs = Grid(mongodb.db, mongoose.mongo);
    var idProdProv = request.params.idProdProv;
    var imageStream = gfs.createReadStream({
        _id : idProdProv,
         filename : 'image',
         mode : 'r'
    });
     imageStream.on('error', function(error) {
     response.send('404', 'Not found');
     return;
    });
    response.setHeader("Content-Type", "image/jpeg");
    imageStream.pipe(response);
});

//Delete prod-prov
router.delete('/delete/:id', auth, (req, res, next) =>{
    let id = req.params.id;


    ProdProv.findById(id, (err, prodprov) => {
        if(!err){
            ProviderSchema.findById(prodprov.idProvider, (err, provider) => {
                if(provider != null){
                    index = provider.prodprovs.indexOf(id);
                    provider.prodprovs.splice(index, 1);
                    provider.save();
                }
            })
            .then(() => {
                ProductSchema.findById(prodprov.idProduct, (err, product) => {
                    if(product != null){
                        index = product.prodprovs.indexOf(id);
                        product.prodprovs.splice(index, 1);
                        product.save();
                    }
                })
            })
            .then(() => {
                prodprov.remove();
                let response = {
                    message: "Producto proveedor eliminado",
                    data: prodprov
                };
                res.status(200).send(response);
            });
        }
        else{
            res.status(500).send(err);
        }

    });
});

//Update prod-prov
router.put('/update/:id', auth, (req, res, next) =>{
    let query = {"_id": req.params.id};
    let resSend = false;

    ProdProv.findOne(query, (err, prodprov) => {
        if(req.body.idProduct != prodprov.idProduct){
            ProductSchema.findOne({"_id": prodprov.idProduct}, (err, prod) => {
                index = prod.prodprovs.indexOf(prodprov._id);
                prod.prodprovs.splice(index, 1);
                prod.save();
            })
            .then(() => {
                ProductSchema.findOne({"_id": req.body.idProduct}, (err, prod) => {
                    index = prod.prodprovs.indexOf(prodprov._id);
                    if(index === -1){
                        prod.prodprovs.push(prodprov._id);
                        prod.save();
                    }
                })
            })
            .then(() => {
                prodprov.name = req.body.name;
                prodprov.description = req.body.description;
                prodprov.price = req.body.price;
                prodprov.idProvider = req.body.idProvider;
                prodprov.idProduct = req.body.idProduct;

                prodprov.save((err, doc) => {
                    if(err){
                        res.status(500).send(err);
                    }
                    else{
                        if(!resSend){
                            resSend = true;
                            let response = {
                                message: "Prodprov modificado correctamente",
                                data: doc                
                            };
                            res.status(200).send(response);
                        }
                    }
                })
            })
        }
        if(req.body.idProvider != prodprov.idProvider){
            ProviderSchema.findOne({"_id": prodprov.idProvider}, (err, prov) => {
                index = prov.prodprovs.indexOf(prodprov._id);
                prov.prodprovs.splice(index, 1);
                prov.save();
            })
            .then(() => {
                ProviderSchema.findOne({"_id": req.body.idProvider}, (err, prov) => {
                    index = prov.prodprovs.indexOf(prodprov._id);
                    if(index === -1){
                        prov.prodprovs.push(prodprov._id);
                        prov.save();
                    }
                })
            })
            .then(() => {
                prodprov.name = req.body.name;
                prodprov.description = req.body.description;
                prodprov.price = req.body.price;
                prodprov.idProvider = req.body.idProvider;
                prodprov.idProduct = req.body.idProduct;

                prodprov.save((err, doc) => {
                    if(err){
                        res.status(500).send(err);
                    }
                    else{
                        if(!resSend){
                            resSend = true;
                            let response = {
                                message: "Prodprov modificado correctamente",
                                data: doc                
                            };
                            res.status(200).send(response);
                        }
                    }
                })
            })
        }

        if((req.body.idProvider === prodprov.idProvider) && (req.body.idProduct === prodprov.idProduct)){
            prodprov.name = req.body.name;
            prodprov.description = req.body.description;
            prodprov.price = req.body.price;
            prodprov.idProvider = req.body.idProvider;
            prodprov.idProduct = req.body.idProduct;

            prodprov.save((err, doc) => {
                if(err){
                    res.status(500).send(err);
                }
                else{
                    if(!resSend){
                        resSend = true;
                        let response = {
                            message: "Prodprov modificado correctamente",
                            data: doc                
                        };
                        res.status(200).send(response);
                    }
                }
            })
        }


    })
})


module.exports=router;