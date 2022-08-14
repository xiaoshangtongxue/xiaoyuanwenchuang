const tcb = require('@cloudbase/node-sdk')
const http = require('http.js')
const { templateId } = require('key.json')

const cloud = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV
})

exports.main = async (event) => {
  const {openid,orderNo,allprice,buytime} = event
  if (openid == null) return 404
  const token = (await cloud.callFunction({
    name: 'getToken'
  })).result
  if (token.code == null) {
    const obj = {
      touser: openid,
      template_id: templateId,
      // url: 'https://acc.cloudbase.vip/scan/eks/', // 此为示例，可自行更改，以文档为准
      data: {
        first: {
          value: '新订单通知',
          color: '#173177'
        },
        keyword1: {
          value: orderNo,
          color: '#173177'
        },
        keyword2: {
          value: allprice,
          color: '#173177'
        },
        keyword3: {
          value: buytime,
          color: '#173177'
        },
      
        remark: {
          value: '请尽快处理订单',
          color: '#07C160'
        }
      }
    }
    const result = await http.templateSend(token, obj)
    console.log(result)
    return null
  } else {
    return {
      code: -1,
      msg: token.code
    }
  }
}
