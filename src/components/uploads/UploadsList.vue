<template>
    <div>
        <el-table
                min-height="50"
                :data="msg"
                size="mini"
                border
                style="width: 100%">
            <el-table-column
                    label="序号"
                    type="index"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="FILE_NAME"
                    align="left"
                    sortable
                    label="附件名"
                    show-overflow-tooltip
            >
                <template slot-scope="scope">
                    <a class="loaddingFile" @click="loadingFile(scope.row)">{{scope.row.FILE_NAME}}</a>
                </template>
            </el-table-column>
            <el-table-column
                    prop="UPLOADER_TIME"
                    align="center"
                    sortable
                    label="上传时间"
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="FILE_SIZE"
                    align="center"
                    sortable
                    label="文件大小(kb)"
                    width="120">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import API from '../../api'

export default {
  name: 'uploadsList',
  props: ['msg'],
  methods: {
    // 下载文件
    loadingFile (objFile) {
      window.location.href = API.UPLOAD_FILE_LOADING + objFile.FILE_GUID
    }
  }
}
</script>

<style>

</style>
