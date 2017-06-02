// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/site.scss'
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './module/xhook'
import './mock'
import ValidationUnitiy from './module/validate'
import './module/filters'
import './module/permission'
import store from './vuex/store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MintUI)
window.validator = ValidationUnitiy

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

