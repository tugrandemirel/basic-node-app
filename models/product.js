const getProducts = require("../controllers/admin");

const products = [
    {id:"123" ,name: 'Apple', price: 1.99, imageUrl: 'product1.jpg', description: 'A red apple'},
    {id:"654" ,name: 'Apple', price: 1.99, imageUrl: 'product2.jpeg', description: 'A red apple'},
    {id:"987" ,name: 'Apple', price: 1.99, imageUrl: 'product3.jpeg', description: 'A red apple'},
    {id:"78" ,name: 'Apple', price: 1.99, imageUrl: 'product4.jpg', description: 'A red apple'},
];
module.exports = class Product{
    constructor(name, price, imageUrl, description){
        this.id = Math.floor(Math.random() * 99999) + 1;
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

    static getById(id) {
        const product = products.find(i => i.id === id);
        return product;
    }

}
