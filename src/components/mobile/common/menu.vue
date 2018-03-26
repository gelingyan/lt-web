<template>
  <div class="menu cf">
    <div class="icon-wrapper" v-for="(item, index) in items" :key="index" @click.stop="menuClick(item)">
      <i class="tc iconfont" :class="item.icon">{{item.title}}</i>
    </div>
  </div>
</template>

<script>
  import * as names from '../../../router/names'
  import statue from '../../../module/statue'
  export default {
    data () {
      return {
        items: [
          {id: 1, title: '商标超市', icon: 'icon-shangdian1', name: names.goodsClass.name, keyword: 'all'},
          {id: 2, title: '原创商标', icon: 'icon-chuangyisheji', name: names.goodsClass.name, keyword: 'own'},
          {id: 3, title: '商标注册', icon: 'icon-shangbiaozhuce', name: names.document.name, keyword: 'registration'},
          {id: 4, title: '专利申请', icon: 'icon-shenqing1', name: names.document.name, keyword: 'application'},
          {id: 5, title: '商标分类', icon: 'icon-fenlei3', name: names.classily.name, navBottomflag: true},
          {id: 6, title: '商标查询', icon: 'icon-chaxun', name: names.goodsClass.name, keyword: 'search'},
          {id: 7, title: '转让流程', icon: 'icon-shangbiaozhuanrang', name: names.document.name, keyword: 'transfer'},
          {id: 8, title: '公司简介', icon: 'icon-gongsi', name: names.document.name, keyword: 'company'}
        ]
      }
    },
    mounted () {

    },
    methods: {
      menuClick (item) {
        if (item.navBottomflag) {
          // 菜单栏定位到分类查询
          statue.$emit('navActive', item.name)
          this.$router.replace({name: item.name})
        } else {
          this.$router.push({name: item.name, params: {keyword: item.keyword}})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .menu{
    background:#fff;border-top:1px solid #e3e3e3;padding:0.3rem 0;
    .icon-wrapper{width: 25%;float:left;
      .iconfont{
        font-size: 0.32rem;color:#333;width: 100%;display:block;
        &:before{
           font-weight: normal;
           display:block;
           margin: 0 auto 0.1rem auto;
           color:#fff;
           font-size: 0.6rem;
           width: 1.2rem;
           height: 1.2rem;
           line-height: 1.2rem;
           border-radius: 8px;
         }
      }
      &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4){margin-bottom:0.3rem}
      &:nth-child(1) .iconfont:before{background:#fe970f;}
      &:nth-child(2) .iconfont:before{background:#804eea;}
      &:nth-child(3) .iconfont:before{background:#f51c4b;}
      &:nth-child(4) .iconfont:before{background:#16d997;}
      &:nth-child(5) .iconfont:before{background:#2cc2f9;}
      &:nth-child(6) .iconfont:before{background:#ffb900;}
      &:nth-child(7) .iconfont:before{background:#f63d87;}
      &:nth-child(8) .iconfont:before{background:#ff772b;}
    }

  }
</style>
