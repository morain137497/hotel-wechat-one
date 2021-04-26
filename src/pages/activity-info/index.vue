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
    </div>

    <div class="box">
      <van-cell title="活动信息"  />
      <van-cell class="cell-my" title="活动标题" :value="activityInfo.title" :border="false"/>
      <van-cell :title="'活动价格 ：' + (Number(activityInfo.fee) / 100) + '元/人'" :value="'活动状态：' + activityInfo.state === '1' ? '还未开始' : activityInfo.state === '2' ? '报名中' : '---'" :border="false"/>
      <van-cell :title="'开始报名 ：' + getDate(activityInfo.begin_time)" :value="'截至报名：' + getDate(activityInfo.end_time)" :border="false"/>
      <van-cell :title="'开始时间 ：' + getDate(activityInfo.depart_time)" :value="'结束时间：' + getDate(activityInfo.finish_time)" :border="false"/>
      <van-cell :title="'出发地 ：' + activityInfo.start" :value="'目的地：' + activityInfo.end" :border="false"/>
      <van-cell :title="'召集人数 ：' + activityInfo.attend_max + '人'" :value="'成行人数：' + activityInfo.attend_min + '人'" :border="false"/>
    </div>

    <div class="box" v-if="activityInfo.attend_suc !== '0'">
      <van-cell title="已经参加的人" :value="'已报名' + activityInfo.attend_suc + '人'"  is-link :url="'/pages/sign-up-user-list/index?activity_id=' + activityInfo.activity_id"/>
      <div class="box-row join-list">
        <div class="join-item" v-for="(item,index) in attends" :key="index">
          <img class="header-image" :src="item.headimg" alt="">
          <div>{{item.personnel_id}}</div>
        </div>
      </div>
    </div>

    <div class="box">
      <van-tabs color="#4cd964">
        <van-tab title="报名须知">
          <div class="text" v-html="activityInfo.content"></div>
        </van-tab>
        <van-tab title="退款规则">
          <div class="text" v-html="activityInfo.content"></div>
        </van-tab>
        <van-tab title="活动详情">
          <div class="text" v-html="activityInfo.content"></div>
        </van-tab>
      </van-tabs>
    </div>
    <van-goods-action style="z-index:999">
<!--      <van-goods-action-icon icon="friends-o" text="微信群号" @click="inGroup()"  />-->
      <van-goods-action-icon icon="phone-o" text="联系领队"  @click="callPhone()"/>
      <van-goods-action-button type="primary"  :text="activityInfo.state === '1' ? '活动还未开始' : activityInfo.state === '2' ? '去报名' : '---'" @click="toJoin()" :disabled="activityInfo.state !== '2'"/>
    </van-goods-action>
  </view>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {getDate} from "../../utils/date"
  export default {
		data() {
			return {
        activityInfo: {},
        articleInfo: {},
        attends: [],
        userInfo: {},
			}
		},
    computed:{
      ...mapGetters("user", {
        getUserInfo: 'getUserInfo'
      }),
    },
		onLoad(params) {
      this.getActivityInfo(params.activity_id)
      this.userInfo = this.getUserInfo
      console.log(this.userInfo)
		},
		methods: {
      ...mapActions("signUp", {
        setActivityInfo: 'setActivityInfo'
      }),
      getDate,
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
        uni.makePhoneCall({phoneNumber: this.activityInfo.leader_phone});
      },
      toJoin(){
        if(Object.keys(this.userInfo).length === 0){
          uni.navigateTo({
            url: '/pages/login/index'
          })
        } else {
          this.setActivityInfo(this.activityInfo)
          uni.navigateTo({
            url: '/pages/sign-up/index'
          });
        }
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
.text{
  width: 96%;
  margin: 20rpx auto;
}
</style>
