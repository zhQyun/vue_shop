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
        <el-form-item label="姓名:" prop="staffName" :label-width="formLabelWidth">
          <el-input maxlength="5" placeholder="请输入姓名" v-model.trim="ruleForm.staffName" style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="staffTel" :label-width="formLabelWidth">
          <el-input maxlength="16" placeholder="请输入电话" v-model.trim="ruleForm.staffTel" style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="车牌号:" prop="vehicleNo" :label-width="formLabelWidth">
          <el-input maxlength="10" placeholder="请输入车牌号" v-model.trim="ruleForm.vehicleNo" style="width: 100%;"></el-input>
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
    carData: {
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
    //验证车牌号
    var checkCar = (rule, value, callback) => {
      let test = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
      let test1 = /^[\u4e00-\u9fa5][a-zA-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))$/;
      if (test1.test(value) || test.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的车牌号"));
      }
    };
    return {
      formLabelWidth: this.$store.state.fromBox.formLabelWidth,
      ruleForm: {
        id: "",
        schoolId: "",
        schoolName: "",
        staffName: "",
        staffTel: "",
        vehicleNo: ""
      },
      // 表单验证规则
      rules: {
        schoolId: [
          { required: true, message: "请选择学校", trigger: "change" }
        ],
        staffName: [
          { required: true, message: "请输入姓名", trigger: ["blur", "change"] }
        ],
        staffTel: [
          {
            required: true,
            message: "请输入电话",
            trigger: ["blur", "change"]
          },
          { validator: checkPhone, trigger: "change" }
        ],
        vehicleNo: [
          {
            required: true,
            message: "请输入车牌号",
            trigger: ["blur", "change"]
          },
          { validator: checkCar, trigger: "change" }
        ],
        statusCode: [
          { required: true, message: "请选择状态", trigger: "change" }
        ]
      },
      //学校列表
      schoolList: []
    };
  },
  methods: {
    //选择学校
    changeSchool(schoolId) {
      var list = this.schoolList;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id == schoolId) {
          this.ruleForm.schoolName = list[i].schoolName;
        }
      }
    },
    //点击确认
    addClick() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var urlArr = [
            "baseVehicleNumberInfo/addBaseVehicleNumberInfo",
            "baseVehicleNumberInfo/updateBaseVehicleNumberInfo"
          ];
          var url = this.ruleForm.id ? urlArr[1] : urlArr[0];
          this.$axios.post(url, this.ruleForm).then(res => {
            var msg = this.ruleForm.id ? "修改成功" : "添加成功";
            if (res.data.code == 200) {
              this.$message({
                message: msg,
                type: "warning"
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
      if (this.carData.id) {
        this.ruleForm = this.carData;
      }
    },
    //获取学校列表
    getSchool() {
      this.common.getSchoolList().then(res => {
        this.schoolList = res;
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
