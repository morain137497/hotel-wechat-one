<template>
  <div class="my">
<!--    <van-tabs color="#4cd964" :active="active">-->
<!--      <van-tab v-for="(item,index) in orderNav" :key="index" :title="item.label">-->
<!--        <div class="box">-->
<!--          <van-panel title="活动名称" desc="天目山旅游活动与2021-12-12 12:12在北京市集合" status="2021-4-21 12:12">-->
<!--            <view class="panel-view">-->
<!--              <van-button type="primary" size="mini">查看详情</van-button>-->
<!--            </view>-->
<!--          </van-panel>-->
<!--        </div>-->
<!--      </van-tab>-->
<!--    </van-tabs>-->

    <div class="box" v-for="(item,index) in orderList" :key="index">
      <van-panel :title="item.title" desc="天目山旅游活动与2021-12-12 12:12在北京市集合" :status="item.create_time">
        <view class="panel-view">
          <van-tag type="primary">{{item.realname}}</van-tag>
          <van-tag type="success">{{item.phone}}</van-tag>
          <van-tag type="warning">{{item.status_pay === '0' ? '未支付' : '已支付1314元'}}</van-tag>
          <van-tag type="warning">活动{{item.state === '2' ? '报名中' : item.state === '3' ? '集合中' : item.state === '4' ? '进行中' : '已结束'}}</van-tag>
        </view>
        <view class="panel-view">
          <van-button type="primary" size="mini" v-if="item.status_cancel === '0'">取消报名</van-button>
        </view>
      </van-panel>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import auth from "../../utils/auth";
export default {
  name: "index",
  data(){
    return{
      active: 0,
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
      ],
      orderList: []
    }
  },
  computed:{
    ...mapGetters("order", {
      getCurrentActive: 'getCurrentActive'
    }),
  },
  onLoad() {
    this.init()
  },
  methods:{
    ...mapActions("order", {
      setCurrentActive: 'setCurrentActive'
    }),
    init(){
      this.active = this.getCurrentActive
      this.setCurrentActive(0)
      this.getOrderList()
    },
    async getOrderList(){
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
.border-bottom{
  border-bottom: 1px solid #f4f4f4;
}
.panel-view{
  van-tag{
    margin-left: 10rpx;
  }
}
</style>