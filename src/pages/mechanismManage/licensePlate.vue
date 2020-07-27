<template>
    <div class="licensePlate">
            <M-Table-List>
         <div slot="Info">
        <el-form :inline="true" :model="form" size="mini" >
          <el-form-item label="访客姓名：">
              <el-input v-model.trim="form.organName" 
                       clearable></el-input>
          </el-form-item>
           <el-form-item label="访客手机号：">
              <el-input v-model.trim="form.code" 
                       clearable></el-input>
          </el-form-item>
          <el-form-item label="机构名称：">
              <el-input v-model.trim="form.code" 
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
          
          
          <el-form-item>
            <el-button type="primary" @click="searchData()" icon="el-icon-search">查询</el-button>
          </el-form-item>
          
          <el-form-item label="">
            <el-button type="primary" @click="resetBtn" icon="el-icon-refresh">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="TableDom" v-loading="loading">
        <el-table
          :data="tableData"
          :stripe="true"
          style="width: 100%;"
        >
          <el-table-column prop="reservationCode" label="预约编号" min-width="100" align="center"></el-table-column>
          <el-table-column prop="licensePlate" label="车牌号" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="staffName" label="访客姓名" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="staffTel" label="访客电话" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="reservationReason" label="访问事由" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="peoples" label="预约人数" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="reservationTime" label="预约时间" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="inTime" label="入场时间" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="outTime" label="离场时间" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="orgName" label="机构名称" min-width="120" align="center">
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
    name: 'licensePlate',
/**
 * @typedef {Array}  tableData -表单数据
 * @prop {string} id -id
 * @prop {string} orgName -机构名称
 * @prop {string} outTime -离场时间
 * @prop {string} inTime -进场时间
 * @prop {string} reservationTime -预约时间
 * @prop {string} peoples -预约人数
 * @prop {string} reservationReason -访问事由
 * @prop {string} staffTel -受访者电话
 * @prop {string} staffName -受访者姓名
 * @prop {string} licensePlate -车牌号码
 * @prop {string} reservationCode -预约编号
 */

/**
 * @typedef {object}  form  -查询条件
 * @prop {string} name -访客姓名
 * @prop {string} tel -访客手机号
 * @prop {string} orgName -机构名称
 * @prop {string} inTime -开始时间
 * @prop {string} outTime -结束时间
 */
    data(){
         return {
             time:[],
             pagination: {
                pageNo: 1,
                total: 0,
                pageSize: 10
            },
            multipleSelection: [],
            loading: false,
            form:{
                name:"",
                tel:'',
                orgName:'',
                inTime:'',
                outTime:'',

            },
            tableData:[]
        }
    },
    created(){
      this.getData()
    },
    methods:{
        //获取列表数据
        getData(){
          this.$axios.post('gateCarCatch/findByGateCarCatch',this.form).then(res=>{
                    if(null==res.data.data){
                      this.tableData=[]
                      return
                    }
                    if(200==res.data.code){
                      this.tableData=_.map(res.data.data.list,(e)=>{
                        return{
                          id:e.id,
                          orgName:e.orgName,
                          outTime:this.timestampFormatDate(e.outTime),
                          inTime:this.timestampFormatDate(e.inTime),
                          outCount:e.outCount,
                          peoples:e.peoples,
                          reservationReason:e.reservationReason,
                          reservationTime:this.timestampFormatDate(e.reservationTime),
                          staffTel:e.staffTel,
                          staffName:e.staffName,
                          licensePlate:e.licensePlate,
                          reservationCode:e.reservationCode
                        }
                      })
                    }
          })
        },
        // 时间戳转换时间
        timestampFormatDate(data) {
          var date = new Date(data)
          var Y = date.getFullYear() + '-'
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
          var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
          var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
          var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
          return Y + M + D + h + m + s
        },
        // 更新数据
        onRefresList (msg) {
            this.pagination.pageNo = msg.pageNo
            this.pagination.pageSize = msg.pageSize
            this.getData()
        },
        //查询
        searchData(){
            this.form.inTime=this.time[0]
            this.form.outTime=this.time[1]
            this.getData()            
        },
        //重置
        resetBtn(){
          this.form={
              name:"",
              tel:'',
              orgName:'',
              inTime:'',
              outTime:'',
            }
          this.time=[]
          this.getData()
        },


    }
}
</script>
<style lang='less' scoped>
    .licensePlate{
        .link{
            margin-left: 10px;
        }

    }
</style>
