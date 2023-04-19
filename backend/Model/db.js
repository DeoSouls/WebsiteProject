const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('working','postgres','Sa11281215',{
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
