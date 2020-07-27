<template>
    <div id="dialogTabs">
        <div class="dialog-footer" id="buttonBox"  v-if="showButton">
            <el-button size="mini" type="success" @click="submitInfo('submit')" icon="el-icon-upload2">提交</el-button>
        </div>
        <div class="contentBox">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane name="first" label="基本信息">
                   <slot></slot>
                </el-tab-pane>
                <el-tab-pane name="second" label="审核流程" v-if="pageTabsStatus">
                    <reviewProcessComponent :msgInfo="activeName" @closeDialog="closeDialog" @updateData="updateData"
                                            ref="ApprovalComponent"></reviewProcessComponent>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>

const reviewProcessComponent = () => import(/* webpackChunkName: "qualityResearch" */ '../pages/externalFile/ReviewProcess.vue')// 审核流程
export default {
  name: 'dialogTabs',
  props: {
    showButton: {
      type: Boolean,
      default: true
    }

  },
  components: {
    reviewProcessComponent
  },
  data () {
    return {
      activeName: 'first',
      pageTabsStatus: false
    }
  },
  methods: {
    submitInfo (msg) {
      this.$refs.ApprovalComponent.Btn_Subit_NEW(msg)
    },
    // 关闭弹框
    closeDialog () {
      // 关闭弹框
      this.$emit('closeDialog', {dialogVisible: false})
    },
    updateData () {
      this.$emit('updateData')
    },
    changeStatus () {
      // 审核流程信息
      let processInfo = this.$store.state.REVIEW_PROCESS_INFO
      console.log('22', processInfo);
      (processInfo.PROCESS_ID === null) ? this.pageTabsStatus = false : this.pageTabsStatus = true
      // this.pageTabsStatus=true;
    }
  },
  computed: {
    // 获取最新数据
    listenDataPkid () {
      return this.$store.state.PKID
    }
  },
  watch: {
    // 监听pkid 改变重新请求数据
    listenDataPkid: function () {
      this.changeStatus()
      // 初始化第一个模块显示
      this.activeName = 'first'
    }
  },
  mounted () {
    // 初始化审核流程显示状态
    this.changeStatus()
  }
}
</script>

<style>

</style>
