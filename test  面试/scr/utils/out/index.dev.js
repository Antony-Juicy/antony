"use strict";

// function formatData(obj={}){
// let {code=200,data=[],msg='success'} = obj;
function formatData() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$code = _ref.code,
      code = _ref$code === void 0 ? 200 : _ref$code,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$msg = _ref.msg,
      msg = _ref$msg === void 0 ? "success" : _ref$msg;

  if (code === 400) {
    msg = 'fail';
  }

  return {
    code: code,
    data: data,
    msg: msg
  };
}

module.exports = {
  formatData: formatData
};