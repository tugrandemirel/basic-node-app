const Admin = require('../models/product')

// module.exports.getProducts = (req, res, next) =>{
//    const products = Admin.getAll();
//     res.render('index', {
//        title: 'Home Page',
//        products: products,
//        path: '/'
//     })
//  }
//
//  exports.getAddProduct = (req, res, next) =>{
//     console.log('middleware çalıştı')
//     res.render('add-product', {
//         title: 'Add a new product',
//         path: '/admin/add-product'
//     });
// }
//
// exports.postAddProduct = (req, res, next) => {
//     const product = new Admin(
//         req.body.name,
//         req.body.price,
//         req.body.imageUrl,
//         req.body.description
//     )
//     product.saveProduct();
//     res.redirect('/')
// }