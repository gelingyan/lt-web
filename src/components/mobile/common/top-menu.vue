<template>
  <!--Header-->
  <div>
    <mt-header :title="title">
      <mt-button slot="left" @click="leftBtnClick">
          <i class="iconfont left-icon" :class="leftIcon"></i>
      </mt-button>
      <mt-button slot="right" @click="rightBtnClick">
        <i class="iconfont" :class="rightIcon"></i>
      </mt-button>
    </mt-header>

    <jk-side-user ref="sideUser"></jk-side-user>
    <transition name="move">
      <div v-show="navCcontentShow" class="nav-content">
        <jk-nav-content></jk-nav-content>
      </div>
    </transition>
  </div>

</template>
<script>
  export default {
    components: {
      'jk-nav-content': require('./nav-content.vue'),
      'jk-side-user': require('./side-user.vue')
    },
    props: {
      title: {
        type: String,
        default () {
          return '龙腾商标转让'
        }
      },
      rightIcon: {
        type: String,
        default () {
          return ''
        }
      },
      leftIcon: {
        type: String,
        default () {
          return 'icon-iconzhuanqu56'
        }
      },
      leftBtnEnabled: {
        type: Boolean,
        default () {
          return true
        }
      }
    },
    data () {
       return {
         navCcontentShow: false,
         backFlag: false
       }
    },
    mounted () {
      this.$nextTick(function () {
      })
    },
    methods: {
      leftBtnClick () {
        if (this.leftBtnEnabled) {
          this.$refs.sideUser.popupVisible = true
        } else {
          window.history.go(-1)
        }
      },
      rightBtnClick () {
        this.navCcontentShow = !this.navCcontentShow
      }
    },
    computed: {
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .iconfont{font-size: 20px;
    &.left-icon{font-size: 22px;}
  }
  .nav-content{
    position: fixed;background: #fff;width: 100%;height: 100%;top:40px;left:0;
  }
  .move-enter-active, .move-leave-active{transition: all 0.5s}
  .move-enter, .move-leave-active{left:100%}
</style>
