<template>
  <div class="height-100 UserManage">
    <el-row class="height-100 bg-color">
      <el-col :span="4" class="height-100 pr5">
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
      <el-col :span="20" class="height-100 pl-5">
        <div class="xz_content height-100">
          <M-Table-List >
            <div slot="Info">
              <el-form :inline="true" :model="searchForm" size="mini">
                <el-form-item label="用户名：">
                  <el-input v-model.trim="searchForm.loginName" :style="{width:formInputWidth}"
                            placeholder="用户名" clearable></el-input>
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
              <el-table :data="tableData" :stripe="true" ref="xzTable" border :height="sHeight" style="width: 100%;" class="xz_table">
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="loginName" label="用户账户" min-width="100" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户姓名" min-width="100" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号" min-width="100" align="center"></el-table-column>
                <el-table-column prop="email" label="邮箱" min-width="100" align="center"></el-table-column>
                <el-table-column prop="roleName" label="角色" min-width="100" align="center"></el-table-column>
                <el-table-column prop="orgName" label="组织" min-width="100" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" min-width="200" align="center" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="statusCode" label="状态" min-width="100" align="center" :formatter="stateType"></el-table-column>
                <el-table-column label="操作" align="center" width="400">
                  <template slot-scope="scope">
                    <span v-for="btn in btnList" :key="btn.id">
                      <el-button type="success" style='margin-right:5px' icon="el-icon-edit" @click="editInfo(scope.row)" v-if="btn.percode === 'edit'">编辑</el-button>
                      <el-button type="danger" style='margin-right:5px' icon="el-icon-delete" @click="handleDelete(scope.row)" v-if="btn.percode === 'delete'" >删除</el-button>
                      <el-button type="info" style='margin-right:5px' @click="rewritePass(scope.row)" v-if="btn.percode === 'rewritePass'" >修改密码</el-button>
                      <el-button type="info" @click="resetPass(scope.row)" v-if="btn.percode === 'resetPass'" >重置密码</el-button>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div slot="Pagination">
              <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
            </div>
          </M-Table-List>
        </div>
      </el-col>
    </el-row>

    <!--新增弹窗-->
    <div>
      <el-dialog :title="'用户管理-新增'" :visible.sync="addDialog" :close-on-click-modal="false" custom-class="dialog-type-column3" @close="closed">
        <div class="dialog-form" :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="right" label-width="80px">
              <el-form-item label="用户账号：" prop="loginName" :label-width="formLabelWidth">
                <el-input v-model.trim="ruleForm.loginName" placeholder="请输入用户账号" style="width: 100%;" maxlength="40"></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="password" :label-width="formLabelWidth">
                <el-input type="password" v-model.trim="ruleForm.password" placeholder="请输入密码" style="width: 100%;" maxlength="32"></el-input>
              </el-form-item>
              <el-form-item label="确认密码：" prop="checkPass" :label-width="formLabelWidth">
                <el-input type="password" v-model.trim="ruleForm.checkPass" placeholder="请再次输入" style="width: 100%;" maxlength="32"></el-input>
              </el-form-item>
              <el-form-item label="用户姓名：" prop="userName" :label-width="formLabelWidth">
                <el-input v-model.trim="ruleForm.userName" placeholder="请输入用户姓名" style="width: 100%;" maxlength="32"></el-input>
              </el-form-item>
              <el-form-item label="手机号：" prop="mobile" :label-width="formLabelWidth">
                <el-input v-model.number.trim="ruleForm.mobile" placeholder="请输入手机号" style="width: 100%;" maxlength="13"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" prop="email" :label-width="formLabelWidth">
                <el-input v-model.trim="ruleForm.email" placeholder="请输入邮箱" style="width: 100%;"  maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="账户状态：" prop="statusCode" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.statusCode" style="width: 100%">
                  <el-option label="启用" :value="0"></el-option>
                  <el-option label="停用" :value="1"></el-option>
                </el-select>
              </el-form-item>
             <!--部门多选-->
              <el-form-item label="组织归属：" prop="orgIds" :label-width="formLabelWidth">
                <el-input placeholder="请选择组织" v-model="orgNames" @click.native="openSelectOrgBox" style="width: 100%;"></el-input>
              </el-form-item>
              <!--角色多选-->
              <el-form-item label="添加角色：" prop="roleIds" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.roleIds" multiple placeholder="请选择角色（可多选）" style="width: 100%;">
                  <el-option v-for="role in roleList" :key="role.id" :label="role.roleName" :value="role.id"></el-option>
                </el-select>
              </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false" class="dialog_back_btn">返回</el-button>
          <el-button type="primary" @click="addClick" class="dialog_sure_btn" :disabled="isDisable">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>

    <!--编辑弹窗-->
    <div>
      <el-dialog :title="'用户管理-编辑'" :visible.sync="editDialog" :close-on-click-modal="false" custom-class="dialog-type-column3" @close="closed">
        <div class="dialog-form" :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-position="right" label-width="80px">
               <el-form-item label="用户账号：" prop="loginName" :label-width="formLabelWidth">
                <el-input v-model.trim="ruleForm.loginName" placeholder="请输入用户账号" style="width: 100%;" readonly  maxlength="40"></el-input>
              </el-form-item>
              <!-- <el-form-item label="密码：" prop="password" :label-width="formLabelWidth">
                <el-input type="password" v-model.trim="ruleForm.password" placeholder="请输入密码" style="width: 100%;"
                ></el-input>
              </el-form-item> -->
              <!-- <el-form-item label="确认密码：" prop="checkPass" :label-width="formLabelWidth">
                <el-input type="password" v-model.trim="ruleForm.checkPass" placeholder="请再次输入" style="width: 100%;"
                ></el-input>
              </el-form-item> -->
              <el-form-item label="用户姓名：" prop="userName" :label-width="formLabelWidth">
                <el-input v-model.trim="ruleForm.userName" placeholder="请输入用户姓名" style="width: 100%;" maxlength="32"></el-input>
              </el-form-item>
              <el-form-item label="手机号：" prop="mobile" :label-width="formLabelWidth">
                <el-input v-model.number.trim="ruleForm.mobile" placeholder="请输入手机号" style="width: 100%;" maxlength="13"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" prop="email" :label-width="formLabelWidth">
                <el-input v-model.trim="ruleForm.email" placeholder="请输入邮箱" style="width: 100%;"  maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="账户状态：" prop="statusCode" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.statusCode" style="width: 100%">
                  <el-option label="启用" :value="0"></el-option>
                  <el-option label="停用" :value="1"></el-option>
                </el-select>
              </el-form-item>
             <!--部门多选-->
              <el-form-item label="组织归属：" prop="orgIds" :label-width="formLabelWidth">
                <el-input placeholder="请选择组织" v-model="orgNames" @click.native="openSelectOrgBox" style="width: 100%;"></el-input>
              </el-form-item>
              <!--角色多选-->
              <el-form-item label="添加角色：" prop="roleIds" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.roleIds" multiple placeholder="请选择角色（可多选）" style="width: 100%;">
                  <el-option v-for="role in roleList" :key="role.id" :label="role.roleName" :value="role.id"></el-option>
                </el-select>
              </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false" class="dialog_back_btn">返回</el-button>
          <el-button type="primary" @click="editClick" class="dialog_sure_btn" :disabled="isDisable">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>

    <!--修改密码弹窗-->
    <div>
      <el-dialog
        title="修改密码"
        :visible.sync="ChangePassShow"
        custom-class="dialog-type-column1">
        <div class="dialog-form">
          <el-form :model="changePassForm" ref="changePassForm" :rules="rules" label-position="right" label-width="80px">
            <el-form-item label="原始密码" prop="oldPassword">
              <el-input v-model="changePassForm.oldPassword" style="width: 100%;" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input v-model="changePassForm.password" style="width: 100%;" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="newPasswordS">
              <el-input v-model="changePassForm.newPasswordS" style="width: 100%;" show-password></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="ChangePassShow = false" class="dialog_back_btn">返回</el-button>
            <el-button type="primary" @click="handleChangePass" class="dialog_sure_btn">确 定</el-button>
        </span>
      </el-dialog>
    </div>


    <!--选择用户所属的部门-->
    <div>
      <el-dialog title="关联部门"
                 :visible.sync="orgVisiable"
                 :close-on-click-modal="false"
                 custom-class="dialog-type-column1">
        <div style="height: 350px;overflow-y: auto;">
          <p class="pl-60">关联部门</p>
          <div class="pl-60">
            <el-tree
              ref="orgTree"
              :props="orgDefaultProps"
              node-key="id"
              :default-expand-all="true"
              :highlight-current="true"
              :check-on-click-node="true"
              :data="orgData"
              :check-strictly="true"
              :show-checkbox="true"
              @check-change="handCheckChangeByDep"
            >
            </el-tree>
          </div>
        </div>
        <div slot="footer" class="dialog-footer absolute-bottom">
          <el-button @click="orgVisiable = false" class="dialog_back_btn">返回</el-button>
          <el-button @click="beSureSeclect" class="dialog_sure_btn">确定</el-button>
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
  // 引入时间戳插件
  import moment from 'moment'
  export default {
    components: {paginationCommon},
    mixins: [tableCommonData],
    name: "UserManage",
    data() {
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loading:false,
        isDisable:false,
        currentNodeId: '', // 记录当前点击的资源节点
        formLabelWidth: '120px',
        formInputWidth: this.$store.state.fromBox.formInputWidth,
        sHeight: this.$store.state.bodyBox.tableHeight,
        cTotal: 0, // 当前分页总条数
        ChangePassShow: false,// 控制修改密码弹窗,
        // selectTreeName: '厦门煕重电子科技有限公司',
        // 左侧组织树绑定的数据格式
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        // 查询表单
        searchForm: {
          orgId: '',
          loginName: '',
        },
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
        },
        // 表单属性-- 新增和编辑
        ruleForm: {
          id: '',
          userName:"",
          password: "",
          checkPass:"",
          loginName: "",
          mobile:"",
          email:"",
          statusCode: "",
          orgIds: '',
          roleIds: '',
        },
        // 表单属性-修改密码
        changePassForm: {
          id: '',
          loginName:'',
          password: '',
          oldPassword: '',
          newPasswordS: ''
        },
        // 表单验证规则
        rules: {
          loginName: [
            {required: true, message: '请输入用户账号', trigger: ['blur','change']},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: ['blur','change']},
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            // {required: true, message: '请再次输入密码', trigger: ['blur','change']},
            { validator: validatePass2, trigger: ['blur','change'] }
          ],
          userName: [
            {required: true, message: '请输入姓名', trigger: ['blur','change']},
          ],
          // mobile: [
          //   {required: true, message: '请输入手机号', trigger: ['blur','change']},
          // ],
          // email: [
          //   {required: true, message: '请输入邮箱', trigger: ['blur','change']},
          // ],
          orgIds: [
            {required: true, message: '请点开弹窗选择组织', trigger: 'change'},
          ],
          roleIds: [
            {type:'array',required: true, message: '请选择角色', trigger: 'change'},
          ],
          statusCode: [
            {required: true, message: '请选择账户状态', trigger: 'change'},
          ],

          oldPassword: [
            {required: true, message: '请输入原密码', trigger: ['blur','change']},
          ],
          newPasswordS: [
            {required: true, message: '请确认密码', trigger: ['blur','change']},
          ],
        },
         // 控制新增弹窗
        addDialog: false,
         // 控制编辑弹窗
        editDialog: false,
        // 表格数据数组
        tableData: [],
        // 角色数组,
        roleList: [],
        // 组织id
        orgId: '',
        btns: [],
        treeData:[],

        /*用户关联组织*/
        orgNames: '',
        orgVisiable: false,
        orgDefaultProps: {
          children: 'children',
          label: 'name'
        },
        orgData: [],
        userAlreadyData: [],
      };
    },
    computed: {
       btnList:function(){
        return this.$store.state.ButtonByParent;
       }
  },
    created () {
      console.log(66)
      this.refreshData2();
      // this.getBtns();
      this.getTree()
    },
    methods: {
      dateFormat:function(row,column){   
        var date = row[column.property];
        if(date == undefined){return ''}; 
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
      closed(){
        this.$refs.ruleForm.resetFields();
      },
      //获取页面的按钮
      getBtns() {
        var btns = this.$store.state.ButtonByParent;
        this.btns=btns;
      },
      // 懒加载左侧树节点
      loadNode1: function (node, resolve) {
        // if (node.level == 0) {
        //   return resolve([{name: '厦门煕重电子科技有限公司', id: '1'}]);
        // } else {
        //   let parentId = node.data.id;
        //   if (parentId) {
        //     // 获取子树节点数据
        //     this.$axios.get('/org/findByParent/'+parentId).then((res) => {
        //       return resolve(res.data.result);
        //     })
        //   }
        // }
      },
      // node节点点击
      handleNodeClick(data) {
        this.searchForm.orgId = data.id;
        this.refreshData2(); // 点击数节点通过id查询对应数据
      },
      // 左侧权限树
      getTree: function () {
        let that = this;
        that.treeData = [];
        this.$axios.get("/sysOrganization/getOrganizationTree").then(function (res) {
          if (res.data.code==200) {
            that.treeData = res.data.data;
          }
        })
      },
      // 加载表格数据-- 全局查询
      refreshData2: function () {
        let that = this;
        that.tableData = [];
        // Object.assign(this.searchForm, this.pagination);
        this.searchForm.pageNo=this.pagination.pageNo
        this.searchForm.pageSize=this.pagination.pageSize
        this.$axios.post("/sysUser/findListUser", this.searchForm).then(function (res) {
          if (res.data.code==200) {
            that.tableData = res.data.data.rows;
            that.pagination.total = res.data.data.total*1;
          }
        })
      },
      // 重置信息
      reactRecord() {
        this.searchForm={
          loginName: '',
        },
        this.refreshData2();
      },
      // 确认查询
      searchClick: function () {
        this.pagination.pageNo=1
        this.refreshData2();
      },
      // 新增
      addInfo(){
        this.addDialog = true; //弹窗显示
        this.loadRoleData()
        this.ruleForm={}
        this.orgNames=''
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
                this.$axios.post("/sysUser/saveUser", params).then(function(res) {
                  that.loading=false
                  if(res.data.code==200) {
                    that.addDialog = false;
                    that.$message({
                      message: '新增成功',
                      type: 'success',
                      duration: 1500,
                      customClass: 'xz-alert-common'
                    })
                    that.refreshData2();
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
        this.loadRoleData()
        this.ruleForm=Object.assign({}, row);
        this.orgNames='请先点开弹框确定选择的组织'
        // this.$axios.post("/sysOrganizationUser/findUserOrganizationByUserId", {userId:row.id}).then(function(res) {
        //   var data=res.data.data
        //   var orgIds=[]
        //   for(var i=0;i<data.length;i++){
        //     orgIds.push(data[i].orgId)
        //   }
        //   // that.orgNames=orgIds.toString()
        //   console.log(that.orgNames);
        // })
        // 角色回显
        this.$axios.post("sysUserRole/findUserRoleByUserId", {userId:row.id}).then(res=> {
          if(res.data.code==200){
            var data=res.data.data
            var roleIds=[]
            for(var i=0;i<data.length;i++){
              roleIds.push(data[i].roleId)
            }
            this.ruleForm.roleIds=roleIds
          }
        })
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
            this.$axios.post("/sysUser/updateUser", params).then(function(res) {
                that.loading=false
                if(res.data.code==200) {
                  that.$message({
                    message: '编辑成功',
                    type: 'success',
                    duration: 1500,
                    customClass: 'xz-alert-common'
                  });
                  that.editDialog = false; //关闭弹窗
                  that.refreshData2();
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
            .post("/sysUser/deleteUser", { id: row.id })
            .then(res => {
              if (res.data.code==200) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 1500,
                  customClass: 'xz-alert-common'
                });
                this.refreshData2();
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
      // 当前分页改变时
      onRefresList: function (msg) {
        this.pagination.pageNo = msg.pageNo
        this.pagination.pageSize = msg.pageSize
        if (this.orgId) {
          this.refreshData();
        } else {
          this.refreshData2();
        }
      },
      // 加载全部角色列表
      loadRoleData: function () {
        let that = this;
        let params={
          // roleName:''
        }
        // Object.assign(params,this.pagination);
        // params.pageNo=this.pagination.pageNo
        // params.pageSize=-this.pagination.pageSize
        this.$axios.get("/sysRole/getUserRoles", params).then(function (res) {
          if(res.data.code==200){
            that.roleList = res.data.data;
          }
        })
      },
      /*******用户绑定部门*********/
      // 加载整棵部门树
      loadAllOrgTree: function () {
        let that = this;
        that.orgData = [];
        this.$axios.get("/sysOrganization/getOrganizationTree").then(function (res) {
          if (res.data.code==200) {
            that.orgData = res.data.data;
            that.getAlreadyOrg(that.ruleForm.id);
          }
        })
      },
      // 加载用户已经拥有的部门
      getAlreadyOrg: function (id, tree) {
        let that = this;
        that.userAlreadyData = [];
        this.$axios.post("/sysOrganizationUser/findUserOrganizationByUserId",{userId:id}).then(function (res) {
          if (res.data.code==200) {
            that.userAlreadyData = res.data.data;
            that.setUserByOrg(that.userAlreadyData);
          }
        })
      },
      // 设置部门树为选中状态
      setUserByOrg: function (arr, tree) {
        let newArray = [];
        if (arr) {
          for (let i = 0; i < arr.length; i++) {
            newArray.push(arr[i].orgId);
            if (arr[i].children) {
              let chlid = arr[i].children;
              for (let j = 0; j < chlid.length; j++) {
                newArray.push(chlid[j].orgId);
              }
            }
          }
        }
        this.$refs.orgTree.setCheckedKeys(newArray);
      },
      handCheckChangeByDep:function (data, checked, childChecked) {
        // if(checked) {
        //   let node = this.$refs.orgTree.getNode(data);
        //   this.$refs.orgTree.setChecked(node.parent.data, true);
        // }else{
        //   let node = this.$refs.orgTree.getNode(data);
        //   let childes = node.childNodes;
        //   for (let i = 0; i < childes.length; i++) {
        //     this.$refs.orgTree.setChecked(childes[i].data, false);
        //   }
        // }
      },
      //打开部门树选择弹窗
      openSelectOrgBox: function () {
        this.loadAllOrgTree();
        this.orgVisiable = true;
      },
      // 确定关联部门
      beSureSeclect: function () {
        let arr = this.$refs.orgTree.getCheckedKeys();
        this.ruleForm.orgIds = arr
        let nodes = this.$refs.orgTree.getCheckedNodes();
        this.formatterOrgNames(nodes);
        this.orgVisiable = false;
      },
      // 格式化部门名称。用逗号隔开
      formatterOrgNames: function (nodes) {
        let arr = [];
        for (let i = 0; i < nodes.length; i++) {
          arr.push(nodes[i].name);
          if (nodes[i].children) {
            let nodeChild = nodes[i];
            for (let j = 0; j < nodeChild.length; j++) {
              arr.push(nodeChild[j].name);
            }
          }
        }
        this.orgNames = arr.toString();
      },
      /*******用户绑定部门end*********/
      // /****新增或编辑时*****/
      // handleAdd: function (type) {
      //   this.type = type;
      //   this.orgNames = '';
      //   // 清空表单属性对象
      //   this.ruleForm = {
      //     id: '',
      //     loginName: "",
      //     name: "",
      //     password: "",
      //     email: "",
      //     gender: "",
      //     birthday: "",
      //     tel: "",
      //     mobile: "",
      //     address: "",
      //     statusCode: "",
      //     roleIds: '',
      //     roleList: [],
      //     roleIds: ''
      //   };
      //   this.searchForm = {
      //     loginName: '',
      //     name: '',
      //     gender: '',
      //     statusCode: '',
      //     orgId: ''
      //   };
      //   // this.pagination = {
      //   //   page: 1,
      //   //   pageSize: 10,
      //   // }
      //   if (type === 'add') {
      //     this.addEditTitle = '新增';
      //     this.orgId = '';
      //   } else if (type === 'edit') {
      //     this.addEditTitle = '编辑';
      //     if (this.tableItem && this.tableItem.length > 1) {
      //       this.$message({
      //         message: "请选择至多一条记录!",
      //         type: 'warning',
      //         duration: 1500,
      //         customClass: 'xz-alert-common'
      //       });
      //       return;
      //     } else if (this.tableItem.length < 1) {
      //       this.$message({
      //         message: "请至少选择一条!",
      //         type: 'warning',
      //         duration: 1500,
      //         customClass: 'xz-alert-common'
      //       });
      //       return;
      //     } else {
      //       // if (this.orgId === '') {
      //       //   this.$message({
      //       //     message: '请重新选择组织',
      //       //     type: 'warning',
      //       //     duration: 1500
      //       //   })
      //       //   return;
      //       // }
      //       let obj = this.tableItem[0];
      //       // 回显
      //       this.ruleForm.id = obj.id;
      //       this.getUserInfo(obj.id);
      //     }
      //   }
      //   // this.loadAllOrgTree();
      //   this.loadRoleData(); // 角色列表加载
      //   this.addAndEdit = true; //弹窗弹出
      //   this.searchForm.orgId = this.orgId;
      //   this.$nextTick(function(){
      //     this.$refs['ruleForm'].clearValidate()
      //   })
      // },
      // // 表单重置
      // handleClickReset: function (forName) {
      //   this.ruleForm = {
      //     loginName: "",
      //     name: "",
      //     password: "",
      //     email: "",
      //     gender: "",
      //     birthday: "",
      //     tel: "",
      //     mobile: "",
      //     address: "",
      //     statusCode: "",
      //     roleIds: '',
      //     roleList: []
      //   };
      // },
      // // 确定新增或编辑
      // handleClickSure: function () {
      //   let params = this.ruleForm;
      //   if (params.roleList.length > 0) {
      //     params.roleIds = params.roleList.toString();
      //   }
      //   let _this = this;
      //   if (this.tableItem.length === 0) {
      //     // 新增
      //     this.$axios.post("/sysUser/saveUser", params).then(function (res) {
      //       if (res.data.success) {
      //         _this.addAndEdit = false;
      //         _this.$message({
      //           message: '新增成功',
      //           type: 'success',
      //           duration: 1500,
      //           customClass: 'xz-alert-common'
      //         })
      //         _this.refreshData2();
      //       }
      //     })
      //   } else {
      //     // 编辑
      //     this.$axios.post("/sysUser/updateUser", _this.ruleForm).then(function (res) {
      //       if (res.data.success) {
      //         _this.$message({
      //           message: '编辑成功',
      //           type: 'success',
      //           duration: 1500,
      //           customClass: 'xz-alert-common'
      //         });
      //         _this.addAndEdit = false; //关闭弹窗
      //         if (_this.orgId) {
      //           _this.refreshData();
      //         } else {
      //           _this.refreshData2();
      //         }

      //       }
      //     })
      //   }
      // },
      // /****新增或编辑END*****/
      // /****查看详情****/
      // handleLook: function () {
      //   if (this.tableItem && this.tableItem.length > 1) {
      //     this.$message({
      //       message: "请选择至多一条记录!",
      //       type: 'warning',
      //       duration: 1500,
      //       customClass: 'xz-alert-common'
      //     });
      //     return;
      //   } else if (this.tableItem.length < 1) {
      //     this.$message({
      //       message: "请至少选择一条!",
      //       type: 'warning',
      //       duration: 1500,
      //       customClass: 'xz-alert-common'
      //     });
      //     return;
      //   }
      //   // if (this.orgId === '') {
      //   //   this.$message({
      //   //     message: '请选择具体组织',
      //   //     type: 'warning',
      //   //     duration: 1500
      //   //   })
      //   //   return;
      //   // }
      //   this.loadRoleData(); // 角色列表加载
      //   this.lookDetailShow = true; //弹窗弹出
      //   let obj = this.tableItem[0];
      //   this.getUserInfo(obj.id);
      // },
      // 调接口拿回用户详细信息
      // getUserInfo: function (id) {
      //   let that = this;
      //   this.$axios.get("/user/edit/"+id).then(function (res) {
      //     let returnHelper = res.data.result;
      //     // 详细详细赋值
      //     that.detailForm.id = returnHelper.id;
      //     that.detailForm.loginName = returnHelper.loginName;
      //     that.detailForm.password = returnHelper.password;
      //     that.detailForm.name = returnHelper.name;
      //     that.detailForm.email = returnHelper.email;
      //     that.detailForm.gender = returnHelper.gender;
      //     that.detailForm.birthday = returnHelper.birthday;
      //     that.detailForm.tel = returnHelper.tel;
      //     that.detailForm.mobile = returnHelper.mobile;
      //     that.detailForm.birthday = returnHelper.birthday;
      //     that.detailForm.address = returnHelper.address;
      //     that.detailForm.statusCode = returnHelper.statusCode;
      //     that.detailForm.roleList = formatRoleId(returnHelper.roles);
      //     that.detailForm.roleIds = formatOrgName(returnHelper.organizations);

      //     // 编辑赋值
      //     // that.ruleForm.id = returnHelper.id;
      //     that.ruleForm.loginName = returnHelper.loginName;
      //     that.ruleForm.password = returnHelper.password;
      //     that.ruleForm.name = returnHelper.name;
      //     that.ruleForm.email = returnHelper.email;
      //     that.ruleForm.gender = (returnHelper.gender !== null) ? (returnHelper.gender + "") : "";
      //     that.ruleForm.birthday = returnHelper.birthday;
      //     that.ruleForm.tel = returnHelper.tel;
      //     that.ruleForm.mobile = returnHelper.mobile;
      //     that.ruleForm.birthday = returnHelper.birthday;
      //     that.ruleForm.address = returnHelper.address;
      //     that.ruleForm.statusCode = (returnHelper.statusCode !== null) ? (returnHelper.statusCode + "") : "";
      //     that.ruleForm.roleList = formatRoleId(returnHelper.roles);
      //     that.ruleForm.roleIds = formatOrgId(returnHelper.organizations);
      //     that.orgNames = formatOrgName(returnHelper.organizations);
      //   })
      // },
      // // 关闭查看详情弹窗
      // closeLookDialog: function () {
      //   this.lookDetailShow = false;
      // },
      /****查看详情END****/
      /****查询END****/

      /****修改密码*****/
      rewritePass: function (row) {
        // 清空修改密码参数
        this.changePassForm = {
          id: '',
          loginName:'',
          password: '',
          oldPassword: '',
          newPasswordS: ''
        };
        this.ChangePassShow = true;
        this.changePassForm.id = row.id;
        this.changePassForm.loginName=row.loginName
      },
      handleChangePass: function () {
         this.isDisable = true;
        setTimeout(() => {
          this.isDisable = false;
        }, 1500);
          this.$refs.changePassForm.validate(valid=>{
            if(valid){
              let _this = this;
              if (_this.changePassForm.password !== _this.changePassForm.newPasswordS) {
                _this.$message({
                  message: '新密码前后输入不一致',
                  type: 'error',
                  duration: 1500,
                  customClass: 'xz-alert-common'
                })
                return;
              }
              this.$axios.post("/sysUser/updatePassword", _this.changePassForm).then(function (res) {
                if (res.data.code==200) {
                  _this.$message({
                    message: '修改密码成功',
                    type: 'success',
                    duration: 1500,
                    customClass: 'xz-alert-common'
                  })
                  _this.ChangePassShow = false;
                  if (_this.orgId) {
                    _this.refreshData();
                  } else {
                    _this.refreshData2();
                  }
                }
              })
            }
          })

      },
      /****修改密码END*****/
      /****重置密码****/
      resetPass: function (row) {
        this.changePassForm = {
          id: '',
          loginName:'',
          password: '',
        };
          this.changePassForm.id=row.id;
          this.changePassForm.loginName=row.loginName;
          this.changePassForm.password =row.password;
          let _this = this;
          this.$confirm('确认重置密码？',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
          }).then( ()=>{
            this.$axios.post("/sysUser/resetPassword",
              this.changePassForm
           ).then(function (res) {
              if (res.data.code==200) {
                _this.$message({
                  message: '密码重置成功',
                  type: 'success',
                  duration: 1500,
                  customClass: 'xz-alert-common'
                })
                if (_this.orgId) {
                  _this.refreshData();
                } else {
                  _this.refreshData2();
                }
              }
            })
            // done()
          }).catch(function () {

          })
        // }
      },
      stateType:function(row){
        return row.statusCode == '0' ? '启用' : row.statusCode == '1' ? '停用' : ''
      }
    }
  }

  function formatRoleId(roleIds) {
    let roles = [];
    if (roleIds && roleIds.length !== 0) {
      for (let i = 0; i < roleIds.length; i++) {
        roles.push(roleIds[i].id);
      }
    }
    return roles;
  }

  function formatOrgName(orgNames) {
    let names = '';
    if (orgNames && orgNames.length !== 0) {
      for (let i = 0; i < orgNames.length; i++) {
        names += orgNames[i].name + ',';
      }
    }
    return names;
  }

  function formatOrgId(orgNames) {
    let orgIds = '';
    if (orgNames && orgNames.length !== 0) {
      for (let i = 0; i < orgNames.length; i++) {
        orgIds += orgNames[i].id + ',';
      }
    }
    orgIds = orgIds.substr(0, orgIds.length - 1);
    return orgIds;
  }
</script>


<style scoped>
  .xz_tree {
    height: 100%;
    background: rgba(255, 255, 255, 1);
    padding-right: 10px;
    overflow: auto;
    /*box-shadow: 0 6px 7px 0px rgba(0, 39, 79, 0.1);*/
    /*border-right: 1px solid #d0c9c9;*/
  }

  .tree_head_title {
    padding-top: 20px;
    text-align: left;
    padding-left: 27px;
    font-size: 16px;
    color: #333;
    position: relative;
    font-weight: bold;
    margin-left: -20px;
  }
</style>
<style>
  .UserManage .el-dialog__body {
    max-height: 50vh;
    overflow: auto;
  }
</style>
