<template>
  <el-row>
    <el-col :span="6" :offset="9" class="form-wrapper">
      <el-row class="title tc">管理员登录</el-row>
      <el-form label-position="right"
               label-width="80px"
               :model="form"
               :rules="rules"
               ref="form">
        <el-form-item label="账号" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="code" prop="validCode">
          <el-col :span="12"><el-input type="number" placeholder="请输入验证码" v-model="form.validCode"></el-input></el-col>
          <el-col :span="10" :offset="2"><img :src="imgPath" @click="getValidCode"></el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import { runAsync } from '../../assets/js/common'
  import api from '../../api'
  import * as names from '../../router/names'
  import storage from '../../module/storage'
  export default {
    data () {
      return {
        form: {
          username: '',
          password: '',
          validCode: ''
        },
        imgPath: '',
        rules: {
          username: [
              {required: true, message: '请输入帐号', trigger: 'blur'},
              { min: 4, max: 18, message: '长度在 4 到 18 位', trigger: 'blur change' }
            ],
          password: [
              {required: true, message: '请输入密码', trigger: 'blur'},
              { min: 6, max: 18, message: '长度在 6 到 18 位', trigger: 'blur change' }
            ],
          validCode: [
              {required: true, message: '请输入验证码', trigger: 'blur'},
              { min: 4, max: 4, message: '验证码格式不正确', trigger: 'blur change' }
            ]
        }
      }
    },
    mounted () {
      this.getValidCode()
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = {
              user: this.form.username,
              password: this.form.password,
              validCode: this.form.validCode,
              userType: '01'
            }
            api.adminLogin(params).then((response) => {
              if (response.data.messageType === 1) {
                this.$message({
                  type: 'success',
                  message: response.data.message
                })
                storage.setAdmin(response.data.data)
                this.$router.replace({name: names.ADMIN_USER__LIST})
              } else if (response.data.messageType === 2) {
                this.$message.error(response.data.message)
                this.$refs[formName].resetFields()
              }
            }).finally(() => {
            })
          } else {
            return false
          }
        })
      },
      getValidCode () {
        runAsync().then(data => {
          this.imgPath = data
        })
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .form-wrapper {
    margin-top:100px;
    min-width: 400px;
    padding: 30px;
    background: #EFF2F7;
    border-radius: 5px;
    color: #1F2D3D;
    .title{margin-bottom: 20px;font-size: 16px}
    .el-form{
      .code{
        img{
          width:100%;
          height: 36px;
        }
      }
      .el-button{width:100%}
    }
  }
</style>
