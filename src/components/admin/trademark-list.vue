<template>
  <section>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商标管理</el-breadcrumb-item>
      <el-breadcrumb-item>商标列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--工具条-->
    <el-row class="search-wrapper" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入……"
          icon="search">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button
          type="danger"
          icon="delete">批量删除
        </el-button>
      </el-col>
    </el-row>
    <!-- 商标列表 -->
    <el-row>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商标类型:">
                <span>{{ props.row.type }}</span>
              </el-form-item>
              <el-form-item label="专用期限:">
                <span>{{ props.row.term }}</span>
              </el-form-item>
              <el-form-item label="类似群:">
                <span>{{ props.row.group }}</span>
              </el-form-item>
              <el-form-item label="核定范围:">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
              <el-form-item label="人气指数:">
                <span>{{ props.row.hot }}次</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商标">
          <template scope="scope">
            <span v-for="item in scope.row.imgs" class="img-wrapper">
              <img :src="item.data">
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="申请/注册号"
          prop="apply">
        </el-table-column>
        <el-table-column
          label="商标名称"
          prop="title">
        </el-table-column>
        <el-table-column
          label="国际分类"
          prop="classify">
        </el-table-column>
        <el-table-column
          label="价格"
          prop="price">
        </el-table-column>
      </el-table>

    </el-row>

    <div class="page-wrapper fr">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </section>
</template>
<script>
  import api from '../../api'
  export default {
    components: {},
    data () {
      return {
        tableData: [],
        currentPage: 1,
        pageSizes: [20, 30, 40, 50],
        pageSize: 20,
        total: 0
      }
    },
    mounted () {
      this.getDate()
    },
    methods: {
      getDate () {
        this.tableData = []
        const params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }

        this.tableLoading = true
        api.getMarks(params).then((response) => {
          if (response.data.messageType === 1) {
            this.tableData = response.data.data.list
            this.total = response.data.data.total
            this.currentPage = response.data.data.currentPage
            this.pageSize = response.data.data.pageSize
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
          }
        }, (rejected) => {
          this.$message(rejected)
        }).finally(() => {
          this.tableLoading = false
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getDate()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getDate()
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
