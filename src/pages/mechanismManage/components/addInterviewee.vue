<template>
    <div class="addInterviewee">
        <M-Table-List>
            <div slot="Info">
                <span>{{title}}</span>
                <hr>
            </div>
            <div slot="TableDom">
                <div class="main">
                    <div class="main-form">
                        <el-form  :model="tableData" size="small" ref="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" label-position="left" >
                            <el-form-item label="受访者编号:" :label-width="formLabelWidth" v-if="tableData.id">
                                <el-input v-model="tableData.staffNumber"  style="width: 300px;" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="受访者姓名:" :label-width="formLabelWidth" prop="staffName">
                                <el-input v-model="tableData.staffName"  style="width: 300px;" ></el-input>
                            </el-form-item>
                            <el-form-item label="所属机构：" :label-width="formLabelWidth">
                                <el-input v-model="tableData.organName" disabled style="width: 300px;"></el-input>
                            </el-form-item>
                            <el-form-item label="所属角色:" :label-width="formLabelWidth" prop="role">
                                <el-cascader
                                v-model="tableData.role" style="width: 300px;"  placeholder="请选择机构类别"
                                :options="roleOptions"
                                :props="{ label: 'name',value: 'id', checkStrictly: true, children:'children' ,emitPath:false}"
                                clearable></el-cascader>
                                <!-- <el-select v-model="tableData.role" style="width: 300px;"  placeholder="请选择机构类别">
                                <el-option
                                    v-for="item in roleOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                                </el-select> -->
                            </el-form-item>
                        
                            <el-form-item label="手机号:" :label-width="formLabelWidth" prop="tel"> 
                                <el-input v-model="tableData.tel"  style="width: 300px;"></el-input>
                            </el-form-item>
                            <el-form-item label="备注:" :label-width="formLabelWidth" >
                                <el-input v-model="tableData.remark"  style="width: 300px;"></el-input>
                            </el-form-item>
                            <el-form-item label="状态:" v-if="0==tableData.isActivate&&tableData.id" label-width="180" prop="state">
                                <el-radio v-model="tableData.state" :label="0">启用</el-radio>
                                <el-radio v-model="tableData.state" :label="1">禁用</el-radio>
                            </el-form-item>
                            <el-form-item label="状态:（未激活）" v-if="1==tableData.isActivate&&tableData.id" label-width="180" prop="state">
                                <el-radio v-model="tableData.state" disabled :label="0">启用</el-radio>
                                <el-radio v-model="tableData.state" disabled :label="1">禁用</el-radio>
                            </el-form-item>
                        </el-form>
                    </div>
                <div class="main-img">
                    <div class="demo-type">
                        <img  class="img" :src="''==tableData.photoUrl?'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png':tableData.photoUrl" alt="">
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
                <el-row>
                    <el-button type="primary" v-if="tableData.id" @click="edit">确认添加</el-button>
                    <el-button type="primary"  v-if="!tableData.id" @click="add">确认登陆</el-button>
                </el-row>
            </div>
            <!-- <div slot="Pagination">
                <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
            </div> -->
        </M-Table-List>   
    </div>
</template>

<script>
import {cloneDeep} from "lodash";
import Vue from 'vue'

import API from "../../../api/webpackAPI";
export default {
    // components: {paginationCommon},
    name: 'addInterviewee',
/**
 * @typedef {object}  tableData -表单数据
 * @prop {string} Id -id
 * @prop {string} staffName -受访者姓名
 * @prop {string} tel -手机号
 * @prop {string} photoUrl -照片url
 * @prop {string} organId -受访者机构id
 * @prop {string} role -受访者角色
 * @prop {string} address -详细地址
 * @prop {string} state -状态
 * @prop {string} remark -备注
 */

    data(){
         return {
           roleOptions:[],
           base_url: API.img_url,
           rules: {
            staffName: [
                { required: true, message: '请输入受访者姓名', trigger: 'blur' },
            ],
            tel: [
                { required: true, message: '请输入手机号', trigger: 'blur' }
            ],
                },
            formLabelWidth: this.$store.state.fromBox.formLabelWidth,
            title:'添加受访者',
            loading: false,
            tableData:
                {
                    id:'',
                    staffName:'',
                    organName:'',
                    tel:'',
                    photoUrl:'',
                    organId:'',
                    role:'',
                    address:'',
                    state:'',
                    remark:'',
                }
        }
    },
    mounted () {
    this.getRoleOptions()
    this.tableData.organId=this.$route.query.id
    this.tableData.organName=this.$route.query.title

    if('edit'==this.$route.query.type){
        // this.tableData=cloneDeep(this.$route.query.data)
        this.getData(this.$route.query.id)
        this.title='编辑受访者'
        if(this.tableData.logo){
            this.tableData.logo=this.base_url+this.tableData.logo
        }
        
        console.log(111111111111);
    }
        
    },
    methods:{
         //获取所属机构类别
        getRoleOptions(){
        this.$axios.post("baseUser/findByOrganId",{organId:this.$route.query.id}).then(res=> {
            console.log(res.data)
          if (200 == res.data.code) {
            this.roleOptions = res.data.data;
          } 
            })
        },
        getData(id){
            this.$axios.post('baseOrganStaff/findByIdBaseOrganStaff',{id}).then(res=>{
            if(200==res.data.code){
              this.tableData=res.data.data
            }else{
              this.tableData={}
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
            this.$axios.post('baseOrganStaff/addBaseOrganStaff',this.tableData).then(res=>{
                if(200==res.data.code){
                  this.$route.push({name:'searchInterviewee',query:{id:this.form.organId,title:this.$route.query.title}})
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
             this.$axios.post('baseOrganStaff/updateBaseOrganStaff',this.tableData).then(res=>{
                if(200==res.data.code){
                  this.$route.push({name:'searchInterviewee',query:{id:this.form.organId,title:this.$route.query.title}})
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
          this.$set(this.tableData, "photoUrl", res);
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
    .addInterviewee{
        .main{
            display: flex;
            margin: 40px 0 0 0 ;
            .main-form{
                margin: 0 100px;
            }
            .main-img{
                margin: 0 100px;
            }
        }
        
                .img{
                height: 100px;
                width: 100px;
                max-width: 100px;
                max-height: 100px;
                border-radius: 50%;
            
            }

    }
</style>
