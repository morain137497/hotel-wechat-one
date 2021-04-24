<template>
  <van-dialog
      use-slot
      :show-confirm-button="false"
      :show="!authUserInfo">
    <div class="dialog-content">
      {{text}}
    </div>
    <div class="dialog-action">
      <button type="primary" v-if="authPhone && !authUserInfo"  @click="getWechatUserInfo()">授权获取用户信息</button>
      <button type="primary" v-if="!authPhone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定手机号</button>
    </div>
  </van-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
import {wechatUserInfo, bindPhone} from '../../utils/auth'
export default {
  name: "index",
  data(){
    return{
      userInfo: {},
      text: '绑定手机号，及时接收旅游信息',
      authUserInfo: false,
      authPhone: false,
      phone: ''
    }
  },
  computed:{
    ...mapGetters("user", {
      getUserInfo: 'getUserInfo',
      getPhone: 'getPhone'
    }),
  },
  methods:{
    getPhoneNumber (e){
      bindPhone(e, () => {
        this.authPhone = true
        this.text = '授权获取用户信息，领取旅游大礼包'
      })
    },
    getWechatUserInfo(){
      if(!this.userInfo.nickname){
        wechatUserInfo((result) => {
          this.userInfo = result
          this.authUserInfo = true
          this.$emit('wechatUserInfoSuccess')
        })
    }
    }
  },
  mounted() {
    this.userInfo = this.getUserInfo
    this.phone = this.getPhone
    if(this.phone){
      // this.authPhone = true
      this.text = '授权获取用户信息，领取旅游大礼包'
    }
    if(Object.keys(this.userInfo).length !== 0){
     // this.authUserInfo = true
    }
  }
}
</script>

<style scoped lang="scss">
.dialog-content{
  padding: 80rpx 60rpx 20rpx 60rpx;
  text-align: center;
}
.dialog-action{
  width: 80%;
  margin: 40rpx auto;
}
</style>