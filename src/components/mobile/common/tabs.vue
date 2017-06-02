<template>
  <div>
    <!--navbar-->
    <mt-navbar v-model="navSelected">
      <template v-for="item in items">
        <mt-tab-item :id="item.id">
          {{item.title}}
        </mt-tab-item>
      </template>
    </mt-navbar>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        navSelected: '1'
      }
    },
    watch: {
      'navSelected' () {
        this.$emit('selectChanged', this.navSelected)
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
</style>
