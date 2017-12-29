// pages/components/keyboard/keyboard.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    backGround: {            // 背景颜色
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '#FFF'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    fontColor: {            // 字体颜色
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '#000'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    currContent:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*
     * 公有方法
     */

    //隐藏弹框
    hideKeyboard:function() {
      this.setData({
        isShow: !this.data.isShow,
        currContent:""
      })
    },
    //展示弹框
    showKeyboard:function() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _numClickEvent:function(e) {
      //数字键单击
      var currvalue = e.currentTarget.dataset.keyvalue;
      if(currvalue=="d"){
        this.setData({
          currContent: this.data.currContent.substring(0, this.data.currContent.length - 1)
        })
      }else{
        this.setData({
          currContent: this.data.currContent.concat(currvalue)
        })
      }
      this.triggerEvent("numClickEvent", this.data.currContent);
    },
    
    _closeClickEvent:function(e) {
      //关闭
      this.setData({
        isShow: !this.data.isShow,
        currContent: ""
      })
    },
  }
})
