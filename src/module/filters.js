/**
 * Created by a on 2016/9/22.
 */
import Vue from 'vue'
import dateFns from 'date-fns'
Vue.filter('time-format', function (value, format) {
  return dateFns.format(value, format)
})
