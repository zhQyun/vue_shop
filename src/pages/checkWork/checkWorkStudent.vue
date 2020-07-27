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
          <el-form-item label="年级：">
            <el-select v-model="form.gradeId" placeholder="请选择年级" @change="changeGrade">
              <el-option
                v-for="item in gradeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级：">
            <el-select v-model="form.classId" placeholder="请选择班级">
              <el-option
                v-for="item in classList"
                :key="item.id"
                :label="item.className"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="form.stuName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="卡号：">
            <el-input v-model="form.cardNum" placeholder="请输入卡号"></el-input>
          </el-form-item>
          <el-form-item label="时间类型：">
            <el-select v-model="form.timeType" placeholder="请选择时间类型">
              <el-option
                :label="item.dictName"
                :value="item.dictValue"
                v-for="item in timeTypeList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-date-picker
              v-model="form.createTime"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="设备区域：">
            <el-select v-model="form.deviceRegionId" placeholder="请选择设备区域">
              <el-option
                v-for="item in DeviceRegionList"
                :key="item.id"
                :label="item.regionName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备点位：">
            <el-select v-model="form.deviceLocationId" placeholder="请选择设备点位">
              <el-option
                :label="item.deviceaName"
                :value="item.id"
                v-for="item in statusList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="getList" icon="el-icon-search">查询</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom">
        <el-table
          :data="tableData"
          :stripe="true"
          style="width: 100%;"
          border=""
          ref="xzTable"
          :height="sHeight"
        >
          <el-table-column prop="schoolName" label="学校名称" min-width="150" align="center"></el-table-column>
          <el-table-column prop="gradeName" label="年级" min-width="150" align="center"></el-table-column>
          <el-table-column prop="className" label="班级" min-width="120" align="center"></el-table-column>
          <el-table-column prop="stuName" label="姓名" min-width="120" align="center"></el-table-column>
          <el-table-column prop="rfid" label="RFID" min-width="120" align="center"></el-table-column>
          <el-table-column prop="cardNum" label="卡号" min-width="120" align="center"></el-table-column>
          <el-table-column prop="regionName" label="设备区域" min-width="120" align="center"></el-table-column>
          <el-table-column prop="deviceaName" label="设备点位" min-width="120" align="center"></el-table-column>
          <el-table-column
            prop="timeType"
            label="时间类型"
            min-width="120"
            align="center"
            :formatter="timeType"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            min-width="120"
            align="center"
            :formatter="formTime"
          ></el-table-column>
          <el-table-column
            prop="checkStatus"
            label="状态"
            min-width="120"
            align="center"
            :formatter="stateCode"
          ></el-table-column>
        </el-table>
      </div>
      <div slot="Pagination">
        <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
      </div>
    </M-Table-List>
  </div>
</template>
<script>
import paginationCommon from "~/components/Pagination.vue";
import getBtns from "~/components/mixin/getBtns";
import moment from "moment";
export default {
  data() {
    return {
      formInputWidth: this.$store.state.fromBox.formInputWidth,
      sHeight: this.$store.state.bodyBox.tableHeight,
      form: {
        schoolId: "",
        dataSourceCode:'',
        gradeId: "",
        classId: "",
        createTime: "",
        deviceRegionId: "",
        timeType: "",
        stuName: "",
        cardNum: "",
        deviceaName: ""
      },
      schoolSelect: "", //选中的学校
      tableData: [],
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      },
      addDialog: false, //是否显示弹窗
      schoolData: {}, //修改学校的参数
      schoolList: [], //学校列表
      gradeList: [], //年级列表
      classList: [], //班级列表
      timeTypeList: [], //时间类型
      DeviceRegionList: [], //设备区域列表
      statusList: [] //设备点位
    };
  },
  components: {
    paginationCommon
  },
  mixins: [getBtns],
  methods: {
    //点击重置
    resetBtn(){
      this.form={
        schoolId: "",
        dataSourceCode:'',
        gradeId: "",
        classId: "",
        createTime: "",
        deviceRegionId: "",
        timeType: "",
        stuName: "",
        cardNum: "",
        deviceaName: ""
      };
      this.schoolSelect="";
      this.pagination.pageNo = 1;
      this.getList();
    },
    // 更新数据
    onRefresList(msg) {
      this.pagination.pageNo = msg.pageNo;
      this.pagination.pageSize = msg.pageSize;
      this.getList();
    },
    //获取设备区域列表
    getDeviceRegion(schoolId) {
      this.$axios
        .post("baseDeviceRegion/findBaseDeviceRegion", {
          pageNo: 1,
          pageSize: 1000,
          schoolId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.DeviceRegionList = res.data.data.rows;
          }
        });
    },

    //改变学校
    changeSchool(data) {
      var schoolArr = data.split(",");
      this.form.gradeId = "";
      this.form.classId = "";
      this.form.deviceRegionId = '';
      this.form.schoolId = schoolArr[0];
      this.form.dataSourceCode = schoolArr[1];
      this.getGrade(schoolArr[0]);
      this.getDeviceRegion(schoolArr[0]);
      this.getStatus();
    },
    //改变年级
    changeGrade(gradeId) {
      this.form.classId = "";
      this.getClass(gradeId);
    },
    //获取学校
    getSchool() {
      this.common.getSchoolList().then(res => {
        this.schoolList = res;
      });
    },
    //获取年级
    getGrade(schoolId) {
      this.$axios
        .post("baseGrade/findBaseGrade", {
          schoolId,
          pageNo: 1,
          pageSize: 10000
        })
        .then(res => {
          if (res.data.code == 200) {
            this.gradeList = res.data.data.rows;
          }
        });
    },
    getClass(gradeId) {
      this.$axios
        .post("baseClass/findBaseClass", {
          gradeId,
          pageNo: 1,
          pageSize: 10000
        })
        .then(res => {
          if (res.data.code == 200) {
            this.classList = res.data.data.rows;
          }
        });
    },
    //获取列表
    getList() {
      var data = this.form;
      data.pageNo = this.pagination.pageNo;
      data.pageSize = this.pagination.pageSize;
      this.$axios
        .post("baseStudentAttendance/findBaseStudentAttendance", data)
        .then(res => {
          if (res.data.code == 200) {
            this.pagination.total = res.data.data.total * 1;
            this.tableData = res.data.data.rows;
          }else{
            this.tableData = [];
          }
        });
    },
    //获取时间类型
    getTimeType() {
      this.common
        .getDictionary({
          dictGroupCode: "ATTENDANCE_TIME_TYPE"
        })
        .then(res => {
          if (res.data.code == 200) {
            this.timeTypeList = res.data.data;
          }
        });
    },
    //获取设备点位
    getStatus() {
      this.$axios
        .post("baseAttendanceDevice/findAttendanceDeviceLocation", {
          schoolId:this.form.schoolId,
        })
        .then(res => {
          this.statusList = res.data.data;
        });
    },
    //格式化时间
    formTime(row, column, cellValue, index) {
      if (cellValue) {
        return moment(cellValue).format("YYYY-MM-DD");
      } else {
        return "";
      }
    },
    timeType(row) {
      var msg = "";
      var type = row.timeType;
      if (type == 1) {
        msg = "上午上课";
      } else if (type == 2) {
        msg = "上午放学";
      } else if (type == 3) {
        msg = "下午上课";
      } else if (type == 4) {
        msg = "下午放学";
      }
      return msg;
    },
    stateCode(row) {
      var msg = "";
      if (row.checkStatus == 0) {
        msg = "进校";
      } else if (row.checkStatus == 1) {
        msg = "出校";
      } else if (row.checkStatus == 2) {
        msg = "到校";
      } else if (row.checkStatus == 3) {
        msg = "离校";
      } else if (row.checkStatus == 4) {
        msg = "到点";
      } else if (row.checkStatus == 5) {
        msg = "未定";
      }
      return msg;
    }
  },
  created() {
    this.getList();
    this.getSchool();
    this.getTimeType();
    // this.getStatus();
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
