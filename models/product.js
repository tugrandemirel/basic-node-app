const connection = require('../utility/database');
module.exports = class Product{
    constructor(name, price, imageUrl, description, categoryid){
        this.name = name
        this.price = price
        this.imageUrl = imageUrl
        this.description = description
        this.categoryid = categoryid
    }

    saveProduct(){
        return connection.execute('INSERT INTO products (category_id, name, imageUrl, description, price) VALUES (?, ?, ?, ?, ?)', [ this.categoryid, this.name, this.imageUrl, this.description, this.price]);
    }

    static getAll(){
       return connection.execute('SELECT * FROM products');
    }

    static getById(id) {
        return connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    }

    static getProductsByCategoryId(categoryid) {

    }
    static Update(product){
        return connection.execute('UPDATE products SET category_id = ?, name = ?, imageUrl = ?, description = ?, price = ? WHERE id = ?', [product.categoryid, product.name, product.imageUrl, product.description, product.price, product.id]);
    }

    static DeleteById(id){
        return connection.execute('DELETE FROM products WHERE id = ?', [id]);
    }
}
