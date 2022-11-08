const getdb = require('../utility/database').getdb;
const mongodb = require('mongodb');
class Product{
    constructor(name, price, description, imageUrl, id) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save(){
        let db = getdb();
        if (this._id) {
            db = db.collection('products').updateOne({_id: this._id}, {$set: this});
        }else{
            db = db.collection('products').insertOne(this);
        }
        return db
            .then((result) => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findAll(){
        const db = getdb();
        return db.collection('products')
            .find()
            .project({name: 1, price: 1, imageUrl: 1}) // sadece name, price ve imageUrl alanlarını getir
            .toArray()
            .then(products =>{
                return products;
            }).catch(err => {
                console.log(err);
            })
    }
    static findById(id){
        const productId = new mongodb.ObjectId(id);
        const db =getdb();
        /*return db.collection('products')
            .find({_id: productId})
            .toArray()
            .then(product => {
                return product;
            }).catch(err => {
                console.log(err);
            })*/
        return db.collection('products')
            .findOne({_id: productId})
            .then(product => {
                return product;
            }).catch(err => {
                console.log(err);
            })
    }
}


module.exports = Product;