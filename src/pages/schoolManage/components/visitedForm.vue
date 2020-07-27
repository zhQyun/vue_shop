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
        <el-form-item label="姓名:" prop="userName" :label-width="formLabelWidth">
          <el-input maxlength="5" placeholder="请输入姓名" v-model.trim="ruleForm.userName" style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="tel" :label-width="formLabelWidth">
          <el-input maxlength="16" placeholder="请输入电话" v-model.trim="ruleForm.tel" style="width: 100%;"></el-input>
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
    visitData: {
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
      schoolIndex:'',//选中第几个学校
      ruleForm: {
        id: "",
        schoolId: "",
        schoolName:'',
        userName: "",
        tel: ""
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
        userName: [
          { required: true, message: "姓名", trigger: ["blur", "change"] }
        ],
        tel: [
          {
            required: true,
            message: "请输入电话",
            trigger: ["blur", "change"]
          },
          { validator: checkPhone, trigger: "change" }
        ]
      },
      //学校列表
      schoolList:[],
    };
  },
  methods: {
    //点击确认
    addClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var urlArr = ['baseSchoolVisitedStaff/addBaseSchoolVisitedStaff','baseSchoolVisitedStaff/updateBaseSchoolVisitedStaff'];
          var url = this.ruleForm.id?urlArr[1]:urlArr[0];
          this.$axios
            .post(url, this.ruleForm)
            .then(res => {
              if (res.data.code == 200) {
                var msg = this.ruleForm.id?'修改成功':'添加成功';
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
      if (this.visitData.id) {
        this.ruleForm = this.visitData;
      }
    },
    changeSchool(schoolId){
      var list = this.schoolList
      for(var i=0;i<list.length;i++){
        if(list[i].id == schoolId){
          this.ruleForm.schoolName = list[i].schoolName;
        }
      }
    },
    //获得学校列表
    getSchool(){
      this.common.getSchoolList().then(res=>{
        this.schoolList = res;
      })
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
