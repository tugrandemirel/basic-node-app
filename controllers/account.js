const User = require('../models/user');
const bcrypt = require('bcrypt');
exports.getLogin = (req, res, next) => {
    res.render('account/login', {
        path: '/login',
        title: 'Login'
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if(!user){
                return res.redirect('/login');
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
                        res.redirect('/login');
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
    res.render('account/register', {
        path: '/register',
        title: 'register'
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
                return res.redirect('/register');
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
    res.render('account/reset', {
        path: '/reset',
        title: 'reset'
    })
}

exports.postReset = (req, res, next) => {
    res.redirect('/login');
}

exports.getLogout = (req, res, next) => {
    // session'dan kullanıcı bilgileri silinir ve kullanıcı çıkış yapar
    req.session.destroy(err => {
            console.log(err);
            res.redirect('/');
        })
}
