"use strict";

// index.js
// 获取应用实例
var app = getApp();

var request = require('../../utils/request');

Page({
  data: {
    classList: [],
    userList: []
  },
  //  发请求 数据域
  onLoad: function onLoad() {
    var _ref, data;

    return regeneratorRuntime.async(function onLoad$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            this.getData();
            _context.next = 3;
            return regeneratorRuntime.awrap(request('/class'));

          case 3:
            _ref = _context.sent;
            data = _ref.data;
            // 更新数据
            this.setData({
              classList: data.result
            }); // 获取当前班级学生列表
            // const {Data} = await request.get('/user',{
            //   class_id:'5fb3939b1ae684fd77bc633e',
            //   size:100
            // });
            // this.setData({
            //   userList:Data
            // });
            // console.log('user=', data)

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  getData: function getData() {
    var _ref2, data;

    return regeneratorRuntime.async(function getData$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(request.get('/user', {
              class_id: '5fb3939b1ae684fd77bc633e',
              size: 100
            }));

          case 2:
            _ref2 = _context2.sent;
            data = _ref2.data;
            this.setData({
              userList: data.result
            });
            console.log('user=', data);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    //在页面展示后，获取tabbar实例，并设置Tabbar组件的current值
    var tabBar = this.getTabBar();
    tabBar.setCurrent(0);
  },
  // 学生列表
  gotoUser: function gotoUser(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/user/user?id=' + id
    });
  },
  // 班级列表
  gotoClass: function gotoClass(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/class/class?id=' + id
    });
  }
});