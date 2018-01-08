var fs          = require('fs');
var mongoose    = require('mongoose');
var router      = require('express').Router();
var multer      = require('multer');
var upload      = multer({ dest: 'uploads/' });
var ProdProv    = mongoose.model('ProdProv');


router.post('/upload/:idProdProv', upload.single("file"),(req, res, err) => {
    var idProdProv = req.params.idProdProv;
    var dirname = require('path').dirname(__dirname);
    var filename = req.files[0].filename;
    var path = req.files[0].path;
    var type = req.files[0].mimetype;
        var conn = req.conn;
        var Grid = require('gridfs-stream');
        Grid.mongo = mongoose.mongo;
        var gfs = Grid(mongoose.connection.db);   
        var writestream = gfs.createWriteStream({
            filename: filename,
            content_type: type
        });
        var read_stream = fs.createReadStream(dirname + "/uploads/" + filename).pipe(writestream);

        read_stream.on('close', function(file){
            fs.unlink(path, function(){
                res.json(200, file);
            }).then(ProdProv.findById(idProdProv, (err, prodprov) => {
                prodprov.idImage = file._id;
                prodprov.save((err, doc) =>{
                    if(err){
                        res.send("Error al guardar imágen");
                    }
                    else{
                        res.json({message: "Imágen agregada", data: doc})
                    }
                });
            }))
        });

});


router.get('/:idImage', function (req, res) {
    var gridfs = require('gridfs-stream');
    gridfs.mongo = mongoose.mongo;
    let idImage = req.params.idImage;
    var gfs = gridfs(mongoose.connection.db);
    // Check file exist on MongoDB
    gfs.exist({ _id: idImage }, function (err, file) {
        if (err || !file) {
            res.send('File Not Found');
        } else {
            var readstream = gfs.createReadStream({ _id: idImage });
            readstream.pipe(res);
        }
    });
});

module.exports = router;    