// pages/classify/addressedit/addressedit.js
const App=getApp()
const db = wx.cloud.database();
let _openid="";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:{
            id:0,
            name:'',
            mobile:'',
            city:'',
            street:'',
            isDefault:false,
            checked:false,
            _openid:'',
        },
        openid:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
         console.log(options)
         
      App.getopenid(res => {
        console.log("write cb res", res)
          _openid=res
        console.log("openid0",_openid)
          
      })
        this.setData({
            address:JSON.parse(options.address)
         })
      


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
checkAddress(){
   var address=this.data.address;
   var tipStr="";
   if(address.name.length==0){
    tipStr="请填写收货人姓名";
   }
    else if(address.mobile.length==0){
    tipStr="请填写收货人手机号";
   }
   else if(address.city.length==0){
    tipStr="请选择所在地址";
   }
   else if(address.street.length==0){
    tipStr="请填写详细地址";
   }
   if(tipStr.length==0){
    return true;
   }else{
    wx.showToast({
        icon:'none',
      title: tipStr,
    })

    return false;
   }
},

    inputName(e){
       this.data.address.name=e.detail.value;
       this.setData({
        address:this.data.address
    })
    },
    inputMobile(e){
        this.data.address.mobile=e.detail.value;

        this.setData({
         address:this.data.address
     })
    },
    inputStreet(e){
        this.data.address.street=e.detail.value;
        this.setData({
         address:this.data.address
     })
    },
    bindRegionChange(e){
        var city=e.detail.value;
        this.data.address.city=city.join(" ");
        this.setData({
         address:this.data.address
     })
    },
    clickDefault(){
      if(this.data.address.isDefault){
          this.data.address.isDefault=false;
      }else{
        this.data.address.isDefault=true;
      }
        
        this.setData({
         address:this.data.address
     })
    },
    clickAdd(){
        var that = this;
       if(!this.checkAddress()){
           return
       }else{
        var info= phoneFun(that.data.address.mobile)
        if(info == true){
            
        db.collection('addressList').where({
            _openid:_openid,
        }).get()
     .then(res=>{

        var addressList=res.data[0].address;
     //    wx.getStorageSync('addressList');
        var address=this.data.address;
        var isAdd=false;
        var addressListNew=[];
        var indexDefault=-1;
        var indexCurrent=-1;
        if(address.id==0){
            isAdd=true;
            address.id=Math.floor(Math.random()*1000+1);
            if(addressList){
             addressList.forEach(function(v,index){
                 if(v.isDefault){
                     indexDefault=index;
                 }
                 if(address.isDefault){
                     v.isDefault=false;
                 }
 
             })
 
            }
           addressListNew=[address,...addressList];
            indexCurrent=0;
        }else{
         addressList.forEach(function(v,index){
             if(v.isDefault){
                 indexDefault=index;
             }
             if(address.isDefault){
                 v.isDefault=false;
             }
             if(address.id==v.id){
                 v.name=address.name;
                 v.mobile=address.mobile;
                 v.city=address.city;
                 v.street=address.street;
                 v.isDefault=address.isDefault;
                 indexCurrent=index;
             }
         })
         addressListNew=addressList;
        }
        if(indexDefault==-1){
            addressListNew[indexCurrent].isDefault=true;
        }else{
            if(indexDefault==indexCurrent && !isAdd){
             addressListNew[indexCurrent].isDefault=true;
            }
        }
        db.collection('addressList').where({
         _openid:_openid
     }).update({
         data:{
             address:addressListNew
         }
     })
     .then(res=>{
          console.log(res)
     })
     .catch(console.error)
 })
 .catch(res=>{
    console.log('---------------',res)
     this.data.address.isDefault=true;
     this.setData({
         address:this.data.address
     })
     var address=this.data.address;
      var addressList=address;
     var addressListNew=[];
     addressListNew=[addressList]
     console.log("7777777777",addressListNew)
     db.collection('addressList').add({
         data:{
             address:addressListNew
         }
     })
     .then(res=>{
          console.log(res)
     })
     .catch(console.error)
 })
         wx.showToast({
           icon:'success',
             title: '保存成功！',
           success(){

          wx.switchTab({
            url:'/pages/classify/mine/mine',
          })
           }
         })


        }else{

        }


       }

    },

})

function phoneFun(phones){
	var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
	if (!myreg.test(phones)) {
        wx.showToast({
            icon:'none',
          title: '手机号不正确',
        })
		console.log('手机号格式不正确')
	  return false;
	} else {
		console.log('手机号格式正确')
	  return true;
	}
}
