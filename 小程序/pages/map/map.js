// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前位置
    pos:{},
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"地图"    
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getLocation({
      type:'gcj02',
      isHighAccuracy:true,
      success:(res)=>{
        console.log('res=',res);
        const {longitude,latitude} = res;
        this.setData({
          pos:{longitude,latitude}
        })

        wx.openLocation({
          longitude,
          latitude
        })
      }
    })
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

  }
})