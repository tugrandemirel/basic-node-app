const mongoose = require('mongoose');
const {isEmail} = require("validator");
const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: [isEmail, 'Lütfen geçerli bir email adresi giriniz'],
    },
    password: {
        type: String,
        minlength: [6, 'Şifreniz en az 6 karakter olmalıdır'],
    }
})
module.exports = mongoose.model('Login', loginSchema);