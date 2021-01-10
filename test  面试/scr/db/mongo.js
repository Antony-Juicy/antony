const {
    ObjectId,
    MongoClient
} = require('mongodb');

// 配置数据库
const config = {
    dbUrl: "mongodb://localhost:27017",
    dbName: "mst"
}

// 封装一个连接数据库函数
async function connect() {
    const client = await MongoClient.connect(config.dbUrl);
    let db = client.db(config.dbName); // 集合

    //  查询数据库 CRUD
    return {
        client,
        db
    }
}


/**
 * 删除数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */



//  增加
async function create(colName, data) {
    let {
        client,
        db
    } = await connect();

    const col = db.collection(colName); //  集合

    if (!Array.isArray(data)) { // 判读是否是数组
        data = [data];

    }

    let result;

    try {
        await col.insertMany(data); // 增  返回的是 Promise对象  等待拿取数据在
        result = true;
    } catch (err) {
        result = false;
    }

    client.close() // 关闭数据库
    return result;
}



/**
 * 删除数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */



//   删除
async function remove(colName, query) {
    let {
        client,
        db
    } = await connect();
    const col = db.collection(colName);
    if (query._id) {
        query._id = ObjectId(query._id);
    }
    let result;
    try {
        await col.deleteMany(query)
        result = true;
    } catch (err) {
        result = false;
    }

    client.close();
    return result;
}



/**
 * 删除数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */


//   修改
async function update(colName, query, data) {
    let {
        client,
        db
    } = await connect();
    const col = db.collection(colName);

    if (query._id) {
        query._id = ObjectId(query._id);
    }

    let result;

    try {
        await col.updateMany(query, data);
        result = true;
    } catch (err) {
        result = false;
    }
    client.close();
    return result;
}




/**
 * 删除数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */


//    查询 
async function find(colName, query = {}, {
    skip,
    size,
    sort
} = {}) {
    
    let {
        client,
        db
    } = await connect(); //  链接数据库

    const col = db.collection(colName); //  集合

    if (query._id) {
        query._id = ObjectId(query._id); // 条件符合要求

    }

    // 查询所有
    let result = col.find(query);

    // 排序  sort()  1 升  -1降
    sort = sort.split(','); //sort='addtime'->['addtime'] | sort='hot,1' -> ['hot','1']
    // if (sort.length > 1) {
    //     result = result.sort({
    //         [sort[0]]: sort[1] * 1
    //     })

    // } else {
    //     result = result.sort({ //  写一个变量   //返回 sort='hot,1'

    //         sort[1] = -1;
    //     });
    // }
    if (sort.length == 1) { // 降序
        sort[1] = -1;
    }
    result = result.sort({
        [sort[0]]: sort[1] * 1
    });

    // 筛选 skip()
    result = result.skip(skip).limit(size); //  db.表名.find().skip(数量)

    result = await result.toArray();
    // const result = await col.find(query).toArray(); // 查询所有

    client.close(); // 关闭
    return result;

}

module.exports = {
    create,
    remove,
    update,
    find
} //   导出