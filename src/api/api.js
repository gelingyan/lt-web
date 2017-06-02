import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()

var instance = axios.create({
  baseURL: 'api/'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

let base = 'api'

export const getVerCode = () => { return axios.post(`${base}/getVerCode`) }

// =================================   admin   ===============================
// 测试RAP任务进度
export const process = params => { return axios.post('index/process', params) }
// 登录
export const adminLogin = params => { return instance.post('is_login.php', params) }
// 用户列表
export const getUsers = params => { return instance.post('users.php', params) }
// 修改用户
export const modifyUser = params => { return instance.post('modifyUser.php', params) }
// 删除用户
export const delUser = params => { return instance.post('delUser.php', params) }
// 上传商标
export const addMark = params => { return instance.post('add_mark.php', params) }
// 上传文件
export const upload = params => { return instance.post('upload_file.php', params) }

// =================================   mobile   ===============================
// 登录
export const userLogin = params => { return instance.post('is_login.php', params) }
export const userRegister = params => { return instance.post('add.php', params) }

// 普通用户列表
// 请求参数：accessToken: , pageIndex: 当前页数 , pageCount: 每页条数
export const getUserList = params => { return axios.post(`${base}/m/UserList`, params) }

// 获取文档信息
export const getArticle = params => { return instance.post('article.php', params) }
