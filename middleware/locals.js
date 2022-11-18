module.exports = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.isAuthenticated = req.session.isAuthentication;
    res.locals.isAdmin = req.user ? req.user.isAdmin : false;
    next();
}