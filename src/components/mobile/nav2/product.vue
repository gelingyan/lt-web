<template>
  <ul class="product_content tc cf">
    <li class="fl" v-for="item in classify" :key="item.id" @click="goodsClick(item)">
      <img :src="`static/img/class/${item.code}.png`">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
  import * as names from '@/router/names'
  import api from 'api'
    export default {
      data () {
        return {
            classify: []
        }
      },
      mounted () {
        this.getAllMarkClass()
      },
      methods: {
        goodsClick (item) {
          this.$router.push({name: names.goodsClass.name, params: {keyword: item.id}})
        },
        getAllMarkClass () {
          this.loading = true
          api.getAllMarkClass({}).then((response) => {
            if (response.data.messageType === 1) {
              this.classify = response.data.data.list
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
  .product_content{margin-bottom:55px;
    li{width:25%;border-bottom: 1px solid #eaeaea;padding:10px 0;
      background: url(./class_bg.png) no-repeat right center;
      &:nth-child(4n){background:none}
      img{display:block;width: 60%;margin: 0 auto;}
      span{font-size:0.32rem;color:#484848;padding-top:0.2rem;display: inline-block;}
    }
  }
  @media screen and (max-width: 320px){
    .content .product_content li{width: 33.3%;
      &:nth-child(4n){background:url(./class_bg.png) no-repeat right center;}
      &:nth-child(3n){background:none}
    }
  }
</style>
