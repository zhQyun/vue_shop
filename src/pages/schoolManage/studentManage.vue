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
          <el-form-item label="年级：">
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
          </el-form-item>
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
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom">
        <div class="tab-btns">
          <span v-for="btn in btnList" :key="btn.id">
            <el-button type="primary" @click="addInfo" v-if="btn.name === '新增'">新增</el-button>
            <!-- <el-button type="primary" v-if="btn.name === '模板下载'" @click="getTemplate">
              <a :href="uploadUrl" target="_blank">模板下载</a>
            </el-button>-->

            <form :action="uploadUrl" method="post" v-if="btn.name === '模板下载'">
              <!-- <input type="submit" value="提交"> -->
              <el-button type="primary" native-type="submit">模板下载</el-button>
            </form>
            <el-button size="small" type="primary" v-if="btn.name === '导入'" @click="importFile">导入</el-button>
            <!-- <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="changeFile"
              v-if="btn.name === '导入'"
              :show-file-list="false"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">导入</el-button>
            </el-upload>-->
            <!-- <el-button type="primary" v-if="btn.name === '导入'" @click="Import()">导入</el-button> -->
          </span>
          <el-button type="primary" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
        </div>
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
      <studentForm v-if="addDialog" @hideTotas="hideTotas" :studentData="studentData"></studentForm>
    </el-dialog>
    <el-dialog
      :title="'导入'"
      :visible.sync="addDialog2"
      :close-on-click-modal="false"
      custom-class="dialog-type-column1"
    >
      <upload v-if="addDialog2" @hideTotas="hideTotas" :studentData="studentData"></upload>
    </el-dialog>
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
      uploadUrl: API.ROOT + "downExcel", //下载地址
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
      totasTitle: "新增学生",
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      },
      addDialog: false, //是否显示弹窗
      addDialog2: false, //是否显示上传弹窗
      studentData: {}, //修改学校的参数
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
  // mixins: [getBtns],
  computed: {
    btnList:function(){
      return this.$store.state.ButtonByParent;
    }
  },
  components: {
    paginationCommon,
    studentForm,
    upload
  },
  methods: {
    //文件上传前  校验文件类型
    changeFile(file) {
      let arr = file.name.split(".");
      let type = arr[arr.length - 1];
      if (type == "xlsx" || type == "xls") {
        let fileData = new FormData();
        fileData.append("file", file.raw);
        fileData.append("schoolId", 1);
        fileData.append("gradeId", 2);
        fileData.append("classId", 3);
        this.$axios
          .post("upload", fileData, "multipart/form-data")
          .then(res => {
          });
      } else {
        this.$message({
          type: "warning",
          message: "请上传excel!"
        });
      }
    },
    //点击导入
    importFile() {
      this.addDialog2 = true;
    },
    //点击重置
    resetBtn() {
      this.form = {
        schoolId: "",
        dataSourceCode: "",
        gradeId: "",
        classId: "",
        name: "",
        studentNo: "",
        parentTel: ""
      };
      this.schoolSelect = "";
      this.pagination.pageNo = 1;
      this.getStudent();
    },
    //隐藏弹窗
    hideTotas() {
      this.addDialog = false;
      this.addDialog2 = false;
      this.getStudent();
    },
    //点击删除
    handleDelete(data) {
      var id = data.id;
      var schoolId = data.schoolId;
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("baseStudentManager/deleteBaseStudentManager", {
              id,
              schoolId
            })
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
                this.getStudent();
              }
            });
        })
        .catch(() => {});
    },
    //点击编辑
    editInfo(data) {
      this.totasTitle = "编辑学生";
      this.studentData = data;
      this.studentData = {
        id: data.id,
        schoolId: data.schoolId,
        classId: data.classId,
        gradeId: data.gradeId,
        name: data.name,
        image: data.image,
        sex: data.sex,
        studentNo: data.studentNo,
        parentNameOne: data.parentNameOne,
        parentTelOne: data.parentTelOne,
        parentNameTwo: data.parentNameTwo,
        parentNameThree: data.parentNameThree,
        parentTelThree: data.parentTelThree,
        parentTelTwo: data.parentTelTwo
      };
      this.addDialog = true;
    },
    //点击新增
    addInfo() {
      this.totasTitle = "新增学生";
      this.studentData = {};
      this.addDialog = true;
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
      var data = this.form;
      data.pageNo = this.pagination.pageNo;
      data.pageSize = this.pagination.pageSize;
      this.$axios
        .post("baseStudentManager/findBaseStudentManager", data)
        .then(res => {
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
      this.form.gradeId = "";
      this.form.classId = "";
      var schoolArr = data.split(",");
      this.form.schoolId = schoolArr[0];
      this.form.dataSourceCode = schoolArr[1];
      this.pagination.pageNo = 1;
      this.getGrades(schoolArr[0]);
    },
    //获取年级列表
    getGrades(schoolId) {
      this.$axios
        .post("baseGrade/findBaseGrade", {
          schoolId,
          pageNo: 1,
          pageSize: 1000
        })
        .then(res => {
          this.gradeList = res.data.data.rows;
        });
    },
    //获取班级列表
    getClass(gradeId) {
      this.form.classId = "";
      this.$axios
        .post("baseClass/findBaseClass", { gradeId, pageNo: 1, pageSize: 1000 })
        .then(res => {
          this.classList = res.data.data.rows;
        });
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
    // color: #fff;
  }
}
</style>
