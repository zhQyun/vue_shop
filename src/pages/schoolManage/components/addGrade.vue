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
        <el-form-item label="选择学校：" prop="schoolId" :label-width="formLabelWidth">
          <el-select
            v-model="ruleForm.schoolId"
            placeholder="请选择学校"
            style="width: 100%;"
            @change="changeSchool"
            :disabled="ruleForm.id?true:false"
          >
            <el-option
              v-for="(item,index) in schoolList"
              :key="'school'+index"
              :label="item.schoolName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择年级：" prop="name" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.name" placeholder="请选择年级" style="width: 100%;">
            <el-option
              v-for="(item,index) in gradeList"
              :key="'grade'+index"
              :label="item.dictName"
              :value="item.dictName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="go_back()" class="dialog_back_btn" style="margin-right:5px">返回</el-button> -->
      <el-button type="primary" @click="addClick" class="dialog_sure_btn" :loading="btn_loading">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    gradeData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      formLabelWidth: this.$store.state.fromBox.formLabelWidth,
      ruleForm: {
        schoolId: "",
        id: "",
        name: "" //年级名称
      },
      // 表单验证规则
      rules: {
        schoolId: [
          {
            required: true,
            message: "请选择学校",
            trigger: ["change"]
          }
        ],
        name: [
          {
            required: true,
            message: "请选择年级",
            trigger: ["change"]
          }
        ]
      },
      schoolList: [], //学校列表
      gradeList: [], //年级列表
      btn_loading: false
    };
  },
  methods: {
    //点击确认
    addClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.btn_loading = true;
          var urlArr = ["baseGrade/addBaseGrade", "baseGrade/updateBaseGrade"];
          var url = this.ruleForm.id ? urlArr[1] : urlArr[0];
          this.$axios.post(url, this.ruleForm).then(res => {
            var msg = this.ruleForm.id ? "修改" : "添加";
            this.btn_loading = false;
            if (res.data.code == 200) {
              this.$message({
                message: msg + "成功",
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
    //页面初始化
    init() {
      if (this.gradeData && this.gradeData.id) {
        this.ruleForm = this.gradeData;
      }
    },
    changeSchool(schoolId) {
      this.ruleForm.name = "";
      this.getGrade(schoolId);
    },
    //获取学校列表
    getSchool() {
      this.common.getSchoolList().then(res => {
        this.schoolList = res;
        if (this.gradeData.id) {
          this.getGrade(this.gradeData.schoolId);
        }
      });
    },
    //获取年级列表
    getGrade(schoolId) {
      var schoolYear;
      for (var i = 0; i < this.schoolList.length; i++) {
        if (this.schoolList[i].id == schoolId) {
          schoolYear = this.schoolList[i].schoolYear;
          break;
        }
      }
      this.common.getDictionary({ dictGroupCode: schoolYear }).then(res => {
        this.gradeList = res.data.data;
      });
    }
  },
  created() {
    this.init();
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
