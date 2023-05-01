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

            // await model.deleteToken({where: {userId: userid}});
            // const group = await model.createGroup({group_name: 'techno'});
            // const good = await model.createGood({name: 'Meizu 16s', type: 'phone', price: '26346', brand: 'meizu', groupId: group.id});
            // await model.createGoodInfo({color: 'red&black&white', info: 'Смартфон Meizu 16S глобальной версии, экран 6,2 дюйма, двойная фронтальная камера, 8 ГБ ОЗУ 128 Гб ПЗУ, Восьмиядерный процессор Snapdragon 855, 4G, 3600 мАч', goodId: good.id});
            // await model.createImage({img: 'http://localhost:5000/static/image1.jpg', goodId: good.id});
            // await model.createDiscount({value: '65865', goodId: good.id});
            // const good7 = await model.createGood({name: 'Xiaomi Redmi Note 7', type: 'phone', price: '14490', brand: 'redmi', groupId: group.id});
            // await model.createGoodInfo({color: 'red&white', info: 'Смартфон Xiaomi Redmi Note 7, 4 Гб + 64 ГБ, Snapdragon 660AIE, Android мобильный телефон, задняя камера 48 Мп + 5 МП', goodId: good7.id});
            // await model.createImage({img: 'http://localhost:5000/static/image12.jpg', goodId: good7.id});
            // await model.createDiscount({value: '20000', goodId: good7.id});
            // const good1 = await model.createGood({name: 'Xiaomi Redmi Note 11', type: 'phone', price: '13860', brand: 'apple', groupId: group.id});
            // await model.createGoodInfo({color: 'white', info: 'Глобальная версия смартфона Xiaomi Redmi Note 11, Snapdragon 680 33W Pro, быстрая зарядка, 50 МП, Quad Camera', goodId: good1.id});
            // await model.createImage({img: 'http://localhost:5000/static/image2.jpg', goodId: good1.id});
            // await model.createDiscount({value: '17703', goodId: good1.id});
            // const good8 = await model.createGood({name: 'Meizu 16th', type: 'phone', price: '19050', brand: 'meizu', groupId: group.id});
            // await model.createGoodInfo({color: 'black', info: 'Смартфон Meizu 16th с глобальной прошивкой, 6,0 дюйма, двойная фронтальная камера, 8 ГБ ОЗУ, 128 Гб ПЗУ, Восьмиядерный процессор Snapdragon 845, 4G, 3010 мАч', goodId: good8.id});
            // await model.createImage({img: 'http://localhost:5000/static/image8.jpg', goodId: good8.id}); //Удалить 8 картинку
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
            await sequelize.sync({});

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

            res.json({data: info[0], group: group[0], product: good[0], image: image[0], discount: discount[0], user: user[0], review: review, usersreview: users});

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
