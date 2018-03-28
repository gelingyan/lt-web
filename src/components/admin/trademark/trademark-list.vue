<template>
  <section>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商标管理</el-breadcrumb-item>
      <el-breadcrumb-item>商标</el-breadcrumb-item>
    </el-breadcrumb>

    <!--工具条-->
    <el-row class="search-wrapper" :gutter="20">
      <el-col :span="6">
        <el-input placeholder="搜索内容……">
          <el-button slot="append" icon="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="18">
        <el-button
          type="primary"
          icon="plus"
          @click="add">新增商标
        </el-button>
        <el-button
          type="danger"
          icon="delete"
          :disabled="multipleSelection.length>0?false:true"
          @click="dellAll">批量删除
        </el-button>
      </el-col>
    </el-row>
    <!-- 商标列表 -->
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <!--<el-form-item label="商标类型:">-->
                <!--<span>{{ props.row.type }}</span>-->
              <!--</el-form-item>-->
              <el-form-item label="专用期限:">
                <span>{{ props.row.timeLimit }}</span>
              </el-form-item>
              <el-form-item label="类似群:">
                <span>{{ props.row.similarGroup }}</span>
              </el-form-item>
              <el-form-item label="核定范围:">
                <span>{{ props.row.explicate }}</span>
              </el-form-item>
              <el-form-item label="人气指数:">
                <span>{{ props.row.hot }}次</span>
              </el-form-item>
              <el-form-item label="商标:">
                <span v-for="(item, index) in props.row.files" :key="index" class="img-wrapper">
                  <img :src="item.data">
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商标">
          <template slot-scope="scope">
            <span class="img-wrapper" v-if="scope.row.files[0]">
              <img :src="scope.row.files[0].data">
            </span>
            <span v-else>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商标名称"
          prop="title">
        </el-table-column>
        <el-table-column
          label="申请/注册号"
          prop="apply">
        </el-table-column>
        <el-table-column
          label="国际分类"
          prop="classify">
        </el-table-column>
        <el-table-column
          label="价格"
          prop="price">
        </el-table-column>
        <el-table-column
          label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="edit" @click="edit(scope)">修改</el-button>
            <el-button size="small" type="danger" icon="delete" @click="del(scope, tableData)">删除</el-button>
          </template>
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
  import api from 'api'
  import * as names from '@/router/names'
  export default {
    components: {},
    data () {
      return {
        tableLoading: false,
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
        pageSizes: [20, 30, 40, 50],
        pageSize: 20,
        total: 0
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      add () {
        this.$router.push({name: names.trademarkUpload.name})
      },
      edit (index) {
        this.$router.push({name: names.trademarkEdit.name, params: {id: index.row.id}})
      },
      del (index, rows) {
        const params = [
          index.row
        ]
        this.delFun(params)
      },
      dellAll () {
        this.delFun(this.multipleSelection)
      },
      delFun (params) {
        this.$confirm('是否删除商标？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          api.delMark(params).then((response) => {
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
        }).catch(error => {
          console.log(error)
        })
      },
      getData () {
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
