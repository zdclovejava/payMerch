//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function (options) {
    console.log("log onLoad")
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
    console.log("query="+options.query)
  },
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
  },
  onReachBottom: function () {
    console.log("onReachBottom");
  },
  onPageScroll: function () {
    console.log("onPageScroll");
  },
  onShareAppMessage: function(){
    return {
      title: '云支付',
      path: '/pages/logs/logs?id=123'
    }
  }
})
