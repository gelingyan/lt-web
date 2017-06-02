<template>
  <div>
    <header class="header">
      <jk-top-menu :title="title" ref="refTitle"></jk-top-menu>
    </header>
    <div class="content">
      <div class="swipe-wrapper">
        <mt-swipe :auto="0">
          <mt-swipe-item><img src="./banner1.jpg"></mt-swipe-item>
          <mt-swipe-item><img src="./banner1.jpg"></mt-swipe-item>
          <mt-swipe-item><img src="./banner1.jpg"></mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- 菜单 -->
      <jk-menu></jk-menu>

      <!-- 热门分类 -->
      <div class="market-wrapper HOT-classify">
        <mt-cell title="热门转让类别" class="market-title cell-HOT" @click.native="hotMore">
          <i class="iconfont" slot="icon">&#xe67e;</i>
          <span>更多</span>
        </mt-cell>
        <jk-class-menu></jk-class-menu>
      </div>

      <!-- 商标转让 -->
      <div class="market-wrapper" v-for="item in items">
        <mt-cell :title="item.title" class="market-title" @click.native="market(item)">
          <i class="iconfont" slot="icon">&#xe610;</i>
          <i class="iconfont">&#xe603;</i>
        </mt-cell>
        <jk-market :products="item.products | formatProducts(item.products)" @priceClick="priceClick"></jk-market>
      </div>

      <jk-footer></jk-footer>
    </div>
  </div>
</template>

<script>
  import * as names from '../../../router/names'
  export default {
    components: {
      'jk-top-menu': require('../common/top-menu.vue'),
      'jk-menu': require('../common/menu.vue'),
      'jk-class-menu': require('./class-menu.vue'),
      'jk-market': require('../common/market.vue'),
      'jk-footer': require('../common/footer.vue')
    },
    props: {
    },
    data () {
      return {
        title: '首页',
        items: [
          {
            id: 1,
            title: '25类商标转让',
            keyword: 25,
            products: [
              {id: 1, title: '抱抱乖1', keyword: 25, label: '第25类', price: '11111', priceFlag: false, img: 'static/img/bg.jpg', path: ''},
              {id: 2, title: '抱抱乖2', keyword: 25, label: '第25类', price: '22222', priceFlag: false, img: 'static/img/bg.jpg', path: ''},
              {id: 3, title: '抱抱乖3', keyword: 25, label: '第25类', price: '33333', priceFlag: false, img: 'static/img/bg.jpg', path: ''},
              {id: 4, title: '抱抱乖4', keyword: 25, label: '第25类', price: '44444', priceFlag: false, img: 'static/img/bg.jpg', path: ''},
              {id: 5, title: '抱抱乖5', keyword: 25, label: '第25类', price: '55555', priceFlag: false, img: 'static/img/bg.jpg', path: ''},
              {id: 6, title: '抱抱乖6', keyword: 25, label: '第25类', price: '66666', priceFlag: false, img: 'static/img/bg.jpg', path: ''}
            ]
          },
          {
            id: 2,
            title: '05类商标转让',
            keyword: 5,
            products: [
              {id: 1, title: '抱抱乖', keyword: 5, label: '第05类', price: '1000', priceFlag: false, img: 'static/img/bg.jpg', path: ''},
              {id: 2, title: '抱抱乖', keyword: 5, label: '第05类', price: '2000', priceFlag: false, img: 'static/img/bg.jpg', path: ''},
              {id: 3, title: '抱抱乖', keyword: 5, label: '第05类', price: '3000', priceFlag: false, img: 'static/img/bg.jpg', path: ''},
              {id: 4, title: '抱抱乖', keyword: 5, label: '第05类', price: '4000', priceFlag: false, img: 'static/img/bg.jpg', path: ''}
            ]
          }
        ]
      }
    },
    watch: {
    },
    mounted () {
    //  console.log(this.$refs.refTitle.menuClick)
    },
    methods: {
      priceClick (item) {
        console.log(item.price)
      },
      market (item) {
        this.$router.push({name: names.GOODS__GOODS, params: {keyword: item.keyword}})
      }
    },
    filters: {
      formatProducts (products) {
        let formatProducts = products
        let len = formatProducts.length
        if (len >= 4) {
          formatProducts = formatProducts.slice(0, 4)
        }
        return formatProducts
      }
    }
  }
</script>

<style scoped lang="scss">
  .content{
    .swipe-wrapper{
      height:200px;
      img{display: block;width: 100%}
    }
    .market-wrapper{border-bottom: 1px solid #e3e3e3;border-top: 5px solid #eaeaea;
      .market-title{border-bottom: 1px solid #e3e3e3;}
      &.HOT-classify{border-top:0;
        .cell-HOT{
          background:#ff3127;color:#fff;border-bottom:0;
          span{color:#fff}
        }
      }
    }
  }

</style>

