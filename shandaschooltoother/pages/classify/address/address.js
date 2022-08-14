const db = wx.cloud.database();
const App=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
          addressList:[],
          openid:"",
          noaddresslistshow:false
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
            db.collection('addressList').where({
                _openid:that.data.openid
            }).get()
         .then(res=>{
            console.log('************',res);
       if(res.data.length >0){
        var addressList=res.data[0].address
        var address=null;
        if(addressList&&addressList.length>0){
            addressList.forEach(function(v,index){
                if(v.isDefault){
                    address=addressList.splice(index,1)[0];
                }
            })
     this.setData({
         addressList:[address,...addressList]
     })    
     console.log('************',that.data.addressList);

        }else{
         this.setData({
             addressList:[],
             noaddresslistshow:true
         })
        }
       }else{
       }
    })
    .catch(console.error)
          })})
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
    clickDefault(e){
        var that = this;
    var index=e.currentTarget.dataset.index;
    this.data.addressList.forEach(function(v){
        v.isDefault=false;
    })
    this.data.addressList[index].isDefault=true;
    var address=this.data.addressList.splice(index,1)[0];
    this.data.addressList=[address,...this.data.addressList];
    
    this.setData({
                 addressList:this.data.addressList
             })
         
             db.collection('addressList').where({
                _openid:'_openid'
            }).update({
                data:{
                   address:that.data.addressList
                }          
            })
         .then(res=>{
              console.log(res) 
            })
            .catch(console.error)
    },
    clickDelete(e){
    var that = this ;
        wx.showModal({
            title: '提示',
            content: '您确定要删除吗',
            success (res) {
              if (res.confirm) {
                var index=e.currentTarget.dataset.index; 
                console.log('----',index);
                console.log(that.data.addressList);
                that.data.addressList.splice(index,1);
                     that.setData({
                           addressList:that.data.addressList
                       })
                  console.log("6666666666666",that.data.addressList) 
                       db.collection('addressList').where({
                          _openid:'_openid'
                      }).update({
                          data:{
                             address:that.data.addressList
                          }          
                      })
                   .then(res=>{
                        console.log(res) 
                      })
                      .catch(console.error)
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

    },
    clickEdit(e){
    var index=e.currentTarget.dataset.index; 
    var address=this.data.addressList[index];
    wx.navigateTo({
      url: '/pages/classify/addressedit/addressedit?address='+JSON.stringify(address),
    })
    },
    clickAdd(e){
wx.navigateTo({
      url: '/pages/classify/addressedit/addressedit',
    })
    },
    
    
    
})