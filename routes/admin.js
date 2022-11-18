const express = require('express')
const router = express.Router();
const productsController = require('../controllers/admin')
const isAuthenticated = require('../middleware/authentication')
const csrf = require('../middleware/csrf')

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
router.get('/add-product', isAuthenticated, csrf, productsController.getAddProduct)
router.post('/add-product', isAuthenticated, productsController.postAddProduct);

router.get('/products/:productid', isAuthenticated, csrf, productsController.getEditProduct)
router.post('/products', isAuthenticated, csrf, productsController.postEditProduct);

router.post('/delete-product', isAuthenticated, csrf, productsController.postDeleteProduct);


router.get('/categories', isAuthenticated, csrf, productsController.getCategories)

router.get('/add-category', isAuthenticated, csrf, productsController.getAddCategory)
router.post('/add-category', isAuthenticated, productsController.postAddCategory)

router.get('/categories/:categoryid', isAuthenticated, csrf, productsController.getEditCategory)
router.post('/categories', isAuthenticated, csrf, productsController.postEditCategories);

router.post('/delete-category', isAuthenticated, csrf, productsController.postDeleteCategory);

module.exports = router;