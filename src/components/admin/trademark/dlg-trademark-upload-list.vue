<template>
  <el-dialog :title="title" v-model="dialogFormVisible" customClass="dlg-classify-list">
    <div class="list_content" v-loading="loading">
      <ul v-if="type === 'class'">
        <li v-for="item in classify" :key="item.code" @click="btnClass(item)"><span>{{item.code}}</span><span>{{item.type}}</span>{{item.name}}{{item.desc}}</li>
      </ul>
      <div v-else class="group-wrapper">
        <el-table :data="groupFun" style="width: 100%" :show-header="false"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="45">
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form>
                <el-form-item>
                  <p class="groupChild" v-for="(child, index) in props.row.child" :key="index"><span>{{ child.code }}</span><span>{{ child.name }}</span></p>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="code" width="75px">
          </el-table-column>
          <el-table-column prop="name" class="name-wrapper" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <span slot="footer" class="dialog-footer" v-if="type !== 'class'">
      <el-button type="primary" @click="btnSure">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import api from 'api'
  export default {
    components: {
    },
    data () {
      return {
        title: '请选择分类',
        dialogFormVisible: false,
        type: '',
        classify: [],
        loading: false,
        group: [],
        child: [],
        multipleSelection: []
      }
    },
    mounted () {
    },
    computed: {
      groupFun () {
        var pidArr = []
        for (let item of this.child) {
          if (pidArr.indexOf(item.pid) === -1) {
            pidArr.push(item.pid)
          }
        }
        for (let index in this.group) {
          this.group[index].pid = pidArr[index]
        }

        for (let item of this.group) {
          item.child = []
          for (let child of this.child) {
            if (item.pid === child.pid) {
              item.child.push(child)
            }
          }
        }
        return this.group
      }
    },
    methods: {
      getAllMarkClass () {
        this.loading = true
        api.getAllMarkClass({}).then((response) => {
          if (response.data.messageType === 1) {
            this.classify = response.data.data.list
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading = false
        })
      },
      getGroup (code) {
        this.loading = true
        api.getGroup({code: code}).then((response) => {
          if (response.data.messageType === 1) {
            let tableData = response.data.data
            this.group = []
            this.child = []
            for (let item of tableData) {
                if (item.isParent === 'true') {
                  this.group.push(item)
                } else {
                  this.child.push(item)
                }
            }
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading = false
        })
      },
      toggle (params) {
        this.type = params.type
        switch (params.type) {
          case 'class':
            this.getAllMarkClass()
            break
          default:
            let code = params.code
            if (code < 10) {
                code = '0' + code
            }
            this.getGroup(code)
            break
        }
        this.dialogFormVisible = params.dialogFormVisible
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      btnClass (item) {
        this.$emit('callbackClass', item.id)
        this.dialogFormVisible = false
      },
      btnSure () {
        let data = {
          codes: '',
          desc: ''
        }
        for (let item of this.multipleSelection) {
          data.codes += item.code + ','
          data.desc += item.name + ','
        }
        if (data.codes.length > 0) {
          data.codes = data.codes.substr(0, data.codes.length - 1)
        }
        if (data.desc.length > 0) {
          data.desc = data.desc.substr(0, data.desc.length - 1)
        }
        this.$emit('callbackGroup', data)
        this.dialogFormVisible = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .list_content{
    height: 450px;
    overflow: auto;
    li{
      white-space: nowrap;
      padding: 8px 15px;
      color: rgb(52,152,219);
      border-bottom: 1px solid rgb(228,228,228);
      cursor: pointer;
      &:hover{background-color: rgb(242,248,251);}
      span{
        margin-right:5px;
      }
    }
    .group-wrapper{
      .name-wrapper{white-space: nowrap;}
      .groupChild{
        white-space: nowrap;display: block;
        color: rgb(52,152,219);
        padding: 0 15px;
        margin-left: 100px;
        border-bottom: 1px solid rgb(228,228,228);
        cursor: pointer;
        &:hover{background-color: rgb(242,248,251);}
        span{margin-right: 5px}
      }
    }
  }

</style>
<style lang="scss">
  .dlg-classify-list{
    .el-dialog__body{padding: 20px 0 0 0;}
   .el-table__expanded-cell{padding:0}
  }
</style>
