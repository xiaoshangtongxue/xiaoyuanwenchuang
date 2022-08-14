// pages/shouye/shouye.js
// 此处的变量时search功能所需的
const db = wx.cloud.database()
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */

  data: {
    // 首页的轮播图
    imgUrls: [],
    msgList:[],
    //背景颜色 */
    pageBackgroundColor: 'transparent',
    currtab: 0,
    swipertab: [{ name: '推荐好物', index: 0 }, { name: '热卖', index: 1 }],
    resultList:[],
    resultListlength:0,
    clothingshow:true,
    noclothingshow:false,
    jinianwuList:[],
    jinianwuListlength:0,
    jinianwuShow:true,
    hotsalenoclothingshow:false,
    satatus:'',
    newlist:[],
    newlistlength:0,
    newshow:true,
    wenjulist:[],
    wenjulength:0,
 
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.swiper()
    that.newshow()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
  },
    getDeviceInfo: function () {
    let that = this
   wx.getSystemInfo({
       success: function (res) {
      console.log('高度', res)
        that.setData({
          deviceW: res.windowWidth-20,
          deviceH: res.windowHeight-20
      })
  }
})
},
  // 获取轮播图
  swiper(){
    var  that=this
    db.collection('swiper').get({
      success: function (res) {
          console.log('轮播图获取成功',res)
          that.setData({
            imgUrls: res.data,
          })
          console.log('imgUrls',that.data.imgUrls)
      },
      fail: function (res) {
          console.log('轮播图获取失败', res)
      }
  })
  },

    //页面上拉触底事件的处理函数
  onReachBottom: function() {
    console.log("执行",)
    var that=this
    if(that.data.currtab==0){

      that.newshow()
    }else if(that.data.currtab==1){
   
      that.wenjushow()
    }else if(that.data.currtab==2){
 
      that.clothshow()
    }else if(that.data.currtab==3){

      that.jinianwushow()
    }
  },

  /**
  * @Explain：选项卡点击切换
  */
 tabSwitch: function (e) {
  var that = this
  console.log('current1',e.target.dataset.current)
  if (that.data.currtab === e.target.dataset.current) {
    return false
  } else {
    that.setData({
      currtab: e.target.dataset.current
    })
  }
},

onChange: function (e) {
    console.log('current',e.detail.name)
    this.setData({
     currtab: e.detail.name,
       resultList:[],
      resultListlength:0,
      clothingshow:true,
      noclothingshow:false,
      hotsaleList:[],
      jinianwuListlength:0,
      jinianwuShow:true,
      hotsalenoclothingshow:false,
      })
    this.orderShow()
  },
    orderShow: function () {
      let that = this
      switch (that.data.currtab) {
        case 0:
          that.setData({
            newlist:[]
          })
          that.newshow()
          break
        case 1:
          that.setData({
            wenjulist:[]
          })
          that.wenjushow()
          break
          case 2:
            that.setData({
              resultList:[]
            })
            that.clothshow()
            break
            case 3:
              that.setData({
                jinianwuList:[]
              })
              that.jinianwushow()
              break
      }
    },
//  新品
newshow(){

  let that = this;
  var tem = null
  let len=that.data.newlist.length

  db.collection('GoodsList').where({
    isnewfood:true,
  }).skip(len).orderBy('Time','desc').get().then(res=>{
  if (res.data.length<=0) {
    wx.showToast({
      icon:'none',
      title:"没有更多内容啦"
    })
  }else{
      var newlistlength=that.data.newlistlength
      var list = that.data.newlist.concat(res.data);
      for(var i = 0; i <list.length - 1; i++){
        for(var j = 0; j <list.length - 1 - i; j++ ){
           if(list[j].clickNum < list[j+1].clickNum){
               tem = list[j];
               list[j] = list[j+1];
               list[j+1] = tem;
           }
        }
      }
      that.setData({
        newlistlength:newlistlength+res.data.length,
        newlist: list, //获取数据数组    
      },()=>{
    
 
      });
    

  }
 
}).catch(res=>{
  console.log("请求失败", res)
})
},

//  文具
wenjushow(){
  let that = this;
  let len=that.data.wenjulist.length
  var tem = null
  db.collection('GoodsList').where({
    iswenju:true,
 
  }).skip(len).orderBy('Time','desc').get().then(res=>{
  if (res.data.length<=0) {
    wx.showToast({
      icon:'none',
      title:"没有更多内容啦"
    })
  }else{

      var wenjulistlength=that.data.wenjulistlength
      var list = that.data.wenjulist.concat(res.data);
      for(var i = 0; i <list.length - 1; i++){
        for(var j = 0; j <list.length - 1 - i; j++ ){
           if(list[j].clickNum < list[j+1].clickNum){
               tem = list[j];
               list[j] = list[j+1];
               list[j+1] = tem;
           }
        }
      }
      that.setData({
        wenjulistlength:wenjulistlength+res.data.length,
        wenjulist: list, //获取数据数组    
      },()=>{
    
 
      });
 
  
   

  }
 
}).catch(res=>{
  console.log("请求失败", res)
})
},



    clothshow(){
      let that = this;
      let len=that.data.resultList.length
      var tem =null
      db.collection('GoodsList').where({
        isyifu:true,

      }).skip(len).orderBy('Time','desc').get().then(res=>{
      if (res.data.length<=0) {
        wx.showToast({
          icon:'none',
          title:"没有更多内容啦"
        })
      }else{

          var resultListlength=that.data.resultListlength
          var list = that.data.resultList.concat(res.data);
          for(var i = 0; i <list.length - 1; i++){
            for(var j = 0; j <list.length - 1 - i; j++ ){
               if(list[j].clickNum < list[j+1].clickNum){
                   tem = list[j];
                   list[j] = list[j+1];
                   list[j+1] = tem;
               }
            }
          }
          that.setData({
            resultListlength:resultListlength+res.data.length,
            resultList: list, //获取数据数组    
          },()=>{
        
     
          });
    
    
       
  
      }
     
    }).catch(res=>{
      console.log("请求失败", res)
    })
    },


    jinianwushow(){
      let that = this;
      let len=that.data.jinianwuList.length
      var tem = null
      db.collection('GoodsList').where({
        isjinianwu:true,

      }).orderBy('Time','desc')
    .skip(len) //从第几个数据开始
    .get().then(res=>{
      console.log('----',res.data);
      if (res.data.length<=0) {
        wx.showToast({
          icon:'none',
          title:"没有更多内容啦"
        })
      }else{
   
          var jinianwuListlength=that.data.jinianwuListlength
          var list = that.data.jinianwuList.concat(res.data);
          for(var i = 0; i <list.length - 1; i++){
            for(var j = 0; j <list.length - 1 - i; j++ ){
               if(list[j].clickNum < list[j+1].clickNum){
                   tem = list[j];
                   list[j] = list[j+1];
                   list[j+1] = tem;
               }
            }
          }
          that.setData({
            jinianwuListlength:jinianwuListlength+res.data.length,
            jinianwuList: list, //获取数据数组    
          },()=>{
        
     
          });
    
      
    
      }
    

    }).catch(res=>{
      console.log("请求失败", res)
    })
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
    wx.setNavigationBarTitle({
      title: '山大校庆文创店'
    });
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    setTimeout(function () {
      wx.stopPullDownRefresh(); //停止加载
      wx.hideNavigationBarLoading(); //隐藏加载icon
    }, 2000)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //搜索功能
  bindSearchGoods() {
    wx.navigateTo({
      url: '../classify/Goods-search/Goods-search',
    })
  },
  //跳转到橙子店小程序
  tochengzi(){
     var that = this;
     console.log('--------------------');
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
  todingxiang(){
    var that = this;
    console.log('--------------------');
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

 tolingde(){
  var that = this;
  console.log('--------------------');
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
addClick(e){
  console.log(123);
  var id = e.currentTarget.dataset.id;
  console.log('----',id);
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

})

