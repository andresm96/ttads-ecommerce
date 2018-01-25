var mongoose = require('mongoose');
var router=require('express').Router();
var Category = mongoose.model('Category');

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
/*
router.delete('/delete/:id', (req, res, next) =>{
    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, category)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            let response = {
                message: "Categoria eliminada correctamente",
                id: category._id
            };
            res.status(200).send(response);
        }
    });
});*/

router.delete('/delete/:id', (req, res, next) =>{
    let id = req.params.id;
    
    Category.findByIdAndRemove(id, (err, category)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            let response = {
                message: "Categoria eliminada correctamente",
                id: category._id
            };
            res.status(200).send(response);
        }
    });

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


module.exports=router;