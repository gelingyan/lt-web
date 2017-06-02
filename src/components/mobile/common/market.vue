<template>
  <ul class="mc cf" id="container">
    <li v-for="item in products">
      <div class="img-wrapper" @click="imgClick(item)"><img v-lazy.container="item.img" /></div>
      <p class="title">{{item.title}}</p>
      <p class="cf price-wrapper">
        <span class="fl">{{item.label}}</span>
        <mt-button  type="default" size="small" class="fr" @click.native="priceClick(item)" v-if="!item.priceFlag" >查看价格</mt-button>
        <span class="fr text" v-if="item.priceFlag">￥ {{item.price}} </span>
      </p>
    </li>
  </ul>
</template>

<script>
  import * as names from '../../../router/names'
  import storage from '../../../module/storage'
  import { Toast, MessageBox, Indicator } from 'mint-ui'
  import api from '../../../api'
  import Vue from 'vue'
  export default {
    props: {
      products: {
        type: Array,
        default () {
          return ''
        }
      }
    },
    data () {
      return {
        priceFlag: false
      }
    },
    mounted () {
    },
    methods: {
      priceClick (item) {
        console.log(this.$store)
      //  this.$emit('priceClick', item)
        const user = storage.getUser()
        if (!user || !user.userType) {
          this.priceFlag = false
          MessageBox.prompt('请输入手机号', '查看价格').then(({ value, action }) => {
            if (action === 'confirm') {
              if (!window.validator.isTelephone(value)) {
                this.$toast('手机号码格式有误')
              } else {
                var timeFormat = Vue.filter('time-format')
                const date = timeFormat(new Date(), 'YYYY-MM-DD HH:MM:SS')
                const params = {
                  date: date,
                  user: value,
                  phone: value,
                  password: '123456',
                  email: '',
                  note: ''
                }
                api.userRegister(params).then((response) => {
                  if (response.data.messageType === 1) {
                    this.$message({
                      type: 'success',
                      message: '账户密码：123456',
                      duration: 0,
                      showClose: true
                    })

                 //   this.$store.commit('user', response.data.data)
                  //  storage.setUser()titleString
                    this.$router.replace({name: names.MOBILE__HOME})
                  } else if (response.data.messageType === 2) {
                      if (response.data.message === '用户已存在') {
                          storage.setPhone(params.user)
                          this.$router.push({name: names.MOBILE__LOGIN, params: {user: params.user}})
                      } else {
                        Toast(response.data.message)
                      }
                  }
                }, (rejected) => {
                  Toast(rejected)
                }).finally(() => {
                  Indicator.close()
                })
              }
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
            item.priceFlag = true
          console.log(item.price)
        }
        this.priceFlag = true
      },
      imgClick (item) {
        this.$router.push({name: names.GOODS__GOOD_DETAIL, params: {keyword: item.keyword, id: item.id}})
      }
    }
  }
</script>

<style scoped lang="scss">
  .mc{
    li{
      float: left;width:48%;padding:0.2rem 1% 0.3rem 1%;
      .img-wrapper{border: 1px solid #eaeaea; overflow:hidden;margin-bottom:0.1rem;height:auto;
        img{width:100%;display:block}
      }
      .title{color:#000;font-size:0.32rem;padding:0 0.1rem;}
      .price-wrapper{font-size:0.32rem;padding:0 0.1rem;line-height:0.8rem;
        .fl{color:#999;}
        .fr{
          color:#ff3f3f;font-size: 0.32rem;height:0.8rem;
          &.text{padding-right: 13px}
        }
      }
    }
  }
  image[lazy=loading] {
    width: 100%;
    height: 100px;
    margin: auto;
  }
</style>
