<template>
	<view class="column">
    <view class="banner">
      <cover-image :src="activityInfo.banner" />
    </view>

    <div class="box">
      <div class="box-row info">
        <div class="header-image ">
          <img class="header-image" src="../../static/banner.jpg" alt="">
        </div>
        <div class="ld-info">
          <div>姓名:向南</div>
          <div class="activity-number">主导活动数量:108</div>
        </div>
        <div class="right">1314元/人</div>
      </div>
      <van-cell title="开始报名时间:2021-3-23" value="截至报名时间:2021-2-4" :border="false"/>
      <van-cell title="活动集合时间:2021-3-23" value="活动天数:5天"  :border="false"/>
      <van-cell title="活动集合地点:河南省郑州市金水区二七广场"  :border="false"/>
      <van-cell title="活动成队人数:5人"  value="最大参与人数:20人" :border="false"/>
    </div>

    <div class="box">
      <van-cell title="已经参加的人" value="总共18/20人"  is-link/>
      <div class="box-row join-list">
        <div class="join-item">
          <img class="header-image" src="../../static/banner.jpg" alt="">
          <div>姓名</div>
        </div>
        <div class="join-item">
          <img class="header-image" src="../../static/banner.jpg" alt="">
          <div>姓名</div>
        </div>
        <div class="join-item">
          <img class="header-image" src="../../static/banner.jpg" alt="">
          <div>姓名</div>
        </div>
        <div class="join-item">
          <img class="header-image" src="../../static/banner.jpg" alt="">
          <div>姓名</div>
        </div>
        <div class="join-item">
          <img class="header-image" src="../../static/banner.jpg" alt="">
          <div>姓名</div>
        </div>
      </div>
    </div>

    <div class="box">
      <van-cell title="活动详情" />
      <div class="box-row">
        dsadasdas
        dasd
        asd
        dasd
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
  export default {
		data() {
			return {
        activityInfo: {
          banner: '../../static/banner.jpg',
          title: '最美旅游'
        },
        activityNav:[
          {
            label:'活动详情',
            index:0,
            content:'活动详情活动详情活动详情'
          },
          {
            label:'报名须知',
            index:1,
            content:'报名须知报名须知报名须知'
          },
          {
            label:'活动摄影',
            index:2,
            content:'活动摄影活动摄影活动摄影'
          },
          {
            label:'历史活动',
            index:3,
            content:'历史活动历史活动历史活动'
          }
        ],
			}
		},
		onLoad() {

		},
    onReachBottom(){
    },
		methods: {
      inGroup() {
        uni.setClipboardData({data: '2121'})
      },
      callPhone(){
        uni.makePhoneCall({phoneNumber: '15893316477'});
      },
      toJoin(){
        uni.navigateTo({
          url: '/pages/sign-up/index'
        });
      }
		}

	}
</script>

<style lang="scss" scoped>
.ld-info{
  padding-left: 20rpx;
  .activity-number{
    color: #999;
  }
}
.info{
  align-items: center;
  justify-content: center;
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
