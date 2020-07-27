<template>
  <el-collapse class="me-menu" accordion>
    <el-collapse-item v-for="m in menu" :title="m.name" :key="m.name">
      <!-- <el-tree
                    :data="m.children"
                    :props="{children:'children',label:'name'}"
                    :children="'children'"
                    :label="'name'"
                    accordion>
                <span slot-scope="{ node, data }">
                    <router-link v-if="data.children.length==0" :to="data.url ? data.url:data.name" :title="data.name">
                        <span style="margin-right:5px;"><font-awesome-icon :icon="['fas', 'file-alt']" /></span>
                        {{data.name}}
                    </router-link>
                    <span v-else>{{data.name}}</span>
                </span>
      </el-tree>-->

      <el-tree
        :data="m.children"
        :props="{children:'children',label:'name'}"
        :children="'children'"
        :label="'name'"
        accordion
      >
        <span slot-scope="{ node, data }">
          <span
            v-if="data.length!=0"
            :to="data.url ? data.url:data.name"
            :title="data.name"
            @click="getBtn(data)"
          >
            <span style="margin-right:5px;">
              <font-awesome-icon :icon="['fas', 'file-alt']"/>
            </span>
            {{data.name}}
          </span>
          <span v-else>{{data.name}}</span>
        </span>
      </el-tree>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import TYPE from "../store/storeType";
export default {
  props: {
    menu: {
      default: []
    }
  },
  name: "menu-component",
  data() {
    return {
      // editableTabs:[]
    }
    },
  created() {},
  methods: {
    getBtn(val) {
      // this.$axios.get("permission/findButtonByParent/" + val.id).then(res => {
      //   if (res.data.code == 200) {
      //     this.$store.commit(TYPE.ButtonByParent, res.data.result);
      //     this.$router.push({ path: val.url });
      //   }
      // });
      // let newTabName = ++this.tabIndex + '';
      this.$store.commit(TYPE.editableTabsValue,val.url);
      this.$axios.post('sysResources/getButton',{
        id:val.id
      }).then(res=>{
        if (res.data.code == 200) {
          this.$store.commit(TYPE.ButtonByParent, res.data.data);
          this.$router.push({ path: val.url });
        }
      })
      for (let i = 0; i < this.editableTab.length; i++) {
        if (this.editableTab[i].name == val.url) {
        return
        }
      }
      this.editableTab.push({
        title: val.name,
        name: val.url,
      });
      // this.editableTab.forEach((tab, index) => {
      //   if (tab.name == val.name) {
      //
      //     this.editableTab.push({
      //       title: val.name,
      //       name: val.url,
      //
      //     });
      //   }
      // });

      this.$store.commit(TYPE.editableTabs,this.editableTab);
      // this.$store.commit(TYPE.editableTabsValue,this.editableTabsValue);
      // this.editableTabsValue = newTabName;

    }
  },
  watch: {
    listenDataPkid: function() {}
  },
  computed: {
    listenDataPkid() {
      return this.$route.path;
    },
    editableTab() {
      return this.$store.state.editableTabs
    }
  },
  mounted() {
    if (this.$route.path) {
      this.menu.forEach(val => {
        val.children.forEach(item => {
          if (item.url == this.$route.path) {
            this.editableTab.push({
              title: item.name,
              name: item.url,
            });
            this.$store.commit(TYPE.editableTabs,this.editableTab);
            this.$store.commit(TYPE.editableTabsValue,item.url);
            // this.$axios
            //   .post('sysResources/getButton', {id:item.id})
            //   .then(res => {
            //     console.log('99999988888888',res.data.data)
            //     // if(res.code){
            //     //
            //     //   // this.btns = res.data.result;
            //     // }
            //
            //   });
          }
        });
      });
      // this.getBtn()
    }
  }
};
</script>

<style scoped>
.me-menu {
  height: calc(100% - 5px);
  width: calc(100% - 5px);
}

a,
span {
  font-size: 12px;
  border-radius: 4px;
  color: #1984c8;
  margin: 1px 0 1px 0.16666em;
  padding: 1px 0.3333em 1px 0.25em;
  line-height: 1.3333em;
  text-decoration: none;
  border-style: solid;
  border-width: 1px;
  background-color: transparent;
  border-color: transparent;
}

a.router-link-exact-active,
a.router-link-exact-active span {
  background-color: #1984c8;
  color: white;
  box-shadow: inset 0 0 3px 1px #14699f;
}
</style>
<style>
.me-menu .el-collapse-item__header {
  height: 35px;
  line-height: 35px;
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #dbdbde;
  font-size: 14px;
  padding-left: 20px;
  text-align: left;
  background-color: #f3f3f4;
}
.me-menu .el-collapse-item__arrow {
  line-height: 35px;
}
.me-menu .el-tree-node__content > .el-tree-node__expand-icon {
  padding: 0;
}
.me-menu .el-tree-node__expand-icon.is-leaf {
  display: none;
}
.me-menu .el-tree-node__content {
  padding-left: 10px !important;
}
.me-menu .el-collapse-item__content {
  padding-bottom: 5px;
}
</style>
