<script>
  import {wechatLogin, getToken, getUserInfo, getPhone} from "./utils/auth";
  import store from "./store";
  export default {
    onLaunch: function() {
      if(!getToken()){
        wechatLogin()
      }
      const userInfo = getUserInfo()
      if(userInfo){
        store.dispatch("user/setUserInfo", userInfo)
      }
      const phone = getPhone()
      if(phone){
        store.dispatch("user/setPhone", phone)
      }

      this.$isResolve()
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
  @import "./wxcomponents/vant/common/index.wxss";
  page{
    background: #f4f4f4;
  }
	/*每个页面公共css */
  .column{
    display: flex;
    flex-direction: column;
  }
  .row{
    display: flex;
    flex-direction: row;
  }
  cover-image{
    width: 100%;
  }
  .border-radius-image-1{
    border-radius: 20rpx;
  }
  .right{
    margin-left: auto;
  }
  .header-image{
    height: 80rpx;
    width: 80rpx;
    border-radius: 40rpx;
  }
  .box{
    background: #FFF;
    margin-bottom: 10px;
    width: 100%;
  }
  .box-row{
    display: flex;
    flex-direction: row;
    padding: 20rpx;
  }
  .box-title{
    border-bottom: 1px solid #F4F4F4;
    padding-bottom: 10px;
  }
  .popup-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80rpx;
  }
  .popup-bottom{
    margin-top: 20rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  van-cell, van-panel{
    width: 100%;
  }
</style>
