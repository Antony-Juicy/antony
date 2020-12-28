const express=require('express'); // 引入

const router=express.Router();


const goodsRouter=require('./goods');
const userRouter=require('./user');
const cartRouter=require("./cart");


//  post/put/patch请求   只有使用了相应中间件处理后在req.body中才能得到数据 在使用 分路由中间件
router.use(express.urlencoded(),express.json())



//  /api/goods
router.use('/goods',goodsRouter);

//  /api/user
 router.use('/user',userRouter)  ;

//  /api/cart
router.use('/cart',cartRouter);



module.exports=router; // 导出