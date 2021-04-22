<template>
	<div class="column">
    <div class="box">
      <van-cell title="队友" />
      <div class="user-list">
        <div class="user-item" v-for="(item,index) in userList" :key="index">
          <img class="header-image" :src="item.headimg" />
          <view>{{item.nickname}}</view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
        userList: [],
			}
		},
		onLoad(params) {
      this.getList(params.activity_id)
		},
		methods: {
		  async getList(activity_id){
        const result = await this.$api.activity.signUpUserList({
          activity_id: activity_id,
          offset: '0',
          count: '100000',
        })
        this.userList = result.data
      }
    }
	}
</script>

<style lang="scss" scoped>
.user-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.user-item{
  width: 20%;
  text-align: center;
  margin: 20rpx 0;
}
</style>
