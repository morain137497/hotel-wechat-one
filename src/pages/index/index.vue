<template>
	<view class="row" v-if="city">
    <van-sidebar class="sidebar" :active-key="currentActivityType" @change="changeActivityType">
      <van-sidebar-item v-for="(item,index) in activityType" :key="index" :title="item.label" />
    </van-sidebar>
    <view class="activity-list">
      <navigator hover-class="none" class="activity-item"   v-if="activityList.length !== 0" v-for="(item,index) in activityList" :key="index" :url="'/pages/activity-info/index?activity_id='+item.activity_id">
        <view class="cover">
          <img src="../../static/banner.jpg" class="border-radius-image-1" />
        </view>
        <view class="info">
          <text class="title van-multi-ellipsis--l2">{{item.title}}</text>
          <view class="row">
            <text class="time">报名时间:{{item.depart_time}}</text>
            <text class="price right">￥{{ Number(item.fee) / 100 }}/人</text>
          </view>
        </view>
      </navigator>
      <div class="load-box" v-if="(isLoad || !isHavData) && activityList.length !== 0">
        {{ loadText }}
      </div>
      <van-empty class="empty-my" v-if="activityList.length === 0" description="暂无数据" />
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
        activityList: [],
        isLoad: false,
        isHavData: true,
        loadText: '. . . 正在加载 . . .'
			}
		},
    async onLoad() {
      await this.$onLaunched;
		  await wechatLocation((city) => {
		    this.city = city
        this.getActivityList()
      })
		},
    onReachBottom(){
      if(!this.isLoad){
        this.isLoad = true
        this.getActivityList()
      }
    },
		methods: {
      changeActivityType(index){
      },
      async getActivityList(){
        const result = await this.$api.activity.activityList({
          offset: this.activityList.length.toString(),
          count: page.PAGE_SIZE
        })
        if(result.code === 0 && result.data !== null) {
          this.activityList = this.activityList.concat(result.data)
          this.isLoad = false
        } else {
          this.loadText = ". . . 没有更多数据 . . ."
          this.isHavData = false
        }
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
  width: 100%;
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
.load-box{
  text-align: center;
  color: #999;
  font-size: 12px;
}
.cover{
  img{
    height: 300rpx;
  }
}
</style>
