import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import { store } from './store/store.js'
import VuejsDialog from "vuejs-dialog"
import VueMaterial from 'vue-material'
import Accounting from 'accounting'
import moment from 'moment'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(VuejsDialog)
Vue.use(VueMaterial)
Vue.use(moment)

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition 
    else return { x: 0, y: 0 }
  }
})

Vue.filter('currency', function(val) {
  return Accounting.formatMoney(val)
})

// Vue.component('global-component', () => import('./components/Menu.vue') ) 

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
