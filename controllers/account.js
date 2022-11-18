const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
exports.getLogin = (req, res, next) => {
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/login', {
        path: '/login',
        title: 'Login',
        errorMessage: errorMessage
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if(!user){
                req.session.errorMessage = 'Bu mail adresi ile bir kullanıcı bulunamadı';
                req.session.save(function (err) {
                    console.log(err);
                    return res.redirect('/login');
                })
            }
            // hashalenmiş passwrod ile kullanıcıdan gelen password karşılaştırması
            bcrypt.compare(password, user.password)
                .then(isSuccess => {
                    if(isSuccess){
                        // login
                        // kullanıcı session'a kaydedilir
                        req.session.isAuthentication = true;
                        // session'a kaydedilen kullanıcı bilgileri
                        req.session.user = user;
                        return req.session.save(function (err) {
                            var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
                            // session'dan redirect url silinir
                            delete req.session.redirectTo;
                            res.redirect(redirectTo);
                        })
                    }else{
                        // not login
                        req.session.errorMessage = 'Şifre hatalı';
                        req.session.save(function (err) {
                            console.log(err);
                            return res.redirect('/login');
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })

   /* if (email === 'demireltugran66@gmail.com' && password === '123456') {
        //req.isAuthenticated = true;
        // cookie => kullanıcı tarayıcısında bilgiler saklanır.
        // res.cookie('isAuthentication', true);

        // session => kullanıcı bilgileri sunucuda saklanır.
        req.session.isAuthentication = true;
        res.redirect('/');
    }else{
        req.isAuthenticated = false;
        res.redirect('/login');
    }*/
}

exports.getRegister = (req, res, next) => {
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/register', {
        path: '/register',
        title: 'register',
        errorMessage: errorMessage
    })
}

exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email: email
    })
        .then(user => {
            if (user){
                req.session.errorMessage = 'Bu mail adresine ait farklı bir kullanıcı bulunmaktadır';
                req.session.save(function (err) {
                    console.log(err);
                    return res.redirect('/register');
                })
            }
            else{
                return bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        console.log(hashedPassword);
                        const newUser = new User({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            cart: { items: [] }
                        })
                        return newUser.save();
                    })
            }
        })
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getReset = (req, res, next) => {

    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/reset', {
        path: '/reset-password',
        title: 'Reset Password',
        errorMessage: errorMessage
    })
}

exports.postReset = (req, res, next) => {
    const email = req.body.email;
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log(err);
            return res.redirect('/reset-password');
        }
        const token = buffer.toString('hex');

        User.findOne({ email: email})
            .then(user => {
                if(!user){
                    req.session.errorMessage = 'Bu mail adresi ile bir kullanıcı bulunamadı';
                    req.session.save(function (err) {
                        console.log(err);
                        return res.redirect('/reset-password');
                    })
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 1000*60*60;

                return user.save();
            })
            .then(result => {
                res.redirect('/');
                // mail gönderme işlemi
                const  msg = {
                    // kime gidecek
                    to: email,
                    // kimden geldi
                    from: 'demireltugran66@gmail.com',
                    subject: 'Password Reset',
                    html: `
                            <h1>Şifre sıfırlama isteği</h1>
                            <p>Şifrenizi sıfırlamak için <a href="http://localhost:3000/reset-password/${token}">tıklayınız</a></p>
                        `,
                }
            })
            .catch(err => {
                console.log(err);
            })
    })
}

exports.getLogout = (req, res, next) => {
    // session'dan kullanıcı bilgileri silinir ve kullanıcı çıkış yapar
    req.session.destroy(err => {
            console.log(err);
            res.redirect('/');
        })
}

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() }
    })
        .then(user => {
            res.render('account/new-password', {
                path: '/new-password',
                title: 'New Password',
                errorMessage: errorMessage,
                userId: user._id,
                passwordToken: token
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const token = req.body.passwordToken;
    const userId = req.body.userId;
    let _user;
    User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
            _id: userId
        })
        .then(user => {
            _user = user;
            return bcrypt.hash(newPassword, 12)
                .then(hashedPassword => {
                    _user.password = hashedPassword;
                    _user.resetToken = undefined;
                    _user.resetTokenExpiration = undefined;
                    return _user.save();
                })
                .then(() => {
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
}
