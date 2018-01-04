var router=require('express').Router();

router.use('/api/category', require('./category'));
router.use('/api/customer', require('./customer'));
router.use('/api/order-detail', require('./order-detail'));
router.use('/api/order', require('./order'));
router.use('/api/price', require('./price'));
router.use('/api/product', require('./product'));
router.use('/api/provider', require('./provider'));
router.use('/api/subcategory', require('./subcategory'));

module.exports=router;