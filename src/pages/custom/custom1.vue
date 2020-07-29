<!--  -->
<template>
<div>
  <div class="table">
<el-tag
  v-for="tag in tags"
  :key="tag"
  closable
  @close="DeleteName(tag)"
>
  {{tag}}
</el-tag>
<el-button class="button" v-if="!open" style="padding:1px 5px" @click="OpenInput()">+new tag</el-button>
<el-input class="input" v-model="inputname" v-if="open" @keyup.enter.native="submit"></el-input>
  </div>
</div>
</template>

<script>
export default {
 data() {
      return {
        open:false,
        inputname:'',
        tags: ['标签一','标签二','标签三','标签四']
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
      DeleteName(tag) {
       
         this.tags.splice(this.tags.indexOf(tag), 1);
      
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

</style>