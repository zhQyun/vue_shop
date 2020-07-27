<template>
  <div class="height-100 schoolList">
    <M-Table-List>
      <div slot="Info">
        <el-form :inline="true" :model="form" size="mini">
          <el-form-item label="学校名称：">
            <el-select
            v-model="schoolSelect"
            placeholder="请选择学校"
            @change="changeSchool">
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
            <el-input v-model="form.studentName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="发送时间：">
            <el-date-picker
              v-model="form.createTime"
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="发送状态：">
            <el-select v-model="form.sendStatus" placeholder="请选择发送状态">
              <el-option label="未发送" value="0"></el-option>
              <el-option label="已发送" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家长手机号：">
            <el-input v-model="form.parentTel" placeholder="请输入家长手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="initPage()" icon="el-icon-search">查询</el-button>
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
          <el-table-column prop="className" label="年级" min-width="150" align="center"></el-table-column>
          <el-table-column prop="className" label="班级" min-width="120" align="center"></el-table-column>
          <el-table-column prop="studentName" label="姓名" min-width="120" align="center"></el-table-column>
          <el-table-column prop="rfid" label="RFID" min-width="120" align="center"></el-table-column>
          <el-table-column prop="cardNum" label="卡号" min-width="120" align="center"></el-table-column>
          <el-table-column prop="parentTel" label="家长手机" min-width="120" align="center"></el-table-column>
          <el-table-column
            prop="sendStatus"
            label="发送状态"
            min-width="120"
            align="center"
            :formatter="sendType"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="发送时间"
            min-width="120"
            align="center"
            :formatter="formTime"
          ></el-table-column>
          <el-table-column prop="deviceaName" label="设备名称" min-width="120" align="center"></el-table-column>
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
import ruleForm from "./components/ruleForm.vue";
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
        studentName: "",
        createTime: "",
        sendStatus: "",
        parentTel: ""
      },
      schoolSelect:'',//被选中的学校 schoolId,dataSourceCode
      tableData: [],
      totasTitle: "新增学校",
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      },
      addDialog: false, //是否显示弹窗
      schoolList: [], //学校列表
      gradeList: [], //年级列表
      classList: [] //班级列表
    };
  },
  components: {
    paginationCommon,
    ruleForm
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
        studentName: "",
        createTime: "",
        sendStatus: "",
        parentTel: ""
      };
      this.schoolSelect="";
      this.pagination.pageNo = 1;
      this.getList();
    },
    //初始化页数
    initPage() {
      this.pagination.pageNo = 1;
      this.getList();
    },
    // 更新数据
    onRefresList(msg) {
      this.pagination.pageNo = msg.pageNo;
      this.pagination.pageSize = msg.pageSize;
      this.getList();
    },
    //获取推送列表
    getList() {
      var data = this.form;
      data.pageNo = this.pagination.pageNo;
      data.pageSize = this.pagination.pageSize;
      this.$axios.post("baseCardWxSend/findBaseCardWxSend", data).then(res => {
        if (res.data.code == 200) {
          this.pagination.total = res.data.data.total;
          this.tableData = res.data.data.rows;
        }else{
          this.tableData = [];
        }
      });
    },
    //改变学校
    changeSchool(data) {
      var schoolArr = data.split(",");
      this.form.gradeId = "";
      this.form.classId = "";
      this.form.schoolId = schoolArr[0];
      this.form.dataSourceCode = schoolArr[1];
      this.getGrade();
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
    getGrade() {
      this.$axios
        .post("baseGrade/findBaseGrade", {
          schoolId:this.form.schoolId,
          pageNo: 1,
          pageSize: 10000,
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
    stateCode(row) {
      return row.statusCode == "0"
        ? "启用"
        : row.statusCode == "1"
          ? "停用"
          : "";
    },
    //发送状态
    sendType(row, column, cellValue, index) {
      if (cellValue == 0) {
        return "未发送";
      } else if (cellValue == 1) {
        return "已发送";
      }
    },
    //格式化时间
    formTime(row, column, cellValue, index) {
      if (cellValue) {
        return moment(cellValue).format("YYYY-MM-DD");
      } else {
        return "";
      }
    }
  },
  created() {
    this.getList();
    this.getSchool();
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
