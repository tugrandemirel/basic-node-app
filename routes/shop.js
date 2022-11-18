const express = require('express')
const router = express.Router();

const shopController = require('../controllers/shop')
const isAuthenticated = require("../middleware/authentication");
const locals = require("../middleware/locals");
// route
router.get('/', locals, shopController.getIndex)
router.get('/products', locals, shopController.getProducts)
router.get('/product/:productid', locals, shopController.getProduct)
router.get('/categories/:categoryid', locals, shopController.getProductsByCategoryId)
router.get('/cart', isAuthenticated, locals, shopController.getCart)
router.post('/cart', isAuthenticated, locals, shopController.postCart)
router.post('/delete-cartitem', isAuthenticated, locals, shopController.postCartItemDelete)
router.get('/orders', isAuthenticated, locals, shopController.getOrders)
router.post('/create-order', isAuthenticated, locals, shopController.postOrders)


module.exports = router;