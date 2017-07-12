<template>
  <el-dialog :title="title" v-model="dialogFormVisible" customClass="dlg-classify-list">
      <ul class="list_content" v-loading.body="loading">
        <li v-for="item in options" @click="btnClass(item)"><span>{{item.code}}</span><span>{{item.type}}</span>{{item.name}}{{item.desc}}</li>
      </ul>
    </el-select>
  </el-dialog>
</template>

<script>
  import api from '../../api'
  export default {
    data () {
      return {
        title: '请选择分类',
        dialogFormVisible: false,
        options: [],
        loading: false
      }
    },
    mounted () {
    },
    methods: {
      getAllMarkClass () {
        this.loading = true
        api.getAllMarkClass({}).then((response) => {
          if (response.data.messageType === 1) {
            this.options = response.data.data.list
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading = false
        })
      },
      getGroup () {
        this.loading = true
        api.getAllMarkClass({}).then((response) => {
          if (response.data.messageType === 1) {
            this.options = response.data.data.list
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
        if (params.type === 'class') {
          this.getAllMarkClass()
        } else {
          console.log(params.code)
        //  this.getGroup(params.code)
        }
        this.dialogFormVisible = params.dialogFormVisible
      },
      btnClass (item) {
        this.$emit('callback', item.id)
        this.dialogFormVisible = false
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = {
            }
            console.log(params)
          } else {
            return false
          }
        })
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
  }

</style>
<style lang="scss">
  .dlg-classify-list{
    .el-dialog__body{padding: 20px 0 0 0;}
  }
</style>
