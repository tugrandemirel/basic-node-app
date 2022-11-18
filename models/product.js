const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ürün ismi girmelisiniz.'],
        trim: true
    },
    price: {
        type: Number,
        required: function () {
            return this.isActive
        }
    },
    description: {
        type: String,
        maxlength: 2000,
        trim: true
    },
    imageUrl: String,
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'En az bir tane ürün etiketi giriniz.'
        }
    },
    isActive: {
        type: Boolean,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    }]
});

module.exports = mongoose.model('Product', productSchema);