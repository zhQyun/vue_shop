<template>
    <div class="MselectPerson">
        <el-input v-model="input" readonly :title="input" placeholder="请选择人员">
            <template slot="append">
                <div class="selectInfoBox" @click="onChange">选择</div>
            </template>
        </el-input>
        <M-Dialog :msg.sync="dialogInfo">
            <M-Table-List :msg="{cHeight:-34}">
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
                    <div class="MultipleBox cHeightBox">
                        <el-table class="MultBoxCom Mul-left" height="100%" ref="multipleTable"
                                  @selection-change="handleSelectionChange"
                                  :class="[(!selectInfo.multiple)?'RadioSelect':'']" :data="tableData" size="mini"
                                  border>
                            <el-table-column type="selection" align="center" width="36"></el-table-column>
                            <el-table-column prop="MfId" align="left" label="工号" sortable width="90"></el-table-column>
                            <el-table-column prop="Name" align="left" label="姓名" sortable width="90"></el-table-column>
                            <el-table-column prop="DEP_NAME" align="left" label="部门" sortable
                                             show-overflow-tooltip></el-table-column>
                        </el-table>
                        <div class="MultBoxCom Mul-center">
                            <el-button type="primary" class="MultBoxComButton" @click="selectData"
                                       icon="el-icon-arrow-right"></el-button>
                        </div>
                        <el-table class="MultBoxCom Mul-right"  height="100%" :data="SelectTableData" size="mini" border>
                            <el-table-column prop="MfId" align="left" label="工号" sortable width="90"></el-table-column>
                            <el-table-column prop="Name" align="left" label="姓名" sortable></el-table-column>
                            <!--<el-table-column prop="DEP_NAME" align="left" label="部门" sortable show-overflow-tooltip></el-table-column>-->
                            <el-table-column label="操作" align="center" width="80">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="deleteInfo(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
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
      SelectTableData: [], // 已选数据
      // 输入框宽度控制
      formLabelWidth: '90px',
      formInputWidth: '160px',
      dialogInfo: {}// 弹出框信息
    }
  },
  created () {
    this.reload()
    // 初始化以选择信息
    this.initData()
  },
  methods: {
    onChange () {
      this.dialogInfo = {
        width: '70%',
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
      let ValueInfo = this.SelectTableData
      // console.log(ValueInfo)
      if (ValueInfo.length == 0) {
        this.$message({
          showClose: true,
          message: '请选择人员！',
          type: 'error'
        })
        return false
      }
      ;
      ValueInfo.forEach(key => {
        Names.push(key.Name)
        MfIds.push(key.MfId)
      })
      objInfo = {ID: MfIds.join(','), NAME: Names.join(',')}
      // 处理人员id和人员名称
      this.input = Names.join(',')
      this.dialogInfo = {dialogVisible: false}
      this.$emit('listenToChildEvent', objInfo)
      // 清楚已选择的数据
      this.SelectTableData = []
    },
    handleSelectionChange (val) {
      // 单选选择人员
      if (!this.selectInfo.multiple) {
        let SelectValue = this.$refs.multipleTable.selection
        SelectValue.splice(0, SelectValue.length, val.pop())
      }
      ;
      // 多选选择人员
    },
    // 确定已经选择的数据
    selectData () {
      // 去掉以重复选择的数据
      if (!this.selectInfo.multiple) {
        this.SelectTableData = []
      }
      // 获取以选择数据
      let ValueInfo = this.$refs.multipleTable.selection
      if (ValueInfo.length == 0) {
        this.$message({showClose: true, message: '请选择人员！', type: 'warning'})
        return false
      }
      ;
      ValueInfo.forEach(key => {
        if (key != null || key != undefined) {
          this.SelectTableData.push(key)
        }
      })
      // 去除重复数据
      let resultData = this.$UniqueArray(this.SelectTableData, 'MfId')
      this.SelectTableData = resultData
    },
    // 删除以选择的数据
    deleteInfo (index) {
      if (this.SelectTableData.length > 0) {
        this.$confirm('即将删除选中的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.SelectTableData.splice(index, 1)
        }).catch(() => {
          this.$message({showClose: true, type: 'info', message: '已取消删除'})
        })
      } else {
        this.$message({showClose: true, type: 'warning', message: '请选择要删除的数据！'})
      }
    },
    // 初始化页面数据
    initData () {
      let oPropValue = this.selectInfo.selectInputs
      if (oPropValue.names != undefined && oPropValue.ids != undefined) {
        // console.log(oPropValue);

        this.input = oPropValue.names
        let namesArr = oPropValue.names.split(',')
        if (namesArr.length > 0) {
          let idsArr = oPropValue.ids.split(',')
          for (let k = 0; k < idsArr.length; k++) {
            if (idsArr[k] != '' && namesArr[k] != '') {
              this.SelectTableData.push({MfId: idsArr[k], Name: namesArr[k]})
            }
          }
        }
      }
    },
    clearInput () {
      this.input = ''
      // this.$emit("CloseDialogs");
    }
  },
  watch: {
    'dialogInfo' () {
      // 初始化以选择数据
      this.SelectTableData = []
      this.initData()
    },
    'selectInfo' () {
      // 初始化以选择数据
      this.SelectTableData = []
      this.initData()
    }
  }
}
</script>
<style scoped>
    .selectInfoBox {
        cursor: pointer;
        padding: 0 20px;
    }

    .MultBoxCom {
        float: left;
    }

    .MultBoxComButton {
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }

    .MultipleBox {
        overflow: hidden;
        border-bottom: 1px solid #efefef
    }

    .Mul-left {
        width: 55%;
    }

    .Mul-center {
        width: 10%;
        text-align: center;
        margin-top: 20%;
    }

    .Mul-right {
        width: 35%;
    }

    .cHeightBox{height:100%;}

</style>
