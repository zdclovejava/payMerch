//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    currParam:'haha'
  },

  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    //获得keyboard组件
    this.keyboard = this.selectComponent("#keyboard");
  },
  onLoad: function (options) {
    console.log('index onLoad')
    var that = this
  },

  /**
   * 显示键盘
   */
  showKeyboard: function(e){
    console.log('显示键盘');
    this.keyboard.showKeyboard();
  },
  //单机事件
  _kbNumClickEvent: function(e) {
    console.log(e.detail);
    console.log('keyBoardClickEvent事件触发');
  },

  //事件处理函数
  bindViewTap: function() {
    console.log("bindViewTab");
    wx.navigateTo({
      url: '../test/test'
    })
  },

  //进入记账页面
  toTally:function(){
    wx.navigateTo({
      url: '../tally/tally'
    })
  }
 
})
