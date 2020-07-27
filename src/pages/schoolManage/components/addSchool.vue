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
        <el-form-item label="学校名称：" prop="schoolName" :label-width="formLabelWidth">
          <el-input maxlength="32" placeholder="请输入学校名称" v-model.trim="ruleForm.schoolName" style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item
          label="学校logo"
          :label-width="formLabelWidth"
          style="width:100%"
          prop="logoImg"
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
              <img v-if="ruleForm.logoImg" :src="ruleForm.logoImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <div v-else>
              <img :src="has_base.img1?base_url+ruleForm.logoImg:ruleForm.logoImg" class="avatar">
            </div>
            <!-- 用于去掉输入提示  没有input  一旦有提示就会一直存在 -->
            <el-input v-model="ruleForm.logoImg" v-show="false"></el-input>
          </el-upload>
        </el-form-item>
        <el-form-item label="省份：" prop="provinceId" :label-width="formLabelWidth">
          <el-select
            v-model="ruleForm.provinceId"
            placeholder="请选择省份"
            style="width: 100%;"
            @change="changeProvince"
          >
            <el-option
              v-for="(item,index) in ProvinceList"
              :key="'Province'+index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市：" prop="cityId" :label-width="formLabelWidth">
          <el-select
            v-model="ruleForm.cityId"
            placeholder="请选择城市"
            style="width: 100%;"
            @change="changeCity"
          >
            <el-option
              v-for="(item,index) in cityList"
              :key="'city'+index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区：" prop="areaId" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.areaId" placeholder="请选择地区" style="width: 100%;">
            <el-option
              v-for="(item,index) in areaList"
              :key="'area'+index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年制：" prop="schoolYear" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.schoolYear" placeholder="请选择年制" style="width: 100%;">
            <el-option
              v-for="item in YearList"
              :label="item.dictName"
              :value="item.dictValue"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址：" prop="address" :label-width="formLabelWidth">
          <el-input placeholder="请输入地址" v-model.trim="ruleForm.address" style="width: 100%;" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="tel" :label-width="formLabelWidth">
          <el-input placeholder="请输入电话" v-model.trim="ruleForm.tel" style="width: 100%;" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="linkMan" :label-width="formLabelWidth">
          <el-input placeholder="请输入联系人姓名" v-model.trim="ruleForm.linkMan" style="width: 100%;" maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="学校展示图" :label-width="formLabelWidth" style="width:100%" prop="imgurl">
          <el-upload
            class="avatar-uploader"
            action=""
            list-type="picture"
            :show-file-list="false"
            :on-change="getShowImg"
            :auto-upload="false"
            accept="image/jpeg, image/gif, image/png, image/bmp"
          >
            <div v-if="!ruleForm.id">
              <img v-if="ruleForm.imgurl" :src="ruleForm.imgurl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <div v-else>
              <img :src="has_base.img2?base_url+ruleForm.imgurl:ruleForm.imgurl" class="avatar">
            </div>
            <!-- 用于去掉输入提示  没有input  一旦有提示就会一直存在 -->
            <el-input v-model="ruleForm.imgurl" v-show="false"></el-input>
          </el-upload>
        </el-form-item>
        <el-form-item label="学校平面图" :label-width="formLabelWidth" style="width:100%" prop="liveImg">
          <el-upload
            class="avatar-uploader"
            action=""
            list-type="picture"
            :show-file-list="false"
            :on-change="getPlanFigure"
            :auto-upload="false"
            accept="image/jpeg, image/gif, image/png, image/bmp"
          >
            <div v-if="!ruleForm.id">
              <img v-if="ruleForm.liveImg" :src="ruleForm.liveImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <div v-else>
              <img :src="has_base.img3?base_url+ruleForm.liveImg:ruleForm.liveImg" class="avatar">
            </div>
            <!-- 用于去掉输入提示  没有input  一旦有提示就会一直存在 -->
            <el-input v-model="ruleForm.liveImg" v-show="false"></el-input>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态：" prop="statusCode" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.statusCode" placeholder="请选择状态" style="width: 100%;">
            <el-option label="启用" :value="0"></el-option>
            <el-option label="停用" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="go_back()" class="dialog_back_btn" style="margin-right:5px">返回</el-button> -->
      <el-button type="primary" @click="addClick" class="dialog_sure_btn" :loading="btnLoading">保存</el-button>
    </div>
  </div>
</template>
<script>
import API from "../../../api/webpackAPI";
import TYPE from '../../../store/storeType';
export default {
  props: {
    schoolData: {
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
      base_url: API.img_url,
      has_base: {
        //用来判断图片是否需要拼接
        img1: true,
        img2: true,
        img3: true
      },
      btnLoading: false,
      ruleForm: {
        id: "",
        schoolName: "",
        logoImg: "",
        provinceId: "",
        cityId: "",
        areaId: "",
        schoolYear: "",
        address: "",
        tel: "",
        linkMan: "",
        statusCode: "",
        imgurl: "",
        liveImg: "",
      },
      // 表单验证规则
      rules: {
        schoolName: [
          {
            required: true,
            message: "请输入学校名称",
            trigger: ["blur", "change"]
          }
        ],
        logoImg: [{ required: true, message: "请选择图片", trigger: "change" }],
        provinceId: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        cityId: [{ required: true, message: "请选择城市", trigger: "change" }],
        areaId: [{ required: true, message: "请选择地区", trigger: "change" }],
        // address: [
        //   { required: true, message: "请输入地址", trigger: ["blur", "change"] }
        // ],
        schoolYear: [
          { required: true, message: "请选择年制", trigger: "change" }
        ],
        // tel: [
        //   // {
        //   //   required: true,
        //   //   message: "请输入电话",
        //   //   trigger: ["blur", "change"]
        //   // },
        //   // { validator: checkPhone, trigger: "change" }
        // ],
        // linkMan: [
        //   {
        //     required: true,
        //     message: "请输入联系人",
        //     trigger: ["blur", "change"]
        //   }
        // ],
        imgurl: [
          { required: true, message: "请选择学校展示图", trigger: "change" }
        ],
        liveImg: [
          { required: true, message: "请选择学校平面图", trigger: "change" }
        ],
        statusCode: [
          { required: true, message: "请选择状态", trigger: "change" }
        ]
      },
      //省份列表
      ProvinceList: [],
      //城市列表
      cityList: [],
      //地区列表
      areaList: [],
      //年制
      YearList: []
    };
  },
  methods: {
    //选择图片
    getImg(file) {
      if (file.raw.size > 2 * 1024 * 1204) {
        this.$message.error({
          message: "图片不可大于2M"
        });
        return;
      }
      this.getBase64(file.raw).then(res => {
        // this.formInline.logo = res;
        this.has_base.img1 = false;
        this.$set(this.ruleForm, "logoImg", res);
      });
    },
    //选择学校展示图
    getShowImg(file) {
      if (file.raw.size > 2 * 1024 * 1204) {
        this.$message.error({
          message: "图片不可大于2M"
        });
        return;
      }
      this.getBase64(file.raw).then(res => {
        // this.formInline.logo = res;
        this.has_base.img2 = false;
        this.$set(this.ruleForm, "imgurl", res);
      });
    },
    //选择学校平面图
    getPlanFigure(file) {
      if (file.raw.size > 2 * 1024 * 1204) {
        this.$message.error({
          message: "图片不可大于2M"
        });
        return;
      }
      this.getBase64(file.raw).then(res => {
        // this.formInline.logo = res;
        this.has_base.img3 = false;
        this.$set(this.ruleForm, "liveImg", res);
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
    //点击返回
    go_back() {
      this.$emit("hideTotas");
    },
    //点击确认
    addClick() {
      var data = this.ruleForm;
      var urlArr = ["baseSchool/addBaseSchool", "baseSchool/updateBaseSchool"];
      var msg = data.id ? "修改" : "新增";
      var url = "";
      if (!data.id) {
        url = urlArr[0];
        delete data.id;
      } else {
        url = urlArr[1];
      }
      for(var i=0;this.YearList.length;i++){
        if(this.YearList[i].dictValue == data.schoolYear){
          data.schoolYearName = this.YearList[i].dictName;
          break;
        }
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.btnLoading = true;
          this.$axios.post(url, data).then(res => {
            this.btnLoading = false;
            if (res.data.code == 200) {
              this.$message({
                message: msg + "成功",
                type: "success",
                duration: 2000
              });
              this.$store.commit(TYPE.SetSchool,[]);//清空vuex的学校数据
              this.$emit("hideTotas");
            }
          });
        } else {
          this.$message({
            message: "请完善信息",
            duration: 2000,
            type: "warning"
          });
        }
      });
    },
    //获取省份列表
    getProvince() {
      this.$axios.get("sysOrganization/getTree", {}).then(res => {
        if (res.data.code == 200) {
          this.ProvinceList = res.data.data;
        }
        if (this.ruleForm.provinceId) {
          this.getCity(this.schoolData.provinceId);
        }
      });
    },
    //改变省份
    changeProvince(ProvinceId) {
      this.ruleForm.cityId = "";
      this.ruleForm.areaId = "";
      this.getCity(ProvinceId);
    },
    //获取城市列表
    getCity(ProvinceId) {
      var ProvinceList = this.ProvinceList;
      for (var i = 0; i < ProvinceList.length; i++) {
        if (ProvinceList[i].id == ProvinceId) {
          this.cityList = ProvinceList[i].children;
        }
      }
      if (this.ruleForm.cityId) {
        this.getArea(this.ruleForm.cityId);
      }
    },
    //改变城市
    changeCity(cityId) {
      this.ruleForm.areaId = "";
      this.getArea(cityId);
    },
    //获取地区列表
    getArea(cityId) {
      var cityList = this.cityList;
      for (var i = 0; i < cityList.length; i++) {
        if (cityList[i].id == cityId) {
          this.areaList = cityList[i].children;
        }
      }
    },
    //页面初始化
    init() {
      if (this.schoolData.id) {
        this.ruleForm = this.schoolData;

        this.getArea(this.schoolData.cityId);
      }
    },
    //获取年制
    getGradeYear() {
      this.common
        .getDictionary({
          dictGroupCode: "SCHOOL_YEAR"
        })
        .then(res => {
          this.YearList = res.data.data;
        });
    }
  },
  created() {
    this.init();
    this.getProvince();
    this.getGradeYear();
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
