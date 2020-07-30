<template>
  <el-container id="app">
    <el-header id="app-header" style="height:50px;line-height: 50px;">
      <div id="app-header-system" style="">
        <!--<img src="../assets/img/xal-logo.png" style="height:50px;width:170px;"/>-->
        <span style="">校园安全综合管理系统</span>
      </div>
      <div id="app-header-user">
        <ul>
          <li class="name">
            <div>
              欢迎您：
              <i class="el-icon-s-custom"></i>
              {{userInfo.LoginName}}
            </div>
          </li>
          <!-- <li class="headLiBox">
            <router-link :to="{name:'/'}">
              <img src="../assets/img/home.png">
            </router-link>
          </li>
          <li class="headLiBox">
            <img src="../assets/img/help.png">
          </li> -->
          <!-- <li class="headLiBox">
            <el-dropdown size="mini">
              <span class="el-dropdown-link">
                <img src="../assets/img/setting.png">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>界面布局设置</el-dropdown-item>
                <el-dropdown-item>选项</el-dropdown-item>
                <el-dropdown-item>帮助</el-dropdown-item>
                <el-dropdown-item  @click.native="cancelInfo">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li> -->
          <!-- <li class="headLiBox"  @click="perClear">清除缓存

          </li>  | -->

          <li class="headLiBox" @click="clearTab">
            清除tab 
          </li>
          <li class="headLiBox" @click="cancelInfo">
            <i class="el-icon-switch-button"></i>
            注销
          </li>
          <!-- <li>
            <el-select v-model="CarrierValue" placeholder="请选择" class="cairrBox">
              <el-option
                v-for="item in userInfo.Carrier"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li> -->

        </ul>
      </div>
    </el-header>
    <el-container>
      <el-aside id="app-aside">
        <div id="myMeau">
          <menu-component :menu="this.user.menuList"></menu-component>
        </div>
      </el-aside>
      <el-main id="app-main">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab"   @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="index"
            :label="item.title"
            :name="item.name"
          >

          </el-tab-pane>
        </el-tabs>
        <transition name="el-fade-in-linear">

          <router-view style="height:92%"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Vue from "vue";
import MenuComponent from "~/components/MenuComponent.vue";
import ssoutil from "../components/ssoutil";
import utils from "../components/utils";
// storeType
import TYPE from "../store/storeType";
// 引用API
import API from "../api";

export default {
  components: { MenuComponent },
  data () {
    return {
      editableTabsValue: '',
      editableTabs: [],
      user: {
        mfId: "",
        menuList: [
           
          { name: "首页", url: "", children: [ {
              name: "首页",
              url: "/",
              children: []
            }] },
          {
            name: "数据查询",
            url: "",
            children: [
              {
                name: "学校进出记录",
                url: "/schoolTurnoverQuery",
                children: []
              },
              { name: "宿舍进出记录", url: "/dormTurnoverQuery", children: [] }
            ]
          },
          {
            name: "访客管理",
            url: "",
            children: [
              { name: "访客管理", url: "/visitor_management", children: [] },
              { name: "访客预约", url: "/visitor_appointment", children: [] }
            ]
          },
          {
            name: "请假管理",
            url: "",
            children: [{ name: "请假审核", url: "/leaveAudit", children: [] }]
          },
          {
            name: "宿舍管理",
            url: "",
            children: [
              { name: "宿舍信息管理", url: "/hostelNews", children: [] },
              { name: "住宿学生管理", url: "/stayStudent", children: [] }
            ]
          },
          {
            name: "基础信息管理",
            url: "",
            children: [
              { name: "年级管理", url: "/gradeManage", children: [] },
              { name: "班级管理", url: "/classManage", children: [] },
              { name: "硬件管理", url: "/hardwareManage", children: [] },
              { name: "阀值管理", url: "/thresholdManage", children: [] },
              { name: "推送管理", url: "/pushManage", children: [] }
            ]
          },
          { name: "系统管理", url: "", children: [
              { name: "用户管理", url: "/userManage", children: [] },
              { name: "角色管理", url: "/roleManage", children: [] },
              { name: "资源管理", url: "/resourceManage", children: [] },
              { name: "日志查看", url: "/operationLog", children: [] },
              { name: "部门管理", url: "/departmentManage", children: [] },
              { name: "数据字典", url: "/dictionaryManage", children: [] },
              { name: "数据字典组", url: "/dictionaryGoupManage", children: [] }
            ]
          },
           {
            name: "微信管理",
            url: "",
            children: [
              { name: "公众号配置", url: "/wxMarkManage", children: [] },
              { name: "消息模板配置", url: "/messageTemManage", children: [] },
              { name: "注册管理", url: "/registrationManage", children: [] }
            ]
          },
           {
            name: "机构管理",
            url: "",
            children: [
              { name: "机构类别管理", url: "/mechanismCategoryManage", children: [] },
              { name: "机构登记", url: "/mechanismRegisterManage", children: [] },
              { name: "进出流水", url: "/turnover", children: [] },
              { name: "受访人员管理", url: "/interviewee", children: [] },
              { name: "预约管理", url: "/bookingManage", children: [] },
              { name: "闸机管理", url: "/gateManage", children: [] },
              { name: "车辆管理", url: "/licensePlate", children: [] },
            ]
          },
          {
            name:"zqy的自定义",
            url:"",
            children: [
              {name:"自定义1",url:"/custom1",children:[]},
              {name:"自定义2",url:"/custom2",children:[]},
              {name:"菜单设置",url:"/MenuSettings",children:[]},
              {name:"自定义3",url:"/Table",children:[]},
            ]
          }
        ]
      },
      CarrierValue: "3",
      userInfo: {
        UserId: "",
        UserName: "",
        Office: "",
        Carrier: [
          {
            value: "3",
            label: "校园体育"
          },
          {
            value: "2",
            label: "校园安全"
          }
        ]
      }
    };
  },
  methods: {
    clearTab(){
      var obj = {};
      this.editableTabs.forEach((val, index) => {
        if (this.editableTabsValue == val.name) {
            obj=val;
        }
      });
      this.editableTabs = [obj];
      this.$store.commit(TYPE.editableTabs,this.editableTabs);
    },
    handleClick(tab){
      this.editableTabsValue=tab.name;
       this.user.menuList.forEach((val, index) => {
         val.children.forEach((item,index)=>{
          if (item.url == tab.name) {
            this.$axios.post("sysResources/getButton", {id:item.id}).then((res)=> {
            if(res.data.code == 200){
              this.$store.commit(TYPE.ButtonByParent, res.data.data);
              }
            })
          }
         })
      });
      this.$router.push({ path: tab.name });
    },
    removeTab(tab) {
      this.editableTabs.forEach((val, index) => {
        if (tab == val.name) {
          this.editableTabs.splice(index, 1);
          if(this.editableTabsValue==tab&&this.editableTabs.length>0){
            this.editableTabsValue=this.editableTabs[0].name
            this.$router.push({ path: this.editableTabs[0].name});
          }
        }
      });
      this.$store.commit(TYPE.editableTabs,this.editableTabs);
    },
    /****清除缓存****/
      perClear: function() {
        this.$confirm("是否清除缓存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          let $this = this;
          this.$axios.get("/permission/clear", {}).then(function(res) {
            if(res.data.success) {
              $this.$message({
                message: '清空缓存成功',
                type: 'success',
                duration: 1500,
                customClass: 'xz-alert-common'
              })
            }
          })
        }).catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消清除缓存"
          });
        });
      },
      /****清除缓存END****/
    // 注销
    cancelInfo() {
      this.$confirm("是否确定注销?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$axios.get('logout').then(res=>{
            if(res.data.code=200){
              this.$message({
                type: 'success',
                message: '注销成功!'
              });
              this.$router.push('login');
              this.$store.commit(TYPE.CLEAR_ALL);
              this.$store.commit(TYPE.editableTabs,[]);
              this.$store.commit(TYPE.SetSchool,[]);
            }
          })
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消注销"
          });
        });
    },
    // 提前存储所有下拉选择数据
    getSelectCode() {
      // 存在缓存数据用缓存数据
      if (
        this.$manageSessionStorage({ type: "has", text: "SelectColdeAll" })
          .isStatus
      ) {
        let UserInfos = this.$manageSessionStorage({
          type: "get",
          text: "UserInfo"
        }).value;
        // 存储用户信息
        this.userInfo = UserInfos;
        this.$store.dispatch(TYPE.UserName, UserInfos.UserName);
        return false;
      }
      // 请求数据
      this.$axios.get(API.COMMON_INFO_SOURCE, {}).then(res => {
        let data = res.data;
        let office_value = data.Office;
        let office_Index = office_value.indexOf("_");
        let NEW_Office = office_value.substring(office_Index + 1);
        // 将用户信息存储到sessionStorage中
        (this.userInfo.UserId = data.UserId),
          (this.userInfo.UserName = data.UserName),
          (this.userInfo.Office = NEW_Office),
          this.$store.dispatch(TYPE.UserName, data.UserName);
        // 存储用户信息
        // 将数据存储到sessionStorage中
        this.$manageSessionStorage({
          type: "add",
          text: "SelectColdeAll",
          value: data.CodeList
        });
        this.$manageSessionStorage({
          type: "add",
          text: "UserInfo",
          value: this.userInfo
        });
      });
    },
    //一进入页面设置按钮
    setBtns(){
      var list = this.user.menuList;
      var router = this.$route.path;
      this.forRouter(list,router);
    },
    //对路由进行循环判断
    forRouter(routerArr,router){
      for(var i = 0 ;i<routerArr.length;i++){
        if(routerArr[i].url == router){
          this.$store.commit(TYPE.ButtonByParent,routerArr[i]);
          return;
        }
        if(routerArr[i].children && routerArr[i].children.length>0){
          this.forRouter(routerArr[i].children,router)
        }
      }
      // console.log(111,this.$store.state.ButtonByParent);
    }
  },
  created() {
    this.userInfo.LoginName=sessionStorage.getItem('user_name')
    // console.log(this.userInfo.LoginName);


    // this.$axios.get("permission/getMenu").then(res => {
    //   if (res.data.code == 200) {
    //     this.user.menuList=res.data.result
    //     // this.setBtns();
    //   }
    // });
    // this.user.menuList = this.$store.state.ROUTER_LIST;
    // this.editableTabs=this.$store.state.editableTabs
    // console.log(555,this.editableTabs);
  },
  computed: {
    // 获取最新数据
    listenDataUSER_ID() {
      return this.$store.state.USER_ID;
    },
    editableTab() {
      return this.$store.state.editableTabs
    },
    editableTabsV() {
      return this.$store.state.editableTabsValue
    }
  },
  watch: {
    // 监听用户信息 改变重新请求数据
    editableTab: function() {
      // 请求下拉选择数据
      // this.getSelectCode()
      this.editableTabs=this.editableTab
    },
    editableTabsV: function() {
      // 请求下拉选择数据
      // this.getSelectCode()
      this.editableTabsValue=this.editableTabsV
    }
  }
};
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
  height: 100%;
}
#app-header {
  background-color: rgb(29, 80, 141);
  color: white;
  font-size: 23px;
  vertical-align: center;
}

#app-header div {
  height: 100%;
}

#app-header-system {
  float: left;
  height: 100%;
  font-weight: bold;
  letter-spacing: 3px;
}

#app-header-system span,
#app-header-system img {
  display: inline-block;
  vertical-align: middle;
}
#app-header-user {
  float: right;
}
#app-header-user ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
#app-header-user ul li {
  display: inline-table;
  height: 49px;
  line-height: 49px;
  padding: 0 5px;
  overflow: hidden;
}
#app-header-user ul .name{
  margin-right: 20px;
  color: #67C23A
}
#app-header-user ul li.headLiBox:hover {
  background: #143358;
  cursor: pointer;
  color: #E6A23C
}
#app-header-user .cairrBox {
  width: 110px;
}

#myMeau {
  width: 260px;
  height: 100%;
  border-right: 1px solid #dbdbde;
  overflow: hidden;
  overflow-y: auto;
}
#app-aside {
  width: 260px !important;
  overflow: visible;
}

#app-header .headLiBox img {
  position: relative;
  top: 10px;
  height: 26px;
}

.headPopver button {
  display: inline-block;
  height: 100%;
  padding: 0;
  background: none;
  border: none;
}
.headPopver button:hover {
  background: none;
}
.headLiBox span {
  display: inline-block;
  height: 100%;
}
</style>
