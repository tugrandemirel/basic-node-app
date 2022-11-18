const Product = require('../models/product')
const Category = require('../models/category')

module.exports.getProducts = (req, res, next) =>{
    Product.find({ userId: req.user._id})
        .populate('userId', 'name')
        .select('name price imageUrl userId')
        .sort({ date: 1})
        .select({ name:1, price: 1})
        .then(products => {
            console.log(products)
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
    Category.find()
        .then(categories => {
            res.render('admin/add-product', {
                title: 'Add a new product',
                categories: categories,
                path: '/admin/add-product'
            });
        })
}

exports.postAddProduct = (req, res, next) => {

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    const product = new Product({
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user._id
    })
    product.save()
        .then(() => {
            res.redirect('/admin/products');
        }).catch((err) => {
            console.log(err);
    })
}

 exports.getEditProduct = (req, res, next) =>{
    Product.findOne({
        _id: req.params.productid,
        userId: req.user._id
    })
        // .populate('categories', 'name')
        .then((product) => {
            if (!product)
                return res.redirect('/')
           return product
        })
        .then(product => {
            Category.find()
                .then(categories => {

                    categories = categories.map(category => {
                        if (product.categories){
                            product.categories.find(item => {
                                if(item.toString() === category._id.toString()){
                                    category.selected = true;
                                }
                            })
                        }
                        return category
                    })

                    res.render('admin/edit-product', {
                        title: 'Edit Product',
                        product: product,
                        categories: categories,
                        path: '/admin/edit-product'
                    })
                })
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
    const categories = req.body.categoryids;
    const description = req.body.description;

    Product.update({ _id: id, userId: req.user._id }, {
        $set: {
            name: name,
            price: price,
            imageUrl: imageUrl,
            description: description,
            categories: categories
        }
    }).then(() => {
        res.redirect('/admin/products?action=edit');
    }).catch(err => {
        console.log(err)
    })
}

exports.postDeleteProduct = (req, res, next) => {
    const productid = req.body.productid;
    Product.deleteOne({ _id: productid, userId: req.user._id })
        .then((result) => {
            if (result.deletedCount === 0)
                return res.redirect('/')
            res.redirect('/admin/products?action=delete');
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getCategories = (req, res, next) => {
    Category.find()
        .then(categories => {
            res.render('admin/categories', {
                title: 'Admin Categories',
                categories: categories,
                path: '/admin/categories',
                action: req.query.action
        })
        }).catch((error) => {console.log(error);})
}

exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'Add a new category',
        path: '/admin/add-category'
    });
}

exports.postAddCategory = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const category = new Category({
        name: name,
        description: description
    })
    category.save()
        .then(() => {
            res.redirect('/admin/categories?action=create');
        }).catch((err) => {
            console.log(err);
    })
}

exports.getEditCategory = (req, res, next) => {
    Category.findById(req.params.categoryid)
        .then((category) => {
            console.log(category)
            if (!category) {
                return res.redirect('back');
            }else{
                res.render('admin/edit-category', {
                    title: 'Edit Category',
                    category: category,
                    path: '/admin/edit-category'
                })
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postEditCategories = (req, res, next) => {
    const categoryid = req.body.categoryid;
    const name = req.body.name;
    const description = req.body.description;
    Category.findById(categoryid)
        .then((category) => {
            category.name = name;
            category.description = description;
            return category.save();
        }).then(() => {
            res.redirect('/admin/categories?action=edit');
        })
        .catch((err) => {console.log(err);})
}

exports.postDeleteCategory = (req, res, next) => {
    const categoryid = req.body.categoryid;
    console.log(categoryid)
    Category.findByIdAndRemove(categoryid)
        .then(() => {
            console.log('Category has been deleted')
            res.redirect('/admin/categories?action=delete');
        })
        .catch((err) => {console.log(err);})
}