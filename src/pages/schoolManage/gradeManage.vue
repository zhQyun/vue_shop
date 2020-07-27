<template>
  <div class="height-100 schoolList">
    <M-Table-List>
      <div slot="Info">
        <el-form :inline="true" :model="form" size="mini">
          <el-form-item label="学校名称：">
            <el-input
              v-model.trim="form.schoolName"
              :style="{width:formInputWidth}"
              placeholder="学校名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="SearchData()" icon="el-icon-search">查询</el-button>
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
      <div slot="TableDom" v-loading="loading">
        <el-table
          :data="tableData"
          :stripe="true"
          style="width: 100%;"
          border=""
          ref="xzTable"
          :height="sHeight"
        >
          <el-table-column prop="schoolName" label="学校名称" min-width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="年级名称" min-width="120" align="center"></el-table-column>
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
      <addGrade :gradeData="gradeData" v-if="addDialog" @hideTotas="hideTotas"></addGrade>
    </el-dialog>
  </div>
</template>
<script>
import paginationCommon from "~/components/Pagination.vue";
import addGrade from "./components/addGrade.vue";
import getBtns from "~/components/mixin/getBtns";
export default {
  data() {
    return {
      formInputWidth: this.$store.state.fromBox.formInputWidth,
      sHeight: this.$store.state.bodyBox.tableHeight,
      form: {
        schoolName: ""
      },
      tableData: [],
      totasTitle: "新增年级",
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      },
      addDialog: false, //是否显示弹窗,
      gradeData: {}, //传给子组件的参数
      loading:false,
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
    addGrade
  },
  methods: {
    //隐藏弹窗
    hideTotas() {
      this.addDialog = false;
      this.getList();
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
          this.delGrade(id,schoolId);
        })
        .catch(() => {});
    },
    //删除年级接口
    delGrade(id,schoolId) {
      this.$axios.post("baseGrade/deleteBaseGrade", { id,schoolId }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        }
      });
    },
    //点击编辑
    editInfo(grade) {
      this.totasTitle = '编辑年级';
      this.gradeData = {
        schoolId: grade.schoolId,
        id: grade.id, //年级id
        name: grade.name
      };
      this.addDialog = true;
    },
    //点击新增
    addInfo() {
      this.totasTitle = '新增年级';
      this.gradeData = {};
      this.addDialog = true;
    },
    // 更新数据
    onRefresList(msg) {
      this.pagination.pageNo = msg.pageNo;
      this.pagination.pageSize = msg.pageSize;
      this.getList();
    },
    //点击搜索
    SearchData() {
      this.pagination.pageNo = 1;
      this.getList();
    },
    //点击重置
    resetBtn(){
      this.form.schoolName = "";
      this.SearchData();
    },
    //获取年级列表
    getList() {
      var data = {
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        schoolName: this.form.schoolName
      };
      this.loading = true;
      this.$axios.post("baseGrade/findBaseGrade", data).then(res => {
        this.loading = false;
        if (res.data.code == 200) {
          this.pagination.total = res.data.data.total;
          this.tableData = res.data.data.rows;
        }
      });
    },
    stateCode(row) {
      return row.statusCode == "0"
        ? "启用"
        : row.statusCode == "1"
          ? "停用"
          : "";
    }
  },
  created() {
    this.getList();
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
