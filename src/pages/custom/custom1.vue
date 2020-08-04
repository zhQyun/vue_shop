<!--  -->
<template>
<div>
  <div class="table">
<el-tag
  v-for="(tag,index) in tags"
  :key="index"
  closable
  @close="DeleteName(index)"
>
  {{tag}}
</el-tag>
<el-button class="button" v-show="!open" style="padding:1px 5px" @click="OpenInput()">+new tag</el-button>
<el-input class="input" v-model="inputname" v-show="open" @keyup.enter.native="submit"></el-input>
  </div>

  <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
  <TableModal :visible.sync="dialogTableVisible"></TableModal>

<!-- Form -->
<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

<el-dialog title="收货地址" :visible.sync="dialogFormVisible">

  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
import TableModal from "./TableModal.vue";

export default {
  components:{TableModal},
 data() {
      return {
        open:false,
        inputname:'',
        tags: ['标签一','标签二','标签三','标签四'],
         gridData: [{
          date: '2016-05-02',
          name: '王小虎',
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
        dialogTableVisible: false,
        dialogFormVisible: false,
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
    methods:{
      OpenInput() {
       
        this.open=true;
      },
      submit() {
        console.log(this.tags);
        this.open=false;
        this.tags.push(this.inputname);
        this.inputname='';
        
      },
      DeleteName(index) {
       
         this.tags.splice(index, 1);
      
      }
     
    }
}
</script>
<style scoped >
.button {
    height: 24px;
    width: 73.34px;
    line-height: 20px;
    padding-top: 0;
    padding-bottom: 0;
    vertical-align: bottom;

}
.input {
  height: 24px;
    width: 73.34px;
    margin-left: 10px;
    vertical-align: bottom;
}
.el-input__inner {
    height: 24px;
    width: 73.34px;
}

</style>