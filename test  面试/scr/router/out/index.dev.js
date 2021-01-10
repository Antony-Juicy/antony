"use strict";

var express = require('express'); //  引入


var router = express.Router();
var userRouter = express('./user');

var iqRouter = require('./iq');

router.use(express.json(), express.urlencoded({
  extended: true
})); // /api/user

router.use('/user', userRouter); //  //api/iq

router.use('/iq', iqRouter);
module.exports = router; // 导出