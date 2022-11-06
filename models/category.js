const Sequlize = require('sequelize');
const sequelize = require('../utility/database');

const Category = sequelize.define('categories', {
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
    description: {
        type: Sequlize.STRING,
        allowNull: true
    }
});
module.exports = Category;