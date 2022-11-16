const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const url ='mongodb+srv://tugran:1289558T.d@cluster0.qfo1war.mongodb.net/?retryWrites=true&w=majority'
const mongoConnect = (callback) =>{
    // MongoClient.connect('mongodb://localhost/node-app')
    MongoClient.connect(url)
        .then((client) => {
            console.log('Connected');
            _db = client.db('node-app');
            callback(client);
        }).catch(err => {
        console.log('Baglantı hatassı')
        console.log(err);
        throw err;
    })
}
const getdb = () =>{
    if(_db){
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;