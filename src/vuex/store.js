import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// // 声明一个状态
// const state = {
//     msg: ''
// }
// // 给actions注册一个事件处理函数，当这个函数被触发时，将状态提交到 mutaions 中处理
// const actions = {
//   saveName ({coummit}, msg) {
//     coummit('saveMsg', msg)
//   }
// }
//
// // 更新状态
// const mutations = {
//   saveMsg (state, msg) {
//     state.msg = msg
//   }
// }
//
// // 获取状态信息
// const getter = {
//   showState (state) {
//     console.log(state.msg)
//   }
// }
// export default new Vue.Store({
//   state,
//   actions,
//   mutations,
//   getter
// })

const store = new Vuex.Store({
  state: {
    count: 0,
    user: {
      'user': 'XXX',
      'userID': 111,
      'userType': '10',
      'email': 'XXX'
    }
  },
  mutations: {
    increment (state, n) {
      state.count += n
    },
    userString (state, user) {
      state.user = user
    }
  }
})
export default store
