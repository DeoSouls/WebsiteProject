const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    firstname: {type: DataTypes.STRING,allowNull: false},
    lastname: {type: DataTypes.STRING,allowNull: false},
    email: {type: DataTypes.STRING,allowNull: false},
    password: {type: DataTypes.STRING,allowNull: false},
    role: {type: DataTypes.STRING,allowNull: false},
    date_birth: {type: DataTypes.STRING,allowNull: false},
    sex: {type: DataTypes.STRING,allowNull: false},
    link: {type: DataTypes.STRING,allowNull: false}
});

const Token = sequelize.define('token',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    isActivate: {type: DataTypes.BOOLEAN, allowNull: false},
    accessToken: {type: DataTypes.TEXT,allowNull: false},
    refreshToken: {type: DataTypes.TEXT,allowNull: false}
});

const Good = sequelize.define('good',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING,allowNull: false},
    type: {type: DataTypes.STRING,allowNull: false},
    price: {type: DataTypes.STRING,allowNull: false},
    brand: {type: DataTypes.STRING,allowNull: false}
});

const Group = sequelize.define('group',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    group_name: {type: DataTypes.STRING,allowNull: false}
});

const Discount = sequelize.define('discount',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    value: {type: DataTypes.STRING,allowNull: false}
});

const Image = sequelize.define('image',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    img: {type: DataTypes.STRING,allowNull: false}
});

const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true}
});

const BasketGood = sequelize.define('basket_good',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    color: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.INTEGER, allowNull: false}
});

const Review = sequelize.define('review',{
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    rate: {type: DataTypes.INTEGER,allowNull: false},
    title: {type: DataTypes.STRING,allowNull: false},
    review: {type: DataTypes.TEXT,allowNull: false},
});

const GoodInfo = sequelize.define('good_info', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    color: {type: DataTypes.STRING, allowNull: false},
    info: {type: DataTypes.TEXT,allowNull: false}
});

const Incoming = sequelize.define('incoming', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    message: {type: DataTypes.TEXT,allowNull: false},
    date: {type: DataTypes.STRING,allowNull: false},
    viewed: {type: DataTypes.BOOLEAN,allowNull: false}
});

const Sent = sequelize.define('sent', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    message: {type: DataTypes.TEXT,allowNull: false},
    date: {type: DataTypes.STRING,allowNull: false}
});

User.hasOne(Token, {
    foreignKey: {
        allowNull: false
    }
});
Token.belongsTo(User);

Group.hasMany(Good, {
    foreignKey: {
        allowNull: false
    }
});
Good.belongsTo(Group);

User.hasOne(Basket, {
    foreignKey: {
        allowNull: false
    }
});
Basket.belongsTo(User);

Basket.hasMany(BasketGood, {
    foreignKey: {
        allowNull: false
    }
});
BasketGood.belongsTo(Basket);

Good.hasOne(BasketGood, {
    foreignKey: {
        allowNull: false
    }
});
BasketGood.belongsTo(Good);

Good.hasMany(Review, {
    foreignKey: {
        allowNull: false
    }
});
Review.belongsTo(Good);

Good.hasOne(Discount, {
    foreignKey: {
        allowNull: false
    }
});
Discount.belongsTo(Good);

Good.hasMany(Image, {
    foreignKey: {
        allowNull: false
    }
});
Image.belongsTo(Good);

User.hasMany(Review, {
    foreignKey: {
        allowNull: false
    }
});
Review.belongsTo(User);

Good.hasOne(GoodInfo, {
    foreignKey: {
        allowNull: false
    }
});
GoodInfo.belongsTo(Good);

User.hasMany(Sent, {
    foreignKey: {
        allowNull: false
    }
});
Sent.belongsTo(User);

User.hasMany(Incoming, {
    foreignKey: {
        allowNull: false
    }
});
Incoming.belongsTo(User);

Sent.hasOne(Incoming, {
    foreignKey: {
        allowNull: false
    }
});
Incoming.belongsTo(Sent);

module.exports = {
    User, Token, Good, Group, Basket, BasketGood, Review, Discount, Image, GoodInfo, Incoming, Sent
};