<template>
  <div class="addSchool">
    <el-dialog 
        :title="title" 
        :visible.sync="mIsOpen"
        width="50%"
        >    
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类别logo" prop="logo">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :on-change="getImg"
            :auto-upload="false"
            accept="image/jpeg, image/gif, image/png, image/bmp">
            <img v-if="ruleForm.logo" :src="base_url+ruleForm.logo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        
        </el-form-item>
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
         <el-form-item label="序号" prop="sort">
          <el-input v-model="ruleForm.sort"></el-input>
        </el-form-item>
      </el-form>
       <span slot="footer" class="dialog-footer">
          <el-button  @click="mIsOpen = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import API from "../../../api/webpackAPI";

export default {
  props: {
    title: {
        type:String ,
    },
    isOpen:{
        type:Boolean,
    },
    data:{
        type:Object
    }
  },
  watch:{
    isOpen(val){
      
      this.mIsOpen=val
     
      if(this.data){
        // console.log(this.data)
        this.ruleForm=this.data
      }
      if(!val){
        this.ruleForm={
          id:'',
          name: '',
          sort : '',
          logo: '',
        }
      }
      
    },
    mIsOpen(val) {
            this.$emit("update:isOpen", val);
        },
  },
  data() {
    return {
      base_url: API.img_url,
      rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          logo: [
            { required: true, message: '请选择图片', trigger: 'blur' }
          ],
          sort: [
            { required: true, required: true, message: '请选择序号', trigger: 'blur' }
          ],
              },
      mIsOpen: this.isOpen,
      ruleForm: {
          id:'',
          name: '',
          sort : '',
          logo: '',
        },
    }
  },
  methods: {
    save(){
      this.$refs.ruleForm.validate(valid=>{
            if(valid){
      this.mIsOpen=false
      this.$emit('save',this.ruleForm);
            }})
    },
    getImg(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M ) {
          this.$message.error({
            message: "选择的图片不可大于2M"
          });
        return;
        }
        this.getBase64(file.raw).then(res => {
          this.state_img = false;
          this.$set(this.ruleForm, "logo", res);
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
  },
 
};
</script>
<style lang="less" scoped>
.demo-block .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

