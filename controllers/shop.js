const Product = require('../models/product')
const Category = require('../models/category')

module.exports.getIndex = (req, res, next) =>{
    const categories = Category.getAll();

    Product.getAll().then(products => {
        res.render('shop/index', {
            title: 'Shopping',
            products: products[0],
            categories: categories,
            path: '/'
        })
    }).catch((error) => {
        console.log(error);
    });
}

module.exports.getProducts = (req, res, next) =>{
    const categories = Category.getAll();

    Product.getAll().then(products => {
        res.render('shop/products', {
            title: 'Products',
            products: products[0],
            categories: categories,
            path: '/'
        })
    }).catch((error) => {
        console.log(error);
    });
}

module.exports.getProductsByCategoryId = (req, res, next) =>{
    const categoryid = req.params.categoryid;
    const products = Product.getProductsByCategoryId(categoryid);
    const categories = Category.getAll();
    res.render('shop/products', {
        title: 'Products',
        products: products,
        categories: categories,
        selectedCategory: categoryid,
        path: '/products'
    })
}
module.exports.getProduct = (req, res, next) =>{
   const productId = req.params.productid;
   Product.getById((productId)).then((product) =>{
       console.log(product[0]);
       console.log(product[0][0].name);
       res.render('shop/product-detail', {
            title: product[0][0].name,
            product: product[0][0],
            path: '/products'
       })
   }).catch((error) => {
       console.log(error);
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


