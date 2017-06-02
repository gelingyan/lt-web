<template>
  <div>
    <header class="header">
      <jk-top-menu :title="title" leftIcon="icon-fanhui" :leftBtnEnabled="false" rightIcon="icon-fenlei3"></jk-top-menu>
    </header>
    <div class="content-wrapper">
      <div class="title tc">
        <h2>{{text}}</h2>
        <p v-if="ps">{{ps}}</p>
      </div>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
  import api from '../../../api'
  import {Toast, Indicator} from 'mint-ui'
  export default {
    components: {
      'jk-top-menu': require('../common/top-menu.vue')
    },
    props: {
    },
    data () {
      return {
        text: '标题',
        ps: '副标题',
        content: '暂无内容',
        keyword: this.$route.params.keyword,
        items: [
          {id: 1, title: '商标超市', keyword: 'all'},
          {id: 2, title: '原创商标', keyword: 'own'},
          {id: 3, title: '商标注册', keyword: 'registration'},
          {id: 4, title: '专利申请', keyword: 'application'},
          {id: 5, title: '商标分类'},
          {id: 6, title: '商标查询', keyword: 'search'},
          {id: 7, title: '转让流程', keyword: 'transfer'},
          {id: 8, title: '公司简介', keyword: 'company'}
        ]
      }
    },
    mounted () {
      let params = {
        keyword: this.$route.params.keyword
      }
      api.getArticle(params).then((response) => {
        if (response.data.messageType === 1) {
          this.text = response.data.data.title
          this.ps = response.data.data.ps
          this.content = response.data.data.content
        } else if (response.data.messageType === 2) {
          Toast(response.data.message)
        }
      }, (rejected) => {
        Toast(rejected)
      }).finally(() => {
        Indicator.close()
      })
    },
    computed: {
      title () {
        for (var item of this.items) {
          if (item.keyword === this.$route.params.keyword) {
            return item.title
          }
        }
      }
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
  .content-wrapper{
    padding:40px 10px 10px 10px;
    .title{
      border-bottom: 1px solid #eaeaea;
      padding: 15px 0;
      h2{font-size: 16px;color: #484848;}
      p{font-size: 12px;color: #999;padding-top: 10px;}
    }
    .content{
      padding: 10px 0;font-size: 14px;color:#666;line-height: 24px;
      img{width: 100%;display: block;margin: 0 auto;}
    }
  }
</style>

