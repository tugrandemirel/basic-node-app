const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path')

// template engine ismi belirtme 
app.set('view engine', 'pug');
// pug dosyalarını views klasörü içerisinde kullanacağımızı belirttik
app.set('views', 'views');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');


const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
// routes
app.use('/admin', adminRoutes);
app.use(userRoutes);

/*
app.set('title', 'My Sİte')
console.log(app.get('title'));
*/
app.use(errorController.get404Page)

app.listen(3000, ()=>{
    console.log('listening on port 3000');
});

