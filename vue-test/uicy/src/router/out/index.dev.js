"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/Home.vue"));

var _Reg = _interopRequireDefault(require("../views/Reg.vue"));

var _Login = _interopRequireDefault(require("../views/Login.vue"));

var _Cart = _interopRequireDefault(require("../views/Cart.vue"));

var _Discover = _interopRequireDefault(require("../views/Discover.vue"));

var _Omg = _interopRequireDefault(require("../views/Discover/Omg.vue"));

var _Kdy = _interopRequireDefault(require("../views/Discover/Kdy.vue"));

var _Lls = _interopRequireDefault(require("../views/Discover/Lls.vue"));

var _Tissot = _interopRequireDefault(require("../views/Discover/Tissot.vue"));

var _Goods = _interopRequireDefault(require("../views/Goods.vue"));

var _NotFound = _interopRequireDefault(require("../views/NotFound.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 引入;
// 二级路由
//2.使用  
_vue["default"].use(_vueRouter["default"]); // 实例


var router = new _vueRouter["default"]({
  // mode:'hash', // hash 默认  http://localhost:8080/home#/home
  mode: 'history',
  // history  上线需要改成 http://localhost:8080/home
  //3.配置
  routes: [{
    //  当浏览器地址为/home时 ，渲染Home组件内容
    path: "/home",
    component: _Home["default"]
  }, {
    //重定向
    path: '/',
    redirect: '/home'
  }, {
    //  当浏览器地址为/home时 ，渲染Home组件内容
    path: "/reg",
    component: _Reg["default"]
  }, {
    //  当浏览器地址为/home时 ，渲染Home组件内容
    path: "/login",
    component: _Login["default"]
  }, {
    //  当浏览器地址为/home时 ，渲染Home组件内容
    path: "/cart",
    name: 'cart',
    // 定义时传参：props
    // 1. Boolean方式：等效于<Cart v-bind="$route.params" />
    // props:true,
    // 2. Object方式：等效于<Cart v-bind="{pageName:'CartPage',step:1}" />
    // props:{pageName:'CartPage',step:1},
    // 3. Function方法：把函数返回值作为props
    // props:function(){
    //     return {
    //         a: true,
    //         b: false,
    //         c: 100
    //       }
    // },
    component: _Cart["default"]
  }, {
    //  当浏览器地址为/home时 ，渲染Home组件内容
    path: "/discover",
    component: _Discover["default"],
    redirect: {
      name: 'omg'
    },
    // 子路由 二级
    children: [{
      path: '/omg',
      name: 'omg',
      component: _Omg["default"]
    }, {
      path: '/kdy',
      name: 'kdy',
      component: _Kdy["default"]
    }, {
      path: '/lls',
      name: 'lls',
      component: _Lls["default"]
    }, {
      path: '/tissot',
      name: 'tissot',
      component: _Tissot["default"]
    }]
  }, {
    name: 'goods',
    path: '/goods/:id',
    // 路径匹配/goods/xxx这个格式时，才渲染Goods组件
    component: _Goods["default"]
  }, {
    path: '/notfound',
    //  404 跳转
    name: 'NotFound',
    component: _NotFound["default"]
  }, {
    path: '/*',
    redirect: {
      //   没定义到组件都跳到  404 NotFound页面
      name: 'NotFound'
    }
  }]
}); // 全局路由守卫
// 开始导航

router.beforeEach(function (to, from, next) {
  console.log('beforeEach=', to.path, from.path);
  next();
}); // 确认导航

router.beforeResolve(function (to, from, next) {
  console.log('beforeResolve=', to.path, from.path);
  next();
}); // 结束导航 没有 next

router.afterEach(function (to, from) {
  console.log('afterEach=', to.path, from.path);
});
var _default = router; // 导出路由

exports["default"] = _default;