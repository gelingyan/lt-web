<template>
  <div class="step2">
    <el-steps :active="2" class="step-wrapper">
        <el-step status="success" title="步骤1" description="编辑商标图片、商标名称、申请/注册号"></el-step>
        <el-step title="步骤2" description="批量编辑国际分类、类似群、商品/服务、专用权期限、商标价格、人气指数"></el-step>
        <el-step title="步骤3" description="批量上传"></el-step>
    </el-steps>
    <el-form ref="form" :model="form" label-width="200px" :rules="rules">
      <el-form-item label="	国际分类" prop="classify">
        <el-row>
          <el-col :span="16"><el-input-number :min="1" :max="45" v-model="form.classify" @change="classifyChange"></el-input-number></el-col>
          <el-col :span="4" :offset="1"><el-button  icon="search" type="primary" @click="btnClassify">查询</el-button></el-col>
        </el-row>
        <span class="tag">（请输入：1-45之间的阿拉伯数字，例如第9类输入：9）</span>
      </el-form-item>

      <el-form-item label="类似群" prop="similarGroup">
        <el-row>
          <el-col :span="16"><el-input v-model="form.similarGroup" :disabled="!form.classify" placeholder="请先输入国际分类号，然后选择类似群号，最多不超过5项"></el-input></el-col>
          <el-col :span="4" :offset="1"><el-button icon="search" type="primary" @click="btnGroup" :disabled="!form.classify">查询</el-button></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="商品/服务" prop="explicate">
        <el-input type="textarea" v-model="form.explicate"></el-input>
      </el-form-item>

      <el-form-item label="专用权期限">
        <el-date-picker
          v-model="term"
          type="daterange"
          range-separator=" ~ "
          placeholder="选择日期范围" @change="btnDate">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="商标价格" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>

      <el-form-item label="人气指数">
        <el-input v-model="form.hot"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">批量上传</el-button>
        <el-button @click="resetForm('form')">清空</el-button>
        <el-button @click="back">上一步</el-button>
      </el-form-item>
    </el-form>

    <dlg-trademark-attribute ref="refDlg" @callbackClass="callbackClass" @callbackGroup="callbackGroup"></dlg-trademark-attribute>
  </div>
</template>
<script>
  export default {
    components: {
      'dlg-trademark-attribute': require('./dlg-trademark-attribute.vue')
    },
    data () {
      return {
        term: [], // 专用权期限
        form: {
          classify: 25, // 国际分类
          type: '', // 商标类型 0
          timeLimit: '', // 专用权期限 0
          similarGroup: '2501,2502,2503,2504,2505,2507', // 类似群
          explicate: '衣物,婴儿纺织用品,特种运动服装,不透水服装,戏装,鞋', // 商品/服务 0
          price: '18888', // 商标价格
          hot: '' // 人气指数 0
        },
        rules: {
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
          similarGroup: [
            { required: true, message: '请选择类似群号', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请输入商标价格', trigger: 'blur change' }
          ]
        }
      }
    },
    methods: {
      classifyChange () {
        this.form.similarGroup = ''
        this.form.explicate = ''
      },
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
          multipleSelection: this.form.similarGroup,
          code: this.form.classify
        })
      },
      callbackClass (id) {
        this.form.classify = parseInt(id)
        this.form.similarGroup = ''
        this.form.explicate = ''
      },
      callbackGroup (data) {
        this.form.similarGroup = data.codes
        this.form.explicate = data.desc
      },
      btnDate (val) {
        this.form.timeLimit = val
      },
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
              this.$emit('callbackStep2', this.form)
          } else {
            return false
          }
        })
      },
      resetForm (form) {
        this.$refs[form].resetFields()
        this.form = {
          classify: '',
          type: '',
          timeLimit: '',
          similarGroup: '',
          explicate: '',
          price: '',
          hot: ''
        }
        this.term = []
      },
      back () {
        this.$emit('callbackStep2Back')
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .step2{
    padding: 20px 0;
    .step-wrapper{
      padding-left: 100px;
    }
    .el-form{
      padding-top: 20px;
      width: 800px;
      .tag{font-size: 12px;color: #999;}
      .el-input-number{width: 100%}
    }
  }
</style>

