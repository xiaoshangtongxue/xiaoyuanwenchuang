const db = wx.cloud.database()


Page({
  data: {
    currentTab: 0,  //对应样式变化
    scrollTop:0,  //用作跳转后右侧视图回到顶部
    screenArray:[], //左侧导航栏内容
    screenType:0,  //后台查询需要的字段
    resultList:[], //右侧内容
    imgUrls:[],//轮播图
    curNav: 0,
    flag:true,
    show: false,
    activeKey: 0,
    option1: [
      { text: '综合', value: 0 },
      { text: '新品', value: 1 },

    ],
    option2: [
      { text: '价格', value: 2 },
      { text: '价格升序', value: 3 },
      { text: '价格降序', value: 4 },
    ],
    option3: [
      { text: '销量', value: 5 },
      { text: '销量升序', value: 6 },
      { text: '销量降序', value: 7 },
    ],
    value1: 1,
    value2: 2,
    value3:5,
    resultList:[],
    info:0,
  },
  //筛选
  onshaixuan(event){
    var that = this;
    var index = event.detail;
    var listdata = that.data.resultList;
    switch(that.data.info){
      case 0:
        if(index == 0){
          that.setData({
            resultList:[],
            value2: 2,
            value3:5,
          })
          that.allList(0)
        }else if(index == 1){
          that.setData({
            resultList:[],
            value2: 2,
            value3:5,
          })
          that.allList(1)
        }else if(index == 3){
          that.setData({
            resultList:[],
            value1: 0,
            value3:5,
          })
          that.allList(3)
        }else if(index == 4){
          that.setData({
            resultList:[],
            value1: 0,
            value3:5,
          })
          that.allList(4)
        }else if(index == 6){
          that.setData({
            resultList:[],
            value1: 0,
            value2: 2,
          })
          that.allList(6)
        }else if(index == 7){
          that.setData({
            resultList:[],
            value1: 0,
            value2: 2,
          })
          that.allList(7)
        } 
        break
      case 1:
        if(index == 0){
          that.setData({
            resultList:[],
            value2: 2,
            value3:5,
          })
          that.otherList(true,false,false,0);
        }else if(index == 1){
          that.setData({
            resultList:[],
            value2: 2,
            value3:5,
          })
          that.otherList(true,false,false,1);
        }else if(index == 3){
          that.setData({
            resultList:[],
            value1: 0,
            value3:5,
          })
          that.otherList(true,false,false,3);
        }else if(index == 4){
          that.setData({
            resultList:[],
            value1: 0,
            value3:5,
          })
          that.otherList(true,false,false,4);
        }else if(index == 6){
          that.setData({
            resultList:[],
            value1: 0,
            value2: 2,
          })
          that.otherList(true,false,false,6);
        }else if(index == 7){
          that.setData({
            resultList:[],
            value1: 0,
            value2: 2,
          })
          that.otherList(true,false,false,7);
        } 
        break
      case 2:
        if(index == 0){
          that.setData({
            resultList:[],
            value2: 2,
            value3:5,
          })
          that.otherList(false,true,false,0);
        }else if(index == 1){
          that.setData({
            resultList:[],
            value2: 2,
            value3:5,
          })
          that.otherList(false,true,false,1);
        }else if(index == 3){
          that.setData({
            resultList:[],
            value1: 0,
            value3:5,
          })
          that.otherList(false,true,false,3);
        }else if(index == 4){
          that.setData({
            resultList:[],
            value1: 0,
            value3:5,
          })
          that.otherList(false,true,false,4);
        }else if(index == 6){
          that.setData({
            resultList:[],
            value1: 0,
            value2: 2,
          })
          that.otherList(false,true,false,6);
        }else if(index == 7){
          that.setData({
            resultList:[],
            value1: 0,
            value2: 2,
          })
          that.otherList(false,true,false,7);
        } 
         break
      case 3:
        if(index == 0){
          that.setData({
            resultList:[],
            value2: 2,
            value3:5,
          })
          that.otherList(false,false,true,0);
        }else if(index == 1){
          that.setData({
            resultList:[],
            value2: 2,
            value3:5,
          })
          that.otherList(false,false,true,1);
        }else if(index == 3){
          that.setData({
            resultList:[],
            value1: 0,
            value3:5,
          })
          that.otherList(false,false,true,3);
        }else if(index == 4){
          that.setData({
            resultList:[],
            value1: 0,
            value3:5,
          })
          that.otherList(false,false,true,4);
        }else if(index == 6){
          that.setData({
            resultList:[],
            value1: 0,
            value2: 2,
          })
          that.otherList(false,false,true,6);
        }else if(index == 7){
          that.setData({
            resultList:[],
            value1: 0,
            value2: 2,
          })
          that.otherList(false,false,true,7);
        } 
        break

    }
  
 
  },
 


  //弹出框
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  onChange(event) {
    var that = this;
    that.setData({
      value1: 0,
      value2: 2,
      value3:5,
      resultList:[]
    })
    switch(event.detail){
      case 0:
         that.setData({
           info:event.detail
         })
         that.allList(0);
         break;
      case 1:
        that.setData({
          info:event.detail
        })
         that.otherList(true,false,false,0);
         break;
      case 2:
        that.setData({
          info:event.detail
        })
         that.otherList(false,true,false,0);
         break;
      case 3:
        that.setData({
          info:event.detail
        })
          that.otherList(false,false,true,0);
          break;
   
    }

  that.onClose();
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      info:0
    })
    that.allList(0);
    //获得分类筛选
    // console.log("执行")
    // that.imgShow();
    // that.setListHeight();
    // that.goodtype(()=>{
    //   that.jobtyperesultList(that.data.screenType)
    // })
  },
  onShow:function(){

  },

    /**
   * 设置分类列表高度
   */
  setListHeight: function () {
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          scrollHeight: res.windowHeight - 52,
        });
      }
    });
  },

  //     //轮播图
  // imgShow:function(){
  //   var _this = this
  //   db.collection('swiper').get({         
  //     success: function (res) {
  //         console.log('轮播图获取成功',res)
  //         _this.setData({
  //           imgUrls: res.data,
  //         })
  //         console.log('imgUrls',_this.data.imgUrls)
  //     },
  //     fail: function (res) {
  //         console.log('轮播图获取失败', res)
  //     }
  //   })
  // },
  // 左边
  goodtype(complete){
    var that=this
    db.collection("categoryDetail").get({
      success(res) {
        console.log("数据库获取成功", res)
        that.setData({
          screenArray: res.data[1].Detail,
          screenType:res.data[1].Detail[0],
        })
        if(complete){
          complete()
        }
      },
      fail(res) {
        console.log("数据库获取失败", res);
      }
    })
  },
// 所有商品
allList(info){
  var that=this
  var tem = null
  var len = that.data.resultList.length;
      db.collection("GoodsList").where({
        isxiajia:false,
      }).orderBy('Time','desc')
      .skip(len) //从第几个数据开始
      .get().then(res=>{
          if (res.data.length<=0){
            wx.showToast({
              icon:'none',
              title:"没有更多数据啦"
            })
            console.log("没有更多数据啦",)
          }else{
            if(info == 0){
              that.setData({
                resultList: that.data.resultList.concat(res.data), //获取数据数组    
              });
            }else if(info == 1){
              var list = res.data;
            
              for(var i = 0; i <list.length - 1; i++){
                for(var j = 0; j <list.length - 1 - i; j++ ){
                   if(list[j].Time < list[j+1].Time){
                       tem = list[j];
                       list[j] = list[j+1];
                       list[j+1] = tem;
                   }
                }
              }
              that.setData({
                resultList: that.data.resultList.concat(list), //获取数据数组    
              });
            }  else if(info == 3){
              var list = res.data;
            
              for(var i = 0; i <list.length - 1; i++){
                for(var j = 0; j <list.length - 1 - i; j++ ){
                   if(list[j].GoodsPrice > list[j+1].GoodsPrice){
                       tem = list[j];
                       list[j] = list[j+1];
                       list[j+1] = tem;
                   }
                }
              }
              that.setData({
                resultList: that.data.resultList.concat(list), //获取数据数组    
              });
            }
            else if(info == 4){
              var list = res.data;
            
              for(var i = 0; i <list.length - 1; i++){
                for(var j = 0; j <list.length - 1 - i; j++ ){
                   if(list[j].GoodsPrice < list[j+1].GoodsPrice){
                       tem = list[j];
                       list[j] = list[j+1];
                       list[j+1] = tem;
                   }
                }
              }
              that.setData({
                resultList: that.data.resultList.concat(list), //获取数据数组    
              });
            }else if(info == 6){
              var list = res.data;
              for(var i = 0; i <list.length - 1; i++){
                for(var j = 0; j <list.length - 1 - i; j++ ){
                   if(list[j].GoodsSale > list[j+1].GoodsSale){
                       tem = list[j];
                       list[j] = list[j+1];
                       list[j+1] = tem;
                   }
                }
              }
              that.setData({
                resultList: that.data.resultList.concat(list), //获取数据数组    
              });
            }
            else if(info == 7){
              var list = res.data;
            
              for(var i = 0; i <list.length - 1; i++){
                for(var j = 0; j <list.length - 1 - i; j++ ){
                   if(list[j].GoodsSale < list[j+1].GoodsSale){
                       tem = list[j];
                       list[j] = list[j+1];
                       list[j+1] = tem;
                   }
                }
              }
              that.setData({
                resultList: that.data.resultList.concat(list), //获取数据数组    
              });
            }
          }
          
          

        }).catch(res=>{
          console.log("请求失败", res)
        })
},
//不同类别商品
otherList(iswenju,isyiwu,isjinian,info){
  var that=this
  var tem = null
  // let len=that.data.resultList.length
      db.collection("GoodsList").where({
        isxiajia:false,
        iswenju:iswenju,
        isyifu:isyiwu,
        isjinianwu:isjinian
      }).orderBy('Time','desc').get().then(res=>{
        if(info == 0){
          that.setData({
            resultList: that.data.resultList.concat(res.data), //获取数据数组    
          });
        }else if(info == 1){
          var list = res.data;
        
          for(var i = 0; i <list.length - 1; i++){
            for(var j = 0; j <list.length - 1 - i; j++ ){
               if(list[j].Time < list[j+1].Time){
                   tem = list[j];
                   list[j] = list[j+1];
                   list[j+1] = tem;
               }
            }
          }
          that.setData({
            resultList: that.data.resultList.concat(list), //获取数据数组    
          });
        }  else if(info == 3){
          var list = res.data;
        
          for(var i = 0; i <list.length - 1; i++){
            for(var j = 0; j <list.length - 1 - i; j++ ){
               if(list[j].GoodsPrice > list[j+1].GoodsPrice){
                   tem = list[j];
                   list[j] = list[j+1];
                   list[j+1] = tem;
               }
            }
          }
          that.setData({
            resultList: that.data.resultList.concat(list), //获取数据数组    
          });
        }
        else if(info == 4){
          var list = res.data;
        
          for(var i = 0; i <list.length - 1; i++){
            for(var j = 0; j <list.length - 1 - i; j++ ){
               if(list[j].GoodsPrice < list[j+1].GoodsPrice){
                   tem = list[j];
                   list[j] = list[j+1];
                   list[j+1] = tem;
               }
            }
          }
          that.setData({
            resultList: that.data.resultList.concat(list), //获取数据数组    
          });
        }else if(info == 6){
          var list = res.data;
          for(var i = 0; i <list.length - 1; i++){
            for(var j = 0; j <list.length - 1 - i; j++ ){
               if(list[j].GoodsSale > list[j+1].GoodsSale){
                   tem = list[j];
                   list[j] = list[j+1];
                   list[j+1] = tem;
               }
            }
          }
          that.setData({
            resultList: that.data.resultList.concat(list), //获取数据数组    
          });
        }
        else if(info == 7){
          var list = res.data;
        
          for(var i = 0; i <list.length - 1; i++){
            for(var j = 0; j <list.length - 1 - i; j++ ){
               if(list[j].GoodsSale < list[j+1].GoodsSale){
                   tem = list[j];
                   list[j] = list[j+1];
                   list[j+1] = tem;
               }
            }
          }
          that.setData({
            resultList: that.data.resultList.concat(list), //获取数据数组    
          });
        }
          
    
        }).catch(res=>{
          console.log("请求失败", res)
        })
},


  //页面上拉触底事件的处理函数
  onReachBottom: function() {

    var that=this
    if(that.data.info == 0){
       that.allList(0);
    }
    // console.log(that.data.info);
    // var Id=Number(that.data.curNav)
    // var screenType =that.data.screenArray[Id] ;
    // that.jobtyperesultList(screenType)
  },
     /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  
  },
 

searchDetail:function (){
    wx.navigateTo({
      url: '/pages/classify/Goods-search/Goods-search',
    })
  },
//   /**
//    * 设置分享内容
//    */
  onShareAppMessage: function () {
    return {
      title: "店铺上新",
      path: "/pages/classify/NewGoods/NewGoods"
    };
  }
})
