var base_dev = 'http://218.85.121.154:8087' // 汪建

var base_prod = 'http://218.85.121.154:8189'

// 开发配置
const dev = {
  ROOT: 'http://xyaq.herocheer.com/wisdom-platform-sys',
  img_url: 'http://xyaq.herocheer.com/wisdom-platform-sys'
}

// 生产测试配置
const prod_test = {
  // 配置根路劲
  ROOT: base_dev+'/school-system/', // 测试环境
  img_url: base_dev+'/school-system/'
}

// 正式生产配置
const prod = {
  // 配置根路劲
  ROOT: base_prod+'/school-system/', // 汪建
  img_url:  base_prod+'/school-system/'
}



let NEW_API = {}
if (process.env.NODE_ENV === 'production') {
  NEW_API = prod
}else if(process.env.NODE_ENV === 'productionTest'){
  NEW_API=prod_test
}else {
  NEW_API = dev
}
module.exports = NEW_API
