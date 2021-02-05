import 'babel-polyfill'
// import 'expose-loader?$!expose-loader?jQuery!jquery'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/index.js';
import VueCookies from 'vue-cookies'
import jQuery from 'jquery'
global.$ = jQuery

Vue.config.productionTip = false
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
