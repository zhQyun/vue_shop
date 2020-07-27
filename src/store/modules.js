/**
 * 读取./modules下的所有js文件并注册模块
 */
const requireModule = require.context('./modules', false, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
  modules[moduleName] = {
    namespaced: false,
    ...requireModule(fileName).default
  }
})
console.log('modules', modules)
export default modules
