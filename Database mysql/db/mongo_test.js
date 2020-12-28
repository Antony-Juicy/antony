const mongodb = require('mongodb'); // 引入

// 获取mongo客户端对象
const MongoClient = mongodb.MongoClient // 连接mongoDB

// 数据库配置
const mongoUrl = "mongodb://localhost:27017";
const dbName = 'h52008';


// 连接mongoDB
MongoClient.connect(mongoUrl, async function (err, client) {
    //   err:链接数据库失败时的错误信息，默认null
    //   client:连接成功的客户端，可以利用它进行数据库操作
    if (err) throw err;

    // 连接数据库，无则自动创建
    let db = client.db(dbName); //  数据库名称

    //获取 suer 表 集合
    const col = db.collection('user')

    //得到所有的内容  查询
    const result = col.find();


    // 获取集合

    // 1.回调函数的写法   利用回调函数拿取里面的数据
    // result.toArray(function(err,rows){
    //     console.log('rows');
    // })  没有返回值

    // 2.Promise的写法  result.toArray()得到 Promise
    // result.toArray().then(rows => {
    //         console.log(rows);
    //     }


    // 3.asyn&await写法

    const rows = await result.toArray();
    console.log(rows);


    // 关闭数据库
    client.close();

});