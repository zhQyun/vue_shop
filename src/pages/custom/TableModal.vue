<!--  -->
<template>
 <div class="modal-backdrop"  >
     <div class="modal" >
        <div class="modal-header">
          <h2>新增类别</h2>
        </div>

      <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

<el-input v-model="deta.orgname" placeholder="机构类别名称"></el-input>
<el-input v-model="deta.number" placeholder="序号"></el-input>

        <div class="modal-footer">
            <button type="button" class="btn-close" @click="closeSelf">关闭</button>
            <button type="button" class="btn-confirm" @click="confirm">确认</button>
        </div>
    </div>
 
  </div>

</template>

<script>
export default {
  name: 'TableModal',
  props: {  
 
  },
  data() {
    return { 
      showModal:'' ,
      imageUrl: '' ,
     
      deta:{
      orgname:'',
      number:''
      }
    }
  }, 
  methods: {    
    closeSelf() {
             this.$emit('closeSelf',this.showModal=false); 
    },
    confirm() {
            this.$emit('confirm',this.deta)
    },
 

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>
<style scoped>
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
.modal-backdrop { 
    position: fixed; 
    top: 0; 
    right: 0; 
    bottom: 0; 
    left: 0; 
    background-color: rgba(0,0,0,.3); 
    display: flex; 
    justify-content: center; 
    align-items: center; 
}
.modal { 
    background-color: #fff; 
    box-shadow: 2px 2px 20px 1px; 
    overflow-x:auto; 
    display: flex; 
    flex-direction: column;
    border-radius: 16px;
    width: 700px;
} 
.modal-header { 
    border-bottom: 1px solid #eee; 
    color: #313131; 
    justify-content: space-between;
    padding: 15px; 
    display: flex; 
} 
.modal-header h2 {
  font-size: 20px;
  text-align: center;
  width: 100%;
}
.modal-footer { 
    border-top: 1px solid #eee; 
    justify-content: flex-end;
    padding: 15px; 
    display: flex; 
} 
.modal-body { 
    position: relative; 
    padding: 20px 10px; 
}
.btn-close, .btn-confirm {    
    border-radius: 8px;
    margin-left:16px;
    width:56px;
    height: 36px;
    border:none;
    cursor: pointer;
}
.btn-close {
    color: #313131;
    background-color:transparent;
}
.btn-confirm {
    color: #fff; 
    background-color: #2d8cf0;
}
.el-upload {
  padding-left: 262px;
}


</style>