const express = require('express');
const router = express.Router();
const paginate = require('express-paginate');
const appMiddleware = require('./app-middleware');


router.post('/login', appMiddleware.login);
router.post('/registration', appMiddleware.registration);
router.post('/update', appMiddleware.updateUser);
router.post('/getuser', appMiddleware.getUser);
router.post('/goods', paginate.middleware(6,6),appMiddleware.getGoods);
router.post('/data',appMiddleware.getDataGoods);
router.get('/activating/:activate', appMiddleware.activate);
router.get('/refresh', appMiddleware.refresh);


module.exports = router;