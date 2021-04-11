<template>
  <view class="column">
    <view class="box">
      <view class="row contacts-item add-contacts" @click="contacts(-1)">
        <text>添加联系人</text>
      </view>
    </view>
    <van-checkbox-group :value="checkboxList" @change="selectContacts">
      <view class="box item" v-for="(item,index) in list" :lang="index">
        <van-cell :title="item.name">
          <view slot="right-icon">
            <van-icon  class="right del-icon" name="delete-o" @click="delContacts(index)" />
          </view>
        </van-cell>
        <view class="row contacts-item">
          <view class="column">
            <text>手机号：{{item.phone}}</text>
            <text>身份证号：{{item.id_number}}</text>
          </view>
          <van-checkbox class="right checkbox" :name="item.id" checked-color="#4cd964"/>
        </view>
        <view class="row contacts-item add-contacts">
          <text @click="contacts(index)">修改信息</text>
        </view>
      </view>
    </van-checkbox-group>


    <van-popup
        :show="show"
        round
        closeable
        @close="close"
        position="bottom">

        <view class="popup-box">
          <van-field placeholder="请输入姓名" label="姓名" :value="info.name" @input="info.name = $event.detail"/>
          <van-field placeholder="请输入手机号" label="手机号"  :value="info.phone" @input="info.phone = $event.detail"/>
          <van-field placeholder="请输入身份证号" label="身份证号"  :value="info.id_number" @input="info.id_number = $event.detail"/>
          <view class="popup-bottom">
            <van-button type="primary" class="but" size="small" @click="add()">提交</van-button>
          </view>
        </view>


    </van-popup>


    <van-goods-action>
      <van-goods-action-button type="primary"  text="确认添加" @click="okSelect()"/>
    </van-goods-action>
  </view>

</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
      list:[
        {
          id:'1',
          name:'1',
          phone:'1',
          id_number:'1'
        },
        {
          id:'2',
          name:'2',
          phone:'2',
          id_number:'2'
        }
      ],
      checkboxList:[],
      show: false,
      info:{
        id: 0,
        name: '',
        phone: '',
        id_number: ''
      },
      currentIndex: -1
    }
  },
  computed:{
      ...mapGetters("signUp", {
        getContactsList: 'getContactsList'
      }),
  },
  onLoad() {
    this.init()
  },
  methods: {
    ...mapActions("signUp", {
      setContactsList: 'setContactsList'
    }),
    init(){
      const contactsList = this.getContactsList
      if(contactsList.length != 0){
        contactsList.forEach(item => {
          this.checkboxList.push(item.id)
        })
      }
    },
    selectContacts(event){
      this.checkboxList = event.detail
    },
    contacts(index){
      this.show = true
      if(index != -1){
        this.info = this.list[index]
        this.currentIndex = index
      }
    },
    close(){
      this.show = false
      this.info = this.$options.data().info
      this.currentIndex = -1
    },
    add(){
     if(this.currentIndex != -1){
        this.list[this.currentIndex] = this.info
        this.updateSelectContactsList()
     }
     this.close()
    },
   okSelect(){
     this.updateSelectContactsList()
     uni.navigateBack()
    },
    updateSelectContactsList(){
      const selectList = []
      this.list.forEach(item => {
        if(this.checkboxList.indexOf(item.id) != -1){
          selectList.push(item)
        }
      })
      this.setContactsList(selectList)
    },
    delContacts(index){
      this.checkboxList.splice(this.checkboxList.indexOf(this.list[index].id), 1)
      this.updateSelectContactsList()
      this.list.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.contacts-item{
  margin: 32rpx;
  align-self: center;
  background: #f9f9f9;
}
.del-icon{
  align-self: center;
}
.phone-tag{
  padding-left: 10rpx;
}
.add-contacts{
  justify-content: center;
  font-size: 24rpx;
  color: #888;
}
.cost-total{
  font-size: 24rpx;
  color: #4cd964;
  width: 50%;
  text-align: center;
}
.checkbox{
  align-self: center;
}
.contacts-item{
  font-size: 24rpx;
  color: #888;
}
.item{
  padding-bottom: 20rpx;
}
</style>
