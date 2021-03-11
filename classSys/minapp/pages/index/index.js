// index.js
// 获取应用实例
const app = getApp()

const request = require('../../utils/request')

Page({
  data: {
    classList: [],
    userList: []
  },
  onShow(){
    //在页面展示后，获取tabbar实例，并设置Tabbar组件的current值
    const tabBar = this.getTabBar();
    tabBar.setCurrent(0)
  },


  //  发请求 数据域
  async onLoad() {
    this.getData();

    const {
      data
    } = await request('/class');

    // 更新数据
    this.setData({
      classList: data.result
    });

    // 获取当前班级学生列表
    // const {Data} = await request.get('/user',{
    //   class_id:'5fb3939b1ae684fd77bc633e',
    //   size:100
    // });
    // this.setData({
    //   userList:Data
    // });
    // console.log('user=', data)


  },
  async getData(){
    const {data} = await request.get('/user',{
      class_id:'5fb3939b1ae684fd77bc633e',
      size:100
    });
    this.setData({
      userList:data.result
    });
    console.log('user=', data)

  },


  /**
   * 生命周期函数--监听页面显示
   */

  // 学生列表
  gotoUser(e) {
    const {
      id
    } = e.currentTarget.dataset
    wx.navigateTo({
      url:'/pages/user/user?id='+id
    })
  },

  // 班级列表
  gotoClass(e){
    const {id}=e.currentTarget.dataset
    wx.navigateTo({
      url:'/pages/class/class?id='+id
    })
  }

})