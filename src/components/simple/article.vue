<template>
  <div class="article" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="title tc">
        <h2>{{text}}</h2>
        <p v-if="ps">{{ps}}</p>
      </div>
      <div class="content" v-html="content"></div>
  </div>
</template>

<script>
  import api from 'api'
  import {Toast} from 'mint-ui'
  export default {
    data () {
      return {
        text: '',
        ps: '',
        content: '',
        keyword: this.$route.params.keyword,
        fullscreenLoading: false
      }
    },
    mounted () {
      this.fullscreenLoading = true
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
        this.fullscreenLoading = false
      })
    }
  }
</script>

<style scoped lang="scss">
  .article{
    padding:0px 10px 10px 10px;
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

