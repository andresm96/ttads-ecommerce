var mongoose = require('mongoose');
var router=require('express').Router();
var Customer = mongoose.model('Customer');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');
var bcrypt = require('bcryptjs');   //used to hash password in db
var auth = require('../middlewares/authenticate'); //import middleware to protect some routes
var secret = config.secret;

var ObjectId = mongoose.Types.ObjectId;

//Get all <--- hay que ponerle el middleware, lo sacamos para hacer el abm
router.get('/', (req, res, next) => {
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
    let city = req.body.city;
    let province = req.body.province;
    let email = req.body.email;

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    var customer = new Customer({
        user: user,
        password: hashedPassword,
        admin: admin,   
        name: name,
        surname: surname,
        adress: adress,
        birthdate: birthdate,
        phone: phone,
        city: city,
        province: province,
        email: email,
        order: order
    });

    customer.save(function(err, customer){
        if(err){
           res.status(500).send('Error al intentar guardar el cliente.');
        }
        else{
            res.json({ message: 'Cliente agregado', customer: customer });
        }
     });
    
});

router.delete('/delete/:id', auth, (req, res, next) =>{
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

router.put('/update/:id', auth, (req, res, next) =>{
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

router.post('/login', function(req, res) {
    // find the user
    Customer.findOne({ user: req.body.user }, function(err, customer) {
      if (err) return res.status(500).send('Error on the server.');
  
      if (!customer) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (customer) {

        var passwordIsValid = bcrypt.compareSync(req.body.password, customer.password);

        // check if password matches
        if (!passwordIsValid) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
  
            // if user is found and password is right
            // create a token with only our given payload
            // we don't want to pass in the entire user since that has the password
            let role = 'default';
            if(customer.admin){
                role = 'admin';
            }
            let playload = { id: customer._id, role: role };
            let key =  config.secret;
            // create a token
            var token = jwt.sign(playload, key, {
                algorithm: 'HS256', expiresIn: 86400// expires in 24 hours
            });
  
            // return the information including token as JSON
            res.status(200).json({
                success: true,
                message: 'Login successful!',
                token: token
            });
        }   
  
      }
  
    });
});




module.exports=router;