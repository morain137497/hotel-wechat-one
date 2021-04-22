const state = {
    currentActive: 0
}

const getters = {
    getCurrentActive(state){
        return state.currentActive
    }
}


const mutations = {
    SET_CURRENT_ACTIVE:(state, active) => {
        state.currentActive = active
    }
}

const actions = {
    setCurrentActive({commit}, active){
        commit('SET_CURRENT_ACTIVE', active)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}