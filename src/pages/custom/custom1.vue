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