<template>
	<div class="column">
    <van-checkbox-group >
      <div class="box">
        <div class="box-row">
          <div class="explains">
            <div>10元代金卷</div>
            <div>满100元可用</div>
            <div>过期时间:2021-3-12</div>
          </div>
          <van-checkbox class="right checkbox"  checked-color="#4cd964"/>
        </div>
      </div>
    </van-checkbox-group>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
	export default {
		data() {
			return {
        couponList: [
          {
            id: '231',
            price: 10,
            explains: '说明',
            valid_time: '2021-3-12 - 2021-3-24'
          },
          {
            id: '231',
            price: 10,
            explains: '说明',
            valid_time: '2021-3-12 - 2021-3-24'
          }
        ]
			}
		},
    computed:{
      ...mapGetters("contacts", {
        getContactsList: 'getContactsList'
      }),
    },
		onLoad() {
		  this.init()
		},
		methods: {
      ...mapActions("contacts", {
        delContactsInfo: 'delContactsInfo'
      }),
		  init(){
        this.contactsList = this.getContactsList
        this.priceTotal = this.contactsList.length * this.price
      },
      delContacts(index){
        this.delContactsInfo(index)
        this.priceTotal = this.priceTotal - this.price
      },
      toAddContacts(){
        uni.redirectTo({
          url:'/pages/add-sign-up/index'
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
.box-row{
}
.explains{
  display: flex;
  flex-direction: column;
}
.checkbox{
  align-self: center;
}
</style>
