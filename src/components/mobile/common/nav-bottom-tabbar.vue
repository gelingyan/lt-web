<template>
  <mt-tabbar v-model="tabSelected" :fixed="true">
    <template v-for="item in items">
      <mt-tab-item :id="item.name" :key="item.name" @click.native="navclick(item)">
        <i class="iconfont" slot="icon" :class="item.icon"></i>
        {{item.name}}
      </mt-tab-item>
    </template>
  </mt-tabbar>
</template>
<script>
  import storage from '../../../module/storage'
  import statue from '../../../module/statue'
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data () {
       return {
         tabSelected: storage.getMenu().to,
         itemData: []
       }
    },
    mounted () {
      var vm = this
      statue.$on('navActive', function (msg) {
        vm.tabSelected = msg
      })
    },
    methods: {
      navclick (item) {
        this.$emit('navclick', item)
      }
    },
    computed: {
    }
  }
</script>
<style scoped lang="scss">
  .iconfont{font-size:22px}
  .mint-tabbar.is-fixed{z-index: initial;}
</style>
