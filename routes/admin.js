const express = require('express')
const router = express.Router();
const productsController = require('../controllers/admin')

router.get('/products', productsController.getProducts)

router.get('/add-product', productsController.getAddProduct)
router.post('/add-product', productsController.postAddProduct);

router.get('/products/:productid', productsController.getEditProduct)
router.post('/products', productsController.postEditProduct);

router.post('/delete-product', productsController.postDeleteProduct);


router.get('/add-category', productsController.getAddCategory)
router.post('/add-category', productsController.postAddCategory)
router.get('/categories', productsController.getCategories)


module.exports = router;