import http from '../../http'
export default {
    async activityList(params){
        return await http.request({
            url: '4000/activity/search',
            data: params,
            type: 'post'
        })
    }
}