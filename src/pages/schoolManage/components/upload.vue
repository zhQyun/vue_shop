<template>
    <div class="studentForm">
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
                            v-for="(item) in schoolList"
                            :key="item.id"
                            :label="item.schoolName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择年级：" prop="gradeId" :label-width="formLabelWidth">
                    <el-select
                        v-model="ruleForm.gradeId"
                        placeholder="请选择年级"
                        style="width: 100%;"
                        @change="changeGrade"
                        :disabled="ruleForm.id?true:false"
                    >
                        <el-option
                            v-for="(item) in gradeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择班级：" prop="classId" :label-width="formLabelWidth">
                    <el-select v-model="ruleForm.classId" placeholder="请选择年级" style="width: 100%;">
                        <el-option
                            v-for="(item) in classList"
                            :key="item.id"
                            :label="item.className"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传文件：" prop="file" :label-width="formLabelWidth">
                    <el-upload
                        class="upload-demo"
                        action
                        :auto-upload="false"
                        :show-file-list="true"
                        :file-list="fileList"
                        :on-change="uploadFile"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
                    </el-upload>
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
import API from "~/api/webpackAPI";
export default {
  data() {
    return {
      formLabelWidth: this.$store.state.fromBox.formLabelWidth,
      ruleForm: {
        schoolId: "",
        gradeId: "",
        classId: "",
        file: ""
      },
      fileList:[],
      base_url: API.img_url, //拼接图片地址
      has_base: true, //是否需要拼接图片地址
      // 表单验证规则
      rules: {
        schoolId: [
          {
            required: true,
            message: "请选择学校",
            trigger: ["change"]
          }
        ],
        gradeId: [
          {
            required: true,
            message: "请选择年级",
            trigger: ["change"]
          }
        ],
        classId: [
          {
            required: true,
            message: "请选择年级",
            trigger: ["change"]
          }
        ],
        file: [
          {
            required: true,
            message: "请选择文件",
            trigger: ["change"]
          }
        ]
      },
      schoolList: [], //学校列表
      gradeList: [], //年级列表
      classList: [] //班级列表
    };
  },
  methods: {
    //选择图片
    uploadFile(file,fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的文件
      }
      let arr = file.name.split(".");
      let type = arr[arr.length - 1];
      if (type == "xlsx" || type == "xls") {
        this.ruleForm.file = file.raw;
      } else {
        this.$message({
          type: "warning",
          message: "请上传excel!"
        });
      }
    },
    //点击确认
    addClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let fileData = new FormData();
          fileData.append("file", this.ruleForm.file);
          fileData.append("schoolId", this.ruleForm.schoolId);
          fileData.append("gradeId", this.ruleForm.gradeId);
          fileData.append("classId", this.ruleForm.classId);
          this.$axios.post("upload", fileData,"multipart/form-data").then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: '导入成功',
                type: "success"
              });
              this.$emit("hideTotas");
              this.fileList=[]
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
    //获取学校列表
    getSchool() {
      this.common.getSchoolList().then(res => {
        this.schoolList = res;
      });
    },
    changeSchool(schoolId) {
      this.ruleForm.gradeId = "";
      this.ruleForm.classId = "";
      this.getGrade(schoolId);
    },
    changeGrade(gradeId) {
      this.ruleForm.classId = "";
      this.getClass(gradeId);
    },
    //获取年级列表
    getGrade(schoolId) {
      this.$axios
        .post("baseGrade/findBaseGrade", {
          schoolId,
          pageNo: 1,
          pageSize: 1000
        })
        .then(res => {
          if (res.data.code == 200 && res.data.data) {
            this.gradeList = res.data.data.rows;
          }
        });
    },
    //获取班级列表
    getClass(gradeId) {
      this.$axios
        .post("baseClass/findBaseClass", { gradeId, pageNo: 1, pageSize: 1000 })
        .then(res => {
          if (res.data.code == 200 && res.data.data) {
            this.classList = res.data.data.rows;
          }
        });
    }
  },
  created() {
    this.getSchool();
  }
};
</script>
<style lang="less" scoped>
.studentForm {
  .dialog-form {
    text-align: left;
    .avatar {
      max-width: 65px;
      max-height: 65px;
    }
  }
}
</style>
