<template>
    <div class="homeBox">
    <h4 class="H2" style="margin-top:10px;">待办任务</h4>
    <M-Table-List v-loading="loading">
        <div slot="Info">
            <el-form :inline="true" :model="formInline" size="mini">
                <el-form-item label="模块名称">
                    <el-select v-model="formInline.EVA_OPINION" default-first-option clearable>
                        <el-option label="可靠性管理" value="SUPERVISE"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchRecord" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div slot="TableDom">
            <el-table :height="sHeight" ref="multipleTable" :data="tableData" size="mini" border>
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column label="操作" align="center" width="80">
                    <template slot-scope="scope">
                        <el-button type="success" @click="editInfo({row:scope.row,pageType:'ReasonTabs',title:'任务'})">执行</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="CONT" align="left" label="内容" sortable show-overflow-tooltip></el-table-column>
                <el-table-column prop="RESON_NAME" align="center" label="责任人" sortable width="200"></el-table-column>
                <el-table-column prop="TASK_START_DATE" align="center" label="接收日期" sortable width="150" ></el-table-column>
            </el-table>
        </div>
        <div slot="Pagination">
            <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
        </div>
        <div slot="Dialog">
            <M-Dialog :msg.sync="dialogInfo">
                <component @closeDialog="closeDialog" @updateData="updateData" :is="returnPageType"></component>
            </M-Dialog>
        </div>
    </M-Table-List>
    </div>
</template>
<script>
import Vue from 'vue'
// 安全监察月计划

// 引用分页组件
import paginationCommon from '../components/Pagination.vue'
// 引用
import API from '../api'
// 引入动画效果
import {Loading} from 'element-ui'
// storeType
import TYPE from '../store/storeType'
const ReasonTabs = () => import(/* webpackChunkName: "qualityResearch" */ './reliabilityManage/reliabilityCommitteeManage/dialogTabs/Reason.vue')
export default {
  name: 'WaitingTask',
  components: {
    paginationCommon,
    ReasonTabs
  },
  data () {
    return {
      formInline: {
        MODELID: ''
      },
      loading: true,
      tableData: [],
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
      this.dialogInfo = {
        width: '50%',
        dialogVisible: true,
        title: obj.title,
        pageType: obj.pageType
      }
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
      this.loading = true
      let self = this
      let params = this.$params({
        page: this.pagination.current,
        pagesize: this.pagination.pagesize
      }, this.formInline)
      // console.log(params)
      // this.$axios.post('Template/GetMyTaskTest', params).then((res) => {
      //   if (res.data != undefined && res.data.rows != undefined) {
      //     let newData = res.data
      //     self.pagination.total = newData.totals || 0
      //     self.tableData = newData.rows
      //     // self.tableData.forEach((res)=>{
      //     //      let evaStr='';
      //     //         switch(res.EVA_OPINION){
      //     //             case 'SUPERVISE':
      //     //                 evaStr='安全监察:'
      //     //                 break;
      //     //             case 'INVERSTIGATE':
      //     //                 evaStr='质量调查:'
      //     //                 break;
      //     //             case 'ACTION':
      //     //                 evaStr='组织安全活动:'
      //     //                 break;
      //     //             case 'REWARD':
      //     //                 evaStr='奖励:'
      //     //                 break;
      //     //             case 'PENALTY':
      //     //                 evaStr='处罚:'
      //     //                 break;
      //     //             default :
      //     //                 evaStr='';
      //     //                 break
      //     //         }
      //     //       res.PROCESS_NAME=evaStr+res.INFO_CONTENT
      //     // });
      //   }
      //   this.loading = false
      // })
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
