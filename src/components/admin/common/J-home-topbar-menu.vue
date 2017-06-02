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
  import * as names from '../../../router/names'
    export default {
      data () {
        return {
          activeIndex: '',
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
                  text: '首页'
                }
              ]
            }
          ]
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
