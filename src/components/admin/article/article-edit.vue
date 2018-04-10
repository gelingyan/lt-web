<template>
  <section class="article">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文档管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="所属" required>
        <span v-if="form.keyword">{{ form.keyword | getTitle }}</span>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder='请输入标题'></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model="form.ps" placeholder='请输入备注'></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <editor v-if="form.keyword" :inputContent="form.content" ref="refEditor"></editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('form')" :loading="loading">保 存</el-button>
        <el-button @click="back">返 回</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import Editor from '../common/Editor'
  import api from 'api'
  import { Relation } from '@/module/const'
  import * as names from '@/router/names'
  export default {
    components: {
      Editor
    },
    data () {
      return {
        form: {},
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        },
        loading: false
      }
    },
    mounted () {
      this.getDate()
    },
    filters: {
      getTitle (code) {
        let ret = Relation.find(item => item.code === code)
        return ret.title
      }
    },
    methods: {
      getDate () {
        this.tableData = []
        if (this.$route.params.key) {
          const params = {
            keyword: this.$route.params.key
          }

          this.tableLoading = true
          api.getArticleByKey(params).then((response) => {
            if (response.data.messageType === 1) {
              this.form = response.data.data
            } else if (response.data.messageType === 2) {
              this.$message.error(response.data.message)
            }
          }, (rejected) => {
            this.$message(rejected)
          }).finally(() => {
            this.tableLoading = false
          })
        } else {
          this.form = {}
        }
      },
      submit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            let params = {
              id: this.form.id,
              title: this.form.title,
              content: this.$refs.refEditor.editorContent,
              ps: this.form.ps
            }
            api.modifyArticle(params).then((response) => {
              if (response.data.messageType === 1) {
                this.$message({
                  type: 'success',
                  message: response.data.message
                })
                this.back()
              } else if (response.data.messageType === 2) {
                this.$message.error(response.data.message)
              }
            }).catch(error => {
              console.log(error)
            }).finally(() => {
              this.loading = false
            })
          }
        })
      },
      back () {
        this.$router.push({name: names.article.name})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .article{
    .el-form{
      padding-top: 20px;
      width: 800px;
    }
  }
</style>
