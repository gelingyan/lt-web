import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()

var instance = axios.create({
  baseURL: 'api/'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

let base = 'api'

export const getVerCode = () => { return instance.post('getVerCode') }

// =================================   admin   ===============================
// 登录
export const login = params => { return instance.post('is_login.php', params) }
// 用户列表
export const getUsers = params => { return instance.post('users.php', params) }
// 修改用户
export const modifyUser = params => { return instance.post('modifyUser.php', params) }
// 删除用户
export const delUser = params => { return instance.post('delUser.php', params) }
// 上传商标
export const addMark = params => { return instance.post('add_mark.php', params) }
// 批量上传商标
export const addMarkList = params => { return instance.post('add_mark_list.php', params) }
// 商标列表
export const getMarks = params => { return instance.post('marks.php', params) }
// 搜索商标(根据classify、title)
export const searchMarks = params => { return instance.post('searchMarks.php', params) }
// 商标详情
export const getMarkById = params => { return instance.post('getMarkById.php', params) }
// 商标编辑
export const modifyMark = params => { return instance.post('modifyMark.php', params) }
// 删除商标
export const delMark = params => { return instance.post('delMark.php', params) }
// 获取所有商标分类
export const getAllMarkClass = params => { return instance.post('mark_class.php', params) }
// 获取热门商标分类
export const getHotMarkClass = params => { return instance.post('hotMark_class.php', params) }
// 获取商标分类号下的类似群号
export const getGroup = params => { return instance.post('mark_group.php', params) }

// 获取文章列表
export const getArticles = params => { return instance.post('articles.php', params) }
// 获取文章内容
export const getArticleByKey = params => { return instance.post('getArticleByKey.php', params) }
// 编辑文章
export const modifyArticle = params => { return instance.post('modifyArticle.php', params) }
// =================================   mobile   ===============================
// 注册
export const userRegister = params => { return instance.post('add.php', params) }

// 普通用户列表
// 请求参数：accessToken: , pageIndex: 当前页数 , pageCount: 每页条数
export const getUserList = params => { return axios.post(`${base}/m/UserList`, params) }

