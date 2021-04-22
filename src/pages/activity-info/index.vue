<template>
	<view class="column activity-info">
    <view class="banner">
      <cover-image :src="activityInfo.image_uri" />
    </view>

    <div class="box">
      <div class="box-row info">
        <div class="header-image ">
          <img class="header-image" :src="activityInfo.leader_headimg" alt="">
        </div>
        <div class="ld-info">
          <div>领队:{{activityInfo.leader_name}}</div>
          <div class="activity-number van-multi-ellipsis--l3">{{activityInfo.leader_introduce}}</div>
        </div>
      </div>
      <van-cell title="开始报名时间" :value="activityInfo.begin_time" />
      <van-cell title="截至报名时间" :value="activityInfo.end_time" />
      <van-cell title="活动开始时间" :value="activityInfo.depart_time" />
      <van-cell title="活动结束时间" :value="activityInfo.finish_time"/>
      <van-cell title="活动起点城市" :value="activityInfo.start" />
      <van-cell title="活动终点城市" :value="activityInfo.end" />
      <van-cell title="最多报名人数" :value="activityInfo.attend_max" />
      <van-cell title="最少成对人数" :value="activityInfo.attend_min" />
    </div>

    <div class="box">
      <van-cell title="已经参加的人" :value="'已报名' + activityInfo.attend_suc + '人'"  is-link :url="'/pages/sign-up-user-list/index?activity_id=' + activityInfo.activity_id"/>
      <div class="box-row join-list">
        <div class="join-item" v-for="(item,index) in attends" :key="index">
          <img class="header-image" :src="item.headimg" alt="">
          <div>{{item.nickname}}</div>
        </div>
      </div>
    </div>

    <div class="box">
      <van-cell title="活动详情" />
      <div class="box-row" v-html="activityInfo.content">
      </div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="friends-o" text="微信群号" @click="inGroup()"  />
      <van-goods-action-icon icon="phone-o" text="联系领队"  @click="callPhone()"/>
      <van-goods-action-button type="primary"  text="我要报名" @click="toJoin()"/>
    </van-goods-action>
  </view>
</template>

<script>
import {mapActions} from 'vuex'
  export default {
		data() {
			return {
        activityInfo: {},
        articleInfo: {},
        attends: []
			}
		},
		onLoad(params) {
      this.getActivityInfo(params.activity_id)
		},
		methods: {
      ...mapActions("signUp", {
        setActivityInfo: 'setActivityInfo'
      }),
		  async getActivityInfo(activity_id){
        const result = await this.$api.activity.activityInfo({
          activity_id: activity_id
        })
        this.activityInfo = result.data.activity
        this.articleInfo = result.data.acticle
        this.attends = result.data.attends
        this.activityInfo.attend_suc = this.activityInfo.attend_suc?this.activityInfo.attend_suc:'0'
      },
      inGroup() {
        uni.setClipboardData({data: '2121'})
      },
      callPhone(){
        uni.makePhoneCall({phoneNumber: '15893316477'});
      },
      toJoin(){
        this.setActivityInfo(this.activityInfo)
        uni.navigateTo({
          url: '/pages/sign-up/index'
        });
      }
		}

	}
</script>

<style lang="scss" scoped>
.activity-info{
  padding-bottom: 100rpx;
}
.ld-info{
  padding-top: 16rpx;
  padding-left: 20rxp ;
  font-size: 28rpx ;
  .activity-number{
    color: #999;
    font-size: 24rpx;
  }
}
.join-list{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .join-item{
    text-align: center;
  }
}
</style>
