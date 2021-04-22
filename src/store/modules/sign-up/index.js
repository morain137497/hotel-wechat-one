const state = {
    contactsList: [],
    couponInfo: {},
    currentActivityId: ''
}

const getters = {
    getContactsList(state){
        return state.contactsList
    },
    getCouponInfo(state){
        return state.couponInfo
    },
    getCurrentActivityId(state){
        return state.currentActivityId
    }
}


const mutations = {
    SET_CONTACTS_LIST:(state, list) => {
        state.contactsList = list
    },
    DEL_CONTACTS_INFO:(state, index) => {
        state.contactsList.splice(index, 1)
    },
    SET_COUPON_INFO:(state, info) => {
        state.couponInfo = info
    },
    SET_CURRENT_ACTIVITY_ID:(state, activityId) => {
        state.currentActivityId = activityId
    }
}

const actions = {
    setContactsList({commit}, list){
        commit('SET_CONTACTS_LIST', list)
    },
    delContactsInfo({commit}, index){
        commit('DEL_CONTACTS_INFO', index)
    },
    setCouponInfo({commit}, info){
        commit('SET_COUPON_INFO', info)
    },
    setCurrentActivityId({commit}, activityId){
        commit('SET_CURRENT_ACTIVITY_ID', activityId)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}