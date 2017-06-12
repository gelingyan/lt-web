<template>
  <div>
    <div id="editorElem" style="text-align:left"></div>
  </div>
</template>

<script>
  import editorMenus from '../../../module/editorMenus'
  import E from 'wangeditor'
  export default {
    name: 'editor',
    props: ['uploadImgServer'],
    data () {
      return {
        editor: ''
      }
    },
    methods: {
    },
    mounted () {
      var editor = new E('#editorElem')
      editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
      //   editor.customConfig.uploadImgServer = this.uploadImgServer  // 上传图片到服务器
      //  this.$emit('content', editor.txt.html())

      // 自定义菜单配置
      editor.customConfig.menus = editorMenus
      editor.create()
      this.editor = editor
    }
  }
</script>

<style scoped>
</style>
