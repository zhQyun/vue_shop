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
          >
            <el-option
              v-for="(item) in gradeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="schoolTermStartDate" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.schoolTermStartDate"
            style="width: 100%;"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="schoolTermEndDate" :label-width="formLabelWidth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.schoolTermEndDate"
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
  data() {
    return {
      formLabelWidth: this.$store.state.fromBox.formLabelWidth,
      ruleForm: {
        // id: "",
        schoolId: "",
        gradeCode: "",
        schoolTermEndDate: "",
        schoolTermStartDate: ""
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
        schoolTermEndDate: [
          { required: true, message: "请选择结束时间", trigger: "change" }
        ],
        schoolTermStartDate: [
          { required: true, message: "请选择开始时间", trigger: "change" }
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
          var start = new Date(data.schoolTermStartDate) ;
          var end = new Date(data.schoolTermEndDate);
          if(start >= end){
            this.$message({
              message: "结束时间要大于开始时间",
              type: "warning"
            });
            return;
          }
          //用于计算开始时间和结束时间的  天数差去掉周末
          var i = 0
          for (;start<=end;start.setDate(start.getDate() + 1)) {
            // if (start.getDay() == 6 || start.getDay() == 0) {
            //   continue;
            // }
            i++
          }
          data.schoolTermDay = i;
          this.$axios
            .post("baseSchoolTermManager/addBaseSchoolTermManager", data)
            .then(res => {
              if (res.data.code == 200 || res.data.data.code == 200) {
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
    },
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
