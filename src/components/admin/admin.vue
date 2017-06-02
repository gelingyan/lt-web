<template>
  <div>
    <jk-top-menu></jk-top-menu>
    <el-row class="main">
      <el-col class="left-menu-wrapper"><jk-left-menu></jk-left-menu></el-col>
      <el-col class="content">
        <transition>
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {},
    components: {
      'jk-left-menu': require('./common/left-menu'),
      'jk-top-menu': require('./common/top-menu')
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .main{
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
    display: flex;
    .left-menu-wrapper{
      height: 100%;
      background: #324157;
      width: 15%;
      min-width: 200px;
    }
    .content{
      padding:10px;
      flex: 1;
      overflow: auto;
    }
  }
</style>
