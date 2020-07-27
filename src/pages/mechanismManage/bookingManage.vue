<template>
    <div class="interviewee">
            <M-Table-List>
         <div slot="Info">
        <el-form :inline="true" :model="form" size="mini" >
          <el-form-item label="机构名称：">
              <el-input v-model.trim="form.organName" 
                       clearable></el-input>
          </el-form-item>
           <el-form-item label="机构编码：">
              <el-input v-model.trim="form.code" 
                       clearable></el-input>
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
          <el-table-column prop="number" label="序号" min-width="100" align="center"></el-table-column>
          <el-table-column prop="organName" label="机构名称" min-width="100" align="center"></el-table-column>
          <el-table-column prop="organCode" label="机构编号" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="organAddress" label="机构地址" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="yesterdayCount" label="昨日预约数" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="todayCount" label="今日预约数" min-width="120" align="center">
          </el-table-column>
           <el-table-column prop="tomorrowCount" label="明日预约数" min-width="120" align="center">
          </el-table-column>
           <el-table-column prop="sync" label="最后同步时间" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="syncState" label="同步状态" min-width="120" align="center">
            <template slot-scope="scope">
              {{1==scope.row.syncState?'已同步':'未同步'}}
            </template>
          </el-table-column>
          
          <el-table-column label="操作"  width="450">
            <template slot-scope="scope">
                <el-link type="primary" class="link" @click="details(scope.row)" >查看详情</el-link>
                <el-link type="primary" class="link" @click="sync(scope.row)" >一键同步</el-link>
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
    name: 'interviewee',
/**
 * @typedef {Array}  tableData -表单数据
 * @prop {string} id -id
 * @prop {string} organName -机构名称
 * @prop {string} organCode -机构编号
 * @prop {string} organAddress -机构地址
 * @prop {string} yesterdayCount -昨日预约数
 * @prop {string} tomorrowCount -今日预约数
 * @prop {string} todayCount -最后同步时间
 * @prop {string} syncState -同步状态
 */

/**
 * @typedef {object}  form  -查询条件
 * @prop {string} organName -机构名称
 * @prop {string} code -机构编码
 * @prop {string} province -所在省份
 * @prop {string} city -所在城市
 * @prop {string} area -所在区域
 */
    data(){
         return {
             pagination: {
                pageNo: 1,
                total: 0,
                pageSize: 10
            },
            multipleSelection: [],
            loading: false,
            form:{
                organName:"郑德良",
                code:'',
                province:'',
                city:'',
                area:'',

            },
            tableData:[{
                "organName": "熙重第一小学",
                "organCode": "1",
                "organAddress": "湖北省武汉市集美区",
                "yesterdayCount": 0,
                "sync": "2020-06-26 09:11:06",
                "syncState": 1,
                "tomorrowCount": 0,
                "todayCount": 0
            }
]
        }
    },
    created(){
        this.getData()
    },
    methods:{
        // 获取列表数据
        // getData(){
        //   this.$axios.post('baseVisitorReservation/findOrganInfo',this.form).then(res=>{
        //     if(200==res.data.code){
        //       this.pagination.total = res.data.data.count * 1;
        //       this.tableData=res.data.data.list
        //     }else{
        //       this.tableData=[]
        //     }
        //   })
        // },
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
          this.form={
             organName:"",
             code:'',
             province:'',
             city:'',
             area:'',
          }
          this.getData()
        },

        //查看详情
        details(row){
             this.$router.push({name:'searchBookingManage',query:{id:row.id,title:row.organName}})
        },
        //一键同步
        sync(row){
          this.$axios.post('baseVisitorReservation/syncByOrganId',{organId:row.id}).then(res=>{
                if(200==res.data.code){
                  this.getData()
                  this.$message({
                    message: '一键同步',
                    type: 'success'
                  });
                }
            })

        },

    }
}
</script>
<style lang='less' scoped>
    .interviewee{
        .link{
            margin-left: 10px;
        }

    }
</style>
