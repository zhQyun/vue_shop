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
        <el-form-item label="学生姓名：" prop="name" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.name" placeholder="请输入学生姓名" maxlength="5"></el-input>
        </el-form-item>
        <el-form-item
          label="学生头像"
          :label-width="formLabelWidth"
          style="width:100%"
          prop="img"
        >
          <el-upload
            class="avatar-uploader"
            action=""
            list-type="picture"
            :show-file-list="false"
            :on-change="getImg"
            :auto-upload="false"
            accept="image/jpeg, image/gif, image/png, image/bmp"
          >
            <div v-if="!ruleForm.id">
              <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <div v-else>
              <img v-if="ruleForm.image" :src="has_base?base_url+ruleForm.image:ruleForm.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="学号：" prop="studentNo" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.studentNo" placeholder="请输入学生学号" maxlength="32" :disabled="ruleForm.id?true:false"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex" :label-width="formLabelWidth">
          <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="家长1姓名：" prop="parentNameOne" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.parentNameOne" placeholder="请输入家长1姓名" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="家长1电话：" prop="parentTelOne" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.parentTelOne" placeholder="请输入家长1电话" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="家长2姓名：" prop="parentNameTwo" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.parentNameTwo" placeholder="请输入家长2姓名" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="家长2电话：" prop="parentTelTwo" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.parentTelTwo" placeholder="请输入家长2电话" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="家长3姓名：" prop="parentNameThree" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.parentNameThree" placeholder="请输入家长3姓名" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="家长3电话：" prop="parentTelThree" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.parentTelThree" placeholder="请输入家长3电话" maxlength="11"></el-input>
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
import API from '~/api/webpackAPI';
export default {
  props: {
    studentData: {
      type: Object,
      default: {}
    }
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      var state = this.common.checkStr(value, "phone");
      if (state) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    var checkStudentNo = (rule, value, callback)=>{
      var state = value.match(/[\u4e00-\u9fa5]/);
      if(!state){
        callback();
      }else{
        callback(new Error("请输入正确的学号"));
      }
    }
    return {
      formLabelWidth: this.$store.state.fromBox.formLabelWidth,
      ruleForm: {
        id: "",
        schoolId: "",
        gradeId: "",
        classId: "",
        name: "",
        image:'',
        studentNo: "",
        sex: "",
        parentNameOne: "",
        parentTelOne: "",
        parentNameTwo: "",
        parentTelTwo: "",
        parentNameThree: "",
        parentTelThree: ""
      },
      base_url:API.img_url,//拼接图片地址
      has_base:true,//是否需要拼接图片地址
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
        name: [{ required: true, message: "请输入姓名", trigger: ["blur"] }],
        studentNo: [
          { required: true, message: "请输入学号", trigger: ["blur"] },
          { validator: checkStudentNo, trigger: "change" }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: ["change"]
          }
        ],
        parentNameOne: [
          { required: true, message: "请输入家长名", trigger: ["blur"] }
        ],
        parentTelOne: [
          { required: true, message: "请输入家长电话", trigger: ["blur"] },
          { validator: checkPhone, trigger: "change" }
        ]
      },
      schoolList: [], //学校列表
      gradeList: [], //年级列表
      classList: [] //班级列表
    };
  },
  methods: {
    //选择图片
    getImg(file){
      if (file.raw.size > 2 * 1024 * 1204) {
        this.$message.error({
          message: "图片不可大于2M"
        });
        return;
      }
      this.getBase64(file.raw).then(res => {
        this.has_base = false;
        this.$set(this.ruleForm, "image", res);
      });
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    //点击确认
    addClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var arrUrl = ['baseStudentManager/addBaseStudentManager','baseStudentManager/updateBaseStudentManager'];
          var url = this.ruleForm.id?arrUrl[1]:arrUrl[0];
          this.$axios
            .post(url, this.ruleForm)
            .then(res => {
              var msg = this.ruleForm.id?'修改成功':'添加成功';
              if (res.data.code == 200) {
                this.$message({
                  message: msg,
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
      if (this.studentData && this.studentData.id) {
        this.ruleForm = this.studentData;
        if(this.studentData.schoolId){
          this.getGrade(this.studentData.schoolId);
        }
        if(this.studentData.gradeId){
          this.getClass(this.studentData.gradeId);
        }
      }
    },
    //获取学校列表
    getSchool() {
      this.common.getSchoolList().then(res => {
        this.schoolList = res;
      });
    },
    changeSchool(schoolId){
      this.ruleForm.gradeId = "";
      this.ruleForm.classId = "";
      this.getGrade(schoolId);
    },
    changeGrade(gradeId){
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
          if (res.data.code == 200) {
            this.gradeList = res.data.data.rows;
          }
        });
    },
    //获取班级列表
    getClass(gradeId) {
      this.$axios
        .post("baseClass/findBaseClass", { gradeId, pageNo: 1, pageSize: 1000 })
        .then(res => {
          if (res.data.code == 200) {
            this.classList = res.data.data.rows;
          }
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
