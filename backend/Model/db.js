const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('working','postgres','Sa12324047',{
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
