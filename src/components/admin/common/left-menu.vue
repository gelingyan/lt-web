<template>
  <el-col :span="24">
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" theme="dark" @select="select">
      <template v-for="item in items">
        <el-submenu :index="item.id">
          <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
          <template  v-for="child in item.children">
            <el-menu-item :index="child.index">{{child.text}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </el-col>
</template>

<script>
  import * as names from '../../../router/names'
  import storage from '../../../module/storage'
  export default {
    props: {},
    data () {
      return {
        items: [
          {
            id: '1',
            icon: 'el-icon-setting',
            title: '用户管理',
            children: [
              {
                index: names.ADMIN_USER__LIST,
                text: '用户列表'
              }
            ]
          },
          {
            id: '2',
            icon: 'el-icon-menu',
            title: '商标管理',
            children: [
              {
                index: names.ADMIN_TRADEMARK__LIST,
                text: '商标列表'
              },
              {
                index: names.ADMIN_TRADEMARK__UPLOAD,
                text: '上传商标'
              }
            ]
          },
          {
            id: '3',
            icon: 'el-icon-document',
            title: '移动端',
            children: [
              {
                index: names.MOBILE__HOME,
                text: '主页'
              }
            ]
          }
        ]
      }
    },
    methods: {
      select (index) {
        this.$router.push({name: index})
      }
    },
    computed: {
      defaultActive () {
        return storage.getMenu().to
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
</style>
