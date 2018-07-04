import { firebaseAction } from 'vuexfire'

const state = {
    menuItems: []
}

const getters = {
    getMenuItems: state => state.menuItems
}

const mutations = {
    
}

const actions = {
  setMenuRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
    // bunding will automatically unbind any previously bound ref so you
    // don't need to unbind before binding over an existing bound key
    bindFirebaseRef('menuItems', ref)
  })
}

export default {
    state,
    mutations,
    getters,
    actions
}