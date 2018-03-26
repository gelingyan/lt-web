<template>
  <ul class="product_content tc cf">
    <li class="fl" v-for="item in items" :key="item.id" @click="goodsClick(item)">
      <img :src="item.img">
      <span>{{item.title}}</span>
    </li>
  </ul>
</template>

<script>
  import * as names from '../../../router/names'
    export default {
      data () {
        return {
            items: [
              {id: 1, title: '01类 化工原料', img: 'static/img/class/01.png', path: ''},
              {id: 2, title: '02类 化工原料', img: 'static/img/class/02.png', path: ''},
              {id: 3, title: '03类 化工原料', img: 'static/img/class/03.png', path: ''},
              {id: 4, title: '04类 化工原料', img: 'static/img/class/04.png', path: ''},
              {id: 5, title: '05类 化工原料', img: 'static/img/class/05.png', path: ''},
              {id: 6, title: '06类 化工原料', img: 'static/img/class/06.png', path: ''},
              {id: 7, title: '07类 化工原料', img: 'static/img/class/07.png', path: ''},
              {id: 8, title: '08类 化工原料', img: 'static/img/class/08.png', path: ''},
              {id: 9, title: '09类 化工原料', img: 'static/img/class/09.png', path: ''},
              {id: 10, title: '10类 化工原料', img: 'static/img/class/10.png', path: ''},
              {id: 11, title: '11类 化工原料', img: 'static/img/class/11.png', path: ''},
              {id: 12, title: '12类 化工原料', img: 'static/img/class/12.png', path: ''},
              {id: 13, title: '13类 化工原料', img: 'static/img/class/13.png', path: ''},
              {id: 14, title: '14类 化工原料', img: 'static/img/class/14.png', path: ''},
              {id: 15, title: '15类 化工原料', img: 'static/img/class/15.png', path: ''},
              {id: 16, title: '16类 化工原料', img: 'static/img/class/16.png', path: ''},
              {id: 17, title: '17类 化工原料', img: 'static/img/class/17.png', path: ''},
              {id: 18, title: '18类 化工原料', img: 'static/img/class/18.png', path: ''},
              {id: 19, title: '19类 化工原料', img: 'static/img/class/19.png', path: ''},
              {id: 20, title: '20类 化工原料', img: 'static/img/class/20.png', path: ''},
              {id: 21, title: '21类 化工原料', img: 'static/img/class/21.png', path: ''},
              {id: 22, title: '22类 化工原料', img: 'static/img/class/22.png', path: ''},
              {id: 23, title: '23类 化工原料', img: 'static/img/class/23.png', path: ''},
              {id: 24, title: '24类 化工原料', img: 'static/img/class/24.png', path: ''},
              {id: 25, title: '25类 化工原料', img: 'static/img/class/25.png', path: ''},
              {id: 26, title: '26类 化工原料', img: 'static/img/class/26.png', path: ''},
              {id: 27, title: '27类 化工原料', img: 'static/img/class/27.png', path: ''},
              {id: 28, title: '28类 化工原料', img: 'static/img/class/28.png', path: ''},
              {id: 29, title: '28类 化工原料', img: 'static/img/class/29.png', path: ''},
              {id: 30, title: '30类 化工原料', img: 'static/img/class/30.png', path: ''},
              {id: 31, title: '31类 化工原料', img: 'static/img/class/31.png', path: ''},
              {id: 32, title: '32类 化工原料', img: 'static/img/class/32.png', path: ''},
              {id: 33, title: '33类 化工原料', img: 'static/img/class/33.png', path: ''},
              {id: 34, title: '34类 化工原料', img: 'static/img/class/34.png', path: ''},
              {id: 35, title: '35类 化工原料', img: 'static/img/class/35.png', path: ''},
              {id: 36, title: '36类 化工原料', img: 'static/img/class/36.png', path: ''},
              {id: 37, title: '37类 化工原料', img: 'static/img/class/37.png', path: ''},
              {id: 38, title: '38类 化工原料', img: 'static/img/class/38.png', path: ''},
              {id: 39, title: '39类 化工原料', img: 'static/img/class/39.png', path: ''},
              {id: 40, title: '40类 化工原料', img: 'static/img/class/40.png', path: ''},
              {id: 41, title: '41类 化工原料', img: 'static/img/class/41.png', path: ''},
              {id: 42, title: '42类 化工原料', img: 'static/img/class/42.png', path: ''},
              {id: 43, title: '43类 化工原料', img: 'static/img/class/43.png', path: ''},
              {id: 44, title: '44类 化工原料', img: 'static/img/class/44.png', path: ''},
              {id: 45, title: '45类 化工原料', img: 'static/img/class/45.png', path: ''}
            ]
        }
      },
      methods: {
        goodsClick (item) {
          this.$router.push({name: names.goodsClass.name, params: {keyword: item.id}})
        }
      }
    }
</script>

<style scoped lang="scss">
  .product_content{margin-bottom:55px;
    li{width:25%;border-bottom: 1px solid #eaeaea;padding:10px 0;
      background: url(./class_bg.png) no-repeat right center;
      &:nth-child(4n){background:none}
      img{display:block;width: 60%;margin: 0 auto;}
      span{font-size:0.32rem;color:#484848;padding-top:0.2rem;display: inline-block;}
    }
  }
  @media screen and (max-width: 320px){
    .content .product_content li{width: 33.3%;
      &:nth-child(4n){background:url(./class_bg.png) no-repeat right center;}
      &:nth-child(3n){background:none}
    }
  }
</style>
