<template>
    <div class="searchTurnover">
            <M-Table-List>
         <div slot="Info">
        <el-form :inline="true" :model="form" size="mini" >
          <el-form-item label="访客姓名：">
              <el-input v-model.trim="form.wechatUserName" 
                       clearable></el-input>
          </el-form-item>
           <el-form-item label="访客手机号：">
              <el-input v-model.trim="form.wechatUserTel" 
                       clearable></el-input>
          </el-form-item>
          <el-form-item label="受访者姓名：">
              <el-input v-model.trim="form.staffName" 
                       clearable></el-input>
          </el-form-item>
          <el-form-item label="受访者手机号：">
              <el-input v-model.trim="form.staffTel" 
                       clearable></el-input>
          </el-form-item>
          <el-form-item label="访问日期：">
              <el-date-picker
                v-model="time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="searchData()" icon="el-icon-search">查询</el-button>
          </el-form-item>
          
          <el-form-item label="">
            <el-button type="primary" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
     
      <div slot="TableDom" v-loading="loading">
        <div class="header"><span>{{this.title}}  {{timestampFormatDate(this.tableData.inTime)}}-{{timestampFormatDate(this.tableData.outTime)}}  进出流水详情</span></div> 
        <el-table
          :data="tableData"
          :stripe="true"
          style="width: 100%;"
         
        >
          <el-table-column prop="wechatUserName" label="访客姓名" min-width="100" align="center"></el-table-column>
          <el-table-column prop="wechatUserTel" label="访客手机号" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="staffName" label="受访者姓名" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="staffTel" label="受访者手机号" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="inType" label="进出场方式" min-width="120" align="center">
             <template slot-scope="scope">
               {{scope.row.inType==1?'刷脸':'预约码'}}
             </template>
          </el-table-column>
          <el-table-column prop="inTime" label="进场时间" min-width="120" align="center">
             <template slot-scope="scope">
               {{timestampFormatDate(scope.row.inTime)}}
             </template>
          </el-table-column>
          <el-table-column prop="outTime" label="出场时间" min-width="120" align="center">
             <template slot-scope="scope">
               {{timestampFormatDate(scope.row.outTime)}}
             </template>
          </el-table-column>
          <el-table-column prop="isEx" label="访问异常" min-width="120" align="center">
            <template slot-scope="scope">
               {{scope.row.inType==1?'异常':'正常'}}
             </template>
          </el-table-column>
          <el-table-column prop="inGateName" label="进校门禁设备" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="outGateName" label="离校门禁设备" min-width="120" align="center">
          </el-table-column>
          
        </el-table>
      </div>
      <div slot="Pagination">
        <pagination-Common @refreshList="onRefresList" :msg="pagination"></pagination-Common>
      </div>
      
    </M-Table-List>
    <div class="footer"><span>总计：进校次数 ：{{this.pageData.inCount}} ，出校次数：{{this.pageData.outCount}} ，异常次数：{{this.pageData.exCount}}</span></div>
      </div>
</template>

<script>
import {cloneDeep} from "lodash";
import paginationCommon from '~/components/Pagination.vue'

export default {
    components: {paginationCommon},
    
    name: 'searchTurnover',
/**
 * @typedef {Array}  tableData -表单数据
 * @prop {string} id -id
 * @prop {string} wechatUserName -访客姓名
 * @prop {string} wechatUserTel -访客手机号
 * @prop {string} staffName -受访者姓名
 * @prop {string} staffTel -受访者手机号
 * @prop {string} wechatUserName -进出场方式
 * @prop {string} startDate -访问事项
 * @prop {string} endDate -进场时间
 * @prop {string} wechatUserTel -出场时间
 * @prop {string} staffName -访问异常
 * @prop {string} staffTel -进校门禁设备
 * @prop {string} startDate -离校门禁设备
 */

/**
 * @typedef {object}  form  -查询条件
 * @prop {string} wechatUserName -访客姓名
 * @prop {string} wechatUserTel -访客手机号
 * @prop {string} staffName -受访者姓名
 * @prop {string} staffTel -受访者手机号
 * @prop {string} startDate -开始日期
 * @prop {string} endDate -结束日期
 */
    data(){
         return {
           title:'',
            time:[],
            pagination: {
                pageNo: 1,
                total: 0,
                pageSize: 10
            },
            // multipleSelection: [],
            loading: false,
            form:{
                organId:'',
                wechatUserName:"",
                wechatUserTel:'',
                staffName:'',
                staffTel:'',
                startDate:'',
                endDate:'',
            },
            tableData:[
                {
                    id:'',
                    organName:'机构名称',
                    organCode:'所属机构',
                    category:'机构类别',
                    inCount:'进校次数',
                    outCount:'出校次数',
                    exCount:'访问异常数',
                }
            ],
            pageData:{
              id:1,
              organName: "",
              organCode: "",
              inCount: "",
              outCount: null,
              exCount: null


            }
        }
    },
    created(){
      this.form.organId=this.$route.query.id
      this.title=this.$route.query.title
      this.getData()
      this.getPageData()
    },
    methods:{
       // 时间戳转换时间
        timestampFormatDate(data) {
          if(!data){
            return
          }
          var date = new Date(data)
          var Y = date.getFullYear() + '-'
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
          var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
          var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
          var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
          return Y + M + D + h + m + s
        },
        // 获取页面数据
        getPageData(){
          this.$axios.post('baseVisitorReservation/findInOutExCount',this.form).then(res => {
              console.log(res)
          
            if (200 == res.data.code) {
              this.pagination.total = res.data.data.count * 1;
              this.pageData = res.data.data;
            }
          });
        },
        // 获取列表数据
        getData(){
                this.$axios.post('baseVisitorReservation/findVisitorReservationById',this.form).then(res => {
              console.log(res)
            if(null==res.data.data){
              this.tableData = [];
            }
            if (200 == res.data.code) {
              this.pagination.total = res.data.data.count * 1;
              this.tableData = res.data.data.list;
            } else {
              this.tableData = [];
            }
          });
        },
        judgeSyncStatus(e) {
        switch (e) {
        case 1:
            return "未同步";
        case 2:
            return "已同步";
        case 3:
            return "同步失败";
        
        default:
            return "未知状态";
        }
    },
        // 更新数据
        onRefresList (msg) {
            this.pagination.pageNo = msg.pageNo
            this.pagination.pageSize = msg.pageSize
            this.getData()
        },
        //查询
        searchData(){
            this.form.startDate=this.time[0]
            this.form.endDate=this.time[1]
            this.getData()

        },
        //重置
        resetBtn(){
          this.form. wechatUserName=""
          this.form. wechatUserTel=""
          this.form. staffName=""
          this.form. staffTel=""
          this.form. startDate=""
          this.form. endDate=""
          this.form. wechatUserName=""
          this.time=[]
          this.getData()
        },

        //新增
        details(row){
             this.$router.push({name:'searchTurnover'})
        },

    }
}
</script>
<style lang='less' scoped>
    .searchTurnover{
        .header{
            display: flex;
            font-size: 20px;
            font-weight: 600;
        }
        .footer{
            display: flex;
        }

    }
</style>
