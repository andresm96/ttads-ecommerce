var fs          = require('fs');
var mongoose    = require('mongoose');
var router      = require('express').Router();
var multer      = require('multer');
var upload      = multer({ dest: 'uploads/' });


router.post('/upload', upload.single("file"),(req, res, err) => {
    var dirname = require('path').dirname(__dirname);
    var filename = req.files[0].filename;
    var path = req.files[0].path;
    var type = req.files[0].mimetype;
        var conn = req.conn;
        var Grid = require('gridfs-stream');
        Grid.mongo = mongoose.mongo;
        var gfs = Grid(mongoose.connection.db);
    
        var writestream = gfs.createWriteStream({
            filename: filename
        });
        var read_stream = fs.createReadStream(dirname + "/uploads/" + filename).pipe(writestream);
        if(!err){
            res.send("Error al guardar la imágen");
        }
        else{
            res.send("Imagen almacenada")
        }
});


module.exports = router;    