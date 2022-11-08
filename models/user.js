const getdb = require('../utility/database').getdb;
const mongodb = require('mongodb');

class User{
    constructor(name, email, id) {
        this.name = name;
        this.email = email;
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