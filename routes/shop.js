const express = require('express')
const router = express.Router();

const shopController = require('../controllers/shop')
// route
router.get('/', shopController.getIndex)
router.get('/products', shopController.getProducts)
router.get('/product/:productid', shopController.getProduct)
router.get('/categories/:categoryid', shopController.getProductsByCategoryId)
router.get('/cart', shopController.getCart)
router.post('/cart', shopController.postCart)
router.get('/orders', shopController.getOrders)


module.exports = router;