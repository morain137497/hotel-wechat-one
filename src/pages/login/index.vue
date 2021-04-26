<template>
  <div class="index">
    <div class="image-box">
      <open-data type="userAvatarUrl"></open-data>
    </div>

    <div class="main-box">
      <h2>申请以下权限</h2>
      <span class="tag">为了让您拥有更好的体验，请授权获取您的{{text}}</span>
    </div>

    <div class="but-box">
      <van-button  type="primary" round block  size="small" v-if="!phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权获取手机号</van-button>
      <van-button  type="primary" round block  size="small" v-if="phone"  @click="getWechatUserInfo()">授权获取您的信息</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex'
import {bindPhone, wechatUserInfo} from "../../utils/auth";
export default {
  name: "index",
  data(){
    return{
      text: '联系方式',
      phone: '',
      userInfo: {}
    }
  },
  computed:{
    ...mapGetters("user", {
      getUserInfo: 'getUserInfo',
      getPhone: 'getPhone'
    }),
  },
  methods: {
    getPhoneNumber (e){
      bindPhone(e, () => {
        this.phone = this.getPhone
        this.text = '头像、昵称等信息'
      })
    },
    getWechatUserInfo(){
      if(!this.userInfo.nickname){
        wechatUserInfo((result) => {
          this.userInfo = result
          uni.navigateBack()
        })
      }
    }
  },
  onLoad(){
    this.phone = this.getPhone
    if(this.phone){
      this.text = '头像、昵称等信息'
    }
    this.userInfo = this.getUserInfo
    if(Object.keys(this.userInfo).length !== 0){
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.index{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image-box{
  height: 120rpx;
  width: 120rpx;
  border-radius: 60rpx;
  overflow: hidden;
  margin-top: 200rpx;
}
.main-box{
  width: 80%;
  margin: 50rpx 0;
  padding: 50rpx 0;
  border-top: 1px solid #999;
}
.tag{
  margin: 50rpx 0;
  color: #999;
  font-size: 28rpx;
}
.but-box{
  width: 80%;
}
</style>