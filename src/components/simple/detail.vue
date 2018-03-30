<template>
    <div class="detail" v-loading.fullscreen.lock="fullscreenLoading">
        <div v-if="data.title">
            <img :src="data.files[0] ? data.files[0].data : 'static/img/bg.jpg'"/>
            <p><span class="title">{{data.title}}</span>{{data.apply}}</p>
            <p><el-tag type='primary'>第{{data.classify}}类</el-tag> 可售</p>
            <p class="desc">{{data.explicate}}</p>
            
            <el-badge value="hot" class="item price">
                <p>¥<span class="num">{{data.price}}</span></p>
            </el-badge>
        </div>

        <el-row :gutter="20">
            <el-col :span="12"><el-button class="btn" type="success">分 享</el-button></el-col>
            <el-col :span="12"><el-button class="btn" type="primary">咨 询</el-button></el-col>
        </el-row>
        <el-button class="btn" @click="back">返 回</el-button>
    </div>
</template>

<script>
import api from 'api'
import * as names from '@/router/names'
export default {
    data () {
        return {
            data: {},
            fullscreenLoading: false
        }
    },
    mounted () {
        this.fullscreenLoading = true
        this.getData()
    },
    methods: {
        getData () {
            api.getMarkById({id: this.$route.params.id}).then((response) => {
            if (response.data.messageType === 1) {
                this.data = response.data.data
            } else if (response.data.messageType === 2) {
                this.$message.error(response.data.message)
            }
            }, (rejected) => {
            this.$message(rejected)
            }).finally(() => {
                this.fullscreenLoading = false
            })
        },
        back () {
            this.$router.push({name: names.simple.name})
        }
    }
}
</script>

<style scoped lang="scss">
.detail{
    padding: 10px;
    font-size: 16px;
    color: #666;
    img{
        width: 100%;
        border: 1px solid #eee;
        box-sizing: border-box;
        margin-bottom: 10px;
    }
    p{padding-bottom: 10px;}
    .title{
        font-weight: bold;
        color: #000;
        padding-right: 10px;
        font-size: 20px;
    }
    .desc{
        line-height: 20px;
    }
    .price{
        color: #FF0036;
        margin-top: 10px;
        .num{
            font-size: 24px;
        }
    }
    .btn{
        width: 100%;
        margin-top: 15px;
    }
}
</style>
