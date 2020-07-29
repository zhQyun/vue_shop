<template>
    <div class="menuMangage">
            
            <div class="title">菜单设置</div>
            <el-divider></el-divider>
            <div class="tips">
                <h1 style="margin-left: -52px;">XXXXXX公众号</h1> 
                <div class="tips-list"> <span style="margin-left: -52px;">*须知：</span> 1.  自定义菜单最多包括3个一级菜单，每个一级菜单最多包含5个二级菜单</div>
                <div class="tips-list"> 2.   一级菜单最多4个汉字，二级菜单最多7个汉字，多出来的部分将会以“...”代替</div>
                <div class="tips-list">3.   创建自定义菜单后，菜单的刷新策略是，在用户进入公众号会话页或公众号profile页时，如果发现上一次拉取菜单的请求在5分钟以前，</div> 
                <div class="tips-list">就会拉取一下菜单，如果菜单有更新，就会刷新客户端的菜单。测试时可以尝试取消关注公众账号后再次关注，则可以看到创建后的效果。</div>   
            </div>
                <div class="table">
                    <el-button plain @click="addFirstMenu()">添加一级菜单</el-button>
                        <div class="menu" v-for='(item,index) in table' :key="index">
                            <div class="first-list">
                                <span class="lable">一级菜单：</span> 
                                <el-input v-model="item.name"  class="input"  :maxlength=4></el-input>

                                <span class="lable">链接：</span> 
                                <el-input v-model="item.url" class="input" ></el-input>
                                <el-button type="text">清空</el-button>
                                <el-button plain class="btn" @click="addSecondMenu(index)">添加二级菜单</el-button>
                                <el-button class="btn" type="danger" icon="el-icon-delete" @click="deleteFirstMenu(index)" circle></el-button>
                                 <div class="second-list" v-for=" (e,serial) in item.children" :key="serial">
                                <span class="lable">二级菜单：</span> 
                                <el-input v-model="e.name"  class="input" ></el-input>

                                <span class="lable">链接：</span> 
                                <el-input v-model="e.url" class="input" ></el-input>
                                <el-button type="text">清空</el-button>
                                <el-button class="btn" type="danger" icon="el-icon-delete" @click="deleteSecondMenu(index,serial)" circle></el-button>
                            </div>
                            </div>
                            <el-divider></el-divider>    

                           
                        </div>
                </div>
                <div class="footBtn">
                    <el-row>
                        <el-button type="primary" round @click="save">保存配置</el-button>
                        <el-button  round>取消</el-button>
                    </el-row>
                </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            >
            <el-form :model="ruleForm"   ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号:" prop="logo">
                    <el-input v-model="ruleForm.name" style="width:194px"></el-input>
                    <el-button plain class="btn">验证手机号</el-button>
                </el-form-item>
                <el-form-item label="验证码:" prop="logo">
                    <el-input v-model="ruleForm.name" style="width:300px"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
      </div>
</template>

<script>
import _ from "lodash";
import Vue from 'vue'

export default {
    name: 'menuMangage',
/**
 * @typedef {Array}  tableData -表单数据
 * @prop {string} id -id
 * @prop {string} code -机构编号
 * @prop {string} organName -所属机构
 * @prop {string} count -闸机数
 */

/**
 * @typedef {object}  form  -查询条件
 * @prop {integer} app_type -公众号类型
 * @prop {string} name -公众号名称
 * @prop {integer} state -公众号状态
 * 
 */
    data(){
         return {
            dialogVisible:false,
            ruleForm:{
                name:''
            },
            table:[
                {                    // 一条对象就对应一个父菜单
                    name:'name',
                    url:'url',
                    children:[      // 对应子菜单
                        {
                            name:'111',
                            url:'222'
                        }
                    ]
                },
                {                    // 一条对象就对应一个父菜单
                    name:'name',
                    url:'url',
                    children:[      // 对应子菜单
                        {
                            name:'111',
                            url:'222'
                        }
                    ]
                }
            ]
        }
    },
    created(){
        // this.getData()
    },
    methods:{
        // 
        addFirstMenu(index){
            let item ={
                name:'',
                url:'',
                children:[]
            }
            this.table.push(item)
        },
        // 添加二级菜单
        addSecondMenu(index){
            console.log(index)
            let item ={
                name:'',
                url:''
            }
            this.table[index].children.push(item)
        },
        // 删除一级菜单
        deleteFirstMenu(index){
            Vue.nextTick(() => {
            this.table.splice(index,1);
            })
        },
        // 删除二级菜单
        deleteSecondMenu(index,serial){            
            Vue.nextTick(() => {
            this.table[index].children.splice(serial,1)
            })
        },
        // 保存配置
        save(){
            this.dialogVisible=true
        },
        // 获取列表信息
        getData(){
          this.$axios.post('',this.form).then(res=>{
                if(200==res.data.code){
                    // this.pagination.total = res.data.data.count * 1;
                    // this.tableData = res.data.data.list;
                }
          })
        },
       
    }
}
</script>
<style lang='less' scoped>
    *{
        text-align: initial;
    }
    .menuMangage{
        .title{
            margin: 15px 15px 0 15px;
        }
        .tips{
            margin-left: 150px;
            .tips-list{
                color: red;
            }
        }
        .table{
            width: 1100px;
            margin-left: 150px;
            margin-top: 23px;
            .menu{
                .lable{
                    margin: 10px 5px 10px 10px;
                }
                .input{
                    width: 300px;
                }
                .first-list{
                    margin: 10px 0;
                }
                .btn{
                    margin-left: 50px;
                }
            }
        }
        .footBtn{
            margin-left: 740px;
            margin-top: 23px;
        }
        .link{
            margin-left: 10px;
        }
        .dialog-footer{
            display: flex;
            // flex-direction: ;
            justify-content: center;
        }
        .second-list{
            margin: 10px 0;
        }

    }
</style>
