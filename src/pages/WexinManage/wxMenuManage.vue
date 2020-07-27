<template>
  <div class="height-100 bg-color wxMenuManage">
    <el-row class="height-100 bg-color">
      <el-col :span="3" class="height-100 pr5">
        <div class="xz_tree">
          <el-tree
            ref="tree"
            :props="defaultProps"
            node-key="id"
            :highlight-current="true"
            :expand-on-click-node="false"
            :check-on-click-node="true"
            :data="treeData"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </div>
      </el-col>
      <el-col :span="21" class="height-100 pl-5">
        <div class="xz_content">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="公众号名称：">
            <el-select v-model="searchForm.topic" placeholder="请选择公众号" :style="{width:formInputWidth}" clearable>
              <el-option v-for="item in wxMarkList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单名称：">
            <el-input v-model.trim="searchForm.btnName" :style="{width:formInputWidth}" placeholder="菜单名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="菜单类型：">
            <el-input v-model.trim="searchForm.type" :style="{width:formInputWidth}" placeholder="菜单类型" clearable></el-input>
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
        <el-table :data="tableData" :stripe="true" style="width: 100%" class="xz_table" border ref="xzTable" :height="sHeight">
          <el-table-column type="index" label="序号" width="55" align="center">
          </el-table-column>
          <el-table-column prop="name" label="所属公会号" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="btnName" label="菜单名称" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="type" label="菜单类型" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="btnKey" label="菜单key值" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="url" label="菜单路径" min-width="200" align="center">
          </el-table-column>
          <el-table-column prop="sort" label="菜单排序" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="isAuthorize" label="是否授权" min-width="100" align="center" :formatter="authorize">
          </el-table-column>
          <el-table-column prop="mediaId" label="mediaId" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="appid" label="小程序appid" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="pagepath" label="小程序页面路径" min-width="100" align="center">
          </el-table-column>
           <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <span v-for="btn in btnList" :key="btn.id">
              <el-button type="success" style='margin-right:5px' icon="el-icon-edit" @click="editInfo(scope.row)" v-if="btn.percode === 'edit'">编辑</el-button>
              <el-button type="danger" style="margin-right:5px" icon="el-icon-delete" @click="handleDelete(scope.row)" v-if="btn.percode === 'delete'" >删除</el-button>
              <!-- <el-button type="info" @click="handleStop(scope.row)" v-if="btn.percode === 'state'">{{scope.row.statusCode == 0?'停用':'启用'}}</el-button> -->
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
    </div>
      </el-col>
    </el-row>

    <div >
      <!--新增弹窗-->
      <el-dialog :title="'微信菜单管理-新增'" :visible.sync="addDialog" custom-class="dialog-type-column1" :close-on-click-modal="false" @close="closed">
        <div class="dialog-form" v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="right" label-width="80px">
            <el-form-item label="上级菜单：" prop="pid" :label-width="formLabelWidth">
              <el-input placeholder="请选择上级菜单" v-model="ruleForm.pidLabel" @click.native="openPidBox" style="width: 100%;"></el-input>
              <div class="pidList" v-show="pidBoxShow">
                <el-tree
                  ref="tree2"
                  :props="defaultProps"
                  node-key="id"
                  :highlight-current="true"
                  :expand-on-click-node="false"
                  :check-on-click-node="true"
                  :data="treeData"
                  @node-click="handleNodeClick2">
                </el-tree>
              </div>
            </el-form-item>
            <el-form-item label="所属公众号：" prop="topic" :label-width="formLabelWidth">
              <el-select v-model="ruleForm.topic" placeholder="请选择公众号"  style="width: 100%;">
                <el-option v-for="item in wxMarkList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单名称：" prop="btnName" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.btnName" placeholder="请输入菜单名称" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型：" prop="type" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.type" placeholder="请输入菜单类型" style="width: 100%;" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="菜单key值：" prop="btnKey" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.btnKey" placeholder="请输入菜单key值" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="菜单路径：" prop="url" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.url" placeholder="请输入菜单路径" style="width: 100%;" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="菜单排序：" prop="sort" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.sort" placeholder="请输入菜单排序" style="width: 100%;" maxlength="6"></el-input>
            </el-form-item>
            <el-form-item label="是否增加授权：" prop="isAuthorize" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.isAuthorize" placeholder="请选择是否增加授权" style="width: 100%;">
                <el-option label="是" :value="0"></el-option>
                <el-option label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="mediaId：" prop="mediaId" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.mediaId" placeholder="请输入mediaId" style="width: 100%;" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="小程序appid：" prop="appid" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.appid" placeholder="请输入小程序appid" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="小程序页面路径：" prop="pagepath" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.pagepath" placeholder="请输入小程序页面路径" style="width: 100%;" maxlength="150"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false" class="dialog_back_btn">返回</el-button>
          <el-button type="primary" @click="addClick" class="dialog_sure_btn" :disabled="isDisable">保 存</el-button>
        </div>
      </el-dialog>
    </div>

    <div >
      <!--编辑弹窗-->
      <el-dialog :title="'微信菜单管理-编辑'" :visible.sync="editDialog" custom-class="dialog-type-column1" :close-on-click-modal="false" @close="closed">
        <div class="dialog-form" v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="right" label-width="80px">
             <el-form-item label="上级菜单：" prop="pid" :label-width="formLabelWidth">
              <el-input placeholder="请选择上级菜单" v-model="ruleForm.pidLabel" @click.native="openPidBox" style="width: 100%;"></el-input>
              <div class="pidList" v-show="pidBoxShow">
                <el-tree
                  ref="tree2"
                  :props="defaultProps"
                  node-key="id"
                  :highlight-current="true"
                  :expand-on-click-node="false"
                  :check-on-click-node="true"
                  :data="treeData"
                  @node-click="handleNodeClick2">
                </el-tree>
              </div>
            </el-form-item>
            <el-form-item label="所属公众号：" prop="topic" :label-width="formLabelWidth">
              <el-select v-model="ruleForm.topic" placeholder="请选择公众号"  style="width: 100%;">
                <el-option v-for="item in wxMarkList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单名称：" prop="btnName" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.btnName" placeholder="请输入菜单名称" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型：" prop="type" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.type" placeholder="请输入菜单类型" style="width: 100%;" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="菜单key值：" prop="btnKey" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.btnKey" placeholder="请输入菜单key值" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="菜单路径：" prop="url" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.url" placeholder="请输入菜单路径" style="width: 100%;" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="菜单排序：" prop="sort" :label-width="formLabelWidth" >
              <el-input v-model.number.trim="ruleForm.sort" placeholder="请输入菜单排序" style="width: 100%;" maxlength="6"></el-input>
            </el-form-item>
            <el-form-item label="是否增加授权：" prop="isAuthorize" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.isAuthorize" placeholder="请选择是否增加授权" style="width: 100%;">
                <el-option label="是" :value="0"></el-option>
                <el-option label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="mediaId：" prop="mediaId" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.mediaId" placeholder="请输入mediaId" style="width: 100%;" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="小程序appid：" prop="appid" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.appid" placeholder="请输入小程序appid" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="小程序页面路径：" prop="pagepath" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.pagepath" placeholder="请输入小程序页面路径" style="width: 100%;" maxlength="150"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false" class="dialog_back_btn">返回</el-button>
          <el-button type="primary" @click="editClick" class="dialog_sure_btn" :disabled="isDisable">保 存</el-button>
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
    name: "wxMenuManage",
    data() {
      return {
        loading:false,
        isDisable:false,
        pidBoxShow: false,
        // 控制新增弹窗
        addDialog: false,
         // 控制编辑弹窗
        editDialog: false,
        formLabelWidth: '130px',
        formInputWidth: this.$store.state.fromBox.formInputWidth,
        sHeight: this.$store.state.bodyBox.tableHeight,
        // 表单属性-- 新增和编辑
        ruleForm: {
          id: "",
          topic:"",
          btnName: "",
          type: "",
          btnKey:"''",
          url:"",
          sort:"",
          isAuthorize:"",
          mediaId:"",
          appid:"",
          pagepath:"",
          pid:'',
          pidLabel:'',
        },
        // 查询表单
        searchForm: {
          topic:'',
          btnName: '',
          type:''
        },
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
        },
        // 表单验证规则
        rules: {
          topic: [{required: true,message: '请选择公众号',trigger: 'change'}],
          btnName: [
            {required: true, message: '请输入菜单名称', trigger: ['blur','change']},
          ],
          // type: [{required: true, message: '输入菜单类型', trigger: ['blur','change']}],
           sort: [
            {type:'number',required: true, message: '请输入数字排序值', trigger: ['blur','change']},
          ],
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        // 树列表
        treeData:[],
        tableData: [],
        tableItem: [],
        btns: [],
        // 公众号名称列表
        wxMarkList:[],
      };
    },
    computed: {
      btnList:function(){
        return this.$store.state.ButtonByParent;
      }
    },
    created: function() {
      // this.getBtns();
      this.refreshData();
      this.getWxMarkList()
      this.getTree();
    },
    methods: {
      closed(){
        this.$refs.ruleForm.resetFields();
        this.pidBoxShow = false;
      },
      //获取页面的按钮
      getBtns() {
        var btns = this.$store.state.ButtonByParent;
        this.btns=btns;
      },
      // 获取公众号
      getWxMarkList(){
        this.$axios.post("wechatManager/findWechatManager", this.searchForm).then(res=> {
          if(res.data.code==200) {
            this.wxMarkList = res.data.data.rows;
          }
        })
      },
       // 菜单树
      getTree() {
        this.treeData = [];
        this.$axios.get("/wechatMenuManager/getMenuTree").then(res=> {
          if (res.data.code==200) {
            this.treeData = res.data.data;
          }
        })
      },
      // node节点点击
      handleNodeClick(data) {
        this.searchForm.id = data.id;
        this.refreshData();
      },
      // 打开上级的下拉树
      openPidBox: function (e) {
        this.pidBoxShow = true;
        let that = this;
        //第一种方式:点击其他区域, 消失树
        document.onclick=function(){
          　that.pidBoxShow=false;
        }
        e.stopPropagation();//阻止冒泡
        //离开区域的时候树消失
        that.$refs.tree2.$el.onmouseleave = function () {
            that.pidBoxShow = false;
        }
        that.$refs.tree2.$el.onmouseleave = function () {
            that.pidBoxShow = false;
        }
      },
      handleNodeClick2(data) {
        this.ruleForm.pid = data.id;
        this.ruleForm.pidLabel = data.name;
        this.pidBoxShow = false;
      },
      // 重置信息
      reactRecord() {
        this.searchForm = {
        };
        this.refreshData();
      },
      // 确认查询
      searchClick: function() {
        this.pagination.pageNo=1
        this.refreshData();
      },
      // 表格数据
      refreshData: function() {
        this.tableData = [];
        this.tableItem = [];
        let that = this;
        // Object.assign(this.searchForm, this.pagination);
        this.searchForm.pageNo=this.pagination.pageNo
        this.searchForm.pageSize=this.pagination.pageSize
        this.$axios.post("/wechatMenuManager/findWechatMenuManager", this.searchForm).then(function(res) {
          if(res.data.code==200) {
            that.tableData = res.data.data.rows;
            that.pagination.total = res.data.data.total*1;
          }
        })
      },
      // 新增
      addInfo(){
        this.addDialog = true; //弹窗显示
        // this.getTree()
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
              this.$axios.post("/wechatMenuManager/addWechatMenuManager", params).then(function(res) {
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
                  that.getTree()
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
        // this.getTree()
        this.ruleForm=Object.assign({}, row);
        console.log(row);

        if(row.pid!=0){
          let node = this.$refs.tree.getNode(row.pid);
          this.ruleForm.pidLabel=node.data.name
        }
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
            this.$axios.post("/wechatMenuManager/updateWechatMenuManager", params).then(function(res) {
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
                that.getTree()
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
            .post("/wechatMenuManager/deleteWechatMenuManager", { id: row.id })
            .then(res => {
              if (res.data.code==200) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 1500,
                  customClass: 'xz-alert-common'
                });
                this.refreshData();
                this.getTree()
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
    authorize(row){
      return row.isAuthorize=='0'?'是':row.isAuthorize=='1'?'否':''
    },
    }
  }
</script>

<style scoped>
  .pidList {
    width: 100%;
    min-height: 50px;
    padding: 10px 5px;
    background-color: #fff;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 10;
    display: inline-block;
    border: 1px solid #ccc;
  }
  .el-form-item__content{
    margin: 0 5px 0 79px !important;
  }
  .el-form-item__label{
    width: 79px !important;
    text-align: center !important;
  }
</style>
<style>
.wxMenuManage .el-dialog__body {
    max-height: 50vh;
    overflow: auto;
    padding: 40px 40px 20px 30px !important;
  }
</style>
