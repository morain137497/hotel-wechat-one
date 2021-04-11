<template>
  <div class="my">
    <div class="cover">
      <img class="cover-image" :src="cover">
    </div>
    <div class="box">
      <van-cell title="昵称" value="完善个人信息" is-link/>
      <van-cell title="昵称" />
    </div>
    <div class="box">
      <van-cell title="订单" value="查看全部" is-link />
      <div class="order-nav">
        <div class="order-nav-item" v-for="(item,index) in orderNav" :key="index">
          <van-icon :name="item.icon" />
          <view>{{item.label}}</view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      cover: '../../static/banner.jpg',
      orderNav: [
        {
          label: '以付款',
          icon: 'close'
        },
        {
          label: '以结束',
          icon: 'close'
        },
        {
          label: '以取消',
          icon: 'close'
        },
        {
          label: '以改期',
          icon: 'close'
        },
        {
          label: '待改期',
          icon: 'close'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.cover{
  font-size: 0;
  .cover-image{
    width: 100%;
  }
}
.order-nav{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10rpx 0;
  .order-nav-item{
    text-align: center;
    color: #999;
    font-size: 28rpx;
  }
}
</style>