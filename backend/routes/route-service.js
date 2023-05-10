const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const paginate = require('express-paginate');
const appMiddleware = require('./app-middleware');


router.post('/login', body('email').isEmail(), appMiddleware.login);
router.post('/registration', body('email').isEmail(), appMiddleware.registration);
router.post('/update', appMiddleware.updateUser);
router.post('/getuser', appMiddleware.getUser);
router.post('/add_review', appMiddleware.addReview);
router.post('/goods', paginate.middleware(9,9),appMiddleware.getGoods);
router.post('/data',appMiddleware.getDataGoods);
router.post('/add_cart',appMiddleware.add_to_cart);
router.post('/delete_basket', appMiddleware.delete_data_basket);
router.post('/update_pass', appMiddleware.updatePassword)
router.post('/search', appMiddleware.search);
router.post('/sent_qstn', appMiddleware.sentMessage);
router.post('/incoming_asw', appMiddleware.incomingAnswer);
router.post('/upd_inc', appMiddleware.updIncoming);
router.get('/get_basket',appMiddleware.get_data_busket);
router.get('/get_sents', appMiddleware.getSentMessage);
router.get('/get_sents_admin', appMiddleware.getSentMessageToAdmin);
router.get('/get_incoming', appMiddleware.getIncoming);
router.get('/get_incoming_admin', appMiddleware.getIncomingToAdmin);
router.get('/get_reviews',appMiddleware.getReviews);
router.get('/get_image', appMiddleware.getGoodImage);
router.get('/activating/:activate', appMiddleware.activate);
router.get('/refresh', appMiddleware.refresh);


module.exports = router;