<template>
  <div class="mechanismCategoryManage">
    <M-Table-List>
      <div slot="Info">
        <el-form :inline="true"  :model="form" size="mini">
          <el-form-item label="机构类别名称：">
              <el-input v-model.trim="form.name" 
                       clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchData()" icon="el-icon-search">查询</el-button>
          </el-form-item>
          
          <el-form-item label="">
            <el-button type="primary" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
          <el-form-item class="float-right">
            <el-button type="success" @click="addRow" >新增</el-button>
            <el-button type="danger" @click="deleteRow" >删除</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom" v-loading="loading">
        <el-table
          :data="tableData"
          :stripe="true"
          style="width: 100%;"
          border=""
          ref="xzTable"
          :height="sHeight"
           @selection-change="handleSelectionChange"
        >
          <el-table-column prop="sort" label="统计" min-width="100" align="center"></el-table-column>
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
          <el-table-column prop="name" label="机构类别名称" min-width="100" align="center"></el-table-column>
          <el-table-column prop="count" label="机构数" min-width="100" align="center"></el-table-column>
          <el-table-column prop="logo" label="图片" min-width="100" align="center">
                <template slot-scope="scope">
                  <!-- {{base_url+scope.row.logo}} -->
                  <img :src="base_url+scope.row.logo" class="logo">
                  
             </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" min-width="120" align="center">
              <template slot-scope="scope">
                   <span v-if="scope.row.state==1" >启用</span>
                    <span v-else class="person_name">禁用</span>
             </template>
             
                  
                   
                
          </el-table-column>
          <el-table-column label="操作"  width="450">
            <template slot-scope="scope">
                  <el-button
                  type="info"
                  style="margin-right:8px"
                  @click="disable(scope.row)"
                >{{scope.row.state==1?'禁用':'启用'}}</el-button>
                <el-button
                  type="success"
                  style="margin-right:8px"
                  @click="editInfo(scope.row)"
                >编辑</el-button>
                <el-button type="info" icon="el-icon-arrow-up" @click="upperSort(scope.row)" circle :disabled="scope.$index==0?true:false" ></el-button>
                <el-button type="info" icon="el-icon-arrow-down" @click="nextSort(scope.row,scope.$index)" circle :disabled="scope.$index+1==tableData.length" ></el-button>
                <el-button
                  type="danger"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="Pagination">
        <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
      </div>
    </M-Table-List>
    <modifyModal
    title="新增类别"
    :isOpen.sync="addModal"
    @save="addModalSave"
    >
    </modifyModal>
    <modifyModal
    title="新增类别"
    :isOpen.sync="editModal"
    :data="editData"
    @save="editModalSave"
    >
    </modifyModal>
  </div>
  
</template>
<script>
import modifyModal from "./components/mechanismCategoryManageModal.vue";
import paginationCommon from '~/components/Pagination.vue'
import API from "../../api/webpackAPI";
export default {
  components: {
    modifyModal,
    paginationCommon
  },
  data() {
    return {
        base_url: API.img_url,
        editData:{},
        addModal:false,
        editModal:false,
        sHeight: this.$store.state.bodyBox.tableHeight,
        form: {
            name: ""
        },
        tableData: [],
        
        pagination: {
          pageNo: 1,
          total: 0,
          pageSize: 10
      },
        multipleSelection: [],
        loading: false
    };
  },
  computed: {
    btnList: function() {
      return this.$store.state.ButtonByParent;
    }
  },
  methods: {
      upperSort(row){
        let parameter
          parameter={
            sort:1,
            id:row.id
        }

      },
      nextSort(row,index){
        let parameter
           parameter={
            sort:0,
            id:row.id
        }
          this.$axios.post("baseCategory/updateSortById", parameter).then(res => {
          if(200==res.data.code){
            this.getData()
            this.$message({
                  type: "success",
                  message: "排序成功!"
                });
          }
        
      });

      },
    //查询
    searchData(){
        this.getData()
    },
    //获取选中项
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //点击重置
    resetBtn() {
      this.form = {
        name: ""
      };
      this.schoolSelect = "";
      this.pagination.pageNo = 1;
      this.getData();
    },
    log(data){
        console.log(data)
    },
    //批量删除
    deleteRow(){
      // this.multipleSelection
          let id =[]
          id=_.map(this.multipleSelection,(e)=>{
            return e.id
              
          })
          this.$axios.post('baseCategory/deleteBaseCategoryByArray',{idList:id}).then(res=>{
            if(200==res.data.code){
              this.getData()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                      });
            }
          })

       console.log(this.multipleSelection) 
    },
    //操作禁用
    disable(row) {
        let parameter
        parameter={
            state:row.state,
            id:row.id
        }
         this.$axios.post("baseCategory/stateBaseCategory", parameter).then(res => {
          console.log(res)
          if(200==res.data.code){
              this.getData()
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                      });
            }
        
      });
    },
    //点击删除
    handleDelete(data) {
      let id = data.id;
      this.$confirm("确认是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("baseCategory/deleteBaseCategory", {id:id})
            .then(res => {
              if (200 == res.data.code) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
              }
              this.getData();
            });
        })
        .catch(() => {});
    },
    //点击编辑
    editInfo(data) {
      this.editData=data
      this.editModal=true
    },
    //编辑模态保存
    editModalSave(data){
        console.log(data)
        this.$axios.post("baseCategory/updateBaseCategory", data).then(res => {
          console.log(res)
          if (200 == res.data.code) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
              }
              this.getData();
        
      });
    },
        // 更新数据
        onRefresList (msg) {
            this.pagination.pageNo = msg.pageNo
            this.pagination.pageSize = msg.pageSize
            this.getData()
        },
    //新增模态框保存
    addModalSave(data){
        console.log(data)
         let parameter
            parameter={
                logo:data.logo,
                name:data.name,
                sort:data.sort

            }
        this.$axios.post("baseCategory/addBaseCategory", parameter).then(res => {
          console.log(res)
          if (200 == res.data.code) {
                this.$message({
                  type: "success",
                  message: "成功!"
                });
              }
              this.getData();
        
      });
        console.log(data)
    },
    //点击新增
    addRow() {
        this.addModal=true        
    },
    //获取列表数据
    getData() {
      let parameter
      parameter= this.form
      this.$axios.post("baseCategory/findBaseCategory", parameter).then(res => {
          console.log(res)
        if (200 == res.data.code) {
          this.pagination.total = res.data.data.total * 1;
          this.tableData = res.data.data;
        } else {
          this.tableData = [];
        }
      });
    },
    
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.mechanismCategoryManage {
  .logo{
      margin: 10px 0 0 0;
      max-width: 50px;
      max-height: 50px;
  }
  .header{
            display: flex;
            font-size: 20px;
            font-weight: 600;
        }
}
</style>
