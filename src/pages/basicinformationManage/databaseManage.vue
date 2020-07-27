<template>
  <div class="height-100 databaseManage">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="学校名称：">
            <el-select v-model="schoolSelect" placeholder="请选择学校" :style="{width:formInputWidth}" clearable @change="changeSchool">
              <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id+','+item.dataSourceCode"></el-option>
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
          <el-table-column prop="datasourceCode" label="数据库编码" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="userName" label="数据库账户" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="password" label="数据库密码" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="datasourceName" label="数据库名称" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="jdbcUrl" label="数据库地址" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="systemName" label="所属系统" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="80" align="center">
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
      <el-dialog :title="'学校数据库管理-新增'" custom-class="dialog-type-column2" :visible.sync="addDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
            <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolSelect1" placeholder="请选择学校" style="width: 100%;" @change="change">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id+','+item.schoolName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据库编码：" prop="datasourceCode" :label-width="formLabelWidth">
              <el-input placeholder="数据库编码" v-model.trim="ruleForm.datasourceCode" maxlength="32" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="数据库账户：" prop="userName" :label-width="formLabelWidth">
              <el-input placeholder="数据库账户" v-model.trim="ruleForm.userName" maxlength="32" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="数据库密码：" prop="password" :label-width="formLabelWidth">
              <el-input placeholder="数据库密码" v-model.trim="ruleForm.password" maxlength="32" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="数据库名称：" prop="datasourceName" :label-width="formLabelWidth">
              <el-input placeholder="数据库名称" v-model.trim="ruleForm.datasourceName" maxlength="32" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="数据库地址：" prop="jdbcUrl" :label-width="formLabelWidth">
              <el-input placeholder="数据库地址" v-model.trim="ruleForm.jdbcUrl" maxlength="32" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="所属系统：" prop="systemName" :label-width="formLabelWidth">
              <el-input placeholder="所属系统" v-model.trim="ruleForm.systemName" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark" :label-width="formLabelWidth">
              <el-input placeholder="请输入..." v-model="ruleForm.remark" maxlength="100"></el-input>
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
      <el-dialog :title="'学校数据库管理-编辑'" custom-class="dialog-type-column2" :visible.sync="editDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
            <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolSelect1" placeholder="请选择学校" style="width: 100%;" @change="change" :disabled="true">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id+','+item.schoolName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据库编码：" prop="datasourceCode" :label-width="formLabelWidth">
              <el-input placeholder="数据库编码" v-model.trim="ruleForm.datasourceCode" maxlength="32" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="数据库账户：" prop="userName" :label-width="formLabelWidth">
              <el-input placeholder="数据库账户" v-model.trim="ruleForm.userName" maxlength="32" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="数据库密码：" prop="password" :label-width="formLabelWidth">
              <el-input placeholder="数据库密码" v-model.trim="ruleForm.password" maxlength="32" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="数据库名称：" prop="datasourceName" :label-width="formLabelWidth">
              <el-input placeholder="数据库名称" v-model.trim="ruleForm.datasourceName" maxlength="32" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="数据库地址：" prop="jdbcUrl" :label-width="formLabelWidth">
              <el-input placeholder="数据库地址" v-model.trim="ruleForm.jdbcUrl" maxlength="32" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="所属系统：" prop="systemName" :label-width="formLabelWidth">
              <el-input placeholder="所属系统" v-model.trim="ruleForm.systemName" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark" :label-width="formLabelWidth">
              <el-input placeholder="请输入..." v-model="ruleForm.remark" maxlength="100"></el-input>
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
  import API from '../../api'
  export default {
    components: {paginationCommon},
    mixins: [tableCommonData],
    name: "databaseManage",
    data() {
      return {
        loading:false,
        isDisable:false,
        tableHeight:null,
        formLabelWidth: '120px',
        formInputWidth: this.$store.state.fromBox.formInputWidth,
        sHeight: this.$store.state.bodyBox.tableHeight,
        btns:[],
        // 表格数据
        tableData: [],
         // 控制新增弹窗
        addDialog: false,
         // 控制编辑弹窗
        editDialog: false,
        // 查询表单数据
        searchForm: {
          schoolId:'',
          dataSourceCode:'',
        },
        schoolSelect: "", //选中学校
        schoolSelect1: "",
        // 学校列表
        schoolList:[],
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
        },
        // 表单新增和编辑
        ruleForm: {
          id: '',
          schoolName: '',
          schoolId:'',
          systemName: '',
          datasourceName: '',
          schoolSelect1:'',
          jdbcUrl: '',
          remark:'',
          unCheckMethod:1
        },
        // 必填项校验
        rules: {
          schoolId: [{required: true,message: '请选择学校',trigger: 'change'}],
          datasourceCode: [{required: true,message: '请输入数据库编码',trigger: ['blur','change']}],
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
        this.$axios.post("baseSchoolDatasourceConfig/findBaseSchoolDatasourceConfig", this.searchForm).then(function(res) {
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
      change(data){
        var schoolArr = data.split(",");
        this.ruleForm.schoolId = schoolArr[0];
        this.ruleForm.schoolName = schoolArr[1];
      },
      // 新增
      addInfo(){
        this.addDialog = true; //弹窗显示
        this.ruleForm={}
        this.ruleForm.unCheckMethod=1
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
                this.$axios.post("baseSchoolDatasourceConfig/addBaseSchoolDatasourceConfig", params).then(function(res) {
                  that.loading=false
                  if(res.data.code==200) {
                    that.addDialog = false;
                    that.$message({
                      message: '新增成功',
                      type: 'success',
                      duration: 1500,
                      customClass: 'xz-alert-common'
                    })
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
        this.ruleForm.schoolSelect1=row.schoolName
        this.ruleForm.unCheckMethod=1
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
            this.$axios.post("baseSchoolDatasourceConfig/updateBaseSchoolDatasourceConfig", params).then(function(res) {
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
          this.$axios
            .post("baseSchoolDatasourceConfig/deleteBaseSchoolDatasourceConfig", { id: row.id })
            .then(res => {
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
    }
  }
</script>

<style scoped>

</style>

