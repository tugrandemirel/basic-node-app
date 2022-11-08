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
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');

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

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

let _user;
sequelize
    .sync()
    // .sync({force: true})
    .then(result => {
        User.findByPk(1)
            .then((user) => {
                if(!user){
                    User.create({name: 'Ahmet', email: 'deneme@deneme.com'})
                }
                return user;
            }).then((user) => {
                _user = user;
                return user.getCart();
            }).then((cart) => {
                if(!cart){
                    return _user.createCart();
                }
                return cart;
            }).then(() => {
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
        console.log(result)
    })
    .catch(err => {
                console.log(err)
            })


app.listen(3000, ()=>{
    console.log('listening on port 3000');
});

