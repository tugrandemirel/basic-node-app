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
const mongoose = require('mongoose');
//Controllers
const errorController = require('./controllers/errors')


const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findOne({name: 'tugran'})
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err)
        })
})

// routes
app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(errorController.get404Page)

const url = 'mongodb+srv://tugran:1289558T.d@cluster0.qfo1war.mongodb.net/node-app?retryWrites=true&w=majority'
mongoose.connect(url)
.then(() => {
    console.log('Connected');
    User.findOne({name: 'tugran'})
        .then((user) => {
            if (!user){
                const user = new User({
                    name: 'tugran',
                    email: 'demireltugran66@gmail.com',
                    cart: {
                        items: []
                    }
                })
                return user.save();
            }
            return user;
        })
        .then(user => {
            console.log(user);
            app.listen(3000);
        })
        .catch(err => {
            console.log(err);
        })

}).catch( err => {
    console.log(err);
})