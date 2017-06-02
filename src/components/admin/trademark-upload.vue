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

      <el-form-item label="	国际分类" prop="class">
        <el-select v-model="form.class" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商标类型">
        <el-radio-group v-model="form.type">
          <el-radio label="一般"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="专用权期限">
        <el-date-picker
          v-model="form.term"
          type="daterange"
          placeholder="选择日期范围">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="类似群">
        <el-checkbox-group v-model="form.group">
          <el-checkbox label="美食/餐厅线上活动" name="group"></el-checkbox>
          <el-checkbox label="地推活动" name="group"></el-checkbox>
          <el-checkbox label="线下主题活动" name="group"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="group"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="商品/服务">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>

      <el-form-item label="商标价格" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>

      <el-form-item label="人气指数">
        <el-input v-model="form.hot"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即上传</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import api from '../../api'
  export default {
    components: {
      'upload': require('./common/upload.vue')
    },
    data () {
      return {
        form: {
          files: [],
          title: '', // 商标名称 1
          apply: '', // 申请/注册号 1
          class: '', // 国际分类 1
          type: '', // 商标类型 0
          term: '', // 专用权期限 0
          group: [], // 类似群 0
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
          class: [
            { required: true, message: '请选择国际分类', trigger: 'blur change' }
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
      submitForm (form) {
        let files = this.$refs.refUpload.files
        if (files.length > 0) {
          this.$refs[form].validate((valid) => {
            this.form.files = files
            const params = this.form
            api.upload(params).then((response) => {
              if (response.data.messageType === 1) {
                this.$message({
                  type: 'success',
                  message: response.data.message
                })
                this.getDate()
              } else if (response.data.messageType === 2) {
                this.$message.error(response.data.message)
              }
            }).catch(error => {
              console.log(error)
            }).finally(() => {
            })
          })
        } else {
          this.$message.error('请上传图片')
        }
      },
      resetForm () {
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .upload-wrapper{
    .el-form{padding-top: 20px}
  }
</style>

