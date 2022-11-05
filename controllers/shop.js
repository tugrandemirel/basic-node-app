const Product = require('../models/product')

module.exports.getIndex = (req, res, next) =>{
    const products = Product.getAll();
    res.render('shop/index', {
        title: 'Shopping',
        products: products,
        path: '/'
    })
}

module.exports.getProducts = (req, res, next) =>{
    const products = Product.getAll();
    res.render('shop/products', {
        title: 'Products',
        products: products,
        path: '/products'
    })
}
module.exports.getProduct = (req, res, next) =>{
   const productId = req.params.productid;
    console.log(productId)
    console.log(Product.getById((productId)))
   res.redirect('/');
}

module.exports.getProductDetails = (req, res, next) =>{
    res.render('shop/details', {
        title: 'Details',
        path: '/details'
    })
}

module.exports.getCart = (req, res, next) =>{
    res.render('shop/cart', {
        title: 'Cart',
        path: '/cart'
    })
}

module.exports.getOrders = (req, res, next) =>{
    res.render('shop/orders', {
        title: 'Orders',
        path: '/orders'
    })
}
