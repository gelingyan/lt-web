<template>
    <div class="detail" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="content">
            <div v-if="data.title">
                <img :src="data.files[0] ? data.files[0].data : 'static/img/bg.jpg'"/>
                <p><span class="title">{{data.title}}</span>{{data.apply}}</p>
                <p><el-tag type='primary'>第{{data.classify}}类</el-tag> 可售</p>
                <p class="desc">{{data.explicate}}</p>
                
                <p class="price">¥<span class="num">{{data.price}}</span></p>
            </div>

            <el-row :gutter="20">
                <el-col :span="12"><el-button class="btn" type="success">分 享</el-button></el-col>
                <el-col :span="12"><el-button class="btn" type="primary">咨 询</el-button></el-col>
            </el-row>
            <el-button class="btn" @click="back">返 回</el-button>
        </div>
        <div class="address tc">
            <p class="company">龙腾商标转让</p>
            <p>电话: <a href="tel:0573-85105515">0573-85105515</a></p>
            <p>编号: <a href="http://www.miitbeian.gov.cn/">浙ICP备16041652号-1</a></p>
        </div>
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
    font-size: 16px;
    color: #666;
    .content{
        padding: 10px 10px 20px 10px;
    }
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
        padding-bottom: 0;
        font-size: 18px;
        .num{
            font-size: 24px;
        }
    }
    .btn{
        width: 100%;
        margin-top: 15px;
    }
    .address{
        padding:30px 0 50px 0;
        color:#c3c6ca;background:#4e525e;
        .company{color:#d5b273;font-size:14px;padding: 10px;}
        a{color:#c3c6ca;}
    }
}
</style>
