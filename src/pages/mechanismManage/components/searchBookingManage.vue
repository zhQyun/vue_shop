<template>
    <div class="searchBookingManage">
            <M-Table-List>
         <div slot="Info">
        <el-form :inline="true" :model="form" size="mini" >
          <el-form-item label="访客姓名：">
              <el-input v-model.trim="form.WechatUserName" 
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
          <el-form-item label="访问时间：">
              <el-date-picker
              v-model="time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
           <el-form-item label="是否签到：">
               <el-select v-model="form.isSign" placeholder="全部">
                        <el-option
                        v-for="item in isSignOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
          </el-form-item>
           <el-form-item label="状态：">
              <el-select v-model="form.status" placeholder="全部">
                        <el-option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
          </el-form-item>
           <el-form-item label="是否已同步：">
              <el-select v-model="form.syncStatus" placeholder="全部">
                        <el-option
                        v-for="item in syncStatusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
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
            <el-button type="success" @click="batchSync" >同步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom" v-loading="loading">
        <div class="header"><span>{{this.title}}  {{timestampFormatDate(this.tableData.inTime)}}-{{timestampFormatDate(this.tableData.outTime)}}  进出流水详情</span></div> 
        <el-table
          :data="tableData"
          :stripe="true"
          style="width: 100%;"
          @selection-change="handleSelectionChange"  
         
        >
          <el-table-column prop="inCode" label="预约编号" min-width="100" align="center"></el-table-column>
          <el-table-column prop="wechatUserName" label="访客姓名" min-width="100" align="center"></el-table-column>
          <el-table-column prop="wechatUserTel" label="访客手机号" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="staffName" label="受访者姓名" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="staffTel" label="受访者手机号" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="inType" label="进校方式" min-width="120" align="center">
          </el-table-column>
           <el-table-column prop="reservationTime" label="预约时间" min-width="120" align="center">
             <template slot-scope="scope">
                {{timestampFormatDate(scope.row.reservationTime)}}
            </template>
          </el-table-column>
           <el-table-column prop="reservationReason" label="访问事项" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="isSign" label="是否签到" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="isSync" label="同步状态" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="syncTime" label="最后同步时间" min-width="120" align="center">
             <template slot-scope="scope">
                {{timestampFormatDate(scope.row.syncTime)}}
            </template>
          </el-table-column>
          
          <el-table-column label="操作"  width="450">
            <template slot-scope="scope">
                <el-link type="primary" class="link" @click="sync(scope.row)" >同步</el-link>
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
import _ from "lodash";
import paginationCommon from '~/components/Pagination.vue'

export default {
    components: {paginationCommon},
    name: 'searchBookingManage',
/**
 * @typedef {Array}  tableData -表单数据
 * @prop {string} id -id
 * @prop {string} inCode -预约编号
 * @prop {string} wechatUserName -访客姓名
 * @prop {string} wechatUserTel -访客手机号
 * @prop {string} staffName -受访者姓名
 * @prop {string} staffTel -受访者手机号
 * @prop {string} inType -进校方式
 * @prop {string} reservationTime -预约时间
 * @prop {string} reservationReason -访问事项
 * @prop {string} status -状态
 * @prop {string} isSign -是否签到
 * @prop {string} inTime -签到时间
 * @prop {string} isSync -同步状态
 * @prop {string} syncTime -最后同步时间
 */

/**
 * @typedef {object}  form  -查询条件
 * @prop {string} WechatUserName -访客姓名
 * @prop {string} wechatUserTel -访客电话
 * @prop {string} staffName -受访者姓名
 * @prop {string} staffTel -受访者电话
 * @prop {string} isSign -所在区域
 * @prop {string} status -是否签到
 * @prop {string} syncStatus -是否同步
 * @prop {string} startDate -访问开始时间
 * @prop {string} endDate -访问结束时间
 */
    data(){
         return {
        title:'',
        isSignOptions: [{  //登陆状态
          value: 1,
          label: '是'
        }, {
          value: 0,
          label: '否'
        }],

         statusOptions: [{ //审批状态
          value: 1,
          label: '审批中'
        }, {
          value: 0,
          label: '审批通过'
        }
        ],

         syncStatusOptions: [{    //同步状态
          value: 1,
          label: '是'
        }, {
          value: 0,
          label: '否'
        }],
        time:'',
        pagination: {
                pageNo: 1,
                total: 0,
                pageSize: 10
            },
        multipleSelection: [],
        loading: false,
        form:{
                organName:"",
                code:'',
                province:'',
                city:'',
                area:'',

            },
            tableData:[
                // {
                //     id:'',
                //     organName:'机构编号',
                //     organCode:'所属机构',
                //     organAddress:'机构地址',
                //     yesterdayCount:'昨日预约数',
                //     tomorrowCount:'今日预约数',
                //     todayCount:'明日预约数',
                //     todayCount:'最后同步时间',
                //     syncState:'同步状态',
                   
                // }
            ]
        }
    },
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
    created(){
        let id=_.cloneDeep(this.$route.query.id)
        this.title=this.$route.query.title
        this.form.organId=id
        this.getData()
    },
    methods:{
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        // 获取列表数据
        getData(){
          this.$axios.post('baseVisitorReservation/findVisitorReservationById',this.form).then(res=>{
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
            let parameter=_.cloneDeep(this.form)
            parameter.startDate=this.time[0]
            parameter.endDate=this.time[1]
            console.log(parameter)
            
        },
        //重置
        resetBtn(){
          this.form.organName=""
          this.form.code=""
          this.form.province=""
          this.form.city=""
          this.form.area=""

        },
        //批量同步
        batchSync(){
          this.multipleSelection
          let id =[]
          id=_.map(this.multipleSelection,(e)=>{
            return e.id
              
          })
          this.$axios.post('baseVisitorReservation/batchSync',{batchSync:id}).then(res=>{
            if(200==res.data.code){
              this.getData()
                    this.$message({
                        message: '同步成功',
                        type: 'success'
                      });
            }
          })
        },
        //同步
        sync(row){
              this.$axios.post('baseVisitorReservation/batchSync',{id:row.id}).then(res=>{
            if(200==res.data.code){
              this.getData()
                    this.$message({
                        message: '同步成功',
                        type: 'success'
                      });
            }
          })
        },

    }
}
</script>
<style lang='less' scoped>
    .searchBookingManage{
        .link{
            margin-left: 10px;
        }
        .header{
            display: flex;
            font-size: 20px;
            font-weight: 600;
        }

    }
</style>
