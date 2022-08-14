const db = wx.cloud.database();
const App=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

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
    personal(){
        wx.navigateTo({
            url: '/pages/classify/personal/personal'
          })
    },
    address(){
        wx.navigateTo({
            url: '/pages/classify/address/address'
          })
    },
    logout(){
        var that=this;
    App.getopenid(res => {
        console.log("write cb res", res)
        that.setData({
          openid: res
      },()=>{
        console.log("openid0",res)
  
        wx.showModal({
            title: '提示',
            content: '您确定要退出登录吗',
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                console.log('用户点击确定')
                db.collection("user").where({
                  _openid:that.data.openid,
                }).remove()
                wx.setStorageSync('token', '');//将token置空
               wx.switchTab({
                 url: '/pages/classify/mine/mine',
               })
              } else {//这里是点击了取消以后
                console.log('用户点击取消')
              }
            }
          })


        
          })
      })
        
       
      },
    
})