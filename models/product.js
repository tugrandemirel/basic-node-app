const Sequlize = require('sequelize');
const sequelize = require('../utility/database');

const Product = sequelize.define('products', {
    id:{
        type: Sequlize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequlize.STRING,
        allowNull: false
    },
    price: {
        type: Sequlize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequlize.STRING,
        allowNull: false
    },
    description: {
        type: Sequlize.STRING,
        allowNull: true
    }
});

module.exports = Product;