const service = require('./sequelize-service');
const sequelize = require('./db');

class ModelService {

    Token;
    User;

    constructor() {
        this.User = service.User;
        this.Token = service.Token;
    }

    createUser(value) {
        try {
            const user = this.User.create(value);
            return user;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    createToken(value) {
        try {
            const token = this.Token.create(value);
            return token;
        } catch (e) {
            throw Error(e.message);
        }
    }

    deleteToken(value) {
        try {
            let token = this.Token.destroy(value);
            return token;
        } catch (e) {
            throw Error(e.message);
        }
    }

    async findUser(value) {
        try {
            let user = await this.User.findAll({where: value});
            return user;
        } catch (e) {
            throw Error(e.message);
        }
    }
    async updateUser(value) {
        try {
            let user = await this.User.findAll({where: value});
            return user;
        } catch (e) {
            throw Error(e.message);
        }
    }

    async findToken(value) {
        try {
            let token = await this.Token.findAll({where: value});
            return token;
        } catch (e) {
            throw Error(e.message);
        }
    }
}

module.exports = ModelService;


