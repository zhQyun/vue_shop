<template>
    <div class="elCascader">
    <el-cascader
            placeholder="申请处室"
            :options="options"
            filterable
            separator="_"
            v-model="value"
            change-on-select
            @change="ApplyOffice"
            :disabled="disabled"
            clearable
    ></el-cascader></div>
</template>

<script>
// 引用API
import API from '../../api'
export default {
  name: 'MCascader',
  props: ['office', 'disabled'],
  data () {
    return {
      value: [],
      options: []

    }
  },
  methods: {
    // 申请处室信息处理
    ApplyOffice () {
      this.$emit('getApplyOffice', this.value.join('_'))
    },
    getInfo () {
      // 存在缓存数据用缓存数据
      if (this.$manageSessionStorage({type: 'has', text: 'ApplyOffice'}).isStatus) {
        this.options = this.Fliter(this.$manageSessionStorage({type: 'get', text: 'ApplyOffice'}).value)
        return false
      }
      // 请求数据
      this.$axios.get(API.COMMON_APPLY_OFFICE, {}).then((res) => {
        // 将数据存储到sessionStorage中
        this.$manageSessionStorage({type: 'add', text: 'ApplyOffice', value: res.data.rows})
        this.options = this.Fliter(this.$manageSessionStorage({type: 'get', text: 'ApplyOffice'}).value)
      })
    },
    clearInfo () {
      this.value = []
    },
    Fliter (data) {
      var i = 0
      var OD = data
      while (i < OD.length) {
        if (OD[i].children == '') {
          delete OD[i].children
        } else {
          this.Fliter(OD[i].children)
        }
        i++
      }
      return data
    },
    initData () {
      if (this.office) {
        this.value = this.office.split('_')
      } else {
        this.clearInfo()
      }
    }

  },
  created () {
    // 发送请求
    this.getInfo()
    this.initData()
  },
  watch: {
    'office' () {
      this.initData()
    }
  }
}
</script>

<style>
.el-cascader-menu__item{font-size: 12px !important;}
.el-cascader{width:100%}
</style>
