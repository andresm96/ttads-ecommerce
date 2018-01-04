var express        = require('express');
var mongoose    = require('mongoose');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var methodOverride = require('method-override');

var app = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://localhost/tp-final',{useMongoClient: true });
require('./models/category.js');
require('./models/customer.js');
require('./models/order-detail.js');
require('./models/order.js');
require('./models/price.js');
require('./models/product.js');
require('./models/provider.js');
require('./models/subcategory.js');

app.use(require('./routes/index.js'));

var router=express.Router();
app.use(router);

app.listen(port, () => {
    console.log('We are live on ' + port);
});