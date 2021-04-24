<template>
  <div class="my">
<!--    <van-tabs color="#4cd964" :active="active" @change="changeOrderStatus">-->
<!--      <van-tab v-for="(item,index) in orderNav" :key="index" :title="item.label">-->
        <template v-if="orderList.length !== 0">
          <div class="box" v-for="(item,index) in orderList" :key="index">
            <van-panel :title="item.title" desc="天目山旅游活动与2021-12-12 12:12在北京市集合" :status="item.create_time">
              <view class="panel-view">
                <van-tag type="success">{{item.realname}}</van-tag>
                <van-tag type="success">{{item.phone}}</van-tag>
                <van-tag type="warning" v-if="item.state === '2' || (item.state !== '2' && item.status_pay === '1')">{{item.status_pay === '0' ? '未支付' : '已支付0.01元'}}</van-tag>
                <van-tag type="warning" v-if="item.state !== '2' && item.status_pay === '0'">未支付，报名取消</van-tag>
                <!--          <van-tag type="warning" v-if="item.expire_time > 0 && item.status_pay === '0'"><van-count-down :time="item.expire_time" />过期</van-tag>-->
                <van-tag type="warning">活动{{item.state === '2' ? '报名中' : item.state === '3' ? '集合中' : item.state === '4' ? '进行中' : '已结束'}}</van-tag>
              </view>
              <view class="panel-view" v-if="item.state === '2'">
                <van-button type="primary" size="mini" v-if="item.status_cancel === '0'" @click="cancelSignUp(item.attend_id, index)">取消报名</van-button>
                <van-button type="primary" size="mini" v-if="item.status_pay === '0' && item.status_cancel === '0'" @click="toPay(item)">去支付</van-button>
              </view>
            </van-panel>
          </div>
        </template>
        <van-empty v-if="orderList.length === 0" description="暂无数据" />
<!--      </van-tab>-->
<!--    </van-tabs>-->
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
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
        }
      ],
      orderList: [],
      status: '4'
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
    changeOrderStatus(value){
      if(value.detail.index === 0){
        this.status = '4';
      }
      if(value.detail.index === 1){
        this.status = '16';
      }
      if(value.detail.index === 2){
        this.status = '0';
      }
      this.getOrderList()
    },
    toPay(item){
      console.log(item)
    },
    cancelSignUp(attend_id, index){
      uni.showModal({
        title: '提示',
        content: '您确定要取消此次活动吗?',
        success: (res) => {
          if (res.confirm){
            this.$api.activity.cancelSignUp({attend_id: attend_id})
            .then(res => {
              if(res.code === 0){
                this.orderList.splice(index, 1)
                uni.showToast({title: '取消成功'})
              }
            })
          }
        }
      })
    },
    init(){
      this.active = this.getCurrentActive
      this.setCurrentActive(0)
      this.getOrderList()
    },
    async getOrderList(){
      const result = await this.$api.activity.orderList({
        offset:"0",
        count:"1000000"
        // status: this.status
      })
      if(result.code === 0 && result.data !== null){
        this.orderList = result.data
        // this.orderList.forEach(item => {
        //   item.expire_time = ((new Date(item.create_time).getTime() + (2*60*60*1000)) - new Date().getTime())
        // })
      } else {
        this.orderList = []
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
    margin-left: 6rpx;
  }
}
.van-count-down{
  color: #FFF !important;
  font-size: 12px !important;
  line-height: 12px !important;
}
</style>