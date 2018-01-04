var mongoose = require('mongoose');
var router=require('express').Router();
var SubCategory = mongoose.model('SubCategory');

var ObjectId = mongoose.Types.ObjectId;

router.post('/new', (req, res, err) => {
    let name = req.body.name;
    let category = req.body.category;
    let products = req.body.products;

    var subcategory = new SubCategory({   
        name: name,
        category: category,
        products: products
    });

    subcategory.save(function(err, doc){
        if(err){
           res.send('Error al intentar guardar la sub-categoria.');
        }
        else{
            res.json({ message: 'Sub-categoria agregada', data: doc });
        }
     });
    
});

module.exports=router;