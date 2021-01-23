const express = require('express');

const router = express.Router(); // 中间件

const userRouter = require('./user'); // 中间件

const goodsRouter = require('./goods');

const cors=require('../filter/cors')

router.use(cors);
// 格式化请求体中的数据
router.use(express.json(),express.urlencoded());

router.use('/goods', goodsRouter);
router.use('/user', userRouter);


module.exports = router; // 导出
