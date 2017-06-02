<template>
  <div class="mobile">
    <keep-alive>
      <router-view :title="title"></router-view>
    </keep-alive>
    <!--Tabbar-->
    <jk-nav-bottom :items="items" @navclick="navclick"></jk-nav-bottom>
    <!--Tabbar end-->
  </div>
</template>
<script>
  import * as names from '../../router/names'
  export default {
    components: {
      'jk-nav-bottom': require('./common/nav-bottom-tabbar.vue')
    },
    data () {
      return {
        list: [1, 2, 3, 4, 5, 6],
        items: [
          {id: 1, name: names.MOBILE__HOME, title: '首页', icon: 'icon-wxbzhuye'},
          {id: 2, name: names.MOBILE__CLASS, title: '分类查询', icon: 'icon-fenlei1'},
          {id: 3, name: names.MOBILE__FIND, title: '发现', icon: 'icon-faxian-copy'},
          {id: 4, name: names.MOBILE__MESSAGE, title: '联系卖家', icon: 'icon-phone'}
        ],
        searchvalue: '',
        viewItems: [],
        title: '首页'
      }
    },
    mounted () {
      this.$nextTick(() => {
      })
    },
    computed: {
      activeItems () {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].visibility !== false) {
            this.viewItems.push(this.items[i])
          }
        }
        if (this.viewItems.length > 0) {
          this.selected = this.viewItems[0].index
        }
        return this.viewItems
      }
    },
    methods: {
      navclick (item) {
        this.title = item.title
        this.$router.replace({name: item.name})
      },
      Toast () {
        this.$toast({
          message: 'Hello world',
          position: 'bottom',
          iconClass: 'iconfont icon-check'
        })
      },
      indicator () {
        var vm = this
        vm.$indicator.open({
          text: 'Loading...',
          spinnerType: 'double-bounce'
        })

        setTimeout(function () {
          vm.$indicator.close()
        }, 3000)
      }
    }
  }
</script>
<style lang="scss">
  .header{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .content{padding-top:40px}
  .market-title{
    min-height: 1rem;height: 1rem;color:#e8413b;
    .iconfont{
      font-size: 0.36rem;
      vertical-align: bottom;
      margin-right: 0.1rem;
    }
    .mint-cell-wrapper{background-image:none;
      .mint-cell-title{font-size:0.34rem;}
      .mint-cell-value{font-size:0.34rem;color:#e8413b}
    }
  }
</style>
