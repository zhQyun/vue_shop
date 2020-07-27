<template>
    <div class="turnover">
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
          <el-table-column prop="organCode" label="机构编号" min-width="100" align="center"></el-table-column>
          <el-table-column prop="organName" label="所属机构" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="inCount" label="进校次数" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="outCount" label="出校次数" min-width="120" align="center">
          </el-table-column>
          <el-table-column prop="exCount" label="访问异常数" min-width="120" align="center">
          </el-table-column>
          <el-table-column label="操作"  width="450">
            <template slot-scope="scope">
                <el-link type="primary" class="link" @click="details(scope.row)" >查看详情</el-link>
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
    name: 'turnover',
/**
 * @typedef {Array}  tableData -表单数据
 * @prop {string} id -id
 * @prop {string} organName -所属机构
 * @prop {string} organCode -机构编号
 * @prop {string} inCount -进校次数
 * @prop {string} outCount -出校次数
 * @prop {string} exCount -访问异常数
 */

/**
 * @typedef {object}  form  -查询条件
 * @prop {string} organName -机构名称
 * @prop {string} code -机构编码
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
                organName:"",
                code:'',
            },
            tableData:[
                // {
                //     id:'',
                //     organName:'所属机构',
                //     organCode:'机构编号',
                //     category:'机构类别',
                //     inCount:'进校次数',
                //     outCount:'出校次数',
                //     exCount:'访问异常数',
                // }
            ]
        }
    },
    created(){
      this.getData()
    },
    methods:{
        // 获取列表
        getData(){
           this.$axios.post('baseVisitorReservation/findVisitorReservation',this.form).then(res => {
          console.log(res)
        if (200 == res.data.code) {
          this.pagination.total = res.data.data.count * 1;
          this.tableData = res.data.data.list;
        } else {
          this.tableData = [];
        }
      });
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
           this.form={
                organName:"",
                code:'',
            },
          this.getData()
        },

        //查看详情
        details(row){
             this.$router.push({name:'searchTurnover',query: {id:row.id,title:row.organName}})
        },

    }
}
</script>
<style lang='less' scoped>
    .turnover{
        .link{
            margin-left: 10px;
        }

    }
</style>
