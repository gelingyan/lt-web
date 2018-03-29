<template>
  <nav class="class-menu tc cf">
    <div class="class-item" v-for="(item, index) in hotClassify" @click="classClick(item)" :key="index">
      <label>{{item.name}}</label>
      <span>{{item.type}}</span>
      <img :src="`static/img/nav1/${item.code}.png`">
    </div>
  </nav>
</template>

<script>
import * as names from '@/router/names'
import api from 'api'
    export default {
      data () {
        return {
          hotClassify: []
        }
      },
      mounted () {
        this.getHotMarkClass()
      },
      methods: {
        classClick (item) {
          this.$router.push({name: names.goodsClass.name, params: {keyword: item.id}})
        },
        getHotMarkClass () {
          this.loading = true
          api.getHotMarkClass({}).then((response) => {
            if (response.data.messageType === 1) {
              this.hotClassify = response.data.data.list
            } else if (response.data.messageType === 2) {
              this.$message.error(response.data.message)
            }
          }).catch(error => {
            console.log(error)
          }).finally(() => {
            this.loading = false
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  .class-menu{padding-top:0.1rem;border-bottom: 1px solid #e3e3e3;
    .class-item{width:23%;float: left;padding: 0.15rem 1%;margin-bottom:0.2rem;
      label{color:#484848;font-weight: bold;margin:0;display: block;}
      span{font-size:0.34rem;color:#666;display: block;}
      img{display:block;width: 80%;margin: 0 auto;}
    }
  }
</style>
