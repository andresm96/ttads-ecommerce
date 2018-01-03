var mongoose = require('mongoose');
var router=require('express').Router();
var Category = mongoose.model('Category');

var ObjectId = mongoose.Types.ObjectId;

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
    
})

module.exports=router;