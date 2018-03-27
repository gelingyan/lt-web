<template>
  <div ref="editor" style="text-align: left;"></div>
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: 'editor',
    props: ['inputContent'],
    data () {
      return {
        editor: null,
        editorContent: ''
      }
    },
    mounted () {
      if (!this.editor) {
        this.createEditor()
      }
    },
    methods: {
      createEditor () {
        this.editor = new E(this.$refs.editor)

        this.editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片

        this.editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        this.editor.create()
        // 设置内容
        this.editor.txt.html(this.inputContent)
      }
    }
  }
</script>

<style scoped lang="scss">
  .wangEditor-container{
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid #CCC;
  }
</style>
