Page({
    data: {
        array: ['美国', '中国', '巴西', '日本'],
        index: 0,
        
        objectMultiArray: [
          [
            {
              id: 0,
              name: '无脊柱动物'
            },
            {
              id: 1,
              name: '脊柱动物'
            }
          ], [
            {
              id: 0,
              name: '扁性动物'
            },
            {
              id: 1,
              name: '线形动物'
            },
            {
              id: 2,
              name: '环节动物'
            },
            {
              id: 3,
              name: '软体动物'
            },
            {
              id: 4,
              name: '节肢动物'
            }
          ]
        ],
        multiObjIndex:[0,0],
        date: '2016-09-01',
        time: '12:01'
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindMultiPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        multiIndex: e.detail.value
      })
    },
    bindMultiPickerColumnChange: function (e) {
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      var data = {
        objectMultiArray: this.data.objectMultiArray,
        multiObjIndex: this.data.multiObjIndex
      };
      data.multiObjIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          switch (data.multiObjIndex[0]) {
            case 0:
              data.objectMultiArray[1] = [{ id: 0, name: '扁性动物' }, 
                { id: 1, name: '线形动物' }, 
                { id: 2, name: '环节动物' }, 
                { id: 3, name: '软体动物' }, 
                { id: 4, name:'节肢动物'}];
              break;
            case 1:
              data.objectMultiArray[1] = [{ id: 0, name: '鱼' }, { id: 1, name: '两栖动物' }, { id: 2, name:'爬行动物'}];
              break;
          }
          data.multiObjIndex[1] = 0;
          console.log(data.multiObjIndex);
          break;
      }
      this.setData(data);
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function(e) {
        this.setData({
            time: e.detail.value
        })
    }
});