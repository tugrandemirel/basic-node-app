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
           next(error);
        });
 }

 exports.getAddProduct = (req, res, next) =>{
    Category.find()
        .then(categories => {
                res.render('admin/add-product', {
                    title: 'Admin Products',
                    categories: categories,
                    path: '/admin/add-product',
                    inputs: {
                        name: '',
                        price: '',
                        description: '',
                        imageUrl: ''
                    }
                })
            })
        .catch(err => {
           next(err)
        })
}

exports.postAddProduct = (req, res, next) => {

    const name = req.body.name;
    const price = req.body.price;
    const file = req.file;
    const description = req.body.description;
    console.log(file)
    const product = new Product({
        name: name,
        price: price,
        description: description,
        tags: ['test'],
        imageUrl: file.filename,
        userId: req.user._id
    })
    product.save()
        .then(() => {
            res.redirect('/admin/products');
        }).catch((err) => {
            console.log(err);
        if (err.name === 'ValidationError'){
            var message = '';
            for(field in err.errors){
                message += err.errors[field].message + '<br>';
            }
            res.render('admin/add-product', {
                title: 'Add a new product',
                path: '/admin/add-product',
                errorMessage: message,
                csrfToken: req.csrfToken(),
                inputs: {
                    name: name,
                    price: price,
                    description: description,
                   imageUrl: file.filename
                }
            })
        }else{
            // hata mesajı göster
           /* res.render('admin/add-product', {
                title: 'Add a new product',
                path: '/admin/add-product',
                errorMessage: 'Beklenmedik bir hata oldu. Lütfen daha sonra tekrar deneyiniz.',
                csrfToken: req.csrfToken(),
                inputs: {
                    name: name,
                    price: price,
                    description: description,
                    imageUrl: imageUrl
                }
            })*/
            // yönlendirme yapılabilir
            /*res.status(500).render('admin/add-product', {
                title: 'Add a new product',
                path: '/admin/add-product',
                errorMessage: 'Beklenmedik bir hata oldu. Lütfen daha sonra tekrar deneyiniz.',
                csrfToken: req.csrfToken(),
                inputs: {
                    name: name,
                    price: price,
                    description: description,
                    imageUrl: imageUrl
                }
            })*/

            // 500 hata kodu gösterebilir(server hatası)
            next(err);
        }
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
            next(err);
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
        next(err);
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
            next(err);
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
        }).catch((error) => {
        next(error);
        })
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
        next(err)
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
            next(err);
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
        .catch((err) => {
            next(err)
        })
}

exports.postDeleteCategory = (req, res, next) => {
    const categoryid = req.body.categoryid;
    console.log(categoryid)
    Category.findByIdAndRemove(categoryid)
        .then(() => {
            console.log('Category has been deleted')
            res.redirect('/admin/categories?action=delete');
        })
        .catch((err) =>
            next(err)
        )
}