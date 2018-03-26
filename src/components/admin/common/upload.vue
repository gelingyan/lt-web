<template>
  <div class='upload-container'>
    <ul class='files-container'>
      <li v-for="(item, index) in files" :key="index">
        <img :src="item.data">
        <label>
          <i class="el-icon-check"></i>
        </label>
        <span class="actions">
          <span @click="picturePreview(item)"><i class="el-icon-view"></i></span>
          <span @click="del(item)"><i class="el-icon-delete2"></i></span>
        </span>
      </li>
    </ul>
    <div @click='btnUpload' ref='btnFile' class="upload-btn tc">
      <i class="el-icon-plus"></i>
      <input type="file" style="display:none" accept="image/png, image/jpeg, image/gif, image/jpg" multiple="multiple" @change="fileChange" ref='inputFile'/>
    </div>
    <el-dialog title="" v-model="dialogVisible" size="tiny">
      <div class="dialog-inner">
        <img :src="picturePreviewSrc">
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    components: {},
    props: {},
    data () {
      return {
        dialogVisible: false,
        picturePreviewSrc: '',
        files: []
      }
    },
    methods: {
      del (item) {
        this.files.splice(this.files.indexOf(item), 1)
      },
      picturePreview (item) {
        this.picturePreviewSrc = item.data
        this.dialogVisible = true
      },
      btnUpload () {
        this.$refs.inputFile.click()
      },
      fileChange () {
        const files = Array.from(this.$refs.inputFile.files)
        for (let file of files) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            if (this.files.length > 24) {
              alert('文件数量不得超过25')
              return
            }
            let item = {data: e.target.result, name: file.name, size: file.size, type: file.type}
            this.files.push(item)
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .files-container{
    margin: 0;
    display: inline;
    vertical-align: top;
    li{
      overflow: hidden;
      background-color: #fff;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      margin: 0 8px 8px 0;
      display: inline-block;
      transition: all .5s cubic-bezier(.55,0,.1,1);
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      label{
        position: absolute;
        right: -15px;
        top: -6px;
        width: 40px;
        height: 24px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
        i{
          color: #fff;
          font-size: 12px;
          margin-top: 11px;
          transform: rotate(-45deg) scale(.8);
        }
      }
      .actions{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0,0,0,.5);
        transition: opacity .3s;
        &:hover {
          opacity: 1;
        }
       span{
         cursor: pointer;
         padding: 5px;
       }
       &:after{
          display: inline-block;
          content: "";
          height: 100%;
          vertical-align: middle;
        }
      }
      &:hover{
        label{display: none}
      }
    }
  }
  .upload-btn{
    display: inline-block;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 148px;
    vertical-align: top;
    i{
      font-size: 28px;
      color: #8c939d;
    }
    &:hover {
       border-color: #20a0ff;
       color: #20a0ff;
     }
  }
  .dialog-inner{
    img{width: 100%}
  }
</style>
