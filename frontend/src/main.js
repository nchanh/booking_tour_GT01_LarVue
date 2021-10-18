// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import axios from 'axios'
import {store} from './store'
import VueAxios from 'vue-axios'
import moment from 'moment'
import i18n from './plugins/i18n'
import tinymce from 'vue-tinymce-editor'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import configtToast from './plugins/ConfigToast'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('tinymce', tinymce)
Vue.use(Toast, configtToast)

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

Vue.filter('toCurrency', function (value) {
  if (value) {
    var formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    })
    return formatter.format(value)
  }
})
Vue.filter('formatDatetime', function (value) {
  if (value) {
    return moment(String(value)).format('hh:mm DD/MM/YYYY')
  }
})
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
// library.add(faUserSecret)
/* eslint-disable no-new */
  new Vue({
    i18n,
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})
