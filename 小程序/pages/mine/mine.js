// pages/mine/mine.js
const app = getApp();
console.log("app=", app); // 获取全局 App 实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentClass: "不行啊"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 自定义事件处理函数
  changeClass(e) {
    // console.log(e)
    this.setData({
      currentClass: e.detail.value
    })
  },
  handleClick(e) {
    const {url}=e.currentTarget.dataset
    wx.navigateTo({
      url
    })
  }
})