<template>
    <div class="MselectPerson">
        <el-input v-model="input"  readonly :title="input" placeholder="请选择人员" >
            <template slot="append"><div class="selectInfoBox" @click="onChange">选择</div></template>
        </el-input>
        <M-Dialog :msg.sync="dialogInfo">
            <M-Table-List :msg="{cHeight:15,formH:83}">
                <div slot="Info">
                    <el-form :inline="true" :model="formInline" size="mini">
                        <el-form-item label="工号" :label-width="formLabelWidth">
                            <el-input v-model="formInline.MfId" :style="{width:formInputWidth}"
                                      placeholder="工号"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" :label-width="formLabelWidth">
                            <el-input v-model="formInline.Name" :style="{width:formInputWidth}"
                                      placeholder="姓名"></el-input>
                        </el-form-item>
                        <el-form-item class="float-right">
                            <el-button type="primary" @click="searchRecord" icon="el-icon-search">查询</el-button>
                            <el-button type="primary" @click="submitInfo" icon="el-icon-document">确定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="TableDom">
                    <el-table height="100%" ref="multipleTable" @selection-change="handleSelectionChange" :class="[(!selectInfo.multiple)?'RadioSelect':'']" :data="tableData" size="mini" border>
                        <el-table-column type="selection" align="center" width="36"></el-table-column>
                        <el-table-column prop="MfId" align="left" label="工号" sortable width="120"></el-table-column>
                        <el-table-column prop="Name" align="left" label="姓名" sortable width="120"></el-table-column>
                        <el-table-column prop="DEP_NAME" align="left" label="部门" sortable show-overflow-tooltip></el-table-column>
                    </el-table>
                </div>
                <div slot="Pagination">
                    <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
                </div>
            </M-Table-List>
        </M-Dialog>
    </div>
</template>

<script>
import Vue from 'vue'
// 引用分页组件
import paginationCommon from '..//Pagination.vue'
// 引用
import API from '../../api'
// 引入动画效果
import {Loading} from 'element-ui'

export default {
  components: {paginationCommon},
  name: 'M',
  props: ['selectInfo'],
  data () {
    return {
      input: '',
      formInline: {},
      pagination: {
        current: 1,
        total: 0,
        pagesize: 50
      },
      tableData: [], // 表格数据
      // 输入框宽度控制
      formLabelWidth: '90px',
      formInputWidth: '160px',
      dialogInfo: {}// 弹出框信息
    }
  },
  created () {
    this.reload()
    this.input = this.selectInfo.selectInputs
  },
  methods: {
    onChange () {
      this.$emit('listenToChildEvent', '')
      this.dialogInfo = {
        width: '60%',
        title: '选择人员',
        dialogVisible: true
      }
      this.reload()
    },
    // 刷新页面
    updateData () {
      this.reload()
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
      let loading = Vue.prototype.$loading(API.LOADING_INFO)
      let formList = this.formInline
      formList.DepartMent = '飞机维修工程部'
      let params = this.$params({
        page: this.pagination.current,
        pagesize: this.pagination.pagesize
      }, formList)
      this.$axios.post(API.PERSON_SELECT, params).then((res) => {
        let newData = res.data
        this.pagination.total = newData.totals || 0
        this.tableData = newData.rows
        loading.close()
      })
    },
    // 重新加载页面
    reload () {
      this.pagination.current = 1
      this.searchRecord()
    },
    // 确定提交信息
    submitInfo () {
      let objInfo = {}
      let MfIds = []
      let Names = []
      let ValueInfo = this.$refs.multipleTable.selection
      if (ValueInfo[0] == undefined) {
        this.$message({
          showClose: true,
          message: '请选择人员！',
          type: 'error'
        })
        return false
      };
      ValueInfo.forEach(key => {
        Names.push(key.Name)
        MfIds.push(key.MfId)
      })
      objInfo = {ID: MfIds.join(','), NAME: Names.join(',')}
      this.input = Names.join(',')
      this.dialogInfo = {dialogVisible: false}
      this.$emit('listenToChildEvent', objInfo)
      this.$refs.multipleTable.clearSelection()
    },
    handleSelectionChange (val) {
      // 单选选择人员
      if (!this.selectInfo.multiple) {
        let SelectValue = this.$refs.multipleTable.selection
        SelectValue.splice(0, SelectValue.length, val.pop())
      };
      // 多选选择人员
    }
  },
  watch: {
    'selectInfo' () {
      this.input = this.selectInfo.selectInputs
    }
  }
}
</script>
<style scoped>
    .selectInfoBox{cursor:pointer;padding:0 20px;}
</style>
