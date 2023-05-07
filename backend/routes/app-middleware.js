const {Pool, Client} = require('pg');
const PgService = require('../pg-service');
const { Sequelize, Model, DataTypes, where } = require('sequelize');
const ModelService = require('../Model/model-service');
const service = require('../Model/sequelize-service');
const sequelize  = require('../Model/db');
const MailService = require('../mail-service');
const cookieParser = require('cookie-parser');
const paginate = require('express-paginate');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
const TokenService = require('../token-service');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

class appMiddleware {

    async login(req, res, next) {
        try {
            
            const {email, password} = req.body;
            const model = new ModelService();
            await sequelize.sync({});

            const user = await model.findUser({email: email});
            if(user[0] === undefined) {
                throw Error(`Не существует пользователь с такой почтой ${email}`);
            } 

            const userid = user[0]['dataValues']['id'];
            const hashPass = user[0]['dataValues']['password'];
            const firstname = user[0]['dataValues']['firstname'];
            const lastname = user[0]['dataValues']['lastname'];

            const comPass = bcrypt.compareSync(password, hashPass);
            if(!comPass) {
                throw Error('Неверный пароль');
            }

            await model.deleteToken({where: {userId: userid}});
            // const group = await model.createGroup({group_name: 'cloth'});
            // const good = await model.createGood({name: 'Футболка с длинным рукавом', type: 'cloths', price: '5700', brand: 'Malagrida', groupId: group.id});
            // await model.createGoodInfo({color: 'black&orange', info: 'Футболка Мульти Хлопок - 95%, Эластан - 5% Параметры модели: рост 187 см, грудь 103 см, талия 78 см, бедра 98 см.', goodId: good.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths1.png', goodId: good.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths2.png', goodId: good.id});
            // await model.createDiscount({value: '0', goodId: good.id});
            // const good7 = await model.createGood({name: 'Футболки', type: 'cloths', price: '4800', brand: 'Boss', groupId: group.id});
            // await model.createGoodInfo({color: 'black&white', info: 'Футболка, материал: трикотажное полотно (100% хлопок), плотность 160 г/кв. м. Примерный вес брутто : 0.17 - 0.3 кг. Примерный объем брутто: 0.00096 м3', goodId: good7.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths3.png', goodId: good7.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths4.png', goodId: good7.id});
            // await model.createDiscount({value: '0', goodId: good7.id});
            // const good1 = await model.createGood({name: 'Джинсовая куртка', type: 'cloths', price: '13400', brand: 'KLJeans', groupId: group.id});
            // await model.createGoodInfo({color: 'blue', info: 'Джинсовая куртка выполнена из хлопкового денима. Модель прямого кроя. Особенности: отложной воротник, застежка и манжеты на пуговицах, 2 боковых кармана и 2 кармана на груди, без подкладки.', goodId: good1.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths5.png', goodId: good1.id});
            // await model.createDiscount({value: '0', goodId: good1.id});
            // const good8 = await model.createGood({name: 'Джинсы KLJeans', type: 'cloths', price: '11900', brand: 'KLJeans', groupId: group.id});
            // await model.createGoodInfo({color: 'blue', info: 'Джинсы Хлопок - 95%, Другое волокно - 5% Параметры модели: рост 187 см см, грудь 103 см, талия 75 см, бедра 96 см.', goodId: good8.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths6.png', goodId: good8.id}); //Удалить 8 картинку
            // await model.createImage({img: 'http://localhost:5000/static/cloths7.png', goodId: good8.id});
            // await model.createDiscount({value: '0', goodId: good8.id});
            // const good9 = await model.createGood({name: 'Кеды Reebok', type: 'shoes', price: '2358', brand: 'Reebok', groupId: group.id});
            // await model.createGoodInfo({color: 'black', info: 'Кеды, натуральная кожа, полимер, текстиль, спорт стиль', goodId: good9.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths9.png', goodId: good9.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths10.png', goodId: good9.id});
            // await model.createDiscount({value: '0', goodId: good9.id});
            // const good2 = await model.createGood({name: 'Кроссовки Glide', type: 'shoes', price: '5240', brand: 'Reebok', groupId: group.id});
            // await model.createGoodInfo({color: 'white', info: 'Кроссовки Glide от Reebok Classics выполнены из натуральной и искусственной кожи, что повышает износостойкость модели. Стелька Ortholite с антибактериальным эффектом обеспечивает амортизацию, фиксирует стопу, адаптируясь под ее особенности.', goodId: good2.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths8.png', goodId: good2.id});
            // await model.createDiscount({value: '7499', goodId: good2.id});
            // const good4 = await model.createGood({name: 'Кеды Chuck', type: 'shoes', price: '9340', brand: 'Reebok', groupId: group.id});
            // await model.createGoodInfo({color: 'blue&pink', info: 'Кеды выполнены из натуральной кожи с перфорацией. Детали: шнуровка, внутренняя отделка и стелька из текстиля, подошва из искусственного материала.', goodId: good4.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths11.png', goodId: good4.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths12.png', goodId: good4.id});
            // await model.createDiscount({value: '10999', goodId: good4.id});
            // const good10 = await model.createGood({name: 'Кроссовки Air', type: 'shoes', price: '10999', brand: 'Reebok', groupId: group.id});
            // await model.createGoodInfo({color: 'black', info: 'Кроссовки выполнены из натуральной кожи и искусственного материала. Мягкая промежуточная подошва из EVA в сочетании с анатомической стелькой амортизирует, делает ходьбу удобнее, а занятия спортом эффективнее.', goodId: good10.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths13.png', goodId: good10.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths14.png', goodId: good10.id});
            // await model.createDiscount({value: '0', goodId: good10.id});
            // const good5 = await model.createGood({name: 'Рюкзак Puma', type: 'accessories', price: '2870', brand: 'PUMA', groupId: group.id});
            // await model.createGoodInfo({color: 'black', info: 'Рюкзак выполнен из непромокаемого полиэстера. Детали: застежка на молнию, внутри 1 карман без застежки, 1 внешний карман на молнии, боковые сетчатые карманы.', goodId: good5.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths15.png', goodId: good5.id});
            // await model.createDiscount({value: '3190', goodId: good5.id});
            // const good11 = await model.createGood({name: 'Сумка спортивная Puma', type: 'accessories', price: '2690', brand: 'PUMA', groupId: group.id});
            // await model.createGoodInfo({color: 'black', info: 'Спортивная сумка выполнена из прочного текстиля. Детали: регулируемый плечевой ремень, один боковой внешний карман без застежки и один внешний карман на молнии, одно отделение с застежкой на молнии, без подкладки.', goodId: good11.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths16.png', goodId: good11.id});
            // await model.createDiscount({value: '2990', goodId: good11.id});
            // const good6 = await model.createGood({name: 'Сумка Puma', type: 'accessories', price: '2240', brand: 'PUMA', groupId: group.id});
            // await model.createGoodInfo({color: 'black&blue', info: 'Сумка выполнена из плотной ткани на основе полиэстера. Детали: одно отделение, внутри один карман без застежки, один внешний карман на молнии, регулируемый плечевой ремень.', goodId: good6.id});
            // await model.createImage({img: 'http://localhost:5000/static/cloths17.png', goodId: good6.id});
            // await model.createDiscount({value: '2490', goodId: good6.id});

            // const group = await model.createGroup({group_name: 'techno'});
            // const good = await model.createGood({name: 'Meizu 16s', type: 'phone', price: '26346', brand: 'meizu', groupId: group.id});
            // await model.createGoodInfo({color: 'red&black&white', info: 'Смартфон Meizu 16S глобальной версии, экран 6,2 дюйма, двойная фронтальная камера, 8 ГБ ОЗУ 128 Гб ПЗУ, Восьмиядерный процессор Snapdragon 855, 4G, 3600 мАч', goodId: good.id});
            // await model.createImage({img: 'http://localhost:5000/static/image1.jpg', goodId: good.id});
            // await model.createDiscount({value: '65865', goodId: good.id});
            // const good7 = await model.createGood({name: 'Xiaomi Redmi Note 8', type: 'phone', price: '14490', brand: 'redmi', groupId: group.id});
            // await model.createGoodInfo({color: 'blue', info: 'Смартфон Xiaomi Redmi Note 8, 4 Гб + 64 ГБ, Snapdragon 660AIE, Android мобильный телефон, задняя камера 48 Мп + 5 МП', goodId: good7.id});
            // await model.createImage({img: 'http://localhost:5000/static/image12.png', goodId: good7.id});
            // await model.createImage({img: 'http://localhost:5000/static/image20.png', goodId: good7.id});
            // await model.createDiscount({value: '20000', goodId: good7.id});
            // const good1 = await model.createGood({name: 'Xiaomi Redmi Note 11', type: 'phone', price: '13860', brand: 'apple', groupId: group.id});
            // await model.createGoodInfo({color: 'white', info: 'Глобальная версия смартфона Xiaomi Redmi Note 11, Snapdragon 680 33W Pro, быстрая зарядка, 50 МП, Quad Camera', goodId: good1.id});
            // await model.createImage({img: 'http://localhost:5000/static/image2.jpg', goodId: good1.id});
            // await model.createDiscount({value: '17703', goodId: good1.id});
            // const good8 = await model.createGood({name: 'Meizu 16th', type: 'phone', price: '19050', brand: 'meizu', groupId: group.id});
            // await model.createGoodInfo({color: 'black', info: 'Смартфон Meizu 16th с глобальной прошивкой, 6,0 дюйма, двойная фронтальная камера, 8 ГБ ОЗУ, 128 Гб ПЗУ, Восьмиядерный процессор Snapdragon 845, 4G, 3010 мАч', goodId: good8.id});
            // await model.createImage({img: 'http://localhost:5000/static/image8.png', goodId: good8.id}); 
            // await model.createImage({img: 'http://localhost:5000/static/image21.png', goodId: good8.id});
            // await model.createDiscount({value: '20383', goodId: good8.id});
            // const good9 = await model.createGood({name: 'Honor Choice Earbuds X3', type: 'headphone', price: '2358', brand: 'honor', groupId: group.id});
            // await model.createGoodInfo({color: 'red&black&white', info: 'Беспроводные наушники Honor Choice Earbuds X3 Lite', goodId: good9.id});
            // await model.createImage({img: 'http://localhost:5000/static/image13.jpg', goodId: good9.id});
            // await model.createDiscount({value: '3683', goodId: good9.id});
            // const good2 = await model.createGood({name: 'Honor Earbuds 2 SE', type: 'headphone', price: '4031', brand: 'honor', groupId: group.id});
            // await model.createGoodInfo({color: 'black&white', info: 'Беспроводные наушники Honor Earbuds 2 SE TWS', goodId: good2.id});
            // await model.createImage({img: 'http://localhost:5000/static/image14.jpg', goodId: good2.id});
            // await model.createDiscount({value: '7606', goodId: good2.id});
            // const good4 = await model.createGood({name: 'TWS i12', type: 'headphone', price: '495', brand: 'other', groupId: group.id});
            // await model.createGoodInfo({color: 'white', info: 'Bluetooth наушники TWS i12 (в комплекте: зарядный бокс, два наушника)', goodId: good4.id});
            // await model.createImage({img: 'http://localhost:5000/static/image15.jpg', goodId: good4.id});
            // await model.createDiscount({value: '0', goodId: good4.id});
            // const good10 = await model.createGood({name: 'Apple AirPods 2', type: 'headphone', price: '12280', brand: 'apple', groupId: group.id});
            // await model.createGoodInfo({color: 'white', info: 'Наушники Apple AirPods 2 с зарядным чехлом', goodId: good10.id});
            // await model.createImage({img: 'http://localhost:5000/static/image16.jpg', goodId: good10.id});
            // await model.createDiscount({value: '0', goodId: good10.id});
            // const good5 = await model.createGood({name: 'TCL 43P635', type: 'TV', price: '33110', brand: 'TCL', groupId: group.id});
            // await model.createGoodInfo({color: 'black', info: 'TCL 43P635 телевизор smart tv 43 дюймов 4к Google P WIFI 2.4G Bluetooth 5.0 телевизор смарт тв 4K Ultra HD LED Гарантия 1 год', goodId: good5.id});
            // await model.createImage({img: 'http://localhost:5000/static/image17.png', goodId: good5.id});
            // await model.createDiscount({value: '35990', goodId: good5.id});
            // const good11 = await model.createGood({name: 'Maibenben Smart TV 65M2UC', type: 'TV', price: '44789', brand: 'Maibenben', groupId: group.id});
            // await model.createGoodInfo({color: 'black', info: 'Maibenben Smart TV 65M2UC 65 дюймов 4K HDR Bluetooth 5.0 WIFI телевизор с узкими рамками', goodId: good11.id});
            // await model.createImage({img: 'http://localhost:5000/static/image18.png', goodId: good11.id});
            // await model.createDiscount({value: '55987', goodId: good11.id});
            // const good6 = await model.createGood({name: 'TV 55" Samsung', type: 'TV', price: '43092', brand: 'samsung', groupId: group.id});
            // await model.createGoodInfo({color: 'black', info: 'Телевизор 55" Samsung UE55TU8000UXRU - 4K | Smart TV | матрица VA 120 Гц | гарантия производителя | быстрая доставка из Москвы', goodId: good6.id});
            // await model.createImage({img: 'http://localhost:5000/static/image19.jpg', goodId: good6.id});
            // await model.createDiscount({value: '49990', goodId: good6.id});
            
            const tokens = await TokenService.generateToken(firstname, lastname, email, hashPass);
            const token = await model.createToken({accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, userId: userid, isActivate: true});

            await res.cookie('accessToken', tokens.accessToken, {maxAge: 1000 * 60 * 30, httpOnly: false});

            res.json('Авторизация прошла успешно!');
        } catch (e) {
            res.status(400).json({message: 'Не удалось авторизоваться', error: e.message});
        }
    }

    async registration(req, res) {
        try {

            //в users поместить параметр isActivate
            
            const {firstname, lastname, email, password} = req.body;

            const mail = new MailService();
            const model = new ModelService();
            await sequelize.sync({force: true});

            // const checkEmail = await model.User.findAll({where: {email: email}});
            // if(checkEmail[0] !== undefined) {
            //     if(checkEmail[0]['dataValues']['email'] === email) {

            //         res.status(400).json({message: `User with this email ${email} already exists`});
            //     }
            // }
            
            const id = uuid.v4();

            await mail.send(`http://localhost:5000/api/activating/${id}`, email);

            const hashPassword = await bcrypt.hashSync(password, 7);
            const createUser = await model.createUser({firstname: firstname, lastname: lastname, email: email, password: hashPassword, role: 'user', link: id, sex: 'notdef', date_birth: 'notdef'});
            
            const tokens = await TokenService.generateToken(firstname, lastname, email, hashPassword);
            console.log(tokens.accessToken);
            
            const userToken = model.createToken({accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, userId: createUser.id, isActivate: false});
            const basket = await model.createBasket({userId: createUser.id});

            res.json({message: 'Данные включены в таблицу'});

        } catch (e) {

            res.status(400).json({message: 'Не удалось установить данные', error: e.message});
        }
    }

    async search(req, res) {
        try {
            const {searchText} = req.body;

            const model = new ModelService();

            const goods = await model.findGood({ name: {[Op.like]: `%${searchText}%`}});

            res.json({products: goods[0]});

        } catch (e) {
            res.status(400).json({message: 'Не удалось отправить поисковой запрос', error: e.message});
        }
    }

    async updateUser(req, res) {
        try {
            const { data } = req.body;
            const model = new ModelService();
            const user =  await model.findUser({email: data.email});
            
            if(user[0] === undefined) {
                throw Error('Пользователь не найден');
            }

            await user[0].update({firstname: data.firstname, lastname: data.lastname, email: data.email, sex: data.gender, date_birth: data.datebirth});

            res.json({message: 'Данные сохранены'});

        } catch (e) {
            res.status(400).json({message: 'Не удалось обновить данные о пользователе', error: e.message});
        }
    }

    async updatePassword(req, res) {
        try {
            const { data } = req.body;
            const { accessToken } = req.cookies;

            const model = new ModelService();

            if(data.newpass !== data.confpass) {
                throw Error('Пароли должны совпадать');
            }

            const token = await model.findToken({accessToken: accessToken});
            if(token[0] === undefined) {
                throw Error('Токен не найден');
            }

            const user = await model.findUser({id: token[0]['dataValues']['userId']});
            if(user[0] === undefined) {
                throw Error('Пользователь не найден');
            }

            const hashPass = user[0]['dataValues']['password'];

            const comPass = bcrypt.compareSync(data.curpass, hashPass);
            if(!comPass) {
                throw Error('Неверный текущий пароль');
            }

            const newHashPass = await bcrypt.hashSync(data.confpass, 7);

            await user[0].update({password: newHashPass});

            res.json({message: 'Пароль изменен'});

        } catch (e) {
            res.status(400).json({message: 'Не удалось обновить пароль', error: e.message});
        }
    }

    async getUser(req, res) {
        try {
            const {accessToken} = req.cookies;
            const model = new ModelService();

            const token = await model.findToken({accessToken: accessToken});
            console.log(token);
            if(token[0] === undefined) {
                throw Error('Токен не найден');
            }

            const user = await model.findUser({id: token[0]['dataValues']['userId']});
            console.log(user);
            if(user[0] === undefined) {
                throw Error('Пользователь не найден');
            }

            res.json({user});

        } catch (e) {
            res.status(400).json({message: 'Не удалось получить пользователя'});
        }
    }

    async getReviews(req, res) {
        try {
            const { accessToken } = req.cookies;
            const model = new ModelService();

            const token = await model.findToken({accessToken: accessToken});
            if(token[0] === undefined) {
                throw Error('Токен не найден');
            }

            const user = await model.findUser({id: token[0]['dataValues']['userId']});
            if(user[0] === undefined) {
                throw Error('Пользователь не найден');
            }

            const reviews = await model.findReview({userId: user[0]['dataValues']['id']});

            var products = [];
            for (let i = 0; i < reviews.length; i++) {
                products.push(await model.findGood({id: reviews[i]['dataValues']['goodId']}));
            }

            var images = [];
            for (let i = 0; i < products.length; i++) {
                images.push(await model.findImage({goodId: products[i][0]['dataValues']['id']}));
            }

            res.json({reviews: reviews, products: products, images: images, user: user[0]});

        } catch (e) {
            res.status(400).json({message: 'Не удалось получить отзывы'});
        }
    } 

    async getGoodImage(req, res) {
        try {
            const model = new ModelService();
            const products = await model.findGood();

            var images = [];
            for (let i = 0; i < products.length; i++) {
                images.push(await model.findImage({goodId: products[i]['dataValues']['id']}));
            }

            res.json({images: images, products: products});

        } catch (e) {
            res.status(400).json({message: 'Не удалось получить картинки товара'});
        }
    }

    async getDataGoods(req, res) {
        try {
            const { prodId } = req.body;
            const { accessToken } = req.cookies;
            const model = new ModelService();

            const good = await model.findGood({id: prodId});
            const info = await model.findGoodData({goodId: good[0]['dataValues']['id']});
            const group = await model.findGroup({id: good[0]['dataValues']['groupId']});
            const image = await model.findImage({goodId: good[0]['dataValues']['id']});
            const discount = await model.findDiscount({goodId: good[0]['dataValues']['id']});
            const review = await model.findReview({goodId: good[0]['dataValues']['id']});

            var users = [];
            if(review.length > 0) {
                for (let i = 0; i < review.length; i++) {
                    const userReview = await model.findUser({id: review[i]['dataValues']['userId']})
                    users.push(userReview[0]);
                }
            }

            var user = [null];
            if(accessToken !== undefined) {

                const token = await model.findToken({accessToken: accessToken});
                user = await model.findUser({id: token[0]['dataValues']['userId']});
            }

            res.json({data: info[0], group: group[0], product: good[0], image: image, discount: discount[0], user: user[0], review: review, usersreview: users});

        } catch (e) {
            res.status(400).json({message: 'Не удалось получить данные о товарах'});
        }
    }

    async addReview(req, res) {
        try {
            const {rate, review, title, userId, goodId} = req.body;
            const model = new ModelService();

            const reviews = await model.createReview({title: title, rate: rate, review: review, userId: userId, goodId: goodId});
            console.log(reviews);

            res.json({review: reviews});

        } catch (e) {
            res.status(400).json({message: 'Не удалось загрузить отзыв'});
        }
    }

    async activate(req, res) {
        try {
            const link = req.params.activate;
            const model = new ModelService();

            const user = await model.findUser({link: link});
            if(user === undefined) {
                res.status(400).json({message: 'Не удалось активировать аккаунт'});
            }

            const token = await model.findToken({userId: user[0]['dataValues']['id']});
            if(token === undefined) {
                res.status(400).json({message: 'Не удалось активировать аккаунт'});
            }
            await token[0].update({isActivate: true});

            await res.cookie('accessToken', token[0]['dataValues']['accessToken'], {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});

            res.redirect(process.env.HOST);
        } catch (e) {
            res.status(400).json({message: 'Не удалось активировать аккаунт', error: e.message});
        }
    }

    async refresh(req, res) {
        try {
            const {accessToken} = req.cookies;
            console.log(accessToken);
            if(accessToken === undefined) {
                throw Error('Токен не найден, пожалуйста авторизуйтесь');
            }
            const model = new ModelService();
            const token = await model.findToken({accessToken: accessToken});
            if(token[0] === undefined) {
                throw Error('Токен не действителен, пожалуйста авторизуйтесь');
            }
            
            const decode = await jwt.verify(accessToken, process.env.SECRET_KEY);
            console.log(decode);

            res.json({firstname: decode.firstname, lastname: decode.lastname, email: decode.email, password: decode.password, accessToken: accessToken, isActivate: token[0]['dataValues']['isActivate'] })

        } catch (e) {
            res.status(400).json({message: 'Не удалось получить данные о пользователе', error: e.message});
        }
    }

    async add_to_cart(req, res) {
        try {
            const {productId, count, color} = req.body;

            const model = new ModelService();

            const { accessToken } = req.cookies;
            if (accessToken === undefined) {
                throw Error('Токен не найден, пожалуйста авторизуйтесь');
            }

            const token = await model.findToken({accessToken: accessToken});
            const user = await model.findUser({id: token[0]['dataValues']['userId']});
            const basket = await model.findBasket({userId: user[0]['dataValues']['id']});

            await model.createBasketGood({basketId: basket[0]['dataValues']['id'], goodId: productId, count: count, color: color});

            res.json({message: 'Товар добавлен в корзину'});

        } catch (e) {
            res.status(400).json({message: 'Не удалось добавить товар в корзину', error: e.message});
        }
    }

    async delete_data_basket(req, res) {
        try {
            const {indexProduct, basketId} = req.body;
            const model = new ModelService();

            await model.deleteBasketGood({goodId: indexProduct});
            const basket_goods = await model.findBasketGood({basketId: basketId}); 

            res.json({basket: basket_goods});

        } catch (e) {
            res.status(400).json({message: 'Не удалось удалить товар в корзине', error: e.message});
        }
    }

    async get_data_busket(req, res) {
        try {
            const model = new ModelService();
            
            const { accessToken } = req.cookies;
            if (accessToken === undefined) {
                throw Error('Токен не найден, пожалуйста авторизуйтесь');
            }
            
            const token = await model.findToken({accessToken: accessToken});
            const user = await model.findUser({id: token[0]['dataValues']['userId']});
            const basket = await model.findBasket({userId: user[0]['dataValues']['id']});
            const basket_goods = await model.findBasketGood({basketId: basket[0]['dataValues']['id']});
            
            var goods = [];
            for (let i = 0; i < basket_goods.length; i++) {
                goods.push(await model.findGood({id: basket_goods[i]['dataValues']['goodId']}));
            }  

            var image = [];
            for (let i = 0; i < basket_goods.length; i++) {
                image.push(await model.findImage({goodId: basket_goods[i]['dataValues']['goodId']}));
            }  

            var info = [];
            for (let i = 0; i < basket_goods.length; i++) {
                info.push(await model.findGoodData({goodId: basket_goods[i]['dataValues']['goodId']}));
            }

            var discount = [];
            for (let i = 0; i < basket_goods.length; i++) {
                discount.push(await model.findDiscount({goodId: basket_goods[i]['dataValues']['goodId']}));
            }

            res.json({goods: goods, image: image, info: info, discount: discount, basket: basket_goods});
            
        } catch (e) {
            res.status(400).json({message: 'Не удалось получить данные корзины', error: e.message});
        }
    }
    
    // Прибраться...
    async getGoods(req, res, next) {
        try {
            const model = new ModelService();
            const {filter, group} = req.body;

            const filterObject = Object.entries(filter);
            console.log(filterObject);

            model.Good.findAndCountAll({limit: req.query.limit, offset: req.skip})
            .then(async (results) =>  {

                var prevfilter = '';
                var allprod = null;
                var productGroup = null;
                var prod = [];
                var products = [];
                var img = [];
                var images = [];
                var review = [];
                var info = [];
                var counts = 0;
                var final = false;
                var skip = req.skip/req.query.limit;
                var size = req.query.limit;

                const filterWorked = async (filter, group) => {
                    var totalFilter = [];
                    await filter.forEach(item => {
                        if(item[1]['checked'] === 'true') {

                            totalFilter.push(item[1]['filterName']);
                        }
                    });

                    if(totalFilter.length > 0) {
                        if(group === 'default') {
                            productGroup = await model.findGroup({group_name: 'techno'});
                            if(productGroup[0] !== undefined) {
                                allprod = await model.findGood({groupId: productGroup[0].dataValues.id});
                            }
                        } else {
                            productGroup = await model.findGroup({group_name: group});
                            if(productGroup[0] !== undefined) {

                                allprod = await model.findGood({groupId: productGroup[0].dataValues.id});
                            } 
                        }

                        for (let i = 0; i < totalFilter.length; i++) {

                            var good = await model.findGood({type: totalFilter[i]});
                            if(good[0] === undefined) {
                                good = await model.findGood({brand: totalFilter[i]});
                            }
                            prevfilter = totalFilter[i - 1];

                            if(good[0] !== undefined) {
                                if(products[0] !== undefined ){
                                    var product = await model.findGood({type: totalFilter[i]});

                                    if(product[0] === undefined) {
                                        var interimprod = [];
                                        var nextprod = [];

                                        var product = await model.findGood({brand: totalFilter[i]});
                                        product.forEach((prod, index) => {
                                            for (let i = 0; i < products[0].length; i++) {
                                                if(prod.dataValues.id === products[0][i].dataValues.id) {
                                                    interimprod.push(prod);
                                                }
                                            }
                                        })
                                        nextprod = products[0].filter(prod => prod.dataValues.brand !== product[0].dataValues.brand);
                                        if(interimprod[0] === undefined) {
                                            products = [[...products[0], ...product]];
                                        } else {
                                            if(product.length > interimprod.length || product.length < interimprod.length){
                                                products = [[...nextprod, ...product]];
                                            } else {
                                                products = [[...nextprod, ...interimprod]];
                                            }
                                        }
                                    } else {
                                        products = [[...products[0], ...product]];
                                    }
                                } else {
                                    var product = await model.findGood({type: totalFilter[i]});
                                    if(product[0] === undefined) {
                                        var product = await model.findGood({brand: totalFilter[i]});
                                        products = [[...product]];
                                    } else {
                                        products = [[...product]];
                                    }
                                }
                            }
                    

                            if(totalFilter.length > 1) {
                                final = true;
                            }

                            var sliceProducts = [];
                            if( products[0] !== undefined && allprod !== null) {
                                for (let i = 0; i < allprod.length; i++) {
                                    products[0].forEach(prod => {
                                        if(allprod[i].dataValues.id === prod.dataValues.id) {
                                            sliceProducts.push(allprod[i]);
                                        }
                                    })
                                }

                                let subArray = [];
                                for (let i = 0; i < Math.ceil(sliceProducts.length/size); i++) {
                                    var addsize = size;
                                    subArray[i] = sliceProducts.slice((i * size), (i * size) + addsize);
                                }

                                if(final) {
                                    if(prod === undefined && subArray[skip] !== undefined) {

                                        var totalImages = [];
                                        var totalReviews = [];
                                        var totalInfos = [];

                                        for (let i = 0; i < subArray[skip].length; i++) {
                                            const imgProd = await model.findImage({goodId: subArray[skip][i].dataValues.id});
                                            const reviews = await model.findReview({goodId: subArray[skip][i].dataValues.id});
                                            const infos = await model.findGoodData({goodId: subArray[skip][i].dataValues.id});

                                            if(imgProd.length > 0) {
                                                totalImages.push(imgProd);
                                            }

                                            totalReviews.push(reviews);

                                            if(infos.length > 0) {
                                                totalInfos.push(infos[0]);
                                            }
                                        }
                                        images = [...totalImages];
                                        review = [...totalReviews];
                                        info = [...totalInfos];
                                        prod = [];

                                    } else if (subArray[skip] === undefined) {
                                        prod = [];
                                    }
                                } else {
                                    if (prod.length === 0) {

                                        var totalImages = [];
                                        var totalReviews = [];
                                        var totalInfos = [];

                                        for (let i = 0; i < subArray[skip].length; i++) {
                                            const imgProd = await model.findImage({goodId: subArray[skip][i].dataValues.id});
                                            const reviews = await model.findReview({goodId: subArray[skip][i].dataValues.id});
                                            const infos = await model.findGoodData({goodId: subArray[skip][i].dataValues.id});

                                            if(imgProd.length > 0) {
                                                totalImages.push(imgProd);
                                            }

                                            totalReviews.push(reviews);
                                            if(infos.length > 0) {
                                                totalInfos.push(infos[0]);
                                            }
                                        }
                                        images = [...totalImages];
                                        review = [...totalReviews];
                                        info = [...totalInfos];
                                    }
                                }
                               
                                var nextskip = req.skip/req.query.limit;
                                if(prod.length !== 0) {
                                    var totalImages = [];
                                    var totalReviews = [];
                                    var totalInfos = [];
                                    
                                    for (let i = 0; i < subArray[skip].length; i++) {
                                        const imgProd = await model.findImage({goodId: subArray[skip][i].dataValues.id});
                                        const reviews = await model.findReview({goodId: subArray[skip][i].dataValues.id});
                                        const infos = await model.findGoodData({goodId: subArray[skip][i].dataValues.id});
                                        
                                        if(imgProd.length > 0) {
                                            totalImages.push(imgProd);
                                        }
                                        totalReviews.push(reviews);
                                        if(infos.length > 0) {
                                            totalInfos.push(infos[0]);
                                        }
                                    }
                                    images = [...totalImages];
                                    review = [...totalReviews];
                                    info = [...totalInfos];

                                    var filterData = [];

                                    subArray[nextskip].forEach((arr, index) => {
                                        if(subArray[nextskip][index] !== undefined) {

                                            if(arr.dataValues.type === prevfilter || arr.dataValues.brand === prevfilter) {
                                                filterData.push(subArray[nextskip][index]);
                                            } else if (arr.dataValues.type === totalFilter[i] || arr.dataValues.brand === totalFilter[i]) {
                                                filterData.push(subArray[nextskip][index]);
                                            } else if (arr.dataValues.type === totalFilter[i - 2] || arr.dataValues.brand === totalFilter[i - 2]) {
                                                filterData.push(subArray[nextskip][index]);
                                            } else if (arr.dataValues.type === totalFilter[i - 3] || arr.dataValues.brand === totalFilter[i - 3]) {
                                                filterData.push(subArray[nextskip][index]);
                                            } else if (arr.dataValues.type === totalFilter[i - 4] || arr.dataValues.brand === totalFilter[i - 4]) {
                                                filterData.push(subArray[nextskip][index]);
                                            } else if (arr.dataValues.type === totalFilter[i - 5] || arr.dataValues.brand === totalFilter[i - 5]) {
                                                filterData.push(subArray[nextskip][index]);
                                            } else if (arr.dataValues.type === totalFilter[i - 6] || arr.dataValues.brand === totalFilter[i - 6]) {
                                                filterData.push(subArray[nextskip][index]);
                                            } else if (arr.dataValues.type === totalFilter[i - 7] || arr.dataValues.brand === totalFilter[i - 7]) {
                                                filterData.push(subArray[nextskip][index]);
                                            }
                                        }
                                    })
                                    prod = filterData;
                                } else {
                                    prod = subArray[skip];
                                }
                                counts = sliceProducts.length;
                                products = [...products];
                            } else {
                                return {error: 'не работает'}
                            }
                        }
                        return {image: images, prod: prod, cnt: counts, infos: info, reviews: review}
                        
                    } else {

                        if(group === 'default') {
                            productGroup = await model.findGroup({group_name: 'techno'});
                            if(productGroup[0] !== undefined) {
                                allprod = await model.findGood({groupId: productGroup[0].dataValues.id});
                            }

                        } else {
                            productGroup = await model.findGroup({group_name: group});
                            if(productGroup[0] !== undefined) {
                                allprod = await model.findGood({groupId: productGroup[0].dataValues.id});
                            }
                        }
                        var subAllProd = [];

                        if(allprod !== undefined && allprod !== null) {
                            for (let i = 0; i < Math.ceil(allprod.length/size); i++) {
                                var addsize = size;
                                subAllProd[i] = allprod.slice((i * size), (i * size) + addsize);
                            }
                            for (let i = 0; i < subAllProd[skip].length; i++) {
                                const prod = await model.findGood({id: subAllProd[skip][i].dataValues.id});
                                products.push(prod[0]);
                            }
                            for (let i = 0; i < subAllProd[skip].length; i++) {
                                const review = await model.findReview({goodId: subAllProd[skip][i].dataValues.id});
                                review.push(review[0]);
                            }
                            for (let i = 0; i < subAllProd[skip].length; i++) {
                                const reviews = await model.findReview({goodId: subAllProd[skip][i].dataValues.id});
                                review.push(reviews);
                            }
                            for (let i = 0; i < subAllProd[skip].length; i++) {
                                const infos = await model.findGoodData({goodId: subAllProd[skip][i].dataValues.id});
                                info.push(infos[0]);
                            } 
                            for (let i = 0; i < products.length; i++) {
                                img.push(await model.findImage({goodId: subAllProd[skip][i].dataValues.id}));
                            }
                            counts = allprod.length;
                        } else {
                            counts = 0;
                        }
                        return {image: img, prod: products, cnt: counts, infos: info, reviews: review}
                    }
                };
                var interim_group = [];
                var reaction = null;

                if(group === '' || group === undefined) {
                    interim_group = 'default';
                    reaction = filterWorked(filterObject, interim_group);
                } else {
                    reaction = filterWorked(filterObject, group);
                }

                if(reaction !== null) {
                    img = (await reaction).image;
                    products = (await reaction).prod;
                    review = (await reaction).reviews;
                    info = (await reaction).infos;
                } 

                if(products === undefined) {
                    products = [];
                }
                if(img === undefined) {
                    img = [];
                }

                const pgCount = await Math.ceil(counts / req.query.limit);
                res.json({results, pages: paginate.getArrayPages(req)(3, pgCount, req.query.page), img, products, counts, filter, group, info: info, review: review});
            })
            .catch(err => next(err))
        } catch (e) {
            res.status(400).json({message: 'Не удалось получить данные о товаре', error: e.message});
        }
    } 
}

module.exports = new appMiddleware();
