<template>
	<view class="row">
    <van-sidebar :active-key="currentActivityType" @change="changeActivityType">
      <van-sidebar-item v-for="(item,index) in activityType" :key="index" :title="item.label" />
    </van-sidebar>
    <view class="activity-list">
      <navigator hover-class="none" class="activity-item" v-for="(item,index) in activityList" :key="index" url="/pages/activity-info/index">
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

  export default {
		data() {
			return {
			  currentActivityType: 0,
        activityType: [
          {label: '周边活动'},
          {label: '长线活动'}
        ],
        activityList: [
          {
            activity_id: '231',
            title: '2312321',
            depart_time: '2021-12-23',

          },
          {
            activity_id: '231',
            title: '2312321',
            depart_time: '2021-12-23'
          }
        ]
			}
		},
		onLoad() {
      this.getActivityList()
		},
		methods: {
      changeActivityType(index){
      },
      async getActivityList(){
        const result = await this.$api.activity.activityList({
          offset: '0',
          count: page.PAGE_SIZE
        })
        console.log(result)
      }
		}
	}
</script>

<style lang="scss" scoped>
.row{
  align-items: flex-start;
}
.activity-list{
  background: #FFF;
  padding: 30rpx;
  .activity-item{
    .info{
      padding: 20rpx;
      font-weight: bold;
      font-size: 28rpx;
      .title{
        color: #222;
      }
      .time{
        font-weight: 400;
        font-size: 24rpx;
      }
      .price{
        color: red;
      }
    }
  }
}
</style>
