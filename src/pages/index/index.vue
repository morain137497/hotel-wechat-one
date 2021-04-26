<template>
  <div class="container">
    <div class="list">
      <div class="item">
        <div class="cover">
          <img :src="banner" mode="widthFix">
        </div>
        <div class="info">
          sdad
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
    .cover{
      font-size: 0;
      img{
        width: 100%;
      }
    }
  }
}
</style>
