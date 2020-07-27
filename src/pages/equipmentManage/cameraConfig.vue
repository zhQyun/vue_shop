<template>
  <div class="height-100 cameraConfig">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="学校名称：">
            <el-select v-model="schoolSelect" placeholder="请选择学校" clearable  @change="changeSchool">
              <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id+','+item.dataSourceCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域：">
            <el-select v-model="searchForm.deviceRegionId" placeholder="请选择区域" :style="{width:formInputWidth}" clearable>
              <el-option v-for="item in regionlList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称：">
            <el-input v-model.trim="searchForm.deviceName" :style="{width:formInputWidth}" placeholder="名称" clearable></el-input>
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
          <el-table-column prop="schoolName" label="学校" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="deviceNo" label="编号" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="deviceName" label="名称" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="regionName" label="区域" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="externalLongitude" label="经度(对外)" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="externalLatitude" label="纬度(对外)" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="externalMapType" label="地图类型(对外)" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="internalLongitude" label="经度(对内)" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="internalLatitude" label="纬度(对内)" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="internalMapType" label="地图类型(对内)" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="chanId" label="访问链接" min-width="200" align="center">
          </el-table-column>
          <el-table-column prop="cameraDetails" label="详情地址" min-width="200" align="center">
          </el-table-column>
          <el-table-column prop="deviceSerial" label="序列号" min-width="200" align="center">
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
      <el-dialog :title="'摄像头配置-新增'" custom-class="dialog-type-column2" :visible.sync="addDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
            <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编号：" prop="deviceNo" :label-width="formLabelWidth">
              <el-input placeholder="编号" v-model.trim="ruleForm.deviceNo" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="名称：" prop="deviceName" :label-width="formLabelWidth">
              <el-input placeholder="名称" v-model.trim="ruleForm.deviceName" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="区域：" prop="deviceRegionId" :label-width="formLabelWidth">
              <el-select v-model="ruleForm.deviceRegionId" placeholder="请选择区域" style="width: 100%;">
                <el-option v-for="item in regionlList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="访问链接：" prop="chanId" :label-width="formLabelWidth">
              <el-input placeholder="访问链接" v-model="ruleForm.chanId"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="详情地址：" prop="cameraDetails" :label-width="formLabelWidth">
              <el-input placeholder="详情地址" v-model="ruleForm.cameraDetails"  maxlength="255"></el-input>
            </el-form-item>
            <el-form-item label="序列号：" prop="deviceSerial" :label-width="formLabelWidth">
              <el-input placeholder="序列号" v-model.trim="ruleForm.deviceSerial"  maxlength="255"></el-input>
            </el-form-item>
            <el-form-item label="经度(对外)：" prop="externalLongitude" :label-width="formLabelWidth">
              <el-input placeholder="经度(对外)" v-model="ruleForm.externalLongitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="纬度(对外)：" prop="externalLatitude" :label-width="formLabelWidth">
              <el-input placeholder="纬度(对外)" v-model="ruleForm.externalLatitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="地图类型(对外)：" prop="externalMapType" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.externalMapType" placeholder="请选择地图类型(对外)" style="width: 100%;">
                <el-option label="百度" value="百度"></el-option>
                <el-option label="高德" value="高德"></el-option>
                <el-option label="谷歌" value="谷歌"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经度(对内)：" prop="internalLongitude" :label-width="formLabelWidth">
              <el-input placeholder="经度(对内)" v-model="ruleForm.internalLongitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="纬度(对内)：" prop="internalLatitude" :label-width="formLabelWidth">
              <el-input placeholder="纬度(对内)" v-model="ruleForm.internalLatitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="地图类型(对内)：" prop="internalMapType" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.internalMapType" placeholder="请选择地图类型(对内)" style="width: 100%;">
                <el-option label="百度" value="百度"></el-option>
                <el-option label="高德" value="高德"></el-option>
                <el-option label="谷歌" value="谷歌"></el-option>
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
      <el-dialog :title="'摄像头配置-编辑'" custom-class="dialog-type-column2" :visible.sync="editDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
           <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;" clearable>
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="编号：" prop="deviceNo" :label-width="formLabelWidth">
              <el-input placeholder="编号" v-model.trim="ruleForm.deviceNo" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="名称：" prop="deviceName" :label-width="formLabelWidth">
              <el-input placeholder="名称" v-model.trim="ruleForm.deviceName" style="width: 100%;" maxlength="32">
              </el-input>
            </el-form-item>
            <el-form-item label="区域：" prop="deviceRegionId" :label-width="formLabelWidth">
              <el-select v-model="ruleForm.deviceRegionId" placeholder="请选择区域" style="width: 100%;">
                <el-option v-for="item in regionlList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="访问链接：" prop="chanId" :label-width="formLabelWidth">
              <el-input placeholder="访问链接" v-model="ruleForm.chanId"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="详情地址：" prop="cameraDetails" :label-width="formLabelWidth">
              <el-input placeholder="详情地址" v-model="ruleForm.cameraDetails"  maxlength="255"></el-input>
            </el-form-item>
            <el-form-item label="序列号：" prop="deviceSerial" :label-width="formLabelWidth">
              <el-input placeholder="序列号" v-model.trim="ruleForm.deviceSerial"  maxlength="255"></el-input>
            </el-form-item>
            <el-form-item label="经度(对外)：" prop="externalLongitude" :label-width="formLabelWidth">
              <el-input placeholder="经度(对外)" v-model="ruleForm.externalLongitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="纬度(对外)：" prop="externalLatitude" :label-width="formLabelWidth">
              <el-input placeholder="纬度(对外)" v-model="ruleForm.externalLatitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="地图类型(对外)：" prop="externalMapType" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.externalMapType" placeholder="请选择地图类型(对外)" style="width: 100%;">
                <el-option label="百度" value="百度"></el-option>
                <el-option label="高德" value="高德"></el-option>
                <el-option label="谷歌" value="谷歌"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经度(对内)：" prop="internalLongitude" :label-width="formLabelWidth">
              <el-input placeholder="经度(对内)" v-model="ruleForm.internalLongitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="纬度(对内)：" prop="internalLatitude" :label-width="formLabelWidth">
              <el-input placeholder="纬度(对内)" v-model="ruleForm.internalLatitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="地图类型(对内)：" prop="internalMapType" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.internalMapType" placeholder="请选择地图类型(对内)" style="width: 100%;">
                <el-option label="百度" value="百度"></el-option>
                <el-option label="高德" value="高德"></el-option>
                <el-option label="谷歌" value="谷歌"></el-option>
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
    name: "cameraConfig",
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
         // 控制新增弹窗
        addDialog: false,
         // 控制编辑弹窗
        editDialog: false,
        // 查询表单数据
        searchForm: {
          schoolId:'',
          deviceRegionId: '',
          deviceName:'',
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
          schoolId: '',
          deviceNo: '',
          deviceName: '',
          deviceRegionId: '',
          chanId:'',
          cameraDetails:'',
          deviceSerial:'',
          externalLongitude:'',
          externalLatitude:'',
          externalMapType:'',
          internalLongitude:'',
          internalLatitude:'',
          internalMapType:''
        },
        // 必填项校验
        rules: {
          schoolId: [{required: true, message: '请选择学校', trigger: 'change'}],
          deviceNo: [{required: true,message: '请输入编号',trigger: ['blur','change']}],
          deviceName: [{required: true,message: '请输入名称',trigger: ['blur','change']}],
          deviceRegionId: [{required: true, message: '请选择区域', trigger: 'change'}],
          chanId: [{required: true,message: '请输入访问链接',trigger: ['blur','change']}],
          // cameraDetails: [{required: true,message: '请输入详情地址',trigger: ['blur','change']}],
          deviceSerial: [{required: true,message: '请输入序列号',trigger: ['blur','change']}],
          // externalLongitude: [{required: true,message: '请输入经度(对外)',trigger: ['blur','change']}],
          // externalLatitude: [{required: true,message: '请输入纬度(对外)',trigger: ['blur','change']}],
          // externalMapType: [{required: true, message: '请选择地图类型(对外)', trigger: 'change'}]
          internalLongitude: [{required: true,message: '请输入经度(对内)',trigger: ['blur','change']}],
          internalLatitude: [{required: true,message: '请输入纬度(对内)',trigger: ['blur','change']}],
          // internalMapType: [{required: true, message: '请选择地图类型(对内)', trigger: 'change'}]
        },
      }
    },
    created: function() {
      // this.getBtns();
      this.refreshData();
      this.getSchoolList()
      this.getReionList()
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
      // getSchoolList() {
      //   let that=this
      //   this.$axios.post("/baseSchool/findBaseSchool", this.searchForm).then(function(res) {
      //     if(res.data.code==200) {
      //       console.log(res.data.data.rows);
      //       that.schoolList=res.data.data.rows
      //     }
      //   })
      // },
      //获取区域列表
      getReionList() {
        let that=this
        this.$axios.post("/baseDeviceRegion/findBaseDeviceRegion", this.searchForm).then(function(res) {
          if(res.data.code==200) {
            that.regionlList=res.data.data.rows
          }
        })
      },
      // 重置信息
      reactRecord() {
        this.searchForm={
          schoolId:'',
          deviceRegionId: '',
          deviceName:'',
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
        this.$axios.post("/baseCameraDevice/findBaseCameraDevice", this.searchForm).then(function(res) {
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
                this.$axios.post("/baseCameraDevice/addBaseCameraDevice", params).then(function(res) {
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
            this.$axios.post("/baseCameraDevice/updateBaseCameraDevice", params).then(function(res) {
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
            .post("/baseCameraDevice/deleteBaseCameraDevice", { id: row.id,schoolId:row.schoolId })
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
  .el-dialog__body{
    padding: 40px 40px 20px 30px !important;
  }
</style>
<style>
.cameraConfig .el-dialog__body {
    max-height: 50vh;
    overflow: auto;
  }
</style>
