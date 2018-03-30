<template>
    <div class="search">
        <el-row :gutter="10">
            <el-col :span="12">
                <el-select v-model="form.classify" placeholder="请选择">
                    <el-option
                        v-for="item in classify"
                        :key="item.id"
                        :label="`${item.code}类 ${item.name}`"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="12">
                <el-input v-model="form.keyword" placeholder="搜索...">
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
            form: {
                classify: '25',
                keyword: ''
            }
        }
    },
    mounted () {
        this.$emit('search', this.form)
    },
    methods: {
        search () {
            this.$emit('search', this.form)
        }
    }
}
</script>

<style scoped lang="scss">
.search{
    padding: 0 10px;
}
</style>
