import Vue from 'vue'
import Router from 'vue-router'
import * as names from './names'
import storage from '../module/storage'

Vue.use(Router)

 /* 后台管理主页 */
const admin = [
  {
    name: names.adminLogin.name,
    path: names.adminLogin.path,
    component (resolve) {
      require(['../components/admin/admin-login.vue'], resolve)
    }
  },
  {
    name: names.adminIndex.name,
    path: names.adminIndex.path,
    redirect: '/admin/user',
    component (resolve) {
      require(['../components/admin/admin.vue'], resolve)
    },
    children: [
      { //  用户列表
        name: names.user.name,
        path: names.user.path,
        component (resolve) {
          require(['../components/admin/user/user-list.vue'], resolve)
        }
      },
      { // 商标列表
        name: names.trademark.name,
        path: names.trademark.path,
        component (resolve) {
          require(['../components/admin/trademark/trademark-list.vue'], resolve)
        }
      },
      { // 商标查看
        name: names.trademarkEdit.name,
        path: `${names.trademarkEdit.path}/:id`,
        component (resolve) {
          require(['../components/admin/trademark/trademark-upload.vue'], resolve)
        }
      },
      { // 上传商标
        name: names.trademarkUpload.name,
        path: names.trademarkUpload.path,
        component (resolve) {
          require(['../components/admin/trademark/trademark-upload.vue'], resolve)
        }
      },
      { // 批量上传25类商标
        name: names.trademarkUploadList.name,
        path: names.trademarkUploadList.path,
        component (resolve) {
          require(['../components/admin/trademark/trademark-upload-list.vue'], resolve)
        }
      },
      { // 文档列表
        name: names.article.name,
        path: names.article.path,
        component (resolve) {
          require(['../components/admin/article/article-list.vue'], resolve)
        }
      },
      { // 文档编辑
        name: names.articleEdit.name,
        path: `${names.articleEdit.path}/:key`,
        component (resolve) {
          require(['../components/admin/article/article-edit.vue'], resolve)
        }
      }
    ]
  }
]

    /* 移动端 */
const mobile = [
  {
    name: names.index.name,
    path: names.index.path,
    redirect: names.home.path,
    component (resolve) {
      require(['../components/mobile/index.vue'], resolve)
    },
    children: [
      {
        name: names.home.name,
        path: names.home.path,
        component (resolve) {
          require(['../components/mobile/nav1/index.vue'], resolve)
        }
      },
      {
        name: names.classily.name,
        path: names.classily.path,
        component (resolve) {
          require(['../components/mobile/nav2/index.vue'], resolve)
        }
      },
      {
        name: names.find.name,
        path: names.find.path,
        component (resolve) {
          require(['../components/mobile/nav3/index.vue'], resolve)
        }
      },
      {
        name: names.message.name,
        path: names.message.path,
        component (resolve) {
          require(['../components/mobile/nav4/index.vue'], resolve)
        }
      }
    ]
  },
  {
    name: names.login.name,
    path: names.login.path,
    component (resolve) {
      require(['../components/mobile/login.vue'], resolve)
    }
  },
  {
    name: names.register.name,
    path: names.register.path,
    component (resolve) {
      require(['../components/mobile/register.vue'], resolve)
    }
  },
  {
    name: names.goodsIndex.name,
    path: names.goodsIndex.path,
    component (resolve) {
      require(['../components/mobile/goods/index.vue'], resolve)
    },
    children: [
      {
        name: names.goodsClass.name,
        path: `${names.goodsClass.path}/:keyword`,
        component (resolve) {
          require(['../components/mobile/goods/goods.vue'], resolve)
        }
      },
      {
        name: names.goods.name,
        path: `/class/:keyword/${names.goods.path}/:id`,
        component (resolve) {
          require(['../components/mobile/goods/detail.vue'], resolve)
        }
      }
    ]
  },
  {// 文档
    name: names.document.name,
    path: `${names.document.path}/:keyword`,
    component (resolve) {
      require(['../components/mobile/article/index.vue'], resolve)
    }
  }
]

/* 移动端简化版 */
const simple = [
{// 首页
    name: names.simple.name,
    path: names.simple.path,
    component (resolve) {
      require(['../components/simple/index.vue'], resolve)
    }
  },
  {// 详情页
    name: names.simpleDetail.name,
    path: `${names.simpleDetail.path}/:id`,
    component (resolve) {
      require(['../components/simple/detail.vue'], resolve)
    }
  },
  {// 文章
    name: names.simpleArticle.name,
    path: `${names.simpleArticle.path}/:keyword`,
    component (resolve) {
      require(['../components/simple/article.vue'], resolve)
    }
  }
]

const router = new Router({
  routes: [
    ...admin,
    ...mobile,
    ...simple,
    { // 404
      name: '404',
      path: '*',
      component (resolve) {
        require(['../components/404.vue'], resolve)
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    storage.setMenu({to: to.name})
  }

  if (to.path === '/admin/login') {
    storage.delAdmin()
  }

  let admin = storage.getAdmin()
  if (/admin/.test(to.path) && (to.path !== '/admin/login')) {
    if (!admin) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
