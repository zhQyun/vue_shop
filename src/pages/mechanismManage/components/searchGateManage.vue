<template>
    <div class="searchGateManage">
            <M-Table-List>
         <div slot="Info">
        <el-form :inline="true" :model="form" size="mini" >
          <el-form-item label="闸机名：">
              <el-input v-model.trim="form.gateName" 
                       clearable></el-input>
          </el-form-item>
           <el-form-item label="机构编码：">
              <el-input v-model.trim="form.gateCode" 
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
        <div class="header"><span>{{this.title}} 闸机列表</span></div> 
        <el-table
          :data="tableData"
          :stripe="true"
          @selection-change="handleSelectionChange"
          style="width: 100%;"
         
        >
          <el-table-column prop="id" label="编号" min-width="100" align="center"></el-table-column>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
          <el-table-column prop="gateCode" label="闸机编号" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="gateName" label="闸机名称" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="gateNumber" label="闸机唯一编码" min-width="120" align="center">
          </el-table-column>
          <el-table-column label="操作"  width="450">
            <template slot-scope="scope">
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
    <el-dialog
    :title="modalTitle"
    :visible.sync="dialogVisible"
    width="30%"
    >
   <el-form :model="editData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        
        <el-form-item label="闸机名称" prop="gateName">
          <el-input v-model="editData.gateName"></el-input>
        </el-form-item>
        <el-form-item label="闸机编号" prop="gateCode" v-show="editData.id">
          <el-input v-model="editData.gateCode" disabled></el-input>
        </el-form-item>
         <el-form-item label="闸机唯一码" prop="gateNumber">
          <el-input v-model="editData.gateNumber" ></el-input>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
    </span>
    </el-dialog>
      </div>
</template>

<script>
import {cloneDeep} from "lodash";
import paginationCommon from '~/components/Pagination.vue'

export default {
    components: {paginationCommon},
    name: 'searchGateManage',
/**
 * @typedef {Array}  tableData -表单数据
 * @prop {string} id -id
 * @prop {string} organId -机构id
 * @prop {string} gateCode -闸机编号
 * @prop {string} gateName -闸机名称
 * @prop {string} gateNumber -闸机唯一编码
 * @prop {string} createTime -录入时间
 */

/**
 * @typedef {object}  form  -查询条件
 * @prop {string} gateName -机构名称
 * @prop {string} code -机构编码
 */
    data(){
         return {
           rules: {
          gateNumber: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          gateName: [
            { required: true, message: '请选择图片', trigger: 'blur' }
          ],
              },
            title:'',
            modalTitle:'',
            dialogVisible:false,
            editData:{
                organId:'',
                gateCode:'',
                gateName: "",   //闸机名称,
                gateNumber: "", //闸机唯一编码,
            }, 
            pagination: {
                pageNo: 1,
                total: 0,
                pageSize: 10
            },
            multipleSelection: [],
            loading: false,
            form:{
                organId:'',
                gateName:"",
                gateCode:'',
            },
            tableData:[]
        }
    },
    watch:{
        dialogVisible(val){
            if(!val){
                this.editData={
                    organId:'',
                    gateCode:'',
                    gateName: "",   //闸机名称,
                    gateNumber: "", //闸机唯一编码,
                }
            }
        }
    },
    created(){
      let id=cloneDeep(this.$route.query.id)
      this.title=this.$route.query.title
      this.form.organId=id
      this.getData()
      
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
        // 获取表单数据
        getData(){
          this.$axios.post('baseGateManage/findBaseGateManage',this.form).then(res=>{
            if(200==res.data.code){
                    this.pagination.total = res.data.data.count * 1;
                    this.tableData = res.data.data.list;
            }else{
              this.tableData=[]
            }
          })
        },
        // 更新数据
        onRefresList (msg) {
            this.pagination.pageNo = msg.pageNo
            this.pagination.pageSize = msg.pageSize
            this.getData()
        },
        //查询
        searchData(){
          this.getData()

        },
        //重置
        resetBtn(){
          this.form.gateName=''
          this.form.gateCode=''
          this.getData()
        },

        //新增
        addRow(){
            this.modalTitle='新增闸机'
            this.dialogVisible=true

        },
        //批量删除
        deleteRow(){
          this.multipleSelection
          let id =[]
          id=_.map(this.multipleSelection,(e)=>{
            return e.id
              
          })
          this.$axios.post('baseGateManage/deleteBaseGateManageToArray',{id:id}).then(res=>{
            if(200==res.data.code){
              this.getData()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                      });
            }
          })

        },
        //编辑
        editInfo(row){
            this.modalTitle='编辑闸机'
            this.dialogVisible=true
            this.editData=_.cloneDeep(row)

        },
        //单行删除
        handleDelete(row){
          this.$axios.post('baseGateManage/deleteBaseGateManage',{id:row.id}).then(res=>{
            if(200==res.data.code){
                    this.getData()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                      });
                  }

          })

        },
        //修改&新增闸机详情
        save(){
          this.$refs.ruleForm.validate(valid=>{
            if(valid){
            if(!this.editData.id){
                 this.editData.organId=this.$route.query.id
                 this.$axios.post('baseGateManage/addBaseGateManage',this.editData).then(res=>{
                  // console.log(res)
                  if(200==res.data.code){
                    this.getData()
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                      });
                  }
                })
                
                return
            }
            this.$axios.post('baseGateManage/updateBaseGateManage',this.editData).then(res=>{
              // console.log(res)
              if(200==res.data.code){
                this.getData()
                this.$message({
                    message: '编辑成功',
                    type: 'success'
                  });
              }
            })
        }})
        },

    }
}
</script>
<style lang='less' scoped>
    .searchGateManage{
        .link{
            margin-left: 10px;
        }
        .header{
            display: flex;
            font-size: 25px;
            font-weight: 600;
        }
    }
</style>
