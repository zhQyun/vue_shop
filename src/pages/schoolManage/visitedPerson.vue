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
              v-model.trim="form.userName"
              :style="{width:formInputWidth}"
              placeholder="姓名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="initSearch" icon="el-icon-search">查询</el-button>
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
          :data="tableData"
          :stripe="true"
          style="width: 100%;"
          border=""
          ref="xzTable"
          :height="sHeight"
        >
          <el-table-column prop="schoolName" label="学校名称" min-width="150" align="center"></el-table-column>
          <el-table-column prop="userName" label="姓名" min-width="150" align="center"></el-table-column>
          <el-table-column prop="tel" label="电话" min-width="120" align="center"></el-table-column>
          <el-table-column
            prop="isActive"
            label="状态"
            min-width="150"
            align="center"
            :formatter="stateCode"
          ></el-table-column>
          <el-table-column prop="photo" label="受访人照片" min-width="200" align="center">
            <template slot-scope="scope">
              <img v-if="!scope.row.photo" :src="base_url+scope.row.photo" width="0" height="0">
              <img v-else :src="base_url+scope.row.photo" width="80" height="80">
            </template>
          </el-table-column>
          <el-table-column
            prop="activeTime"
            label="激活时间"
            min-width="120"
            align="center"
            :formatter="activationTime"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            min-width="120"
            align="center"
            :formatter="createdTime"
          ></el-table-column>
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
      <visitedForm v-if="addDialog" @hideTotas="hideTotas" :visitData="visitData"></visitedForm>
    </el-dialog>
  </div>
</template>
<script>
import paginationCommon from "~/components/Pagination.vue";
import visitedForm from "./components/visitedForm.vue";
import getBtns from "~/components/mixin/getBtns";
import API from "../../api/webpackAPI";
import moment from "moment";
export default {
  data() {
    return {
      formInputWidth: this.$store.state.fromBox.formInputWidth,
      sHeight: this.$store.state.bodyBox.tableHeight,
      form: {
        schoolId: "",
        userName: "",
        dataSourceCode: ""
      },
      schoolSelect: "",
      tableData: [],
      totasTitle: "新增受访人员",
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      },
      addDialog: false, //是否显示弹窗
      visitData: {}, //修改学校的参数
      schoolList: [], //学校列表

      base_url: API.img_url,

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
    visitedForm
  },
  methods: {
    //点击重置
    resetBtn(){
      this.form={
        schoolId: "",
        userName: "",
        dataSourceCode: ""
      };
      this.schoolSelect="";
      this.pagination.pageNo = 1;
      this.visitList();
    },
    //隐藏弹窗
    hideTotas() {
      this.addDialog = false;
      this.visitList();
    },
    //点击删除
    handleDelete(data) {
      var id = data.id;
      var schoolId = data.schoolId;
      this.$confirm("确认是否删除！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("baseSchoolVisitedStaff/deleteBaseSchoolVisitedStaff", { id,schoolId })
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
                this.visitList();
              }
            });
        })
        .catch(() => {});
    },
    //点击编辑
    editInfo(data) {
      this.totasTitle = '编辑受访人员'
      this.visitData = {
        id: data.id,
        schoolId: data.schoolId,
        userName: data.userName,
        tel: data.tel
      };
      this.addDialog = true;
    },
    //点击搜索
    initSearch() {
      this.pagination.pageNo = 1;
      this.visitList();
    },
    //点击新增
    addInfo() {
      this.totasTitle = '新增受访人员'
      this.visitData = {};
      this.addDialog = true;
    },
    // 更新数据
    onRefresList(msg) {
      this.pagination.pageNo = msg.pageNo;
      this.pagination.pageSize = msg.pageSize;
      this.visitList();
    },
    //获取受访人员列表
    visitList() {
      var data = this.form;
      data.pageNo = this.pagination.pageNo;
      data.pageSize = this.pagination.pageSize;
      this.$axios
        .post("baseSchoolVisitedStaff/findBaseSchoolVisitedStaff", data)
        .then(res => {
          if (res.data.code == 200) {
            this.pagination.total = res.data.data.total * 1;
            this.tableData = res.data.data.rows;
          }else{
            this.tableData = [];
          }
        });
    },
    //创建时间
    createdTime(row) {
      if (row.createTime) {
        return this.formTime(row.createTime);
      }
    },
    //激活时间
    activationTime(row) {
      if (row.activeTime) {
        return this.formTime(row.activeTime);
      }
    },
    //格式化时间
    formTime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm");
    },
    //学校列表
    getSchool() {
      this.common.getSchoolList().then(res => {
        this.schoolList = res;
      });
    },
    //选择学校
    changeSchool(data) {
      var schoolArr = data.split(",");
      this.form.schoolId = schoolArr[0];
      this.form.dataSourceCode = schoolArr[1];
    },
    //受访人状态
    stateCode(row) {
      return row.isActive == "1" ? "已激活" : "未激活";
    }
  },
  created() {
    this.visitList();
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
