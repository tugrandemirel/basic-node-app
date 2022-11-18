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
const accountRoutes = require('./routes/account');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
//Controllers
const errorController = require('./controllers/errors')


const User = require('./models/user');

const url = 'mongodb+srv://tugran:1289558T.d@cluster0.qfo1war.mongodb.net/node-app?retryWrites=true&w=majority'

const store = new MongoDBStore({
    uri: url,
    collection: 'mySessions'
})
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    store: store
}))
app.use(csurf())

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    User.findById(req.session.user._id)
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
app.use(accountRoutes);
app.use(errorController.get404Page)

mongoose.connect(url)
.then(() => {
    console.log('Connected');
    app.listen(3000);

}).catch( err => {
    console.log(err);
})