// =====================================
// get the packages we need ============
// =====================================
var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var methodOverride = require('method-override');
var fs             = require('fs');
var multer         = require('multer');
var jwt            = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config         = require('./config'); // get our config file


// =======================
// configuration =========
// =======================
const port = 3000; // set port
mongoose.connect(config.database, {useMongoClient: true }); // connect to database

var app = express();

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use(multer({dest:__dirname+'/uploads/'}).any());


// =======================
// routes ================
// =======================
require('./models/category.js');
require('./models/customer.js');
require('./models/order-detail.js');
require('./models/order.js');
require('./models/prod-prov.js');
require('./models/product.js');
require('./models/provider.js');
require('./models/subcategory.js');

app.use(require('./routes/index.js'));

// get an instance of the router for api routes
var router=express.Router();
// apply the routes to our application
app.use(router);


// =======================
// start the server ======
// =======================
app.listen(port, () => {
    console.log('We are live on ' + port);
});