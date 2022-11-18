module.exports =  (req, res, next) => {
    if (!req.session.isAuthentication) {
        // login kullanıcının gitmek istediği sayfayı sessiona ataadık
        return res.redirect('/login');
    }
    if (!req.user.isAdmin) {
        // login kullanıcının gitmek istediği sayfayı sessiona ataadık
        return res.redirect('/');
    }
    next();
}
