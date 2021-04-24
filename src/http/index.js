import {getToken} from '../utils/auth'

export default {
    request(options = {}){
        uni.showLoading({
            title: '加载中'
        });
        const BASE_URL = "http://service.qunju.cn/"
        return new Promise(((resolve, reject) => {
            const header = {}
            const token = getToken()
            if(token){
                header['X-Token'] = token
            }
            uni.request({
                url: BASE_URL + options.url,
                data: options.data?options.data:null,
                header: header,
                method: options.type,
                success: (res) => {
                    uni.hideLoading();
                    resolve(res.data)
                    // else {
                    //     uni.showToast({
                    //         title: res.data.msg,
                    //         duration: 2000
                    //     });
                    // }
                }
            })
        }))
    }
}