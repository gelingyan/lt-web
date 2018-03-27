<template>
  <section>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文档管理</el-breadcrumb-item>
      <el-breadcrumb-item>文档</el-breadcrumb-item>
    </el-breadcrumb>

    <!--工具条-->
    <el-row class="search-wrapper" :gutter="20">
      <el-col :span="6">
        <el-input placeholder="搜索内容……">
          <el-button slot="append" icon="search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 列表 -->
    <el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="tableLoading"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="文章所属">
          <template slot-scope="scope">
            <span>{{ scope.row.keyword | getTitle }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="edit" @click="edit(scope)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </section>
</template>
<script>
  import api from 'api'
  import * as names from '@/router/names'
  import { Relation } from '@/module/const'
  export default {
    components: {},
    data () {
      return {
        tableLoading: false,
        tableData: [],
        multipleSelection: []
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
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      edit (index) {
        this.$router.push({name: names.articleEdit.name, params: {key: index.row.keyword}})
      },
      getDate () {
        this.tableData = []
        this.tableLoading = true
        api.getArticles().then((response) => {
          if (response.data.messageType === 1) {
            this.tableData = response.data.data.list
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
          }
        }, (rejected) => {
          this.$message(rejected)
        }).finally(() => {
          this.tableLoading = false
        })
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .search-wrapper {
    padding: 20px 0 20px 0
  }
  .img-wrapper{
    width: 100px;
    display: inline-block;
    margin: 10px;
    box-shadow: 0px 0px 2px #dfdfdf;
    img{width: 100%}
  }
  demo-table-expand {
    font-size: 0;
  }
  demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .page-wrapper{margin-top:20px}
</style>
