<template>
  <div class="height-100 StudentList">
    <M-Table-List>
      <div slot="Info" class="searchForm">
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
          <!-- <el-form-item label="年级：">
            <el-select v-model="form.gradeId" placeholder="请选择年级" @change="getClass">
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
          </el-form-item> -->
          <el-form-item label="姓名：">
            <el-input v-model="form.name" placeholder="请输入学生姓名"></el-input>
          </el-form-item>
          <el-form-item label="学号：">
            <el-input v-model="form.studentNo" placeholder="请输入学生学号"></el-input>
          </el-form-item>
          <el-form-item label="家长电话：">
            <el-input v-model="form.parentTel" placeholder="请输入学生家长电话"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick" icon="el-icon-search">查询</el-button>
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
          <el-table-column prop="name" label="学生姓名" min-width="120" align="center"></el-table-column>
          <el-table-column prop="studentNo" label="学号" min-width="120" align="center"></el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            min-width="100"
            align="center"
            :formatter="sexState"
          ></el-table-column>
          <el-table-column prop="parentNameOne" label="家长姓名" min-width="120" align="center"></el-table-column>
          <el-table-column prop="parentTelOne" label="家长电话" min-width="120" align="center"></el-table-column>
          <el-table-column prop="cardNum" label="卡号" min-width="120" align="center"></el-table-column>
          <el-table-column label="头像" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                type="success"
                style="margin-right:8px"
                icon="el-icon-edit"
                @click="showStudentImg(scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="Pagination">
        <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
      </div>
    </M-Table-List>
    <el-dialog
      :title="studentImg.title"
      :visible.sync="studentImg.show"
      :close-on-click-modal="false"
      custom-class="dialog-type-column1"
    >
      <div class="studentImg">
        <img :src="base_url+studentImg.url" alt="">
      </div>
    </el-dialog>
  </div>
</template>
<script>
import paginationCommon from "~/components/Pagination.vue";
import studentForm from "./components/studentForm.vue";
import upload from "./components/upload.vue";
import getBtns from "~/components/mixin/getBtns";
import API from "~/api/webpackAPI";
export default {
  data() {
    return {
      formInputWidth: this.$store.state.fromBox.formInputWidth,
      sHeight: this.$store.state.bodyBox.tableHeight,
      base_url: API.img_url, //图片拼接路径
      form: {
        schoolId: "",
        dataSourceCode: "",
        gradeId: "",
        classId: "",
        name: "",
        studentNo: "",
        parentTel: ""
      },
      schoolSelect: "", //选中学校
      tableData: [],
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      },
      schoolList: [], //学校列表
      gradeList: [], //年级列表
      classList: [], //班级列表
      studentImg: {
        //学生显示头像
        show: false,
        url: "",
        title: ""
      }
    };
  },
  mixins: [getBtns],
  components: {
    paginationCommon,
    studentForm,
    upload
  },
  methods: {
    //点击重置
    resetBtn() {
      this.form = {
        schoolId: "",
        dataSourceCode: "",
        name: "",
        studentNo: "",
        parentTel: ""
      };
      this.schoolSelect = "";
      this.pagination.pageNo = 1;
      this.getStudent();
    },
    //查看学生图片
    showStudentImg(data) {
      if (!data.image) {
        this.$message({
          type: "warning",
          message: "暂无图片"
        });
        return;
      }
      this.studentImg = {
        show: true,
        url: data.image,
        title: data.name + "头像"
      };
    },
    // 更新数据
    onRefresList(msg) {
      this.pagination.pageNo = msg.pageNo;
      this.pagination.pageSize = msg.pageSize;
      this.getStudent();
    },
    // 确认查询
    searchClick: function() {
      this.pagination.pageNo=1
      this.getStudent();
    },
    //获取学生列表
    getStudent() {
      // var data = this.form;
      this.form.pageNo = this.pagination.pageNo;
      this.form.pageSize = this.pagination.pageSize;
      this.$axios.post("/findHistoryStudent", this.form).then(res => {
        if (res.data.code == 200) {
          this.pagination.total = res.data.data.total * 1;
          this.tableData = res.data.data.rows;
        } else {
          this.tableData = [];
        }
      });
    },
    //获取学校列表
    getSchoolList() {
      this.common.getSchoolList().then(res => {
        this.schoolList = res;
      });
    },
    //改变学校
    changeSchool(data) {
      var schoolArr = data.split(",");
      this.form.schoolId = schoolArr[0];
      this.form.dataSourceCode = schoolArr[1];
      // this.pagination.pageNo = 1;
      // this.getGrades(schoolArr[0]);
    },
    //性别
    sexState(row) {
      return row.sex == 0 ? "女" : row.sex == 1 ? "男" : "";
    }
  },

  created() {
    this.getStudent();
    this.getSchoolList();
  }
};
</script>
<style lang="less" scoped>
.StudentList {
  .sl-head {
    display: flex;
    justify-content: space-between;
  }
  .tab-btns {
    display: flex;
    justify-content: left;
    padding: 5px;
    span {
      margin-right: 10px;
    }
  }
  .studentImg {
    text-align: center;
    img {
      width: 80%;
    }
  }
}
</style>
<style lang="less">
.StudentList {
  .searchForm {
    .el-form-item--mini {
      &.float-right {
        .el-form-item__content {
          text-align: right;
        }
      }
      .el-form-item__content {
        width: 160px;
      }
    }
  }
  .el-dialog {
    margin: 0 auto;
  }
  .dialog-type-column1 {
    margin-top: 6vh !important;
  }
  a {
    text-decoration: none;
    out-line: none;
    color: #fff;
  }
}
</style>
