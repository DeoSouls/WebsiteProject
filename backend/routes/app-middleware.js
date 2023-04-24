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
                res.status(400).json({message: `Не существует пользователь с такой почтой ${email}`});
            } 

            const userid = user[0]['dataValues']['id'];
            const hashPass = user[0]['dataValues']['password'];
            const firstname = user[0]['dataValues']['firstname'];
            const lastname = user[0]['dataValues']['lastname'];

            const comPass = bcrypt.compareSync(password, hashPass);
            if(!comPass) {
                res.status(400).json({message: 'Неверный пароль'});
            }

            await model.deleteToken({where: {userId: userid}});
            const group = await model.createGroup({group_name: 'techno'});
            const good = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            await model.createImage({img: 'http://localhost:5000/static/image1.jpg', goodId: good.id});
            const good1 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            await model.createImage({img: 'http://localhost:5000/static/image2.jpg', goodId: good1.id});
            const good2 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            await model.createImage({img: 'http://localhost:5000/static/image3.jpg', goodId: good2.id});
            const good4 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            await model.createImage({img: 'http://localhost:5000/static/image4.jpg', goodId: good4.id});
            const good5 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            await model.createImage({img: 'http://localhost:5000/static/image5.jpg', goodId: good5.id});
            const good6 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            await model.createImage({img: 'http://localhost:5000/static/image6.jpeg', goodId: good6.id});
            const good7 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            await model.createImage({img: 'http://localhost:5000/static/image7.jpg', goodId: good7.id});
            const good8 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            await model.createImage({img: 'http://localhost:5000/static/image8.jpg', goodId: good8.id});
            const good9 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            await model.createImage({img: 'http://localhost:5000/static/image9.jpg', goodId: good9.id});
            const good10 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            await model.createImage({img: 'http://localhost:5000/static/image10.jpg', goodId: good10.id});
            const good11 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            await model.createImage({img: 'http://localhost:5000/static/image11.jpg', goodId: good11.id});
            const tokens = await TokenService.generateToken(firstname, lastname, email, hashPass);
            const token = await model.createToken({accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, userId: userid, isActivate: true});

            await res.cookie('accessToken', tokens.accessToken, {maxAge: 1000 * 60 * 15, httpOnly: false});

            res.json('Авторизация прошла успешно!');
        } catch (e) {
            res.status(400).json({message: 'Не удалось авторизоваться', error: e});
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
            const createUser = await model.createUser({firstname: firstname, lastname: lastname, email: email, password: hashPassword, role: 'user', link: id});
            
            const tokens = await TokenService.generateToken(firstname, lastname, email, hashPassword);
            console.log(tokens.accessToken);
            
            const userToken = model.createToken({accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, userId: createUser.id, isActivate: false});
            

            res.json({message: 'Данные включены в таблицу'});

        } catch (e) {

            res.status(400).json({message: 'Не удалось установить данные', error: e.message});
        }
    }

    async updateUser(req, res) {
        try {
            const {firstname, lastname, email} = req.body;

            const model = new ModelService();
            const user =  await model.findUser({email: email});
            console.log(user[0]);
            if(user[0] === undefined) {
                throw Error('Пользователь не найден');
            }

            await user[0].update({firstname: firstname, lastname: lastname, email: email});

            res.json({message: 'Данные сохранены'});

        } catch (e) {
            res.status(400).json({message: 'Не удалось обновить данные о пользователе', error: e.message});
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

    async activate(req, res) {
        try {
            const link = req.params.activate;
            const model = new ModelService();

            const user = await model.findUser({link: link});
            if(user === undefined) {
                res.status(400).json({message: 'Не удалось активировать аккаунт'});
            }
            console.log(`-----${user[0]['dataValues']['id']}`);

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
    
    async getGoods(req, res, next) {
        try {
            const model = new ModelService();

            model.Good.findAndCountAll({limit: req.query.limit, offset: req.skip})
            .then(async (results) =>  {
                const itemCount = await results.count;
                const {rows} = results;
                const pageCount = await Math.ceil(results.count / req.query.limit);
                // const images = await rows.map(row => {
                //     const img = model.findImage({goodId: row._previousDataValues.id});
                //     return img;
                // })
                // console.log(rows[0].dataValues.id);
                var images = [];
                for (let i = 0; i < rows.length; i++) {
                    images.push(await model.findImage({goodId: rows[i].dataValues.id}));
                }
                
                res.json({results, pages: paginate.getArrayPages(req)(3, pageCount, req.query.page), images});
            })
            .catch(err => next(err))
        } catch (e) {
            res.status(400).json({message: 'Не удалось получить данные о товаре', error: e.message});
        }
    } 
}

module.exports = new appMiddleware();
