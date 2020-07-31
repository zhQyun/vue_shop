<template>
<div>
   <div class="table">
   <div class="top">
     <el-form :inline="true"  class="demo-form-inline">
  <el-form-item label="机构类别名称：">
    <el-input placeholder="机构类别名称"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary"  icon="el-icon-search">查询</el-button>
    <el-button type="primary"  icon="el-icon-refresh">重置</el-button>
     <el-button  type="success" icon="el-icon-plus" @click="addRow()">新增</el-button>
    <el-button type="danger" icon="el-icon-delete">删除</el-button>
  </el-form-item>
  <div>
  </div>
  
</el-form>
   </div>
 <el-table
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column
      prop="statistics"
      label="统计"
      width="180">
    </el-table-column>
   <el-table-column
            type="selection"
            width="55">
            </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>

    
    
    <el-table-column
      prop="pic"
      label="图片"
      width="100">
    </el-table-column>
    <el-table-column
      prop="count"
      label="机构数">
    </el-table-column>

     <el-table-column prop="state" label="状态" min-width="60" align="center">
              <template slot-scope="scope">
                    <span v-if="scope.row.state==1">启用</span>
                    <span v-else>禁用</span>
             </template>
      </el-table-column>  

       <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleStar(scope.$index, scope.row)">启用</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>      



  </el-table>

  <TableModal
v-show="showModal"
@closeSelf="clodata"
@confirm="condata"
 >
  </TableModal>





 </div>
</div>
</template>


<script>
import TableModal from "./TableModal.vue";
  export default {
    components: {TableModal},
    data() {
      return {
      
        checkAll:false,
        showModal:false,
        tableData: [{

          statistics: '1231',
          name: '王小虎',
          count: '1235',
          state:1
        }, {
          statistics: '564114',
          name: '王小虎',
          count: '1235',
          state:1
        }, {
          statistics: '564111',
          name: '王小虎',
          count: '1235',
          state:0
        }, {
          statistics: '564113',
          name: '王小虎',
          count: '1235',
          state:0
        }]
      }
    },
    methods: {
     
      
      
      // 新增
      addRow() {
this.showModal=true;
      },
      // 启用
      handleStar() {

      },
      // 编辑
      handleEdit() {

      },
      //删除
      handleDelete() {

      } ,
      toggleModal:function(){
      this.showModal = !this.showModal;
    },
    clodata(msg) {
      console.log(msg);
      this.showModal=false
    },
    condata(date) {
      console.log(date);
      this.showModal=false
   
    
    },
    }

  }
</script>
<style>
.table {
  text-align: initial;
}
.top {
  background-color:#f3f3f3 ;
  border-bottom: #dbdbde 1px solid; 
  padding:5px 0 0 5px;
  height: 40px;
}
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
