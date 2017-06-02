<template>
  <div>
    <jk-menu></jk-menu>
    <div class="info-wrapper">
      <p class="title">商标详情</p>
      <div class="img-wrapper">
        <img src="static/img/bg.jpg">
      </div>
      <p class="title">商标信息</p>
      <template v-for="item in items">
        <mt-cell :title="item.title" :value="item.value" class="info"></mt-cell>
      </template>
    </div>
    <div class="footer-wrapper"><jk-footer></jk-footer></div>
  </div>
</template>

<script>
    export default {
      components: {
        'jk-top-menu': require('../common/top-menu.vue'),
        'jk-menu': require('../common/menu.vue'),
        'jk-footer': require('../common/footer.vue')
      },
      props: {
        title: ''
      },
      data () {
          return {
            items: [
              {id: 1, title: '商标名称', value: '说明文字'},
              {id: 2, title: '注册号', value: '6154393'},
              {id: 3, title: '国际分类', value: '1'},
              {id: 6, title: '商标类型', value: '一般'},
              {id: 6, title: '专用期限', value: '2011-01-21 至 2021-01-20'},
              {id: 4, title: '核定范围', value: '纺织品上浆和修整制剂; 纺织品上光化学品; 生产加工用除脂剂; 未加工人造树脂; 皮革表面处理用化学品;'},
              {id: 5, title: '类似群', value: '0104;0108;0114;'},
              {id: 7, title: '人气指数', value: '312次'},
              {id: 8, title: '联系电话', value: '0573-85105515'},
              {id: 9, title: '商标价格', value: '点击查看价格'}
            ]
          }
      }
    }
</script>

<style scoped lang="scss">
  .content{
    .info-wrapper{border-top: 1px solid #e3e3e3;
      .title{color: #e8413b;font-size: 16px;padding: 0.2rem 0.3rem;}
      .img-wrapper{margin: 0 0.2rem;border: 1px solid #e3e3e3;
        img{max-width:100%;display:block;margin: 0 auto;}
      }
    }
  }
</style>
<style lang="scss">
  .info{
    .mint-cell-wrapper{
      .mint-cell-title{color:#6d6d6d;flex: 0 0 2.4rem;font-size: 15px;}
      .mint-cell-value{
        color: #333;
        span{
          padding: 10px 0;
          line-height: 20px;
          font-size: 15px;
        }
      }
    }
  }
</style>
