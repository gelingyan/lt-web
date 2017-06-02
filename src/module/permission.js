import Vue from 'vue'
import storage from './storage'
Vue.directive('permission-type', {
  inserted: function (el, binding) {
    const user = storage.getUser()
    if (!user || !user.userType) {
      $(el).remove()
      return
    }
    if ((binding.value & parseInt(user.userType, 2)) !== parseInt(user.userType)) {
      $(el).remove()
    }
  }
})
