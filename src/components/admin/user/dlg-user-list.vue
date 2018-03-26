<template>
  <el-dialog :title="title"
             v-model="dialogFormVisible">
    <el-form :model="form"
             :rules="rules"
             ref="form"
             label-width="80px">
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="form.date"
          type="datetime"
          placeholder="选择日期时间"
          @change="change"
          :disabled="disabled">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用户名" prop="user">
        <el-input v-model="form.user" placeholder='请输入用户名' :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="number" v-model="form.phone" placeholder='请输入手机号'></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input type="email" v-model="form.email" placeholder='请输入邮箱'></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.note" placeholder='请输入备注'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import api from 'api'
  export default {
    data () {
      return {
        type: '',
        disabled: false,
        title: '新增用户',
        jobQueryForm: {
          beginDateBefore: '',
          beginDateAfter: '',
          overDateBefore: '',
          overDateAfter: ''
        },
        dialogFormVisible: false,
        form: {
          id: '',
          date: '',
          user: '',
          phone: '',
          email: '',
          note: ''
        },
        rules: {
          date: [
            { required: true, message: '请选择日期时间', trigger: 'change' }
          ],
          user: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 18, message: '用户名格式不正确', trigger: 'blur' }
          ],
          phone: [
            { min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur' }
          ],
          email: [
            { message: '邮箱格式不正确', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      toggle (params) {
        this.type = params.type
        this.dialogFormVisible = params.dialogFormVisible
        this.title = params.title
        this.disabled = params.disabled
      },
      change (value) {
        this.form.date = value
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = {
              id: this.form.id,
              date: this.form.date,
              user: this.form.user,
              phone: this.form.phone,
              email: this.form.email,
              note: this.form.note
            }
            if (this.type === 'edit') {
              this.edit(params)
            } else if (this.type === 'add') {
              params.password = '123456'
              this.$emit('callback', params)
            }
          } else {
            return false
          }
        })
      },
      edit (params) {
        api.modifyUser(params).then((response) => {
          if (response.data.messageType === 1) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.dialogFormVisible = false
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
