"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.request = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 创建一个axios实例
var request = _axios["default"].create({
  baseURL: process.env.NODE_ENV === 'development' ? // 基础路基
  'http://localhost:2020/api' : 'http://126.36.11.23',
  timeout: 3000 // 请求超时时间  3秒后没有响应断开

}); // 方法二


exports.request = request;
request.get('http://localhost:8888/data.json').then(function (res) {
  console.log(res.data, 1111);
}); // 方法三

request({
  method: 'get',
  url: 'http://localhost:2020/api'
}).then(function (res) {
  console.log(res.data, 222);
})["catch"](function (err) {
  console.log(err); // 错误
}); // 方法四

var _default = {
  getData: function getData() {
    return request({
      // 发请求 得到一个promise 对象
      method: 'get',
      url: 'http://localhost:2020/api'
    });
  }
};
exports["default"] = _default;