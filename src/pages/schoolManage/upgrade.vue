<template>
  <div class="height-100 upgrade">
    <M-Table-List>
      <div slot="Info">
        <el-form :inline="true" size="mini">
          <el-form-item label="学校名称：">
            <el-select v-model="schoolId" placeholder="请选择学校" @change="changeSchool" clearable>
              <el-option
                v-for="item in schoolList"
                :key="item.id"
                :label="item.schoolName"
                :value="item.id+','+item.schoolYear"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span v-for="btn in btnList" :key="btn.id">
              <el-button
                type="primary"
                icon="el-icon-top"
                v-if="btn.name === '升学'"
                @click="litre"
              >升学</el-button>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom" class="allSchoolUpdata">
        <span v-for="btn in btnList" :key="btn.id">
          <el-button
            type="primary"
            icon="el-icon-top"
            v-if="btn.name === '所有学校一键升学'"
            @click="oneKeyLitre"
          >所有学校一键升学</el-button>
        </span>
      </div>
    </M-Table-List>
  </div>
</template>
<script>
import getBtns from "~/components/mixin/getBtns";
export default {
  data() {
    return {
      schoolList:[],
      schoolId:'',
      objNew:[]
    };
  },
  components: {},
  // mixins: [getBtns],
  computed: {
    btnList:function(){
      return this.$store.state.ButtonByParent;
    }
  },
  methods: {
    changeSchool(data){
      var datas=data.split(',')
      this.objNew=[]
      var obj={}
      obj.id=datas[0]
      obj.schoolYear=datas[1]
      this.objNew.push(obj)
    },
    //获取学校列表
    getSchool() {
      this.common.getSchoolList().then(res=>{
        this.schoolList = res;
      })
    },
    litre(){
      this.$confirm("是否确定升学？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$axios.post("/oneKey",this.objNew).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "升学成功!"
            });
            this.schoolId=''
          }
        });
      }).catch(() => {
        this.$message({
          showClose: true,
          type: "info",
          message: "已取消"
        });
      });
    },
    oneKeyLitre(){
      this.$confirm("是否将所有学校一键升学？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
         this.$axios.post("/oneKey", this.schoolList).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "一键升学成功!"
            });
          }
        });
      }).catch(() => {
        this.$message({
          showClose: true,
          type: "info",
          message: "已取消"
        });
      });
    }
  },
  created() {
    this.getSchool();
  }
};
</script>
<style lang="less" scoped>
.upgrade {
  .sl-head {
    display: flex;
    justify-content: space-between;
  }
  .allSchoolUpdata {
    text-align: left;
    padding: 5px;
    box-sizing: border-box;
  }
}
</style>
