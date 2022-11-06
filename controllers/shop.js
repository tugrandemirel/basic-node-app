const Product = require('../models/product')
const Category = require('../models/category')

module.exports.getIndex = (req, res, next) =>{
    Product.findAll({
        attributes: ['id', 'name', 'price', 'imageUrl'],
    })
        .then(products => {
            Category.findAll()
                .then((categories) => {
                    res.render('shop/index', {
                        title: 'Shopping',
                        products: products,
                        categories: categories,
                        path: '/'
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports.getProducts = (req, res, next) =>{
    Product.findAll({
        attributes: ['id', 'name', 'price', 'imageUrl'],
    })
        .then(products => {
            Category.findAll()
                .then((categories) => {
                    res.render('shop/products', {
                        title: 'Products',
                        products: products,
                        categories: categories,
                        path: '/'
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((error) => {
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
    Product.findAll({
        attributes: ['id', 'name', 'price', 'imageUrl', 'description'],
        where: {id: req.params.productid}
    })
        .then((product) => {
            res.render('shop/product-detail', {
                title: product[0].name,
                product: product[0],
                path: '/products'
            })
        })
        .catch((err) => {
            console.log(err);
        })
   /*const productId = req.params.productid;
   Product.findByPk((productId)).then((product) =>{
       res.render('shop/product-detail', {
            title: product.name,
            product: product,
            path: '/products'
       })
   }).catch((error) => {
       console.log(error);
   })*/
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


