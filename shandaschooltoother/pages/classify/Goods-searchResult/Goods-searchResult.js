const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    resultList:[],
    resultListlength:0,
    resultListShow:true,
    noResultListShow:false,
    satatus:'',
    keyWord:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    var that = this;
    var keyWord=options.keyWord

    // 设置商品列表高度
   that.setData({
    keyWord:keyWord
   },()=>{
     that.GoodsProductList()
   })
  },
  GoodsProductList(){
    let that = this;
    let len=that.data.resultList.length
    console.log('-----------------------',that.data.keyWord);
    db.collection('GoodsList').where(_.or([{
      GoodsName: db.RegExp({
        regexp: '.*' + that.data.keyWord,
        options: 'i',
      }),
      isxiajia:false,
    },
  ])).orderBy('Time','desc')
  .skip(len) //从第几个数据开始
  .get().then(res=>{

    if (res.data.length<=0) {
      console.log("请求成功9", res.data.length)
      wx.showToast({
        icon:'none',
        title:"没有更多数据啦"
      })
      console.log("没有更多数据啦",)
    } 
     var resultListlength=that.data.resultListlength
      that.setData({
        resultListlength:resultListlength+res.data.length,
        resultList: that.data.resultList.concat(res.data), //获取数据数组    
      },()=>{
        if(that.data.resultListlength==0){
          that.setData({
            resultListShow:false,
            noResultListShow:true
          })
        }
      });
  }).catch(res=>{
    console.log("请求失败", res)
  })
},
/* onPageScroll: function (e) {//监听页面滚动
  this.setData({
    scrollTop: e.scrollTop
  })
}, */
  //页面上拉触底事件的处理函数
  onReachBottom: function() {
    console.log("执行",)
    var that=this
    that.GoodsProductList()

  },
  searchDetail:function (){
    wx.navigateTo({
      url: '/pages/classify/Goods-search/Goods-search',
    })
  },

  // 进详情页之前检测是否已售
// isBuy(id,success){
//   var that=this
//   db.collection("wxGoodsPost").doc(id).get().then(res=>{
//     console.log("请求成功8", res.data) 
//     that.setData({
//       satatus:res.data.status
//     })
//       success()
// }).catch(res=>{
//     console.log("请求失败", res)
// })
// },
  // toGoodsDetail(e) {
  //   var that=this
  //   var id = e.currentTarget.dataset.id;
  //   console.log('id', id);
  //         wx.navigateTo({
  //           url: '/pages/classify/GoodsDetail/GoodsDetail?id=' + id, 
  //         })
   
  // },
  onPageScroll: function (e) {//监听页面滚动
    this.setData({
      indexSearch: e.scrollTop
    })
  },
/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that=this
    wx.setNavigationBarTitle({
      title: '物品详情'
    });
    console.log('zhixing')
   that.setData({
    resultList:[],
    resultListlength:0,
    resultListShow:true,
    noResultListShow:false,
    satatus:''
   }) 
    that.GoodsProductList()
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    setTimeout(function () {
      wx.stopPullDownRefresh(); //停止加载
      wx.hideNavigationBarLoading(); //隐藏加载icon
    }, 2000)
  },


  addClick(e){
    console.log(123);
    var id = e.currentTarget.dataset.id;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'clickNum',
      // 传给云函数的参数
      data: {
       id:id,
       Num:1
      },
      success: function (res) {
        console.log('更新成功************',res)

      },
      fail: function (err) {
        console.log(err)
      },
    })
  },
  addClickchengzi(e){
    console.log('chengzi');
    var id = e.currentTarget.dataset.id;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'clickNum',
      // 传给云函数的参数
      data: {
       id:id,
       Num:1
      },
      success: function (res) {
        console.log('更新成功************',res)
        wx.navigateToMiniProgram({
          appId: 'wxf7cfe80159baf47b',  //appid
          path: '/pages/shop/shop',//path
          extraData: {  //参数
            foo: 'bar'
          },
          envVersion: 'release', //开发版develop 开发版 trial   体验版 release 正式版 
          success(res) {
            console.log('跳转成功',res)
            // 打开成功
          }
        })

      },
      fail: function (err) {
        console.log(err)
      },
    })
    
  },
  addClickdingxiang(e){
    console.log('dingxiang');
    var id = e.currentTarget.dataset.id;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'clickNum',
      // 传给云函数的参数
      data: {
       id:id,
       Num:1
      },
      success: function (res) {
        console.log('更新成功************',res)
        wx.navigateToMiniProgram({
          appId: 'wxf7cfe80159baf47b',  //appid
          path: '/pages/shop/shop',//path
          extraData: {  //参数
            foo: 'bar'
          },
          envVersion: 'release', //开发版develop 开发版 trial   体验版 release 正式版 
          success(res) {
            console.log('跳转成功',res)
            // 打开成功
          }
        })

      },
      fail: function (err) {
        console.log(err)
      },
    })
  },
  addClicklingde(e){
      console.log('lingde');
      var id = e.currentTarget.dataset.id;
      wx.cloud.callFunction({
        // 云函数名称
        name: 'clickNum',
        // 传给云函数的参数
        data: {
         id:id,
         Num:1
        },
        success: function (res) {
          console.log('更新成功************',res)
          wx.navigateToMiniProgram({
            appId: 'wxf7cfe80159baf47b',  //appid
            path: '/pages/shop/shop',//path
            extraData: {  //参数
              foo: 'bar'
            },
            envVersion: 'release', //开发版develop 开发版 trial   体验版 release 正式版 
            success(res) {
              console.log('跳转成功',res)
              // 打开成功
            }
          })
  
        },
        fail: function (err) {
          console.log(err)
        },
      })
  },
});
