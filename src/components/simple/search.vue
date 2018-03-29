<template>
    <div class="search">
        <el-row :gutter="10">
            <el-col :span="12">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in classify"
                        :key="item.id"
                        :label="`${item.code}类 ${item.name}`"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input v-model="input" placeholder="搜索...">
                    <el-button slot="append" icon="search" @click="search"></el-button>
                </el-input>
            </el-col>
        </el-row>
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
            value: '25',
            input: ''
        }
    },
    mounted () {
        this.search()
    },
    methods: {
        search () {
            let params = {
                classify: this.value,
                keyword: this.input
            }
            this.$emit('search', params)
        }
    }
}
</script>

<style scoped lang="scss">
.search{
    padding: 0 10px;
}
</style>
