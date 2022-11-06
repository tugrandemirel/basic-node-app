const Product = require('../models/product')
const Category = require('../models/category')

module.exports.getProducts = (req, res, next) =>{
    Product.getAll().then(products => {
        res.render('admin/products', {
            title: 'Admin Products',
            products: products[0],
            path: '/admin/products',
            action: req.query.action
        })
    }).catch((error) => {
        console.log(error);
    });
 }

 exports.getAddProduct = (req, res, next) =>{
    Category.getAll()
        .then((categories) => {
            res.render('admin/add-product', {
                title: 'Add a new product',
                categories: categories[0],
                path: '/admin/add-product'
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product()
    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.categoryid = req.body.categoryid;
    product.saveProduct()
        .then(() =>{
            res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log(err);
        })
}

 exports.getEditProduct = (req, res, next) =>{
    Product.getById(req.params.productid)
        .then((product) => {
            Category.getAll()
                .then((categories) => {
                    console.log(product[0][0].category_id);
                    res.render('admin/edit-product', {
                        title: 'Edit Product',
                        product: product[0][0],
                        categories: categories[0],
                        path: '/admin/products'
                    });
                })
                .catch((err) => {
                    console.log(err);
                })

        })
        .catch((err) => {
            console.log(err);
        });

}

exports.postEditProduct = (req, res, next) => {
    const product = new Product();
    product.id = req.body.id;
    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.categoryid = req.body.categoryid;
    Product.Update(product)
        .then(() => {
            res.redirect('/admin/products?action=edit')
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postDeleteProduct = (req, res, next) => {
    const product = req.body.id;
    Product.DeleteById(product)
        .then(() => {
            res.redirect('/admin/products?action=delete')
        })
        .catch((err) => {
            console.log(err);
        });
}