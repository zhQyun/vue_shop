<template>
    <div>
        <el-autocomplete
                style="width:100%;"
                v-model="input"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
        ></el-autocomplete>
    </div>
</template>

<script>

export default {
  data () {
    return {
      input: '',
      timeout: null,
      restaurants: []
    }
  },
  props: ['msg'],
  methods: {
    querySearchAsync (queryString, cb) {
      let restaurants = this.restaurants
      let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      this.input = item.value
      this.$emit('getValue', this.input)
    },
    deleteInfo () {
      this.input = ''
    }
  },
  created () {
    this.restaurants = this.msg.OPTIONS
  },
  computed: {
    returnINPUT () {
      return this.msg.INPUT
    },
    returnOPTIONS () {
      return this.msg.OPTIONS
    }
  },
  watch: {
    returnINPUT () {
      if (this.msg.INPUT) {
        this.input = this.msg.INPUT
      }
    },
    returnOPTIONS () {
      this.restaurants = this.msg.OPTIONS
    },
    input () {
      this.$emit('getValue', this.input)
    }
  }

}
</script>

<style>

</style>
