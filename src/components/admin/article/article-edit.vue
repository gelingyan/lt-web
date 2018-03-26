<template>
  <section>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/article/list'}">文章列表</el-breadcrumb-item>
      <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <editor :uploadImgServer="uploadImgServer" ref="refEditor"></editor> -->
    <input type="file" @change="fileChange" ref='inputFile'>
    <el-button type="primary" @click="submit">上传</el-button>
  </section>
</template>

<script>
  import Editor from '../common/Editor'
  import api from 'api'
  export default {
    components: {
      Editor
    },
    data () {
      return {
        uploadImgServer: 'api/upload_file.php',
        files: []
      }
    },
    methods: {
      fileChange () {
        const files = Array.from(this.$refs.inputFile.files)
        for (let file of files) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            if (this.files.length > 24) {
              alert('文件数量不得超过25')
              return
            }
            let item = {data: e.target.result, name: file.name, size: file.size, type: file.type}
            this.files.push(item)
          }
        }
      },
      submit () {
      //  console.log(this.$refs.refEditor.editor.txt.html()) // 获取编辑器内容
        console.log(this.files)
        const params = this.files
        api.upload(params).then((response) => {
          if (response.data.messageType === 1) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            console.lof(response)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
