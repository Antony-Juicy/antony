// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    current:0,
    "list": [{
      "pagePath": "/pages/index/index",
      "text": "首页",
      iconPath: '/icon/home.png',
      selectedIconPath: '/icon/home_active.png'
    },
    {
      "pagePath": "/pages/classlist/classlist",
      "text": "班级",
      iconPath: '/icon/list.png',
      selectedIconPath: '/icon/list_active.png'
    },
    {
      "pagePath": "/pages/mine/mine",
      "text": "我的",
      dot: true,
      iconPath: '/icon/mine.png',
      selectedIconPath: '/icon/mine_active.png'
    }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabChange(e) {
    
      wx.switchTab({
        url: e.detail.item.pagePath,
      })
    },
    setCurrent(current){
      // console.log('current',current)
      this.setData({
        current
      })
    }
  }
})