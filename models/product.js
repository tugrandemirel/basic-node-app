const getdb = require('../utility/database').getdb;

class Product{
    constructor(name, price, description, imageUrl) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save(){
        const db = getdb();
        db.collection('products')
            .insertOne(this)
            .then((result) => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }
}


module.exports = Product;