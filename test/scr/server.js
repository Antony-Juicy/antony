const express=require('express'); // 引入

const rootRouter=require('./router');

const app=express();

const PORT=2020;

//  静态资源服务器
app.use(express.static('../public'))
   


// 编写接口
app.use('/api',rootRouter);
  

// 监听端口
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
}) 