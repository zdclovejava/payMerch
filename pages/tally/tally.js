var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["模板", "支出", "收入"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    subjectList:Object,
    accountList:Object,
    subjectPickItem: Array,
    subjectPickIndex: [0, 0],
    accPickItem:Array,
    accPickIndex:[0,0],

    zcValue:"0.00",
    srValue:"0.00",
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.request({
      url: "http://192.168.0.130:8080/jljob/api/subject/list",
      method:"post",
      success:function(res){
        that.setData({
          subjectList:res.data.subject,
          accountList:res.data.account
        });
        var initSubject = new Array();
        initSubject[0] = that.data.subjectList;
        initSubject[1] = that.data.subjectList[0].childList;
        var initAccount = new Array();
        initAccount[0] = that.data.accountList;
        initAccount[1] = that.data.accountList[0].childList;
        that.setData({ 
          subjectPickItem: initSubject,
          accPickItem: initAccount
        });
      }
    });
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  bindSubjectPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({ subjectPickIndex:e.detail.value})
  },
  bindSubjectPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      subjectPickItem: this.data.subjectPickItem,
      subjectPickIndex: this.data.subjectPickIndex
    };
    switch (e.detail.column) {
      case 0:
        data.subjectPickItem[1] = this.data.subjectList[e.detail.value].childList;
        data.subjectPickIndex[0] = e.detail.value;
        data.subjectPickIndex[1] = 0;
        break;
      case 1:
        data.subjectPickIndex[1] = e.detail.value;
        break;
    }
    this.setData(data);
  },

  bindAccPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({ accPickIndex: e.detail.value })
  },
  bindAccPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      accPickItem: this.data.accPickItem,
      accPickIndex: this.data.accPickIndex
    };
    switch (e.detail.column) {
      case 0:
        data.accPickItem[1] = this.data.accountList[e.detail.value].childList;
        data.accPickIndex[0] = e.detail.value;
        data.accPickIndex[1] = 0;
        break;
      case 1:
        data.accPickIndex[1] = e.detail.value;
        break;
    }
    this.setData(data);
  },

  bindZcFocus:function(e){
    var precapital;
    if (e.detail.value == '0.00') {
      precapital = '';
    } else {
      precapital = e.detail.value.replace(/\.00/, '').replace(/(\.\d)0/, '$1');
    }
    this.setData({ zcValue: precapital});
    console.log("zcFocus value=" + this.data.zcValue);
    return{
      value: this.data.zcValue
    }
  },

  bindZcBlur:function(e){
    var precapital = e.detail.value.replace(/[\.]$/, '');
    precapital = Number(precapital).toFixed(2);
    this.setData({ zcValue: precapital});
    return {
      value: this.data.zcValue
    }
  },

  bindZcInput:function(e){
    var precapital = e.detail.value.replace(/^[\.]/, '').replace(/[^\d.]/g, '');
    if (precapital.split(".").length - 1 > 1) {
      precapital = this.data.zcValue;
    }
    this.setData({ zcValue: precapital });
    return {
      value: this.data.zcValue
    }
  }
});