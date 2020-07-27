<template>
  <div class="height-100 cardManage">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="学校名称：">
            <el-select v-model="schoolSelect" placeholder="请选择学校" clearable @change="changeSchool">
              <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id+','+item.dataSourceCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级：">
            <el-select v-model="searchForm.gradeId" placeholder="请选择年级" clearable @change="changeGrade">
              <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级：">
            <el-select v-model="searchForm.classId" placeholder="请选择班级" clearable>
              <el-option v-for="item in classList" :key="item.id" :label="item.className" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡状态：">
            <el-select v-model="searchForm.cardStatus" placeholder="请选择卡状态" clearable>
              <!-- <el-option label="解绑" value="1"></el-option> -->
              <el-option label="已绑定" value="2"></el-option>
              <el-option label="已损坏" value="3"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="卡号：">
            <el-input v-model.trim="searchForm.cardNum" :style="{width:formInputWidth}"
                      placeholder="卡号" clearable></el-input>
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
          <el-table-column prop="rfid" label="RFID" min-width="150" align="center">
          </el-table-column>
           <el-table-column prop="cardStatus" label="状态" min-width="120" style="color='red'" align="center">
             <template scope="scope">
                <!-- <span v-if="scope.row.cardStatus==1" style="color:blue">解绑</span> -->
                <span v-if="scope.row.cardStatus==2" style="color: green">已绑定</span>
                <span v-else style="color: red">已损坏</span>
              </template>
          </el-table-column>
          <el-table-column prop="schoolName" label="学校" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="gradeName" label="年级" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="className" label="班级" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="name" label="学生姓名" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="studentNo" label="学号" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="cardNum" label="卡号十进制数" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="cardType" label="卡类型" min-width="150" align="center" :formatter="cardType">
          </el-table-column>
           <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <span v-for="btn in btnList" :key="btn.id">
              <el-button type="success" style="margin-right:5px" icon="el-icon-edit" @click="editInfo(scope.row,1)" v-if="(btn.percode === 'edit')&&(scope.row.cardStatus==2)">编辑</el-button>
              <el-button type="danger" icon="el-icon-s-custom" @click="editInfo(scope.row,2)" v-if="(btn.percode === 'retie')&&(scope.row.cardStatus==2)">重绑</el-button>
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
      <el-dialog :title="'工作人员管理-新增'" custom-class="dialog-type-column2" :visible.sync="addDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
              <el-form-item label="学校：" prop="schoolId" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;" @change="changeSchoolcard">
                  <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年级：" prop="" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.gradeId" placeholder="" style="width: 100%;" :disabled="true">
                  <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级：" prop="" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.classId" placeholder="" style="width: 100%;" :disabled="true">
                  <el-option v-for="item in classList" :key="item.id" :label="item.className" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学生姓名：" prop="" :label-width="formLabelWidth">
                <el-input v-model.trim="ruleForm.name" style="width: 100%;" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="学号：" prop="studentNo" :label-width="formLabelWidth">
                <el-input placeholder="学号" v-model.trim="ruleForm.studentNo" style="width: 88%;"></el-input>
                <el-button  @click="change">查询学号</el-button>
              </el-form-item>
              <el-form-item label="卡号十进制数：" prop="cardNum" :label-width="formLabelWidth">
                <el-input placeholder="卡号十进制数" v-model="ruleForm.cardNum" oninput = "value=value.replace(/[^\d]/g,'')" style="width: 100%;" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item label="卡类型：" prop="cardType" :label-width="formLabelWidth" >
                <el-select v-model="ruleForm.cardType" placeholder="请选择卡类型" style="width: 100%;">
                  <el-option v-for="item in cardList" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
                </el-select>
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
      <el-dialog :title="this.searchForm.type==1?'工作人员管理-编辑':'工作人员管理-重绑'" custom-class="dialog-type-column2" :visible.sync="editDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
              <el-form-item label="学校："  prop="schoolId" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;" @change="changeSchoolcard" :disabled="this.searchForm.type==2">
                  <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
                </el-select>
                <!-- <el-input placeholder="学校" v-model.trim="ruleForm.schoolName" style="width: 100%;" :disabled="true"></el-input> -->
              </el-form-item>
              <el-form-item label="年级：" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.gradeId" placeholder="" style="width: 100%;" :disabled="true">
                  <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <!-- <el-input placeholder="年级" v-model.trim="ruleForm.gradeName" style="width: 100%;" readonly></el-input> -->
              </el-form-item>
              <el-form-item label="班级：" prop="" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.classId" placeholder="" style="width: 100%;" :disabled="true">
                  <el-option v-for="item in classList" :key="item.id" :label="item.className" :value="item.id" readonly></el-option>
                </el-select>
                <!-- <el-input placeholder="班级" v-model.trim="ruleForm.className" style="width: 100%;" :disabled="true"></el-input> -->
              </el-form-item>
              <el-form-item label="学生姓名：" prop="name" :label-width="formLabelWidth">
                <el-input placeholder="" v-model.trim="ruleForm.name" style="width: 100%;" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="学号：" prop="studentNo" :label-width="formLabelWidth">
                <el-input placeholder="学号" v-model.trim="ruleForm.studentNo" style="width: 88%;" :disabled="this.searchForm.type==2"></el-input>
                <el-input placeholder="学号" v-model.trim="studentNo1" style="width: 88%;" v-show="false"></el-input>
                <el-button  @click="change" :disabled="this.searchForm.type==2">查询学号</el-button>
              </el-form-item>
              <el-form-item label="卡号十进制数：" prop="cardNum" :label-width="formLabelWidth">
                <el-input placeholder="卡号十进制数" v-model="ruleForm.cardNum" oninput = "value=value.replace(/[^\d]/g,'')" style="width: 100%;" maxlength="10" :disabled="this.searchForm.type==1"></el-input>
              </el-form-item>
              <el-form-item label="卡类型：" prop="cardType" :label-width="formLabelWidth" >
                <el-select v-model="ruleForm.cardType" placeholder="请选择卡类型" style="width: 100%;" :disabled="this.searchForm.type==1">
                  <el-option label="深圳工厂" :value="1"></el-option>
                  <el-option label="东莞工厂" :value="2"></el-option>
                </el-select>
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
    name: "cardManage",
    data() {
      var checkCard = (rule, value, callback) => {
        var i= parseInt(value)
        if (i>=0 && i<=2147483647) {
          callback();
        } else {
          callback(new Error("卡号超出限制！"));
        }
      };
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
        // 学校列表
        schoolList:[],
        // 年级列表
        gradeList:[],
        // 班级列表
        classList:[],
        // 卡类型列表
        cardList:[],

         // 控制新增弹窗
        addDialog: false,
         // 控制编辑弹窗
        editDialog: false,
        // 查询表单数据
        searchForm: {
          schoolId:'',
          dataSourceCode:'',
          gradeId:'',
          classId:'',
        },
        schoolSelect: "", //选中学校
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
        },
        // 表单新增和编辑
        ruleForm: {
          id: '',
          schoolId:'',
          gradeId:'',
          classId:'',
          name: '',
          studentNo: '',
          cardNum: '',
          cardType: '',
          studentId:'',
        },
        // 学号改变时
        studentNo1:'',

        // 必填项校验
        rules: {
          schoolId: [{
            required: true,
            message: '请选择学校',
            trigger: 'change'
          }],
          studentNo: [{
            required: true,
            message: '请输入学号',
            trigger: ['blur','change']
          }],
          cardType: [
            {required: true, message: '请选择卡类型', trigger: 'change'},
          ],
          cardNum: [
            { required: true, message: '请输入十进制卡号(只能为数字)', trigger: ['blur'],},
            { validator: checkCard, trigger: "change" }
            ]
        },
      }
    },
    created: function() {
      // this.getBtns();
      this.refreshData();
      this.getSchoolList()
      this.getCardList()
      this.getGradeList()
      this.getClassList()
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
      // 查询学号
      change(){
        // this.getGradeList()
        // this.getClassList()
        this.studentNo1=this.ruleForm.studentNo
        let params={}
        params.studentNo=this.ruleForm.studentNo
        params.schoolId=this.ruleForm.schoolId
        if(!params.studentNo||!params.schoolId){
          this.$message({
            message: '请先根据学校和学号查询学生信息',
            type: 'error',
            duration: 1500,
            customClass: 'xz-alert-common'
          })
          return
        }
        this.$axios.post("/baseCardManage/findStudentMessageBystudentId",params).then(res=> {
          if(res.data.code==200) {
            this.getGradeList()
            this.getClassList()
            this.$set(this.ruleForm, "name", res.data.data.name);
            this.$set(this.ruleForm, "schoolId", res.data.data.schoolId);
            this.$set(this.ruleForm, "gradeId", res.data.data.gradeId);
            this.$set(this.ruleForm, "classId", res.data.data.classId);
            // this.ruleForm.name=res.data.data.name
            // this.ruleForm.schoolId=res.data.data.schoolId
            // this.ruleForm.gradeId=res.data.data.gradeId
            // this.ruleForm.classId=res.data.data.classId
            this.ruleForm.studentId=res.data.data.studentId
          }else{
            this.ruleForm.gradeId=''
            this.ruleForm.classId=''
            this.ruleForm.name=''
          }
        })
      },
      changeSchoolcard(){
        this.ruleForm.gradeId=''
        this.ruleForm.classId=''
        this.ruleForm.name=''
      },
      //改变学校
      changeSchool(data) {
        this.searchForm.gradeId = "";
        this.searchForm.classId = "";
        var schoolArr = data.split(",");
        this.searchForm.schoolId = schoolArr[0];
        this.searchForm.dataSourceCode = schoolArr[1];
        this.pagination.pageNo = 1;
        this.getGradeList(schoolArr[0]);
      },
      //改变年级
      changeGrade(gradeId) {
        this.searchForm.classId = "";
        this.getClassList(gradeId);
      },
      //获取学校列表
      getSchoolList(){
      this.common.getSchoolList().then(res=>{
        this.schoolList = res;
      })
    },
      // 获取年级列表
      getGradeList(schoolId) {
        this.$axios.post("/baseGrade/findBaseGrade",{
          schoolId,
          pageNo: 1,
          pageSize: 10000
        }).then(res=> {
          if(res.data.code==200) {
            this.gradeList=res.data.data.rows
          }
        })
      },
      // 获取班级列表
      getClassList(gradeId) {
        this.$axios.post("/baseClass/findBaseClass", {
          gradeId,
          pageNo: 1,
          pageSize: 10000
        }).then(res=>{
          if(res.data.code==200) {
            this.classList=res.data.data.rows
          }
        })
      },
      // 获取卡类型
      getCardList() {
       this.common.getDictionary({
          dictGroupCode: "CARD_TYPE"
        }).then(res => {
          this.cardList = res.data.data;
        });
      },
      // 重置信息
      reactRecord() {
        this.searchForm={
          groupName: '',
        },
        this.schoolSelect = "";
        this.refreshData();
      },
      // 表格数据
      refreshData: function() {
        this.tableData = [];
        // Object.assign(this.searchForm, this.pagination);
        this.searchForm.pageNo=this.pagination.pageNo
        this.searchForm.pageSize=this.pagination.pageSize
        // let loading = Vue.prototype.$loading();
        this.$axios.post("/baseCardManage/findListByLimit", this.searchForm).then(res=> {
          if(res.data.code==200) {
            this.tableData = res.data.data.rows;
            this.pagination.total = res.data.data.total*1;
          }
          // loading.close();
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
            this.loading=true
            if(!this.ruleForm.gradeId){
              this.$message({
                message: '请先根据正确学号查询学生信息！',
                type: 'error',
                duration: 1500,
                customClass: 'xz-alert-common'
              })
              return
            }
            let test={
              cardNum:this.ruleForm.cardNum,
              schoolId:this.ruleForm.schoolId
            }
            this.$axios.post("/baseCardManage/updateOrInsertCheek",test).then(res=> {
              if(res.data.code==200) {
                this.$axios.post("/baseCardManage/insertCardStudentByCardNum", this.ruleForm).then(res=> {
                  this.loading=false
                  if(res.data.code==200) {
                    this.addDialog = false;
                    this.$message({
                      message: '新增成功',
                      type: 'success',
                      duration: 1500,
                      customClass: 'xz-alert-common'
                    })
                    this.refreshData();
                  }
                })
              }
            })
          }else{
            this.$message({
            type: "warning",
            message: "请将信息填写完整",
            duration:1500
            });
            return
          }
        })
      },
      // 编辑
      editInfo(row,type){
        this.searchForm.type=type
        this.editDialog = true;//弹窗显示
        this.ruleForm=Object.assign({}, row);
        this.studentNo1=row.studentNo
      },
      editClick(){
        this.isDisable = true;
        setTimeout(() => {
        this.isDisable = false;
        }, 1500);
        this.$refs.ruleForm.validate(valid=>{
          if(valid){
            this.loading=true
            if(this.ruleForm.studentNo!=this.studentNo1){
              this.$message({
                message: '请先根据学号查询学生信息！',
                type: 'error',
                duration: 1500,
                customClass: 'xz-alert-common'
              })
              return
            }else if(!this.ruleForm.gradeId){
              this.$message({
                message: '请先根据正确学号查询学生信息！',
                type: 'error',
                duration: 1500,
                customClass: 'xz-alert-common'
              })
              return
            }
            var url=''
            var title=''
            if(this.searchForm.type==1){
              url='/baseCardManage/updateByPrimaryKey'
              title='编辑'
              this.$axios.post(url,this.ruleForm).then(res=> {
                this.loading=false
                if(res.data.code==200) {
                  this.$message({
                    message: title+'成功',
                    type: 'success',
                    duration: 1500,
                    customClass: 'xz-alert-common'
                  });
                  this.editDialog = false; //关闭弹窗
                  this.refreshData();
                }
              })
            }else if(this.searchForm.type==2){
              url='/baseCardManage/updateCardTypeByCardNum'
              title='重绑'
              this.$axios.post("/baseCardManage/updateOrInsertCheek",this.ruleForm).then(res=> {
                if(res.data.code==200){
                  this.$axios.post(url,this.ruleForm).then(res=> {
                    this.loading=false
                    if(res.data.code==200) {
                      this.$message({
                        message: title+'成功',
                        type: 'success',
                        duration: 1500,
                        customClass: 'xz-alert-common'
                      });
                      this.editDialog = false; //关闭弹窗
                      this.refreshData();
                    }
                  })
                }
              })
            }
          }else{
            this.$message({
            type: "warning",
            message: "请将信息填写完整",
            duration:1500
            });
            return
          }
        })
      },
      // 更新数据
      onRefresList (msg) {
        this.pagination.pageNo = msg.pageNo
        this.pagination.pageSize = msg.pageSize
        this.refreshData()
      },
      cardStatus(row){
        return row.cardStatus=='1'?'解绑':row.cardStatus=='2'?'已绑定':row.cardStatus=='3'?'已损坏':''
      },
      cardType(row){
        return row.cardType=='1'?'深圳工厂':row.cardType=='2'?'东莞工厂':''
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
.cardManage .el-dialog__body {
    max-height: 50vh;
    overflow: auto;
  }
</style>
