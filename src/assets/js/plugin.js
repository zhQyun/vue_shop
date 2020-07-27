import From from '../../components/from'
import Layout from '../../components/layout'
import Uploads from '../../components/uploads'
import {message, messageSuccess, messageWarn, messageError, notify, notifySuccess, notifyWarn, notifyError} from './vueGlobal'
import {paramsFn, replaceObject, manageSessionStorage, findSelectText, InitTableData, uniqueArray, listenPkidChange, filterSpace, queryReportsInfo, getDateTime, KeyWordsFn, compareFn} from './common'//
const CCcomponents = {
  MUploads: Uploads, // 文件上传
  MPloadsList: Uploads.UploadsList, // 文件列表显示
  MTableList: Layout.TableList, // 表格显示公共布局
  MDialog: Layout.Dialog, // 弹出筐
  msele: From.Mselect, // 下拉选择
  mtree: From.Mtree, // 树形选择
  mcascader: From.MCascader, // 多级联下拉选择
  MSelectPerson: From.MselectPerson, // 选择人员S-第一版
  // MSelectPersonMultiple:From.MselectPersonMultiple,//选择人员-第二版
  MSelectPersonMultiple: From.MselectPersonTree, // 选择人员-第三版
  Mautocomplete: From.Mautocomplete// 下拉搜索
}

export default {
  install (Vue) {
    /**
         * 返回上一级
         */
    Vue.prototype.goBack = () => { window.history.go(-1) }
    /**
         * 统一处理promise catch的错误
         * @param error 错误信息
         */
    Vue.prototype.handleError = (error) => { console.warn(error) }

    // 消息提示
    Vue.prototype.message = (msg) => { message(msg) }
    Vue.prototype.messageSuccess = (msg) => { messageSuccess(msg) }
    Vue.prototype.messageWarn = (msg) => { messageWarn(msg) }
    Vue.prototype.messageError = (msg) => { messageError(msg) }

    // 通知提示
    Vue.prototype.notify = (msg) => { notify(msg) }
    Vue.prototype.notifySuccess = (msg) => { notifySuccess(msg) }
    Vue.prototype.notifyWarn = (msg) => { notifyWarn(msg) }
    Vue.prototype.notifyError = (msg) => { notifyError(msg) }

    /*
         * 处理提交给后台数据方法
         * @params 分页数据对象
         * @myData 需要传递的参数对象
         * @ArrayRules 对应设置op字段值
         * */
    Vue.prototype.$params = (params, myData, ArrayRules = []) => { return paramsFn(params, myData, ArrayRules) }

    /*
        * 处理对象赋值方法
        * */
    Vue.prototype.$replaceObject = (rowInfo) => { return replaceObject(rowInfo) }

    /*
         * sessionStorage 处理
         * */
    Vue.prototype.$manageSessionStorage = (obj) => { return manageSessionStorage(obj) }

    /*
        * 通过val获取对应text
        * */
    Vue.prototype.$findSelectText = (lists, list) => { findSelectText(lists, list) }

    /*
        * 验证pkid
        * */
    Vue.prototype.$listenPkidChange = (pkidInfo, fn) => { listenPkidChange(pkidInfo, fn) }

    /*
         * 列表格式化数据
         * */

    Vue.prototype.$InitTableData = (row, column) => { return InitTableData(row, column) }
    /*
        * json数组去重
        * */
    Vue.prototype.$UniqueArray = (array, key) => { return uniqueArray(array, key) }

    /*
       * 过滤前后空格和空值
       * */
    Vue.prototype.$filterSpace = (array, obj) => { filterSpace(array, obj) }

    /*
         * 报表查看
         * */
    Vue.prototype.$queryReportsInfo = (obj) => { queryReportsInfo(obj) }

    /*
         * 过滤前后空格和空值
         * */
    Vue.prototype.$getDateTime = () => { return getDateTime() }

    /*
         * 处理关键字字段
         * */
    Vue.prototype.$KeyWordsFn = (obj) => { return KeyWordsFn(obj) }

    /*
        * 数组对象排序
        * */
    Vue.prototype.$compareFn = (obj) => { return compareFn(obj) }

    /*
        *批量注册组件
        * */
    Object.keys(CCcomponents).forEach((key) => {
      Vue.component(key, CCcomponents[key])
    })
  }
}
