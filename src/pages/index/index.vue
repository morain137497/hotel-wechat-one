<template>
  <div class="container">
    <div class="list">
      <div class="item">
        <div class="cover">
          <img :src="banner" mode="widthFix">
          <div class="zz">
            <span class="start-city">杭州出发</span>
            <span class="days">2天</span>
          </div>
        </div>
        <div class="info">
          <div class="time">2021-03-24 --- 2021-03-28</div>
          <div class="title van-multi-ellipsis--l2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
          <div class="price">1314元/人</div>
        </div>
      </div>
      <div class="item">
        <div class="cover">
          <img :src="banner" mode="widthFix">
          <div class="zz">
            <span class="start-city">杭州出发</span>
            <span class="days">2天</span>
          </div>
        </div>
        <div class="info">
          <div class="time">2021-03-24 --- 2021-03-28</div>
          <div class="title van-multi-ellipsis--l2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
          <div class="price">1314元/人</div>
        </div>
      </div>
      <div class="item">
        <div class="cover">
          <img :src="banner" mode="widthFix">
          <div class="zz">
            <span class="start-city">杭州出发</span>
            <span class="days">2天</span>
          </div>
        </div>
        <div class="info">
          <div class="time">2021-03-24 --- 2021-03-28</div>
          <div class="title van-multi-ellipsis--l2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
          <div class="price">1314元/人</div>
        </div>
      </div>
      <div class="item">
        <div class="cover">
          <img :src="banner" mode="widthFix">
          <div class="zz">
            <span class="start-city">杭州出发</span>
            <span class="days">2天</span>
          </div>
        </div>
        <div class="info">
          <div class="time">2021-03-24 --- 2021-03-28</div>
          <div class="title van-multi-ellipsis--l2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
          <div class="price">1314元/人</div>
        </div>
      </div>
      <div class="item">
        <div class="cover">
          <img :src="banner" mode="widthFix">
          <div class="zz">
            <span class="start-city">杭州出发</span>
            <span class="days">2天</span>
          </div>
        </div>
        <div class="info">
          <div class="time">2021-03-24 --- 2021-03-28</div>
          <div class="title van-multi-ellipsis--l2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
          <div class="price">1314元/人</div>
        </div>
      </div>
      <div class="item">
        <div class="cover">
          <img :src="banner" mode="widthFix">
          <div class="zz">
            <span class="start-city">杭州出发</span>
            <span class="days">2天</span>
          </div>
        </div>
        <div class="info">
          <div class="time">2021-03-24 --- 2021-03-28</div>
          <div class="title van-multi-ellipsis--l2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
          <div class="price">1314元/人</div>
        </div>
      </div>
      <div class="item">
        <div class="cover">
          <img :src="banner" mode="widthFix">
          <div class="zz">
            <span class="start-city">杭州出发</span>
            <span class="days">2天</span>
          </div>
        </div>
        <div class="info">
          <div class="time">2021-03-24 --- 2021-03-28</div>
          <div class="title van-multi-ellipsis--l2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
          <div class="price">1314元/人</div>
        </div>
      </div>
      <div class="item">
        <div class="cover">
          <img :src="banner" mode="widthFix">
          <div class="zz">
            <span class="start-city">杭州出发</span>
            <span class="days">2天</span>
          </div>
        </div>
        <div class="info">
          <div class="time">2021-03-24 --- 2021-03-28</div>
          <div class="title van-multi-ellipsis--l2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>
          <div class="price">1314元/人</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import page from "../../utils/page";
  export default {
		data() {
			return {
			  currentActivityType: 0,
        activityList: [],
        isLoad: false,
        isHavData: true,
        loadText: '. . . 正在加载 . . .',
        banner: '../../static/banner.jpg'
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
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFF;
}
.list{
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
</style>
