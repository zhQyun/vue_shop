<template>
    <div class="MselectPerson">
        <el-input v-model="input"  readonly :title="input" placeholder="请选择处室" >
            <template slot="append"><div class="selectInfoBox" @click="onChange">选择</div></template>
        </el-input>
        <M-Dialog :msg.sync="dialogInfo">
            <M-Table-List :msg="{cHeight:15,formH:83}">
                <div slot="Info">
                        <el-form-item class="float-right">
                            <el-button type="primary" @click="submitInfo" icon="el-icon-document">确定</el-button>
                        </el-form-item>
                </div>
                <div slot="TableDom">
                    <el-form-item >
                        <el-tree style="height: 600px;overflow: auto"
                                :data="options"
                                show-checkbox
                                node-key="value"
                                :props="defaultProps"
                                :check-strictly="true"
                                ref="tree"
                                :default-expanded-keys="expanded_keys"
                                :default-checked-keys="checked_keys"
                        >
                        </el-tree>
                    </el-form-item>
                </div>

            </M-Table-List>
        </M-Dialog>
    </div>
</template>

<script>
import API from '../../api'
export default {
  name: 'Mtree',
  props: ['office'],
  data () {
    return {
      input: '',
      dialogInfo: {}, // 弹出框信息
      options: [],
      expanded_keys: [],
      checked_keys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
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
    onChange () {
      this.dialogInfo = {
        width: '60%',
        title: '选择处室',
        dialogVisible: true
      }
    },
    submitInfo: function () {
      let node_arr = []
      this.$refs.tree.getCheckedNodes().forEach(key => {
        node_arr.push(key.label)
      })
      let objInfo = node_arr.join(',')
      this.input = objInfo
      this.$emit('getApplyOffice', objInfo)
      this.dialogInfo = {dialogVisible: false}
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
    clearInfo () {
      this.input = ''
    },
    initData () {
      if (this.office) {
        this.input = this.office
        this.expanded_keys = this.office.split(',')
        this.checked_keys = this.office.split(',')
      } else {
        this.clearInfo()
      }
    }
  },
  created () {
    // 发送请求
    this.getInfo()
    // this.expanded_keys=this.office.split(",");
  },
  watch: {
    'office' () {
      this.initData()
    }
  }
}
</script>

<style scoped>
    .selectInfoBox{cursor:pointer;padding:0 20px;}
</style>
