var mongoose = require('mongoose');
var router=require('express').Router();
var ProdProv = mongoose.model('ProdProv');
var ProductSchema = mongoose.model('Product');
var ProviderSchema = mongoose.model('Provider');
var ObjectId = mongoose.Types.ObjectId;
var Grid = require('gridfs-stream');
var mongodb = mongoose.connection;
var fs = require('fs');


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


//add image to prodprov
router.post('/new/:idProdProv/image', (request, response) =>{
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



module.exports=router;