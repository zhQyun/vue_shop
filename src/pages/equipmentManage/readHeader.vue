<template>
  <div class="height-100 readHeader">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="学校名称：">
            <el-select v-model="schoolSelect" placeholder="请选择学校" clearable  @change="changeSchool">
              <el-option v-for="item in schoolList" :key="item.id" :label="item.schoolName" :value="item.id+','+item.dataSourceCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备编号：">
            <el-input v-model.trim="searchForm.deviceNo" :style="{width:formInputWidth}"
                      placeholder="设备编号" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="reactRecord" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom">
        <el-table :data="tableData"  :stripe="true"  style="width: 100%;" border ref="xzTable" :height="sHeight">
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column prop="deviceNo" label="设备编号" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="deviceName" label="设备名称" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="schoolId" label="学校ID" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="schoolName" label="学校名称" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="150" align="center" :formatter="dateFormat">
          </el-table-column>
        </el-table>
      </div>
      <div slot="Pagination">
        <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
      </div>
      <div slot="Dialog">
      </div>
    </M-Table-List>

  </div>
</template>

<script>
  import Vue from 'vue'
  import paginationCommon from '~/components/Pagination.vue'
  import tableCommonData from "~/components/mixin/table.js";
  import API from '../../api'
  // 引入时间戳插件
  import moment from 'moment'
  export default {
    components: {paginationCommon},
    mixins: [tableCommonData],
    name: "readHeader",
    data() {
      return {
        // 表格数据
        selectType: API.INFO_ALL_TYPE,
        formLabelWidth: '120px',
        formInputWidth: this.$store.state.fromBox.formInputWidth,
        sHeight: this.$store.state.bodyBox.tableHeight,
        // 表单数据
        searchForm: {
          deviceNo: '',
          schoolId:'',
          dataSourceCode:''
        },
        // 选中学校
        schoolSelect:'',
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
        },
        tableData: [],
        // 按钮数组
        btns: [],

        schoolList:[]
      }
    },
    mounted: function() {
      this.getBtns();
      this.refreshData();
    },
    computed: {

    },
    methods: {
      //获取页面的按钮
      getBtns() {
        var btns = this.$store.state.ButtonByParent;
        this.btns=btns;
      },
      // 时间格式化
      dateFormat:function(row,column){   
        var date = row[column.property];
        if(date == undefined){return ''}; 
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
      // 重置信息
      reactRecord() {
        this.searchForm={
          deviceNo: '',
          schoolId:''
        },
        this.schoolSelect = "";
        this.refreshData();
      },
      // 表格数据
      refreshData: function() {
        this.tableData = [];
        let that = this;
        // Object.assign(this.searchForm, this.pagination);
        this.searchForm.pageNo=this.pagination.pageNo
        this.searchForm.pageSize=this.pagination.pageSize
        this.$axios.post("/baseDeviceHeart/findBaseDeviceHeart", this.searchForm).then(function(res) {
          if(res.data.code==200) {
            that.tableData = res.data.data.rows;
            that.pagination.total = res.data.data.total*1;
          }
        })
      },
      //改变学校
      changeSchool(data) {
        var schoolArr = data.split(",");
        this.searchForm.schoolId = schoolArr[0];
        this.searchForm.dataSourceCode = schoolArr[1];
        this.pagination.pageNo = 1;
      },
      //获取学校列表
      getSchoolList(){
      this.common.getSchoolList().then(res=>{
        this.schoolList = res;
      })
    },
      // getSchoolList() {
      //   let that=this
      //   this.$axios.post("/baseSchool/findBaseSchool", this.searchForm).then(function(res) {
      //     if(res.data.code==200) {
      //       console.log(res.data.data.rows);
      //       that.schoolList=res.data.data.rows
      //     }
      //   })
      // },
      // 查询
      searchClick: function() {
        this.pagination.pageNo = 1
        this.refreshData();
      },
      // 更新数据
      onRefresList (msg) {
        this.pagination.pageNo = msg.pageNo
        this.pagination.pageSize = msg.pageSize
        this.refreshData()
      },
    },
    created(){
        this.getSchoolList()
      }
  }
</script>


<style scoped>
.el-dialog__body {
  padding: 40px 40px 20px 10px  !important;
}
</style>
<style>
.readHeader .el-dialog__body {
  max-height: 50vh;
  overflow: auto;
}
</style>
