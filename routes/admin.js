const express = require('express')
const router = express.Router();
const productsController = require('../controllers/admin')
const isAuthenticated = require('../middleware/authentication')
router.get('/products', productsController.getProducts)

// path, middleware, controller
/*

router.get('/add-product', (req, res, next) => {
    if (!req.session.isAuthentication) {
        return res.redirect('/login');
    }
    next();
} ,productsController.getAddProduct)
*/
router.get('/add-product', isAuthenticated, productsController.getAddProduct)
router.post('/add-product', productsController.postAddProduct);

router.get('/products/:productid', productsController.getEditProduct)
router.post('/products', productsController.postEditProduct);

router.post('/delete-product', productsController.postDeleteProduct);


router.get('/categories', productsController.getCategories)

router.get('/add-category', productsController.getAddCategory)
router.post('/add-category', productsController.postAddCategory)

router.get('/categories/:categoryid', productsController.getEditCategory)
router.post('/categories', productsController.postEditCategories);

router.post('/delete-category', productsController.postDeleteCategory);

module.exports = router;