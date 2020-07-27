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
                    <el-select
                        v-model="ruleForm.schoolId"
                        placeholder="请选择学校"
                        style="width: 100%;"
                        @change="changeSchool"
                    >
                        <el-option
                            v-for="(item) in schoolList"
                            :key="item.id"
                            :label="item.schoolName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级：" prop="gradeCode" :label-width="formLabelWidth">
                    <el-select
                        v-model="ruleForm.gradeCode"
                        placeholder="请选择年级"
                        style="width: 100%;"
                        @change="changeGrade"
                    >
                        <el-option
                            v-for="(item) in gradeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="上午上学考勤开始时间"
                    prop="morningStartTime"
                    :label-width="formLabelWidth"
                >
                    <el-time-picker
                        v-model="ruleForm.morningStartTime"
                        placeholder="上午上学考勤开始时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item
                    label="上午上学考勤结束时间"
                    prop="morningEndTime"
                    :label-width="formLabelWidth"
                >
                    <el-time-picker
                        v-model="ruleForm.morningEndTime"
                        placeholder="上午上学考勤结束时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item label="中午放学考勤开始时间" prop="noonStartTime" :label-width="formLabelWidth">
                    <el-time-picker
                        v-model="ruleForm.noonStartTime"
                        placeholder="中午放学考勤开始时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item label="中午放学考勤结束时间" prop="noonEndTime" :label-width="formLabelWidth">
                    <el-time-picker
                        v-model="ruleForm.noonEndTime"
                        placeholder="中午放学考勤结束时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item
                    label="下午上学考勤开始时间"
                    prop="afternoonStartTime"
                    :label-width="formLabelWidth"
                >
                    <el-time-picker
                        v-model="ruleForm.afternoonStartTime"
                        placeholder="下午上学考勤开始时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item
                    label="下午上学考勤结束时间"
                    prop="afternoonEndTime"
                    :label-width="formLabelWidth"
                >
                    <el-time-picker
                        v-model="ruleForm.afternoonEndTime"
                        placeholder="下午上学考勤结束时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item
                    label="晚上放学考勤开始时间"
                    prop="nightStartTime"
                    :label-width="formLabelWidth"
                    style="width: 100%;"
                >
                    <el-time-picker
                        v-model="ruleForm.nightStartTime"
                        placeholder="晚上放学考勤开始时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item label="晚上放学考勤结束时间" prop="nightEndTime" :label-width="formLabelWidth">
                    <el-time-picker
                        v-model="ruleForm.nightEndTime"
                        placeholder="晚上放学考勤结束时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item
                    label="中午接送开始时间"
                    prop="noonReceiveStart"
                    :label-width="formLabelWidth"
                >
                    <el-time-picker
                        v-model="ruleForm.noonReceiveStart"
                        placeholder="中午接送考勤开始时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item label="中午接送结束时间" prop="noonReceiveEnd" :label-width="formLabelWidth">
                    <el-time-picker
                        v-model="ruleForm.noonReceiveEnd"
                        placeholder="中午接送结束时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item
                    label="晚上接送开始时间"
                    prop="afternoonReceiveStart"
                    :label-width="formLabelWidth"
                >
                    <el-time-picker
                        v-model="ruleForm.afternoonReceiveStart"
                        placeholder="晚上接送开始时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item
                    label="晚上接送结束时间"
                    prop="afternoonReceiveEnd"
                    :label-width="formLabelWidth"
                >
                    <el-time-picker
                        v-model="ruleForm.afternoonReceiveEnd"
                        placeholder="晚上接送结束时间"
                        style="width: 100%;"
                        value-format="HH:mm:ss"
                    ></el-time-picker>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="go_back()" class="dialog_back_btn" style="margin-right:5px">返回</el-button> -->
            <el-button type="primary" @click="addClick" class="dialog_sure_btn">初始化考勤日</el-button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      //   formLabelWidth: this.$store.state.fromBox.formLabelWidth,
      formLabelWidth: "200px",
      ruleForm: {
        schoolId: "",
        gradeCode: "",
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
      gradeList: [] //年级列表
    };
  },
  methods: {
    //点击确认
    addClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var data = this.ruleForm;
          this.$axios
            .post(
              "baseAttendanceTimeManager/addBaseAttendanceTimeManager",
              data
            )
            .then(res => {
              if (res.data.code == 200 ) {
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
      //   this.$axios
      //     .post("baseAttendanceTimeManager/addBaseAttendanceTimeManager", {
      //       schoolId: this.ruleForm.schoolId,
      //       gradeCode: this.ruleForm.gradeCode
      //     })
      //     .then(res => {
      //       console.log(res);
      //       if (res.data.code == 200) {
      //           if(res.data.data){
      //           }
      //       }
      //     });
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
    this.getSchool();
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
