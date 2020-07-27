<template>
  <div class="height-100 registrationManage">
    <M-Table-List >
      <div slot="Info">
        <el-form :inline="true" :model="searchForm" size="mini">
          <el-form-item label="姓名：">
            <el-input v-model.trim="searchForm.name" :style="{width:formInputWidth}"
                      placeholder="姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model.trim="searchForm.tel" :style="{width:formInputWidth}"
                      placeholder="手机号" clearable></el-input>
          </el-form-item>
           <el-form-item label="公众号：">
            <el-input v-model.trim="searchForm.wmName" :style="{width:formInputWidth}"
                      placeholder="公众号" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick" icon="el-icon-search">查询</el-button>
            <el-button type="primary" @click="reactRecord" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
          <el-form-item class="float-right">
           <span v-for="btn in btnList" :key="btn.id">
             <el-button type="success" @click="addInfo" icon="el-icon-plus" v-if="btn.percode === 'add'">新增</el-button>
             
          </span>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom">
        <el-table :data="tableData"  :stripe="true"  style="width: 100%;" border ref="xzTable" :height="sHeight">
          <el-table-column type="index" label="序号" width="60" align="center">
          </el-table-column>
          <el-table-column prop="wmName" label="注册手机号" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="cardId" label="绑定公众号名称" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="tel" label="注册时间" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="openId" label="状态" min-width="150" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <span v-for="btn in btnList" :key="btn.id">
                <el-button type="success" icon="el-icon-s-custom" @click="register(scope.row)" v-if="(btn.percode === 'register')&&(scope.row.isRegistered==0)">一键注册</el-button>
              </span>
            </template>
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
  import API from "../../api/webpackAPI";
  // 引入时间戳插件
  import moment from 'moment'
  export default {
    components: {paginationCommon},
    mixins: [tableCommonData],
    name: "registrationManage",
    data() {
      return {
        // 表格数据
        selectType: API.INFO_ALL_TYPE,
        formLabelWidth: '120px',
        formInputWidth: this.$store.state.fromBox.formInputWidth,
        sHeight: this.$store.state.bodyBox.tableHeight,
        // 表单数据
        searchForm: {
          dictName: ''
        },
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
        },
        tableData: [],
        // 按钮数组
        btns: [],

        base_url:  API.img_url,
      }
    },
    created: function() {
      // this.getBtns();
      this.refreshData();
    },
    computed: {
      btnList:function(){
        return this.$store.state.ButtonByParent;
      }
    },
    methods: {
      // 时间格式化
      dateFormat:function(row,column){   
        var date = row[column.property];
        if(date == undefined){return ''}; 
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },
      //获取页面的按钮
      getBtns() {
        var btns = this.$store.state.ButtonByParent;
        this.btns=btns;
      },
      // 重置信息
      reactRecord() {
        this.searchForm={
          dictName: '',
        },
        this.refreshData();
      },
      // 表格数据
      refreshData: function() {
        this.tableData = [];
        let that = this;
        // Object.assign(this.searchForm, this.pagination);
        this.searchForm.pageNo=this.pagination.pageNo
        this.searchForm.pageSize=this.pagination.pageSize
        this.$axios.post("/registerErrLog/findWechatRegisterErr", this.searchForm).then(function(res) {
          if(res.data.code==200) {
            that.tableData = res.data.data.rows;
            that.pagination.total = res.data.data.total*1;
          }
        })
      },
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
      register(row){
        let that=this
        this.$confirm("确定一键注册吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(()=>{
          this.$axios.post("/registerErrLog/saveWechatRegisterErr",row ).then(function(res) {
            if(res.data.code==200) {
              that.$message({
                message: '一键注册成功',
                type: 'success',
                duration: 1500,
                customClass: 'xz-alert-common'
              })
              that.refreshData()
            }
          })
        })
      },
      isRegistered(row){
      return row.isRegistered==0?'否':row.isRegistered==1?'是':''
      },
      formatCardId(row){
      var val=row.cardId
      if(val) return `${val.substring(0,6)}********${val.substring(val.length-4)}`
      },
      formatTel(row){
      var val=row.tel
      if(val) return `${val.substring(0,3)}****${val.substring(val.length-4)}`
      },
    }
  }
</script>


<style scoped>
.el-dialog__body {
  padding: 40px 40px 20px 10px  !important;
}
</style>
<style>
.oneKeyRegister .el-dialog__body {
  max-height: 50vh;
  overflow: auto;
}
</style>
