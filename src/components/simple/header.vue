<template>
  <div class="header">
      <div class="cf title">
          商标展示
          <el-button class="fr" size="small" @click="menuClick">
              <i class="iconfont icon-fenlei3"></i>
          </el-button>
      </div>
      <div class="content" v-if="menu">
          <ul>
              <li v-for="item in hotClassify" :key="item.id" @click="classifyClick(item)">{{item.code}}类<span class="name">{{item.name}}</span></li>
          </ul>
          <div :class="['more', active ? 'active' : '']" @click="moreClick">更多类别<i class="el-icon-caret-bottom"></i></div>
          <ul>
              <li v-show="active" v-for="item in classify" :key="`class${item.id}`" @click="classifyClick(item)">{{item.code}}类<span class="name">{{item.name}}</span></li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        classify: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
            menu: false,
            active: false
        }
    },
    computed: {
        hotClassify () {
            return this.classify.filter(item => item.hot > 0).sort((a, b) => {
                return a.hot - b.hot
            })
        }
    },
    methods: {
        menuClick () {
            this.menu = !this.menu
            this.active = false
        },
        moreClick () {
            this.active = !this.active
        },
        classifyClick (item) {
            this.$emit('callback', item.id)
            this.menu = false
            this.active = false
        }
    }
}
</script>

<style scoped lang="scss">
.header{
    border: 1px solid #eee;
    margin-bottom: 10px;
    color: #666;
    .title{
        font-size: 20px;
        padding: 10px;
        border-bottom: 1px solid #eee;
        background-color: #f9f9f9;
        i{
            font-weight: bold;
            font-size: 12px;
        }
    }
    .content{
        font-size: 15px;
        ul{
            padding: 0 10px;
            li {
                border-bottom: 1px solid #eee;
                padding-left: 10px;
                line-height: 40px;
                cursor: pointer;
                .name{
                    font-size: 14px;
                    margin-left: 10px;
                    color: #999;
                }
                &:last-child{
                    border-bottom: none;
                }
            }
        }
        .more{
            padding: 8px 10px;
            border-bottom: 1px solid #eee;
            border-top: 1px solid #eee;
            cursor: pointer;
            &.active{
                background-color: #eee;
            }
            i{
                font-size: 12px;
                margin-left: 5px;
            }
        }
    }
}
</style>
