const express = require('express');

// 得到一个路由 中间键
const router = express.Router() // 衔接 中间键

console.log(router);



// 当请求地址为：/api/goods/list，才能匹配这个路由
router.get("/list", function (req, res, next) {
    const{page,size,category}=req.query    //  get请求获取参数  利用结构对象拿取属性值
    const resulu={page,size,category}

    res.send('resulu')  //  获取响应 
})


// 当请求地址为：/api/goods/12，才能匹配这个路由
router.get('/:id', (req, res) => {
    // 根据id查询 得到对应商品信息   select * from goods where id=id
    
    erq.get('Content-Type');  //   post请求  获取请求头 参数 
      // post请求：req.body
    、
    res.send(req.body)   //  获取响应   使用了相应中间件处理后得到数据   express.urlencoded() express.json()
})



// 当请求地址为：/api/goods/12，才能匹配这个路由
router.delete('/:id', (req, res) => {
    // 根据id删除对应数据库中的商品：delete from goods where id=id
    res.send("goods")
})



// 当请求地址为：/api/goods/12，才能匹配这个路由
router.put('/:id', (req, res) => {

    // 根据传入的参数修改对应的商品数据   update goods set price=998 where id=id
    res.send("goods")
})







module.exports = router; // 导出