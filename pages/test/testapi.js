Page({
  data: {
    upprogress: 0,
  },
  testReqPost: function () { 
    const postTask = wx.request({
      url: 'http://localhost:8080/yunpay-wx-merch/rest/user',
      data: {
        loginName: '张三',
        loginPwd: '123456'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  testReqGet: function () {
    const getTask = wx.request({
      url: 'http://localhost:8080/yunpay-wx-merch/rest/user',
      data: {
        loginName: '张三',
        loginPwd: '123456'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      },
      fail:function (res) {
        console.log(res.statusCode)
      }
    })
  },
  testChooseImg: function () {
    var that = this
    wx.chooseImage({
      count:2,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        const length = tempFilePaths.length
        for (let i = 0; i < length; ++i) {
          console.log(tempFilePaths[i])
        }
        const uploadTask = wx.uploadFile({
          url: 'http://localhost:8080/yunpay-tran-sdk/card/upload/logo', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'sign': '1',
            'merchant_num':'999910031001993593'
          },
          success: function (res) {
            console.log(res.data)
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        })
        uploadTask.onProgressUpdate((res) => {
          that.data.upprogress = res.progress
          that.setData({
            upprogress: that.data.upprogress
          })
          console.log('上传进度', res.progress)
          console.log('已经上传的数据长度', res.totalBytesSent)
          console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })
      },
      fail: function(res) {
        console.log(res);
      }
    })
  }
})