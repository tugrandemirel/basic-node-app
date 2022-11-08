const Product = require('../models/product')
// const Category = require('../models/category')

module.exports.getProducts = (req, res, next) =>{
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products',
                products: products,
                path: '/admin/products',
                action: req.query.action
            })
        }).catch((error) => {
            console.log(error);
        });
 }

 exports.getAddProduct = (req, res, next) =>{
     res.render('admin/add-product', {
         title: 'Add a new product',
         path: '/admin/add-product'
     });
}

exports.postAddProduct = (req, res, next) => {

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    const product = new Product(name, price, description, imageUrl, null, req.user._id)
    product.save()
        .then(() => {
            res.redirect('/admin/products');
        }).catch((err) => {
            console.log(err);
    })
}

 exports.getEditProduct = (req, res, next) =>{
    Product.findById(req.params.productid)
        .then((product) => {
            if (!product) {
                return res.redirect('back');
            }else{
                res.render('admin/edit-product', {
                    title: 'Edit Product',
                    product: product,
                    path: '/admin/edit-product'
                })
            }
        })
        .catch((err) => {
            console.log(err);
        });

}

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    // const categoryid = req.body.categoryid;
    // const userid = req.user.id;
    const product = new Product(name, price, description, imageUrl, id, req.user._id)
    product.save()
        .then(() => {
            res.redirect('/admin/products?action=edit');
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const productid = req.body.productid;
    Product.deleteById(productid)
        .then(() => {
            console.log('Product has been deleted')
            res.redirect('/admin/products?action=delete');
        })
        .catch((err) => {
            console.log(err);
        })
}