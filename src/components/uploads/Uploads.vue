<template>
    <div>
        <el-upload
                class="upload-demo"
                :action="url"
                :show-file-list="false"
                :on-progress="handProgress"
                :on-error="handError"
                :headers="dataInfo"
                :before-upload="handBeforeUpload"
                :on-success="handSuccess">
            <el-button size="small" type="primary" icon="el-icon-upload">上传附件</el-button>
        </el-upload>
        <div id="progressFile">
            <div :style="{width:fileProgress}"></div>
        </div>
        <el-table
                min-height="50"
                :data="dataFileList"
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
                    label="操作"
                    align="center"
                    width="80">
                <template slot-scope="scope">
                    <!--v-if="tableData[scope.$index].TYPESTATUS==3"-->
                    <el-button
                            type="danger"
                            size="mini"
                            @click="editInfo(scope.row)">
                        删除
                    </el-button>
                </template>
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
import Vue from 'vue'
import API from '../../api'
import utils from '../utils.js'

export default {
  name: 'uploadDoc',
  props: ['msg'],
  data () {
    return {
      url: API.UPLOAD_FILE_URL,
      fileList: [],
      dataFileList: [],
      progress: 0
    }
  },
  methods: {
    // 文件上传成功
    handSuccess (response, file, fileList) {
      console.log('上传成功')
      this.progress = 0
      if (response.Success == false) {
        this.$message.warning(`文件上传失败！`)
      } else {
        this.dateFileList(file)
      }
    },
    // 删除附件
    editInfo (fileList) {
      this.$confirm(`确定移除 ${fileList.FILE_NAME}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loading = Vue.prototype.$loading(API.LOADING_INFO)
        this.$axios.get(API.UPLOAD_FILE_DELETE, {fileGuid: fileList.FILE_GUID}).then((res) => {
          if (res.data.Success == true) {
            this.$message.success(`文件删除成功！`)
            this.dataFileList = this.dataFileList.filter(k => k.FILE_GUID != fileList.FILE_GUID)
            this.reset()
          } else {
            this.$message.warning(res.data.Msg)
          }
        })
        loading.close()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 下载文件
    loadingFile (objFile) {
      window.location.href = API.UPLOAD_FILE_LOADING + objFile.FILE_GUID
    },
    // 新增附件列表信息
    dateFileList (fileList) {
      if (fileList) {
        this.dataFileList.push(fileList.response.rows[0])
      }
      this.reset()
    },
    handProgress (event, file, fileList) {
      this.progress = event.percent
    },
    // 文件上传失败
    handError (err, file, fileList) {
      this.$message.warning(`文件上传失败！`)
    },
    // 信息处理
    runInfo () {
      // 模块pkid
      if (this.$store.state.PKID_TOW) {
        this.msg.UploadCode.findPkid = this.$store.state.PKID_TOW
      } else {
        this.msg.UploadCode.findPkid = this.$store.state.PKID
      }

      // 用户信息
      this.msg.UploadCode.userId = utils.getCookie('userId')
    },
    handBeforeUpload () {
      this.runInfo()
    },
    // 初始化数据
    initDate () {
      this.dataFileList = []
      // 回写页面数据
      if (this.dataUploads != undefined && this.dataUploads.length > 0) {
        this.dataFileList = this.dataFileList.concat(this.dataUploads)
      }
    },
    // 附件列表回写
    reset () {
      this.$emit('listenUploadListEvent', {UPLOADS: this.dataFileList})
    }
  },
  computed: {
    fileProgress () {
      return this.progress + '%'
    },
    dataInfo () {
      return this.msg.UploadCode
    },
    dataUploads () {
      return this.msg.UPLOADS
    }
  },
  created () {
    this.initDate()
  },
  watch: {
    // 监听数据变化
    dataUploads () {
      this.initDate()
    }
  }
}
</script>

<style scoped>
    #progressFile {
        width: 100%;
        height: 2px;
    }

    #progressFile div {
        width: 0%;
        height: 2px;
        background: #67c23a;
    }
</style>
