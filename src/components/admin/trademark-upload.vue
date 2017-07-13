<template>
  <div class="upload-wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商标管理</el-breadcrumb-item>
      <el-breadcrumb-item>上传商标</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="form" label-width="200px" :rules="rules">
      <el-form-item>
        <upload ref='refUpload'></upload>
      </el-form-item>

      <el-form-item label="商标名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="申请/注册号" prop="apply">
        <el-input v-model="form.apply"></el-input>
      </el-form-item>

      <el-form-item label="	国际分类" prop="classify">
        <el-row>
          <el-col :span="16"><el-input-number :min="1" :max="45" v-model="form.classify"></el-input-number></el-col>
          <el-col :span="4" :offset="1"><el-button  icon="search" type="primary" @click="btnClassify">查询</el-button></el-col>
        </el-row>
        <span class="tag">（请输入：1-45之间的阿拉伯数字，例如第9类输入：9）</span>
      </el-form-item>

      <el-form-item label="类似群" prop="group">
        <el-row>
          <el-col :span="16"><el-input v-model="form.group" :disabled="!form.classify" placeholder="请先输入国际分类号，然后选择类似群号，最多不超过5项"></el-input></el-col>
          <el-col :span="4" :offset="1"><el-button icon="search" type="primary" @click="btnGroup" :disabled="!form.classify">查询</el-button></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="商品/服务" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

      <el-form-item label="专用权期限">
        <el-date-picker
          v-model="form.term"
          type="daterange"
          placeholder="选择日期范围">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="商标价格" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>

      <el-form-item label="人气指数">
        <el-input v-model="form.hot"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即上传</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>

    <dlg-trademark-attribute ref="refDlg" @callbackClass="callbackClass" @callbackGroup="callbackGroup"></dlg-trademark-attribute>
  </div>
</template>
<script>
  import api from '../../api'
  import * as names from '../../router/names'
  export default {
    components: {
      'upload': require('./common/upload.vue'),
      'dlg-trademark-attribute': require('./dlg-trademark-upload-list.vue')
    },
    data () {
      return {
        form: {
          files: [],
          title: '', // 商标名称 1
          apply: '', // 申请/注册号 1
          classify: '', // 国际分类 1
          type: '', // 商标类型 0
          term: '', // 专用权期限 0
          group: '', // 类似群 0
          desc: '', // 商品/服务 0
          price: '', // 商标价格 1
          hot: '' // 人气指数 0
        },
        rules: {
          title: [
            { required: true, message: '请输入商标名称', trigger: 'blur change' }
          ],
          apply: [
            { required: true, message: '请输入申请/注册号', trigger: 'blur change' }
          ],
          classify: [
            {
              required: true,
              trigger: 'blur change',
              validator: (rule, value, callback) => {
                if (value) {
                  if (value.toString().indexOf('.') === -1) {
                    callback()
                  } else {
                    callback(new Error('请输入正整数'))
                  }
                } else {
                  callback(new Error('请输入国际分类'))
                }
              }
            }
          ],
          group: [
            { required: true, message: '请选择类似群号', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请输入商标价格', trigger: 'blur change' }
          ]
        },
        dialogImageUrl: '',
        dialogVisible: false,
        imageUrl: ''
      }
    },
    methods: {
      btnClassify () {
        this.$refs.refDlg.toggle({
          type: 'class',
          dialogFormVisible: true
        })
      },
      btnGroup () {
        this.$refs.refDlg.toggle({
          type: 'group',
          dialogFormVisible: true,
          code: this.form.classify
        })
      },
      callbackClass (id) {
        this.form.classify = parseInt(id)
        this.form.group = ''
        this.form.desc = ''
      },
      callbackGroup (data) {
        this.form.group = data.codes
        this.form.desc = data.desc
      },
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let files = this.$refs.refUpload.files
            this.form.files = files
            const params = this.form
            api.addMark(params).then((response) => {
              if (response.data.messageType === 1) {
                this.$message({
                  type: 'success',
                  message: response.data.message
                })
                this.$router.push({name: names.ADMIN_TRADEMARK__UPLOAD})
              } else if (response.data.messageType === 2) {
                this.$message.error(response.data.message)
              }
            }).catch(error => {
              console.log(error)
            }).finally(() => {
            })
          } else {
            return false
          }
        })
      },
      resetForm (form) {
        this.$refs[form].resetFields()
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .upload-wrapper{
    .el-form{
      padding-top: 20px;
      .tag{font-size: 12px;color: #999;}
      .el-input-number{width: 100%}
    }
  }
</style>

