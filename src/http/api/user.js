import http from '../../http'
export default {
     wechatLogin(params){
        return http.request({
            url: '1000/xcx/login',
            data: params,
            type: 'post'
        });
    },
    setUserInfo(params){
        return http.request({
            url: '1000/xcx/setdetail',
            data: params,
            type: 'post'
        });
    },
    bindPhone(params){
        return http.request({
            url: '1000/xcx/bind',
            data: params,
            type: 'post'
        });
    },
    getUserInfo(params){
        return http.request({
            url: '1000/xcx/getdetail',
            data: params,
            type: 'post'
        });
    },
    getVipInfo(){
        return http.request({
            url: '4000/vip/getdetail',
            type: 'post'
        });
    },
    getLeaderInfo(){
        return http.request({
            url: '4000/leader/getdetail',
            type: 'post'
        });
    }
}