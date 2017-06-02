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
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
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
          prop="class">
        </el-table-column>
      </el-table>

    </el-row>
  </section>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        tableData: [{
          apply: '12987122',
          title: '好滋好味鸡蛋仔',
          class: '国际分类',
          term: '专利权期限',
          group: [],
          desc: '商品/服务',
          price: '商标价格',
          hot: '人气指数'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .search-wrapper {
    padding: 20px 0 20px 0
  }
</style>
