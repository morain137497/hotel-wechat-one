const state = {
    contactsList: [],
    couponInfo: {},
    gatherList: [
        {address: '北京', time: '2021-2-23 12:32:12'},
        {address: '上海', time: '2021-2-23 12:32:12'},
        {address: '天津', time: '2021-2-23 12:32:12'}
    ],
    activityInfo: {}
}

const getters = {
    getContactsList(state){
        return state.contactsList
    },
    getCouponInfo(state){
        return state.couponInfo
    },
    getGatherList(state){
        return state.gatherList
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
    SET_GATHER_LIST:(state, gatherList) => {
        state.gatherList = gatherList
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
    setGatherList({commit}, gatherList){
        commit('SET_GATHER_LIST', gatherList)
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