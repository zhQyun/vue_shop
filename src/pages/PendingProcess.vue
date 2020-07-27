<template>
    <div class="homeBox">
    <h4 class="H2">待审流程</h4>
    <M-Table-List v-loading="loading">
        <div slot="Info">
            <el-form :inline="true" :model="formInline" size="mini">
                <el-form-item label="模块名称">
                    <el-select v-model="formInline.MODELID" default-first-option clearable>
                        <el-option v-for="mk in commonInfo" :label="mk.name" :value="mk.value" :key="mk.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchRecord" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div slot="TableDom">
            <el-table  :height="sHeight" ref="multipleTable" :data="tableData" size="mini" border>
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column label="操作" align="center" width="80">
                    <template slot-scope="scope">
                        <el-button type="success" @click="editInfo({row:scope.row,pageType:scope.row.url,title:scope.row.PROCESS_NAME+'-执行'})">执行</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="PROCESS_NAME" align="left" label="流程名称" sortable show-overflow-tooltip></el-table-column>
                <el-table-column prop="PERSON" align="center" label="发起人" sortable width="120"></el-table-column>
                <el-table-column prop="DATE" align="center" label="发起日期" sortable width="150" ></el-table-column>
                <el-table-column prop="STATUS_WORK" align="center" label="当前处理节点" sortable width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="TRACER" align="center" label="当前处理人" sortable width="120"></el-table-column>
            </el-table>
        </div>
        <div slot="Pagination">
            <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
        </div>
        <div slot="Dialog">
            <M-Dialog :msg.sync="dialogInfo">
                <approval-Tabs>
                <component @closeDialog="closeDialog" @updateData="updateData" :is="returnPageType" ></component>
                </approval-Tabs>
            </M-Dialog>
        </div>
    </M-Table-List>
    </div>
</template>
<script>
import Vue from 'vue'

// 引用分页组件
import paginationCommon from '../components/Pagination.vue'

import approvalTabs from '../components/ApprovalTabs.vue'
// const SchemeApprovalComponent = () => import(/* webpackChunkName: "qualityResearch" */ '../pages/qualityResearch/qualitySurveyTable/schemeApproval.vue');
// const WarnApprovalComponent = () => import(/* webpackChunkName: "qualityResearch" */ '../pages/qualityResearch/qualitySurveyTable/warnApproval.vue');

// 引用
import API from '../api'
// 引入动画效果
import {Loading} from 'element-ui'
// storeType
import TYPE from '../store/storeType'

const reliabilityCommitteeManageApprovalComponent = () => import(/* webpackChunkName: "qualityResearch" */ '../pages/reliabilityManage/reliabilityCommitteeManage/dialogTabs/Approval.vue')
const reliabilityCommitteeManageCheckComponent = () => import(/* webpackChunkName: "qualityResearch" */ '../pages/reliabilityManage/reliabilityCommitteeManage/dialogTabs/check.vue')
export default {
  name: '',
  components: {
    paginationCommon,
    approvalTabs,
    reliabilityCommitteeManageApprovalComponent,
    reliabilityCommitteeManageCheckComponent
  },
  data () {
    return {
      formInline: {
        MODELID: ''
      },
      approvalComponent: '',
      loading: false,
      commonInfo: API.COMMON_MODEL_TYPE,
      tableData: [
      ],
      pagination: {
        current: 1,
        total: 0,
        pagesize: 50
      },
      sHeight: this.$store.state.bodyBox.tableHeight,
      dialogInfo: {}// 弹出框信息

    }
  },
  created () {
    // if (this.listenDataUSER_ID != '') { this.reload() };
  },
  methods: {
    // 编辑信息
    editInfo (obj) {
      // 设置pkid
      this.$store.dispatch(TYPE.PKIDSET, obj.row.PKID)
      // 弹框信息
      let pageType = ''
      if (obj.row.STATUS_WORK == '校核节点') {
        pageType = 'reliabilityCommitteeManageCheckComponent'
      } else {
        pageType = 'reliabilityCommitteeManageApprovalComponent'
      }

      this.dialogInfo = {
        dialogVisible: true,
        title: obj.title,
        pageType: pageType
      }
      // 截取字符串
      let temp_name = obj.row.PROCESS_NAME
      let PROCESS_NAME = temp_name.substring(0, temp_name.indexOf(':'))
      // 存储审核流程信息
      this.$store.dispatch(TYPE.REVIEW_PROCESS_INFO, {
        FORM_INSTANCE_ID: obj.row.FORM_INSTANCE_ID,
        PROCESS_ID: obj.row.PROCESS_ID,
        TempName: PROCESS_NAME
      })
    },
    // 关闭弹框
    closeDialog (obj) {
      this.dialogInfo.dialogVisible = obj.dialogVisible
    },
    // 更新数据
    onRefresList (msg) {
      this.pagination.current = msg.current
      this.pagination.pagesize = msg.pagesize
      this.searchRecord()
    },
    // 加载表单数据
    searchRecord () {
      // loading效果
      // this.loading=true;
      let self = this
      let params = this.$params({
        page: this.pagination.current,
        pagesize: this.pagination.pagesize
      }, this.formInline)
      this.$axios.post('Template/GetMyProcess', params).then((res) => {
        if (res.data != undefined && res.data.rows != undefined) {
          let newData = res.data
          self.pagination.total = newData.totals || 0
          self.tableData = newData.rows
        }
        this.loading = false
      })
    },
    reload () {
      this.pagination.current = 1
      this.searchRecord()
    },
    // 更新数据
    updateData () {
      this.reload()
    }
  },
  computed: {
    returnPageType () {
      return this.dialogInfo.pageType
    },
    // 获取最新数据
    listenDataUSER_ID () {
      return this.$store.state.USER_ID
    }
  },
  watch: {
    // 监听用户信息 改变重新请求数据
    listenDataUSER_ID: function () {
      this.searchRecord()
    }
  }
}
</script>
