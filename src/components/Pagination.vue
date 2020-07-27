<template>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="msg.pageNo"
            :page-sizes="pageSize"
            :page-size="msg.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="msg.total">
    </el-pagination>
</template>

<script>
import API from '../api'

export default {
  name: 'pagination',
  data () {
    return {
      // pageSize: API.PAGE_SIZE
      pageSize: [10,50,100]
    }
  },
  props: ['msg'],
  methods: {
    handleSizeChange (val) {
      this.msg.pageSize = val
      this.$emit('refreshList', this.msg)
    },
    handleCurrentChange (val) {
      this.msg.pageNo = val
      this.$emit('refreshList', this.msg)
    }
  }
}
</script>

<style>

</style>
