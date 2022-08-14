// pages/settlement/settlement.js
const db = wx.cloud.database()
const App = getApp()

import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    address:'请先添加收获地址或者选择默认地址',
    adressshow:false,
    adresslist:{},
    GoodsCartArrId:[],
    orders:[],
    length:0,
    totalPrice:0,
    orderCode:'',
    _id:'',
    cartsId:[],
    Number:'0',
    item:'微信支付',
    orderNo:'',
    BuyTime:'',
    BuyTimeStamp:'',
    integral:1,
    buyNum:1,
    listNum:[],
    type:0,
    carts:[],
    newOrders:[],
    gzopenid:[],
    buyname:'',
    buyphone:'',
    buycity:'',
    buystreet:''
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    App.getopenid(res => {
      console.log("write cb res", res)
      that.setData({
        openid: res
      })
   
    })
    that.getadress();
    var GoodsCartArrId=JSON.parse(options.GoodsCartId)
    var length=GoodsCartArrId.length
      that.setData({
        GoodsCartArrId:GoodsCartArrId,
        type:Number(options.type)
      },()=>{
        if(that.data.type == 0){
          that.getGoodsCartList1()
        }else{
          that.getGoodsCartList()
        }
 
      })
      var len = wx.getStorageSync('goodslen');
      that.setData({
        buyNum:len,
      })
 
  },
  //地址信息
  _handleInputName: function (e) {
    console.log("姓名", e)
    this.setData({
      address: e.detail.value
    })

  },
  //手机信息
 
  // 获取购物车物品详情
  getGoodsCartList(){
    console.log(1);
    var that = this;
    db.collection('cart').where({
      _openid:that.data.openid
    }).get({
    success: function (res) { 
        console.log('*************',res.data[0].myCart);
        that.setData({
          carts:res.data[0].myCart
        })
        res.data[0].myCart.forEach(item => {

                 if(item.selected == true){
                  that.setData({
                    orders: that.data.orders.concat(item),
                    totalPrice:that.data.totalPrice + (Number(item.GoodsPrice) * Number(item.buyLen))
                  })
            
                 }
              
        })
        that.setData({
          totalPrice:that.data.totalPrice.toFixed(2)
        })
      
    }})
   
 
  },
// 获取物品详情
  getGoodsCartList1(){
      console.log(1);
      var that = this;
      for(var i=0;i<that.data.GoodsCartArrId.length;i++){
        console.log('GoodsCartArrId', that.data.GoodsCartArrId[i]);
        db.collection('GoodsList').doc(that.data.GoodsCartArrId[i]).get({
          success: function (res) {
              var orders=res.data
              orders.GoodsPrice=orders.GoodsPrice.toFixed(2)
              orders.buyLen =that.data.buyNum;
               that.setData({
                orders: that.data.orders.concat(orders),
                totalPrice:(that.data.totalPrice+orders.GoodsPrice*orders.buyLen).toFixed(2)
                // totalPrice:(Number(orders.buyLen) * Number(orders.GoodsPrice)).toFixed(2)
              })
        
          },
          fail: function (res) {
              console.log('获取失败', res)
          }
       })
      }
    },
  // 支付订单号
  createOrderCode() {
    let orderCode = '';
    for (var i = 0; i < 6; i++) {
      orderCode += Math.floor(Math.random() * 10);
    }
    orderCode = new Date().getTime() + orderCode;
    this.setData({
      orderCode: orderCode
    });
  },
  // 订单编号
  orderNo(complete){
    var that=this
    let orderNo = '';
    for (var i = 0; i < 6; i++) {
      orderNo += Math.floor(Math.random() * 10);
    }
    console.log('orderNo')
    orderNo = new Date().getTime() + orderNo;
    that.setData({
      orderNo: orderNo
    });
    if(complete){
      complete()
    }
  },
  toaddress(){
 wx.reLaunch({
   url: '/pages/classify/address/address',
 })

  },
   // 提交订单
   tosubmit(){
    var that=this; 
    Dialog.confirm({
      title: '确认付款',
      message: '您确认要付款了吗？',
    })
      .then(() => {     
        that.checkNum();

        for(var i = 0; i < that.data.orders.length;i++){
          if(that.data.orders[i].GoodsNum == 0 || that.data.orders[i].GoodsNum < that.data.orders[i].buyLen){
            var k = i + 1; 
            // Dialog.alert({
            //   title: '库存不足',
            //   message: '商品'+ k +'库存不足',
            //   theme: 'round-button',
            // }).then(() => {
            // });
            wx.showToast({
              title: '商品'+ k +'库存余'+that.data.orders[i].GoodsNum,
              icon: 'error',
              duration: 1500
            })
            return
          }
    
        }
        // var value = that.data.listNum.forEach(function(item){
        // })
        if(that.data.address == '请先添加收获地址'){
          wx.showToast({
            title: '请填写地址信息',
            icon: 'none',
            duration: 1500
          })
          return;
        }else{
    
        that.createOrderCode();
        console.log("that.data.orderCode",that.data.orderCode);
        //提交订单验证商品数量
        wx.showToast({
          title: '支付中...',
          icon: 'loading',
          duration:2000
        }).then(res => {
          setTimeout(function(){
              console.log('***********',that.data.totalPrice);
              console.log('***********',that.data.orderCode);
            wx.cloud.callFunction({
              name: 'payment',
              data: {
                orderCode: that.data.orderCode,
                price: that.data.totalPrice,
                desc: '山大官方文创店',
              },
              success: res => {
                const payment = res.result.payment
                  //  调起支付
                    wx.requestPayment({
                        ...payment,
                    success(res) {
                      wx.showToast({
                        title: '正在生成订单..',
                        icon: 'loading',
                        duration:2000
                      }).then(res => {
                        setTimeout(function(){

                          if(that.data.type==1){
                            for(var i =0 ;i<that.data.orders.length;i++){
                              console.log('3333333333333333333333333333333',that.data.orders[i]._id,that.data.orders[i].buyLen);
                              console.log('更数据成功----------------------',that.data.orders[i]._id,that.data.orders[i].buyLen)
                              that.modOrderStatus(that.data.orders[i]._id,-that.data.orders[i].buyLen,that.data.orders[i].buyLen)
                            }
                            that.myGoodsCart(()=>{
                              // 支付成功后更新到数据库信息
                              for(var i=0;i<that.data.orders.length;i++){
                                that.orderNo(()=>{
                                  var  BuyTime=formatDate2(new Date().getTime());
                                  var  BuyTimeStamp=new Date().getTime();
                                  console.log('id',that.data.orders[i]._id)
                                  that.setData({
                                    BuyTime:BuyTime,
                                    BuyTimeStamp:BuyTimeStamp,
                                  })
                                    var length=that.data.orders.length-1
                                    var Id=that.data.orders[i]._id
  
                                    if(i==length){
                                      console.log('id11',Id)
                                     that.modorderNo1(Id,that.data.orderCode,'山西大学',that.data.adresslist.name,that.data.adresslist.mobile,that.data.orderNo,that.data.BuyTime,that.data.BuyTimeStamp,()=>{
                                      // 支付成功后删除购物车数据库信息
                                      var carts = that.data.carts;
                                      var cartsModor = []
                                      carts.forEach(item => {
                                           if(item.selected == false){
                                              cartsModor.push(item)
                                           }
                                      })
  
                                    console.log("************66666666666",cartsModor) 
                                    console.log('that.data._id777777777777777',that.data._id) 
                                    that.updateCart(that.data._id,cartsModor)
                                  })
                                    }else{
                                      that.modorderNo(Id,that.data.orderCode,'山西大学',that.data.adresslist.name,that.data.adresslist.mobile,that.data.orderNo,that.data.BuyTime,that.data.BuyTimeStamp)
                                    }
                                })
                               }
            
                            }) 
                          }else{
                            for(var i =0 ;i<that.data.orders.length;i++){
                              console.log('3333333333333333333333333333333',that.data.orders[i]._id,that.data.orders[i].buyLen);
                              console.log('更数据成功----------------------',that.data.orders[i]._id,that.data.orders[i].buyLen)
                              that.modOrderStatus(that.data.orders[i]._id,-that.data.orders[i].buyLen,that.data.orders[i].buyLen)
                            
                            that.orderNo(()=>{
                              var  BuyTime=formatDate2(new Date().getTime());
                              var BuyTimeStamp=new Date().getTime();
                              that.setData({
                                BuyTime:BuyTime,
                                BuyTimeStamp:BuyTimeStamp
                              })
                              that.modorderNo1(that.data.orders[i]._id,that.data.orderCode,'山西大学','张三','18337209665',that.data.orderNo,that.data.BuyTime,that.data.BuyTimeStamp,()=>{
                                wx.reLaunch({
                                  url: '/pages/classify/order/order',
                                })
                              })
                            })
                           
                          }
          
                        }
                      

                        },2000)})
      
                      
                       
                    },
                  fail(err) {
                      wx.showToast({
                        title: '支付失败...',
                        icon: 'loading',
                        duration:2000
                      }).then(res => {
                        setTimeout(function(){
                          if(that.data.type==1){
                            console.log('购物车')
                            wx.switchTab({
                              url: '/pages/shoppingCart/shoppingCart',
                            })   
                           }else{
                               console.log('物品详情页')
                               wx.redirectTo({
                                url: '/pages/classify/GoodsDetail/GoodsDetail?id=' + that.data.orders[0]._id
                              })
                           } 
                        },2000)
                      });

                 
                       
                  }
            })        
        
           
              },
              fail: res => {
                 console.log("支付失败-----------------------", res);
              },
            });
       
    
    
          },2000 );            
        });
     
          
    
        } 

      })
      .catch(() => {
  


      });
  
   
  
  },
  //检测库存数量
  async checkNum(){
     var that = this;
     var orders = that.data.orders;
     for(var i = 0; i < orders.length ;i++){
      let res = await db.collection('GoodsList').doc(orders[i]._id).get(
       )
       orders[i].GoodsNum = res.data.GoodsNum;
     }
     that.setData({
       orders:orders,
     })


  },
  // getNum(id){
  //   var that = this;
  //   wx.cloud.callFunction({
  //     // 云函数名称
  //     name: 'SearchGoodsNum',
  //     // 传给云函数的参数
  //     data: {
  //      id: id,
  //     },
  //     success: function (res) {
  //       console.log('获取成功',res)
  //       that.setData({
  //         GoodsNum:res.result.data.GoodsNum,
  //       })
  //       console.log(that.data.GoodsNum);
  //     },
  //     fail: function (err) {
  //       console.log(err)
  //     },
  //   })

 
  // },

  // 支付成功添加到数据库
 
  addGoodsOrderInfo(id,GoodsName,Price,allPrice,buyLen,imgArr,orderCode,address,Buynickname,Buypnone,orderNo,BuyTime,BuyTimeStamp){
    var that=this
    console.log('Time',new Date().getTime())
    console.log('time',formatDate2(new Date().getTime()))
      db.collection('GoodsOrderInfo').add({
        data: {
          Goodsid:id,
          GoodsName:GoodsName,
          GoodsPrice:Price,
          allPrice:allPrice,
          buyLen:buyLen,
          imgArr:imgArr,
          orderCode:orderCode,
          address:address,
          Buynickname:Buynickname,
          Buypnone:Buypnone,
          orderNo:orderNo,
          BuyTime:BuyTime,
          BuyTimeStamp:BuyTimeStamp,
          GoodsStatus:'待发货',
          orderStatus:'已支付'
          // GoodsName:GoodsName,
          // GoodsType:GoodsType,
          // GoodsConditions:GoodsConditions,
          // GoodsCampus:GoodsCampus,
          // GoodsPrice:GoodsPrice,
          // GoodsWay:GoodsWay,
          // GoodsRemark:GoodsRemark,
          // imgArr:imgArr,
          // videoArr:videoArr,
          // id:id,
          // nickName:nickName,
          // phoneNumber:phoneNumber,
          // postNickName:postNickName,
          // postTime:postTime,
          // orderCode:orderCode,
          // address:address,
          // orderNo:orderNo,
          // GoodsStatus:'待收货',
          // BuyTime:BuyTime,
          // BuyTimeStamp:BuyTimeStamp,
          // postOpenid:postOpenid,
          // orderStatus:'已支付'
        },
        success: rest => {
          console.log("购买成功后添加数据库成功", rest)
        //   db.collection('GoodsOrderInfo').where({
        //     id:id
        //   }).get({
        //     success: function (res) {
        //       console.log('获取数据成功123',res.data[0]) 
        //       console.log('that.data.orderCode',res.data[0].nickName) 
        //       console.log('that.data.address',res.data[0].address) 
        //       console.log('that.data.orderNo',res.data[0].GoodsWay) 
        //       console.log('that.data.orderNo',res.data[0].GoodsName) 
        //        //  买家支付成功后给卖家发消息
        //        that.SoldOut(res.data[0]._id,res.data[0]._openid,res.data[0].GoodsName,res.data[0].nickName,res.data[0].phoneNumber,res.data[0].address,'购买成功，若买家未联系您，请主动联系买家')
        //        that.alreadyBuy(res.data[0].postOpenid,res.data[0].GoodsName,res.data[0].nickName,res.data[0].phoneNumber,res.data[0].address,'联系买家将物品送达，提醒买家修改收货状态')
        //     },
        //     fail: function (res) {
        //         console.log('获取失败', res)
        //     }
        //  })
        },
        fail: err => {
          console.log("购买成功后添加数据库失败", err)
        }
      })
    },
//更新卖家数据库 订单编号 支付编号 未送达
modorderNo(id,orderCode,address,Buynickname,Buypnone,orderNo,BuyTime,BuyTimeStamp){
          var that=this
          var orders = that.data.orders;
          db.collection('gzopenid').get({
            success: function (res) {
              orders.forEach(item => {
                if(item._id == id){
                 var Price = parseFloat(item.GoodsPrice)
                 var allPrice = Price.toFixed(2)*item.buyLen;
                 that.addGoodsOrderInfo(item._id,item.GoodsName,Price,allPrice,item.buyLen,item.imgArr,orderCode,address,Buynickname,Buypnone,orderNo,BuyTime,BuyTimeStamp)
                 for(var i = 0;i<res.data[0].gzid.length;i++){    
                   wx.cloud.callFunction({
                     name: "send",
                     data: {
                       openid:res.data[0].gzid[i],
                       orderNo:orderNo,
                       allprice:allPrice.toFixed(2),       
                       buytime:BuyTime,
                   
                     }
                   }).then(res => {
                    console.log("推送消息成功*************", res)
                   }).catch(res => {
                    console.log("推送消息失败", res)
                   })  
                 }
                }
             })

            }})
        
       
  },
  //更新卖家最后一条数据数据库 订单编号 支付编号 未送达
modorderNo1(id,orderCode,address,Buynickname,Buypnone,orderNo,BuyTime,BuyTimeStamp,modorderNoSuccess){
        var that=this
        var orders = that.data.orders;
        db.collection('gzopenid').get({
          success: function (res) {
            console.log('***************',res.data[0].gzid);
            orders.forEach(item => {
              if(item._id == id){
               var Price = parseFloat(item.GoodsPrice)
               var allPrice = Price.toFixed(2)*item.buyLen;
               that.addGoodsOrderInfo(item._id,item.GoodsName,Price,allPrice,item.buyLen,item.imgArr,orderCode,address,Buynickname,Buypnone,orderNo,BuyTime,BuyTimeStamp)
               for(var i = 0;i<res.data[0].gzid.length;i++){
                 wx.cloud.callFunction({
                   name: "send",
                   data: {
                     openid:res.data[0].gzid[i],
                     orderNo:orderNo,
                     allprice:allPrice.toFixed(2),
                     buytime:BuyTime,
                 
                   }
                 }).then(res => {
                  console.log("推送消息成功*************", res)
                 }).catch(res => {
                  console.log("推送消息失败", res)
                 })  
               }
               
               
           
              }
           })
           modorderNoSuccess()
             
          }})
    

  
},
  //修改订单状态
 modOrderStatus(id,Num,saleNum){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'modOrderStatus',
      // 传给云函数的参数
      data: {
       id:id,
       Num:Num,
       saleNum:saleNum
      },
      success: function (res) {
        console.log('更新成功************',res)

      },
      fail: function (err) {
        console.log(err)
      },
    })
  },
  //获取购物车物品数量
myGoodsCart(complete){
  var that=this
  db.collection('cart').where({
    _openid: that.data.openid
  }).get({
    success: function (res) {
        console.log('获取购物车数据',res)
          that.setData({
            _id: res.data[0]._id,
            cartsId: res.data[0].myCart,
          })
          console.log('cartsId',that.data.cartsId)
        
        if(complete){
          complete()
        }
    },
    fail: function (res) {
        console.log('获取失败', res)
    }
})
},
// 支付成功后更新购物车物品数量
updateCart(_id,addTableData){
  var that = this;
  db.collection('cart').doc(_id).update({
   data:{
    myCart:addTableData
   }
  }).then(res => {
    console.log('修改更新库存成功', res)
    that.myGoodsCart(()=>{
      if(that.data.cartsId.length==0){
        that.removeCollect(_id)
        wx.reLaunch({
          url: '/pages/classify/order/order',
        })
      }else{
        wx.reLaunch({
          url: '/pages/classify/order/order',
        })
      }
    })
  }).catch(err=>{
    console.log('修改更新库存失败',err)
  })
},
// 如果购物车id下的数据为0时删除数据库数据
removeCollect(id){
  db.collection('cart').doc(id).remove()
  console.log('删除成功')
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
getadress(){
  var that = this;
  console.log('-----------',that.data.openid);
  db.collection('addressList').where({
    _openid:that.data.openid,
  }).get({
  success: function (res) { 
          if(res.data.length>0){
            if(res.data[0].address.length>0){
                   res.data[0].address.forEach(function(item){
                 
                        if(item.isDefault == true){
                         that.setData({
                          adressshow:true,
                          adresslist:item,
                         })
                        }else{
                          that.setData({
                            adressshow:false
                          })
                        }
                   })
            }else{
              that.setData({
                adressshow:false
              })
            }

          }else{
            that.setData({
              adressshow:false
            })
          }
  }})
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

})
function formatDate2(time){
  var date = new Date(time);

  var year = date.getFullYear(),
      month = date.getMonth()+1,//月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
  var newTime = year + '-' +
      (month < 10? '0' + month : month) + '-' +
      (day < 10? '0' + day : day) + ' ' +
      (hour < 10? '0' + hour : hour) + ':' +
      (min < 10? '0' + min : min) + ':' +
      (sec < 10? '0' + sec : sec);

  return newTime;
};