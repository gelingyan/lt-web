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
        index: names.user.name,
        text: names.user.name
      }
      ]
  },
  {
    id: '2',
    icon: 'el-icon-menu',
    title: '商标管理',
    children: [
      {
        index: names.trademark.name,
        text: names.trademark.name
      },
      {
        index: names.trademarkUpload.name,
        text: names.trademarkUpload.name
      }
      ]
  },
  {
    id: '3',
    icon: 'el-icon-document',
    title: '文章管理',
    children: [
      {
        index: names.article.name,
        text: names.article.name
      },
      {
        index: names.articleUpload.name,
        text: names.articleUpload.name
      }
      ]
  },
  {
    id: '4',
    icon: 'el-icon-share',
    title: '移动端',
    index: names.home.name,
    children: []
  }
]
export default menu
