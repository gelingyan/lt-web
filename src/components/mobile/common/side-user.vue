<template>
  <mt-popup
    v-model="popupVisible"
    position="left"
    :modal="true"
    :closeOnClickModal="true">
      <div class="user-wapper">
        <div class="avatar tc">
          <img src="../../../assets/img/user.png">
          <p class="name">{{user.name}}</p>
          <p>{{user.email}}</p>
        </div>
        <div class="text-wrapper">
          <mt-cell title="消息">
            <i slot="icon" class="iconfont icon-xiaoxi1"></i>
            <mt-badge size="small">10</mt-badge>
          </mt-cell>
          <mt-cell title="购物车">
            <i slot="icon" class="iconfont icon-chaoshi"></i>
            <mt-badge size="small">10</mt-badge>
          </mt-cell>
          <mt-cell title="设置"><i slot="icon" class="iconfont icon-shezhi1"></i></mt-cell>
          <mt-cell title="意见反馈"><i slot="icon" class="iconfont icon-xiaoxi3"></i></mt-cell>
          <mt-cell title="关于公司"><i slot="icon" class="iconfont icon-gongsi"></i></mt-cell>
        </div>
        <div class="cell tc">
          <mt-button size="small" type="primary" @click="logout" plain>退出登录</mt-button>
        </div>
      </div>
  </mt-popup>
</template>

<script>
  import storage from '../../../module/storage'
  export default {
    data () {
      return {
        popupVisible: false,
        defaultText: 'xxx',
        user: {
          name: '',
          email: ''
        }

      }
    },
    mounted () {
      let user = this.$store.state.user
      if (user) {
        this.user.name = user.user
        this.user.email = user.email
      }
  },
    methods: {
      logout () {
        storage.delUser()
        storage.delPhone()
        this.popupVisible = false
      }
    },
    computed: {
    }
  }
</script>

<style scoped lang="scss">
  .mint-popup{
    width: 70%;
    height: 100%;
  }
  .user-wapper{
    padding-top:20%;
    .avatar{
      font-size:14px;
      img{
        width: 100px;
        border-radius: 50%;
      }
    .name{padding: 10px 0;}
    }
    .text-wrapper{padding:20px 0;
      .iconfont{
        font-size: 20px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
  }

</style>
<style lang="scss">
  .user-wapper{
    .mint-cell{
      &:last-child{background-image:none;}
      .mint-cell-wrapper{background-image:none;padding: 0 20px;
        .mint-cell-title{font-size:14px;}
        .mint-cell-value{font-size:14px;}
      }
    }
  }
</style>
