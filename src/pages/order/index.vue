<template>
  <div class="my">
    <van-tabs color="#4cd964">
      <van-tab v-for="(item,index) in orderNav" :key="index" :title="item.label">
        <div class="box">
          <van-panel title="活动名称" desc="天目山旅游活动与2021-12-12 12:12在北京市集合" status="2021-4-21 12:12">
            <view class="panel-view">
              <van-button type="primary" size="mini">查看详情</van-button>
            </view>
          </van-panel>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
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

</style>