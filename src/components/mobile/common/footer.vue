<template>
  <div class="footer tc">
    <div class="ui-btn clearfix">
      <mt-button size="small" type="default" @click="login" plain>登录</mt-button>
      <mt-button size="small" type="default" @click="register" plain>注册</mt-button>
      <mt-button size="small" type="default" @click="share" plain>分享</mt-button>
    </div>

    <div class="address">
      <p class="company">龙腾商标转让</p>
      <p>电话:<a href="tel:0573-85105515">0573-85105515</a></p>
      <p>编号:<a href="http://www.miitbeian.gov.cn/">浙ICP备16041652号-1</a></p>
    </div>
  </div>
</template>

<script>
  import * as names from '../../../router/names'
  export default {
    methods: {
      login () {
        this.$router.push({name: names.MOBILE__LOGIN})
      },
      register () {
        this.$router.push({name: names.MOBILE__REGISTER})
      },
      share () {}
    }
  }
</script>

<style scoped lang="scss">
  .footer{padding:0.6rem 0 85px 0;border-top: 5px solid #eaeaea;
    color:#c3c6ca;background:#4e525e;
    .ui-btn {display: inline-block;
      .mint-button{
        color:#c3c6ca;background:#555965;font-size:.36rem; margin: 0 0.1rem;
        border-color: #42454d;border-radius: 5px;float: left;
      }
    }
    p{font-size:0.32rem;padding-top:0.1rem;a{margin-left:0.1rem;}}
    .address{
      .company{color:#d5b273;font-size:0.36rem;padding: 0.4rem 0 0.1rem 0;}
      a{color:#c3c6ca;}
    }
  }
</style>
