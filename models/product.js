const getProducts = require("../controllers/admin");

const products = [
    {name: 'Apple', price: 1.99, imageUrl: 'product1.jpg', description: 'A red apple'},
    {name: 'Apple', price: 1.99, imageUrl: 'product2.jpeg', description: 'A red apple'},
    {name: 'Apple', price: 1.99, imageUrl: 'product3.jpeg', description: 'A red apple'},
    {name: 'Apple', price: 1.99, imageUrl: 'product4.jpg', description: 'A red apple'},
];
module.exports = class Product{
    constructor(name, price, imageUrl, description){
        this.name = name
        this.price = price
        this.imageUrl = imageUrl
        this.description = description
    }

    saveProduct(){
        products.push(this)
    }

    static getAll(){
        return products
    }
}
