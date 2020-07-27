<template>
  <div class="height-100 schoolList">
    <M-Table-List>
      <div slot="Info">
        <el-form :inline="true" :model="form" size="mini">
          <el-form-item label="学校名称：">
            <el-select v-model="schoolSelect" placeholder="请选择学校" @change="changeSchool">
              <el-option
                v-for="item in schoolList"
                :key="item.id"
                :label="item.schoolName"
                :value="item.id+','+item.dataSourceCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input
              v-model.trim="form.staffName"
              :style="{width:formInputWidth}"
              placeholder="姓名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchList()" icon="el-icon-search">查询</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
          <el-form-item class="float-right">
            <span v-for="btn in btnList" :key="btn.id">
              <el-button
                type="success"
                @click="addInfo"
                icon="el-icon-plus"
                v-if="btn.name === '新增'"
              >新增</el-button>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom">
        <el-table
          :data="carList"
          :stripe="true"
          style="width: 100%;"
          border=""
          ref="xzTable"
          :height="sHeight"
        >
          <el-table-column prop="vehicleNo" label="车牌号" min-width="150" align="center"></el-table-column>
          <el-table-column
            prop="isDefault"
            label="是否默认"
            min-width="150"
            align="center"
            :formatter="isDefault"
          ></el-table-column>
          <el-table-column prop="staffName" label="姓名" min-width="120" align="center"></el-table-column>
          <el-table-column prop="staffTel" label="电话" min-width="150" align="center"></el-table-column>
          <el-table-column
            prop="carType"
            label="类型"
            min-width="120"
            align="center"
            :formatter="carType"
          ></el-table-column>
          <el-table-column prop="schoolName" label="学校" min-width="120" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <span v-for="btn in btnList" :key="btn.id">
                <el-button
                  type="success"
                  style="margin-right:8px"
                  icon="el-icon-edit"
                  @click="editInfo(scope.row)"
                  v-if="btn.name === '编辑'"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                  v-if="btn.name === '删除'"
                >删除</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="Pagination">
        <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
      </div>
    </M-Table-List>
    <el-dialog
      :title="totasTitle"
      :visible.sync="addDialog"
      :close-on-click-modal="false"
      custom-class="dialog-type-column1"
    >
      <carForm v-if="addDialog" @hideTotas="hideTotas" :carData="carData"></carForm>
    </el-dialog>
  </div>
</template>
<script>
import paginationCommon from "~/components/Pagination.vue";
import carForm from "./components/carForm.vue";
import getBtns from "~/components/mixin/getBtns";
export default {
  data() {
    return {
      formInputWidth: this.$store.state.fromBox.formInputWidth,
      sHeight: this.$store.state.bodyBox.tableHeight,
      form: {
        schoolId: "",
        staffName: "",
        dataSourceCode:'',
      },
      schoolSelect:'',//选择学校
      totasTitle: "新增学校",
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      },
      addDialog: false, //是否显示弹窗
      carData: {}, //修改学校的参数
      schoolList: [], //学校列表
      carList: [] //车辆列表
    };
  },
  // mixins: [getBtns],
  computed: {
    btnList:function(){
      return this.$store.state.ButtonByParent;
    }
  },
  components: {
    paginationCommon,
    carForm
  },
  methods: {
    //点击重置
    resetBtn(){
      this.form={
        schoolId: "",
        staffName: "",
        dataSourceCode:'',
      };
      this.schoolSelect="";
      this.pagination.pageNo = 1;
      this.getCarList();
    },
    //隐藏弹窗
    hideTotas() {
      this.addDialog = false;
      this.getCarList();
    },
    //选择学校
    changeSchool(data){
      var schoolArr = data.split(",");
      this.form.schoolId = schoolArr[0];
      this.form.dataSourceCode = schoolArr[1];
    },
    //点击删除
    handleDelete(data) {
      var id = data.id;
      var schoolId = data.schoolId;
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("baseVehicleNumberInfo/deleteBaseVehicleNumberInfo", { id,schoolId })
            .then(res => {
              this.$message({
                type: "success",
                message: "成功!"
              });
              this.getCarList();
            });
        })
        .catch(() => {});
    },
    //点击编辑
    editInfo(data) {
      this.totasTitle = '编辑校内车辆'
      this.carData = {
        id: data.id,
        schoolId: data.schoolId,
        schoolName:data.schoolName,
        staffName: data.staffName,
        staffTel: data.staffTel,
        vehicleNo: data.vehicleNo
      };
      this.addDialog = true;
    },
    //点击新增
    addInfo() {
      this.totasTitle = '新增校内车辆'
      this.carData = {};
      this.addDialog = true;
    },
    // 更新数据
    onRefresList(msg) {
      this.pagination.pageNo = msg.pageNo;
      this.pagination.pageSize = msg.pageSize;
      this.getCarList();
    },
    //点击查询
    searchList(){
      this.pagination.pageNo = 1;
      this.getCarList();
    },
    //获取学校列表
    getSchool() {
      this.common.getSchoolList().then(res => {
        this.schoolList = res;
      });
    },
    //获取车辆列表
    getCarList() {
      var data = this.form;
      data.pageNo = this.pagination.pageNo;
      data.pageSize = this.pagination.pageSize;
      this.$axios
        .post("baseVehicleNumberInfo/findBaseVehicleNumberInfo", data)
        .then(res => {
          if (res.data.code == 200) {
            this.carList = res.data.data.rows;
            this.pagination.total = res.data.data.total*1;
          }else{
            this.carList = [];
          }
        });
    },
    stateCode(row) {
      return row.statusCode == "0"
        ? "启用"
        : row.statusCode == "1"
          ? "停用"
          : "";
    },
    //车辆类型
    carType(row) {
      return row.carType == 0? "校内" : "校外";
    },
    //是否默认
    isDefault(row) {
      return row.isDefault == 0 ? "否" : "是";
    }
  },
  created() {
    this.getSchool();
    this.getCarList();
  }
};
</script>
<style lang="less" scoped>
.schoolList {
  .sl-head {
    display: flex;
    justify-content: space-between;
  }
}
</style>
