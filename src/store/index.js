import Vue from 'vue'
import Vuex from 'vuex'
import signUp from './modules/sign-up'
import order from './modules/order'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        signUp,
        order,
        user
    }
})

export default store
