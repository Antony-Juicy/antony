const express = require('express'); // 引入

const router = express.Router();


const goodsRouter = require('./goods');
const userRouter = require('./user');
const cartRouter = require("./cart");
// const cors = require('../filter/cors');

// router.all('*', function (req, res, next) {
//     // 设置响应头
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE,OPTIONS");

//     //  跨域请求 CORS中的预请求
//     if (req.method == "OPTIONS") {
//         res.sendStatus(200); //  让options请求快速返回
//     } else {
//         next();

//     }

// })  // 复杂请求

router.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST,PUT,PATCH"); // POST  PUT  PATCH  才可以请求   
    res.set("Access-Control-Allow-Headers", "Content-Type");
    //  相应的请求头才可以

    // 处理预请求，预请求不需要响应内容，只需要响应200状态码
    if (req.method == "OPTIONS") {
        res.sendStatus(200); /*让options请求快速返回*/
    } else {
        next();
    }
})


// CORS请求
// router.use(cors);

//  post/put/patch请求   只有使用了相应中间件处理后在req.body中才能得到数据 在使用 分路由中间件
router.use(express.urlencoded(), express.json());



//  /api/goods
router.use('/goods', goodsRouter);

//  /api/user
router.use('/user', userRouter);

//  /api/cart
router.use('/cart', cartRouter);



// jsonp接口：是script标签发起的请求，所以只能反回js代码
router.get('/jsonp', (req, res) => {
    let {
        callback
    } = req.query; // 接收传回来的函数
    // 数据库查询，得到数据data
    let data = [{
        username: 'laoxie',
        password: 123456,
        role: 'admin'
    }, {
        username: 'jingjing',
        password: 123,
        role: 'vip'
    }]
    res.send(`${callback}(${JSON.stringify(data)})`);
});


// CORS请求
router.post('/cors', (req, res) => {
    let data = [{
        username: 'laoxie',
        password: 123456,
        role: 'admin'
    }, {
        username: 'jingjing',
        password: 123,
        role: 'vip'
    }];
    res.send(data);
})



// 服务器代理: 利用http-proxy-middleware中间件实现

// 1. 引入

const {
    createProxyMiddleware
} = require('http-proxy-middleware');

// 添加服务器代理配置
const mstProxy = createProxyMiddleware({
    // 目标服务器
    target: "https://offer.qfh5.cn",
    changeOrigin: true,
    pathRewrite: {
        // 目标：https://offer.qfh5.cn/api/iq?sort=hot
        // 我的数据接口：http://localhost:2008/api/ger/iq?sort=hot
        // 代理过程：
        // 1. 替换域名：https://offer.qfh5.cn/api/ger/iq?sort=hot
        // 2. 替换路径：https://offer.qfh5.cn/api/iq?sort=hot
        // 3. 发起请求并返回数据给前端
        '^/api/ger': '/api',
    }

});

// 路由
router.use('/ger', mstProxy);




module.exports = router; // 导出