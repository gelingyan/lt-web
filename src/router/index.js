import Vue from 'vue'
import Router from 'vue-router'
import * as names from './names'
import storage from '../module/storage'

Vue.use(Router)

const router = new Router({
//  mode: 'history',
  routes: [
    {
      name: names.ADMIN__LOGIN,
      path: '/adm/login',
      component (resolve) {
        require(['../components/admin/admin-login.vue'], resolve)
      }
    },
    // {// 后台管理主页
    //   name: names.ADMIN__ADMIN,
    //   path: '/admin',
    //   component (resolve) {
    //     require(['../components/admin/index.vue'], resolve)
    //   }
    // },
    /* 帐号管理 */
    {
      name: names.ADMIN__INDEX,
      path: '/admin',
      component (resolve) {
        require(['../components/admin/admin.vue'], resolve)
      },
      children: [
        { //  用户列表
          name: names.ADMIN_USER__LIST,
          path: '/admin/user',
          component (resolve) {
            require(['../components/admin/user-list.vue'], resolve)
          }
        },
        { // 商标列表
          name: names.ADMIN_TRADEMARK__LIST,
          path: '/admin/trademark/list',
          component (resolve) {
            require(['../components/admin/trademark-list.vue'], resolve)
          }
        },
        { // 上传商标
          name: names.ADMIN_TRADEMARK__UPLOAD,
          path: '/admin/trademark/upload',
          component (resolve) {
            require(['../components/admin/trademark-upload.vue'], resolve)
          }
        },
        { // 文章上传
          name: names.ADMIN_ARTICLE__LIST,
          path: '/admin/article/upload',
          component (resolve) {
            require(['../components/admin/article-edit.vue'], resolve)
          }
        }
      ]
    },
    /* 移动端 */
    {
      name: names.MOBILE__INDEX,
      path: '/',
      component (resolve) {
        require(['../components/mobile/index.vue'], resolve)
      },
      children: [
        {
          name: names.MOBILE__HOME,
          path: '/home',
          component (resolve) {
            require(['../components/mobile/nav1/index.vue'], resolve)
          }
        },
        {
          name: names.MOBILE__CLASS,
          path: '/class',
          component (resolve) {
            require(['../components/mobile/nav2/index.vue'], resolve)
          }
        },
        {
          name: names.MOBILE__FIND,
          path: '/find',
          component (resolve) {
            require(['../components/mobile/nav3/index.vue'], resolve)
          }
        },
        {
          name: names.MOBILE__MESSAGE,
          path: '/message',
          component (resolve) {
            require(['../components/mobile/nav4/index.vue'], resolve)
          }
        }
      ]
    },
    {
      name: names.MOBILE__LOGIN,
      path: '/login',
      component (resolve) {
        require(['../components/mobile/login.vue'], resolve)
      }
    },
    {
      name: names.MOBILE__REGISTER,
      path: '/register',
      component (resolve) {
        require(['../components/mobile/register.vue'], resolve)
      }
    },
    {
      name: names.GOODS__INDEX,
      path: '/goods',
      component (resolve) {
        require(['../components/mobile/goods/index.vue'], resolve)
      },
      children: [
        {
          name: names.GOODS__GOODS,
          path: '/goods/:keyword',
          component (resolve) {
            require(['../components/mobile/goods/goods.vue'], resolve)
          }
        },
        {
          name: names.GOODS__GOOD_DETAIL,
          path: '/goods/:keyword/detail/:id',
          component (resolve) {
            require(['../components/mobile/goods/detail.vue'], resolve)
          }
        }
      ]
    },
    {// 文档
      name: names.MOBILE__ARTICLE,
      path: '/article/:keyword',
      component (resolve) {
        require(['../components/mobile/article/index.vue'], resolve)
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
 // window.scrollTo(0, 0)
  if (to.path !== '/login') {
    storage.setMenu({to: to.name})
  }

  if (to.path === '/adm/login') {
    storage.delAdmin()
  }

  let admin = storage.getAdmin()
  if (/admin/.test(to.path) && !admin) {
    next({ path: '/adm/login' })
  } else {
    next()
  }
})

export default router
