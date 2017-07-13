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
// 商标列表
export const getMarks = params => { return instance.post('marks.php', params) }
// 删除商标
export const delMark = params => { return instance.post('delMark.php', params) }
// 获取所有商标分类
export const getAllMarkClass = params => { return instance.post('mark_class.php', params) }
// 获取商标分类号下的类似群号
export const getGroup = params => { return instance.post('mark_group.php', params) }

// =================================   mobile   ===============================
// 登录
export const userLogin = params => { return instance.post('is_login.php', params) }
export const userRegister = params => { return instance.post('add.php', params) }

// 普通用户列表
// 请求参数：accessToken: , pageIndex: 当前页数 , pageCount: 每页条数
export const getUserList = params => { return axios.post(`${base}/m/UserList`, params) }

// 获取文档信息
export const getArticle = params => { return instance.post('article.php', params) }
