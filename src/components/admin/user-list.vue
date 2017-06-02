<script src="../../module/validate.js"></script>
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="search-wrapper" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入……"
          icon="search">
        </el-input>
      </el-col>
      <el-col :span="18">
        <el-button
          type="primary"
          icon="plus"
          @click="add">新增用户
        </el-button>
        <el-button
          type="danger"
          icon="delete"
          :disabled="multipleSelection.length>0?false:true"
          @click="dellAll(tableData)">批量删除
        </el-button>
      </el-col>
    </el-row>

    <el-table
      id="multipleTable"
      ref="multipleTable"
      :data="tableData"
      border
      style="width: 100%"
      v-loading="tableLoading"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="150"
        show-overflow-tooltip>
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.date | time-format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>

      <template v-for="item in columns">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip>
        </el-table-column>
      </template>

      <el-table-column
        label="操作"
        show-overflow-tooltip>
        <template scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="edit"
            @click="edit(scope)">编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            icon="delete"
            @click="del(scope, tableData)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <dlg-user-list ref="refDlg" @callback="callbackAdd"></dlg-user-list>

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

  </div>
</template>
<script>
  import api from '../../api'
  import {mergeCol} from '../../module/mergeCol'
  import draggable from 'vuedraggable'
  export default {
    components: {
      'dlg-user-list': require('./dlg-user-list.vue'),
      draggable
    },
    data () {
      return {
        columns: [
          {id: 1, prop: 'user', label: '用户名', width: '150'},
          {id: 2, prop: 'phone', label: '手机号', width: '150'},
          {id: 3, prop: 'email', label: '邮箱', width: '250'},
          {id: 4, prop: 'note', label: '备注'}
         ],
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
        api.getUsers(params).then((response) => {
          if (response.data.messageType === 1) {
            this.tableData = response.data.data.list
            this.total = response.data.data.total
            this.currentPage = response.data.data.currentPage
            this.pageSize = response.data.data.pageSize
            // DOM结构渲染完成后执行
            this.$nextTick(() => {
              mergeCol(document.getElementById('multipleTable'), 2)
            })
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
          }
        }, (rejected) => {
          this.$message(rejected)
        }).finally(() => {
          this.tableLoading = false
        })
      },
      add () {
        this.$refs.refDlg.toggle({
          type: 'add',
          dialogFormVisible: true,
          title: '新增用户',
          disabled: false
        })
        this.$refs.refDlg.form = {
          id: '',
          date: '',
          user: '',
          phone: '',
          email: '',
          note: ''
        }
      },
      callbackAdd (params) {
        api.userRegister(params).then((response) => {
          if (response.data.messageType === 1) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.$refs.refDlg.dialogFormVisible = false
            this.getDate()
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
        })
      },
      edit (index) {
        this.$refs.refDlg.toggle({
          type: 'edit',
          dialogFormVisible: true,
          title: '修改用户',
          disabled: true
        })
        this.$refs.refDlg.form = index.row
      },
      del (index, rows) {
        const params = [
          index.row
        ]
        this.delFun(params)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      dellAll () {
        this.delFun(this.multipleSelection)
      },
      delFun (params) {
        this.$confirm('是否删除用户？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          api.delUser(params).then((response) => {
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
      handleSizeChange (val) {
        this.pageSize = val
        this.getDate()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getDate()
      }
    },
    computed: {
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .search-wrapper {
    padding: 20px 0 20px 0
  }
  .page-wrapper{margin-top:20px}
</style>

