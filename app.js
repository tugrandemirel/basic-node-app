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
// const userRoutes = require('./routes/shop');

//Controllers
const errorController = require('./controllers/errors')

const mongoConnect = require('./utility/database').mongoConnect;

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


// routes
app.use('/admin', adminRoutes);
// app.use(userRoutes);
app.use(errorController.get404Page)

mongoConnect(() => {
    app.listen(3000);
})