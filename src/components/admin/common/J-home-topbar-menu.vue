<template>
  <div class="topbar-wrapper">
    <div class="topbar-box cf">
      <a class="logo-wrapper fl">
        <img src="./logo.png">
      </a>
      <div class="menu-wrapper fl">
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">

          <template v-for="item in items">
            <el-submenu :index="item.id" v-if="item.children">
              <template slot="title">{{item.title}}</template>
              <template v-for="child in item.children">
                <el-menu-item :index="child.index">
                  {{child.text}}
                </el-menu-item>
              </template>
            </el-submenu>
            <template v-else="item.children">
              <el-menu-item :index="item.id">{{item.title}}</el-menu-item>
            </template>
          </template>

        </el-menu>
      </div>
      <div class="tool-body"></div>
    </div>
  </div>
</template>

<script>
  import menu from '../../../module/menu'
    export default {
      data () {
        return {
          activeIndex: '',
          items: menu
        }
      },
      methods: {
        handleSelect (key, keyPath) {
          this.$router.push({name: key})
        }
      }
    }
</script>

<style scoped lang="scss">
  .topbar-wrapper{
    border-bottom: 1px solid hsla(0,0%,100%,.15);
    transition: background-color .2s .4s;
    .topbar-box{
      height: 60px;
      max-width: 1440px;
      margin: auto;
      .logo-wrapper{
        margin: 5px 50px 0 20px;
        img{width: 120px;height: 50px}
      }
      .menu-wrapper{
        .el-menu--dark{background-color: transparent;}
      }
    }
  }

</style>
