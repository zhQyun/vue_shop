<template>
  <div class="height-100 readHeaderConfig">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="学校名称：">
            <el-select v-model="schoolSelect" placeholder="请选择学校" clearable  @change="changeSchool">
              <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id+','+item.dataSourceCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备编号A：">
            <el-input v-model.trim="searchForm.deviceaNo" :style="{width:formInputWidth}" placeholder="设备编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="设备名称A：">
            <el-input v-model.trim="searchForm.deviceaName" :style="{width:formInputWidth}" placeholder="设备名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="设备类型：">
            <el-select v-model="searchForm.deviceType" placeholder="请选择设备类型" :style="{width:formInputWidth}" clearable>
              <el-option v-for="item in deviceList" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备状态：">
            <el-select v-model="searchForm.deviceStatus" placeholder="请选择设备状态" :style="{width:formInputWidth}" clearable>
              <el-option label="离线" :value="0"></el-option>
              <el-option label="在线" :value="1"></el-option>
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
        <el-table :data="tableData" :stripe="true"  style="width: 100%;" border ref="xzTable" :height="sHeight">
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column prop="deviceaNo" label="设备编号A" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="deviceaName" label="设备名称A" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="devicebNo" label="设备编号B" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="devicebName" label="设备名称B" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="deviceType" label="设备类型" min-width="100" align="center" :formatter="type">
          </el-table-column>
          <el-table-column prop="deviceStatus" label="设备状态" min-width="100" align="center" :formatter="status">
          </el-table-column>
          <el-table-column prop="schoolName" label="归属学校" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="regionName" label="设备区域" min-width="150" align="center">
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
      <el-dialog :title="'读头配置-新增'" custom-class="dialog-type-column2" :visible.sync="addDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
            <el-form-item label="设备编号A：" prop="deviceaNo" :label-width="formLabelWidth">
              <el-input placeholder="设备编号A" v-model.trim="ruleForm.deviceaNo" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="设备名称A：" prop="deviceaName" :label-width="formLabelWidth">
              <el-input placeholder="设备名称A" v-model.trim="ruleForm.deviceaName" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="设备编号B：" prop="devicebNo" :label-width="formLabelWidth">
              <el-input placeholder="设备编号B" v-model.trim="ruleForm.devicebNo" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="设备名称B：" prop="devicebName" :label-width="formLabelWidth">
              <el-input placeholder="设备名称B" v-model.trim="ruleForm.devicebName" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="设备类型：" prop="deviceType" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.deviceType" placeholder="请选择设备类型" style="width: 100%;">
                <el-option v-for="item in deviceList" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备状态：" prop="deviceStatus" :label-width="formLabelWidth" >
            <el-select v-model="ruleForm.deviceStatus" placeholder="请选择设备状态" style="width: 100%;">
              <el-option label="离线" :value="0"></el-option>
              <el-option label="在线" :value="1"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备区域：" prop="deviceRegionId" :label-width="formLabelWidth">
              <el-select v-model="ruleForm.deviceRegionId" placeholder="请选择设备区域" style="width: 100%;">
                <el-option v-for="item in regionlList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
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
      <el-dialog :title="'读头配置-编辑'" custom-class="dialog-type-column2" :visible.sync="editDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
           <el-form-item label="设备编号A：" prop="deviceaNo" :label-width="formLabelWidth">
              <el-input placeholder="设备编号A" v-model.trim="ruleForm.deviceaNo" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="设备名称A：" prop="deviceaName" :label-width="formLabelWidth">
              <el-input placeholder="设备名称A" v-model.trim="ruleForm.deviceaName" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="设备编号B：" prop="devicebNo" :label-width="formLabelWidth">
              <el-input placeholder="设备编号B" v-model.trim="ruleForm.devicebNo" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="设备名称B：" prop="devicebName" :label-width="formLabelWidth">
              <el-input placeholder="设备名称B" v-model.trim="ruleForm.devicebName" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="设备类型：" prop="deviceType" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.deviceType" placeholder="请选择设备类型" style="width: 100%;">
                <!-- <el-option v-for="item in deviceList" :key="item.id" :label="item.dictName" :value="item.dictValue"></el-option> -->
                <el-option label="考勤点" :value="1"></el-option>
                <el-option label="接送点" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备状态：" prop="deviceStatus" :label-width="formLabelWidth" >
            <el-select v-model="ruleForm.deviceStatus" placeholder="请选择设备状态" style="width: 100%;">
              <el-option label="离线" :value="0"></el-option>
              <el-option label="在线" :value="1"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备区域：" prop="deviceRegionId" :label-width="formLabelWidth">
              <el-select v-model="ruleForm.deviceRegionId" placeholder="请选择设备区域" style="width: 100%;">
                <el-option v-for="item in regionlList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
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
    name: "readHeaderConfig",
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
        // 学校列表
        schoolList:[],
        // 区域列表
        regionlList:[],
        // 设备类型列表
        deviceList:[],
         // 控制新增弹窗
        addDialog: false,
         // 控制编辑弹窗
        editDialog: false,
        // 查询表单数据
        searchForm: {
          schoolId:'',
          deviceaNo:'',
          deviceaName:'',
          deviceType: '',
          deviceStatus:'',
          dataSourceCode:''
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
          deviceaNo: '',
          deviceaName: '',
          devicebNo: '',
          devicebName: '',
          deviceType:'',
          deviceStatus:'',
          schoolId: '',
          deviceRegionId:'',
        },
        // 必填项校验
        rules: {
          deviceaNo: [{required: true,message: '请输入设备编号A',trigger: ['blur','change']}],
          deviceaName: [{required: true,message: '请输入设备名称A',trigger: ['blur','change']}],
          devicebNo: [{required: true,message: '请输入设备编号B',trigger: ['blur','change']}],
          devicebName: [{required: true,message: '请输入设备名称B',trigger: ['blur','change']}],
          deviceType: [{required: true, message: '请选择设备类型', trigger: 'change'}],
          deviceStatus: [{required: true, message: '请选择设备状态', trigger: 'change'}],
          schoolId: [{required: true, message: '请选择学校', trigger: 'change'}],
          deviceRegionId: [{required: true, message: '请选择设备区域', trigger: 'change'}],
        },
      }
    },
    created: function() {
      // this.getBtns();
      this.refreshData();
      this.getSchoolList()
      this.getReionList()
      this.getdeviceList()
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
      //获取区域列表
      getReionList() {
        let that=this
        this.$axios.post("/baseDeviceRegion/findBaseDeviceRegion", this.searchForm).then(function(res) {
          if(res.data.code==200) {
            that.regionlList=res.data.data.rows
          }
        })
      },
      // 获取设备类型
      getdeviceList() {
       this.common.getDictionary({
          dictGroupCode: "ATTENDANCE_DEVICE_TYPE"
        }).then(res => {
          this.deviceList = res.data.data;
        });
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
        this.$axios.post("/baseAttendanceDevice/findBaseAttendanceDevice", this.searchForm).then(function(res) {
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
                this.$axios.post("/baseAttendanceDevice/addBaseAttendanceDevice", params).then(function(res) {
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
        console.log(row);
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
            this.$axios.post("/baseAttendanceDevice/updateBaseAttendanceDevice", params).then(function(res) {
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
            .post("/baseAttendanceDevice/deleteBaseAttendanceDevice", { id: row.id,schoolId:row.schoolId })
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
      status(row){
        return row.deviceStatus=='0'?'离线':row.deviceStatus=='1'?'在线':''
      },
      type(row){
        return row.deviceType=='1'?'考勤点':row.deviceType=='2'?'接送点':''
      }
    }
  }
</script>

<style scoped>
  .el-dialog__body{
    padding: 40px 40px 20px 30px !important;
  }
</style>

