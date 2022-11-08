const express = require('express')
const router = express.Router();

const shopController = require('../controllers/shop')
// route
router.get('/', shopController.getIndex)
router.get('/products', shopController.getProducts)
router.get('/product/:productid', shopController.getProduct)
// router.get('/categories/:categoryid', shopController.getProductsByCategoryId)
// router.get('/cart', shopController.getCart)
// router.post('/cart', shopController.postCart)
// router.post('/delete-cartitem', shopController.postCartItemDelete)
// router.get('/orders', shopController.getOrders)
// router.post('/create-order', shopController.postOrders)


module.exports = router;