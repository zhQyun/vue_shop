<template>
    <div class="searchInterviewee">
            <M-Table-List>
         <div slot="Info">
        <el-form :inline="true" :model="form" size="mini" >
          <el-form-item label="受访者姓名：">
              <el-input v-model.trim="form.staffName" 
                       clearable></el-input>
          </el-form-item>
           <el-form-item label="受访者编号：">
              <el-input v-model.trim="form.staffNumber" 
                       clearable></el-input>
          </el-form-item>
          <el-form-item label="角色：">
              <el-input v-model.trim="form.role" 
                       clearable></el-input>
          </el-form-item>
          <el-form-item label="状态：">
              <el-input v-model.trim="form.state" 
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
        <div class="header"><span>{{this.title}} 受访人员列表</span></div> 
        <el-table
          :data="tableData"
          :stripe="true"
          style="width: 100%;"
          @selection-change="handleSelectionChange"         
        >
         <el-table-column
              type="selection"
              width="55">
            </el-table-column>
          <el-table-column prop="staffNumber" label="受访者编号" min-width="100" align="center"></el-table-column>
          <el-table-column prop="staffName" label="受访者姓名" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="role" label="角色" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="state" label="状态" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="photoUrl" label="照片" min-width="120" align="center">
            <template slot-scope="scope">
              <!-- <span>{{base_url+scope.row.photoUrl}}</span> -->
              <img class="img" :src="base_url+scope.row.photoUrl" alt="">
            </template>

          </el-table-column>
          <el-table-column label="操作"  width="450">
            <template slot-scope="scope">
                <el-button
                  type="info"
                  style="margin-right:8px"
                  @click="disable(scope.row)"
                >禁用</el-button>
                <el-button
                  type="success"
                  style="margin-right:8px"
                  @click="editInfo(scope.row)"
                >编辑</el-button>
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
      </div>
</template>

<script>
import {cloneDeep} from "lodash";
import paginationCommon from '~/components/Pagination.vue'
import API from "../../../api/webpackAPI";

export default {
    components: {paginationCommon},
    name: 'searchInterviewee',
/**
 * @typedef {Array}  tableData -表单数据
 * @prop {string} id -id
 * @prop {string} staffNumber -受访者编号
 * @prop {string} staffName -受访者姓名
 * @prop {string} role -角色
 * @prop {string} state -状态
 * @prop {string} photoUrl -照片
 */

/**
 * @typedef {object}  form  -查询条件
 * @prop {string} staffName -受访者姓名
 * @prop {string} staffNumber -受访者编号
 * @prop {string} role -角色
 * @prop {string} state -状态
 */
    data(){
         return {
           base_url: API.img_url,
             title:'',
             pagination: {
                pageNo: 1,
                total: 0,
                pageSize: 10
            },
            multipleSelection: [],
            loading: false,
            form:{
                organId:'',
                staffName:"",
                staffNumber:'',
                role:'',
                state:'',
            },
            tableData:[
                // {
                //     id:'',
                //     staffNumber:'受访者编号',
                //     staffName:'受访者姓名',
                //     role:'角色',
                //     state:'状态',
                //     photoUrl:'照片',
                // }
            ]
        }
    },
    created(){
      let id=cloneDeep(this.$route.query.id)
      this.title=this.$route.query.title
      this.form.organId=id
      this.getData()
    },
    methods:{
        //获取表单数据
        getData(){
          this.$axios.post('baseOrganStaff/findBaseOrganStaff',this.form).then(res=>{
            if(200==res.data.code){
              this.pagination.total = res.data.data.count * 1;
              this.tableData=res.data.data.list
            }else{
              this.tableData=[]
            }
          })
        },
        //根据id获取

         //获取选中项
        handleSelectionChange(val) {
        this.multipleSelection = val;
        },
        // 更新数据
        onRefresList (msg) {
            this.pagination.pageNo = msg.pageNo
            this.pagination.pageSize = msg.pageSize
            // this.refreshData()
        },
        //查询
        searchData(){
          this.getData()
        },
        //重置
        resetBtn(){
          // this.tableData={
          //     staffName:"",
          //     staffNumber:'',
          //     role:'',
          //     state:''
          // }
          this.form.staffName=''
          this.form.staffNumber=''
          this.form.role=''
          this.form.state=''
        console.log(this.form)
          this.getData()
        },
        //编辑
        editInfo(row){
            this.$router.push({name:'addInterviewee',query:{data:row,id:this.form.organId,title:this.$route.query.title,type:'edit'}})

        },
        //禁用
        disable(row){
           this.$axios.post('baseOrganStaff/stateBaseOrganStaff',{id:row.id}).then(res=>{
            if(200==res.data.code){
              this.getData()
              this.$message({
                    message: '更改状态成功',
                    type: 'success'
                  });

            }
          })

        },
         //删除
        handleDelete(row){
            console.log(row)
            this.$axios.post('baseOrganStaff/deleteBaseOrganStaff',{id:row.id}).then(res=>{
            if(200==res.data.code){
              this.getData()
              this.$message({
                    message: '删除成功',
                    type: 'success'
                  });

            }
          })
        },
         //批量删除
        deleteRow(){
           console.log(this.multipleSelection) 
           this.multipleSelection
          let id =[]
          id=_.map(this.multipleSelection,(e)=>{
            return e.id
              
          })
          this.$axios.post('baseOrganStaff/deleteBaseOrganStaffToArray',{idList:id}).then(res=>{
            if(200==res.data.code){
              this.getData()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                      });
            }
          })
        },
        //新增
        addRow(){
             this.$router.push({name:'addInterviewee',query:{id:this.form.organId,title:this.$route.query.title}})

        },
       

    }
}
</script>
<style lang='less' scoped>
    .searchInterviewee{
        .link{
            margin-left: 10px;
        }
        .header{
            display: flex;
            font-size: 20px;
            font-weight: 600;
        }
        .img{
            height: 50px;
            width: 50px;
            max-width: 50px;
            max-height: 50px;
        }

    }
</style>
