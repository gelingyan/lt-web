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
  import api from 'api'
  import {Toast, Indicator} from 'mint-ui'
  import { Relation } from '@/module/const'
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
        keyword: this.$route.params.keyword
      }
    },
    mounted () {
      let params = {
        keyword: this.keyword
      }
      api.getArticleByKey(params).then((response) => {
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
        let ret = Relation.find(item => item.code === this.keyword)
        return ret.title
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

