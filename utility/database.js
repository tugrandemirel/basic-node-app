const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) =>{
    MongoClient.connect('mongodb://localhost/node-app')
        .then((client) => {
            console.log('Connected');
            callback(client);
        }).catch(err => {
        console.log(err);
        throw err;
    })
}

module.exports = mongoConnect;