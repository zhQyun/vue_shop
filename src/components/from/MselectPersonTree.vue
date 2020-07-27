<template>
    <div class="MselectPerson">
        <el-input v-model="input" readonly :title="input" v-show="InputStatus" placeholder="请选择人员">
            <template slot="append">
                <div class="selectInfoBox" @click="onChange">选择</div>
            </template>
        </el-input>
        <M-Dialog :msg.sync="dialogInfo">
            <M-Table-List :msg="{cHeight:-70}">
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
                            <el-button type="primary" @click="reactRecord" icon="el-icon-refresh">重置</el-button>
                            <el-button type="primary" @click="searchRecord" icon="el-icon-search">查询</el-button>
                            <el-button type="success" @click="submitInfo" icon="el-icon-upload2">确定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="TableDom">
                    <div class="MultipleBox cHeightBox">
                        <div class="MultBoxCom Mul-left borderBox">
                            <el-tree
                                    :data="data"
                                    :props="defaultProps"
                                    @node-click="handleNodeClick">
                            </el-tree>
                        </div>
                        <el-table class="MSe-Table Mul-right borderBox" height="100%" @selection-change="handleSelectionChange" ref="multipleTable" :data="TableData" size="mini" :class="[(!selectInfo.multiple)?'RadioSelect':'']">
                            <el-table-column type="selection" align="center" width="36"></el-table-column>
                            <el-table-column align="left" label="全选" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <div class="MSe-Table-Box MseTableDom">
                                        <div class="MSe-Person-icon"><font-awesome-icon :icon="['fas', 'user-circle']" /></div>
                                        <div class="MSe-li">
                                            <h3>{{scope.row.Name}}</h3>
                                            <p >{{scope.row.WORK_POST}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div slot="Pagination">
                    <div class="PersonList" style="height:78px;overflow-y: auto;">
                        <div class="personListW" v-for="mf in SelectTableData">
                            <div class="MSe-Table-Box">
                                <div class="MSe-Person-icon"><font-awesome-icon :icon="['fas', 'user-circle']" /></div>
                                <div class="MSe-li">
                                    <h3>{{mf.Name}}</h3>
                                </div>
                                <div class="MSe-times" @click="deleteInfo(mf.MfId)"><font-awesome-icon :icon="['fas', 'times']" /></div>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                </div>
            </M-Table-List>
        </M-Dialog>
    </div>
</template>
<script>
import Vue from 'vue'
// 引用
import API from '../../api'
// 引入动画效果
import {Loading} from 'element-ui'

export default {
  name: 'MselectPersonTree',
  props: ['selectInfo'],
  data () {
    return {
      input: '',
      formInline: {MfId: '', Name: ''},
      TableData: [], // 列表数据
      SelectTableData: [], // 已选数据
      dialogInfo: {}, // 弹出框信息
      data: [],
      InputStatus: true,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 输入框宽度控制
      formLabelWidth: '90px',
      formInputWidth: '160px'
    }
  },
  created () {
    this.getInfo()
    this.initData()
    if (this.selectInfo.dias == undefined) {
      return false
    }
    this.InputStatus = this.selectInfo.dias
  },
  methods: {
    onChange () {
      this.dialogInfo = {
        width: '85%',
        title: '选择人员',
        dialogVisible: true,
        clearPkid: true
      }
    },
    // 重置信息
    reactRecord () {
      this.clearData()
      this.clearData()
    },
    // 删除已经选择的数据
    deleteInfo (data) {
      this.SelectTableData = this.SelectTableData.filter((m) => { return m.MfId != data })
      this.$refs.multipleTable.clearSelection()
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
      // 清除列表数据
      this.TableData = []
    },
    handleSelectionChange (val) {
      if (!this.selectInfo.multiple) {
        let SelectValue = this.$refs.multipleTable.selection
        if (SelectValue.length > 0) {
          SelectValue.splice(0, SelectValue.length, val.pop())
        }
        this.SelectTableData = SelectValue
      } else {
        this.SelectTableData = this.SelectTableData.concat(val)
        let resultData = this.$UniqueArray(this.SelectTableData, 'MfId')
        this.SelectTableData = resultData
      }
      // 去除重复数据
    },
    // 点击树状节点促发事件
    handleNodeClick (dat) {
      this.$axios.get(API.SEL_TREE_SELECT, {code: dat.organ_code}).then((res) => {
        this.TableData = res.data.rows
      })
    },
    // 加载树状节点数据
    getInfo () {
      // 存在缓存数据用缓存数据
      if (this.$manageSessionStorage({type: 'has', text: 'ApplyOffice'}).isStatus) {
        this.data = this.$manageSessionStorage({type: 'get', text: 'ApplyOffice'}).value
        return false
      }
      // 请求数据
      this.$axios.get(API.COMMON_APPLY_OFFICE, {}).then((res) => {
        // 将数据存储到sessionStorage中
        this.$manageSessionStorage({type: 'add', text: 'ApplyOffice', value: res.data.rows})
        this.data = this.$manageSessionStorage({type: 'get', text: 'ApplyOffice'}).value
      })
    },
    clearInput () {
      this.input = ''
    },
    // 加载表单数据
    searchRecord () {
      let formList = this.formInline
      formList.DepartMent = '飞机维修工程部'
      // 无填写数据
      if (formList.MfId == '' && formList.Name == '') {
        this.TableData = []
        this.$message({showClose: true, message: '请输入用户信息！', type: 'warning'})
        return false
      }
      // loading效果
      let loading = Vue.prototype.$loading(API.LOADING_INFO)
      let params = this.$params({
        page: 1,
        pagesize: 100
      }, formList)
      this.$axios.post(API.PERSON_SELECT, params).then((res) => {
        let newData = res.data
        this.TableData = newData.rows
        loading.close()
      })
    },
    // 初始化页面数据
    initData () {
      let oPropValue = this.selectInfo.selectInputs
      if (oPropValue.names != undefined && oPropValue.ids != undefined) {
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
    // 清除用户信息
    clearData () {
      // 清楚已经选择的数据
      this.SelectTableData = []
      // 清除列表数据
      this.TableData = []
      // 清除控件选择的数据
      if (this.$refs.multipleTable) this.$refs.multipleTable.clearSelection()
      // 清空搜索条件
      this.formInline = {MfId: '', Name: ''}
    }
  },
  watch: {
    'dialogInfo' () {
      // 初始化以选择数据
      this.clearData()
      this.clearData()
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
    .selectInfoBox {cursor: pointer;padding: 0 20px;}
    .MultBoxCom {float: left;}
    .MultBoxComButton {width: 40px;height: 40px;border-radius: 20px;}
    .MultipleBox {overflow: hidden;border-bottom: 1px solid #efefef}
    .Mul-left { width: 50%;float:left; height: 100%;overflow: auto; }
    .Mul-right {width:49%;float:right;}
    .cHeightBox{height:100%;}
    .MSe-Table-Box{position:relative;height:50px;}
    .MSe-Person-icon{position:absolute;top:7px;left:0;font-size:35px;color:#efefef;}
    .MSe-li{position:absolute;top:0;left:50px;}
    .MSe-Table-Box h3,.MSe-Table-Box p{padding:0;margin:0;}
    .MSe-Table-Box p{color:#999;}
    .MseTableDom:hover h3,.MseTableDom:hover p{color:#fff;}
    table tbody tr:nth-child(even) .MSe-Person-icon{color:#fff !important;}

    .personlist{width:100%;overflow: auto;}
    .personListW{width:150px;float:left;}
    .PersonList .MSe-Table-Box{height:40px !important;}
    .PersonList .MSe-Table-Box:hover{background:#efefef;border-radius:5px;}
    .PersonList .MSe-Table-Box:hover .MSe-Person-icon{color:#fff;}
    .PersonList .MSe-Person-icon{font-size:30px;left:4px;top:0 !important;}
    .PersonList .MSe-li{height:40px;line-height:40px;left:40px !important;}
    .PersonList .MSe-times{position: absolute;top: 0;right: 7px;width: 10px;height: 40px;line-height: 40px;cursor: pointer;display:none;}
    .PersonList .MSe-Table-Box:hover .MSe-times{display:block;}
    .PersonList .MSe-times:hover{font-size:15px;display:block;}
</style>
