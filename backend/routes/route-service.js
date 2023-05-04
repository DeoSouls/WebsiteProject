const express = require('express');
const router = express.Router();
const paginate = require('express-paginate');
const appMiddleware = require('./app-middleware');


router.post('/login', appMiddleware.login);
router.post('/registration', appMiddleware.registration);
router.post('/update', appMiddleware.updateUser);
router.post('/getuser', appMiddleware.getUser);
router.post('/add_review', appMiddleware.addReview);
router.post('/goods', paginate.middleware(9,9),appMiddleware.getGoods);
router.post('/data',appMiddleware.getDataGoods);
router.post('/add_cart',appMiddleware.add_to_cart);
router.get('/get_basket',appMiddleware.get_data_busket);
router.get('/activating/:activate', appMiddleware.activate);
router.get('/refresh', appMiddleware.refresh);


module.exports = router;