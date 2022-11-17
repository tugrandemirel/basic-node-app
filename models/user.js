const Product = require('./product');
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
})

userSchema.methods.addToCart = function(product){
    const index = this.cart.items.findIndex( cp => {
        return cp.productId.toString() === product._id.toString();
    })
    const updatedCartItems = [...this.cart.items];
    let itemQuantity = 1;
    // cart da zaten eklenmek istenen ürün var mı? varsa quantity arttırılacak
    if (index >= 0){
        itemQuantity = this.cart.items[index].quantity + 1;
        updatedCartItems[index].quantity = itemQuantity;
    }else{  // yoksa yeni bir ürün eklenecek
        updatedCartItems.push({
            productId: product._id,
            quantity: itemQuantity
        })
    }
    this.cart = {
        items: updatedCartItems
    }
    return this.save();
}

userSchema.methods.getCart = function(){
    const ids = this.cart.items.map( i => {
        return i.productId;
    })
    return Product
        .find({
            _id: { $in: ids}
        })
        .select('name price imageUrl')
        .then(products => {
            return products.map(p => {
                return {
                    name: p.name,
                    price: p.price,
                    imageUrl: p.imageUrl,
                    quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                }
            })
        }).catch(err => {
            console.log(err);
        })
    console.log(ids);
}

userSchema.methods.deleteCartItem = function(productId){
    const cartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    })
    this.cart.items = cartItems;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);
/*
const getdb = require('../utility/database').getdb;
const mongodb = require('mongodb');

class User{
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart ? cart : {};
        this.cart.items = cart ? cart.items : [];
        this._id = id;
    }

    save(){
        const db = getdb();
        return db.collection('users').insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }

    getCart(){
        const ids = this.cart.items.map( i => {
            return i.productId;
        })
        const db = getdb();
        return db.collection('products')
            .find({
                _id: { $in: ids}
            })
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    }
                })
            }).catch(err => {
                console.log(err);
            })
        console.log(ids);
    }

    addToCart(product){
        const index = this.cart.items.findIndex( cp => {
            return cp.productId.toString() === product._id.toString();
        })
        const updatedCartItems = [...this.cart.items];
        let itemQuantity = 1;
        // cart da zaten eklenmek istenen ürün var mı? varsa quantity arttırılacak
        if (index >= 0){
            itemQuantity = this.cart.items[index].quantity + 1;
            updatedCartItems[index].quantity = itemQuantity;
        }else{  // yoksa yeni bir ürün eklenecek
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: itemQuantity
            })
        }

        const db = getdb();
        return db.collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: { items: updatedCartItems } } }
            )
            .then()
            .catch(err => console.log(err))
    }

    static findById(userid){
        const db = getdb();
        return db.collection('users')
            .findOne({_id: new mongodb.ObjectId(userid)})
            .then(user => {
                return user;
            }).catch(err => {
                console.log(err);
            })
    }

    static findByUserName(username){
        const db = getdb();
        return db.collection('users')
            .findOne({name: username})
            .then(user => {
                return user;
            }).catch(err => {
                console.log(err);
            })
    }

    deleteCartItem(productid){
        const cartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productid.toString();
        })
        const db = getdb();
        return db.collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                { $set: {
                    cart:
                        {
                            items: cartItems
                        }
                    }
                }
            )
    }

    addOrder(){
        // kullanıcının kartındaki ürünleri al
        const db = getdb();
        return this.getCart()
            .then( products => {
                const order = {
                    items: products.map(item => {
                        return {
                            _id: item._id,
                            name: item.name,
                            price: item.price,
                            imageUrl: item.imageUrl,
                            userId: item.userId,
                            quantity: item.quantity
                        }
                    }),
                    user: {
                        _id: new mongodb.ObjectId(this._id),
                        name: this.name,
                        email: this.email
                    },
                    date: new Date().toLocaleString()
                }

                return db.collection('orders').insertOne(order)
            })
            .then(() => {
                this.cart = { items: [] }
                return db.collection('users')
                    .updateOne(
                        { _id: new mongodb.ObjectId(this._id) },
                        { $set: { cart: { items: [] } } }
                    )
            })

        // order tablosuna yeni bir kayıt ekle

        // kullanıcının kartındaki ürünleri sıfırla
    }

    getOrders(){
        const db = getdb();
        return db.collection('orders')
            .find(
                { 'user._id': new mongodb.ObjectId(this._id) }
            ).toArray()
    }
}
module.exports = User;*/
