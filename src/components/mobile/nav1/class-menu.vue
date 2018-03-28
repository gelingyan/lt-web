<template>
  <nav class="class-menu tc cf">
    <div class="class-item" v-for="(item, index) in items" @click="classClick(item)" :key="index">
      <label>{{item.title}}</label>
      <span>{{item.label}}</span>
      <img :src="item.img">
    </div>
  </nav>
</template>

<script>
import * as names from '@/router/names'
    export default {
      data () {
        return {
          items: [
            {id: 1, title: '服装', label: '第25类', img: 'static/img/nav1/1.png', keyword: 25},
            {id: 2, title: '美食', label: '第29类', img: 'static/img/nav1/2.png', keyword: 29},
            {id: 3, title: '皮具皮革', label: '第18类', img: 'static/img/nav1/3.png', keyword: 18},
            {id: 4, title: '美妆', label: '第03类', img: 'static/img/nav1/4.png', keyword: 3},
            {id: 5, title: '电子产品', label: '第09类', img: 'static/img/nav1/5.png', keyword: 9},
            {id: 6, title: '医疗', label: '第05类', img: 'static/img/nav1/6.png', keyword: 5},
            {id: 7, title: '餐饮住宿', label: '第43类', img: 'static/img/nav1/7.png', keyword: 43},
            {id: 8, title: '家电', label: '第11类', img: 'static/img/nav1/8.png', keyword: 11}
          ]
        }
      },
      methods: {
        classClick (item) {
          this.$router.push({name: names.goodsClass.name, params: {keyword: item.keyword}})
        }
      }
    }
</script>

<style scoped lang="scss">
  .class-menu{padding-top:0.1rem;border-bottom: 1px solid #e3e3e3;
    .class-item{width:23%;float: left;padding: 0.15rem 1%;margin-bottom:0.2rem;
      label{color:#484848;font-weight: bold;margin:0;display: block;}
      span{font-size:0.34rem;color:#666;display: block;}
      img{display:block;width: 80%;margin: 0 auto;}
    }
  }
</style>
