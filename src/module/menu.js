/**
 * Created by gelingyan on 2017/6/6.
 */
import * as names from '../router/names.js'
const menu = [
  {
    id: '1',
    icon: 'el-icon-setting',
    title: '用户管理',
    children: [
      {
        index: names.ADMIN_USER__LIST,
        text: '用户列表'
      }
      ]
  },
  {
    id: '2',
    icon: 'el-icon-menu',
    title: '商标管理',
    children: [
      {
        index: names.ADMIN_TRADEMARK__LIST,
        text: '商标列表'
      },
      {
        index: names.ADMIN_TRADEMARK__UPLOAD,
        text: '上传商标'
      }
      ]
  },
  {
    id: '3',
    icon: 'el-icon-document',
    title: '文章管理',
    children: [
      {
        index: names.ADMIN_ARTICLE__LIST,
        text: '文章列表'
      }
      ]
  },
  {
    id: '4',
    icon: 'el-icon-document',
    title: '移动端',
    children: [
      {
        index: names.MOBILE__HOME,
        text: '主页'
      }
      ]
  }
]
export default menu
