<template>
<div class="step1">
    <el-steps :active="1" class="step-wrapper">
        <el-step title="步骤1" description="编辑商标图片、商标名称、申请/注册号"></el-step>
        <el-step title="步骤2" description="批量编辑国际分类、类似群、商品/服务、专用权期限、商标价格、人气指数"></el-step>
        <el-step title="步骤3" description="批量上传"></el-step>
    </el-steps>

    <el-table :data="tableData" border style="width: 100%" highlight-current-row class="trademark-list">
        <el-table-column type="index" width="60"> </el-table-column>
        <el-table-column label="商标图片" width="300">
            <template slot-scope="scope">
              <input :disabled="scope.row.disabled" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" :ref="`inputFile${scope.row.id}`" @change="fileChange(scope.$index, scope.row)"/>
            </template>
        </el-table-column>
        <el-table-column label="商标名称">
            <template slot-scope="scope">
                <el-input :disabled="scope.row.disabled" size="small" v-model="scope.row.title" placeholder="请输入内容"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="apply" label="申请/注册号">
            <template slot-scope="scope">
                <el-input :disabled="scope.row.disabled" size="small" v-model="scope.row.apply" placeholder="请输入内容"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
            <template slot-scope="scope">
                <el-button :disabled="scope.row.disabled" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <el-button v-if="scope.row.disabled" size="small" type="primary" @click="handleCancel(scope.$index, scope.row)">撤销</el-button>
                <el-button v-if="!tableData[scope.$index+1]" size="small" type="primary" @click="handleAdd">新增</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="tc">
      <el-button type="primary" @click="next">下一步</el-button>
      <el-button @click="clear">清 空</el-button>
    </div>
</div>
</template>
<script>
  export default {
    data () {
      return {
        tableData: [
          {
            id: 1,
            files: [],
            title: '',
            apply: '',
            disabled: false
          }
        ]
      }
    },
    methods: {
      fileChange (index, row) {
        let files = this.$refs[`inputFile${row.id}`].files
        for (let file of files) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            if (this.tableData[index]['files'].length > 24) {
                alert('文件数量不得超过25')
                return
            }
            if (Number(file.size) > 61440) { // 60M*1204
                this.$message('上传图片不能大于60kb，请重新上传图片')
                this.$refs[`inputFile${row.id}`].value = ''
                return
            }
            let item = {data: e.target.result, name: file.name, size: file.size, type: file.type}
            this.tableData[index]['files'].push(item)
          }
        }
      },
      handleDelete (index, row) { // 删除
        let checkData = this.tableData.filter(item => !item.disabled)
        if (checkData.length === 1) {
          this.$message('只有一条数据不能删除')
          return
        }
        // 暂时用不能编辑
        this.tableData[index].disabled = true
      },
      handleCancel (index, row) { // 删除
        this.tableData[index].disabled = false
      },
      handleAdd () { // 新增
        if (this.tableData.length >= 20) {
          this.$message('批量上传数据不能超过20条')
          return
        }
        let newId = this.tableData[this.tableData.length - 1].id + 1
        this.tableData.push({
          id: newId,
          files: [],
          title: '',
          apply: '',
          disabled: false
        })
      },
      next () {
        for (let key in this.tableData) {
          if (!this.tableData[key].disabled) {
            if (!((this.tableData[key].files.length > 0) && (this.tableData[key].title) && (this.tableData[key].apply))) {
              this.$message(`第${Number(key) + 1}条数据填写不完整`)
              return
            }
          }
        }
        let checkData = this.tableData.filter(item => !item.disabled)
        this.$emit('callbackStep1', checkData)
      },
      clear () {
        this.tableData = this.tableData.map((item, index) => {
          this.$refs[`inputFile${item.id}`].value = ''
          return {
            files: [],
            title: '',
            apply: '',
            disabled: false
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.step1{
  padding: 20px 0;
  .step-wrapper{
    padding-left: 100px;
  }
  .trademark-list{
    margin: 20px 0;
  }
}
</style>

