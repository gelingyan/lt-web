<template>
  <div class="upload-wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商标管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <step-one v-show="step === 1" @callbackStep1="callbackStep1"></step-one>
    <step-two v-show="step === 2" @callbackStep2="callbackStep2" @callbackStep2Back="step = 1"></step-two>

    <div v-show="step === 3" class="step3">
      <el-steps :active="3" class="step-wrapper">
          <el-step status="success" title="步骤1" description="编辑商标图片、商标名称、申请/注册号"></el-step>
          <el-step status="success" title="步骤2" description="批量编辑国际分类、类似群、商品/服务、专用权期限、商标价格、人气指数"></el-step>
          <el-step :status="status" title="步骤3" description="批量上传"></el-step>
      </el-steps>

       <el-table v-loading="loading" :data="tableData" border style="width: 1000px" class="trademark-list">
        <el-table-column type="index" width="60"> </el-table-column>
        <el-table-column label="商标名称" prop="title"></el-table-column>
        <el-table-column label="申请/注册号" prop="apply"></el-table-column>
        <el-table-column label="结果" width="300">
            <template slot-scope="scope">
              <i class="el-icon-circle-check" style="color:#13ce66" v-if="scope.row.msg === 'success'" ></i>
              <i class="el-icon-circle-close" style="color:#ff4949" v-if="scope.row.msg === 'error'" ></i>
            </template>
        </el-table-column>
      </el-table>

      <div class="tc">
        <el-button type="primary" @click="step = 1">重新上传</el-button>
        <el-button @click="back">返回列表</el-button>
      </div>
      
    </div>


  </div>
</template>
<script>
  import api from 'api'
  import * as names from '@/router/names'
  export default {
    components: {
      'step-one': require('./step1.vue'),
      'step-two': require('./step2.vue')
    },
    data () {
      return {
        step: 1,
        data: [],
        loading: false,
        status: 'wait',
        tableData: []
      }
    },
    methods: {
      back () {
        this.$router.push({name: names.trademark.name})
      },
      callbackStep1 (list) {
        this.step = 2
        this.data = list
      },
      callbackStep2 (data) {
        this.step = 3
        this.loading = true
        let params = this.data.map(item => {
          return {
            files: item.files,
            title: item.title, // 商标名称 1
            apply: item.apply, // 申请/注册号 1
            classify: data.classify, // 国际分类 1
            type: data.type, // 商标类型 0
            timeLimit: data.timeLimit, // 专用权期限 0
            similarGroup: data.similarGroup, // 类似群 0
            explicate: data.explicate, // 商品/服务 0
            price: data.price, // 商标价格 1
            hot: data.hot // 人气指数 0
          }
        })

        api.addMarkList(params).then((response) => {
          this.tableData = response.data.data || []
          if (response.data.messageType === 1) {
            this.status = 'success'
            this.$message({
              type: 'success',
              message: response.data.message
            })
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
            this.status = 'error'
          }
        }).catch(error => {
          this.status = 'error'
          console.log(error)
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.step3{
  padding: 20px 0;
  .step-wrapper{
    padding-left: 100px;
  }
  .trademark-list{
    margin: 20px 0;
  }
}
</style>

