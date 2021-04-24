const state = {
    contactsList: [],
    couponInfo: {},
    activityInfo: {}
}

const getters = {
    getContactsList(state){
        return state.contactsList
    },
    getCouponInfo(state){
        return state.couponInfo
    },
    getActivityInfo(state){
        return state.activityInfo
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
    SET_ACTIVITY_INFO:(state, activityInfo) => {
        state.activityInfo = activityInfo
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
    setActivityInfo({commit}, activityInfo){
        commit('SET_ACTIVITY_INFO', activityInfo)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}