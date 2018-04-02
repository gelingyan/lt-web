<template>
  <div class="simple">
      <sm-header @callback="callback" :classify="classify"></sm-header>
      <sm-search :classify="classify" ref="search" @search="searchCallback"></sm-search>
      <div class="content">
        <mt-loadmore :top-method="loadTop"
            ref="loadmore">
          <div ref="refContent" v-for="(item, index) in list" :key="index" class="mark-wrapper">
            <div @click="markDetail(item.id)">
              <sm-mark :data="item"></sm-mark>
            </div>
          </div>
        </mt-loadmore>
        <div class="tc spinner-wrapper" v-if="loading">
          <mt-spinner class="spinner" type="snake" color="#26a2ff"></mt-spinner>
        </div>

        <p v-if="(total === 0) && !loading" class="noData tc">暂无数据~~</p>
      </div>

      <!-- 分页 -->
      <el-pagination class="page"
        v-if="total > 0"
        background
        layout="prev, pager, next"
        :total="total" 
        :page-size="pageSize" 
        :current-page="currentPage" @current-change="handleCurrentChange">
      </el-pagination>
  </div>
</template>

<script>
import api from 'api'
import SmHeader from './header.vue'
import SmSearch from './search.vue'
import SmMark from './mark.vue'
import * as names from '@/router/names'
  export default {
    components: {
      SmHeader,
      SmSearch,
      SmMark
    },
    data () {
      return {
        list: [],
        classify: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        form: {
          classify: '',
          keyword: ''
        },
        loading: false
      }
    },
    mounted () {
      this.getAllMarkClass()
    },
    methods: {
      getData () {
        this.loading = true
        let params = Object.assign({}, this.form, {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        api.searchMarks(params).then((response) => {
          if (response.data.messageType === 1) {
            this.list = response.data.data.list
            this.total = response.data.data.total
            this.currentPage = response.data.data.currentPage
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
          this.loading = false
        })
      },
      callback (id) {
        this.$refs.search.value = id
        this.form.classify = id
        this.getData()
      },
      searchCallback (data) {
        this.form = data
        this.getData()
      },
      markDetail (id) {
        this.$router.push({name: names.simpleDetail.name, params: {id}})
      },
      getAllMarkClass () {
        api.getAllMarkClass({}).then((response) => {
          if (response.data.messageType === 1) {
            this.classify = response.data.data.list
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
        })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getData()
      },
      loadTop () {
        // 刷新数据
        this.getData()
        this.$refs.loadmore.onTopLoaded()
      }
    }
  }
</script>

<style scoped lang="scss">
.simple{
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  .mark-wrapper{
    padding: 10px 0
  }
  .content{
    position: relative;
    .spinner-wrapper{
      position: absolute;
      top: 0;
      width: 100%;
      bottom: 0;
      background: rgba(255, 255, 255, 0.5);
      .spinner{
        position: fixed;
        top: 200px;
        left: 50%;
        margin-left: -18px;
      }
    }
    .noData{
      font-size: 13px;
      color: #666;
      padding: 20px 0;
      border-top: 1px solid #eee;
      margin-top: 10px;
    }
  }
  .page{
    padding: 20px 10px 40px 10px;
    border-top: 1px solid #eee;
  }
}
</style>
<style lang="scss">
  body{
      background: #f9f9f9;
  }
  .page{
    &.el-pagination button, .el-pagination span{
      height: 30px;
    }
    .el-pager li{
      height: 30px;
    }
  }
</style>

