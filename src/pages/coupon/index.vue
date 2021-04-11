<template>
	<div class="column">
    <van-radio-group :value="couponId" @change="selectCoupon">
      <div class="box">
        <van-cell title="不使用代金卷">
          <view slot="right-icon">
            <van-radio checked-color="#4cd964" name="0"/>
          </view>
        </van-cell>
      </div>
      <div class="box" v-for="(item,index) in couponList" :key="index">
        <van-panel :title="item.price + '元代金卷'" :desc="'满'+item.explains+'元可用'" :status="'过期时间:'+item.valid_time">
          <view class="panel-view">
            <van-radio checked-color="#4cd964" :name="item.id"/>
          </view>
        </van-panel>
      </div>
    </van-radio-group>

    <van-goods-action>
      <van-goods-action-button type="primary"  text="确认使用" @click="okSelect()"/>
    </van-goods-action>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
	export default {
		data() {
			return {
        couponList: [
          {
            id: '231',
            price: 10,
            explains: '100',
            valid_time: '2021-3-12'
          },
          {
            id: '2311',
            price: 10,
            explains: '100',
            valid_time: '2021-3-12'
          }
        ],
        couponId: '0'
			}
		},
    computed:{
      ...mapGetters("signUp", {
        getCouponInfo: 'getCouponInfo'
      }),
    },
		onLoad() {
		  this.init()
		},
		methods: {
      ...mapActions("signUp", {
        setCouponInfo: 'setCouponInfo'
      }),
      okSelect(){
        if(this.couponId !== '0'){
          this.couponList.forEach(item => {
            if(this.couponId === item.id){
              this.setCouponInfo(item)
            }
          })
        }else{
          this.setCouponInfo({})
        }
        uni.navigateBack()
      },
      selectCoupon(event){
        this.couponId = event.detail
      },
		  init(){
        this.couponId = this.getCouponInfo.id
      },
      delContacts(index){
        this.delContactsInfo(index)
        this.priceTotal = this.priceTotal - this.price
      },
      toAddContacts(){}
		}
	}
</script>

<style lang="scss" scoped>
.explains{
  display: flex;
  flex-direction: column;
}
.panel-view{
  padding: 20rpx;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
