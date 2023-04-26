const service = require('./sequelize-service');
const sequelize = require('./db');

class ModelService {

    Token;
    User;
    Good;
    Group;
    Image;
    Basket;
    Review;
    Discount;
    BasketGood;

    constructor() {
        this.User = service.User;
        this.Token = service.Token;
        this.Good = service.Good;
        this.Group = service.Group;
        this.Image = service.Image;
        this.Basket = service.Basket;
        this.Review = service.Review;
        this.Discount = service.Discount;
        this.BasketGood = service.BasketGood;
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

    createGood(value) {
        try {
            const good = this.Good.create(value);
            return good;
        } catch (e) {
            throw Error(e.message);
        }
    }

    createImage(value) {
        try {
            const image = this.Image.create(value);
            return image;
        } catch (e) {
            throw Error(e.message);
        }
    }

    createBasket(value) {
        try {
            const basket = this.Basket.create(value);
            return basket;
        } catch (e) {
            throw Error(e.message);
        }
    }

    createReview(value) {
        try {
            const review = this.Review.create(value);
            return review;
        } catch (e) {
            throw Error(e.message);
        }
    }

    createDiscount(value) {
        try {
            const discount = this.Discount.create(value);
            return discount;
        } catch (e) {
            throw Error(e.message);
        }
    }

    createBasketGood(value) {
        try {
            const basket_good = this.BasketGood.create(value);
            return basket_good;
        } catch (e) {
            throw Error(e.message);
        }
    }

    createGroup(value) {
        try {
            const group = this.Group.create(value);
            return group;
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

    async findImage(value) {
        try {
            let image = await this.Image.findAll({where: value});
            return image;
        } catch (e) {
            throw Error(e.message);
        }
    }

    async findGood(value) {
        try {
            let good = await this.Good.findAll({where: value});
            return good;
        } catch (e) {
            throw Error(e.message);
        }
    }
}

module.exports = ModelService;


