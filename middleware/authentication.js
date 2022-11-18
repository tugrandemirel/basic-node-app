module.exports =  (req, res, next) => {
    if (!req.session.isAuthentication) {
        // login kullanıcının gitmek istediği sayfayı sessiona ataadık
        req.session.redirectTo = req.url
        return res.redirect('/login');
    }
    next();
}
