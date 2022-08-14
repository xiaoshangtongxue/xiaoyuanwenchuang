// 云函数代码
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {

  const res = await cloud.cloudPay.unifiedOrder({
    "body" : event.desc,
    "outTradeNo" : event.orderCode,
    "spbillCreateIp" : "127.0.0.1",
    "subMchId" : "1629625332",
    "totalFee" : event.price*100,
    // "totalFee" : 1,
    "envId": "sdwc-1g7b3egq90661e55",
    // 'detail': event.detail,
    "functionName": "pay_cb",//支付成功回调
  })
  return res
}