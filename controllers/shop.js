const Product = require('../models/product')
const Category = require('../models/category')

module.exports.getIndex = (req, res, next) =>{
    Product.findAll()
        .then(products => {
            Category.findAll()
                .then(categories => {
                    res.render('shop/index', {
                        title: 'Shopping',
                        products: products,
                        categories: categories,
                        path: '/'
                    })
                })
                .catch(err => {
                    console.log(err);
                })

        }).catch(err => {
            console.log(err);
    })
}

module.exports.getProducts = (req, res, next) =>{
    Product.findAll()
        .then(products => {
            Category.findAll()
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
            console.log(error);
        });
}

module.exports.getProductsByCategoryId = (req, res, next) =>{
    const categoryid = req.params.categoryid;
    const model = [];
    Category.findAll()
        .then((categories) => {
            model.categories = categories;
            return Product.findByCategoryId(categoryid)
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

    req.user.getCart()
        .then((products) => {
            console.log(products)
            res.render('shop/cart', {
                title: 'Cart',
                products: products,
                path: '/cart'
            })
        }).catch(err =>{
            console.log(err);
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
        .getCart()
        .then((cart) => {
            return cart.getProducts({where: {id: productId}})
        }).then((products) => {
            const product = products[0];
            return product.cartItem.destroy();
        }).then(() => {
            res.redirect('/cart')
        }).catch(err => {
        console.log(err);
        })
}

module.exports.getOrders = (req, res, next) =>{
    req.user
        .getOrders({include: ['products']})
        .then((orders) => {
            console.log(orders)
            res.render('shop/orders', {
                title: 'Orders',
                orders: orders,
                path: '/orders'
            })
        })
        .catch(err => {
            console.log(err);
        })

}
module.exports.postOrders = (req, res, next) =>{
    console.log('here')
    let userCart;
    req.user
        .getCart()
            .then(cart => {
                userCart = cart;
                return cart.getProducts();
            })
                .then(products => {
                    return req.user.createOrder()
                        .then(order => {
                            order.addProducts(products.map(product => {
                                product.orderItem = {
                                    quantity: product.cartItem.quantity,
                                    price: product.price
                                }
                                return product
                            }));
                        })
                        .catch(err => {
                            console.log(err);
                        })

                })
                .then(() => {
                    userCart.setProducts(null)
                })
                .then(() => {
                    res.redirect('/orders')
                })
                .catch(err => {
                       console.log(err);
                })
            .catch(err => {

            })
}


