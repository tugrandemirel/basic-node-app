const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path')

// template engine ismi belirtme 
app.set('view engine', 'pug');
// pug dosyalarını views klasörü içerisinde kullanacağımızı belirttik
app.set('views', 'views');

// Routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

//Controllers
const errorController = require('./controllers/errors')
const sequelize = require('./utility/database');

// Models
const Category = require('./models/category');
const Product = require('./models/product');
const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

// routes
app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(errorController.get404Page)


// Product.hasOne(Category);
Product.belongsTo(Category, {foreignKey: {allowNull: false}});
Category.hasMany(Product);

Product.belongsTo(User);
User.hasMany(Product);



sequelize
    .sync()
    // .sync({force: true})
    .then(result => {
        User.findByPk(1)
            .then((user) => {
                if(!user){
                    User.create({
                        name: 'Ahmet',
                        email: 'deneme@deneme.com'
                    })
                }
                return user;
            })
            .then((user) => {
                Category.count()
                    .then(count =>{
                        if (count === 0) {
                              Category.bulkCreate([
                                {name: 'Telefon', description: 'Telefon kategorisi'},
                                {name: 'Bilgisayar', description: 'Bilgisayar kategorisi'},
                                {name: 'Elektronik', description: 'Elektronik kategorisi'}
                            ])
                        }
                    })
            })
            .then((result) =>{
                Product.count()
                    .then((count) => {
                        if (count ===0 ) {
                            Product.bulkCreate([
                                {name: 'Samsung S10', description: 'Samsung S10 telefon', imageUrl:'product1.jpg' , price: 5000, categoryId: 1, userId: 1},
                                {name: 'Samsung S9', description: 'Samsung S9 telefon', imageUrl:'product1.jpg' , price: 4000, categoryId: 1, userId: 1},
                                {name: 'Samsung S8', description: 'Samsung S8 telefon', imageUrl:'product1.jpg' , price: 3000, categoryId: 1, userId: 1},
                                {name: 'Samsung S7', description: 'Samsung S7 telefon', imageUrl:'product1.jpg' , price: 2000, categoryId: 1, userId: 1}
                            ]);
                        }
                    })
            })
            })
    .catch(err => {
                console.log(err)
            })


app.listen(3000, ()=>{
    console.log('listening on port 3000');
});

