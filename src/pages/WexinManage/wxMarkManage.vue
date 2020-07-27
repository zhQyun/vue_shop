<template>
  <div class="height-100">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="公众号名称：">
            <el-input placeholder="公众号名称" v-model.trim="searchForm.name" :style="{width:formInputWidth}" clearable></el-input>
          </el-form-item>
          <el-form-item label="公众号配置类型：">
            <!-- <el-input placeholder="公众号名称" v-model.trim="searchForm.name" :style="{width:formInputWidth}" clearable></el-input> -->
            <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
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
          <el-table-column prop="name" label="公众号名称" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="code" label="公众号编码" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="appId" label="开发者ID" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="appSecret" label="开发者密码" min-width="150" align="center">
          </el-table-column>
           <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <span v-for="btn in btnList" :key="btn.id">
              <el-button type="info" style="margin-right:5px" @click="create(scope.row)" v-if="btn.percode === 'create'">生成菜单</el-button>
              <el-button type="success" style="margin-right:5px" icon="el-icon-edit" @click="editInfo(scope.row)" v-if="btn.percode === 'edit'">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)" v-if="btn.percode === 'delete'">删除</el-button>
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
      <el-dialog :title="'公众号管理-新增'" custom-class="dialog-type-column2" :visible.sync="addDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
            <el-form-item label="公众号名称：" prop="name" :label-width="formLabelWidth">
              <el-input placeholder="公众号名称" v-model.trim="ruleForm.name" style="width: 100%;" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="公众号编码：" prop="code" :label-width="formLabelWidth">
              <el-input placeholder="公众号编码" v-model.trim="ruleForm.code" style="width: 100%;" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="开发者ID：" prop="appId" :label-width="formLabelWidth">
              <el-input placeholder="开发者ID" v-model.trim="ruleForm.appId" style="width: 100%;" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="开发者密码：" prop="appSecret" :label-width="formLabelWidth">
              <el-input placeholder="开发者密码" v-model.trim="ruleForm.appSecret" style="width: 100%;" maxlength="100"></el-input>
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
      <el-dialog :title="'公众号管理-编辑'" custom-class="dialog-type-column2" :visible.sync="editDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
            <el-form-item label="公众号名称：" prop="name" :label-width="formLabelWidth">
                <el-input placeholder="公众号名称" v-model.trim="ruleForm.name" style="width: 100%;" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="公众号编码：" prop="code" :label-width="formLabelWidth">
              <el-input placeholder="公众号编码" v-model.trim="ruleForm.code" style="width: 100%;" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="开发者ID：" prop="appId" :label-width="formLabelWidth">
              <el-input placeholder="开发者ID" v-model.trim="ruleForm.appId" style="width: 100%;" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="开发者密码：" prop="appSecret" :label-width="formLabelWidth">
              <el-input placeholder="开发者密码" v-model.trim="ruleForm.appSecret" style="width: 100%;" maxlength="100"></el-input>
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
    name: "wxMarkManage",
    data() {

      return {
        loading:false,
        isDisable:false,
        tableHeight:null,
        formLabelWidth: '120px',
        formInputWidth: this.$store.state.fromBox.formInputWidth,
        sHeight: this.$store.state.bodyBox.tableHeight,
        // 表格数据
        tableData: [],
        btns:[],
         // 控制新增弹窗
        addDialog: false,
         // 控制编辑弹窗
        editDialog: false,
        // 查询表单数据
        searchForm: {
          name:'',
          appId:''
        },
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
        },
        // 表单新增和编辑
        ruleForm: {
          id: '',
          name: '',
          code: '',
          appId: '',
          appSecret: '',
        },
        // 必填项校验
        rules: {
          name: [{required: true, message: '请输入公众号名称', trigger: ['blur','change']},],
          code: [{required: true, message: '请输入公众号编码', trigger: ['blur','change']},],
          appId: [{required: true, message: '请输入开发者ID', trigger: ['blur','change']},],
          appSecret: [{required: true, message: '请输入开发者密码', trigger: ['blur','change']},],
        },
      }
    },
    created: function() {
      // this.getBtns();
      this.refreshData();
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
      // 点击生成菜单
      create(row){
        this.$confirm("确定生成菜单吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(()=>{
          this.$axios.post("/wechatMenuManager/creteMenu",{appId:row.appId,appSecret:row.appSecret}).then(res=> {
            if(res.data.code==200) {
              this.$message({
                message: '菜单生成成功',
                type: 'success',
                duration: 1500,
                customClass: 'xz-alert-common'
              })
              this.refreshData()
            }
          })
        })
      },
      // 重置信息
      reactRecord() {
        this.searchForm={
          name:'',
          appId:''
        },
        this.refreshData();
      },
      // 表格数据
      refreshData: function() {
        this.tableData = [];
        let that = this;
        // Object.assign(this.searchForm, this.pagination);
        this.searchForm.pageNo=this.pagination.pageNo
        this.searchForm.pageSize=this.pagination.pageSize
        this.$axios.post("wechatManager/findWechatManager", this.searchForm).then(function(res) {
          if(res.data.code==200&&res.data.data) {
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
                this.$axios.post("wechatManager/addWechatManager", params).then(function(res) {
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
            this.$axios.post("wechatManager/updateWechatManager", params).then(function(res) {
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
          this.$axios.post("wechatManager/deleteWechatManager", { id: row.id }).then(res => {
            if(res.data.code==200) {
              this.$message({
                message: res.data.msg,
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
