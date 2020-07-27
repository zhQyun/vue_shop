<template>
  <div class="height-100 dictionary">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="所属字典组：">
            <el-input v-model.trim="searchForm.dictGroupCode" :style="{width:formInputWidth}"
                      placeholder="所属字典组" clearable></el-input>
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
        <el-table :data="tableData"  :stripe="true"  style="width: 100%;"
                  border ref="xzTable" :height="sHeight">
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column prop="dictName" label="字典名称" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="dictValue" label="字典值" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="sort" label="排序值" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="groupCode" label="所属字典组" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="statusCode" label="状态" min-width="150" align="center" :formatter="stateCode">
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
      <div slot="Dialog">
      </div>
    </M-Table-List>
    <!--新增弹窗-->
    <div>
      <el-dialog :title="'数组字典管理-新增'" custom-class="dialog-type-column2" :visible.sync="addDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="100px" :rules="rules">
              <el-form-item label="字典名称：" prop="dictName" :label-width="formLabelWidth">
                <el-input placeholder="请输入字典名称" v-model.trim="ruleForm.dictName" maxlength="32" style="width: 100%;">
                </el-input>
              </el-form-item>
              <el-form-item label="字典值：" prop="dictValue" :label-width="formLabelWidth">
                <el-input placeholder="请输入字典值" v-model.trim="ruleForm.dictValue" maxlength="32" style="width: 100%;">
                </el-input>
              </el-form-item>
              <el-form-item label="排序值：" prop="sort" :label-width="formLabelWidth">
                <el-input placeholder="请输入排序值" v-model.number.trim="ruleForm.sort" maxlength="9" style="width: 100%;">
                </el-input>
              </el-form-item>
              <el-form-item label="所属字典组：" prop="groupCode" :label-width="formLabelWidth">
                <el-select v-model.trim="ruleForm.groupCode" style="width: 100%;">
                  <el-option v-for="item in groupList" :label="item.groupName" :key="item.groupCode" :value="item.groupCode" :id="item.groupCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态：" prop="statusCode" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.statusCode" placeholder="请选择状态" style="width: 100%;">
                <el-option label="启用" :value="0"></el-option>
                <el-option label="停用" :value="1"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="描述：" prop="description" :label-width="formLabelWidth">
                <el-input placeholder="请输入..." v-model="ruleForm.description" maxlength="50"></el-input>
              </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false" class="dialog_back_btn" style='margin-right:5px'>返回</el-button>
          <el-button type="primary" @click="addClick" class="dialog_sure_btn" :disabled="isDisable">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>

    <!--编辑弹窗-->
    <div>
      <el-dialog :title="'数组字典管理-编辑'" custom-class="dialog-type-column2" :visible.sync="editDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="100px" :rules="rules">
              <el-form-item label="字典名称：" prop="dictName" :label-width="formLabelWidth">
                <el-input placeholder="请输入字典名称" v-model.trim="ruleForm.dictName" maxlength="32" style="width: 100%;">
                </el-input>
              </el-form-item>
              <el-form-item label="字典值：" prop="dictValue" :label-width="formLabelWidth">
                <el-input placeholder="请输入字典值" v-model.trim="ruleForm.dictValue" maxlength="32" style="width: 100%;">
                </el-input>
              </el-form-item>
              <el-form-item label="排序值：" prop="sort" :label-width="formLabelWidth">
                <el-input placeholder="请输入排序值" v-model.number.trim="ruleForm.sort" maxlength="9" style="width: 100%;">
                </el-input>
              </el-form-item>
              <el-form-item label="所属字典组：" prop="groupCode" :label-width="formLabelWidth">
                <el-select v-model.trim="ruleForm.groupCode" style="width: 100%;">
                  <el-option v-for="item in groupList" :label="item.groupName" :key="item.groupCode" :value="item.groupCode" :id="item.groupCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态：" prop="statusCode" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.statusCode" placeholder="请选择状态" style="width: 100%;">
                <el-option label="启用" :value="0"></el-option>
                <el-option label="停用" :value="1"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="描述：" prop="description" :label-width="formLabelWidth">
                <el-input placeholder="请输入..." v-model="ruleForm.description" maxlength="50"></el-input>
              </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false" class="dialog_back_btn" style='margin-right:5px'>返回</el-button>
          <el-button type="primary" @click="editClick" class="dialog_sure_btn" :disabled="isDisable">确 定
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
    name: "dictionary",
    data() {
      return {
        loading:false,
        isDisable:false,
        // 表格数据
        selectType: API.INFO_ALL_TYPE,
        formLabelWidth: '120px',
        formInputWidth: this.$store.state.fromBox.formInputWidth,
        sHeight: this.$store.state.bodyBox.tableHeight,
        // 表单数据
        searchForm: {
          dictGroupCode: ''
        },
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
        },
        ruleForm: {
          id: '',
          dictName: '',
          dictValue: '',
          groupName: '',
          groupCode:'',
          statusCode:'',
          description: '',
          sort: '',
        },
        // 必填项校验
        rules: {
          dictValue: [{
            required: true,
            message: '请输入字典值',
            trigger: ['blur','change']
          }],
          dictName: [{
            required: true,
            message: '请输入字典名称',
            trigger: ['blur','change']
          }],
          sort: [{
            type:'number',
            required: true,
            message: '请输入数字排序值',
            trigger: ['blur','change']
          }],
          groupCode: [{
            required: true,
            message: '请选择所属字典组',
            trigger: 'change'
          }],
          statusCode: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
        },
         // 控制新增弹窗
        addDialog: false,
         // 控制编辑弹窗
        editDialog: false,
        tableData: [],
        // 按钮数组
        btns: [],

        groupList: [],
      }
    },
    created: function() {
      // this.getBtns();
      this.refreshData();
      this.getGroupList()
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
      getGroupList: function() {
        let that = this;
        let params= {
          groupName: '',
          pageNo: 1,
          pageSize: 1000000
        }
        this.$axios.post("/sysDictionaryGroup/findListDictionaryGroup",params).then(function(res) {
          if(res.data.code==200){
            that.groupList = res.data.data.rows;
          }
        })
      },
      // 重置信息
      reactRecord() {
        this.searchForm={
          dictName: '',
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
        this.$axios.post("/sysDictionary/findListDictionary", this.searchForm).then(function(res) {
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
        this.getGroupList();
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
                this.$axios.post("/sysDictionary/saveDictionary", params).then(function(res) {
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
        this.getGroupList();
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
            this.$axios.post("/sysDictionary/updateDictionary", params).then(function(res) {
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
            .post("/sysDictionary/deleteDictionary", { id: row.id })
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
      stateCode(row){
        return row.statusCode=='0'?'启用':row.statusCode=='1'?'停用':''
      }
    }
  }
</script>


<style scoped>
.el-dialog__body {
  padding: 40px 40px 20px 10px  !important;
}
</style>
<style>
.dictionary .el-dialog__body {
  max-height: 50vh;
  overflow: auto;
}
</style>
