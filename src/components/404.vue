<template>
  <div class="tc wrapper">
    <p class="title">404</p>
    <p class="content">抱歉！您所访问的页面不存在，
        <el-button type="primary" @click="back">返回首页</el-button>
    </p>
  </div>
</template>
<<script>
export default {
    methods: {
        back () {
            this.$router.push({path: '/'})
        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: absolute;
    top: 15%;
    width: 100%;
    .title{
        color: #86c2fe;
        text-shadow: 3px 2px 3px #86c2fe;
        font-size: 40px;
        padding: 40px 0;
    }
    .content{
        color: #86c2fe;
        font-size: 18px;
    }
}

</style>

