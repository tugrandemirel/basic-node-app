const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path')

// template engine ismi belirtme 
app.set('view engine', 'pug');
// pug dosyalarını views klasörü içerisinde kullanacağımızı belirttik
app.set('views', 'views');
const admin = require('./routes/admin');
const userRoutes = require('./routes/user');


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
// routes
app.use('/admin', admin.routes);
app.use(userRoutes);

/*
app.set('title', 'My Sİte')
console.log(app.get('title'));
*/
app.use((req, res) => {
  /*  res.status(404);
    res.send('<h1>Page Not Found </h1>') */
   /// res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
   res.status(404).render('404',{ title: 'PAGE NOT FOUND' })
})

app.listen(3000, ()=>{
    console.log('listening on port 3000');
});

