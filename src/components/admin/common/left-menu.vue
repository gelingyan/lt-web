<template>
  <el-col :span="24">
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" theme="dark" @select="select">
      <template v-for="item in items">
        <el-submenu :index="item.id" v-if="item.children.length" :key="item.id">
          <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
          <template  v-for="child in item.children">
            <el-menu-item :index="child.index" :key="child.index">{{child.text}}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :index="item.index" :key="item.index" v-else><i :class="item.icon"></i>{{item.title}}</el-menu-item>
      </template>
    </el-menu>
  </el-col>
</template>

<script>
  import storage from '../../../module/storage'
  import menu from '../../../module/menu'
  export default {
    props: {},
    data () {
      return {
        items: menu
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
