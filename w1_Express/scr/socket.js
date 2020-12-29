const ws = require('ws'); // 引入模块


const SocketServer = ws.Server;


// 创建Sokect服务端   
const wss = new SocketServer({
    port: 1001
}); //  开启成功  客户端连接


// connection连接事件：只要有用户连接进来就会触发 

wss.on('connection', (client) => {
    // client: 连接的客户端对象
    console.log("client");


    client.on("close", () => {
        console.log("xxx 离开"); // 连接断开监听
    });

    client.on("message", (data) => { //  结束客户端传来的消息
        console.log(data);
        let idx=users.indexOf(data);

        // if(idx>0){
        //     wss.clients[idx].close();  // 关掉
        //     users.splice(idx,1);
        // }
        // users.push(data);



        // 广播 每个进入直播用户都可以收到的信息
        wss.clients.forEach(item => {
            client.send(data);

        })
        // console.log(wss.clients);  是一个数组
    })




    //  主动给客户端发送消息
    client.send("欢迎来到jjj")
})