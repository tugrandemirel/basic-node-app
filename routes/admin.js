const express = require('express')
const router = express.Router();
const productsController = require('../controllers/admin')
const isAdmin = require('../middleware/isAdmin')
const locals = require('../middleware/locals')

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
router.get('/add-product', isAdmin, locals, productsController.getAddProduct)
router.post('/add-product', isAdmin, productsController.postAddProduct);

router.get('/products/:productid', isAdmin, locals, productsController.getEditProduct)
router.post('/products', isAdmin, locals, productsController.postEditProduct);

router.post('/delete-product', isAdmin, locals, productsController.postDeleteProduct);


router.get('/categories', isAdmin, locals, productsController.getCategories)

router.get('/add-category', isAdmin, locals, productsController.getAddCategory)
router.post('/add-category', isAdmin, productsController.postAddCategory)

router.get('/categories/:categoryid', isAdmin, locals, productsController.getEditCategory)
router.post('/categories', isAdmin, locals, productsController.postEditCategories);

router.post('/delete-category', isAdmin, locals, productsController.postDeleteCategory);

module.exports = router;