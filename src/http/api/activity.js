import http from '../../http'
export default {
    async activityList(params){
        return http.request({
            url: '4000/activity/search',
            data: params,
            type: 'post'
        });
    },
    async activityInfo(params){
        return http.request({
            url: '4000/activity/getdetail',
            data: params,
            type: 'post'
        });
    },
    async signUpUserList(params){
        return http.request({
            url: '4000/attend/getlistbyid',
            data: params,
            type: 'post'
        });
    },
    async setContactsUser(params){
        return http.request({
            url: '4000/personnel/setdetail',
            data: params,
            type: 'post'
        });
    },
    async getContactsList(params){
        return http.request({
            url: '4000/personnel/getlist',
            data: params,
            type: 'post'
        });
    },
    async delContactsInfo(params){
        return http.request({
            url: '4000/personnel/deldetail',
            data: params,
            type: 'post'
        });
    },
    async setJoinUp(params){
        return http.request({
            url: '4000/attend/setdetail',
            data: params,
            type: 'post'
        });
    },
    async orderList(params){
        return http.request({
            url: '4000/attend/getlist',
            data: params,
            type: 'post'
        });
    },
    async toPay(params){
        return http.request({
            url: '6000/payment/order',
            data: params,
            type: 'post'
        });
    },
    async userCreateActivityList(params){
        return http.request({
            url: '4000/activity/getlist',
            data: params,
            type: 'post'
        });
    },
    async setGather(params){
        return http.request({
            url: '4000/attend/setgather',
            data: params,
            type: 'post'
        });
    },
    async cancelSignUp(params){
        return http.request({
            url: '4000/attend/deldetail',
            data: params,
            type: 'post'
        });
    }
}