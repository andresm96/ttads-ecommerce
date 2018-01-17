var mongoose = require('mongoose');
var router=require('express').Router();
var Customer = mongoose.model('Customer');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');
var auth = require('../middlewares/authenticate'); //import middleware to protect some routes
var secret = config.secret;

var ObjectId = mongoose.Types.ObjectId;

//Get all
router.get('/', auth, (req, res, next) => {
    Customer.find({}).populate('order').then(customer => {
        if(!customer) {return res.sendStatus(401);}
        return res.json(customer)
    })
    .catch(next);
})

//Create
router.post('/new', (req, res, err) => {
    let user = req.body.user;
    let password = req.body.password;
    let admin = req.body.admin;
    let name = req.body.name;
    let surname = req.body.surname;
    let adress = req.body.adress;
    let birthdate = req.body.birthdate;
    let phone = req.body.phone;
    let order = req.body.order;

    var customer = new Customer({
        user: user,
        password: password,
        admin: admin,   
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

router.delete('/delete/:id', (req, res, next) =>{
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

router.put('/update/:id', (req, res, next) =>{
    let query = {"_id": req.params.id};
    Customer.findOneAndUpdate(query, {$set: req.body},{new: true},function(err, customer){
        if(err){
            res.send("got an error");
        }
        else{
            res.send(customer);                
        }
    });
})

router.post('/authenticate', function(req, res) {
    // find the user
    Customer.findOne({
      user: req.body.user
    }, function(err, customer) {
  
      if (err) throw err;
  
      if (!customer) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (customer) {
  
        // check if password matches
        if (customer.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
  
            // if user is found and password is right
            // create a token with only our given payload
            // we don't want to pass in the entire user since that has the password
            const payload = {
                admin: customer.admin 
            };
            var token = jwt.sign(payload, secret, {
            expiresIn: 30 // expires (minutes)
            });
  
            // return the information including token as JSON
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }   
  
      }
  
    });
});




module.exports=router;