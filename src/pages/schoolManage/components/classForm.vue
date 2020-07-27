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
        <el-form-item label="学校名称:" prop="schoolId" :label-width="formLabelWidth">
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
        <el-form-item label="年级:" prop="gradeId" :label-width="formLabelWidth">
          <el-select
            v-model="ruleForm.gradeId"
            placeholder="请选择年级"
            style="width: 100%;"
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
        <el-form-item label="班级:" prop="className" :label-width="formLabelWidth">
          <el-input placeholder="请输入班级" v-model.trim="ruleForm.className" style="width: 100%;" maxlength="20" :disabled="ruleForm.id?true:false"></el-input>
        </el-form-item>
        <el-form-item label="教师姓名:" prop="teacherName" :label-width="formLabelWidth">
          <el-input placeholder="请输入教师姓名" v-model.trim="ruleForm.teacherName" style="width: 100%;" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="微信手机号:" prop="classPhone" :label-width="formLabelWidth">
          <el-input placeholder="请输入班级微信手机号" v-model.trim="ruleForm.classPhone" style="width: 100%;" maxlength="16"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addClick" class="dialog_sure_btn">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    classData: {
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
    return {
      formLabelWidth: this.$store.state.fromBox.formLabelWidth,
      ruleForm: {
        id: '',
        schoolId: '',
        gradeId: '',
        className: '',
        teacherName: '',
        classPhone: '',
      },
      // 表单验证规则
      rules: {
        schoolId: [
          { required: true, message: "请选择学校", trigger: "change" }
        ],
        gradeId: [{ required: true, message: "请选择年级", trigger: "change" }],
        className: [
          { required: true, message: "请输入班级姓名", trigger: ["blur", "change"] }
        ],
        teacherName: [
          { required: true, message: "请输入班级姓名", trigger: ["blur", "change"] }
        ],
        classPhone:[
          { required: true, message: "请输入班级姓名", trigger: ["blur"] },
          { validator: checkPhone, trigger: "change" },
        ]
      },
      schoolList:[],
      gradeList:[],
    };
  },
  methods: {
    //点击确认
    addClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var arrUrl = ['baseClass/addBaseClass','/baseClass/updateBaseClass'];
          var url = this.ruleForm.id?arrUrl[1]:arrUrl[0];
          this.$axios
            .post(url, this.ruleForm)
            .then(res => {
              var msg = this.ruleForm.id?'修改成功':'添加成功';
              if (res.data.code == 200) {
                this.$message({
                  message: msg,
                  type: "warning",
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
      if (this.classData.id) {
        this.ruleForm = this.classData;
      }
    },
    changeSchool(schoolId){
      this.ruleForm.gradeId = '';
      this.getGrade(schoolId);
    },
    //获取学校列表
    getSchoolList(){
      this.common.getSchoolList().then(res=>{
        this.schoolList = res;
        if(this.ruleForm.schoolId){
          this.getGrade(this.ruleForm.schoolId);
        }
      })
    },
    //获取年级列表
    getGrade(schoolId){
      this.$axios.post('baseGrade/findBaseGrade',{
        pageNo:1,
        pageSize:1000,
        schoolId,
      }).then(res=>{
        this.gradeList = res.data.data.rows;
      })
    }
  },
  created() {
    this.init();
    this.getSchoolList();
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
