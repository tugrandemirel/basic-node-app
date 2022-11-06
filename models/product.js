const getProducts = require("../controllers/admin");

const products = [
    {id:"123" ,name: 'Apple', price: 1.99, imageUrl: 'product1.jpg', description: 'A red apple', categoryid: "1"},
    {id:"654" ,name: 'Apple', price: 1.99, imageUrl: 'product2.jpeg', description: 'A red apple', categoryid: "2"},
    {id:"987" ,name: 'Apple', price: 1.99, imageUrl: 'product3.jpeg', description: 'A red apple', categoryid: "3"},
    {id:"78" ,name: 'Apple', price: 1.99, imageUrl: 'product4.jpg', description: 'A red apple', categoryid: "1"},
];
module.exports = class Product{
    constructor(name, price, imageUrl, description, categoryid){
        this.id = (Math.floor(Math.random() * 99999) + 1).toString();
        this.name = name
        this.price = price
        this.imageUrl = imageUrl
        this.description = description
        this.categoryid = categoryid
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

    static getProductsByCategoryId(categoryid) {
        const productsByCategory = products.filter(i => i.categoryid === categoryid);
        return productsByCategory;
    }
    static Update(product){
        const index = products.findIndex(i => i.id === product.id);
        products[index].name = product.name;
        products[index].price = product.price;
        products[index].imageUrl = product.imageUrl;
        products[index].description = product.description;
        products[index].categoryid = product.categoryid;
    }

    static DeleteById(id){
        const index = products.findIndex(i => i.id === id);
        products.splice(index, 1);
    }
}
