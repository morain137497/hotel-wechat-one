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
        <van-cell title="用户编号" :value="vipInfo.user_id" />
        <van-cell title="参与活动数量" :value="vipInfo.attend_cnt" />
        <van-cell title="参与活动折扣" :value="vipInfo.discount + '%'" />
        <van-cell title="VIP等级" :value="vipInfo.level" />
      </div>

      <div class="box">
        <van-cell title="正在集合中的活动" :border="false"/>
        <van-panel v-for="(item, index) in activityList" :key="index" :title="item.title" :desc="'终点：' + item.end" :status="item.attend_suc?item.attend_suc:0 + '人报名成功'">
          <view class="panel-view">
            <van-button type="primary" size="mini" @click="toGatherList(item.activity_id)">查看报名用户</van-button>
          </view>
        </van-panel>
      </div>

<!--      <div class="box">-->
<!--        <van-cell title="订单" value="查看全部" is-link />-->
<!--        <div class="order-nav">-->
<!--          <div class="order-nav-item" v-for="(item,index) in orderNav" :key="index" @click="toOrder(index)">-->
<!--            <van-icon :name="item.icon" />-->
<!--            <view>{{item.label}}</view>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
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
      phone: '',
      vipInfo: {},
      activityList: []
    }
  },
  computed:{
    ...mapGetters("user", {
      getUserInfo: 'getUserInfo'
    }),
  },
  onLoad(){
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
    },
    init(){
      this.userInfo = this.getUserInfo
      this.getVipInfo()
      this.gatherActivityList()
    },
    toGatherList(activityId){
      uni.navigateTo({
        url: '/pages/gather-list/index?activityId='+activityId
      });
    },
    toOrder(index){
      this.setCurrentActive(index)
      uni.switchTab({url: '/pages/order/index'})
    },
    async getVipInfo(){
      const result = await this.$api.user.getVipInfo()
      if(result.code === 0){
        this.vipInfo = result.data
      }
    },
    async gatherActivityList(){
      const result = await this.$api.activity.userCreateActivityList({
        offset: '0',
        count: '1000',
        ongoing: '1'
      })
      if(result.code === 0 && result.data !== null) {
        this.activityList = result.data
      }
    }
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