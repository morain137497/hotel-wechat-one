const state = {
    contactsList: []
}

const getters = {
    getContactsList(state){
        return state.contactsList
    }
}


const mutations = {
    SET_CONTACTS_LIST:(state, list) => {
        state.contactsList = list
    },
    DEL_CONTACTS_INFO:(state, index) => {
        state.contactsList.splice(index, 1)
    }
}

const actions = {
    setContactsList({commit}, list){
        commit('SET_CONTACTS_LIST', list)
    },
    delContactsInfo({commit}, index){
        commit('DEL_CONTACTS_INFO', index)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}