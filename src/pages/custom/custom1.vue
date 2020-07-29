<!--  -->
<template>
<div>
  <div class="table">
    <el-row v-for="(item,index) in table" :key='index'>

  <el-button>{{item.name}}</el-button> 
   
          <el-button >删除</el-button>
       
  
</el-row>
 <el-input v-model="inputValue" style="width:75px;"  class="input" ></el-input> <el-button @click="add()">添加</el-button>
  </div>
</div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
          inputValue: '11',
          table: [
          { name: '标签一' },
          { name: '标签二' },
          { name: '标签三' },
          { name: '标签四' },
          { name: '标签五' }
 
          ]

        }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {
      add() {

      }
    }
}
</script>
<style scoped >


</style>