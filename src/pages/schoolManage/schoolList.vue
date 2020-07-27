<template>
  <div class="height-100 schoolList">
    <M-Table-List>
      <div slot="Info">
        <el-form :inline="true" :model="form" size="mini">
          <el-form-item label="学校名称：">
            <el-input
              v-model.trim="form.schoolName"
              :style="{width:formInputWidth}"
              placeholder="学校名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchSchool()" icon="el-icon-search">查询</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
          <el-form-item class="float-right">
            <span v-for="btn in btnList" :key="btn.id">
              <el-button
                type="success"
                @click="addInfo"
                icon="el-icon-plus"
                v-if="btn.name === '新增'"
              >新增</el-button>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom" v-loading="loading">
        <el-table
          :data="tableData"
          :stripe="true"
          style="width: 100%;"
          border=""
          ref="xzTable"
          :height="sHeight"
        >
          <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
          <!-- <el-table-column type="index" label="序号" width="60" align="center"></el-table-column> -->
          <el-table-column prop="schoolName" label="学校名称" min-width="150" align="center"></el-table-column>
          <el-table-column prop="provinceName" label="省份" min-width="100" align="center"></el-table-column>
          <el-table-column prop="cityName" label="城市" min-width="100" align="center"></el-table-column>
          <el-table-column prop="areaName" label="地区" min-width="100" align="center"></el-table-column>
          <el-table-column prop="schoolYearName" label="年制" min-width="70" align="center"></el-table-column>
          <el-table-column prop="tel" label="电话" min-width="120" align="center"></el-table-column>
          <el-table-column label="学校展示图" align="center">
            <template slot-scope="scope">
              <el-button
                type="success"
                style="margin-right:8px"
                @click="lookImg(scope.row.imgurl,'学校展示图')"
              >查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="学校平面图" align="center">
            <template slot-scope="scope">
              <el-button
                type="success"
                style="margin-right:8px"
                @click="lookImg(scope.row.liveImg,'学校平面图')"
              >查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="statusCode" label="状态" align="center" :formatter="stateCode"></el-table-column>
          <el-table-column prop="linkMan" label="联系人" min-width="120" align="center"></el-table-column>
          <el-table-column prop="address" label="地址" min-width="120" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span v-for="btn in btnList" :key="btn.id">
                <el-button
                  type="success"
                  style="margin-right:8px"
                  icon="el-icon-edit"
                  @click="editInfo(scope.row)"
                  v-if="btn.name === '编辑'"
                >编辑</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="Pagination">
        <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
      </div>
    </M-Table-List>
    <el-dialog
      :title="totasTitle"
      :visible.sync="addDialog"
      :close-on-click-modal="false"
      custom-class="dialog-type-column1"
    >
      <addSchool v-if="addDialog" @hideTotas="hideTotas" :schoolData="schoolData"></addSchool>
    </el-dialog>
    <el-dialog
      :title="showImg.title"
      :visible.sync="showImg.show"
      :close-on-click-modal="false"
      custom-class="dialog-type-column1"
    >
      <img :src="base_url+showImg.url" alt="" class="pic">
    </el-dialog>
  </div>
</template>
<script>
import paginationCommon from "~/components/Pagination.vue";
import addSchool from "./components/addSchool.vue";
import getBtns from "~/components/mixin/getBtns";
import API from "../../api/webpackAPI";
export default {
  data() {
    return {
      formInputWidth: this.$store.state.fromBox.formInputWidth,
      sHeight: this.$store.state.bodyBox.tableHeight,
      form: {
        schoolName: ""
      },
      base_url: API.img_url,
      showImg: {
        url: "",
        title: "",
        show: false
      },
      tableData: [],
      totasTitle: "新增学校",
      pagination: {
        pageNo: 1,
        total: 0,
        pageSize: 10
      },
      addDialog: false, //是否显示弹窗
      schoolData: {}, //修改学校的参数
      loading: false
    };
  },
  components: {
    paginationCommon,
    addSchool
  },
  // mixins: [getBtns],
  computed: {
    btnList:function(){
      return this.$store.state.ButtonByParent;
    }
  },
  methods: {
    //隐藏弹窗
    hideTotas() {
      this.addDialog = false;
      this.getSchool();
    },
    //点击重置
    resetBtn() {
      this.form.schoolName = "";
      this.pagination.pageNo = 1;
      this.getSchool();
    },
    //点击编辑
    editInfo(data) {
      this.totasTitle = '编辑学校';
      this.schoolData = {
        id: data.id,
        schoolName: data.schoolName,
        logoImg: data.logoImg,
        provinceId: data.provinceId,
        cityId: data.cityId,
        areaId: data.areaId,
        schoolYear: data.schoolYear,
        address: data.address,
        tel: data.tel,
        linkMan: data.linkMan,
        statusCode: data.statusCode,
        liveImg: data.liveImg,
        imgurl: data.imgurl
      };
      this.addDialog = true;
    },
    //点击新增
    addInfo() {
      this.schoolData = {};
      this.totasTitle = '新增学校';
      this.addDialog = true;
    },
    // 更新数据
    onRefresList(msg) {
      this.pagination.pageNo = msg.pageNo;
      this.pagination.pageSize = msg.pageSize;
      this.getSchool();
    },
    //点击查询
    searchSchool() {
      this.pagination.pageNo = 1;
      this.getSchool();
    },
    //获取学校列表
    getSchool() {
      var data = {
        pageNo: this.pagination.pageNo,
        pageSize: this.pagination.pageSize,
        schoolName: this.form.schoolName
      };
      this.loading = true;
      this.$axios.post("baseSchool/findBaseSchool", data).then(res => {
        this.loading = false;
        if (res.data.code == 200) {
          this.pagination.total = res.data.data.total;
          this.tableData = res.data.data.rows;
        }
      });
    },
    //查看图片
    lookImg(url, title) {
      this.showImg = {
        url,
        title,
        show: true
      };
    },
    stateCode(row) {
      return row.statusCode == "0"
        ? "启用"
        : row.statusCode == "1"
          ? "停用"
          : "";
    }
  },
  created() {
    this.getSchool();
  }
};
</script>
<style lang="less">
.schoolList {
  .el-dialog__wrapper {
    .dialog-type-column1 {
      margin-top: 5vh !important;
      .pic {
        max-width: 800px;
        max-height: 800px;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.schoolList {
  .sl-head {
    display: flex;
    justify-content: space-between;
  }
}
</style>
