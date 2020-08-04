<!--  -->
<template>
<div>
  <el-dialog title="收货地址"  :visible.sync="dialogVisible">
  <el-table :data="gridData">
    <el-table-column property="date" label="日期" width="150"></el-table-column>
    <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="address" label="地址"></el-table-column>
    
  </el-table>
    <div slot="footer" class="dialog-footer">
    <el-button @click="cancel ()">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
export default {
    name:"TableModal",
    props:{
      isOpen:{
        type:Boolean,
    }
    },
   
   data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
     
        dialogVisible: this.isOpen,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    },
    watch: {
      isOpen(val) {
        this.dialogVisible=val
      },
      dialogVisible(val) {
        this.$emit("update:isOpen",val);
     
      }

    },
    methods: {
      cancel() {
       
        this.dialogVisible=false
      
      }
    }
}

</script>
<style scoped>
/* @import url(); 引入css类 */

</style>