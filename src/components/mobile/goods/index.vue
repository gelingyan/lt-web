<template>
  <div>
    <header class="header">
      <jk-top-menu :title="title" leftIcon="icon-fanhui" :leftBtnEnabled="false" rightIcon="icon-fenlei3" ></jk-top-menu>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      'jk-top-menu': require('../common/top-menu.vue')
    },
    props: {
      title: ''
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    },
    computed: {
    }
  }
</script>

<style scoped lang="scss">
  .header{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .content{padding-top:40px;}
</style>

