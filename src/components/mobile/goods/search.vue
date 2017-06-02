<template>
  <div class="choose-wrapper">
    <mt-field label="类别" placeholder="选择商标分类"></mt-field>
    <mt-picker v-show="false" :slots="slots" @change="onValuesChange" ref="picker"></mt-picker>
    </mt-radio>
    <p>价格</p>


    <p>类型</p>
    <p>注册年限</p>
    <p>快速筛选</p>

  </div>
</template>

<script>
    export default {
      data () {
        return {
          slots: [
            {
              flex: 1,
              values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
              className: 'slot'
            }
          ],
          options: [
            {
              label: '不限',
              value: '0'
            },
            {
              label: '1万以下',
              value: '1'
            },
            {
              label: '1-3万',
              value: '2'
            },
            {
              label: '3-5万',
              value: '3'
            },
            {
              label: '5-10万',
              value: '4'
            },
            {
              label: '10-20万',
              value: '5'
            }
          ],
          value: '0'
        }
      },
      methods: {
        onValuesChange (picker) {
          console.log(picker.getValues()[0])
        }
      }
    }
</script>

<style scoped lang="scss">
</style>
