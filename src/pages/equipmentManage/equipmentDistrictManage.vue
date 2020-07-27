<template>
  <div class="height-100 equipmentDistrict">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="学校名称：">
            <el-select v-model="schoolSelect" placeholder="请选择学校" clearable  @change="changeSchool">
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
          <el-table-column prop="schoolName" label="学校" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="regionName" label="区域" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="sort" label="排序值" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="longitude" label="经度" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="latitude" label="纬度" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="mapType" label="地图类型" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="mapUrl" label="区域照片" min-width="200" align="center">
            <template slot-scope="scope">
              <img v-if="!scope.row.mapUrl" :src="base_url+scope.row.mapUrl" width="0" height="0">
              <img v-else :src="base_url+scope.row.mapUrl" width="80" height="80">
              <!-- <img :src="base_url+scope.row.mapUrl" width="80" height="80"/> -->
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
      <el-dialog :title="'设备区域管理-新增'" custom-class="dialog-type-column2" :visible.sync="addDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
            <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区域：" prop="regionName" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.regionName" placeholder="区域" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="排序值：" prop="sort" :label-width="formLabelWidth">
              <el-input placeholder="请输入排序值" v-model.number.trim="ruleForm.sort" style="width: 100%;" maxlength="9">
              </el-input>
            </el-form-item>
            <el-form-item label="经度：" prop="longitude" :label-width="formLabelWidth">
              <el-input placeholder="经度" v-model="ruleForm.longitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="纬度：" prop="latitude" :label-width="formLabelWidth">
              <el-input placeholder="纬度" v-model="ruleForm.latitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="地图类型：" prop="mapType" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.mapType" placeholder="请选择地图类型" style="width: 100%;">
                <el-option label="百度" value="百度"></el-option>
                <el-option label="高德" value="高德"></el-option>
                <el-option label="谷歌" value="谷歌"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预览：" prop="mapUrl" :label-width="formLabelWidth">
              <!-- 用于去掉输入提示  没有input  一旦有提示就会一直存在 -->
              <el-input v-model="ruleForm.mapUrl" v-show="false"></el-input>
              <img :src="ruleForm.mapUrl" style="float: left;">
            </el-form-item>
            <el-form-item label="更换图片：" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                action
                list-type="picture"
                :show-file-list="false"
                :on-change="getImg"
                :auto-upload="false"
                accept="image/jpeg, image/gif, image/png, image/bmp">
                <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
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
      <el-dialog :title="'设备区域管理-编辑'" custom-class="dialog-type-column2" :visible.sync="editDialog" :close-on-click-modal="false" @close="closed">
        <div :v-loading="loading">
          <el-form :model="ruleForm" ref="ruleForm" label-position="right" label-width="110px" :rules="rules">
              <el-form-item label="学校名称：" prop="schoolId" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.schoolId" placeholder="请选择学校" style="width: 100%;" :disabled="true">
                <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区域：" prop="regionName" :label-width="formLabelWidth" >
              <el-input v-model.trim="ruleForm.regionName" placeholder="区域" style="width: 100%;" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="排序值：" prop="sort" :label-width="formLabelWidth">
              <el-input placeholder="请输入排序值" v-model.number.trim="ruleForm.sort" style="width: 100%;" maxlength="9">
              </el-input>
            </el-form-item>
            <el-form-item label="经度：" prop="longitude" :label-width="formLabelWidth">
              <el-input placeholder="经度" v-model="ruleForm.longitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="纬度：" prop="latitude" :label-width="formLabelWidth">
              <el-input placeholder="纬度" v-model="ruleForm.latitude"  maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="地图类型：" prop="mapType" :label-width="formLabelWidth" >
              <el-select v-model="ruleForm.mapType" placeholder="请选择地图类型" style="width: 100%;">
                <el-option label="百度" value="百度"></el-option>
                <el-option label="高德" value="高德"></el-option>
                <el-option label="谷歌" value="谷歌"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预览：" prop="mapUrl" :label-width="formLabelWidth">
              <!-- 用于去掉输入提示  没有input  一旦有提示就会一直存在 -->
              <!-- <el-input v-model="ruleForm.mapUrl" v-show="false"></el-input> -->
              <img :src="state_img?base_url+ruleForm.mapUrl:ruleForm.mapUrl" style="float: left;" width="300" height="300">
            </el-form-item>
            <el-form-item label="更换图片：" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                action
                list-type="picture"
                :show-file-list="false"
                :on-change="getImg"
                :auto-upload="false"
                accept="image/jpeg, image/gif, image/png, image/bmp">
                <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
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
    name: "equipmentDistrict",
    data() {
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
          schoolName: "",
          regionName:"",
          sort:'',
          longitude:'',
          latitude:'',
          mapType:'',
          mapUrl:''
        },
        // 必填项校验
        rules: {
          schoolId: [{required: true, message: '请选择学校', trigger: 'change'}],
          regionName: [{required: true, message: '请输入区域', trigger: ['blur','change']}],
          sort: [{type:'number',required: true, message: '请输入数字排序值', trigger: ['blur','change']}],
          // longitude: [{required: true, message: '请输入经度', trigger: ['blur','change']}],
          // latitude: [{required: true, message: '请输入纬度', trigger: ['blur','change']}],
          // mapType: [{required: true, message: '请选择地图类型', trigger: 'change'}],
          mapUrl: [{required: true, message: '请选择区域图片', trigger: 'change'}]
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
          this.$set(this.ruleForm, "mapUrl", res);
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
          schoolId:''
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
        this.$axios.post("/baseDeviceRegion/findBaseDeviceRegion", this.searchForm).then(function(res) {
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
                this.$axios.post("/baseDeviceRegion/addBaseDeviceRegion", params).then(function(res) {
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
            this.$axios.post("/baseDeviceRegion/updateBaseDeviceRegion", params).then(function(res) {
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
            .post("/baseDeviceRegion/deleteBaseDeviceRegion", { id: row.id ,schoolId:row.schoolId})
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
<style>
.equipmentDistrict .el-dialog__body {
    max-height: 50vh;
    overflow: auto;
  }
</style>
