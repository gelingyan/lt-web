<template>
  <div>
    <header class="header">
      <jk-top-menu title="登录" leftIcon="icon-fanhui" :leftBtnEnabled="false"></jk-top-menu>
    </header>
    <div class="content">
      <img src="../../assets/img/user.png" class="logo">
      <div class="login-wrapper">
        <mt-field label="用户名" v-model="user.value" :state="user.state" :placeholder="user.placeholder"></mt-field>
        <mt-field label="密码" v-model="password.value" :state="password.state" :placeholder="password.placeholder"
                  type="password"></mt-field>
        <mt-field label="验证码" v-model="verifyCode.value" :state="verifyCode.state" :placeholder="verifyCode.placeholder">
          <div class="spinner-wrapper" v-show="!verifyCode.isShow">
            <mt-spinner type="triple-bounce"></mt-spinner>
          </div>
          <img class="verifyImg" width="80px" :src="verifyCode.imgUrl" v-show="verifyCode.isShow" @click="verifyCode.updateVerifyImg">
        </mt-field>
      </div>
      <div class="btn-wrapper tc">
        <mt-button size="small" type="primary" @click="login">登录</mt-button>
        <mt-button size="small" type="primary" @click="register" plain>注册</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import * as names from '../../router/names'
  import { runAsync } from '../../assets/js/common'
  import {Toast, Indicator} from 'mint-ui'
  import api from '../../api'
  import storage from '../../module/storage'

  export default {
    components: {
      'jk-top-menu': require('./common/top-menu.vue')
    },
    data () {
      return {
        user: {
          value: storage.getPhone(),
          state: '',
          placeholder: '请输入用户名',
          onValidate: () => {
            if (this.user.value === '') {
              Toast('请输入用户名')
              return false
            }
            return true
          }
        },
        password: {
          value: '',
          state: '',
          placeholder: '请输入密码',
          onValidate: () => {
            if (this.password.value === '') {
              Toast('请输入密码')
              return false
            }
            if (!window.validator.isPassword(this.password.value)) {
              Toast('密码格式不正确')
              return false
            }
            return true
          }
        },
        verifyCode: {
          value: '',
          state: '',
          codeID: '',
          imgUrl: '',
          isShow: true,
          placeholder: '请输入验证码',
          onValidate: () => {
            if (this.verifyCode.value === '') {
              Toast('请输入验证码')
              return false
            }
            if (!window.validator.isVCode4(this.verifyCode.value)) {
              Toast('验证码格式不正确')
              return false
            }
            return true
          },
          updateVerifyImg: () => { this.getVerifyCode() }
        }
      }
    },
    props: {},
    methods: {
      getVerifyCode () {
        runAsync().then(data => {
          this.verifyCode.imgUrl = data
        })
      },
      login () {
        let validate = this.user.onValidate() && this.password.onValidate() && this.verifyCode.onValidate()
        if (validate) {
          Indicator.open({
            spinnerType: 'fading-circle'
          })

          let params = {
            user: this.user.value,
            password: this.password.value,
            verifyCode: this.verifyCode.value
          }

          api.login(params).then((response) => {
            if (response.data.messageType === 1) {
              storage.setUser(response.data.data)
              this.$router.replace({name: names.home.name})
            } else if (response.data.messageType === 2) {
              Toast(response.data.message)
            }
          }, (rejected) => {
            Toast(rejected)
          }).finally(() => {
            Indicator.close()
          })
        }
      },
      register () {
        this.$router.push({name: names.register.name})
      }
    },
    mounted () {
      this.getVerifyCode()
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
  .content{
    padding-top: 80px;
    .logo{
      display: block;
      margin: 0 auto;
      width: 3.5rem;
      border-radius: 50%;
    }
    .btn-wrapper{
      .mint-button{width:35%;margin:0 5px}
    }
  }
</style>
<style lang="scss">
  .content{
    .login-wrapper{
      padding: 1rem 0.5rem;
      .mint-cell-title{font-size:0.34rem;width:2.4rem;}
      .mint-cell-value{font-size:0.32rem;}
    }
  }
</style>
