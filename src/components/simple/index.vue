<template>
  <div class="simple">
      <sm-header @callback="callback" :classify="classify"></sm-header>
      <sm-search :classify="classify" ref="search" @search="search"></sm-search>
      <div v-for="(item, index) in list" :key="index" class="mark-wrapper">
        <div @click="markDetail(item.id)">
          <sm-mark :data="item"></sm-mark>
        </div>
      </div>
      <p v-if="list.length === 0" class="noData tc">暂无数据~~</p>
      <!-- todo分页 -->
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
        pageSizes: [20, 30, 40, 50],
        pageSize: 20,
        total: 0
      }
    },
    mounted () {
      this.getAllMarkClass()
    },
    methods: {
      search (data) {
        let params = Object.assign({}, data, {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        this.list = []
        api.searchMarks(params).then((response) => {
          if (response.data.messageType === 1) {
            this.list = response.data.data.list
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
        let parasm = {
          classify: id,
          keyword: this.$refs.search.input
        }
        this.search(parasm)
      },
      markDetail (id) {
        this.$router.push({name: names.simpleDetail.name, params: {id}})
      },
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
      }
    }
  }
</script>

<style scoped lang="scss">
.simple{
  .mark-wrapper{
    padding: 10px 0
  }
  .noData{
      font-size: 14px;
      padding-top: 20px;
      color: #666;
      border-top: 1px solid #eee;
      margin-top: 10px;
  }
}
</style>
