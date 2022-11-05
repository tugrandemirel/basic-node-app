const express = require('express')
const router = express.Router();

const products = [
    {name: 'Samsung S8', price: 3000, image: 'product1.jpg', description: 'Good a phone1'},
    {name: 'Samsung S7', price: 4000, image: 'product2.jpeg', description: 'Good a phone2'},
    {name: 'Samsung S5', price: 5000, image: 'product3.jpeg', description: 'Good a phone3'},
    {name: 'Samsung S9', price: 6000, image: 'product4.jpg', description: 'Good a phone4'}
]

router.get('/add-product',(req, res, next) =>{
    console.log('middleware çalıştı')
    res.render('add-product', {
        title: 'Add a new product',
        path: '/admin/add-product'
    });
})

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    products.push({
        name: req.body.name,
        price: req.body.price,
        image: 'product4.jpg',
        description: req.body.description
    });
    res.redirect('/')
});

module.exports.routes = router;
module.exports.products = products;