import api from '../../../http/api'
import {APP_ID, setToken, setPhone, setUserInfo, getPhone} from "../../../utils/auth";
const state = {
    userInfo: {},
    token: '',
    phone: '',
    openId: ''
}

const getters = {
    getUserInfo(state){
        return state.userInfo
    },
    getToken(state){
        return state.token
    },
    getPhone(state){
        return state.phone
    }

}


const mutations = {
    SET_USER_INFO:(state, info) => {
        state.userInfo = info
    },
    SET_TOKEN:(state, token) => {
        state.token = token
    },
    SET_PHONE:(state, phone) => {
        state.phone = phone
    }
}
const actions = {
    setUserInfo({commit}, info){
        commit('SET_USER_INFO', info)
    },
    setPhone({commit}, phone){
        commit('SET_PHONE', phone)
    },
    setToken({commit}, token){
        commit('SET_TOKEN', token)
    },
    async login({commit}, code){
        const result = await api.user.wechatLogin({app_id: APP_ID, jscode: code})
        console.log(result)
        if(result.code === 80050) {
            setToken(result.tmp_token)
            commit('SET_TOKEN', result.tmp_token)
        }
        if(result.code === 0) {
            setToken(result.token)
            commit('SET_TOKEN', result.token)
            setPhone(result.data.phone)
            commit('SET_PHONE', result.data.phone)
            console.log(getPhone())
            const userInfo = {}
            if(result.data.nickname){
                userInfo.nickname = result.data.nickname
            }
            if(result.data.nickname){
                userInfo.headimg = result.data.headimg
            }
            commit('SET_USER_INFO', userInfo)
            setUserInfo(userInfo)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}