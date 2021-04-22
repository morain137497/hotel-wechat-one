<template>
  <div class="my">
    <div class="box" v-for="(item,index) in orderList" :key="index">
      <van-panel title="申公豹" desc="2021-12-12 12:12在北京市集合" status="还未集合">
        <view class="panel-view">
          <van-button type="primary" size="mini">打电话</van-button>
          <van-button type="primary" size="mini">已经集合</van-button>
        </view>
      </van-panel>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      active: 0,
      orderList: []
    }
  },
  onLoad() {
    this.init()
  },
  methods:{
    init(){
      this.getUserList()
    },
    async getUserList(){
      const result = await this.$api.activity.orderList({
        offset:"0",
        count:"1000000"
      })
      if(result.code === 0){
        this.orderList = result.data
      }
    }
  }
}
</script>

<style scoped lang="scss">
.panel-view{
  van-button{
    margin-left: 20rpx;
  }
}
</style>