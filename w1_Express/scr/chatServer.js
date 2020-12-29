const express=require('express');
const ws=require("ws");
let http=require("http");

// express web服务器
const app=express();

//静态资源服务器
app.use(express.static('../public'))

// 利用http连接express服务器    与socket服务器   
const server=http.Server(app);


// socket服务器
const wss=new ws.Server({
    server,
    // port:1001
});


wss.on('connection',(client)=>{
    //  监听 关闭
    client.on("close",()=>{

    });

    // 监听 消息发送
    client.on("message",(data)=>{
        wss.clients.forEach(client=>{
            client.send(data);
        })
    })
})

//  监听端口
server.listen(2020,()=>{
    console.log('server is runing on port 2008')
})