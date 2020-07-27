<template>
  <div class="height-100 dictionaryGroup">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="字典组名称：">
            <el-input v-model.trim="searchForm.groupName" :style="{width:formInputWidth}"
                      placeholder="字典组名称" clearable></el-input>
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
          <!-- <el-table-column prop="id" label="id" min-width="150" align="center">
          </el-table-column> -->
          <el-table-column prop="groupName" label="字典组名称" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="groupCode" label="字典组编码" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="isSys" label="是否系统字典" min-width="120" align="center" :formatter="stateIsSys">
          </el-table-column>
          <el-table-column prop="description" label="描述" min-width="120" align="center">
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
      <el-dialog :title="'数组字典组管理-新增'" custom-class="dialog-type-column2" :visible.sync="addDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
              <el-form-item label="字典组名称：" prop="groupName" :label-width="formLabelWidth">
                <el-input placeholder="请输入字典组名称" v-model.trim="ruleForm.groupName" maxlength="32" style="width: 100%;">
                </el-input>
              </el-form-item>
              <el-form-item label="字典组编码：" prop="groupCode" :label-width="formLabelWidth">
                <el-input placeholder="请输入字典组编码" v-model.trim="ruleForm.groupCode"  maxlength="32" style="width: 100%;">
                </el-input>
              </el-form-item>
              <el-form-item label="是否系统字典：" prop="isSys" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.isSys" style="width:100%;">
                  <el-option label="是" :value="0"></el-option>
                  <el-option label="否" :value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述：" prop="description" :label-width="formLabelWidth">
                <el-input placeholder="请输入..." v-model="ruleForm.description"  maxlength="100"></el-input>
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
      <el-dialog :title="'数组字典组管理-编辑'" custom-class="dialog-type-column2" :visible.sync="editDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
              <el-form-item label="字典组名称：" prop="groupName" :label-width="formLabelWidth">
                <el-input placeholder="请输入字典组名称" v-model.trim="ruleForm.groupName" maxlength="32" style="width: 100%;">
                </el-input>
              </el-form-item>
              <el-form-item label="字典组编码：" prop="groupCode" :label-width="formLabelWidth">
                <el-input placeholder="请输入字典组编码" v-model.trim="ruleForm.groupCode" maxlength="32" style="width: 100%;">
                </el-input>
              </el-form-item>
              <el-form-item label="是否系统字典：" prop="isSys" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.isSys" style="width:100%;">
                  <el-option label="是" :value="0"></el-option>
                  <el-option label="否" :value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述：" prop="description" :label-width="formLabelWidth">
                <el-input placeholder="请输入..." v-model="ruleForm.description" maxlength="100"></el-input>
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
    name: "dictionaryGroup",
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
          groupName: '',
        },
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
        },
        // 表单新增和编辑
        ruleForm: {
          id: '',
          groupCode: '',
          groupName: '',
          isSys: '',
          description: '',
        },
        // 必填项校验
        rules: {
          groupCode: [{
            required: true,
            message: '请输入字典组编码',
            trigger: ['blur','change']
          }],
          groupName: [{
            required: true,
            message: '请输入字典组名称',
            trigger: ['blur','change']
          }],
          isSys: [
            {required: true, message: '请选择是否系统字典', trigger: 'change'},
          ]
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
      // 重置信息
      reactRecord() {
        this.searchForm={
          groupName: '',
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
        this.$axios.post("/sysDictionaryGroup/findListDictionaryGroup", this.searchForm).then(function(res) {
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
                this.$axios.post("/sysDictionaryGroup/saveDictionaryGroup", params).then(function(res) {
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
            this.$axios.post("/sysDictionaryGroup/updateDictionaryGroup", params).then(function(res) {
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
            .post("/sysDictionaryGroup/deleteDictionaryGroup", { id: row.id })
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
      stateIsSys(row){
        return row.isSys=='0'?'是':row.isSys=='1'?'否':''
      }
    }
  }
</script>

<style scoped>
  .el-dialog__body{
    padding: 40px 40px 20px 30px !important;
  }
</style>
<style>
.dictionaryGroup .el-dialog__body {
    max-height: 50vh;
    overflow: auto;
  }
</style>
