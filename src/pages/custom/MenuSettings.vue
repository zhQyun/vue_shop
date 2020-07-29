<!--  -->
<template>
  <div>
    <div class="title">菜单设置</div>
   <el-divider></el-divider>
   <div class="tips">
      XXXXXX公众号
   </div>
    <el-row>
      <el-button @click="addfirstmenu()" class="addfirthbutton"  v-show="table.length<3">添加一级菜单</el-button>
      <el-form :inline="true"  class="demo-form-inline">
       <div class="menu" v-for='(item,index) in table' :key="index">
          <el-form-item label="一级菜单名">
          <el-input v-model="item.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="deletfirstemenu(index)">删除</el-button>
        </el-form-item>
        <el-form-item label="链接">
         
            <el-input v-model="item.url" :disabled="item.chilren.length>0"></el-input>
         
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="deletfirstemenu(index)">删除</el-button>
        </el-form-item>
        <el-button @click="addsecondmenu(index)" v-show="item.chilren.length<5">添加二级菜单</el-button>

        <div class="second-list" v-for="(e,serial) in item.chilren" :key="serial">
 <el-form-item label="二级菜单名">
          <el-input v-model="e.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="deletsecondmenu(index,serial)">删除</el-button>
        </el-form-item>
        <el-form-item label="链接">
         
            <el-input v-model="e.url"></el-input>
         
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="deletsecondmenu(index,serial)">删除</el-button>
        </el-form-item>

        </div>
         <el-divider></el-divider>
       </div>
      
      </el-form>
    </el-row>
    <div class="serve"> 
    <el-button >保存配置</el-button>
    <el-button>取消</el-button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openIsDisabled:false,
      table:[
        {name:'11',
        url:'22',
        chilren:[
          {name:'11',
          url:'22'}
        ]},
         {name:'11',
        url:'22',
        chilren:[
          {name:'11',
          url:'22'}
        ]}

      ]
     
    };
  },
  methods: {
    //添加一级菜单
    addfirstmenu(index) {
      let item={
        name:'',
        url:'',
        chilren:[]
      }
    this.table.push(item);
    console.log(this.table);
   
    },
    //添加二级菜单
      addsecondmenu(index) {
   
    let item={
      name:'',
      url:''
    }
    this.table[index].chilren.push(item);
   
   
  },
  // 删除一级菜单
  deletfirstemenu(index) {
   
   this.table.splice(index,1);
  },
  // 删除二级菜单
  deletsecondmenu(index,serial) {
   
    this.table[index].chilren.splice(serial,1)
  }
  },

};
</script>
<style scoped>
* {
  text-align: initial;
}
.title {
  padding: 20px 30px;
}
.tips {
  padding-left: 120px;
}
.addfirthbutton {
  margin: 10px 160px;
}
.menu {
  margin-left: 160px;
}
.serve {
  text-align: center;
}
</style>