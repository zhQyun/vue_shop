<template>
    <div class="mechanismRegisterManage">
            <M-Table-List>

         <div slot="Info">
        <el-form :inline="true" ref="searchForm" :model="form" size="mini" >
          <el-form-item label="机构名称：">
              <el-input v-model.trim="form.organName" 
                       clearable></el-input>
          </el-form-item>
          
          <el-form-item label="机构编号：">
              <el-input v-model.trim="form.code" 
                       clearable></el-input>
          </el-form-item>
          <el-form-item label="省：">
            <el-select v-model="form.province" @change="updataProvince" placeholder="请选择">
              <el-option
                v-for="item in provinceOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市：">
            <el-select v-model="form.city" @change="updataCity" placeholder="请选择">
              <el-option
                v-for="item in cityOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区：">
            <el-select v-model="form.area"  placeholder="请选择">
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="form.state"  placeholder="请选择">
              <el-option
                v-for="item in stateOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
           @selection-change="handleSelectionChange"
        >
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
          <el-table-column prop="code" label="编号" min-width="100" align="center"></el-table-column>
          <el-table-column prop="organName" label="机构名称" min-width="100" align="center"></el-table-column>
          <el-table-column prop="categoryId" label="机构类别" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="name" label="负责人姓名" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="负责人联系方式" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="address" label="详细地址" min-width="120" align="center">
          </el-table-column>
           <el-table-column prop="state" label="状态" min-width="120" align="center">
             <template slot-scope="scope">
               <span>{{scope.row.state==0?'启用':'禁用'}}</span>
             </template>
          </el-table-column>
           <el-table-column prop="wechatId" label="公众号" min-width="120" align="center">
          </el-table-column>
          <el-table-column label="操作"  width="450">
            <template slot-scope="scope">
                  <el-button
                  type="info"
                  style="margin-right:8px"
                  @click="disable(scope.row)"
                >{{1==scope.row.state?'启用':'禁用'}}</el-button>
                <el-button
                  type="success"
                  style="margin-right:8px"
                  @click="editInfo(scope.row)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
                 <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                      <el-link type="primary" class="link">更多</el-link>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="clearfix" @click.native="openWechatModal(scope.row)">
                    绑定公众号
                    <el-badge class="mark"/>
                    </el-dropdown-item>
                    <el-dropdown-item class="clearfix"  @click.native="JumpRouter('searchTurnover',scope.row)">
                    进出流水
                    <el-badge class="mark"/>
                    </el-dropdown-item>
                    <el-dropdown-item class="clearfix" @click.native="JumpRouter('searchInterviewee',scope.row)">
                    受访人员管理
                    <el-badge class="mark" />
                    </el-dropdown-item>
                    <el-dropdown-item class="clearfix" @click.native="JumpRouter('searchBookingManage',scope.row)">
                    预约管理
                    <el-badge class="mark"  />
                    </el-dropdown-item>
                    <el-dropdown-item class="clearfix" @click.native="JumpRouter('searchGateManage',scope.row)">
                    闸机管理
                    <el-badge class="mark"  />
                    </el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="Pagination">
        <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
      </div>
      
    </M-Table-List>
    <el-dialog
      title="绑定公众号"
      :visible.sync="wechatModal"
      width="30%"
      >
      <div class="wechat-modal-title">
        <span>机构名称:</span>
        <span>{{wechatModalData.nameMechanism}}</span>
      </div>
      <el-select v-model="wechatModalData.wechatId"  style="width: 300px;" @change="updataProvince"  placeholder="请选择公众号">
              <el-option
                v-for="item in wechatOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="wechatModal = false">取 消</el-button>
        <el-button type="primary" @click="bindingWechat">确 定</el-button>
      </span>
    </el-dialog>
      </div>
</template>

<script>
import _ from "lodash";
import paginationCommon from '~/components/Pagination.vue'

export default {
    components: {paginationCommon},

    name: 'mechanismRegisterManage',
/**
 * @typedef {Array}  tableData -表单数据
 * @prop {string} id -id
 * @prop {string} code -编号
 * @prop {string} organName -机构名称
 * @prop {string} categoryId -机构类别
 * @prop {string} name -负责人姓名
 * @prop {string} phone -负责人联系方式
 * @prop {string} address -详细地址
 * @prop {string} state -状态
 * @prop {string} wechatId -公众号
 * @prop {string} province -省份id
 * @prop {string} city -城市id
 * @prop {string} area -区域id
 * @prop {string} inType -入场方式
 * @prop {string} enName -英文名称
 * @prop {string} logo -图片地址
 */

/**
 * @typedef {object}  form  -查询条件
 * @prop {string} organName -机构名称
 * @prop {string} province -省份id
 * @prop {string} city -城市id
 * @prop {string} area -区域id
 * @prop {string} category_id -负责人姓名
 * @prop {string} code -机构编码
 * @prop {string} state -状态
 */
    data(){
         return {
           wechatModal:false,
           wechatOptions:[],
           wechatModalData:{
                  id:'',
                  nameMechanism:'',
                  wechatId:''
           },
           provinceOptions: [ ],
           stateOptions:[{
                  id:0,
                  name:'启用'

           },{
                  id:1,
                  name:'禁用'
           }],
           cityOptions:[],
           areaOptions:[],
           pagination: {
                pageNo: 1,
                total: 0,
                pageSize: 10
            },
            multipleSelection: [],
            loading: false,
            form:{
                organName:"",
                province:'',
                city:'',
                area:'',
                category_id:'',
                code:'',
                state:'',
            },
            tableData:[
                // {
                //     number:'编号',
                //     nameMechanism:'机构名称',
                //     category:'机构类别',
                //     name:'负责人姓名',
                //     telephone:'负责人联系方式',
                //     address:'详细地址',
                //     state:1,
                //     officialAccount:'公众号',
                //     id:'1',
                //     logo:'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
                //     province:'1',
                //     city:'1',
                //     area:'1',
                //     inType:'1',
                //     enName:'1',
                // }
            ]
        }
    },
     created() {
      this.getData();
      this.getProvinceList();
      this.getWechatList()
    },
    watch:{
      wechatModal(val){
        if(!val){
          this.wechatModalData={
                  id:'',
                  nameMechanism:'',
                  wechatId:''
           }
        }
      }
    },
    methods:{
        //获取公众号信息
        getWechatList(){
          this.$axios.post('baseOrgan/findBaseWechatConfig').then(res=>{
            if (200 == res.data.code) {
            this.wechatOptions = res.data.data
          }
          })
        },
        //省市联动
        updataProvince(id){
          console.log(id)
           this.getCityList(id)
        },
        //市区联动
        updataCity(id){
           this.getAreaList(id)
        },
        //获取省列表
        getProvinceList(){
          let parameter
          parameter={
            pageNo:1,
            pageSize:100
          }
          this.$axios.post("baseProvince/findBaseProvince", parameter).then(res=> {
            console.log(res.data.data.rows)
          if (200 == res.data.code) {
            this.provinceOptions = res.data.data.rows;
          }
        })
        },
        //获取城市列表
        getCityList(id){
          this.$axios.post("baseCity/findByParentId", {id:id}).then(res=> {
          if (200 == res.data.code) {
            this.cityOptions = res.data.data;
          }
          })
        },
        //获取区列表
        getAreaList(id){
          this.$axios.post("baseArea/findByParentId", {id:id}).then(res=> {
          if (200 == res.data.code) {
            this.areaOptions = res.data.data;
          }
          })
        },
        //获取列表
        getData(){
          let parameter
          parameter= this.form
          this.$axios.post("baseOrgan/findBaseOrgan", parameter).then(res => {
              console.log(res)
            if (200 == res.data.code) {
              this.pagination.total = res.data.data.count * 1;
              this.tableData = res.data.data.list;
            } else {
              this.tableData = [];
            }
      });
        },
        //微信公众号模态框
        openWechatModal(row){
            this.wechatModal=true
            this.wechatModalData.nameMechanism=row.nameMechanism
            this.wechatModalData.id=row.id
            this.wechatModalData.wechatId=row.wechatId
        },
        //绑定微信公众号
        bindingWechat(){
          let parameter
          parameter={
            id:this.wechatModalData.id,
            wechatId:this.wechatModalData.wechatId
          }
            this.$axios.post('baseOrgan/bindWechatConfig',parameter).then(res=>{
                if(200==res.data.code){
                  this.wechatModal=false
                  this.getData()
                  this.$message({
                    message: '绑定公众号成功',
                    type: 'success'
                  });
                }
            })
        },
        //获取选中项
        handleSelectionChange(val) {
        this.multipleSelection = val;
        },
        //查询
        searchData(){
            this.getData()
        },
        //重置
        resetBtn(){
            this.form={
                organName:"",
                province:'',
                city:'',
                area:'',
                category_id:'',
                code:'',
                state:''
            }
            this.getData()
        },
          
        //新增
        addRow(){
             this.$router.push({name:'addMechanismRegisterManage'})
        },

        //编辑
        editInfo(row){
          // console.log(row)
            this.$router.push({name:'addMechanismRegisterManage',query: {data:row}})
        },
        // 更新数据
        onRefresList (msg) {
            this.pagination.pageNo = msg.pageNo
            this.pagination.pageSize = msg.pageSize
            this.getData()
        },
        //批量删除
        deleteRow(){
            let id =[]
          id=_.map(this.multipleSelection,(e)=>{
            return e.id
              
          })
          this.$axios.post('baseOrgan/deleteBaseOrganByArray',{idList:id}).then(res=>{
            if(200==res.data.code){
              this.getData()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                      });
            }
          })
        },

        //禁用
        disable(row){
          let parameter
          parameter={
              id:row.id,
              state:0==row.state?1:0
          }
           this.$axios.post('baseOrgan/stateBaseOrgan',parameter).then(res=>{
                if(200==res.data.code){
                  this.getData()
                  this.$message({
                    message: '更改状态成功',
                    type: 'success'
                  });
                }
            })
        },

        //单行删除
        handleDelete(row){
          
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
        //路由跳转
         JumpRouter(page,row){
             this.$router.push({name:page,query: {id:row.id,title:row.organName}})
            console.log(row)

        },
    }
}
</script>
<style lang='less' scoped>
    .mechanismRegisterManage{
        .link{
            margin-left: 10px;
        }
        .wechat-modal-title{
          margin: 0 0 20px 0;
        }
        .header{
            display: flex;
            font-size: 20px;
            font-weight: 600;
        }

    }
</style>
