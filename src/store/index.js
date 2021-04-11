import Vue from 'vue'
import Vuex from 'vuex'
import signUp from './modules/sign-up'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        signUp
    }
})

export default store
