import store from "../store";
import api from '../http/api'

export const USER_INFO = 'USER_INFO'
export const PHONE = 'PHONE'
export const TOKEN = 'TOKEN'
export const APP_ID = 'wxc9d2134755b79426'
export const TX_ADDRESS_KEY = 'DKMBZ-JB63U-AXFVF-4HVLP-S2G35-VVB5R'
export const CITY = 'CITY'

let QQMapWX = require('../libs/tx-address/qqmap-wx-jssdk.js');

export function setToken(token){
    uni.setStorageSync(TOKEN, token)
}

export function getToken(){
    return uni.getStorageSync(TOKEN)
}

export function getUserInfo(){
    return uni.getStorageSync(USER_INFO)
}

export function setUserInfo(userInfo){
     uni.setStorageSync(USER_INFO, userInfo)
}

export function setPhone(phone){
    uni.setStorageSync(PHONE, phone)
}

export function getPhone(){
    return uni.getStorageSync(PHONE)
}

export function getCity(){
    return uni.getStorageSync(CITY)
}

export function setCity(city){
     uni.setStorageSync(CITY, city)
}

export function wechatLocation(callback){
    if(!getCity()){
        uni.showLoading({title: '获取位置中'});
        uni.getLocation({
            type: 'gcj02',
            success: function (res) {
                let qqmapsdk = new QQMapWX({key: TX_ADDRESS_KEY})
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success(result){
                        setCity(result.result.address_component.city)
                        uni.hideLoading()
                        callback(result.result.address_component.city)
                    }
                })
            }
        })
    } else {
        callback(getCity())
    }

}

export async function bindPhone(params, callback){
    const result = await api.user.bindPhone({app_id: APP_ID, tmp_token: getToken(),encrypted_data: params.detail.encryptedData,lv:params.detail.iv})
    setToken(result.token)
    setPhone('123456789')
    store.dispatch("user/setToken", result.token)
    store.dispatch("user/setPhone",getPhone())
    callback()
}

export function wechatLogin(){
    uni.showLoading({title: '登录中'});
    wx.login({
        success: function (result) {
            store.dispatch("user/login", result.code)
            uni.hideLoading()
        }
    })
}

export function wechatUserInfo(callback){
    uni.showLoading({title: '授权中'});
    wx.getUserProfile({
        desc: 'register',
        lang: 'zh_CN',
        success: (result) => {
            const userInfo = {
                headimg: result.userInfo.avatarUrl,
                nickname: result.userInfo.nickName
            }
            setUserInfo(userInfo)
            store.dispatch("user/setUserInfo", userInfo)
            console.log(result)
            api.user.setUserInfo({
                app_id: APP_ID,
                row_data: result.rawData,
                sign: result.signature
            })
            uni.hideLoading()
            callback(result.userInfo)
        }
    })
}
