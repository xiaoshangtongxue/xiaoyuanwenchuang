// pages/mine/mine.js
const App=getApp()
const db = wx.cloud.database();
Page({
  data: {
    openid:"",
      userInfo:null,
      _id:"",
      DeviceNumberPer:"",
    FormName:'',
    DeviceName:["待付款","待发货","待收货","待评价"],
   device:[
     {
       id:0,
       text:"待付款",
       src:"/images/daifukuan.png"
     },
     {
      id:1,
      text:"待发货",
      src:"/images/daifahuo.png"
    },
    {
      id:2,
      text:"待收货",
      src:"/images/daishouhuo.png"
    },
    {
      id:3,
      text:"待评价",
      src:"/images/daipingjia.png"
    },
    {
      id:4,
      text:"退款/售后",
      src:"/images/shouhou.png"
    }
   ],
   deviceId:'',
   name:'',
  },


  
  onLoad: function (options) {
      var that=this;
   console.log(options)
  that.setData({
    DeviceNumberPer:options.DeviceNumberPer,
  })
  
  },
  
  onShow: function () {
    var that=this;
    App.getopenid(res => {
        console.log("write cb res", res)
        that.setData({
          openid: res
      },()=>{
        console.log("openid0",res)
        db.collection("user").where({
          _openid:that.data.openid,
        }).get().then(res => {
          console.log('------------',res.data);
            if(res.data.length == 1){
              that.setData({
                userInfo: res.data[0],
              })
            }else{
              that.setData({
                userInfo: null,
              })
            }
           
            })
            .catch(err => {
               console.log("获取user数据失败",err);
            })
        
          })
      })
    
},
checkLogin(){
    if(this.data.userInfo){
        return true;
    }else{
        wx.navigateTo({
            url: '/pages/classify/login/login',
          })
          return false;
    }
},
goLogin(){
    this.checkLogin();
},
    lookInfo(){
        if(!this.checkLogin()){
            return;
        }else{
          wx.navigateTo({
            url: '/pages/classify/order/order',
          })
        }
 
    },
    
    account(){

        if(!this.checkLogin()){
            return;
        }else{
          wx.navigateTo({
            url: '/pages/classify/account/account'
          })

        }
  
    },
     // 跳转到详情页
     goToDevice(e){
    var that=this
    if(!that.checkLogin()){
        return;
    }
    console.log(e.currentTarget.id);
    that.setData({
      FormName: that.data.device[e.currentTarget.id].text
    });
   console.log("FormName", that.data.FormName);
   wx.navigateTo({
    url: '../order/order?FormName='+that.data.FormName+'&Index='+"0",
  })
   
  },
  
})
