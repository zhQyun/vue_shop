
import Vue from 'vue'
import ElementUI from 'element-ui'

// 自定义组件模块
import MyPlugin from './assets/js/plugin'

// axios qs
import qs from 'qs'
import axios from './axios/http'
// store
import store from './store/index.js'

import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './assets/css/site.css'
import router from './components/router'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import solids from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

// 引入mockjs
// require('./mock.js');

// 自定义样式
import './assets/css/from.css'
import './assets/css/table.css'
import './assets/css/common.css'

//引入高德地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

//公用的方法
import common from './commonFunction/index.js';
Vue.prototype.common = common;

Vue.use(ElementUI, { size: 'small' })
Vue.use(MyPlugin)
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
fontawesome.library.add(brands, solids)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
