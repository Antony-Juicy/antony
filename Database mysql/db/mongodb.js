// const mongodb = require('mongodb'); 引入
// const MongoClient = mongodb.MongoClient // 

const {
    ObjectId,
    MongoClient
} = require('mongodb'); // 引连接mongoDB
//  解构  下面id需要用到对象



// 数据库配置
const config = {
    dbUrl: "mongodb://localhost:27017",
    dbName: 'h52008'
}


// 封装一个连接数据库函数

async function connect() {
    const client = await MongoClient.connect(config.dbUrl); // 不传回调是Promise

    // 连接数据库，无则自动创建
    let db = client.db(config.dbName) //  数据库名称   

    // 拿到数据集合 用方法
    // const col = db.collection('user') //  获取 user 表 集合

    return {
        client,
        db
    }
}


// 增加
async function create(colName, data) {
    let {
        client,
        db
    } = await connect();
 
    const col = db.collection(colName) // 拿到集合

    // 判读数据类型  Array.isArray 布尔值
    if (!Array.isArray(data)) { // inertMany()  插入的数组 

        data = [data];
    }

    let result;
    try {
        await col.insertMany(data);
        result = true;
    } catch (err) {
        result = false;
    }

    // 关闭数据库
    client.close();
    return result;
}

// col.inertMany({username:'qingqing',password:'123',role:'vip',email:'jj@laoxie.com'})  // 插入








// 删除
function remove() {

}


// 修改
function update() {

}





/**
 * 查询数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */
// 查询
async function find(colName, query = {}) {
    let {
        client,
        db
    } = await connect() // 调用连接数据库
    const col = db.collection(colName); // 连接数据库，无则自动创建

    const result = await col.find(query).toArray();
    // console.log(result);

    client.close();
    return result; 
}





module.exports = {
    create,
    remove,
    update,
    find
} //  导出