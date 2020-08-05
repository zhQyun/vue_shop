<!--  -->
<template>
<div>
  <el-dialog title="收货地址"  :visible.sync="dialogVisible">
    <el-form ref="form" :model="form" label-width="80px">
   <el-form-item label="统计">
    <el-input v-model="form.statistics"></el-input>
  </el-form-item>
   <el-form-item label="姓名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
   <el-form-item label="机构数">
    <el-input v-model="form.count"></el-input>
  </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
    <el-button @click="cancel ()">取 消</el-button>
    <el-button type="primary" @click="confirm ()">确 定</el-button>
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
    },
    data:{
      type:Object
    }
    },
   
   data() {
      return {
        dialogVisible: this.isOpen,
        form: {
          statistics: '',
          name: '',
          count: '',
          state:1
        },
        formLabelWidth: '120px'
      };
    },
    watch: {
      isOpen(val) {
        this.dialogVisible=val;
        console.log(val);
        if(this.data) {
          this.form=this.data,
          console.log(this.form);
       
        }
        if(!val) {
          
         this.form={
         statistics: '',
          name: '',
          count: '',
          state:1
        }
        }

      },
      dialogVisible(val) {
        this.$emit("update:isOpen",val);
     
      },
     

    },
    methods: {
      cancel() {
       
        this.dialogVisible=false
      },
      confirm() {
        this.dialogVisible=false
        this.$emit("confirm",this.form)
      }
    }
}

</script>
<style scoped>
/* @import url(); 引入css类 */

</style>