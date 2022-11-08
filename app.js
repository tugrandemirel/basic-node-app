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

const mongoConnect = require('./utility/database').mongoConnect;

const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findByUserName('tugran')
        .then((user) => {
            req.user = new User(user.name, user.email, user._id)
            next();
        })
        .catch(err => {
            console.log(err);
        })
})

// routes
app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(errorController.get404Page)

mongoConnect(() => {

    User.findByUserName('tugran')
        .then(user => {
            if (!user){
                const user = new User('tugran', 'email@email.com');
                user.save();
            }
            return user;
        }).then(user => {
            console.log(user);
            app.listen(3000);
        }).
        catch((err) => {
            console.log(err)
        })
})