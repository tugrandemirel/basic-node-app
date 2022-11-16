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
}
module.exports = User;