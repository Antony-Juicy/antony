

var mysql = require('mysql'); // 引入模块


//创建连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root', //  数据库用户名
    password: '123456', //  数据库密码
    port: 3306,
    database: 'h52008', //  数据库名
    multipleStatements: true // 允许创建多个连接对象
});

// let sql = 'select * from user';  查询所有数据


module.exports = { //  导出一个对象 Promise  拿取里面的异步的数据
    query:function (sql) {
        return new Promise((resolve, reject) => {
            pool.query(sql, function(error, rows){
                if(error){
                    reject(error);
                }
                resolve(rows);
            });
        })

    }
}