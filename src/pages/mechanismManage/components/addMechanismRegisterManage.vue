<template>
    <div class="addMechanismRegisterManage">
        <M-Table-List>
            <div slot="Info">
                <span>{{title}}</span>
                <hr>
            </div>
            <div slot="TableDom">
                <div class="main">

                
                <div class="main-form">
                <el-form  :model="tableData" size="small " :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-position="left">
                <el-form-item label="机构编号:" :label-width="formLabelWidth" v-if="tableData.id"  prop="code">
                    <el-input v-model="tableData.code"  style="width: 300px;" disabled></el-input>
                </el-form-item>
                <el-form-item label="机构名称：" :label-width="formLabelWidth" prop="organName">
                    <el-input v-model="tableData.organName"  style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="英文简称:" :label-width="formLabelWidth" prop="enName">
                    <el-input v-model="tableData.enName"  style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="所属机构类别:" :label-width="formLabelWidth" prop="categoryId">
                    <el-select v-model="tableData.categoryId" style="width: 300px;"  placeholder="请选择机构类别">
                    <el-option
                            v-for="item in categoryOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地区：" :label-width="formLabelWidth" prop="province">
                    <el-select v-model="tableData.province" style="width: 100px;" @change="updataProvince" placeholder="请选择省">
                        <el-option
                            v-for="item in provinceOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="tableData.city" style="width: 100px;" @change="updataCity" placeholder="请选择">
                        <el-option
                            v-for="item in cityOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="tableData.area" style="width: 100px;"  placeholder="请选择">
                        <el-option
                            v-for="item in areaOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="负责人名称:" :label-width="formLabelWidth"  prop="name">
                    <el-input v-model="tableData.name"  style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="负责人电话:" :label-width="formLabelWidth"  prop="phone">
                    <el-input v-model="tableData.phone"  style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="机构详细地址:" :label-width="formLabelWidth"  prop="address">
                    <el-input v-model="tableData.address"  style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="入场方式:" :label-width="formLabelWidth"  prop="inType">
                    <!-- {{tableData.inType}} -->
                    <el-checkbox-group v-model="tableData.inType" >
                        <el-checkbox v-for="item in stateOptions" :label="item.id"  :value="item.value" :key="item.id">{{item.value}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="状态:" :label-width="formLabelWidth"  prop="state">
                    <el-radio v-model="tableData.state" :label="0">启用</el-radio>
                    <el-radio v-model="tableData.state" :label="1">禁用</el-radio>
                </el-form-item>
                </el-form>
                </div>
                <div>
                   
                    <div class="main-img">
                        
                        <div class="demo-type">
                            <!-- <el-avatar  v-if="tableData.id" :src="tableData.logo"></el-avatar> -->
                            <!-- {{tableData.logo}} -->
                            <img  class="img" :src="''==tableData.logo?'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png':tableData.logo" alt="">
                            <!-- <el-avatar :src="tableData.logo"></el-avatar> -->
                            <el-upload
                                action
                                list-type="picture"
                                :show-file-list="false"
                                :on-change="getImg"
                                :auto-upload="false"
                                accept="image/jpeg, image/gif, image/png, image/bmp">
                                <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
                            </el-upload>
                        </div>
                    </div>
                </div>   
                </div>
                <el-row>
                    <el-button type="primary" v-if="tableData.id" @click="edit">确认修改</el-button>
                    <el-button type="primary"  v-if="!tableData.id" @click="add">确认登陆</el-button>
                </el-row>
            </div>
            <!-- <div slot="Pagination">
                <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
            </div>    -->
        </M-Table-List>   
    </div>
</template>

<script>
import {cloneDeep} from "lodash";
import API from "../../../api/webpackAPI";
import Vue from 'vue'


// import paginationCommon from '~/components/Pagination.vue'

export default {
    // components: {paginationCommon},
    name: 'addMechanismRegisterManage',
/**
 * @typedef {object}  tableData -表单数据
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

    data(){
         return {
             rules: {
            organName: [
                { required: true, message: '请输入机构名称', trigger: 'blur' },
            ],
            enName: [
                { required: true, message: '请输入英文名称', trigger: 'blur' }
            ],
            phone: [
                { required: true, required: true, message: '请输入负责人联系方式', trigger: 'blur' }
            ],
            name: [
                { required: true, message: '请输入负责人姓名', trigger: 'blur' },
            ],
            address: [
                { required: true, message: '请输入详细地址', trigger: 'blur' }
            ],
            state: [
                { required: true, required: true, message: '请选择状态', trigger: 'blur' }
            ],
            province: [
                { required: true, message: '请选择省份', trigger: 'blur' },
            ],
            inType: [
                { required: true, message: '请选择入场方式', trigger: 'blur' }
            ],
            logo: [
                { required: true, required: true, message: '请选择图片地址', trigger: 'blur' }
            ],
            categoryId: [
                { required: true, required: true, message: '请选择机构类别', trigger: 'blur' }
            ]
                },
             base_url: API.img_url,
             categoryOptions:[],
             provinceOptions: [ 
            //      {
            //     id: "10000",
            //     name: "福建省",
            //     code: "35",
            //     isDelete: 0,
            //     sort: 2,
            //     remark: "数据来源，国家省份编码表",
            //     createUserId: "1181831949439676441",
            //     createTime: null,
            //     modifyUserId: null,
            //     modifyTime: 1573435184000
            // },
            // {
            //     id: "10014",
            //     name: "湖北省",
            //     code: "hubei",
            //     isDelete: 0,
            //     sort: 3,
            //     remark: "位于长江中游，洞庭湖以北，故名湖北，简称鄂。",
            //     createUserId: "1181831949439676441",
            //     createTime: null,
            //     modifyUserId: "1181831949439676441",
            //     modifyTime: 1575873441000
            // }
],
           stateOptions:[{
                  id:0,
                  name:'启用'

           },{
                  id:1,
                  name:'禁用'
           }],
           cityOptions:[],
           areaOptions:[],
            //  pagination: {
            //         pageNo: 1,
            //         total: 0,
            //         pageSize: 10
            //     },
            stateOptions : [
                {
                    id:"1",
                    value:'预约码'
                },
                {
                    id:"2",
                    value:'刷脸'
                },
                {
                    id:"3",
                    value:'待定'
                },
                
                ],
            formLabelWidth: this.$store.state.fromBox.formLabelWidth,
            title:'机构信息登记',
            multipleSelection: [],
            loading: false,
            tableData:
                {
                    id:'',
                    code:'',
                    organName:'',
                    categoryId:null,
                    name:'',
                    phone:'',
                    address:'',
                    state:1,
                    wechatId:'',
                    logo:'',
                    province:null,
                    city:null,
                    area:null,
                    inType:[],
                    enName:null
                }
        }
    },
    mounted () {
    this.getProvinceList()
    this.getCategoryOptions()
    if(this.$route.query.data){
        this.tableData=cloneDeep(this.$route.query.data)
        this.title='机构信息编辑'
        this.getCityList(this.tableData.province)
        this.getAreaList(this.tableData.city)
        this.tableData.logo=this.base_url+this.tableData.logo
        this.tableData.inType=this.tableData.inType.split(",")
        this.tableData.categoryId=this.tableData.categoryId.toString()
        // console.log(this.tableData)
    }
        
    },
    methods:{
        //获取所属机构类别
        getCategoryOptions(){
        this.$axios.post("baseCategory/findBaseCategory",{name:''}).then(res=> {
          if (200 == res.data.code) {
            this.categoryOptions = res.data.data;
          } 
            })
        },


        //省市联动
        updataProvince(id){
        //   console.log(id)
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
            pageSize:20
          }
          this.$axios.post("baseProvince/findBaseProvince", parameter).then(res=> {
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
        errorHandler() {
            return true
        },
        //查询
        searchData(){
            this.pagination.pageNo = 1
        },
            // 更新数据
        onRefresList (msg) {
            this.pagination.pageNo = msg.pageNo
            this.pagination.pageSize = msg.pageSize
            // this.refreshData()
        },
        //确认登陆
        add(){
            this.$refs.ruleForm.validate(valid=>{
            if(valid){
            // console.log(this.tableData)
                let parameter=cloneDeep(this.tableData)
                parameter.inType=parameter.inType.join(",")
                this.$axios.post('baseOrgan/addBaseOrgan',parameter).then(res=>{
                    if(200==res.data.code){
                    this.$route.push({name:'mechanismRegisterManage'})
                    this.$message({
                    message: '成功',
                    type: 'success'
                  });
                    }
                })
            }})
        },
        //确认修改
        edit(){
            this.$refs.ruleForm.validate(valid=>{
            if(valid){
          let parameter=cloneDeep(this.tableData)
          parameter.inType=parameter.inType.join(",")
            this.$axios.post('baseOrganStaff/updateBaseOrganStaff',parameter).then(res=>{
                    if(200==res.data.code){
                    this.$route.push({name:'mechanismRegisterManage'})
                    this.$message({
                    message: '成功',
                    type: 'success'
                  });
                    }
                })
            }})
        },


        getImg(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M ) {
          this.$message.error({
            message: "选择的图片不可大于2M"
          });
        return;
        }
        this.getBase64(file.raw).then(res => {
          this.state_img = false;
          Vue.nextTick(() => {
          this.$set(this.tableData, "logo", res);
          })
        });
      },
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
    }
}
</script>
<style lang='less' scoped>
    .addMechanismRegisterManage{
        .main{
            display: flex;
            margin: 40px 0 0 0 ;
            .main-form{
                margin: 0 100px;
            }
            .main-img{
                margin: 0 100px;
            }
            
                .img{
                height: 100px;
                width: 100px;
                max-width: 100px;
                max-height: 100px;
                border-radius: 50%;
            
            }
            
        }
        

    }
</style>
