"use strict";

// const mongodb = require('mongodb'); 引入
// const MongoClient = mongodb.MongoClient // 
var _require = require('mongodb'),
    ObjectId = _require.ObjectId,
    MongoClient = _require.MongoClient; // 引连接mongoDB
//  解构  下面id需要用到对象
// 数据库配置


var config = {
  dbUrl: "mongodb://localhost:27017",
  dbName: 'h52008'
}; // 封装一个连接数据库函数

function connect() {
  var client, db;
  return regeneratorRuntime.async(function connect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(MongoClient.connect(config.dbUrl));

        case 2:
          client = _context.sent;
          // 不传回调是Promise
          // 连接数据库，无则自动创建
          db = client.db(config.dbName); //  数据库名称   
          // 拿到数据集合 用方法
          // const col = db.collection('user') //  获取 user 表 集合

          return _context.abrupt("return", {
            client: client,
            db: db
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
} // 增加


function create(colName, data) {
  var _ref, client, db, col, result;

  return regeneratorRuntime.async(function create$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(connect());

        case 2:
          _ref = _context2.sent;
          client = _ref.client;
          db = _ref.db;
          col = db.collection(colName); // 拿到集合
          // 判读数据类型  Array.isArray 布尔值

          if (!Array.isArray(data)) {
            // inertMany()  插入的数组 
            data = [data];
          }

          _context2.prev = 7;
          _context2.next = 10;
          return regeneratorRuntime.awrap(col.insertMany(data));

        case 10:
          result = true;
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](7);
          result = false;

        case 16:
          // 关闭数据库
          client.close();
          return _context2.abrupt("return", result);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[7, 13]]);
} // col.inertMany({username:'qingqing',password:'123',role:'vip',email:'jj@laoxie.com'})  // 插入
// 删除


function remove() {} // 修改


function update() {}
/**
 * 查询数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */
// 查询


function find(colName) {
  var query,
      _ref2,
      client,
      db,
      col,
      result,
      _args3 = arguments;

  return regeneratorRuntime.async(function find$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          query = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
          _context3.next = 3;
          return regeneratorRuntime.awrap(connect());

        case 3:
          _ref2 = _context3.sent;
          client = _ref2.client;
          db = _ref2.db;
          // 调用连接数据库
          col = db.collection(colName); // 连接数据库，无则自动创建

          _context3.next = 9;
          return regeneratorRuntime.awrap(col.find(query).toArray());

        case 9:
          result = _context3.sent;
          // console.log(result);
          client.close();
          return _context3.abrupt("return", result);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
}

module.exports = {
  create: create,
  remove: remove,
  update: update,
  find: find
}; //  导出