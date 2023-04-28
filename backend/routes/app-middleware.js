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
            // const group = await model.createGroup({group_name: 'food'});
            // const good = await model.createGood({name: 'IPhone Pro Max', type: 'headphone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            // await model.createImage({img: 'http://localhost:5000/static/image1.jpg', goodId: good.id});
            // const good7 = await model.createGood({name: 'IPhone Pro Max', type: 'headphone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            // await model.createImage({img: 'http://localhost:5000/static/image7.jpg', goodId: good7.id});
            // const good1 = await model.createGood({name: 'IPhone Pro Max', type: 'headphone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            // await model.createImage({img: 'http://localhost:5000/static/image2.jpg', goodId: good1.id});
            // const good8 = await model.createGood({name: 'IPhone Pro Max', type: 'headphone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            // await model.createImage({img: 'http://localhost:5000/static/image8.jpg', goodId: good8.id});
            // const good9 = await model.createGood({name: 'IPhone Pro Max', type: 'headphone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            // await model.createImage({img: 'http://localhost:5000/static/image9.jpg', goodId: good9.id});
            // const good2 = await model.createGood({name: 'IPhone Pro Max', type: 'headphone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            // await model.createImage({img: 'http://localhost:5000/static/image3.jpg', goodId: good2.id});
            // const good4 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            // await model.createImage({img: 'http://localhost:5000/static/image4.jpg', goodId: good4.id});
            // const good10 = await model.createGood({name: 'IPhone Pro Max', type: 'TV', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            // await model.createImage({img: 'http://localhost:5000/static/image10.jpg', goodId: good10.id});
            // const good5 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            // await model.createImage({img: 'http://localhost:5000/static/image5.jpg', goodId: good5.id});
            // const good11 = await model.createGood({name: 'IPhone Pro Max', type: 'TV', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            // await model.createImage({img: 'http://localhost:5000/static/image11.jpg', goodId: good11.id});
            // const good6 = await model.createGood({name: 'IPhone Pro Max', type: 'phone', good_info: 'что то о товаре', price: '50000', groupId: group.id});
            // await model.createImage({img: 'http://localhost:5000/static/image6.jpeg', goodId: good6.id});
            
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

                        if(group === 'all') {
                            allprod = await model.findGood();

                        } else {
                            productGroup = await model.findGroup({group_name: group});
                            console.log(productGroup[0]);
                            if(productGroup[0] !== undefined) {

                                allprod = await model.findGood({groupId: productGroup[0].dataValues.id});
                            }
                        }

                        for (let i = 0; i < totalFilter.length; i++) {

                            const good = await model.findGood({type: totalFilter[i]});
                            prevfilter = totalFilter[i - 1];

                            if(good[0] !== undefined) {
                                if(products[0] !== undefined ){

                                    var product = await model.findGood({type: totalFilter[i]});
                                    products = [[...products[0], ...product]];
                                } else {
                                    var product = await model.findGood({type: totalFilter[i]});
                                    products = [[...product]];
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

                                        for (let i = 0; i < subArray[skip].length; i++) {
                                            const imgProd = await model.findImage({goodId: subArray[skip][i].dataValues.id});
                                            if(imgProd.length > 0) {
                                                totalImages.push(imgProd);
                                            }
                                        }

                                        images = [...totalImages];
                                        prod = [];

                                    } else if (subArray[skip] === undefined) {

                                        prod = [];
                                    }
                                } else {
                                    if (prod.length === 0) {
                                        var totalImages = [];
                                        for (let i = 0; i < subArray[skip].length; i++) {
                                            const imgProd = await model.findImage({goodId: subArray[skip][i].dataValues.id});
                                            if(imgProd.length > 0) {
                                                totalImages.push(imgProd);
                                            }
                                        }
                                        images = [...totalImages];
                                    }
                                }
                                
                                var nextskip = req.skip/req.query.limit;
                                if(prod.length !== 0) {

                                    var totalImages = [];
                                    for (let i = 0; i < subArray[skip].length; i++) {
                                        const imgProd = await model.findImage({goodId: subArray[skip][i].dataValues.id});
                                        if(imgProd.length > 0) {
                                            totalImages.push(imgProd);
                                        }
                                    }

                                    images = [...totalImages];
                                    var filterData = [];

                                    subArray[nextskip].forEach((arr, index) => {
                                        if(subArray[nextskip][index] !== undefined) {

                                            if(arr.dataValues.type === prevfilter) {
                                                filterData.push(subArray[nextskip][index]);

                                            } else if (arr.dataValues.type === totalFilter[i]) {
                                                if(arr.dataValues.type === totalFilter[i]) {
                                                    filterData.push(subArray[nextskip][index]);
                                                }
                                            } else {
                                                if(arr.dataValues.type === totalFilter[i - 2]) {
                                                    filterData.push(subArray[nextskip][index]);
                                                }
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

                        return {image: images, prod: prod, cnt: counts}
                        
                    } else {

                        if(group === 'all') {
                            allprod = await model.findGood();

                        } else {
                            productGroup = await model.findGroup({group_name: group});
                            if(productGroup[0] !== undefined) {
                                allprod = await model.findGood({groupId: productGroup[0].dataValues.id});
                            }
                            console.log(allprod);
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
        
                            for (let i = 0; i < products.length; i++) {
                                img.push(await model.findImage({goodId: subAllProd[skip][i].dataValues.id}));
                            }

                            counts = allprod.length;
                        } else {
                            counts = 0;
                        }
                        

                        // for (let i = 0; i < rows.length; i++) {
                        //     const prod = await model.findGood({id: rows[i].dataValues.id});
                        //     products.push(prod[0]);
                        // }
    
                        // for (let i = 0; i < products.length; i++) {
                        //     img.push(await model.findImage({goodId: rows[i].dataValues.id}));
                        // }
                        return {image: img, prod: products, cnt: counts}
                    }
                };

                var interim_group = [];
                var reaction = null;

                if(group === '' || group === undefined) {
                    interim_group = 'all';
                    reaction = filterWorked(filterObject, interim_group);
                } else {
                    reaction = filterWorked(filterObject, group);
                }


                if(reaction !== null) {

                    img = (await reaction).image;
                    products = (await reaction).prod;
                    counts = (await reaction).cnt;
                } 

                if(products === undefined) {
                    products = [];
                }
                if(img === undefined) {
                    img = [];
                }

                const pgCount = await Math.ceil(counts / req.query.limit);
                console.log(pgCount);
                console.log(counts);

                res.json({results, pages: paginate.getArrayPages(req)(3, pgCount, req.query.page), img, products, counts, filter, group});
            })
            .catch(err => next(err))
        } catch (e) {
            res.status(400).json({message: 'Не удалось получить данные о товаре', error: e.message});
        }
    } 
}

module.exports = new appMiddleware();
