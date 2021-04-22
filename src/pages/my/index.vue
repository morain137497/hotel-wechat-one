<template>
  <div class="main">
    <div class="my" v-if="Object.keys(userInfo).length !== 0">
      <div class="box">
        <div class="box-row user-info">
          <img :src="userInfo.headimg" class="user-image">
          <div class="user-nick">
            <h3>{{userInfo.nickname}}</h3>
          </div>
        </div>
      </div>
      <div class="box">
        <van-cell title="订单" value="查看全部" is-link />
        <div class="order-nav">
          <div class="order-nav-item" v-for="(item,index) in orderNav" :key="index" @click="toOrder(index)">
            <van-icon :name="item.icon" />
            <view>{{item.label}}</view>
          </div>
        </div>
      </div>
    </div>
    <auth-dialog @wechatUserInfoSuccess="wechatUserInfoSuccess" v-if="Object.keys(userInfo).length === 0"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import authDialog from '../auth-dialog'
export default {
  name: "index",
  components: {authDialog},
  data(){
    return{
      orderNav: [
        {
          label: '以付款',
          icon: 'close'
        },
        {
          label: '以结束',
          icon: 'close'
        },
        {
          label: '以取消',
          icon: 'close'
        },
        {
          label: '以改期',
          icon: 'close'
        },
        {
          label: '待改期',
          icon: 'close'
        }
      ],
      userInfo: {},
      phone: ''
    }
  },
  computed:{
    ...mapGetters("user", {
      getUserInfo: 'getUserInfo'
    }),
  },
  onShow(){
    this.init()
  },
  methods:{
    ...mapActions("order", {
      setCurrentActive: 'setCurrentActive'
    }),
    ...mapActions("user", {
      setUserInfo: 'setUserInfo'
    }),
    wechatUserInfoSuccess(){
      this.init()
      console.log(this.userInfo)
      console.log(this.getUserInfo)
    },
    init(){
      this.userInfo = this.getUserInfo

    },
    toOrder(index){
      this.setCurrentActive(index)
      uni.switchTab({url: '/pages/order/index'})
    },
  }
}
</script>

<style scoped lang="scss">
.user-info{
  align-items: center;
  .login-text{
    background: #4cd964;
    color: #FFF;
    padding: 6rpx 10rpx;
    border-radius: 20rpx;
    font-size: 24rpx;
    margin-top: 10rpx;
  }
}
.user-image{
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
}
.user-nick{
  margin-left: 20rpx;
}
.order-nav{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10rpx 0;
  .order-nav-item{
    text-align: center;
    color: #999;
    font-size: 28rpx;
  }
}

</style>