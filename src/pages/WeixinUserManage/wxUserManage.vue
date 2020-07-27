<template>
  <div class="height-100 wxUserManage">
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
          <el-table-column prop="wmName" label="所属公众号" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="cardId" label="身份证号" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="tel" label="手机号" min-width="150" align="center">
          </el-table-column>
          <el-table-column prop="registerImg" label="人像照片" min-width="150" align="center">
            <template slot-scope="scope">
              <el-popover placement="bottom" title="" trigger="click">
                <img :src="base_url+scope.row.registerImg" width="200" height="200"/>
                <el-button slot="reference">查看</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="openId" label="open id" min-width="150" align="center">
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
  // import API from '../../api'
  export default {
    components: {paginationCommon},
    mixins: [tableCommonData],
    name: "wxUserManage",
    data() {
      return {
        base_url:  API.img_url,
        // 表格数据
        selectType: API.INFO_ALL_TYPE,
        formLabelWidth: '120px',
        formInputWidth: this.$store.state.fromBox.formInputWidth,
        sHeight: this.$store.state.bodyBox.tableHeight,
        // 表单数据
        searchForm: {
          name: '',
          tel:''
        },
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
        },
        tableData: [],
        // 按钮数组
        btns: [],
      }
    },
    created: function() {
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
      // 重置信息
      reactRecord() {
        this.searchForm={
          name: '',
          tel:''
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
        // let loading = Vue.prototype.$loading();
        this.$axios.post("/WechatUser/findListWechatUser", this.searchForm).then(function(res) {
          if(res.data.code==200) {
            that.tableData = res.data.data.rows;
            that.pagination.total = res.data.data.total*1;
          }else{
            that.tableData=[]
            that.pagination.total=0
          }
        // loading.close();
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
.wxUserManage .el-dialog__body {
  max-height: 50vh;
  overflow: auto;
}
</style>
