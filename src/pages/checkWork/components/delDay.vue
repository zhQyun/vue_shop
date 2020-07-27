<template>
  <div class="addSchool">
    <div class="dialog-form">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="选择年级：" prop="schoolId" :label-width="formLabelWidth">
          <el-input disabled v-model="childData.schoolName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="选择年级：" prop="gradeCode" :label-width="formLabelWidth">
          <el-input disabled v-model="childData.gradeName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="选择考勤日" prop="attendanceDate" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.attendanceDate"
            style="width: 100%;"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="go_back()" class="dialog_back_btn" style="margin-right:5px">返回</el-button> -->
      <el-button type="primary" @click="addClick" class="dialog_sure_btn">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    childData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      formLabelWidth: this.$store.state.fromBox.formLabelWidth,
      ruleForm: {
        schoolId: "",
        gradeCode: "",
        attendanceDate: ""
      },
      // 表单验证规则
      rules: {
        gradeCode: [
          {
            required: true,
            message: "请输入学校名称",
            trigger: ["blur", "change"]
          }
        ],
        schoolId:[
          {
            required: true,
            message: "请输入学校名称",
            trigger: ["blur", "change"]
          }
        ],
        attendanceDate: [
          { required: true, message: "请选择考勤日", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //点击确认
    addClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$axios
            .post("baseAttendanceTimeManager/deleteBygradeId", this.ruleForm)
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "成功",
                  type: "success",
                });
                this.$emit("hideTotas");
              }
            });
        } else {
          this.$message({
            message: "请完善信息",
            type: "warning"
          });
        }
      });
    },
    //页面初始化
    init() {
      this.ruleForm.schoolId = this.childData.schoolId;
      this.ruleForm.gradeCode = this.childData.gradeCode;
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.addSchool {
  .dialog-form {
    text-align: left;
    .avatar {
      max-width: 65px;
      max-height: 65px;
    }
  }
}
</style>
