import Mock from 'mockjs'
const baseUrl = 'api/'

// 登录返回成功
Mock.mock(new RegExp(baseUrl + 'adminLoginSuccess'), 'post', response => {
  return Mock.mock({
    meta: {
      code: 1,
      message: '登录成功'
    },
    data: {
      // token信息
      access_token: '123456789101112131415',
      // S表示超级管理员，
      name: 'admin',
      userType: 'S',
      userID: Mock.mock('@id')
    }
  })
})
 // 登录返回失败
Mock.mock(new RegExp(baseUrl + 'adminLoginFail'), 'post', response => {
  return Mock.mock({
    meta: {
      code: 2,
      message: '帐号或密码错误'
    },
    data: {
      // token信息
      access_token: '',
      // S表示超级管理员，
      name: '',
      userType: '',
      userID: ''
    }
  })
})
