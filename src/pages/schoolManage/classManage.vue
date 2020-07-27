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
          <el-form-item label="年级名称：">
            <el-select v-model="form.gradeId" placeholder="请选择年级" @change="searchData">
              <el-option
                v-for="item in gradeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData()" icon="el-icon-search">查询</el-button>
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
          <el-form-item label="">
            <el-button type="primary" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom" v-loading="loading">
        <el-table
          :data="tableData"
          :stripe="true"
          style="width: 100%;"
          border=""
          ref="xzTable"
          :height="sHeight"
        >
          <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
          <!-- <el-table-column type="index" label="序号" width="60" align="center"></el-table-column> -->
          <el-table-column prop="schoolName" label="学校名称" min-width="150" align="center"></el-table-column>
          <el-table-column prop="gradeName" label="年级名称" min-width="150" align="center"></el-table-column>
          <el-table-column prop="className" label="班级名称" min-width="120" align="center"></el-table-column>
          <el-table-column prop="teacherName" label="教师姓名" min-width="120" align="center"></el-table-column>
          <el-table-column prop="classPhone" label="班级微信手机号" min-width="120" align="center"></el-table-column>
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
      <classForm v-if="addDialog" @hideTotas="hideTotas" :classData="classData"></classForm>
    </el-dialog>
  </div>
</template>
<script>
import paginationCommon from "~/components/Pagination.vue";
import classForm from "./components/classForm.vue";
// import getBtns from "~/components/mixin/getBtns";
export default {
  data() {
    return {
      formInputWidth: this.$store.state.fromBox.formInputWidth,
      sHeight: this.$store.state.bodyBox.tableHeight,
      form: {
        schoolId: "",
        gradeId: "",
        dataSourceCode: "",
      },
      schoolSelect:'',//选中的学校
      tableData: [],
      totasTitle: "新增班级",
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      },
      addDialog: false, //是否显示弹窗
      classData: {}, //修改学校的参数
      schoolList: [],
      gradeList: [],
      loading: false
    };
  },
  // mixins: [getBtns],
  components: {
    paginationCommon,
    classForm
  },
  computed: {
    btnList:function(){
      return this.$store.state.ButtonByParent;
    }
  },
  methods: {
    //点击重置
    resetBtn(){
      this.form={
        schoolId: "",
        gradeId: "",
        dataSourceCode: "",
      };
      this.schoolSelect="";
      this.pagination.pageNo = 1;
      this.getClass();
    },
    //隐藏弹窗
    hideTotas() {
      this.addDialog = false;
      this.getClass();
    },
    //选择学校
    changeSchool(data) {
      var schoolArr = data.split(",");
      this.form.schoolId = schoolArr[0];
      this.form.dataSourceCode = schoolArr[1];
      this.pagination.pageNo = 1;
      this.form.gradeId = "";
      this.getGrades(schoolArr[0]);
      // this.getClass();
    },
    //获取年级列表
    getGrades(schoolId) {
      this.$axios
        .post("baseGrade/findBaseGrade", {
          pageNo: 1,
          pageSize: 1000,
          schoolId: schoolId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.gradeList = res.data.data.rows;
          }
        });
    },
    //进行年级的筛选
    searchData() {
      this.pagination.pageNo = 1;
      this.getClass();
    },
    //点击删除
    handleDelete(data) {
      var id = data.id;
      var schoolId = data.schoolId;
      this.$confirm("确认是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("baseClass/deleteBaseClass", { id,schoolId })
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
              }
              this.getClass();
            });
        })
        .catch(() => {});
    },
    //点击编辑
    editInfo(data) {
      this.totasTitle = '编辑班级';
      this.classData = {
        id: data.id,
        schoolId: data.schoolId,
        gradeId: data.gradeId,
        className: data.className,
        teacherName: data.teacherName,
        classPhone: data.classPhone
      };
      this.addDialog = true;
    },
    //点击新增
    addInfo() {
      this.totasTitle = '新增班级';
      this.classData = {};
      this.addDialog = true;
    },
    // 更新数据
    onRefresList(msg) {
      this.pagination.pageNo = msg.pageNo;
      this.pagination.pageSize = msg.pageSize;
      this.getClass();
    },
    //获取班级列表
    getClass() {
      var data = {
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        schoolId: this.form.schoolId,
        gradeId: this.form.gradeId,
        dataSourceCode:this.form.dataSourceCode,
      };
      this.$axios.post("baseClass/findBaseClass", data).then(res => {
        if (res.data.code == 200) {
          this.pagination.total = res.data.data.total * 1;
          this.tableData = res.data.data.rows;
        }else{
          this.tableData = [];
        }
      });
    },
    //获取学校列表
    getschoolList() {
      this.common.getSchoolList().then(res => {
        this.schoolList = res;
      });
    }
  },
  created() {
    this.getClass();
    this.getschoolList();
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
