<template>
	<view class="column">
    <view class="box">
      <van-cell title="报名信息" :value="'小计：'+priceTotal+'元'" />
      <view class="row contacts-item" v-for="(item, index) in contactsList" :key="index">
        <text>{{item.name}}</text>
        <van-tag class="phone-tag"  plain type="success">{{item.phone}}</van-tag>
        <van-icon  class="right del-icon" name="delete-o" @click="delContacts(index)" />
      </view>
      <view class="row contacts-item add-contacts">
       <text @click="toAddContacts()">添加报名人</text>
      </view>
    </view>

    <div class="box">
      <van-cell title="优惠抵扣" value="小计:0元" />
      <van-cell title="代金卷" value="您有四张可用" is-link />
    </div>

    <van-goods-action>
      <view class="cost-total">总费用：{{priceTotal}}元</view>
      <van-goods-action-button type="primary"  text="立即支付"/>
    </van-goods-action>
	</view>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
	export default {
		data() {
			return {
        contactsList: [],
        price: 1314,
        priceTotal: 0
			}
		},
    computed:{
      ...mapGetters("contacts", {
        getContactsList: 'getContactsList'
      }),
    },
		onLoad() {
		  this.init()
		},
		methods: {
      ...mapActions("contacts", {
        delContactsInfo: 'delContactsInfo'
      }),
		  init(){
        this.contactsList = this.getContactsList
        this.priceTotal = this.contactsList.length * this.price
      },
      delContacts(index){
        this.delContactsInfo(index)
        this.priceTotal = this.priceTotal - this.price
      },
      toAddContacts(){
        uni.redirectTo({
          url:'/pages/add-sign-up/index'
        })
      }
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
