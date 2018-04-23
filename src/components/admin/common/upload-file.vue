<template>
    <el-upload
        :disabled="disabled"
        ref="upload"
        name="upfile"
        class="avatar-uploader"
        :action="actionUrl"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload">
        <span v-if="fileUrl">{{fileUrl}}</span>
        <el-button v-else size="small" type="success" :disabled="disabled" :loading="loading">点击上传</el-button>
        <span v-if="tip && !fileUrl" slot="tip" class="el-upload__tip"> {{tip}}</span>
    </el-upload>
</template>

<script>
export default {
    name: 'upload',
    data () {
        return {
            fileUrl: '',
            loading: false
        }
    },
    props: {
        index: {
            required: true,
            type: Number,
            default: 0
        },
        actionUrl: {
            required: true,
            type: String
        },
        format: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tip: {
            type: String,
            default: ''
        }
    },
    mounted () {
        this.$refs.upload.clearFiles()
    },
    methods: {
        handleSuccess (res, file) {
            this.loading = false
            if (res.data) {
                this.fileUrl = res.data.name
                let data = {
                    index: this.index,
                    file: res.data
                }
                this.$emit('callbackFile', data)
            }
        },
        beforeUpload (file) {
            const isJPG = this.format.indexOf(file.type) > -1
            const isLt2M = file.size / 1024 < 60

            if (!isJPG) {
                this.$message.error(`上传文件只能是${this.format}格式!`)
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 50kb!')
            }
            this.loading = true
            return isJPG && isLt2M
        }
    }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
