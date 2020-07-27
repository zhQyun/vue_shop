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
        <el-form-item label="学校：" prop="schoolId" :label-width="formLabelWidth">
          <el-input v-model="childData.schoolName" disabled></el-input>
        </el-form-item>
        <el-form-item label="年级：" prop="gradeCode" :label-width="formLabelWidth">
          <el-input v-model="childData.gradeName" disabled></el-input>
        </el-form-item>
        <el-form-item label="选择考勤日" prop="attendanceDate" :label-width="formLabelWidth">
          <el-date-picker
            v-model="ruleForm.attendanceDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
            value-format="timestamp"
            @change="changeDay"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="上午上学考勤开始时间" prop="morningStartTime" :label-width="formLabelWidth">
          <el-time-picker
            v-model="ruleForm.morningStartTime"
            placeholder="上午上学考勤开始时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="上午上学考勤结束时间" prop="morningEndTime" :label-width="formLabelWidth">
          <el-time-picker
            v-model="ruleForm.morningEndTime"
            placeholder="上午上学考勤结束时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="中午放学考勤开始时间" prop="noonStartTime" :label-width="formLabelWidth">
          <el-time-picker
            v-model="ruleForm.noonStartTime"
            placeholder="中午放学考勤开始时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="中午放学考勤结束时间" prop="noonEndTime" :label-width="formLabelWidth">
          <el-time-picker
            v-model="ruleForm.noonEndTime"
            placeholder="中午放学考勤结束时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="下午上学考勤开始时间" prop="afternoonStartTime" :label-width="formLabelWidth">
          <el-time-picker
            v-model="ruleForm.afternoonStartTime"
            placeholder="下午上学考勤开始时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="下午上学考勤结束时间" prop="afternoonEndTime" :label-width="formLabelWidth">
          <el-time-picker
            v-model="ruleForm.afternoonEndTime"
            placeholder="下午上学考勤结束时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
        </el-form-item>
        <el-form-item
          label="晚上放学考勤开始时间"
          prop="nightStartTime"
          :label-width="formLabelWidth"
          style="width: 100%;"
          value-format="HH:mm:ss"
          :readonly="formRead"
        >
          <el-time-picker
            v-model="ruleForm.nightStartTime"
            placeholder="晚上放学考勤开始时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="晚上放学考勤结束时间" prop="nightEndTime" :label-width="formLabelWidth">
          <el-time-picker
            v-model="ruleForm.nightEndTime"
            placeholder="晚上放学考勤结束时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="中午接送开始时间" prop="noonReceiveStart" :label-width="formLabelWidth">
          <el-time-picker
            v-model="ruleForm.noonReceiveStart"
            placeholder="中午接送考勤开始时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="中午接送结束时间" prop="noonReceiveEnd" :label-width="formLabelWidth">
          <el-time-picker
            v-model="ruleForm.noonReceiveEnd"
            placeholder="中午接送结束时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="晚上接送开始时间" prop="afternoonReceiveStart" :label-width="formLabelWidth">
          <el-time-picker
            v-model="ruleForm.afternoonReceiveStart"
            placeholder="晚上接送开始时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="晚上接送结束时间" prop="afternoonReceiveEnd" :label-width="formLabelWidth">
          <el-time-picker
            v-model="ruleForm.afternoonReceiveEnd"
            placeholder="晚上接送结束时间"
            style="width: 100%;"
            value-format="HH:mm:ss"
            :readonly="formRead"
          ></el-time-picker>
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
import moment from "moment";
export default {
  data() {
    return {
      //   formLabelWidth: this.$store.state.fromBox.formLabelWidth,
      formLabelWidth: "200px",
      formRead:true,
      ruleForm: {
        schoolId: "",
        gradeCode: "",
        attendanceDate: "",
        afternoonEndTime: "",
        afternoonReceiveEnd: "",
        afternoonReceiveStart: "",
        afternoonStartTime: "",
        morningEndTime: "",
        morningStartTime: "",
        nightEndTime: "",
        nightStartTime: "",
        noonEndTime: "",
        noonReceiveEnd: "",
        noonReceiveStart: "",
        noonStartTime: ""
      },
      // 表单验证规则
      rules: {
        schoolId: [
          {
            required: true,
            message: "请输入选择学校",
            trigger: ["blur", "change"]
          }
        ],
        gradeCode: [
          { required: true, message: "请选择年级", trigger: "change" }
        ],
        attendanceDate: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        afternoonEndTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        afternoonReceiveEnd: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        afternoonReceiveStart: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        afternoonStartTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        morningEndTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        morningStartTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        nightEndTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        nightStartTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        noonEndTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        noonReceiveEnd: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        noonReceiveStart: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        noonStartTime: [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      },
      schoolList: [], //学校列表
      gradeList: [], //年级列表
      startData: "",
      endData: ""
    };
  },
  props: {
    childData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    //选择考勤日
    changeDay(day) {
      var data = {
        schoolId: this.ruleForm.schoolId,
        gradeCode: this.ruleForm.gradeCode,
        attendanceDate: this.ruleForm.attendanceDate
      };
      this.$axios
        .post("baseAttendanceTimeManager/selectBygradeId", data)
        .then(res => {
          this.formRead = false;
          if (res.data.code == 200 && res.data.data) {
            var data= res.data.data
            this.ruleForm.afternoonEndTime = data.afternoonEndTime;
            this.ruleForm.afternoonReceiveEnd = data.afternoonReceiveEnd;
            this.ruleForm.afternoonReceiveStart = data.afternoonReceiveStart;
            this.ruleForm.afternoonStartTime = data.afternoonStartTime;
            this.ruleForm.morningEndTime = data.morningEndTime;
            this.ruleForm.morningStartTime = data.morningStartTime;
            this.ruleForm.nightEndTime = data.nightEndTime;
            this.ruleForm.nightStartTime = data.nightStartTime;
            this.ruleForm.noonEndTime = data.noonEndTime;
            this.ruleForm.noonReceiveEnd = data.noonReceiveEnd;
            this.ruleForm.noonReceiveStart = data.noonReceiveStart;
            this.ruleForm.noonStartTime = data.noonStartTime;
          }else{
            this.ruleForm.afternoonEndTime = '';
            this.ruleForm.afternoonReceiveEnd = '';
            this.ruleForm.afternoonReceiveStart = '';
            this.ruleForm.afternoonStartTime = '';
            this.ruleForm.morningEndTime = '';
            this.ruleForm.morningStartTime = '';
            this.ruleForm.nightEndTime = '';
            this.ruleForm.nightStartTime = '';
            this.ruleForm.noonEndTime = '';
            this.ruleForm.noonReceiveEnd = '';
            this.ruleForm.noonReceiveStart = '';
            this.ruleForm.noonStartTime = '';
          }
        });
    },
    //点击确认
    addClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var data = this.ruleForm;
          this.$axios
            .post("baseAttendanceTimeManager/updateByGradeCode", data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "成功",
                  type: "success"
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
    //选择学校
    changeSchool(schoolId) {
      this.ruleForm.gradeCode = "";
      this.getGrade(schoolId);
    },
    //选择年级
    changeGrade() {
      this.$axios
        .post("baseAttendanceTimeManager/updateOrInsert", {
          schoolId: this.ruleForm.schoolId * 1,
          gradeCode: this.ruleForm.gradeCode * 1
        })
        .then(res => {
          if (res.data.code == 200) {
          }
        });
    },
    //学校列表
    getSchool() {
      this.common.getSchoolList().then(res => {
        this.schoolList = res;
      });
    },
    //获取年级列表
    getGrade(schoolId) {
      this.$axios
        .post("baseGrade/findBaseGrade", {
          pageNo: 1,
          pageSize: 1000,
          schoolId
        })
        .then(res => {
          this.gradeList = res.data.data.rows;
        });
    }
  },
  created() {
    this.ruleForm.schoolId = this.childData.schoolId;
    this.ruleForm.gradeCode = this.childData.gradeCode;
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
