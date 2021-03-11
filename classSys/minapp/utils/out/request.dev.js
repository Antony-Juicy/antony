"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var baseUrl = 'https://api.qfh5.cn'; //'http://120.76.247.5:2020'; // 

function request(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise(function (resolve, reject) {
    wx.request(_objectSpread({}, config, {
      url: baseUrl + '/api' + url,
      data: data,
      success: function success(res) {
        resolve(res.data);
      },
      fail: function fail(err) {
        reject(err);
      }
    }));
  });
}

request.get = function (url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return request(url, data, _objectSpread({}, config, {
    method: 'GET'
  }));
};

request.put = function (url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return request(url, data, _objectSpread({}, config, {
    method: 'PUT'
  }));
}; // 删除


request["delete"] = function (url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return request(url, data, _objectSpread({}, config, {
    method: 'DELETE'
  }));
};

module.exports = request;