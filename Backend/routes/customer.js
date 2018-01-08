var mongoose = require('mongoose');
var router=require('express').Router();
var Customer = mongoose.model('Customer');

var ObjectId = mongoose.Types.ObjectId;

//Get all
router.get('/', (req, res, next) => {
    Customer.find({}).populate('order').then(customer => {
        if(!customer) {return res.sendStatus(401);}
        return res.json(customer)
    })
    .catch(next);
})

//Create
router.post('/new', (req, res, err) => {
    let name = req.body.name;
    let surname = req.body.surname;
    let adress = req.body.adress;
    let birthdate = req.body.birthdate;
    let phone = req.body.phone;
    let order = req.body.order;

    var customer = new Customer({   
        name: name,
        surname: surname,
        adress: adress,
        birthdate: birthdate,
        phone: phone,
        order: order
    });

    customer.save(function(err, doc){
        if(err){
           res.send('Error al intentar guardar el cliente.');
        }
        else{
            res.json({ message: 'Cliente agregado', data: doc });
        }
     });
    
});

router.delete('/:id', (req, res, next) =>{
    let id = req.params.id;

    Customer.findByIdAndRemove(id, (err, customer)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            let response = {
                message: "Cliente eliminado correctamente",
                id: customer._id
            };
            res.status(200).send(response);
        }
    });
});


module.exports=router;