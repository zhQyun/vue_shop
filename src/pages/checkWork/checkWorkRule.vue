<template>
  <div class="height-100 checkWorkRule">
    <M-Table-List>
      <div slot="Info">
        <el-form :inline="true" :model="form" size="mini">
          <el-form-item label="学校名称:">
            <el-select
              v-model="schoolSelect"
              placeholder="请选择学校"
              style="width: 100%;"
              @change="changeSchool"
            >
              <el-option
                v-for="(item) in schoolList"
                :key="item.id"
                :label="item.schoolName"
                :value="item.id+','+item.dataSourceCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="initPage()" icon="el-icon-search">查询</el-button>
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
                v-if="btn.name === '新增学期'"
              >新增学期</el-button>
              <el-button type="success" @click="initDate" v-if="btn.name === '初始化'">初始化</el-button>
              <!-- <el-button type="success" @click="editmore" v-if="btn.name === '批量操作'">批量操作</el-button> -->
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
          <el-table-column prop="gradeName" label="年级" min-width="150" align="center"></el-table-column>
          <el-table-column
            prop="schoolTermStartDate"
            label="学期开始日"
            min-width="120"
            align="center"
            :formatter="formTime"
          ></el-table-column>
          <el-table-column
            prop="schoolTermEndDate"
            label="学期结束日"
            align="center"
            :formatter="formTime"
          ></el-table-column>
          <el-table-column prop="schoolTermDay" label="天数" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建日期" align="center" :formatter="formTime"></el-table-column>
          <el-table-column prop="updateTime" label="修改日期" align="center" :formatter="formTime"></el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <span class="span-btn" v-for="btn in btnList" :key="btn.id">
                <el-button
                  type="success"
                  style="margin-right:8px"
                  icon="el-icon-edit"
                  @click="editInfo(scope.row)"
                  v-if="btn.name === '编辑'"
                >编辑</el-button>
                <el-button
                  type="success"
                  icon="el-icon-delete"
                  @click="deleteDay(scope.row)"
                  v-if="btn.name === '删除考勤日'"
                >删除考勤日</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="handDel(scope.row)"
                  v-if="btn.name === '删除学期'"
                >删除学期</el-button>
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
      title="新增学期"
      :visible.sync="addDialog"
      :close-on-click-modal="false"
      custom-class="dialog-type-column1"
    >
      <ruleForm v-if="addDialog" @hideTotas="hideTotas"></ruleForm>
    </el-dialog>
    <el-dialog
      title="初始化"
      :visible.sync="addDialog3"
      :close-on-click-modal="false"
      custom-class="dialog-type-column1"
    >
      <initDate v-if="addDialog3" @hideTotas="hideTotas"></initDate>
    </el-dialog>
    <el-dialog
      title="删除考勤日"
      :visible.sync="addDialog2"
      :close-on-click-modal="false"
      custom-class="dialog-type-column1"
    >
      <delDay v-if="addDialog2" @hideTotas="hideTotas" :childData="childData"></delDay>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="addDialog4"
      :close-on-click-modal="false"
      custom-class="dialog-type-column1"
    >
      <editForm v-if="addDialog4" @hideTotas="hideTotas" :childData="childData"></editForm>
    </el-dialog>
    <el-dialog
      title="批量编辑"
      :visible.sync="addDialog5"
      :close-on-click-modal="false"
      custom-class="dialog-type-column1"
    >
      <editMore v-if="addDialog5" @hideTotas="hideTotas"></editMore>
    </el-dialog>
  </div>
</template>
<script>
import paginationCommon from "~/components/Pagination.vue";
import getBtns from "~/components/mixin/getBtns";
import ruleForm from "./components/ruleForm.vue";
import delDay from "./components/delDay.vue";
import initDate from "./components/initDate.vue";
import editForm from "./components/editForm.vue";
import editMore from "./components/editMore.vue";
import moment from "moment";
export default {
  data() {
    return {
      formInputWidth: this.$store.state.fromBox.formInputWidth,
      sHeight: this.$store.state.bodyBox.tableHeight,
      form: {
        schoolId: "",
        dataSourceCode: ""
      },
      schoolSelect: "", //选中的学校
      tableData: [],
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      },
      addDialog: false, //是否显示弹窗 新增学期
      addDialog2: false, //是否显示弹窗 删除考勤日
      addDialog3: false, //初始化
      addDialog4: false, //编辑弹窗
      addDialog5: false, //批量编辑弹窗
      childData: {}, //传给子组件的参数
      schoolList: [] //学校列表
    };
  },
  components: {
    paginationCommon,
    ruleForm,
    delDay,
    initDate,
    editForm,
    editMore
  },
  // mixins: [getBtns],
  computed: {
    btnList:function(){
      return this.$store.state.ButtonByParent;
    }
  },
  methods: {
    //点击重置
    resetBtn() {
      this.form = {
        schoolId: "",
        dataSourceCode: ""
      };
      this.schoolSelect = "";
      this.pagination.pageNo = 1;
      this.getList();
    },
    //隐藏弹窗
    hideTotas() {
      this.addDialog = false;
      this.addDialog2 = false;
      this.addDialog3 = false;
      this.addDialog4 = false;
      this.addDialog5 = false;
      this.getList();
    },
    //点击删除学期
    handDel(data) {
      var obj = {
        schoolId: data.schoolId,
        gradeCode: data.gradeCode
      };
      this.$confirm("确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("baseSchoolTermManager/deleteBaseSchoolTermManagerByid", obj)
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
                this.getList();
              }
            });
        })
        .catch(() => {});
    },
    //点击编辑
    editInfo(data) {
      this.childData = data;
      this.addDialog4 = true;
    },
    //点击初始化
    initDate() {
      this.addDialog3 = true;
    },
    //点击新增
    addInfo() {
      this.childData = {};
      this.addDialog = true;
    },
    //点击批量编辑
    editmore() {
      this.childData = {};
      this.addDialog5 = true;
    },
    // 更新数据
    onRefresList(msg) {
      this.pagination.pageNo = msg.pageNo;
      this.pagination.pageSize = msg.pageSize;
      this.getList();
    },
    //点击删除考勤日
    deleteDay(row) {
      this.childData = row;
      this.addDialog2 = true;
    },
    //学校筛选
    changeSchool(data) {
      // this.pagination.pageNo = 1;
      var schoolArr = data.split(",");
      this.form.schoolId = schoolArr[0];
      this.form.dataSourceCode = schoolArr[1];
      // this.getList();
    },
    //获取考勤规则列表
    getList() {
      var data = {
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        schoolId: this.form.schoolId,
        dataSourceCode: this.form.dataSourceCode
      };
      this.$axios
        .post("baseSchoolTermManager/findBaseSchoolTermManager", data)
        .then(res => {
          if (res.data.code == 200) {
            this.pagination.total = res.data.data.total;
            // this.tableData = res.data.data.rows;
            this.tableData = res.data.data.rows.rows;
          } else {
            this.tableData = [];
          }
        });
    },
    //学校列表
    getSchool() {
      this.common.getSchoolList().then(res => {
        this.schoolList = res;
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
    //点击查询
    initPage(){
      this.pagination.pageNo = 1;
      this.getList();
    }
  },
  created() {
    this.getList();
    this.getSchool();
  }
};
</script>
<style lang="less">
.checkWorkRule {
  .dialog-type-column1 {
    margin: 2vh auto 0 !important;
  }
}
</style>

<style lang="less" scoped>
.checkWorkRule {
  .span-btn {
    button {
      margin: 2px 0;
    }
  }
  .sl-head {
    display: flex;
    justify-content: space-between;
  }
}
</style>
