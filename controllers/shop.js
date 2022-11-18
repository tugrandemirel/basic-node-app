const Product = require('../models/product')
const Category = require('../models/category')
const Order = require('../models/order')

module.exports.getIndex = (req, res, next) =>{
    Product.find()
        .then(products => {
            return products;
        })
        .then(products => {
            Category.find()
                .then(categories => {
                    res.render('shop/index', {
                        title: 'Shopping',
                        products: products,
                        categories: categories,
                        path: '/'
                    })
                })
        })
        .catch(err => {
            next(err)
    })
}

module.exports.getProducts = (req, res, next) =>{
    // mongoose ile veritabanı işlemleri için kullanilabilecek operatörler
    // eq = equal => eşit
    // ne = not equal => eşit değil
    // gt = greater than => büyük
    // gte = greater than or equal to => büyük veya eşit
    // lt = less than => küçük
    // lte = less than or equal to => küçük veya eşit
    // in => içinde
    // nin = not in => içinde değil

    Product
        .find()
        // .find({price: {$gt: 10, $lt: 20}})
        // .find({price: {$in: [10, 20, 30]}})
        // .find({ price: {$gt: 2000}, name: 'Samsung s6' })
        // .or([{ price: {$gt: 2000}, name: 'Samsung s6' }])
        // arama işlemleri için regex kullanımı
        //start with
        // .find({ name: /^Samsung/ })
        //end with
        // .find({ name: /s6$/ })
        //contains
        // .find({ name: /.*s6.*/ })
        .then(products => {
            return products;
        })
        .then( products =>{
            Category.find()
                .then(categories => {
                    res.render('shop/products', {
                        title: 'Products',
                        products: products,
                        categories: categories,
                        path: '/'
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch((error) => {
            next(error)
        });
}

module.exports.getProductsByCategoryId = (req, res, next) =>{
    const categoryid = req.params.categoryid;
    const model = [];
    Category.find()
        .then((categories) => {
            model.categories = categories;
            return Product.find({ categories: categoryid })
        })
        .then((products) =>{
            res.render('shop/products', {
                title: 'Products',
                products: products,
                categories: model.categories,
                selectedCategory: categoryid,
                path: '/products'
            })
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.getProduct = (req, res, next) =>{
    Product.findById(req.params.productid)
        .then(product => {
            console.log(product)
                res.render('shop/product-detail', {
                    title: product.name,
                    product: product,
                    path: '/products'
                })
        }).catch(err => {
        next(err)
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

    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then((user) => {
            console.log(user.cart.items)
            res.render('shop/cart', {
                title: 'Cart',
                products: user.cart.items,
                path: '/cart'
            })
        }).catch(err =>{
        next(err)
        })
}

module.exports.postCart = (req, res, next) =>{

    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

module.exports.postCartItemDelete = (req, res, next) =>{
    const productId = req.body.productid;
    req.user
        .deleteCartItem(productId)
        .then(() => {
            res.redirect('/cart')
        }).catch(err => {
        console.log(err);
        })
}

module.exports.getOrders = (req, res, next) =>{
    Order.find({
            'user.userId': req.user._id
        })
        .then(orders => {
            console.log(orders)
            res.render('shop/orders', {
                title: 'Orders',
                orders: orders,
                path: '/orders'
            })
        }).catch(err => {
        next(err)
    })
}

module.exports.postOrders = (req, res, next) =>{
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const order = new Order({
                user: {
                    userId: req.user._id,
                    name: req.user.name,
                    email: req.user.email
                },
                items: user.cart.items.map(p => {
                    return {
                        product: {
                            _id: p.productId._id,
                            name: p.productId.name,
                            price: p.productId.price,
                            imageUrl: p.productId.imageUrl
                        },
                        quantity: p.quantity
                    }
                })
            })
            return order.save()
        }).then(() => {
            return req.user.clearCart() // clear cart
        })
        .then(() => {
            res.redirect('/orders')
        }).catch(err => {
        next(err)
        })
}


