const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    firstname: {type: DataTypes.STRING,allowNull: false},
    lastname: {type: DataTypes.STRING,allowNull: false},
    email: {type: DataTypes.STRING,allowNull: false},
    password: {type: DataTypes.STRING,allowNull: false},
    role: {type: DataTypes.STRING,allowNull: false},
    link: {type: DataTypes.STRING,allowNull: false}
});

const Token = sequelize.define('token',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    isActivate: {type: DataTypes.BOOLEAN, allowNull: false},
    accessToken: {type: DataTypes.TEXT,allowNull: false},
    refreshToken: {type: DataTypes.TEXT,allowNull: false}
});

User.hasOne(Token);
Token.belongsTo(User);


module.exports = {
    User, Token
};