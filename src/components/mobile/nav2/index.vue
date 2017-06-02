<template>
  <div>
    <header class="header">
      <jk-top-menu :title="title" rightIcon="icon-fenlei3"></jk-top-menu>
    </header>
    <div class="content">
      <jk-product></jk-product>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      'jk-top-menu': require('../common/top-menu.vue'),
      'jk-product': require('./product.vue')
    },
    props: {
    },
    data () {
      return {
        title: '分类查询'
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
</style>
