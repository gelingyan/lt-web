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
          <span @click="del(index)"><i class="el-icon-delete2"></i></span>
        </span>
      </li>
    </ul>

    <el-upload
      class="upload-btn tc"
      name="upfile"
      :action="actionUrl"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeUpload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="" :visible.sync="dialogVisible" size="tiny">
      <div class="dialog-inner">
        <img :src="dialogImageUrl">
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      actionUrl: {
          required: true,
          type: String
      },
      format: {
          type: String,
          default: ''
      }
    },
    data () {
      return {
        dialogVisible: false,
        dialogImageUrl: '',
        files: []
      }
    },
    methods: {
      del (index) {
        this.files.splice(index, 1)
      },
      picturePreview (item) {
        this.dialogImageUrl = item.data
        this.dialogVisible = true
      },
      beforeUpload (file) {
        const isJPG = this.format.indexOf(file.type) > -1
        const isLt2M = file.size / 1024 < 60

        if (!isJPG) {
            this.$message.error(`上传文件只能是${this.format}格式!`)
        }
        if (!isLt2M) {
            this.$message.error('上传文件大小不能超过 50kb!')
        }
        this.loading = true
        return isJPG && isLt2M
      },
      handleSuccess (res, file) {
        if (res.data) {
          let item = {
            data: res.data.data.slice(2),
            name: res.data.name,
            size: res.data.size,
            type: res.data.type
          }
          this.files.push(item)
        } else {
          this.$message.error(res.message)
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
      width: 160px;
      height: 160px;
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
    width: 160px;
    height: 160px;
    cursor: pointer;
    line-height: 160px;
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
