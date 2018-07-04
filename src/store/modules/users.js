const state = {
    currentUser: null
}

const getters = {
    currentUser: state => state.currentUser
}

const mutations = {
    userStatus: (state, user) => {
        user ? state.currentUser = user.email : state.currentUser = null
        }
}

const actions = {
    setUser ({ commit }, user) {
        commit('userStatus', user)
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}