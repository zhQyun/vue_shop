<template>
  <div class="height-100 warningRulesManage">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="学校名称：">
            <el-select v-model="schoolSelect" placeholder="请选择学校" :style="{width:formInputWidth}" clearable  @change="changeSchool">
              <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id+','+item.dataSourceCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预警类型名称：">
            <el-input v-model.trim="searchForm.warnTypeName" :style="{width:formInputWidth}" placeholder="预警类型名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="预警级别：">
            <el-input v-model.trim="searchForm.warnLevel" :style="{width:formInputWidth}" placeholder="预警级别" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否需要签收：">
            <el-select v-model="searchForm.isSigning" placeholder="请选择" :style="{width:formInputWidth}" clearable>
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否需要反馈：">
            <el-select v-model="searchForm.isFeedback" placeholder="请选择" :style="{width:formInputWidth}" clearable>
              <el-option label="否" :value="0"></el-option>
              <el-option label="是" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="reactRecord" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
          <el-form-item class="float-right">
           <span v-for="btn in btnList" :key="btn.id">
             <el-button type="success" @click="addInfo" icon="el-icon-plus" v-if="btn.percode === 'add'">新增</el-button>
          </span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom">
        <el-table :data="tableData" :stripe="true"  style="width: 100%;"
                  border ref="xzTable" :height="sHeight">
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column prop="schoolName" label="学校名称" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="typeId" label="预警类型ID" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="warnTypeName" label="预警类型名称" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="warnLevel" label="预警级别" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="isSigning" label="是否需要签收" min-width="100" align="center" :formatter="signingType">
          </el-table-column>
          <el-table-column prop="signingOvertimeMinute" label="签收超时(分钟)" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="isFeedback" label="是否需要反馈" min-width="100" align="center" :formatter="feedbackType">
          </el-table-column>
          <el-table-column prop="feedbackOvertimeMinute" label="反馈超时(分钟)" min-width="100" align="center">
          </el-table-column>
           <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <span v-for="btn in btnList" :key="btn.id">
              <el-button type="success" style="margin-right:5px" icon="el-icon-edit" @click="editInfo(scope.row)" v-if="btn.percode === 'edit'">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)" v-if="btn.percode === 'delete'" >删除</el-button>
            </span>
          </template>
        </el-table-column>
        </el-table>
      </div>
      <div slot="Pagination">
        <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
      </div>
    </M-Table-List>
    <!--新增弹窗-->
    <div>
      <el-dialog :title="'预警规则管理-新增'" custom-class="dialog-type-column2" :visible.sync="addDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
            <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预警类型ID：" prop="typeId" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.typeId" placeholder="预警类型ID" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="预警类型名称：" prop="warnTypeName" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.warnTypeName" placeholder="预警类型名称" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="预警级别：" prop="warnLevel" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.warnLevel" placeholder="预警级别" style="width: 100%;" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="是否需要签收：" prop="isSigning" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.isSigning" placeholder="请选择是否需要签收" style="width: 100%;">
                <el-option label="否" :value="0"></el-option>
                <el-option label="是" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签收超时(分钟)：" prop="signingOvertimeMinute" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.signingOvertimeMinute" placeholder="签收超时(分钟)" style="width: 100%;" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="是否需要反馈：" prop="isFeedback" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.isFeedback" placeholder="请选择是否需要反馈" style="width: 100%;">
                <el-option label="否" :value="0"></el-option>
                <el-option label="是" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="反馈超时(分钟)：" prop="feedbackOvertimeMinute" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.feedbackOvertimeMinute" placeholder="反馈超时(分钟)" style="width: 100%;" maxlength="11"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false" class="dialog_back_btn" style='margin-right:5px'>返回</el-button>
          <el-button type="primary" @click="addClick" class="dialog_sure_btn" :disabled="isDisable">保 存
          </el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 编辑弹窗 -->
    <div>
      <el-dialog :title="'预警规则管理-编辑'" custom-class="dialog-type-column2" :visible.sync="editDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
            <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预警类型ID：" prop="typeId" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.typeId" placeholder="预警类型ID" style="width: 100%;" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="预警类型名称：" prop="warnTypeName" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.warnTypeName" placeholder="预警类型名称" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="预警级别：" prop="warnLevel" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.warnLevel" placeholder="预警级别" style="width: 100%;" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="是否需要签收：" prop="isSigning" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.isSigning" placeholder="请选择是否需要签收" style="width: 100%;">
                <el-option label="否" :value="0"></el-option>
                <el-option label="是" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签收超时(分钟)：" prop="signingOvertimeMinute" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.signingOvertimeMinute" placeholder="签收超时(分钟)" style="width: 100%;" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="是否需要反馈：" prop="isFeedback" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.isFeedback" placeholder="请选择是否需要反馈" style="width: 100%;">
                <el-option label="否" :value="0"></el-option>
                <el-option label="是" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="反馈超时(分钟)：" prop="feedbackOvertimeMinute" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.feedbackOvertimeMinute" placeholder="反馈超时(分钟)" style="width: 100%;" maxlength="11"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false" class="dialog_back_btn" style='margin-right:5px'>返回</el-button>
          <el-button type="primary" @click="editClick" class="dialog_sure_btn" :disabled="isDisable">保 存
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import paginationCommon from '~/components/Pagination.vue'
  import tableCommonData from "~/components/mixin/table.js";
  import API from "../../api/webpackAPI";
  export default {
    components: {paginationCommon},
    mixins: [tableCommonData],
    name: "warningRulesManage",
    data() {
      return {
        loading:false,
        isDisable:false,
        tableHeight:null,
        formLabelWidth: '130px',
        formInputWidth: this.$store.state.fromBox.formInputWidth,
        sHeight: this.$store.state.bodyBox.tableHeight,
        // 表格数据
        tableData: [],
        btns:[],
        schoolList:[],
         // 控制新增弹窗
        addDialog: false,
         // 控制编辑弹窗
        editDialog: false,

        // 查询表单数据
        searchForm: {
          schoolId:'',
          dataSourceCode:'',
          warnLevel:'',
          warnTypeName:'',
          isSigning:'',
          isFeedback:''
        },
        // 选中学校
        schoolSelect:'',
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
        },
        // 表单新增和编辑
        ruleForm: {
          id: '',
          schoolId: "",
          typeId:'',
          warnTypeName:'',
          warnLevel:'',
          signingOvertimeMinute:"",
          isSigning:'',
          feedbackOvertimeMinute:'',
          isFeedback:'',
        },
        // 必填项校验
        rules: {
          schoolId: [{required: true, message: '请选择学校', trigger: 'change'}],
          typeId: [{type:'number',required: true, message: '请输入预警类型ID(数值)', trigger: ['blur','change']}],
          warnTypeName: [{required: true, message: '请输入预警类型名称', trigger: ['blur','change']}],
          warnLevel: [{type:'number',required: true, message: '请输入预警级别(数值)', trigger: ['blur','change']}],
          signingOvertimeMinute: [{type:'number',required: true, message: '请输入签收超时(数字/分钟)', trigger: ['blur','change']}],
          isSigning: [{required: true, message: '请选择是否需要签收', trigger: 'change'}],
          feedbackOvertimeMinute: [{type:'number',required: true, message: '请输入反馈超时(数字/分钟)', trigger: ['blur','change']}],
          isFeedback: [{required: true, message: '请选择是否需要反馈', trigger: 'change'}],
        },
      }
    },
    created: function() {
      // this.getBtns();
      this.refreshData();
      this.getSchoolList()
    },
    computed: {
      btnList:function(){
        return this.$store.state.ButtonByParent;
      }
    },
    methods: {
      closed(){
         this.$refs.ruleForm.resetFields();
      },
      //获取页面的按钮
      getBtns() {
        var btns = this.$store.state.ButtonByParent;
        this.btns=btns;
      },
      //改变学校
      changeSchool(data) {
        var schoolArr = data.split(",");
        this.searchForm.schoolId = schoolArr[0];
        this.searchForm.dataSourceCode = schoolArr[1];
        this.pagination.pageNo = 1;
      },
      //获取学校列表
      getSchoolList(){
      this.common.getSchoolList().then(res=>{
        this.schoolList = res;
      })
    },
      // 重置信息
      reactRecord() {
        this.searchForm={

        },
        this.schoolSelect = "";
        this.refreshData();
      },
      // 表格数据
      refreshData: function() {
        this.tableData = [];
        let that = this;
        // Object.assign(this.searchForm, this.pagination);
        this.searchForm.pageNo=this.pagination.pageNo
        this.searchForm.pageSize=this.pagination.pageSize
        this.$axios.post("/baseWarnRule/findBaseWarnRule", this.searchForm).then(function(res) {
          if(res.data.code==200) {
            that.tableData = res.data.data.rows;
            that.pagination.total = res.data.data.total*1;
          }
        })
      },
      // 查询
      searchClick: function() {
        this.pagination.pageNo = 1
        this.refreshData();
      },
      // 新增
      addInfo(){
        this.addDialog = true; //弹窗显示
        this.ruleForm={}
      },
      // 新增保存
      addClick(){
         this.isDisable = true;
        setTimeout(() => {
          this.isDisable = false;
        }, 1500);
          this.$refs.ruleForm.validate(valid=>{
            if(valid){
              let params=this.ruleForm
              let that = this;
                that.loading=true
                this.$axios.post("/baseWarnRule/addBaseWarnRule", params).then(function(res) {
                  that.loading=false
                  if(res.data.code==200) {
                    that.$message({
                      message: '新增成功',
                      type: 'success',
                      duration: 1500,
                      customClass: 'xz-alert-common'
                    })
                    that.addDialog = false;
                    that.refreshData();
                  }
                })
            }else{
              this.$message({
              type: "warning",
              message: "请将信息填写完整",
              duration:1500
              });
            }
          })
      },
      // 编辑
      editInfo(row){
        this.editDialog = true;//弹窗显示
        this.ruleForm=Object.assign({}, row);
      },
      editClick(){
         this.isDisable = true;
        setTimeout(() => {
          this.isDisable = false;
        }, 1500);
          this.$refs.ruleForm.validate(valid=>{
            if(valid){
              let params=this.ruleForm
              let that = this;
              that.loading=true
              this.$axios.post("/baseWarnRule/updateBaseWarnRule", params).then(function(res) {
                that.loading=false
                if(res.data.code==200) {
                  that.$message({
                    message: '编辑成功',
                    type: 'success',
                    duration: 1500,
                    customClass: 'xz-alert-common'
                  });
                  that.editDialog = false; //关闭弹窗
                  that.refreshData();
                }
              })
            }else{
              this.$message({
              type: "warning",
              message: "请将信息填写完整",
              duration:1500
              });
            }
          })
      },
       // 删除
      handleDelete(row) {
      this.$confirm("即将删除选中的数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$axios.post("/baseWarnRule/deleteBaseWarnRule", { id: row.id ,schoolId:row.schoolId}).then(res => {
              if (res.data.code==200) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 1500,
                  customClass: 'xz-alert-common'
                });
                this.refreshData();
              }
            });
        }).catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消删除"
          });
        });
      },
      // 更新数据
      onRefresList (msg) {
        this.pagination.pageNo = msg.pageNo
        this.pagination.pageSize = msg.pageSize
        this.refreshData()
      },
      // warnType(row){
      //   return row.typeId=='1'?'隐患预警':row.typeId=='2'?'人员预警':row.typeId=='3'?'车辆预警':row.typeId=='4'?'考勤异常':row.typeId=='5'?'访客异常':row.typeId=='6'?'校验异常':row.typeId=='7'?'报警柱报警':''
      // },
      signingType(row){
        return row.isSigning=='0'?'否':row.isSigning=='1'?'是':''
      },
      feedbackType(row){
        return row.isFeedback=='0'?'否':row.isFeedback=='1'?'是':''
      }
    }
  }
</script>

<style lang='less' scoped>
  .el-dialog__body{
    padding: 40px 40px 20px 30px !important;
  }
</style>

