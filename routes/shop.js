const express = require('express')
const router = express.Router();

const shopController = require('../controllers/shop')
const isAuthenticated = require("../middleware/authentication");
const csrf = require("../middleware/csrf");
// route
router.get('/', csrf, shopController.getIndex)
router.get('/products', csrf, shopController.getProducts)
router.get('/product/:productid', csrf, shopController.getProduct)
router.get('/categories/:categoryid', shopController.getProductsByCategoryId)
router.get('/cart', isAuthenticated, csrf, shopController.getCart)
router.post('/cart', isAuthenticated, csrf, shopController.postCart)
router.post('/delete-cartitem', isAuthenticated, csrf, shopController.postCartItemDelete)
router.get('/orders', isAuthenticated, csrf, shopController.getOrders)
router.post('/create-order', isAuthenticated, csrf, shopController.postOrders)


module.exports = router;