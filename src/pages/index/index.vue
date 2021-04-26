<template>
  <div class="container">
    <div class="swiper-box">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item>
          <img :src="banner" >
        </swiper-item>
        <swiper-item>
          <img :src="banner" >
        </swiper-item>
        <swiper-item>
          <img :src="banner" >
        </swiper-item>
      </swiper>
    </div>


    <div class="list">
      <div class="item" v-for="(item,index) in activityList" :key="index">
        <navigator hover-class="none" :url="'/pages/activity-info/index?activity_id='+item.activity_id">
          <div class="cover">
            <img :src="item.image_uri" mode="widthFix">
            <div class="zz">
              <span class="start-city">{{item.start}}出发</span>
              <span class="days">{{item.days}}天</span>
            </div>
          </div>
          <div class="info">
            <div class="time">{{getDate(item.depart_time)}} --- {{getDate(item.finish_time)}}</div>
            <div class="title van-multi-ellipsis--l2">{{item.title}}</div>
            <div class="price">{{ Number(item.fee) / 100 }}元/人</div>
          </div>
        </navigator>
      </div>
    </div>
    <div class="load-box" v-if="isLoad || !isHavData">
      {{loadText}}
    </div>


  </div>


</template>

<script>
	import page from "../../utils/page";
	import {getDate} from "../../utils/date"
  export default {
		data() {
			return {
			  currentActivityType: 0,
        activityList: [],
        isLoad: false,
        isHavData: true,
        loadText: '. . . 正在加载 . . .',
        banner: '../../static/banner.jpg',
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500
			}
		},
    async onLoad() {
      this.getActivityList()
		},
    onReachBottom(){
      if(!this.isLoad){
        this.isLoad = true
        this.getActivityList()
      }
    },
		methods: {
      getDate,
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
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFF;
}
.list{
  margin-top: 20rpx;
  width: 96%;
  column-count: 2;
  column-gap: 20rpx;
  .item{
    break-inside: avoid;
    padding-bottom: 20rpx;
    font-size: 24rpx;
    .cover{
      position: relative;
      border-radius: 12rpx;
      overflow: hidden;
      img{
        width: 100%;
        border-radius: 12rpx;
      }
      .zz{
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(000,000,000,.5);
        width: 100%;
        color: #FFF;
        display: flex;
        padding: 8rpx 0;
        .days{
          margin-left: auto;
          padding-right: 4rpx;
        }
      }
    }
    .time,.title,.price{
      padding: 4rpx;
    }
    .price{
      color: red;
      text-align: right;
    }
  }
}
.load-box{
  padding: 40rpx 0;
}
.swiper-box{
  overflow: hidden;
  height: 300rpx;
  font-size: 0;
  width: 96%;
  border-radius: 12rpx;
  img{
    height: 100%;
    width: 100%;
  }
}
</style>
