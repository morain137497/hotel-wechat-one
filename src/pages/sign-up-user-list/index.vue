<template>
	<div class="column">
   <div class="box">
     <van-cell title="领队" />
     <div class="user-list">
       <div class="user-item">
         <img class="header-image" src="../../static/banner.jpg" />
         <view>向南</view>
       </div>
     </div>
   </div>
    <div class="box">
      <van-cell title="队友" />
      <div class="user-list">
        <div class="user-item" v-for="(item,index) in userList" :key="index">
          <img class="header-image" :src="item.header_image" />
          <view>{{item.name}}</view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
        userList: [
          {
            id: '231',
            name: '向南',
            header_image: '../../static/banner.jpg',
          },
          {
            id: '231',
            name: '向南',
            header_image: '../../static/banner.jpg',
          },
          {
            id: '231',
            name: '向南',
            header_image: '../../static/banner.jpg',
          },
          {
            id: '231',
            name: '向南',
            header_image: '../../static/banner.jpg',
          },
          {
            id: '231',
            name: '向南',
            header_image: '../../static/banner.jpg',
          },
          {
            id: '231',
            name: '向南',
            header_image: '../../static/banner.jpg',
          },
          {
            id: '231',
            name: '向南',
            header_image: '../../static/banner.jpg',
          },
          {
            id: '231',
            name: '向南',
            header_image: '../../static/banner.jpg',
          }
        ],
			}
		},

		onLoad() {

		},
		methods: {

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
