const express = require('express'); //  引入
const router = express.Router();
const userRouter = express('./user');
const iqRouter = require('./iq');

router.use(express.json(), express.urlencoded({
    extended: true
}));

// /api/user
router.use('/user', userRouter);

//  //api/iq
router.use('/iq', iqRouter);

module.exports = router; // 导出