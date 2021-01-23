const express=require('express');

const rootRouter=require('./api');

const app=express(); // 创建服务器
const PORT=2020;

// 静态资源服务器 
app.use(express.static('./public'));

 
// 接口
app.use('/api',rootRouter);


// 监听端口
app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}`);
})