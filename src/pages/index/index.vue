<template>
	<view class="row" v-if="city">
    <van-sidebar class="sidebar" :active-key="currentActivityType" @change="changeActivityType">
      <van-sidebar-item v-for="(item,index) in activityType" :key="index" :title="item.label" />
    </van-sidebar>
    <view class="activity-list">
      <navigator hover-class="none" class="activity-item" v-for="(item,index) in activityList" :key="index" :url="'/pages/activity-info/index?activity_id='+item.activity_id">
        <view class="cover">
          <cover-image src="../../static/banner.jpg" class="border-radius-image-1" />
        </view>
        <view class="info">
          <text class="title van-multi-ellipsis--l2">{{item.title}}</text>
          <view class="row">
            <text class="time">报名时间:{{item.depart_time}}</text>
            <text class="price right">￥1314</text>
          </view>
        </view>
      </navigator>
    </view>
	</view>
</template>

<script>
	import page from "../../utils/page";
	import {wechatLocation} from '../../utils/auth'
  export default {
		data() {
			return {
			  currentActivityType: 0,
        city: '',
        activityType: [
          {label: '周边活动'},
          {label: '长线活动'}
        ],
        activityList: [

        ]
			}
		},
    async onLoad() {
      await this.$onLaunched;
		  await wechatLocation((city) => {
		    this.city = city
        this.getActivityList()
      })
		},
		methods: {
      changeActivityType(index){
      },
      async getActivityList(){
        const result = await this.$api.activity.activityList({
          offset: '0',
          count: '4',
        })
        this.activityList = result.data
      }
		}
	}
</script>

<style lang="scss" scoped>
.sidebar{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
}
.row{
  align-items: flex-start;
}
.activity-list{
  background: #FFF;
  padding: 30rpx;
  margin-left: 150rpx;
  .activity-item{
    margin-bottom: 20rpx;
    .info{
      padding: 10rpx;
      font-weight: bold;
      font-size: 28rpx;
      .title{
        color: #222;
      }
      .time{
        font-weight: 400;
        font-size: 24rpx;
        color: #999;
      }
      .price{
        color: red;
      }
    }
  }
}

</style>
