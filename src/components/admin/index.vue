<template>
  <div class="container">
    <div class="menu-wrapper">
      <J-home-topbar-menu></J-home-topbar-menu>
    </div>
    <J-home-banner-container></J-home-banner-container>
  </div>
</template>

<script>
  import api from '../../api'
  export default {
    components: {
      'J-home-topbar-menu': require('./common/J-home-topbar-menu'),
      'J-home-banner-container': require('./common/J-home-banner-container')
    },
    data () {
      return {}
    },
    mounted () {
     // this.ajaxFun()
     // this.axiosFun()
    },
    methods: {
      ajaxFun () {
        $.ajax({
          url: 'index/process',
          success: function () {
          }
        })
      },
      axiosFun () {
        api.process().then((response) => {
          if (response.data.messageType === 1) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
            this.dialogFormVisible = false
          } else if (response.data.messageType === 2) {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          console.log(error)
        }).finally(() => {
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    .menu-wrapper{
      position: absolute;
      width: 100%;
      z-index: 3;
    }
  }
</style>
