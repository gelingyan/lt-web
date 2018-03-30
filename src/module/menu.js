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
        text: names.trademark.name
      },
      {
        text: names.trademarkUpload.name
      }
      ]
  },
  {
    id: '3',
    icon: 'el-icon-document',
    title: '文档管理',
    children: [
      {
        text: names.article.name
      }
    ]
  },
  {
    id: '4',
    icon: 'el-icon-share',
    title: '移动端',
    children: [
      {
        text: names.index.name
      },
      {
        text: names.simple.name
      }
    ]
  }
]
export default menu
