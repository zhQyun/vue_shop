<template>
    <div id="dialogTabs">
        <div class="dialog-footer" id="buttonBox" v-if="showButton">
            <el-button size="mini" type="danger" @click="deleteInfo()" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="primary" @click="Update('tempsave')" icon="el-icon-document">保存</el-button>
            <el-button size="mini" type="success" @click="submitInfo('submit')" icon="el-icon-upload2">提交</el-button>

        </div>
        <div class="contentBox">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane name="first" label="基本信息">
                    <slot></slot>
                </el-tab-pane>

            </el-tabs>
        </div>
    </div>
</template>

<script>
// const EditComponent = () => import(/* webpackChunkName: "securityInformation" */ './Edit.vue');//编辑
// const reviewProcessComponent = () => import(/* webpackChunkName: "securityInformation" */ '../../externalFile/ReviewProcess.vue');//审核流程
export default {
  name: 'dialogTabs',
  props: {
    showButton: {
      type: Boolean,
      default: true
    }

  },
  components: {},
  data () {
    return {
      activeName: 'first',
      pageTabsStatus: false,
      show: true
    }
  },
  methods: {
    Update (msg) {
      this.$emit('Update', msg)
    },
    submitInfo (msg) {
      this.$emit('submitInfo', msg)
    },
    // 删除
    deleteInfo () {
      this.$emit('deleteInfo')
    },
    // 关闭弹框
    closeDialog () {
      this.$emit('closeDialog', {dialogVisible: false})
    },
    updateData () {
      this.$emit('updateData')
    }

  }

}
</script>

<style>

</style>
