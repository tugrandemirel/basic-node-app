const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER, // quantity of products in the cart
    price: Sequelize.DOUBLE // price of the product at the time of purchase
})
module.exports = OrderItem;