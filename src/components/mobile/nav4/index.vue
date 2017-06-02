<template>
  <div>
    <header class="header">
      <jk-top-menu :title="title"></jk-top-menu>
    </header>
    <div class="content">
      <mt-cell title="姓名">
        <i class="iconfont icon-my" slot="icon"></i>
        <span>陆晓</span>
      </mt-cell>
      <mt-cell title="座机">
        <i class="iconfont icon-tel2" slot="icon"></i>
        <a class="tel" href="tel:0573-85105515">0573-85105515</a>
      </mt-cell>
      <mt-cell title="邮箱">
        <i class="iconfont icon-feedback" slot="icon"></i>
        <span>11111111111</span>
      </mt-cell>
      <mt-cell title="地址">
        <i class="iconfont icon-lbs" slot="icon"></i>
        <span>平湖市</span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      'jk-top-menu': require('../common/top-menu.vue')
    },
    props: {
    },
    data () {
        return {
          title: '联系卖家'
        }
    }
  }
</script>

<style scoped lang="scss">
  .content{
    .iconfont{
      font-size: 22px;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
    .tel{color:#888;}
  }
</style>
