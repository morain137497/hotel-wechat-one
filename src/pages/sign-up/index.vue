<template>
	<view class="column">
    <view class="box">
      <van-cell title="报名信息" :value="'小计：'+priceTotal+'元'" />
      <view class="row contacts-item" v-for="(item, index) in contactsList" :key="index">
        <text>{{item.realname}}</text>
        <van-tag class="phone-tag"  plain type="success">{{item.phone}}</van-tag>
        <van-icon  class="right del-icon" name="delete-o" @click="delContacts(index)" />
      </view>
      <view class="row contacts-item add-contacts">
       <text @click="toAddContacts()">选择联系人</text>
      </view>
    </view>

<!--    <div class="box">-->
<!--      <van-cell title="优惠抵扣" :value="'小计:' + (Object.keys(couponInfo).length == 0?0:couponInfo.price) + '元'" />-->
<!--      <van-cell title="代金卷" value="查看代金卷" is-link url="/pages/coupon/fl" />-->
<!--    </div>-->

    <div class="box">
      <van-cell title="选择集合地点"  />
      <van-radio-group :value="currentGather.index"  @change="selectGather">
        <van-cell v-for="(item,index) in gatherList" :key="index" :title="item.time + '在' + item.address + '集合'">
          <van-radio slot="right-icon" checked-color="#4cd964" :name="index"/>
        </van-cell>
      </van-radio-group>
    </div>

    <van-goods-action>
      <view class="cost-total">总费用：{{priceTotal}}元</view>
      <van-goods-action-button type="primary"  text="立即支付" @click="toPay()"/>
    </van-goods-action>
	</view>
</template>

<script>
import {APP_ID} from '../../utils/auth'
import {mapGetters,mapActions} from 'vuex'
	export default {
		data() {
			return {
        contactsList: [],
        priceTotal: 0,
        couponInfo: {},
        gatherList: [],
        currentGather: {
          index: '',
          address: '',
          time: ''
        },
        activityInfo: {}
			}
		},
    computed:{
      ...mapGetters("signUp", {
        getContactsList: 'getContactsList',
        getCouponInfo: 'getCouponInfo',
        getActivityInfo: 'getActivityInfo'
      }),
    },
		onLoad() {

		},
    onShow() {
      this.init()
    },
		methods: {
      ...mapActions("signUp", {
        delContactsInfo: 'delContactsInfo'
      }),
		  init(){
        this.contactsList = this.getContactsList
        this.activityInfo = this.getActivityInfo
        this.priceTotal = this.contactsList.length * (Number(this.activityInfo.fee) / 100)
        this.couponInfo = this.getCouponInfo
        this.gatherList = JSON.parse(this.activityInfo.gather)
      },
      delContacts(index){
        this.delContactsInfo(index)
        this.priceTotal = this.priceTotal - this.price
      },
      toAddContacts(){
        uni.navigateTo({
          url:'/pages/add-sign-up/index'
        })
      },
      selectGather(event){
        this.currentGather.index = event.detail
        this.currentGather.address = this.gatherList[event.detail].address
        this.currentGather.time = this.gatherList[event.detail].time
      },
      async toPay(){
        const params = {
          activity_id: this.activityInfo.activity_id
        }
        if(this.contactsList.length === 0){
          uni.showToast({
            title: '请选择联系人',
            duration: 2000
          });
          return
        }
        params.persons = []
        this.contactsList.forEach(item => {
          const contacts = {
            personnel_id: item.personnel_id,
            gather: JSON.stringify({
              address: this.currentGather.address,
              time: this.currentGather.time
            })
          }
          params.persons.push(contacts)
        })
        const result = await this.$api.activity.setJoinUp(params)
        if(result.code === 0) {
          const res = await this.$api.activity.toPay({pay_id: result.data.pay_id, app_id: APP_ID, jsapi: "1"})
          if(res.code === 0){
              const params = res.data
              wx.requestPayment({
                timeStamp: params.timeStamp,
                nonceStr: params.nonceStr,
                package: "prepay_id=" + JSON.parse(params.package).prepay_id,
                "signType": "RSA",
                paySign: params.paySign,
                success: (res) => {
                  uni.showToast({title: '报名成功'})
                  uni.showModal({
                    title: '提示',
                    content: '去订单页面查看?',
                    success: (res) => {
                      if (res.confirm){
                        uni.switchTab({
                          url: '/pages/order/index'
                        });
                      }
                    }
                  })
                },
                fail: (error) => {
                  console.log(error)
                },
              })
          }
        }
      },

		}
	}
</script>

<style lang="scss" scoped>
.contacts-item{
  margin: 32rpx;
  align-self: center;
  background: #f9f9f9;
  padding: 32rpx;
}
.del-icon{
  align-self: center;
}
.phone-tag{
  padding-left: 10rpx;
}
.add-contacts{
  justify-content: center;
  font-size: 24rpx;
  color: #888;
}
.cost-total{
  font-size: 24rpx;
  color: #4cd964;
  width: 50%;
  text-align: center;
}
</style>
