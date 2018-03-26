<template>
  <div>
    <p class="tc title">&nbsp;&nbsp;显示高级选项&nbsp;&nbsp;</p>
    <jk-search v-if="search"></jk-search>

    <mt-navbar v-model="selected" class="goods-tab">
      <mt-tab-item id="1">新品</mt-tab-item>
      <mt-tab-item id="2">价格</mt-tab-item>
      <mt-tab-item id="3">综合</mt-tab-item>
      <mt-tab-item id="4">人气</mt-tab-item>
    </mt-navbar>

    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <jk-market :products="evenNumbers" @priceClick="priceClick"></jk-market>
    </mt-loadmore>
  </div>
</template>

<script>
    export default {
      components: {
        'jk-market': require('../common/market.vue'),
        'jk-search': require('./search.vue')
      },
      data () {
        return {
          search: false,
          selected: '1',
          products: [
            {id: 1, title: '抱抱乖1', keyword: 25, label: '第25类', price: 510, img: 'static/img/bg.jpg', hot: ''},
            {id: 2, title: '抱抱乖2', keyword: 25, label: '第25类', price: 30, img: 'static/img/bg.jpg', hot: ''},
            {id: 3, title: '抱抱乖3', keyword: 25, label: '第25类', price: 30, img: 'static/img/bg.jpg', path: ''},
            {id: 4, title: '抱抱乖4', keyword: 25, label: '第25类', price: 40, img: 'static/img/bg.jpg', path: ''},
            {id: 5, title: '抱抱乖5', keyword: 25, label: '第25类', price: 50, img: 'static/img/bg.jpg', path: ''},
            {id: 6, title: '抱抱乖6', keyword: 25, label: '第25类', price: 60, img: 'static/img/bg.jpg', path: ''},
            {id: 7, title: '抱抱乖1', keyword: 25, label: '第25类', price: 70, img: 'static/img/bg.jpg', path: ''},
            {id: 8, title: '抱抱乖2', keyword: 25, label: '第25类', price: 80, img: 'static/img/bg.jpg', path: ''},
            {id: 9, title: '抱抱乖3', keyword: 25, label: '第25类', price: 90, img: 'static/img/bg.jpg', path: ''},
            {id: 10, title: '抱抱乖4', keyword: 25, label: '第25类', price: 100, img: 'static/img/bg.jpg', path: ''},
            {id: 11, title: '抱抱乖5', keyword: 25, label: '第25类', price: 101, img: 'static/img/bg.jpg', path: ''},
            {id: 12, title: '抱抱乖6', keyword: 25, label: '第25类', price: 102, img: 'static/img/bg.jpg', path: ''}
          ],
          allLoaded: false
        }
      },
      methods: {
        loadTop () {
          this.$refs.loadmore.onTopLoaded()
        },
        loadBottom () {
          this.allLoaded = true// 若数据已全部获取完毕
          this.$refs.loadmore.onBottomLoaded()
        },
        priceClick (item) {
          console.log(item.price)
        }
      },
      watch: {
        selected () {
          this.allLoaded = false
        }
      },
      computed: {
        evenNumbers () {
          return this.products.sort((a, b) => { // a-b输出从小到大排序，b-a输出从大到小排序
            if (this.selected === '1') {
              return a.id - b.id
            } else if (this.selected === '2') {
              return a.price - b.price
            } else if (this.selected === '3') {
              return a.id - b.id
            } else {
              return a.id - b.id
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  .content{
    .title{
      color: #fc7777;
      padding: 0.5rem;
      font-size: 0.36rem;
      line-height: 0.46rem;
      display:flex;
    &:before{content:'';flex: 1;height: 0.23rem;border-bottom:1px solid #fc7777}
    &:after{content:'';flex: 1;height: 0.23rem;border-bottom:1px solid #fc7777}
    }
  }
  .mint-navbar{border-bottom:1px solid #e3e3e3;}
</style>
<style lang="scss">
  .goods-tab{
    .mint-tab-item-label{font-size:0.34rem}
  }
</style>
