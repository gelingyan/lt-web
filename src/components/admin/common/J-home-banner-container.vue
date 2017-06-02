<template>
  <div class="block">
    <el-carousel trigger="click" height="560px" :autoplay="false">

      <el-carousel-item v-for="item in items" :key="item.id">
        <el-row>
          <el-col :span="12">
            <div class="left-header">
              <h1> {{item.h1}} </h1>
              <p> {{item.p}} </p>
              <button>查看详情</button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="banner-row">
              <div class="right-image" v-for="img in item.imgList"><img :src="img.src"></div>
            </div>
          </el-col>
        </el-row>
      </el-carousel-item>

    </el-carousel>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          items: [
            {
              id: 1,
              h1: '智能科技点亮天府之国',
              p: '5月23日云栖大会 · 成都峰会报名倒计时',
              btn: '',
              imgList: [
                {src: 'static/img/home/TB1kASeRXXXXXX8XFXXXXXXXXXX-1600-1120.png'},
                {src: 'static/img/home/TB1MtOARXXXXXa6XXXXXXXXXXXX-1600-1120.png'},
                {src: 'static/img/home/TB1649xRXXXXXXBXXXXXXXXXXXX-1600-1120.png'}
              ]
            },
            {
              id: 2,
              h1: '解读即将实施的《网络安全法》',
              p: '规避巨额罚单',
              btn: '',
              imgList: [
                {src: 'static/img/home/TB1360jRXXXXXXqXVXXXXXXXXXX-1600-1120.png'},
                {src: 'static/img/home/TB1gHNvRXXXXXXrXFXXXXXXXXXX-1600-1120.png'},
                {src: 'static/img/home/TB11.Q_QVXXXXXKaXXXXXXXXXXX-1600-1120.png'}
              ]
            },
            {
              id: 3,
              h1: 'OSS Archive 全新上线',
              p: 'OSS三种存储类型，满足您的不同存储需求',
              btn: '',
              imgList: [
                {src: 'static/img/home/TB1y0ukRXXXXXbZXpXXXXXXXXXX-1600-1120.png'},
                {src: 'static/img/home/TB1aSWnRXXXXXcGXpXXXXXXXXXX-1600-1120.png'},
                {src: 'static/img/home/TB1igKqRXXXXXbqXpXXXXXXXXXX-1600-1120.png'}
              ]
            },
            {
              id: 4,
              h1: '最受开发者欢迎的视频课程',
              p: '技术的名义· 阿里云大学诚意出品',
              btn: '',
              imgList: [
                {src: 'static/img/home/TB15RjFQVXXXXbvXVXXXXXXXXXX-1600-1120.png'},
                {src: 'static/img/home/TB12xYfQVXXXXXcaFXXXXXXXXXX-1600-1120.png'},
                {src: 'static/img/home/TB1EyHUQVXXXXctXpXXXXXXXXXX-1600-1120.png'}
              ]
            },
            {
              id: 5,
              h1: 'OSS Archive 全新上线',
              p: 'OSS三种存储类型，满足您的不同存储需求',
              btn: '',
              imgList: [
                {src: 'static/img/home/TB1QRR_RXXXXXXYapXXXXXXXXXX-1600-1120.png'},
                {src: 'static/img/home/TB1mRisRXXXXXcaXFXXXXXXXXXX-1600-1120.png'},
                {src: 'static/img/home/TB1WIWiRXXXXXXraXXXXXXXXXXX-1600-1120.png'}
              ]
            }
          ]
        }
      }
    }
</script>

<style scoped lang="scss">
  .block{background: rgb(36, 40, 44);}
  .el-carousel__item{
    .el-row{
      min-width: 1000px;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      color: #fff;
      .left-header{
        position: absolute;
        top: 200px;
        left: 0;
        text-align: left;
        line-height: 50px;
        h1{
          font-size: 44px;
          font-weight: 400;
        }
        p{font-size: 20px;}
        button{
          outline: none;
          cursor: pointer;
          margin-top: 30px;
          font-size: 16px!important;
          float: left;
          width: 120px;
          height: 36px;
          background: transparent;
          color: #fff;
          transition: color .3s ease-in-out,background .3s ease-in-out;
          &:hover{
             color: #373d41;
             background: #fff;
           }
        }
      }
      .banner-row{
        img{
          width: 800px;
          position: absolute;
          right: -60px;
        }
      }
    }

  }



  .el-carousel__item:nth-child(2n) {
  /*  background-color: #99a9bf; */
  }

  .el-carousel__item:nth-child(2n+1) {
/*    background-color: #d3dce6; */
  }
</style>
