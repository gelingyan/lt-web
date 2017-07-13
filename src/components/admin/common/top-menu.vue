<template>
  <el-row class="top-menu-wrapper">
    <el-col :span="12" class="logo-wrapper tl">龙腾商标转让</el-col>
    <el-col :span="12" class="user-wrapper tr">
      <span class="name">{{user.name}} / </span>
      <el-button type="text" class="logout" @click="logout">退出登录</el-button></el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
  import * as names from '../../../router/names'
  import storage from '../../../module/storage'
  export default {
    props: {
      items: {
        type: Array,
        default () {
        }
      }
    },
    data () {
      return {
        activeIndex: '1',
        user: {
          name: storage.getAdmin().user,
          src: '../../../assets/images/avatar.jpg'
        }
      }
    },
    methods: {
      logout () {
        this.$router.push({name: names.ADMIN__LOGIN})
      }
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .top-menu-wrapper{
    background: #324157;
    padding: 0 40px 0 20px;
    height: 60px;
    line-height: 60px;
    .logo-wrapper{
      font-size: 22px;
      color: #fff;
      letter-spacing: 2px;
      img{
        width:106px;
        display: inline-block;
      }
    }
    .user-wrapper{
      .name{color: #EFF2F7;
        font-size: 16px;
        vertical-align: middle;
      }
      .logout{
        color: #8492A6;
        font-size: 12px;
        text-decoration: underline;
      }
    }
  }
</style>
