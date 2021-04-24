<template>
  <div class="my">
    <template v-if="userList.length !== 0">
      <div class="box" v-for="(item,index) in userList" :key="index">
        <van-panel :title="item.realname" desc="2021-12-12 12:12在北京市集合" :status="item.status_gather === '0' ? '未集合' : '已经集合'">
          <view class="panel-view">
            <van-button type="primary" size="mini" @click="callPhone(item.owner)">打电话</van-button>
            <van-button type="primary" size="mini" v-if="item.status_gather === '0'" @click="gather(index)">已经集合</van-button>
          </view>
        </van-panel>
      </div>
    </template>
    <van-empty v-if="userList.length === 0" description="暂无数据" />
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      active: 0,
      userList: [],
      activityId: '0'
    }
  },
  onLoad(options) {
    this.activityId = options.activityId
    this.init()
  },
  methods:{
    init(){
      this.getUserList()
    },
    callPhone(phone){
      uni.makePhoneCall({phoneNumber: phone});
    },
    async gather(index){
      const result = await this.$api.activity.setGather({attend_id: this.userList[index].attend_id})
      if(result.code === 0){
        this.userList[index].status_gather = '1'
        uni.showToast({
          title: '操作成功'
        })
      }
    },
    async getUserList(){
      const result = await this.$api.activity.signUpUserList({
        offset:"0",
        count:"1000000",
        activity_id: this.activityId,
        status: '4'
      })
      if(result.code === 0 && result.data != null){
        this.userList = result.data
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