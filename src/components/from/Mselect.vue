<!--公共下拉选择组件-->
<template>
    <div>
        <el-option v-for="source in sources" :label="source.key" :value="source.value" :key="source.value"></el-option>
    </div>
</template>
<script>
// 引用API
import API from '../../api'
import TYPE from '../../store/storeType'
export default {
    	name: 'Mselect',
  props: ['stype'],
  data () {
        	return {
        		// 下拉列表值
      sources: []
        	}
  },
  methods: {
        	// 请求数据
    getInfo () {
      // 存在缓存数据用缓存数据
      if (this.$manageSessionStorage({type: 'has', text: 'SelectColdeAll'}).isStatus) {
        this.sources = this.getSelectColdeAll(this.stype)
        // console.log()
        return false
      };
      // 请求数据
      this.getSelect()
    },
    getSelectColdeAll (sType, _this) {
      let Value = this.$manageSessionStorage({type: 'get', text: 'SelectColdeAll'}).value
      let data = []
      // console.log(Value.length)
      if (!Value) {
        this.getSelect()
      } else {
        Value.forEach((k, index) => {
          if (sType === k.Code) {
            data = k.rels
            return false
          }
        })
        return data
      }
    },
    getSelect () {
      if (this.listenDataUSER_ID) {
        this.$axios.get(API.COMMON_INFO_SOURCE, {}).then((res) => {
          let data = res.data
          // 将数据存储到sessionStorage中
          this.$manageSessionStorage({type: 'add', text: 'SelectColdeAll', value: data.CodeList})
          this.sources = this.getSelectColdeAll(this.stype)
          // 将用户信息存储到sessionStorage中
          let UserInfo = {
            UserId: data.UserId,
            UserName: data.UserName,
            Carrier: data.Carrier,
            Office: data.Office
          }
          this.$manageSessionStorage({type: 'add', text: 'UserInfo', value: UserInfo})
        })
      }
    }
  },
  mounted () {
    // 发送请求
    this.getInfo()
  },
  computed: {
    // 获取最新数据
    listenDataUSER_ID () {
      return this.$store.state.USER_ID
    }
  },
  watch: {
    // 监听用户信息 改变重新请求数据
    listenDataUSER_ID: function () {
      // 请求下拉选择数据
      this.getSelect()
    }
  }
}
</script>
<style>

</style>
