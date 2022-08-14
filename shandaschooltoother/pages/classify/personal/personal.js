// pages/personal/personal.js
const App=getApp()
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:"",
        phone:"",
        openid:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        var that=this;
        App.getopenid(res => {
            console.log("write cb res", res)
            that.setData({
              openid: res
          },()=>{
            console.log("openid0",res)
            db.collection("user").where({
              _openid:that.data.openid,
            }).get()
                .then(res => {
                   console.log("用户信息",res)
                   that.setData({
                    userInfo: res.data[0],
                    phone:res.data[0].phone
                  })
                })
                .catch(err => {
                   console.log("获取user数据失败",err);
                })
            
              })
          })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    
    getPhoneNumber(e) {
        var that = this;
        wx.cloud.callFunction({
          name: 'phone',
          data: {
            weRunData: wx.cloud.CloudID(e.detail.cloudID),
          }
        }).then(res => {
          that.setData({
            mobile: res.result,
          })
          db.collection('user').where({
            _openid:that.data.openid,
          }).update({
            data:{
                phone:res.result
            }
        })
        .then(res=>{
             that.onShow()
        })
        .catch(console.error)
      
      
        }).catch(err => {
      
        //   console.error(err);
      
        });
       
      
      },
    
})