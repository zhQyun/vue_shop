import Vue from 'vue'
import VueRouter from 'vue-router'
// 首页
import HomePage from '../pages/HomePage.vue'
// API
import API from '../api.js'



// 基础信息管理
import basicinformationManage from '~/pages/basicinformationManage'
// 制卡管理
import makeCardManage from '~/pages/makeCardManage'
// 学校管理
import schoolManage from '~/pages/schoolManage'
// 考勤管理
import checkWork from '~/pages/checkWork'
// 设备管理
import equipmentManage from '~/pages/equipmentManage'
// 微信管理
import WexinManage from '~/pages/WexinManage'
// 微信用户管理
import WeixinUserManage from '~/pages/WeixinUserManage'
// 系统管理
import systemManage from '~/pages/systemManage'
// 机构管理
import mechanismManage from '~/pages/mechanismManage'
//自定义
import custom from '~/pages/custom'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/provinceManage' },
  {
    path: '/home', name: 'home', component: HomePage,
    children: [
      //自定义
      {path:'/custom1',name:'custom1',component:custom.custom1},
      {path:'/custom2',name:'custom2',component:custom.custom2},
      {path:'/MenuSettings',name:'MenuSettings',component:custom.MenuSettings},

      // 机构管理
      { path: '/mechanismCategoryManage', name: 'mechanismCategoryManage', component: mechanismManage.mechanismCategoryManage },//机构类别管理
      { path: '/mechanismRegisterManage', name: 'mechanismRegisterManage', component: mechanismManage.mechanismRegisterManage },//机构登记
      { path: '/addMechanismRegisterManage', name: 'addMechanismRegisterManage', component: mechanismManage.addMechanismRegisterManage },//新增&编辑机构登记
      { path: '/turnover', name: 'turnover', component: mechanismManage.turnover },//进出流水
      { path: '/searchTurnover', name: 'searchTurnover', component: mechanismManage.searchTurnover },//进出流水详情
      { path: '/interviewee', name: 'interviewee', component: mechanismManage.interviewee },//受访人员管理
      { path: '/searchInterviewee', name: 'searchInterviewee', component: mechanismManage.searchInterviewee },//受访人员详情
      { path: '/addInterviewee', name: 'addInterviewee', component: mechanismManage.addInterviewee },//增加&编辑受访人员
      { path: '/bookingManage', name: 'bookingManage', component: mechanismManage.bookingManage },//预约管理
      { path: '/searchBookingManage', name: 'searchBookingManage', component: mechanismManage.searchBookingManage },//预约详情
      { path: '/gateManage', name: 'gateManage', component: mechanismManage.gateManage },//闸机管理
      { path: '/searchGateManage', name: 'searchGateManage', component: mechanismManage.searchGateManage },//闸机详情
      { path: '/licensePlate', name: 'licensePlate', component: mechanismManage.licensePlate },//车辆管理
      

      // 基础信息管理
      { path: '/provinceManage', name: 'provinceManage', component: basicinformationManage.provinceManage },
      { path: '/cityManage', name: 'cityManage', component: basicinformationManage.cityManage },
      { path: '/areaManage', name: 'areaManage', component: basicinformationManage.areaManage },
      { path: '/databaseManage', name: 'databaseManage', component: basicinformationManage.databaseManage },

      // 制卡管理
      { path: '/cardManage', name: 'cardManage', component: makeCardManage.cardManage },

      // 学校管理
      {path: '/schoolList', name: 'schoolList', component: schoolManage.schoolList},
      {path: '/gradeManage', name: 'gradeManage', component: schoolManage.gradeManage},
      {path: '/classManage', name: 'classManage', component: schoolManage.classManage},
      {path: '/studentManage', name: 'studentManage', component: schoolManage.studentManage},
      {path: '/visitedPerson', name: 'visitedPerson', component: schoolManage.visitedPerson},
      {path: '/schoolCar', name: 'schoolCar', component: schoolManage.schoolCar},
      {path: '/upgrade', name: 'upgrade', component: schoolManage.upgrade},
      {path: '/graduateManage', name: 'graduateManage', component: schoolManage.graduateManage},
      { path: '/staffManage', name: 'staffManage', component: schoolManage.staffManage }, // 教职工管理
      {path: '/parkingAreas', name: 'parkingAreas', component: schoolManage.parkingAreas}, // 停车区域

      // 考勤管理
      {path: '/checkWorkRule', name: 'checkWorkRule', component: checkWork.checkWorkRule},
      {path: '/checkWorkPush' ,name: 'checkWorkPush', component: checkWork.checkWorkPush},
      {path: '/checkWorkStudent', name: 'checkWorkStudent', component: checkWork.checkWorkStudent},

      // 设备管理
      { path: '/readHeaderConfig', name: 'readHeaderConfig', component: equipmentManage.readHeaderConfig }, // 读头配置
      { path: '/readHeader', name: 'readHeader', component: equipmentManage.readHeader }, // 读头心跳
      { path: '/cameraConfig', name: 'cameraConfig', component: equipmentManage.cameraConfig }, // 摄像头配置
      { path: '/cameraRelation', name: 'cameraRelation', component: equipmentManage.cameraRelation }, // 摄像头关系
      { path: '/equipmentDistrictManage', name: 'equipmentDistrictManage', component: equipmentManage.equipmentDistrictManage }, // 设备区域管理
      { path: '/warningRulesManage', name: 'warningRulesManage', component: equipmentManage.warningRulesManage }, //


      // 微信管理
      { path: '/wxMarkManage', name: 'wxMarkManage', component: WexinManage.wxMarkManage }, // 公众号管理
      { path: '/messageTemManage', name: 'messageTemManage', component: WexinManage.messageTemManage }, // 消息模板管理
      { path: '/wxSchoolRelationManage', name: 'wxSchoolRelationManage', component: WexinManage.wxSchoolRelationManage }, // 微信学校关系管理
      { path: '/wxMenuManage', name: 'wxMenuManage', component: WexinManage.wxMenuManage }, // 微信菜单管理
      { path: '/registrationManage', name: 'registrationManage', component: WexinManage.registrationManage }, // 注册管理


      // 微信用户管理
      { path: '/wxUserManage', name: 'wxUserManage', component: WeixinUserManage.wxUserManage }, // 微信用户管理
      { path: '/oneKeyRegister', name: 'oneKeyRegister', component: WeixinUserManage.oneKeyRegister }, // 一键注册
      { path: '/workerManage', name: 'workerManage', component: WeixinUserManage.workerManage }, // 工作人员管理

      // 系统管理
      { path: '/dictionaryManage', name: 'dictionaryManage', component: systemManage.dictionaryManage },
      { path: '/dictionaryGoupManage', name: 'dictionaryGoupManage', component: systemManage.dictionaryGoupManage },
      { path: '/roleManage', name: 'roleManage', component: systemManage.roleManage },
      { path: '/userManage', name: 'userManage', component: systemManage.userManage },
      { path: '/departmentManage', name: 'departmentManage', component: systemManage.departmentManage },
      { path: '/resourceManage', name: 'resourceManage', component: systemManage.resourceManage },
    ]
  },

  {
    path: '/login', name: 'login', components: {
      login: () => import(/* webpackChunkName: "studentAttendanceIndex" */'../pages/loginPage.vue')
    }
  },





]
const router = new VueRouter({ routes: routes }, {})
import axios from '../axios/http';
import TYPE from '../store/storeType';
import store from '../store/index';
import { isMoment } from 'moment'
// 导航控制
// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   if (to.path === '/login') {
//     sessionStorage.removeItem('user_name')
//   }
//   let user = sessionStorage.getItem('user_name')

//   if (!user && to.path !== '/login') {
//     // 若本地token不存在,则任意路由跳转的时候,重定向至login 登陆页面
//     next({
//       path: '/login',
//       // query: { redirect:to.fullPath}  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
//     })
//   } else {
//     if(to.path == '/login'){
//       next();
//       return;
//     }
//     if (store.state.ButtonByParent.length == 0) {
//       var r=Math.random()
//       axios.get("sysResources/getMenu",r).then(res => {
//         if (res.data.code == 200) {
//           store.commit(TYPE.ROUTER_LIST, res.data.data);
//           setBtns(res.data.data);
//         }
//       });
//     } else {
//       next()
//     }
//   }

//   function setBtns(list) {
//     forRouter(list, to.path);
//   }
//   function getBtnId(routerArr,router){
//     return new Promise((resolve,rej)=>{
//       function getId(routerArr,router){
//         for (var i = 0; i < routerArr.length; i++) {
//           if (routerArr[i].url == router) {
//             var id = routerArr[i].id;
//             resolve(id);
//           }
//           if (routerArr[i].children && routerArr[i].children.length > 0) {
//             getId(routerArr[i].children, router)
//           }
//         }
//       }
//       getId(routerArr,router);
//       resolve('');
//     })

//   }
//   function forRouter(routerArr, router) {
//     getBtnId(routerArr, router).then(res=>{
//       var id = res;
//       if(!id){
//         next();
//       }else{
//         axios.post("sysResources/getButton",{
//           id,
//         }).then(res => {
//           if(res.data.code == 200){
//             store.commit(TYPE.ButtonByParent, res.data.data);
//             next();
//             return;
//           }
//         });
//       }
//     })

//   }
// })

// function openNewUrl (url) {
//   window.open(url, '_blank')
// }
export default router
