module.exports.get404Page= (req, res) => {
    /*  res.status(404);
      res.send('<h1>Page Not Found </h1>') */
     /// res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
     res.status(404).render('404',{ title: 'PAGE NOT FOUND' })
  }