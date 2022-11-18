module.exports =  (req, res, next) => {
    if (!req.session.isAuthentication) {
        return res.redirect('/login');
    }
    next();
}
