/**
 * by lianghanbo 2017/3/28
 */
import Mock from 'mockjs'
const baseUrl = 'api/'
const Random = Mock.Random

// 验证码
Mock.mock(new RegExp(baseUrl + 'getVerCode'), 'post', options => {
  let number = Mock.mock('@increment(1000)')
  return Mock.mock({
    meta: {
      code: 100000,
      message: '操作成功'
    },
    data: {
      verCodeImage: Random.image('200x100', '#4A7BF7', number),
      code: number
    }
  })
})

// 用户名重复校验
Mock.mock(new RegExp(baseUrl + 'checkUserName'), 'post', () => {
  return Mock.mock({
    result: Mock.mock('@boolean')
  })
})
