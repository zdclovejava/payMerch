var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["模板", "支出", "收入"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    
    accSourceData:[
      { id: 'xjzh', 
        name: '现金账户', 
        sub: [{id: 'xj', name: '现金' }]
      },
      { id: 'xyzh', 
        name: '信用账户', 
        sub: [{id: 'xyk', name: '信用卡'}]
      },
      {
        id: 'xnzg', 
        name: '虚拟账户', 
        sub: [
          { id: 'fk',  name: '饭卡' },
          { id: 'gjk', name: '公交卡' },
          { id: 'zfb', name: '支付宝' }
        ] 
      },
      { 
        id: 'jrzh',
        name: '金融账户',
        sub: [{id: 'yhk',name: '银行卡' }] 
      },
      { id: 'tzzh', 
        name: '投资账户',
        sub: [{ id: 'gp',name: '股票' }] 
      }
    ],
    accPickItem: [],

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
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});