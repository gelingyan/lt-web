/**
 * Created by Administrator on 2017/1/19.
 */
import {errorCode} from './errorCode.js'
// import { Message } from 'element-ui'
// import storage from './storage'
// 拦截发送请求
xhook.before(function (request) {
  // const loginInfo = request.url
  // if (loginInfo.indexOf('is_login') > 0 || loginInfo.indexOf('add') > 0) {
  //   // 登录注册
  // } else {}
  // const user = sessionStorage.getUser()
  // // 附加请求头token信息
  // if (user && user.token) {
  //   request.xhr.setRequestHeader('token', user.token)
  // }
})
// 拦截返回请求
xhook.after(function (request, response) {
  try {
    const data = JSON.parse(response.data)
    let messageType = 0
    if (!data || !data.meta || !data.meta.code) {
      return false
    }
    if (data.meta.code === 100000 || data.meta.code === 100030) {
      messageType = 1
    } else {
      messageType = 2
    }
    data.message = errorCode(data.meta.code)
    data.messageType = messageType
    response.text = JSON.stringify(data)
  } catch (error) {
    // Message.error('错误代码' + response.status)
    console.error(error)
  }
})
