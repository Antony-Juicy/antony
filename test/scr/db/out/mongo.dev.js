"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('mongodb'),
    ObjectId = _require.ObjectId,
    MongoClient = _require.MongoClient; // 配置数据库


var config = {
  dbUrl: "mongodb://localhost:27017",
  dbName: "mst"
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
          db = client.db(config.dbName); // 集合
          //  查询数据库 CRUD

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
}
/**
 * 删除数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */
//  增加


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
          col = db.collection(colName); //  集合

          if (!Array.isArray(data)) {
            // 判读是否是数组
            data = [data];
          }

          _context2.prev = 7;
          _context2.next = 10;
          return regeneratorRuntime.awrap(col.insertMany(data));

        case 10:
          // 增  返回的是 Promise对象  等待拿取数据在
          result = true;
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](7);
          result = false;

        case 16:
          client.close(); // 关闭数据库

          return _context2.abrupt("return", result);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[7, 13]]);
}
/**
 * 删除数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */
//   删除


function remove(colName, query) {
  var _ref2, client, db, col, result;

  return regeneratorRuntime.async(function remove$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(connect());

        case 2:
          _ref2 = _context3.sent;
          client = _ref2.client;
          db = _ref2.db;
          col = db.collection(colName);

          if (query._id) {
            query._id = ObjectId(query._id);
          }

          _context3.prev = 7;
          _context3.next = 10;
          return regeneratorRuntime.awrap(col.deleteMany(query));

        case 10:
          result = true;
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](7);
          result = false;

        case 16:
          client.close();
          return _context3.abrupt("return", result);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[7, 13]]);
}
/**
 * 删除数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */
//   修改


function update(colName, query, data) {
  var _ref3, client, db, col, result;

  return regeneratorRuntime.async(function update$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(connect());

        case 2:
          _ref3 = _context4.sent;
          client = _ref3.client;
          db = _ref3.db;
          col = db.collection(colName);

          if (query._id) {
            query._id = ObjectId(query._id);
          }

          _context4.prev = 7;
          _context4.next = 10;
          return regeneratorRuntime.awrap(col.updateMany(query, data));

        case 10:
          result = true;
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](7);
          result = false;

        case 16:
          client.close();
          return _context4.abrupt("return", result);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[7, 13]]);
}
/**
 * 删除数据
 * @param {String} colName  集合名称
 * @param {Object} query    查询条件
 */
//    查询 


function find(colName) {
  var query,
      _ref4,
      skip,
      size,
      sort,
      _ref5,
      client,
      db,
      col,
      result,
      _args5 = arguments;

  return regeneratorRuntime.async(function find$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          query = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          _ref4 = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {}, skip = _ref4.skip, size = _ref4.size, sort = _ref4.sort;
          _context5.next = 4;
          return regeneratorRuntime.awrap(connect());

        case 4:
          _ref5 = _context5.sent;
          client = _ref5.client;
          db = _ref5.db;
          //  链接数据库
          col = db.collection(colName); //  集合

          if (query._id) {
            query._id = ObjectId(query._id); // 条件符合要求
          } // 查询所有


          result = col.find(query); // 排序  sort()  1 升  -1降

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

          if (sort.length == 1) {
            // 降序
            sort[1] = -1;
          }

          result = result.sort(_defineProperty({}, sort[0], sort[1] * 1)); // 筛选 skip()

          result = result.skip(skip).limit(size); //  db.表名.find().skip(数量)

          _context5.next = 16;
          return regeneratorRuntime.awrap(result.toArray());

        case 16:
          result = _context5.sent;
          // const result = await col.find(query).toArray(); // 查询所有
          client.close(); // 关闭

          return _context5.abrupt("return", result);

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  });
}

module.exports = {
  create: create,
  remove: remove,
  update: update,
  find: find
}; //   导出