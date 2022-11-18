module.exports.get404Page= (req, res) => {
    /*  res.status(404);
      res.send('<h1>Page Not Found </h1>') */
     /// res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
     res.status(404).render('error/404',{ title: 'PAGE NOT FOUND' })
  }

    module.exports.get500Page = (req, res) => {
        res.status(500).render('error/500', { title: 'PAGE NOT FOUND' })
    }