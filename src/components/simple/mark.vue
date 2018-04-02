<template>
    <div class="mark">
        <el-row>
            <el-col :span="12">
                <img v-lazy="data.files[0] ? data.files[0].data : 'static/img/bg.jpg'"/>
            </el-col>
            <el-col :span="12">
                <div class="content">
                    <p><span class="title">{{data.title}}</span>{{data.apply}}</p>
                    <p><el-tag type='primary'>第{{data.classify}}类</el-tag> 可售</p>
                    <p class="desc">{{data.explicate.substring(0,20)}}<span v-if="data.explicate.length>20">...</span></p>
                    <el-button class="btn" type="primary" size="small" plain>查看价格</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style scoped lang="scss">
.mark{
    padding: 10px;
    border-top: 1px solid #eee;
    img{
        width: 100%;
        border: 1px solid #eee;
        box-sizing: border-box;
    }
    .content{
        font-size: 13px;
        color: #666;
        padding: 5px 10px;
        overflow: hidden;
        p{padding-bottom: 5px;}
        .title{
            font-weight: bold;
            color: #000;
            padding-right: 10px;
            font-size: 16px;
        }
        .desc{
            line-height: 20px;
        }
        .btn{margin-top: 10px;}
    }
}
</style>
