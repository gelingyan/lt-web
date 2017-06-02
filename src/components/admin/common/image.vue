<template>
  <div :style="{ display: display }">
    <section class="image-wrapper">
      <div v-if='isNone'>没有图片</div>
      <img v-if='!isNone' class='img-content' :src='imgBase64'>
    </section>
    <section class="cover-wrapper" @click='btnCoverClick()'>
    </section>
    <section class='image-previous'>
      <img src='/static/img/image-previous.png' @click='btnPrevious()'>
    </section>
    <section class='image-next'>
      <img src='/static/img/image-next.png' @click='btnNext()'>
    </section>
  </div>
</template>
<script>
  class Display {
    static none = 'none'
    static block = 'block'
  }
  import * as api from '../../api'
  export default {
    components: {},
    data () {
      return {
        display: Display.none,
        currentIndex: 0,
        currentImage: '',
        isNone: true,
        imgList: []
      }
    },
    computed: {
      imgBase64 () {
        return `data:image/png;base64,${this.currentImage}`
      }
    },
    mounted () {
    },
    methods: {
      show (item) {
        this.display = Display.block
        this.imgList.splice(0, this.imgList.length)
        api.resourceManage.getImage(item).then(response => {
          const data = response.data.data
          for (let img of data.imageFileVos) {
            this.imgList.push(img)
          }
        }, response => {
        }).catch((error) => {
          console.error(error)
        }).finally(() => {
          if (this.imgList.length !== 0) {
            this.currentImage = this.imgList[0].data
            this.isNone = false
          } else {
            this.isNone = true
          }
        })
      },
      btnPrevious () {
        if (this.imgList.length < 1) {
          this.isNone = true
          return
        }
        if ((this.currentIndex - 1) < 0) {
          this.currentIndex = -1
          this.isNone = true
          return
        }
        this.isNone = false
        this.currentIndex = this.currentIndex - 1
        this.currentImage = this.imgList[this.currentIndex].data
      },
      btnNext () {
        if (this.imgList.length < 1) {
          this.isNone = true
          return
        }
        if ((this.currentIndex + 1) >= this.imgList.length) {
          this.currentIndex = this.imgList.length
          this.isNone = true
          return
        }
        this.isNone = false
        this.currentIndex = this.currentIndex + 1
        this.currentImage = this.imgList[this.currentIndex].data
      },
      btnCoverClick () {
        this.display = Display.none
        this.currentIndex = 0
        this.currentImage = ''
        this.imgList.splice(0, this.imgList.length)
      }
    }
  }
</script>
<style scoped lang="scss">
  .image-wrapper {
    z-index: 2002;
    top: 15%;
    bottom: 15%;
    left: 15%;
    right: 15%;
    position: fixed;
    overflow: auto;
    margin: 0;
    border: 2rem solid #cccccc;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cover-wrapper {
    z-index: 2001;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
  }

  .image-previous {
    z-index: 2002;
    left: 5%;
    top: 45%;
    position: fixed;
  }

  .image-next {
    z-index: 2002;
    right: 5%;
    top: 45%;
    position: fixed;
  }

  .img-content {
    object-fit: contain;
    object-position: center;
    width: 98%;
    height: 98%;
  }
</style>
