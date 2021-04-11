export default {
    request(options = {}){
        uni.showLoading({
            title: '加载中'
        });
        const BASE_URL = "http://service.qunju.cn/"
        return new Promise(((resolve, reject) => {
            uni.request({
                url: BASE_URL + options.url,
                data: options.data?options.data:null,
                method: options.type,
                success: (res) => {
                    uni.hideLoading();
                    if(res.data.code === 0){
                        console.log(res.data)
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            duration: 2000
                        });
                    }
                }
            })
        }))
    }
}