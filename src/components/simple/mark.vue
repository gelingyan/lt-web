<template>
    <div class="mark">
        <el-row>
            <el-col :span="12">
                <img :src="data.files[0] ? data.files[0].data : 'static/img/bg.jpg'"/>
            </el-col>
            <el-col :span="12">
                <div class="content">
                    <p><span class="title">{{data.title}}</span>{{data.apply}}</p>
                    <p><el-tag type='primary'>第{{data.classify}}类</el-tag> 可售</p>
                    <p class="desc">{{data.explicate.substring(0,20)}}<span v-if="data.explicate.length>20">...</span></p>
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
        padding: 0 10px;
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
    }
}
</style>
