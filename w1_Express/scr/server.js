const express = require('express'); // 引入模块 
const allRouter= require('./api');  // 所有路由






//启动一个服务器
const app = express();

// 启动静态资源服务器
// static()中间的处理逻辑：如果找到静态资源，则不会执行后面的中间件，如果找不到静态资源内部会自动next()
  
// 中间件
const middileware = express.static('../public');
app.use(middileware);
console.log(middileware);  // 是个函数


// // 自定 中间件
/* const myMiddleware=function(req,res,next){
    
   console.log("myMiddleware");
  
   next();  // next:是一个方法，调用后才执行下一个中间件
}
app.use(myMiddleware);
app.use(function(req,res,next){
    console.log('123');

    // res.write();  原生  结束
    // res.end(); 

    res.send({a:10,b:20})   //  响应
}) */

    


// let goodslist = [];
// for (let i = 0; i < 20; i++) {
//     let goods = {
//         id: i + 1,
//         name: "img/goods" + i + ".jpg",
//         price: (Math.random() * 10000).toFixed(2)
//     }
//     goodslist.push(goods);
// }




// 路由  use不管什么请求都可以请求

// 根据不同路径访问不同路由

/* app.use("/goodslist",function(req,res,next){
    // 只有访问路径为、goodslist的时候才会进入这格中间件

    res.send(goodslist);
})

app.get("/goods",function(erq,res,next){ 
    // get 求情拿一个商品
    res.send(goodslist[0]);


})
 */
/* app.get('/goods/:id',function(req,res,next){  // 冒号 变量 动态路由id
// 获取动态路由参数  
const {id}=req.params;  // id是字符串
// console.log(id);  // 获取 id  值

const result=goodslist.find(item=>item.id==id) // 获取数组 函数内判断）的数组的第一个元素的值。

res.send(result);


})

 */










// 数据接口
app.use("/api",allRouter);









// // 监听端口 开启服务器 定义端口2020
app.listen(2020,() => {
    console.log("server is runing on port 200");
})