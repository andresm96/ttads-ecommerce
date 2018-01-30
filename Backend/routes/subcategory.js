var mongoose = require('mongoose');
var router=require('express').Router();
var SubCategory = mongoose.model('SubCategory');
var Category = mongoose.model('Category');
var ObjectId = mongoose.Types.ObjectId;


//Get all
router.get('/', (req, res, next) => {
    SubCategory.find({}).populate('products').populate('category').then(subcategory => {
        if(!subcategory) {return res.sendStatus(401);}
        return res.json(subcategory)
    })
    .catch(next);
})


//Create and update category with the reference
router.post('/new', (req, res, err) => {
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


router.delete('/delete/:id', (req, res, next) =>{
    var id = req.params.id;

    SubCategory.findOne({_id: id}, (err, subcategory)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            let response = {               
                message: "Subcategoria eliminada correctamente",
                id: subcategory._id
            };
            subcategory.remove();            
            res.status(200).send(response);
        }
    });
});

router.put('/update/:id', (req, res, next) =>{
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

module.exports=router;