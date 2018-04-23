/**
 * Created by AprileLemon on 2017/4/12.
 */
export const errorCode = code => {
  let result = ''
  switch (code) {
    case 100000:
      // 请求成功正确请求以及正确返回的情况下
      result = '操作成功'
      break
    case 100020:
      result = '申请/注册号已存在'
      break
    case 100021:
      result = '商标上传失败'
      break
    case 100022:
      result = '商标批量上传失败'
      break
    case 100023:
      result = '商标删除失败'
      break
    case 100024:
      result = '上传失败'
      break
    case 100030:
      result = '暂无数据'
      break
    case 100031:
      result = '修改失败'
      break
    case 100032:
      result = '用户删除失败'
      break
    case 100040:
      result = '暂无内容'
      break
    case 100050:
      result = '用户名或密码不正确'
      break
    case 100090:
      result = '用户已存在'
      break
    case 100091:
      result = '注册失败'
      break
    default:
      result = '未知错误, 错误代码：' + code
  }
  return result
}
