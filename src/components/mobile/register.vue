<template>
  <div>
    <header class="header">
      <jk-top-menu title="注册" leftIcon="icon-fanhui" :leftBtnEnabled="false"></jk-top-menu>
    </header>
    <div class="content">
      <div class="register-wrapper">
        <mt-field label="用户名" name="user" v-model="user.value" :state="user.state" :placeholder="user.placeholder"></mt-field>
        <mt-field label="密码" v-model="password.value" :state="password.state" :placeholder="password.placeholder"
                  type="password"></mt-field>
        <mt-field label="确认密码" v-model="password2.value" :state="password2.state" :placeholder="password2.placeholder"
                  type="password"></mt-field>
        <mt-field label="邮箱" v-model="email.value" :state="email.state" :placeholder="email.placeholder" type="email" ></mt-field>
        <mt-field label="验证码" v-model="code.value" :state="code.state" :placeholder="code.placeholder">
          <!--<mt-button type="primary" size="small" plain @click="sendCode">发送验证码</mt-button>-->
          <img class="verifyImg" width="80px" :src="code.imgUrl" @click="code.updateVerifyImg">
        </mt-field>
      </div>
      <div class="btn-wrapper tc">
        <mt-button size="small" type="primary" @click="register">注册</mt-button>
        <mt-button size="small" type="primary" @click="login" plain>登录</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
  import * as names from '../../router/names'
  import {Toast, Indicator} from 'mint-ui'
  import api from '../../api'
  import { runAsync } from '../../assets/js/common'
  import storage from '../../module/storage'
  export default {
    components: {
      'jk-top-menu': require('./common/top-menu.vue')
    },
    data () {
      return {
        user: {
          value: '',
          state: '',
          placeholder: '请输入手机号',
          onValidate: () => {
            if (this.user.value === '') {
              Toast('请输入手机号')
              return false
            }
            if (!window.validator.isTelephone(this.user.value)) {
              Toast('手机号格式不正确')
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
        password2: {
          value: '',
          state: '',
          placeholder: '请确认密码',
          onValidate: () => {
            if (this.password2.value === '') {
              Toast('请确认密码')
              return false
            }
            if (this.password2.value !== this.password.value) {
              Toast('两次密码输入不一致')
              return false
            }
            return true
          }
        },
        email: {
          value: '',
          state: '',
          placeholder: '请输入邮箱'
        },
        code: {
          value: '',
          state: '',
          placeholder: '验证码',
          onValidate: () => {
            if (this.code.value === '') {
              Toast('请输入验证码')
              return false
            }
            if (!window.validator.isVCode4(this.code.value)) {
              Toast('验证码格式不正确')
              return false
            }
            return true
          },
          imgUrl: '',
          updateVerifyImg: () => { this.getVerifyCode() }
        }
      }
    },
    methods: {
      getVerifyCode () {
        runAsync().then(data => {
          this.code.imgUrl = data
        })
      },
      login () {
        this.$router.push({name: names.login.name})
      },
      register () {
        let validate = this.user.onValidate() && this.password.onValidate() && this.password2.onValidate() && this.code.onValidate()
        if (validate) {
          Indicator.open({
            text: '注册中...',
            spinnerType: 'fading-circle'
          })

          let params = {
            user: this.user.value,
            password: this.password.value,
            email: this.email.value,
            code: this.code.value
          }

          api.userRegister(params).then((response) => {
            if (response.data.messageType === 1) {
              this.$message({
                type: 'success',
                message: response.data.message
              })
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
  .content{padding-top:40px;
    .btn-wrapper{
      .mint-button{width:35%;margin:0 5px}
    }
  }
</style>
<style lang="scss">
  .register-wrapper{
    padding: 1rem 0.5rem;
    .mint-cell-title{font-size:0.34rem;width:2.4rem;}
    .mint-cell-value{font-size:0.32rem;}
  }
</style>
