<template>
  <div class="header">
      <div class="cf title">
          商标展示<el-button class="fr" size="small" icon="menu"></el-button>
      </div>
      <div class="content">
          <ul>
              <li>25类 鞋服袜手套</li>
              <li>16类</li>
          </ul>
          <div class="more">更多类别<i class="el-icon-caret-bottom"></i></div>
          <ul>
              <li>20类</li>
              <li>33类</li>
          </ul>
      </div>
  </div>
</template>

<script>
  export default {
    methods: {
    }
  }
</script>

<style scoped lang="scss">
.header{
    border: 1px solid #eee;
    margin: 10px;
    color: #666;
    .title{
        font-size: 20px;
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    .content{
        font-size: 16px;
        line-height: 40px;
        ul{
            padding: 0 10px;
        }
        .more{
            padding: 0 10px;
            border-bottom: 1px solid #eee;
            border-top: 1px solid #eee;
            i{
                font-size: 12px;
                margin-left: 5px;
            }
        }
    }
}
</style>
