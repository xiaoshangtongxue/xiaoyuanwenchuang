
const db = wx.cloud.database();
var that ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userInfo:null,
     nickName:"",
     phone:""
    
  },

   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
        key:"userInfo",
        success(res){
            console.log("22222222222",JSON.parse(res.data))
            that.setData({
                userInfo:JSON.parse(res.data)
            })
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
  
  getUserProfile(e){
      var that=this;
      wx.getUserProfile({
        desc: 'desc',
        success:(res)=>{
            this.setData({
                userInfo:res.userInfo,
                
            })
            console.log("------------",res.userInfo)
           
           if(res.userInfo) {
               wx.setStorage({
                   data:JSON.stringify(res.userInfo),
                   key:"userInfo",
                   success(res){
                       console.log("11111",res)
                    //    that.addUser(res.userInfo);
                   }
               })

               wx.getStorage({
                key:"userInfo",
                success(res){
                    console.log("22222222222",JSON.parse(res.data))
                    that.setData({
                        userInfo:JSON.parse(res.data)
                    })
                    console.log("333333333",that.data.userInfo),
                    db.collection('user').add({
                        data:{
                            nickName:that.data.userInfo.nickName,
                            avatarUrl:that.data.userInfo.avatarUrl,
                            phone:""
                        }
                    })
                    .then(res=>{
                        console.log("#############",res)
                        wx.navigateBack({
                          delta: 0,
                        })
                    })
                    .catch(console.error)
                }
            })
           }else{

           }
          
        }
      })
  },
 
 })