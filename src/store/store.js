import Vue from 'vue'
import Vuex from 'vuex'

import menu from './modules/menu'
import orders from './modules/orders'
import users from './modules/users'
import { firebaseMutations } from 'vuexfire'
// import * as actions from './actions'
// import * as getters from './getters'
// import * as mutations from './mutations'


Vue.use(Vuex)

export const store = new Vuex.Store({
  mutations: { ...firebaseMutations },
  modules: {
    menu,
    orders,
    users
  }
})
