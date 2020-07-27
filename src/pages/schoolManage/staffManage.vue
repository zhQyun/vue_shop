<template>
  <div class="height-100 staffManage">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="学校名称：">
            <el-select v-model="schoolSelect" placeholder="请选择学校" :style="{width:formInputWidth}" clearable  @change="changeSchool">
              <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id+','+item.dataSourceCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model.trim="searchForm.staffName" :style="{width:formInputWidth}" placeholder="姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话：">
            <el-input v-model.trim="searchForm.staffTel" :style="{width:formInputWidth}" placeholder="电话" clearable></el-input>
          </el-form-item>
          <el-form-item label="人员类型：">
            <el-select v-model="searchForm.type" placeholder="请选择人员类型" :style="{width:formInputWidth}" clearable>
              <el-option label="教师" :value="0"></el-option>
              <el-option label="其他" :value="1"></el-option>
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
          <el-table-column prop="staffName" label="姓名" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="staffTel" label="电话" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="type" label="人员类型" min-width="100" align="center" :formatter="peopleType">
          </el-table-column>
          <el-table-column prop="photo" label="照片" min-width="200" align="center">
            <template slot-scope="scope">
              <img v-if="!scope.row.photo" :src="base_url+scope.row.photo" width="0" height="0">
              <img v-else :src="base_url+scope.row.photo" width="80" height="80">
              <!-- <img :src="base_url+scope.row.photo" width="80" height="80"/> -->
            </template>
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
      <el-dialog :title="'教职工管理-新增'" custom-class="dialog-type-column2" :visible.sync="addDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
            <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名：" prop="staffName" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.staffName" placeholder="姓名" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="staffTel" :label-width="formLabelWidth">
              <el-input placeholder="电话" v-model.trim="ruleForm.staffTel" style="width: 100%;" maxlength="11">
              </el-input>
            </el-form-item>
            <el-form-item label="人员类型：" prop="type" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.type" placeholder="请选择人员类型" style="width: 100%;">
                <el-option label="教师" :value="0"></el-option>
                <el-option label="其他" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预览：" prop="photo" :label-width="formLabelWidth">
              <!-- 用于去掉输入提示  没有input  一旦有提示就会一直存在 -->
              <el-input v-model="ruleForm.photo" v-show="false"></el-input>
              <img :src="ruleForm.photo" style="float: left;">
            </el-form-item>
            <el-form-item label="更换照片：" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                action
                list-type="picture"
                :show-file-list="false"
                :on-change="getImg"
                :auto-upload="false"
                accept="image/jpeg, image/gif, image/png, image/bmp">
                <el-button slot="trigger" size="small" type="primary">选择照片</el-button>
              </el-upload>
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
      <el-dialog :title="'教职工管理-编辑'" custom-class="dialog-type-column2" :visible.sync="editDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
              <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;" :disabled="true">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名：" prop="staffName" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.staffName" placeholder="姓名" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="staffTel" :label-width="formLabelWidth">
              <el-input placeholder="电话" v-model.trim="ruleForm.staffTel" style="width: 100%;" maxlength="11">
              </el-input>
            </el-form-item>
            <el-form-item label="人员类型：" prop="type" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.type" placeholder="请选择人员类型" style="width: 100%;">
                <el-option label="教师" :value="0"></el-option>
                <el-option label="其他" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预览：" prop="photo" :label-width="formLabelWidth">
              <!-- 用于去掉输入提示  没有input  一旦有提示就会一直存在 -->
              <!-- <el-input v-model="ruleForm.photo" v-show="false"></el-input> -->
              <img :src="state_img?base_url+ruleForm.photo:ruleForm.photo" style="float: left;" width="300" height="300">
            </el-form-item>
            <el-form-item label="更换照片：" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                action
                list-type="picture"
                :show-file-list="false"
                :on-change="getImg"
                :auto-upload="false"
                accept="image/jpeg, image/gif, image/png, image/bmp">
                <el-button slot="trigger" size="small" type="primary">选择照片</el-button>
              </el-upload>
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
    name: "staffManage",
    data() {
      var checkPhone = (rule, value, callback) => {
        var state = this.common.checkStr(value, "phone");
        if (state) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      };
      return {
        loading:false,
        isDisable:false,
        tableHeight:null,
        formLabelWidth: this.$store.state.fromBox.formLabelWidth,
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

        base_url: API.img_url,
        state_img: false, //是否要用base_url

        // 查询表单数据
        searchForm: {
          schoolId:'',
          dataSourceCode:'',
          staffName:'',
          staffTel:'',
          type:''
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
          schoolName: "",
          staffName:"",
          staffTel:'',
          type:'',
          photo:''
        },
        // 必填项校验
        rules: {
          schoolId: [{required: true, message: '请选择学校', trigger: 'change'}],
          staffName: [{required: true, message: '请输入姓名', trigger: ['blur','change']}],
          staffTel: [
            {required: true, message: '请输入电话', trigger: ['blur','change']},
            { validator: checkPhone, trigger: "change" }
          ],
          type: [{required: true, message: '请选择人员类型', trigger: 'change'}],
          photo: [{required: true, message: '请选择照片', trigger: 'change'}]
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
      getImg(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M ) {
          this.$message.error({
            message: "选择的图片不可大于2M"
          });
        return;
        }
        this.getBase64(file.raw).then(res => {
          this.state_img = false;
          this.$set(this.ruleForm, "photo", res);
        });
      },
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
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
          schoolId:'',
          dataSourceCode:'',
          staffName:'',
          staffTel:'',
          type:''
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
        let loading = Vue.prototype.$loading();
        this.$axios.post("/baseTeachingStaff/findTeachingStaff", this.searchForm).then(function(res) {
          if(res.data.code==200) {
            that.tableData = res.data.data.rows;
            that.pagination.total = res.data.data.total*1;
          }
          loading.close();
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
                this.$axios.post("/baseTeachingStaff/addBaseTeachingStaff", params).then(function(res) {
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
        this.state_img=true
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
            this.$axios.post("/baseTeachingStaff/updateBaseTeachingStaff", params).then(function(res) {
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
          let loading = Vue.prototype.$loading();
          this.$axios
            .post("/baseTeachingStaff/deleteBaseTeachingStaff", { id: row.id ,schoolId:row.schoolId})
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
              loading.close()
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
      peopleType(row){
        return row.type=='0'?'教师':row.type=='1'?'其他':''
      }
    }
  }
</script>

<style lang='less' scoped>
  .el-dialog__body{
    padding: 40px 40px 20px 30px !important;
  }
  .avatar-uploader {
  max-width: 100px;
  max-height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

