const getdb = require('../utility/database').getdb;
const mongodb = require('mongodb');

class Category {
    constructor(name, description, id) {
        this.name = name;
        this.description = description;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        let db = getdb();
        if (this._id) {
            db = db.collection('categories').updateOne({_id: this._id}, {$set: this});
        } else {
            db = db.collection('categories').insertOne(this);
        }
        return db
            .then((result) => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findAll() {
        const db = getdb();
        return db.collection('categories')
            .find()
            .toArray()
            .then(categories => {
                return categories;
            })
            .catch(err => console.log(err))
    }

    static findById(categoryid) {
        const categoryId = new mongodb.ObjectId(categoryid);
        const db = getdb();
        return db.collection('categories')
            .findOne({_id: categoryId})
            .then(category => {
                return category;
            }).catch(err => {
                console.log(err);
            })
    }

    static deleteById(categoryid) {
        const categoryId = new mongodb.ObjectId(categoryid);
        const db = getdb();
        return db.collection('categories')
            .deleteOne({_id: categoryId})
            .then(() => {
                console.log('Category has been deleted');
            }).catch(err => {
                console.log(err);
            })
    }
}

module.exports = Category;