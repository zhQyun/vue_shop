<!--  -->
<template>
<div>XXXXXX公众号

  <el-row>
  <el-button>添加一级菜单</el-button>
 <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="一级菜单名">
    <el-input v-model="formInline.user" ></el-input>
  </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="onSubmit">删除</el-button>
  </el-form-item>
  <el-form-item label="链接">
    <el-select v-model="formInline.region" >
     <el-input></el-input>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">删除</el-button>
  </el-form-item>
   <el-button>添加二级菜单</el-button>
</el-form>
</el-row>
</div>

</template>

<script>
 export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style scoped>
*{text-align: initial;

}
</style>