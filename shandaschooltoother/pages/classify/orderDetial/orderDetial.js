
const db = wx.cloud.database()
const app = getApp()
Page({ 
  /**
   * 页面的初始数据
   */
  data: {
    orderFormInf: {},
    contactHotel: true,
   time:"",

  },
  
 



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
   console.log('options',options)
    that.setData({
      orderFormId: options.orderFormId
    },()=>{
       console.log("订单ID",that.data.orderFormId);
       db.collection("GoodsOrderInfo").where({
        _id:that.data.orderFormId,
      }).get()
          .then(res => {
             console.log("订单信息",res)
             that.setData({
              time: res.data[0].orderTime,
               })
               console.log("time",that.data.time)
              





          })
          .catch(err => {
             console.log("获取数据失败",err);
          })
       that.getOrderDetail(that.data.orderFormId)
    })
    that.countDown('2022-08-08 10:00:00')
  },

  
  countDown: function (endTime) {
    var that = this;
    that.setData({
      timer: setInterval(function () { //周期计时器，每隔1秒执行一次方法里的代码
        //得到一个从现在时间开始到活动结束的时间戳 
        var downTime = parseInt(new Date(endTime.replace(/-/g, "/")).getTime() - new Date().getTime())
        // 倒计时结束
        if (downTime <= 0) {
          that.setData({
            day: '00',
            hour: '00',
            minute: '00',
            second: '00'
          })
          //结束周期计时器
          clearInterval(that.data.timer);
          return;
        }
        //计算距离活动还有多少天、时、分、秒
        var d = parseInt(downTime / 1000 / 3600 / 24);
        var h = parseInt(downTime / 1000 / 3600 % 24);
        var m = parseInt(downTime / 1000 / 60 % 60);
        var s = parseInt(downTime / 1000 % 60);
        //统一格式的显示
        d < 10 ? d = '0' + d : d;
        h < 10 ? h = '0' + h : h;
        m < 10 ? m = '0' + m : m;
        s < 10 ? s = '0' + s : s;
        //同步显示
        that.setData({
          day: d,
          hour: h,
          minute: m,
          second: s
        })
      }, 1000)
    })
  },

    // 获取订单详情
 getOrderDetail(id){
  let that = this;
  db.collection("GoodsOrderInfo").doc(id).get({
    success(res){ 
     console.log("数据获取成功啦",res);
      that.setData({
        orderFormInf: res.data,
      })
    },
    fail(err){
      console.log("数据获取失败", err);
    }
  })
 },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  quxiao:function (e) {
    var that=this;
    console.log("quxiao",that.data.orderFormInf)
    wx.showModal({
        content: '是否取消订单',
        success(res) {
            console.log("quxiao",res)
          if (res.confirm) {        
            db.collection('GoodsOrderInfo').doc(that.data.orderFormId).update({
                data: {
                  orderStatus: "已取消",
                }
              })
              
              wx.redirectTo({
                url: '/pages/order/order',
              })


         } else if (res.cancel) {
         console.log('quxiao')
         }
       }
      })
    
      
  },




})


