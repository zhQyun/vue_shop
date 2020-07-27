<template>
    <div class="sIedit">
        <div class="InfoBox tableHeadBg">
            <div class="float-left">
                <slot name="Info"></slot>
            </div>
        </div>
        <div class="JwTable" :style="{height:returnSheight}">
            <slot name="TableDom"></slot>
        </div>
        <div class="pagination">
            <slot name="Pagination"></slot>
        </div>
        <slot name="Dialog"></slot>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      sHeight: '0px'
    }
  },
  props: ['msg'],
  methods: {
    // 计算高度
    sHeightJs () {
      let sIeditH = document.documentElement.clientHeight
      let formH = document.getElementsByClassName('InfoBox')[0].offsetHeight
      let footerPageHeight = 37
      if (this.msg != undefined) {
        if (this.msg.footerPage == false) { footerPageHeight = 0 }
        if (this.msg.cHeight != undefined) { footerPageHeight = -this.msg.cHeight }
        if (this.msg.formH != undefined) { formH = this.msg.formH }
      }
      this.sHeight = (sIeditH - formH - (112 + footerPageHeight)) + 'px'
    }
  },
  computed: {
    returnSheight () {
      return this.sHeight
    }
  },
  mounted () {
    this.sHeightJs()
    const that = this
    window.onresize = () => {
      return that.sHeightJs()
    }
  },
  updated () {
    setTimeout(() => { this.sHeightJs() }, 300)
  },
  watch: {
    sHeight (val) {
      if (!this.timer) {
        this.sHeight = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  }
}
</script>

<style>
    .InfoBox {
        overflow: hidden;
        padding: 5px;
    }

    .itemRight {
        text-align: right;
    }

    .itemInLine > div {
        display: inline-block;
    }

    .JwTable>div{height:100%;}
    .el-table--border, .el-table--group{
        border-top: 1px solid #dbdbde
    }
</style>
