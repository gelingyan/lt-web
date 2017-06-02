<template>
  <div class="nav_content">
    <mt-cell v-for="item in items" :title="item.title" :key="item.id">
      <i class="iconfont" slot="icon" :class="item.icon"></i>
    </mt-cell>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          items: [
            {id: 1, title: '商标超市', icon: 'icon-cart', path: ''},
            {id: 2, title: '独家代理', icon: 'icon-medal', path: ''},
            {id: 3, title: '商标分类', icon: 'icon-fenlei3', path: ''},
            {id: 4, title: '转让流程', icon: 'icon-zhuanrang-copy', path: ''},
            {id: 5, title: '发布商标', icon: 'icon-forward', path: ''},
            {id: 6, title: '公司简介', icon: 'icon-tag', path: ''},
            {id: 7, title: '商标定制', icon: 'icon-like', path: ''},
            {id: 8, title: '客户评价', icon: 'icon-emoji', path: ''}
          ]
        }
      }
    }
</script>

<style scoped lang="scss">
  .nav_content{
    .iconfont{vertical-align: bottom;margin-right: 0.1rem;}
  }
</style>
