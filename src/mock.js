// API
import API from './api.js'

// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

/* 首页 */
const PENDINGPROCESS = function () {
  let articles = []
  for (let i = 0; i < 10; i++) {
    let rows = []
    for (let k = 0; k < 5; k++) {
      let row = {
        'processType': Random.csentence(5, 20),
        'processText': Random.csentence(5, 20),
        'perSon': Random.cname(),
        'data': Random.date(),
        'status': '待审',
        'nowStep': '复核',
        'workPerson': Random.cname()
      }
      rows.push(row)
    }
    let newArticleObject = {'processType': Random.csentence(5, 30), 'rows': rows}
    articles.push(newArticleObject)
  }
  const json = {'D_OR_I': 'IR', 'success': 'true', 'totals': 200, 'rows': articles}
  return json
}// 审核流程
const WAITINGTASK = function () {
  let articles = []
  for (let i = 0; i < 10; i++) {
    let rows = []
    for (let k = 0; k < 5; k++) {
      let row = {
        'processType': Random.csentence(5, 20),
        'processText': Random.csentence(5, 20),
        'perSon': Random.cname(),
        'data': Random.date(),
        'status': '待审',
        'nowStep': '复核',
        'workPerson': Random.cname()
      }
      rows.push(row)
    }
    let newArticleObject = {'processType': Random.csentence(5, 30), 'rows': rows}
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}// 审核流程

/* 安全信息 */
const SECURITY_INFORMATION_INDEX_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': 'PKID' + Random.increment(100),
      'INFO_NO': 'XX-' + Random.date(),
      'INFO_TYPE': '机务维修',
      'INFO_SOURCE': 'OA',
      'RECEIVE_DATE': Random.date(),
      'INFO_CONTENT': '降落时前起',
      'EVA_OPINION': '质量调查',
      'TRACER': Random.cname(),
      'STATUS': 'INIT',
      'CLOSE_DATE': Random.date(),
      'TYPESTATUS': Random.integer(-1, 3)
    }
    articles.push(newArticleObject)
  }
  ;
  const json = {'success': 'true', 'totals': Random.integer(0, 1000), 'rows': articles}
  return json
}// 列表
const SECURITY_INFORMATION_ADD = function () {
  const json = {'success': 'true', 'msg': '数据保存成功！'}
  return json
}// 保存数据（暂存和提交）
const SECURITY_INFORMATION_DELETE = function () {
  const json = {'success': 'true', 'msg': '数据删除成功！'}
  return json
}// 删除数据
const SECURITY_INFORMATION_SHOW_INFO = function () {
  const json = {
    'success': 'true',
    'totals': 0,
    'tableData': {
      'INFO_NO': '11',
      'CARRIER': '22',
      'INFO_TYPE': '33',
      'RECEIVE_DATE': '2018/01/02',
      'RECEIVER': '小白哦',
      'INFO_SOURCE': '厦航',
      'TRACER': '大白',
      'EVA_OPINION': 'other',
      'OTHER_OPINION': 'sdf',
      'LINK': 'http://www.baidu.com',
      'TITLE': '标题i',
      'INFO_CONTENT': "我的额nor那个'.$datatimeText.'",
      'UPLOADS': [{'id': 1, 'title': '附件001.jpg'}, {'id': 2, 'title': '附件002.jpg'}],
      'FEEDBACKTIME': '2018/02/20'
    }
  }
  return json
}// 获取数据数据

// 安全监察
const SM_SURVEILLANCEPROGRAMME_INDEX_LIST = function () {
  let articles = []
  for (let i = 0; i < 30; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'PLAN_NO': Random.id(), // 报告编号
      'TITLE': Random.csentence(5, 10), // 标题
      'EDITOR': Random.cname(), // 编制人
      'EDIT_DATE': Random.date(),
      'AUDITOR': Random.cname(), // 审核人
      'APPROVER': Random.cname(), // 批准人
      'STATUS': Random.pick(['初稿', '待评估', '待审核', '待批准']), // 报告状态
      'TYPESTATUS': Random.pick([0, 1, 3])
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
// 安全监察-安全检查计划-index任务
const SM_SURVEILLANCEPROGRAMME_SECURITY_LIST = function () {
  let articles = []
  for (let i = 0; i < 50; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'PLAN_NO': Random.id(), // 报告编号
      'TITLE': Random.csentence(5, 10), // 标题
      'EDITOR': Random.cname(), // 编制人
      'EDIT_DATE': Random.date(),
      'AUDITOR': Random.cname(), // 审核人
      'APPROVER': Random.cname(), // 批准人
      'STATUS': Random.pick(['初稿', '待评估', '待审核', '待批准']), // 报告状态
      'TYPESTATUS': Random.pick([0, 1, 3])
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}

const SM_SURVEILLANCEPROGRAMME_SHOW_INFO = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'PLAN_NO': Random.id(), // 报告编号
      'TITLE': Random.csentence(5, 10), // 标题
      'BASIS': Random.date(),
      'REMARK': Random.cname(),
      'MONTHLYPLAN': [{
        'ORDER': 1,
        'WORK_FREQUENCY': '防台风准备工作专项检查224',
        'CONTENT': '5月/1次',
        'SUPERVISOR': '王博'
      }, {'ORDER': 2, 'WORK_FREQUENCY': '防台风准备工作专项检查', 'CONTENT': '5月/1次2222', 'SUPERVISOR': '王博1'}],
      'YEARPLAN': [{'MONTH': 5, 'IMPORTANT_WORK': '5月/1次', 'REPAIR_SITE': '王博'}, {
        'MONTH': '1',
        'IMPORTANT_WORK': '5月/1次5555',
        'REPAIR_SITE': '王博5'
      }],
      'PULOADS': [{'id': 1, 'title': '附件001.jpg'}, {'id': 2, 'title': '附件002.jpg'}],
      'STATUS': Random.pick(['初稿', '待评估', '待审核', '待批准']), // 报告状态
      'PLAN_TYPE': Random.pick(['M', 'Y'])
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
const SM_SURVEILLANCEPROGRAMME_ADD = function () {
  const json = {'success': 'true', 'msg': '数据保存成功！'}
  return json
}
const SM_SURVEILLANCEPROGRAMME_DELETE = function () {
  const json = {'success': 'true', 'msg': '数据删除成功！'}
  return json
}

// 安全监察报告
const SM_SAFETYMONITORINGREPORT_LIST = function () {
  let articles = []
  for (let i = 0; i < 101; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'REPORT_NO': Random.id(), // 报告编号
      'TITLE': Random.csentence(5, 10), // 标题
      'CARRIER': Random.pick(['厦门航空']), // 营运人
      'EDITOR': Random.cname(), // 编制人
      'EDIT_DATE': Random.date(),
      'CHECKER': Random.cname(), // 校核人
      'CHECK_DATE': Random.date(),
      'AUDITOR': Random.cname(), // 审核人
      'AUDIT_DATE': Random.date(),
      'APPROVER': Random.cname(), // 批准人
      'APPR_DATE': Random.date(),
      'SUP_SUMMARY': Random.csentence(50, 100), // 安全监察情况汇总
      'ISSUE_SUMMARY': Random.csentence(50, 100), // 发现问题汇总分析
      'FOLLOW_ADVICE': Random.csentence(50, 100), // 后续工作建议
      'STATUS': Random.pick(['初稿', '待评估', '待审核', '待批准']), // 报告状态
      'UPLOADS': [{'title': '北京烤鸭'}, {'title': '大盘鸡'}, {'title': '红烧肉'}]
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
const SM_SAFETYMONITORINGREPORT_ADD = function () {
  const json = {'success': 'true', 'msg': '数据保存成功！'}
  return json
}
const SM_SAFETYMONITORINGREPORT_DELETE = function () {
  const json = {'success': 'true', 'msg': '数据删除成功！'}
  return json
}
const SM_SAFETYMONITORINGREPORT_SHOW_INFO = function () {
  let articles = {
    'PKID': Random.guid(), // 主键
    'REPORT_NO': Random.id(), // 报告编号
    'TITLE': Random.csentence(5, 10), // 标题
    'CARRIER': Random.pick(['厦门航空']), // 营运人
    'EDITOR': Random.cname(), // 编制人
    'EDIT_DATE': Random.date(),
    'CHECKER': Random.cname(), // 校核人
    'CHECK_DATE': Random.date(),
    'AUDITOR': Random.cname(), // 审核人
    'AUDIT_DATE': Random.date(),
    'APPROVER': Random.cname(), // 批准人
    'APPR_DATE': Random.date(),
    'SUP_SUMMARY': Random.csentence(50, 100), // 安全监察情况汇总
    'ISSUE_SUMMARY': Random.csentence(50, 100), // 发现问题汇总分析
    'FOLLOW_ADVICE': Random.csentence(50, 100), // 后续工作建议
    'STATUS': Random.pick(['初稿', '待评估', '待审核', '待批准']), // 报告状态
    'UPLOADS': [{'title': '北京烤鸭'}, {'title': '大盘鸡'}, {'title': '红烧肉'}]
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}

// 安全监察单--数据列表
const SM_SAFETYMONITORINGSHEET_INDEX_LIST = function () {
  let articles = []
  for (let i = 0; i < 101; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      TITLE: '德莱联盟', // 监察标题
      FORM_NO: 'K75160', // 监察编号
      EDITOR: '花某某', // 编制人
      SUPERVISOR: '美须公', // 监察员
      SUP_SITE: '凉山', // 监察地点
      SUP_OFFICE: '吕玲姐一梦', // 被监察单位
      STATUS: 'OK', // 状态
      EDIT_DATE: Random.date(), // 编制日期
      'TYPESTATUS': Random.integer(-1, 3)
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
// 安全监察单-查看
const SM_SAFETYMONITORINGSHEET_SHOW_INFO = function () {
  const json = {
    'success': 'true',
    'totals': 0,
    'tableData': {
      'PKID': Random.guid(), // 主键
      'TITLE': '21231',
      'FORM_NO': 'dssaq',
      'CARRIER': 1,
      'BASIS': 1,
      'SUP_CONTENT': '小白哦',
      'supervision': [{
        'ORDER_NO': '11',
        'FORM_CONTENT': '监察内容1',
        'CHECK_RECORD': '检查记录1',
        'ISSUE_RECORD': '问题记录1'
      }, {'ORDER_NO': '22', 'FORM_CONTENT': '监察内容2', 'CHECK_RECORD': '检查记录2', 'ISSUE_RECORD': '问题记录2'}]
    }
  }
  return json
}
// 安全监察单-新增
const SM_SAFETYMONITORINGSHEET_ADD = function () {
  const json = {'success': 'true', 'msg': '数据新增成功！'}
  return json
}
// 安全监察单-删除
const SM_SAFETYMONITORINGSHEET_DELETE = function () {
  const json = {'success': 'true', 'msg': '数据删除成功！'}
  return json
}

// 监察报告

/* 质量调查--质量调查表列表 */
const QS_QUALITYSURVEYTABLE_TASK_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': 'PKID' + Random.increment(100),
      'INFO_NO': 'XX-' + Random.date(),
      'INFO_TYPE': '机务维修',
      'INFO_SOURCE': 'OA',
      'RECEIVE_DATE': Random.date(),
      'INFO_CONTENT': '降落时前起',
      'EVA_OPINION': '质量调查',
      'TRACER': Random.cname(),
      'STATUS': '未处理',
      'CLOSE_DATE': Random.date(),
      'TYPESTATUS': -1
    }
    articles.push(newArticleObject)
  }
  ;
  const json = {'success': 'true', 'totals': 1000, 'rows': articles}
  return json
}// 任务列表
const QS_QUALITYSURVEYTABLE_TASK_END = function () {
  const json = {'success': 'true', 'msg': '任务终止成功！'}
  return json
}// 任务列表终止任务
const QS_QUALITYSURVEYTABLE_LIST = function () {
  let articles = []
  for (let i = 0; i < 30; i++) {
    let newArticleObject = {
      'PKID': 'PKID' + Random.integer(50, 1000),
      'SERIAL_NO': 'LS_' + Random.date(),
      'EVENT_NO': 'SJ_' + Random.date(),
      'TITLE': Random.csentence(2, 7),
      'EVENT_DESC': Random.csentence(2, 20),
      'EDIT_DATE': Random.date(),
      'EDITOR': Random.cname(),
      'STATUS': '初稿',
      'TYPESTATUS': Random.integer(-1, 3)
    }
    articles.push(newArticleObject)
  }
  ;
  const json = {'success': 'true', 'totals': Random.integer(50, 1000), 'rows': articles}
  return json
}// 编辑列表
const QS_QUALITYSURVEYTABLE_EDIT_DELETE = function () {
  const json = {'success': 'true', 'msg': '信息删除成功！'}
  return json
}// 编辑删除信息
const QS_QUALITYSURVEYTABLE_ADD = function () {
  const json = {'success': 'true', 'msg': '数据保存成功'}
  return json
}// 新增数据
const QS_QUALITYSURVEYTABLE_GETINFO = function () {
  const json = {
    'success': 'true',
    'tableData': {
      'AC': 'B' + Random.integer(0, 1000),
      'APPROVER': Random.csentence(2, 5),
      'APPR_DATE': Random.date(),
      'AUDITOR': Random.date(),
      'AUDIT_DATE': Random.date(),
      'CAUSE_ITEM': ['缺乏管理', '违反规定'],
      'CAUSE_TYPE': Random.csentence(2, 5),
      'CONCLUSION': Random.csentence(2, 5),
      'CORRECT_ACTION': Random.csentence(2, 5),
      'EDITOR': Random.csentence(2, 5),
      'EDIT_DATE': Random.date(),
      'EVENT_DATE': Random.date(),
      'EVENT_DESC': Random.csentence(2, 20),
      'EVENT_NO': 'SJ-' + Random.integer(0, 1000),
      'EVENT_SITE': Random.csentence(2, 5),
      'EVENT_SURVEY': Random.csentence(2, 10),
      'INFO_NO': '' + Random.integer(0, 1000),
      'IS_FORMAL': false,
      'MODEL': 'B' + Random.integer(0, 1000),
      'REPAIR_TYPE': Random.csentence(2, 20),
      'SERIAL_NO': 'LS-' + Random.integer(0, 1000),
      'TITLE': Random.csentence(2, 20),
      'WORK_ADVICE': Random.csentence(2, 25)
    }
  }
  return json
}// 获取数据

/* 质量调查--MEDA表 */
const QS_MEDATABLE_ADD = function () {
  const json = {'success': 'true', 'msg': '数据保存成功'}
  return json
}// 新增数据
const QS_MEDATABLE_DELETE = function () {
  const json = {'success': 'true', 'msg': '信息删除成功！'}
  return json
}// 编辑删除信息
const QS_MEDATABLE_INDEX_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': 'PKID' + Random.increment(100),
      'INFO_NO': 'XX-' + Random.date(),
      'SURVEYOR': Random.cname(),
      'EVENT_DESC': Random.csentence(2, 30),
      'CREATE_DATE': Random.date(),
      'CREATE_USER': Random.cname(),
      'TYPESTATUS': Random.integer(-1, 3)
    }
    articles.push(newArticleObject)
  }
  ;
  const json = {'success': 'true', 'totals': Random.integer(0, 1000), 'rows': articles}
  return json
}// 查询列表
const QS_MEDATABLE_GETINFO = function () {
  const json = {
    'success': 'true',
    'tableData': {
      'AC': 'B' + Random.integer(0, 1000),
      'AREA': '厦门',
      'ATA': 'ATA' + Random.integer(0, 2),
      'BASE_TYPE': Random.csentence(2, 5),
      'CLOSED_CYCLE': Random.csentence(2, 5),
      'COMP_MODEL': Random.csentence(2, 10),
      'ERROR_DATE': Random.date(),
      'ERROR_ITEM': '工具设备缺陷',
      'ERROR_SITE': Random.csentence(2, 5),
      'EVENT_DATE': Random.date(),
      'EVENT_DESC': Random.csentence(2, 20),
      'EVENT_FLIGHT': Random.csentence(2, 5),
      'EVENT_ITEM': ['航班取消', '返航/改航'],
      'FACILITY': Random.csentence(2, 5),
      'HR': Random.csentence(2, 10),
      'INFO_NO': '' + Random.integer(0, 1000),
      'IS_SUIT': ['一、飞机设计/构造/零配件'],
      'MODEL': 'B' + Random.integer(0, 1000),
      'ORG': Random.csentence(2, 20),
      'OTHER': '厦门其它',
      'PROGRAM': Random.csentence(2, 20),
      'ROUTE_TYPE': Random.csentence(2, 25),
      'SAFETY_CULTURE': Random.csentence(2, 35),
      'SUPP_FILE': Random.csentence(2, 30),
      'SURVEYOR': Random.csentence(2, 30),
      'SURVEY_START': ['2018-12-12', '2018-12-15'],
      'TECH_FILE': Random.csentence(2, 5),
      'TRAINING': Random.csentence(2, 5),
      'TYPE_LEVEL': Random.csentence(2, 5)
    }
  }
  return json
}// 获取数据
const QS_MEDATABLE_MAINTENANCE_ETTOR = function () {
  let articles = [{
    name: '安装不当',
    arrList: [{
      name: '未安装所需要的设备/零件'
    }, {
      name: '安装错误设备/零件'
    }, {
      name: '方向不对/位置不妥'
    }, {
      name: '安装未完成'
    }, {
      name: '安装了多余部件'
    }, {
      name: '接近盖板未关'
    }, {
      name: '未恢复系统设备'
    }, {
      name: '损毁'
    }, {
      name: '其它'
    }]
  }, {
    name: '放行前或工作后遗漏',
    arrList: [{
      name: '放行前未取下销子或堵头'
    }, {
      name: '勤务盖板未关'
    }, {
      name: '检查/校验后未关'
    }, {
      name: '其它'
    }]
  }, {
    name: '故障隔离/检查/测试欠妥',
    arrList: [{
      name: '未发现性能下降'
    }, {
      name: '接近盖板未关'
    }, {
      name: '未使系统功能恢复/停止'
    }, {
      name: '未作适当测试'
    }, {
      name: '未将故障作隔离'
    }, {
      name: '未作适当检查'
    }, {
      name: '其它'
    }]
  }, {
    name: '损坏飞机/发动机/附件',
    arrList: [{
      name: '移动/运输/滑行时损坏'
    }, {
      name: '被车辆/工作梯损坏'
    }, {
      name: '设备使用不当'
    }, {
      name: '使用有故障的设备'
    }, {
      name: '未将故障作隔离'
    }, {
      name: '未作适当检查'
    }, {
      name: '其它'
    }]
  }, {
    name: '外来物影响安全和使用',
    arrList: [{
      name: '将物件遗忘飞机/发动机内'
    }, {
      name: '外来物掉入开放系统'
    }, {
      name: '其它机坪上的碎屑'
    }, {
      name: '其它'
    }]
  }, {
    name: '勤务缺陷',
    arrList: [{
      name: '液/气不足或过多'
    }, {
      name: '液体型号不对'
    }, {
      name: '未按需加注'
    }, {
      name: '车辆勤务保障不当'
    }, {
      name: '其它'
    }]
  }, {
    name: '修理不当',
    arrList: [{
      name: '器材损坏或未正确使用'
    }, {
      name: '修理工艺偏差'
    }, {
      name: '未完成修理'
    }, {
      name: '试验不充分'
    }, {
      name: '工具设备缺陷'
    }, {
      name: '其它'
    }]
  }, {
    name: '导致人员受伤的行为',
    arrList: [{
      name: '接触性危险'
    }, {
      name: '滑/绊/跌倒'
    }, {
      name: '突发性的危险'
    }, {
      name: '未使用保护设备'
    }, {
      name: '其它'
    }]
  }, {
    name: '其它类型',
    arrList: []
  }]

  const json = {'success': 'true', 'totals': 1000, 'rows': articles}
  return json
}// 维修差错
const QS_MEDATABLE_INDUCEMENT_ANALYSIS = function () {
  let articles = [{
    name: '一、飞机设计/构造/零配件',
    arrList: [{
      name: '构型复杂/缺陷'
    }, {
      name: '不易接近'
    }, {
      name: '构型不变'
    }, {
      name: '备件标识缺陷'
    }, {
      name: '防错设计不充分'
    }, {
      name: '其它'
    }],
    des: '详细说明已经过选择的因素是如何导致差错的'
  }, {
    name: '二、初始批准的维修文件',
    arrList: [{
      name: '不易理解'
    }, {
      name: '不正确/不完善'
    }, {
      name: '前后矛盾/参考过多'
    }, {
      name: '不具备/无法得到'
    }, {
      name: '资料未及时更新'
    }, {
      name: '其它'
    }],
    des: '详细说明已经过选择的因素是如何导致差错的'
  }, {
    name: '三、公司维修文件',
    arrList: [{
      name: '文件不正确、不完善'
    }, {
      name: '工作单可操作性差'
    }, {
      name: '未得到有效文件或文件不一致'
    }, {
      name: '错误地改制造厂文件'
    }, {
      name: '必检要求不当'
    }, {
      name: '支持信息不及时或丢失'
    }, {
      name: '缺少实用文件'
    }, {
      name: '其它'
    }],
    des: '详细说明已经过选择的因素是如何导致差错的'
  }, {
    name: '四、设备和工具',
    arrList: [{
      name: '不安全/不可靠'
    }, {
      name: '控制器和显示器布局不合理'
    }, {
      name: '校准缺陷'
    }, {
      name: '无法获取'
    }, {
      name: '不适使用'
    }, {
      name: '没有说明'
    }, {
      name: '过于复杂'
    }, {
      name: '标识不对'
    }, {
      name: '用错工具或设备'
    }, {
      name: '管理失控'
    }, {
      name: '其它'
    }],
    des: '详细说明已经过选择的因素是如何导致差错的'
  }, {
    name: '六、环境和实施',
    arrList: [{
      name: '强噪音'
    }, {
      name: '炎热'
    }, {
      name: '寒冷'
    }, {
      name: '潮湿'
    }, {
      name: '雨/雪'
    }, {
      name: '光线差'
    }, {
      name: '风'
    }, {
      name: '振动'
    }, {
      name: '危险/有毒物质'
    }, {
      name: '整洁'
    }, {
      name: '通风不良'
    }, {
      name: '其它'
    }],
    des: '详细说明已经过选择的因素是如何导致差错的'
  }, {
    name: '其它类型 (详细解释其他问题是如何导致差错的)',
    arrList: []
  }]

  const json = {'success': 'true', 'totals': 1000, 'rows': articles}
  return json
}// 诱因分析

/* 质量调查--FOD清单 */
const QS_FODLIST_ADD = function () {
  const json = {'success': 'true', 'msg': '数据保存成功'}
  return json
}// 新增数据
const QS_FODLIST_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': 'PKID' + Random.increment(100),
      'FOD_DATE': Random.date(),
      'AC': 'FBS' + Random.integer(0, 1000),
      'OBJ_NAME': Random.csentence(2, 6),
      'EVENT_CONDITION': Random.csentence(5, 20),
      'CREATE_DATE': Random.date(),
      'CREATE_USER_NAME': Random.cname(),
      'TYPESTATUS': Random.integer(-1, 3)
    }
    articles.push(newArticleObject)
  }
  ;
  const json = {'success': 'true', 'totals': Random.integer(0, 1000), 'rows': articles}
  return json
}// 列表数据
const QS_FODLIST_GETINFO = function () {
  const json = {
    'success': 'true',
    'tableData': {
      'FOD_DATE': Random.date(),
      'AC': 'FBS' + Random.integer(0, 1000),
      'CARRIER': Random.integer(0, 2),
      'OBJ_NAME': Random.csentence(5, 20),
      'EVENT_CONDITION': Random.csentence(10, 100),
      'REMARK': Random.csentence(10, 100),
      'CREATE_DATE': Random.date(),
      'CREATE_USER_NAME': Random.cname(),
      'UPLOADS': [{'id': 1, 'title': '附件001.jpg'}, {'id': 2, 'title': '附件002.jpg'}]
    }
  }
  return json
}// 获取数据
const QS_FODLIST_DELETE = function () {
  const json = {'success': 'true', 'msg': '删除成功！'}
  return json
}// 任务列表终止任务

// SAG管理----SAG成员管理
const SAG_MEMBERMANAGEMENT_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'YEAR': Random.date('yyyy'), // 报告编号
      'TITLE': Random.csentence(5, 10), // 标题
      'CREATE_USER_NAME': Random.cname(), // 编制人
      'CREATE_DATE': Random.date(),
      'DEPT': Random.cname(),
      'LEADER': Random.cname(),
      'DEPUTY': Random.cname(),
      'CONTACT': Random.cname(),
      'MEMBER': Random.cname(),
      'DEPTS': [{'id': 1, 'title': '组长', 'member': [{'pkid': '00132', 'name': '陈国顺'}]},
        {'id': 1, 'title': '副组长', 'member': [{'id': 1, 'name': '王容辉'}, {'id': 2, 'name': '张强'}]},
        {'id': 1, 'title': '联络员', 'member': [{'id': 1, 'name': '陈柏成'}, {'id': 2, 'name': '周颖'}]},
        {'id': 1, 'title': '成员', 'member': [{'id': 1, 'name': '沈世荣'}, {'id': 2, 'name': '赵新建'}, {'id': 3, 'name': '许慧瑛'}]},
        {'id': 2, 'title': '组长', 'member': [{'id': 1, 'name': '陈国顺'}]},
        {'id': 2, 'title': '副组长', 'member': [{'id': 1, 'name': '王容辉'}, {'id': 2, 'name': '张强'}]}]
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
const SAG_MEMBERMANAGEMENT_DEPTLIST = function () {
  let articles = []
  for (let i = 0; i < 5; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'DEPT': Random.csentence(5, 10),
      'LEADER': Random.cname(),
      'DEPUTY': Random.cname(),
      'CONTACT': Random.cname(),
      'MEMBER': Random.cname()
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
const SAG_MEMBERMANAGEMENT_SHOW_INFO = function () {
  let articles = {
    'PKID': Random.guid(), // 主键
    'YEAR': Random.date('yyyy'), // 报告编号
    'TITLE': Random.csentence(5, 10), // 标题
    'CREATE_USER_NAME': Random.cname(), // 编制人
    'CREATE_DATE': Random.date(),
    'DEPT': Random.cname(),
    'LEADER': Random.cname(),
    'DEPUTY': Random.cname(),
    'CONTACT': Random.cname(),
    'MEMBER': Random.cname()
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
const SAG_MEMBERMANAGEMENT_ADD = function () {
  const json = {'success': 'true', 'msg': '添加成功！'}
  return json
}
const SAG_MEMBERMANAGEMENT_DELETE = function () {
  const json = {'success': 'true', 'msg': '删除成功！'}
  return json
}

// SAG管理--持续监控问题汇总
const SAG_MONITORINGPROBLEMS_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'RECORD_NO': 'FN-' + Random.integer(0, 1000), // 关联记录单编号
      'CONTROL_UNIT': Random.csentence(5, 10), // 监控单位
      'PROBLEM_COUNT': Random.integer(0, 1000), // 问题总数
      'CREATE_DATE': Random.date(), // 编制日期
      'CREATE_USER_NAME': Random.cname(), // 编制人
      'EDIT_DATE_TEST': Random.date(), // 批准日期
      'EDITOR_TEST': Random.cname(), // 批准人
      'TYPESTATUS': Random.integer(-1, 3), // 数据类别
      'STATUS': '待审批'
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}// 列表数据
const SAG_MONITORINGPROBLEMS_GETINFO = function () {
  let rows = []
  for (let i = 0; i < 20; i++) {
    rows.push({
      'PROBLEM_NO': 'WT-' + Random.integer(0, 1000), // 记录单编号
      'TITLE': Random.csentence(2, 5),
      'PROBLEM_CONTENT': Random.csentence(2, 20),
      'PROBLEM_EDITOR': Random.cname(),
      'PROBLEM_DATE': Random.date(),
      'FEEDBACK': Random.cname()
    })
  }
  const json = {
    'success': 'true',
    'tableData': {
      'RECORD_NO': 'FN-' + Random.integer(0, 1000), // 记录单编号
      'TITLE': Random.csentence(2, 5),
      'CONTROL_UNIT': '厦门航空',
      'CLOSE_OPINION': Random.csentence(2, 5),
      rows: rows
    }
  }
  return json
}// 获取数据
const SAG_MONITORINGPROBLEMS_ADD = function () {
  const json = {'success': 'true', 'msg': '添加成功！'}
  return json
}// 审批保存

// SAG管理--SAG月报
const SAG_MONTHLY_REPORT_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'REPORT_NO': 'FN-' + Random.integer(0, 1000), // 月报编号
      'TITLE': Random.csentence(5, 10), // 标题
      'EDIT_DATE': Random.date(), // 编制日期
      'EDITOR': Random.cname(), // 编制人
      'TYPESTATUS': Random.integer(-1, 3), // 数据类别
      'STATUS': '待审批'
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}// 列表数据
const SAG_MONTHLY_REPORT_GET_INFO = function () {
  let monthlyRow = []
  for (let k = 0; k < 5; k++) {
    monthlyRow.push({
      'CONTENT': Random.csentence(2, 10),
      'SUMMARY': Random.csentence(10.20)
    })
  }
  const json = {
    'success': 'true',
    'tableData': {
      'REPORT_NO': 'YB-' + Random.integer(0, 1000), // 记录单编号
      'TITLE': Random.csentence(2, 5),
      'DEPT': Random.csentence(2, 10),
      'SAG_MONTHLY_REPORT_CONTENTS': monthlyRow
    }
  }
  return json
}// 获取数据

// SAG管理----持续监控计划--index列表
const SAG_CONTINUOUSMONITORINGPLAN_INDEX_LIST = function () {
  let articles = []
  for (let i = 0; i < 101; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      PLAN_NO: 'KK8806', // 监控计划编号
      TITLE: '关键字标题', // 关键字
      EDITOR: '德玛', // 编写人
      EDIT_DATE: Random.date(), // 编制日期
      SUPERVISOR: 'OK', // 审批状态
      STATUS: '可以的老铁',
      'TYPESTATUS': Random.integer(-1, 3)
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
// SAG管理----持续监控计划--编辑列表
const SAG_CONTINUOUSMONITORINGPLAN_SHOW_INFO = function () {
  const json = {
    'success': 'true',
    'totals': 0,
    'tableData': {
      'PKID': Random.guid(), // 主键
      'TITLE': '标题m',
      'PLAN_NO': '监控计划编号',
      'DUTY_DEPT': '责任部门',
      'supervision': [{
        'CONTROL_ITEM': '持续监控1',
        'CONTROL_METHOD': '持续监控1',
        'CONTROL_CYCLE': '持续监控1'
      }, {'CONTROL_ITEM': '持续监控2', 'CONTROL_METHOD': '持续监控2', 'CONTROL_CYCLE': '持续监控2'}]
    }
  }
  return json
}
// SAG管理----持续监控计划--增加
const SAG_CONTINUOUSMONITORINGPLAN_ADD = function () {
  const json = {'success': 'true', 'msg': '添加成功！'}
  return json
}
// SAG管理----持续监控计划--删除
const SAG_CONTINUOUSMONITORINGPLAN_DELETE = function () {
  const json = {'success': 'true', 'msg': '删除成功！'}
  return json
}

// 奖惩管理--安全奖励说明表--数据列表
const REWARD_INSTRUCTIONS_INDEX_LIST = function () {
  let articles = []
  for (let i = 0; i < 101; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      PLAN_NO: '凉凉',
      TITLE: '德莱联盟', // 监察标题
      EDITOR: 'K75160', // 监察编号
      EDIT_DATE: Random.date(), // 编制日期
      SUPERVISOR: 'KKKKKKK',
      'TYPESTATUS': Random.integer(-1, 3)
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
// 奖惩管理--安全奖励说明表--查看
const REWARD_INSTRUCTIONS_SHOW_INFO = function () {
  const json = {
    'success': 'true',
    'totals': 0,
    'tableData': {
      'PKID': Random.guid(), // 主键
      'TITLE': '21231',
      'FORM_NO': 'dssaq',
      'CARRIER': 1,
      'BASIS': 1,
      'SUP_CONTENT': '小白哦',
      'supervision': [{
        'ORDER_NO': '11',
        'FORM_CONTENT': '监察内容1',
        'CHECK_RECORD': '检查记录1',
        'ISSUE_RECORD': '问题记录1'
      }, {'ORDER_NO': '22', 'FORM_CONTENT': '监察内容2', 'CHECK_RECORD': '检查记录2', 'ISSUE_RECORD': '问题记录2'}]
    }
  }
  return json
}
// 奖惩管理--安全奖励说明表--新增
const REWARD_INSTRUCTIONS_ADD = function () {
  const json = {'success': 'true', 'msg': '数据新增成功！'}
  return json
}
// 奖惩管理--安全奖励说明表--删除
const REWARD_INSTRUCTIONS_DELETE = function () {
  const json = {'success': 'true', 'msg': '数据删除成功！'}
  return json
}

// 奖惩管理--处罚管理--数据列表
const REWARD_PUNISHMENT_INDEX_LIST = function () {
  let articles = []
  for (let i = 0; i < 101; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      PUBLIC_NO: 'XX-XX-' + Random.integer(1000, 100000),
      CREATE_DATE: Random.date(), // 编制日期
      AWARD_CONTENT: '凉凉', // 监察编号
      RESULT: '233',
      A_TYPE: Random.pick(['奖励', '处罚'])
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
// 奖惩管理--处罚管理--查看
const REWARD_PUNISHMENT_SHOW_INFO = function () {
  const json = {
    'success': 'true',
    'totals': 0,
    'tableData': {
      'PKID': Random.guid(), // 主键
      'PUNISH_OBJECT': '21231',
      'PUNISH_DATE': Random.date(),
      'CARRIER': 1,
      'BASIS': 1,
      'SUP_CONTENT': '小白哦',
      'supervision': [{
        'ORDER_NO': '11',
        'FORM_CONTENT': '监察内容1',
        'CHECK_RECORD': '检查记录1',
        'ISSUE_RECORD': '问题记录1'
      }, {'ORDER_NO': '22', 'FORM_CONTENT': '监察内容2', 'CHECK_RECORD': '检查记录2', 'ISSUE_RECORD': '问题记录2'}]
    }
  }
  return json
}
// 奖惩管理--处罚管理--新增
const REWARD_PUNISHMENT_ADD = function () {
  const json = {'success': 'true', 'msg': '数据新增成功！'}
  return json
}
// 奖惩管理--处罚管理--删除
const REWARD_PUNISHMENT_DELETE = function () {
  const json = {'success': 'true', 'msg': '数据删除成功！'}
  return json
}

// 奖惩管理----安全奖励申请表--列表
const REWARD_MANAGEMENT_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'REPORT_NO': 'JL-SM-' + Random.integer(1000, 100000), // 报告编号
      'APPLY_DESC': Random.csentence(20, 50), // 标题
      'CREATE_USER_NAME': Random.cname(), // 编制人
      'CREATE_DATE': Random.date(),
      'STATUS': Random.pick(['初稿', '待评估', '待审核', '待批准'])
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
// 奖惩管理----安全奖励申请表--新增
const REWARD_MANAGEMENT_ADD = function () {
  const json = {'success': 'true', 'msg': '提交成功！'}
  return json
}
// 奖惩管理----安全奖励申请表--删除
const REWARD_MANAGEMENT_DELETE = function () {
  const json = {'success': 'true', 'msg': '删除成功！'}
  return json
}
// 奖惩管理----安全奖励申请表--编辑
const REWARD_MANAGEMENT_SHOWINFO = function () {
  let articles = {
    'PKID': Random.guid(), // 主键
    'APPLY_OFFICE': Random.csentence(10, 20),
    'APPLY_NO': 'JL-SM-' + Random.integer(1000, 100000),
    'APPLY_DESC': Random.csentence(20, 50),
    'SAG_OPINION': Random.csentence(20, 50),
    'SAG_CONTACT': Random.cname(),
    'SAG_AUDIT_DATE': Random.date(),
    'STATUS': Random.pick(['初稿', '待评估', '待审核', '待批准'])
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}

// 奖惩管理-----奖罚通知
const REWARD_NOTICELSSUE_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'NOTICE_NO': 'JL-SM-' + Random.integer(1000, 100000),
      'CREATE_DATE': Random.date(),
      'CREATE_USER_NAME': Random.cname(),
      'NOTICE_TYPE': Random.pick(['奖励', '处罚'])
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}
const REWARD_NOTICELSSUE_SHOW_INFO = function () {
  let json = {
    'PKID': Random.guid(), // 主键
    'NOTICE_NO': 'JL-SM-' + Random.integer(1000, 100000),
    'CREATE_DATE': Random.date(),
    'CREATE_USER_NAME': Random.cname(),
    'NOTICE_TYPE': Random.pick(['奖励', '处罚']),
    'LIST': [{'PUBLIC_NO': '11', 'CREATE_DATE': '日期a', 'AWARD_CONTENT': '部门a', 'RESULT': '处室a', 'A_TYPE': '奖励'},
      {'PUBLIC_NO': '222', 'CREATE_DATE': '日期b', 'AWARD_CONTENT': '部门a', 'RESULT': '处室a', 'A_TYPE': '奖励'}]
  }
  return json
}
const REWARD_NOTICELSSUE_ADD = function () {
  const json = {'success': 'true', 'Msg': '提交成功！'}
  return json
}
const REWARD_NOTICELSSUE_DELETE = function () {
  const json = {'success': 'true', 'Msg': '删除成功！'}
  return json
}

// 外站管理--外站通讯录
const EXTERNAL_STATION_ADDRESS_BOOK_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'OFFICE': Random.pick(['一处', '二处', '三处']),
      'NAME': Random.cname(),
      'POST': Random.csentence(10, 20),
      'AREA_CODE': Random.pick(['+86', '+00', '+027']),
      'PHONE': Random.integer(1000, 10000000000),
      'FAX': Random.integer(1000, 10000000000),
      'MOBILE': Random.integer(1000, 10000000000),
      'EMAIL': Random.name() + '@xiamenair.com'
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}// 列表信息
const EXTERNAL_STATION_ADDRESS_BOOK_ADDINFO = function () {
  const json = {'success': 'true', 'msg': '提交成功！'}
  return json
}// 保存 修改
const EXTERNAL_STATION_ADDRESS_BOOK_DELETE = function () {
  const json = {'success': 'true', 'msg': '删除成功！'}
  return json
}// 删除

// 外站管理--属地适用文件
const APPLICATION_FILE_INDEX_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'FILE_NO': 'FILE-' + Random.integer(0, 1000),
      'CREATE_USER_NAME': Random.cname(),
      'FILE_NAME': Random.csentence(10, 20),
      'CREATE_DATE': Random.date(),
      'STATUS': Random.pick(['初稿', '待审核', '已完成', '退回', 'INIT'])
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'rows': articles}
  return json
}// 列表信息
const APPLICATION_FILE_DELETE = function () {
  const json = {'Success': 'true', 'Msg': '删除成功！'}
  return json
}// 删除
const APPLICATION_FILE_ADD = function () {
  const json = {'Success': 'true', 'Msg': '提交成功！'}
  return json
}// 保存 修改
const APPLICATION_FILE_GET_INFO = function () {
  let monthlyRow = []
  const json = {
    'success': 'true',
    'tableData': {
      'FILE_NO': 'FILE-' + Random.integer(0, 1000), // 记录单编号
      'FILE_BASE': Random.csentence(2, 5),
      'SOURCE_NO': Random.integer(0, 1000),
      'PUBLISH_DATE': Random.date(),
      'FILE_NAME': Random.csentence(2, 5),
      'UPLOADS': [{'id': 1, 'title': '附件001.jpg'}, {'id': 2, 'title': '附件002.jpg'}]
    }
  }
  return json
}// 获取数据

// 外站管理--质量月报
const MONTHLY_REPORT_QUALITY_INDEX_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'REPORT_NO': 'FILE-' + Random.integer(0, 1000),
      'CREATE_USER_NAME': Random.cname(),
      'BASE': Random.csentence(2, 8),
      'CREATE_DATE': Random.date(),
      'DEPT': Random.csentence(2, 10),
      'STATUS': Random.pick(['初稿', '待审核', '已完成', '退回', 'INIT'])
    }
    articles.push(newArticleObject)
  }
  const json = {'Success': 'true', 'totals': 200, 'rows': articles}
  return json
}// 列表信息
const MONTHLY_REPORT_QUALITY_DELETE = function () {
  const json = {'Success': 'true', 'Msg': '删除成功！'}
  return json
}// 删除
const MONTHLY_REPORT_QUALITY_ADD = function () {
  const json = {'Success': 'true', 'Msg': '提交成功！'}
  return json
}// 保存 修改
const MONTHLY_REPORT_QUALITY_GET_INFO = function () {
  let monthlyRow = []
  const json = {
    'success': 'true',
    'tableData': {
      'REPORT_NO': 'FILE-' + Random.integer(0, 1000), // 记录单编号
      'BASE': Random.csentence(2, 5),
      'DEPT': Random.integer(0, 1000),
      'CREATE_USER_NAME': Random.cname(),
      'CREATE_DATE': Random.date(),
      'UPLOADS': [{'id': 1, 'title': '附件001.jpg'}, {'id': 2, 'title': '附件002.jpg'}]
    }
  }
  return json
}// 获取数据

// 奖罚管理----其它奖励录入
const REWARD_OTHER_ENTRY = function () {
  const json = {'success': 'true', 'msg': '提交成功！'}
  return json
}

// 奖罚管理----获取数据
const REWARD_OTHER_GET_INFO = function () {
  const json = {
    'TITLE': Random.csentence(2, 15),
    'AWARD_CONTENT': Random.csentence(2, 15),
    'RESULT': Random.csentence(2, 15),
    'STATUS': Random.csentence(2, 15),
    'PROCESS_ID': Random.csentence(2, 15),
    'FORM_INSTANCE_ID': Random.csentence(2, 15),
    'CREATE_USER_NAME': Random.csentence(2, 15),
    'PUBLIC_NO': 'FILE-' + Random.integer(0, 1000),
    'INFO_NO': Random.integer(0, 1000),
    'LIST': [{ 'RELATE_ID': Random.csentence(2, 15),
      'OBJECT_OFFICE': Random.csentence(2, 15),
      'OBJECT_DEPT': Random.csentence(2, 15),
      'OBJECT_LEVEL': Random.csentence(2, 15)},
    { 'RELATE_ID': Random.csentence(2, 15),
      'OBJECT_OFFICE': Random.csentence(2, 15),
      'OBJECT_DEPT': Random.csentence(2, 15),
      'OBJECT_LEVEL': Random.csentence(2, 15)}]
  }
  return json
}
const REWARD_OTHER_REWARD_DELETE = function () {
  const json = {'success': 'true', 'msg': '删除成功！'}
  return json
}

// 奖罚管理----奖罚列表
const REWARD_PUNISHMENT_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'CREATE_DATE': Random.date(),
      'CREATE_USER': Random.cname(),
      'DEPT': Random.pick(['一部', '二部', '三部']),
      'OFFICE': Random.pick(['一处', '二处', '三处']),
      'AWARD_LEVEL': Random.pick(['部门', '公司']),
      'AWARD_GRADE': Random.pick(['一等奖', '二等奖', '三等奖']),
      'STATUS': Random.pick(['已完成', '处室审核']),
      'TYPESTATUS': Random.integer(-1, 3)
    }
    articles.push(newArticleObject)
  }
  const json = {'success': 'true', 'totals': 200, 'tableData': articles}
  return json
}

// 安全绩效管理---安全责任书--列表
const SPM_LIABILITYSTATEMENT_INFO_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': 'PKID' + Random.increment(100),
      'INFO_NO': 'XX-' + Random.date(),
      'INFO_TYPE': '机务维修',
      'INFO_SOURCE': 'OA',
      'RECEIVE_DATE': Random.date(),
      'INFO_CONTENT': '降落时前起',
      'EVA_OPINION': '质量调查',
      'TRACER': Random.cname(),
      'STATUS': '初稿',
      'EDIT_DATE': Random.date(),
      'TYPESTATUS': Random.integer(-1, 3)
    }
    articles.push(newArticleObject)
  }
  ;
  const json = {'success': 'true', 'totals': Random.integer(0, 1000), 'rows': articles}
  return json
}

// 安全绩效管理---安全责任书--编辑
const SPM_LIABILITYSTATEMENT_SHOW_INFO = function () {
  const json = {
    'success': 'true',
    'tableData': {
      'PKID': Random.guid(), // 主键
      'TITLE': '二驴',
      'SOURCE_NO': '赵铁柱'// 标题
    }
  }
  return json
}

// 安全绩效管理---安全责任书--子条目
const SPM_LIABILITYSTATEMENT_SHOW_INFO_CHID = function () {
  const json = {'success': 'true', 'msg': '数据新增成功！'}
  return json
}
// 安全绩效管理---安全责任书--添加
const SPM_LIABILITYSTATEMENT_ADD = function () {
  const json = {'success': 'true', 'msg': '数据删除成功！'}
  return json
}
// 安全绩效管理---安全责任书--删除
const SPM_LIABILITYSTATEMENT_DELETE = function () {
  const json = {'success': 'true', 'msg': '数据删除成功！'}
  return json
}

// 风险管理 风险专家库
const RISK_EXPERT_LIBRARY_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'INFO_NO': 'FX-ZJ-' + Random.date(),
      'FILE_NAME': Random.csentence(2, 10),
      'SOURCE_NO': Random.csentence(2, 15),
      'PUBLISH_DATE': Random.date(),
      'CREATE_DATE': Random.date(),
      'CREATE_USER_NAME': Random.cname()
    }
    articles.push(newArticleObject)
  }
  const json = {'Success': 'true', 'totals': 20, 'rows': articles}
  return json
}
const RISK_EXPERT_LIBRARY_ADD = function () {
  const json = {'Success': 'true', 'Msg': '添加成功！'}
  return json
}
const RISK_EXPERT_LIBRARY_DEL = function () {
  const json = {'Success': 'true', 'Msg': '删除成功！'}
  return json
}
const RISK_EXPERT_LIBRARY_SHOW_INFO = function () {
  const json = {
    'Success': 'true',
    'tableData': {
      'PKID': Random.guid(), // 主键
      'FILE_NO': 'FX-ZJ-' + Random.date(),
      'SOURCE_NO': Random.guid(),
      'PUBLISH_DATE': Random.date(),
      'FILE_NAME': Random.cname(),
      'EXPERT_ITEM': [{'EXPERT_NAME': Random.cname(), 'EXPERT_MFID': Random.cname(), 'EXPERT_DEPT': Random.pick(['a', 'b', 'c']), 'EXPERT_ORDER': Random.cname()},
        {'EXPERT_NAME': Random.cname(), 'EXPERT_MFID': Random.cname(), 'EXPERT_DEPT': Random.pick(['a', 'b', 'c']), 'EXPERT_ORDER': Random.cname()},
        {'EXPERT_NAME': Random.cname(), 'EXPERT_MFID': Random.cname(), 'EXPERT_DEPT': Random.pick(['a', 'b', 'c']), 'EXPERT_ORDER': Random.cname()}]
    }
  }
  return json
}
const SAFETY_RISK_EXPERT_LIST = function () {
  const json = {
    'Success': 'true',
    'rows': []
  }
  for (let i = 0; i < 1000; i++) {
    let newArticleObject = {'PKID': Random.guid(), 'EXPERT_NAME': Random.cname(), 'EXPERT_MFID': Random.integer(10000, 100000), 'EXPERT_DEPT': Random.pick(['a', 'b', 'c']), 'EXPERT_ORDER': Random.cname()}
    json.rows.push(newArticleObject)
  }
  return json
}

// 风险管理 风险评估通告
const RISK_ASSESSMENT_BULLETIN_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'EVA_NO': 'FX-ZJ-' + Random.date(),
      'SOURCE_NO': Random.csentence(2, 15),
      'FILE_NAME': Random.cname(),
      'BACKGROUND': Random.csentence(4, 10),
      'STATUS': Random.pick(['INIT', 'CLOSE', 'OPEN']),
      'CREATE_DATE': Random.date(),
      'CREATE_USER_NAME': Random.cname()
    }
    articles.push(newArticleObject)
  }
  const json = {'Success': 'true', 'totals': 20, 'rows': articles}
  return json
}

const RISK_ASSESSMENT_BULLETIN_ADD = function () {
  const json = {'Success': 'true', 'Msg': '添加成功！'}
  return json
}
const RISK_ASSESSMENT_BULLETIN_DELETE = function () {
  const json = {'Success': 'true', 'Msg': '删除成功！'}
  return json
}

//
const RISK_BANK_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'RISK_NO': 'FX-ZJ-' + Random.date(),
      'RISK_DOMAIN': Random.csentence(2, 15),
      'JOB_NO': Random.guid(),
      'JOB_NAME': Random.csentence(4, 10)
    }
    articles.push(newArticleObject)
  }
  const json = {'Success': 'true', 'totals': 20, 'rows': articles}
  return json
}
const RISK_BANK_ADD = function () {
  const json = {'Success': 'true', 'Msg': '添加成功！'}
  return json
}
const RISK_BANK_DELETE = function () {
  const json = {'Success': 'true', 'Msg': '删除成功！'}
  return json
}
const RISK_BANK_GET_INFO = function () {
  const json = {
    'PKID': Random.guid(), // 主键
    'RISK_NO': 'FX-ZJ-' + Random.date(),
    'RISK_DOMAIN': Random.csentence(2, 15),
    'JOB_NO': 'FX-ZJ-' + Random.date(),
    'JOB_NAME': Random.csentence(4, 10)
  }
  return json
}

// 安全活动
const SECURITY_ACTIVITY_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': 'PKID' + Random.increment(100),
      'ACTIVITY_NO': 'HD-' + Random.date(),
      'INFO_NO': 'XX-' + Random.date(),
      'ACTIVITY_CONTENT': Random.csentence(2, 20),
      'LAUNCH_DATE': Random.date(),
      'CREATE_USER_NAME': Random.cname()
    }
    articles.push(newArticleObject)
  };
  const json = {'success': 'true', 'totals': Random.integer(0, 1000), 'rows': articles}
  return json
}
const SECURITY_ACTIVITY_DELETE = function () {
  const json = {'Success': 'true', 'Msg': '删除成功！'}
  return json
}
const SECURITY_ACTIVITY_ADD = function () {
  const json = {'Success': 'true', 'Msg': '添加成功！'}
  return json
}
const SECURITY_ACTIVITY_SHOWINFO = function () {
  const json = {
    'Success': 'true',
    'tableData': {
      'PKID': 'PKID' + Random.increment(100),
      'ACTIVITY_NAME': Random.csentence(5, 20),
      'INFO_NO': 'HD-' + Random.date(),
      'WORD_NO': 'XX-' + Random.date(),
      'CONTENT': Random.csentence(50, 100),
      'CREATE_DATE': Random.date(),
      'START_DATE': Random.date(),
      'END_DATE': Random.date(),
      'CREATOR': Random.cname(),
      'UPLOADS': [{'id': 1, 'title': '附件001.jpg'}, {'id': 2, 'title': '附件002.jpg'}]
    }
  }
  return json
}

// 问题整改--获取数据
const QUESTION_GETINFO = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let newArticleObject = {
      'PKID': 'PKID' + Random.increment(100),
      'INFO_NO': 'XX-' + Random.date(),
      'INFO_TYPE': '机务维修',
      'INFO_SOURCE': 'OA',
      'RECEIVE_DATE': Random.date(),
      'INFO_CONTENT': '降落时前起',
      'EVA_OPINION': '质量调查',
      'TRACER': Random.cname(),
      'STATUS': '初稿',
      'CLOSE_DATE': Random.date(),
      'TYPESTATUS': Random.integer(-1, 3)
    }
    articles.push(newArticleObject)
  }
  ;
  const json = {'success': 'true', 'totals': Random.integer(0, 1000), 'rows': articles}
  return json
}

// 问题整改--查看
const QUESTION_SHOWINFO = function () {
  const json = {
    'success': 'true',
    'tableData': {
      'PKID': Random.guid(), // 主键
      'TITLE': '二驴',
      'SOURCE_NO': '赵铁柱'// 标题
    }
  }
  return json
}

// 问题整改--新增
const QUESTION_ADD = function () {
  const json = {'success': 'true', 'msg': '数据新增成功！'}
  return json
}
// 问题整改--删除
const QUESTION_DELETE = function () {
  const json = {'success': 'true', 'msg': '数据删除成功！'}
  return json
}

// 问题整改--获取来源编号PKID
const QUESTION_GET_SOURCE_NO = function () {
  const json = {'success': 'true', 'msg': '数据获取成功！'}
  return json
}

// 系统配置
const SYSTEM_CONFIGURATION_LIST = function () {
  let articles = []
  for (let i = 0; i < 20; i++) {
    let nums = Random.pick([0, 1, 2, 3])
    let childrens = []
    for (let k = 0; k < nums; k++) {
      let childrens2 = []
      for (let l = 0; l < nums; l++) {
        let childRow = {
          'PKID': Random.guid(), // 主键
          'SELECT_NAME': Random.csentence(2, 15),
          'SELECT_CODE': Random.pick(['KUGHG-988-988', 'JHGG8-988', 'KJHJ--988']),
          'SELECT_VALUE': Random.pick([1, 2, 3]),
          'SELECT_DATA': Random.pick(['数据1', '数据2']),
          'SELECT_ORDER': Random.integer(0, 3),
          'PARENT_ID': Random.guid(),
          'NOW_ID': Random.guid(),
          'IS_LEAF': Random.pick([1, 0])
        }
        childrens2.push(childRow)
      }
      let childRow = {
        'PKID': Random.guid(), // 主键
        'SELECT_NAME': Random.csentence(2, 15),
        'SELECT_CODE': Random.pick(['KUGHG-988-988', 'JHGG8-988', 'KJHJ--988']),
        'SELECT_VALUE': Random.pick([1, 2, 3]),
        'SELECT_DATA': Random.pick(['数据1', '数据2']),
        'SELECT_ORDER': Random.integer(0, 3),
        'PARENT_ID': Random.guid(),
        'NOW_ID': Random.guid(),
        'IS_LEAF': Random.pick([1, 0]),
        children: childrens2
      }
      childrens.push(childRow)
    }
    let newArticleObject = {
      'PKID': Random.guid(), // 主键
      'SELECT_NAME': Random.csentence(2, 15),
      'SELECT_CODE': Random.pick(['KUGHG-988-988', 'JHGG8-988', 'KJHJ--988']),
      'SELECT_VALUE': Random.pick([1, 2, 3]),
      'SELECT_DATA': Random.pick(['数据1', '数据2']),
      'SELECT_ORDER': Random.integer(0, 3),
      'PARENT_ID': Random.guid(),
      'NOW_ID': Random.guid(),
      'IS_LEAF': Random.pick([1, 0]),
      children: childrens
    }
    articles.push(newArticleObject)
  }
  const json = {'Success': true, 'totals': 200, 'rows': articles}
  return json
}// 列表
const SYSTEM_CONFIGURATION_MANAGEMENT = function () {
  const json = {'Success': true, 'Msg': '提交成功！'}
  return json
}// 新增/编辑/删除

// Mock.mock( url, post/get , 返回的数据)；
/* 首页 */
Mock.mock(API.PENDINGPROCESS, 'post', PENDINGPROCESS)// 审核流程
Mock.mock(API.WAITINGTASK, 'post', WAITINGTASK)// 我的任务

/* 安全信息 */
Mock.mock(API.SECURITY_INFORMATION_INDEX_LIST, 'post', SECURITY_INFORMATION_INDEX_LIST)// 任务列表
Mock.mock(API.SECURITY_INFORMATION_ADD, 'post', SECURITY_INFORMATION_ADD)// 保存数据
Mock.mock(API.SECURITY_INFORMATION_DELETE, 'post', SECURITY_INFORMATION_DELETE)// 删除数据
Mock.mock(API.SECURITY_INFORMATION_SHOW_INFO, 'get', SECURITY_INFORMATION_SHOW_INFO)// 查询数据

// 安全监察-安全监察计划
// Mock.mock(API.SM_SURVEILLANCEPROGRAMME_INDEX_LIST, 'post', SM_SURVEILLANCEPROGRAMME_INDEX_LIST);
// Mock.mock(API.SM_SURVEILLANCEPROGRAMME_SHOW_INFO, 'post', SM_SURVEILLANCEPROGRAMME_SHOW_INFO);
// Mock.mock(API.SM_SURVEILLANCEPROGRAMME_ADD, 'post', SM_SURVEILLANCEPROGRAMME_ADD);
// Mock.mock(API.SM_SURVEILLANCEPROGRAMME_DELETE, 'post', SM_SURVEILLANCEPROGRAMME_DELETE);

// 安全监察报告
// Mock.mock(API.SM_SAFETYMONITORINGREPORT_LIST, 'post', SM_SAFETYMONITORINGREPORT_LIST);
// Mock.mock(API.SM_SAFETYMONITORINGREPORT_ADD, 'post', SM_SAFETYMONITORINGREPORT_ADD);
// Mock.mock(API.SM_SAFETYMONITORINGREPORT_DELETE, 'post', SM_SAFETYMONITORINGREPORT_DELETE);
// Mock.mock(API.SM_SAFETYMONITORINGREPORT_SHOW_INFO, 'post', SM_SAFETYMONITORINGREPORT_SHOW_INFO);

// 安全监察单
// Mock.mock(API.SM_SAFETYMONITORINGSHEET_INDEX_LIST, 'post', SM_SAFETYMONITORINGSHEET_INDEX_LIST);//数据列表
// Mock.mock(API.SM_SAFETYMONITORINGSHEET_SHOW_INFO, 'post', SM_SAFETYMONITORINGSHEET_SHOW_INFO);//查看
// Mock.mock(API.SM_SAFETYMONITORINGSHEET_ADD, 'post', SM_SAFETYMONITORINGSHEET_ADD);//新增
// Mock.mock(API.SM_SAFETYMONITORINGSHEET_DELETE, 'post', SM_SAFETYMONITORINGSHEET_DELETE);//删除

// 质量调查--质量调查表列表
Mock.mock(API.QS_QUALITYSURVEYTABLE_TASK_LIST, 'post', QS_QUALITYSURVEYTABLE_TASK_LIST)// 任务列表
Mock.mock(API.QS_QUALITYSURVEYTABLE_TASK_END, 'post', QS_QUALITYSURVEYTABLE_TASK_END)// 终止任务
Mock.mock(API.QS_QUALITYSURVEYTABLE_LIST, 'post', QS_QUALITYSURVEYTABLE_LIST)// 编辑列表
Mock.mock(API.QS_QUALITYSURVEYTABLE_EDIT_DELETE, 'post', QS_QUALITYSURVEYTABLE_EDIT_DELETE)// 编辑列表
Mock.mock(API.QS_QUALITYSURVEYTABLE_ADD, 'post', QS_QUALITYSURVEYTABLE_ADD)// 保存数据
Mock.mock(API.QS_QUALITYSURVEYTABLE_GETINFO, 'post', QS_QUALITYSURVEYTABLE_GETINFO)// 获取数据

// 质量调查--MEDA表
Mock.mock(API.QS_MEDATABLE_ADD, 'post', QS_MEDATABLE_ADD)// 保存数据
Mock.mock(API.QS_MEDATABLE_DELETE, 'post', QS_MEDATABLE_DELETE)// 删除数据
Mock.mock(API.QS_MEDATABLE_GETINFO, 'post', QS_MEDATABLE_GETINFO)// 获取数据
Mock.mock(API.QS_MEDATABLE_INDEX_LIST, 'post', QS_MEDATABLE_INDEX_LIST)// 列表数据
Mock.mock(API.QS_MEDATABLE_MAINTENANCE_ETTOR, 'post', QS_MEDATABLE_MAINTENANCE_ETTOR)// 维修差错
Mock.mock(API.QS_MEDATABLE_INDUCEMENT_ANALYSIS, 'post', QS_MEDATABLE_INDUCEMENT_ANALYSIS)// 诱因分析

// 质量调查--FOD清单
Mock.mock(API.QS_FODLIST_ADD, 'post', QS_FODLIST_ADD)// 保存数据
Mock.mock(API.QS_FODLIST_LIST, 'post', QS_FODLIST_LIST)// 列表数据
Mock.mock(API.QS_FODLIST_DELETE, 'post', QS_FODLIST_DELETE)// 删除数据
Mock.mock(API.QS_FODLIST_GETINFO, 'post', QS_FODLIST_GETINFO)// 获取数据

// SAG管理----SAG成员管理
// Mock.mock(API.SAG_MEMBERMANAGEMENT_LIST, 'post', SAG_MEMBERMANAGEMENT_LIST);//查找数据
// Mock.mock(API.SAG_MEMBERMANAGEMENT_ADD, 'post', SAG_MEMBERMANAGEMENT_ADD);//添加数据
// Mock.mock(API.SAG_MEMBERMANAGEMENT_DELETE, 'post', SAG_MEMBERMANAGEMENT_DELETE);//删除数据
// Mock.mock(API.SAG_MEMBERMANAGEMENT_SHOW_INFO, 'post', SAG_MEMBERMANAGEMENT_SHOW_INFO);//保存数据
// Mock.mock(API.SAG_MEMBERMANAGEMENT_DEPTLIST, 'post', SAG_MEMBERMANAGEMENT_DEPTLIST);//保存数据

// SAG管理--持续监控计划
Mock.mock(API.SAG_CONTINUOUSMONITORINGPLAN_INDEX_LIST, 'post', SAG_CONTINUOUSMONITORINGPLAN_INDEX_LIST)// index列表数据
Mock.mock(API.SAG_CONTINUOUSMONITORINGPLAN_SHOW_INFO, 'post', SAG_CONTINUOUSMONITORINGPLAN_SHOW_INFO)// 编辑数据
Mock.mock(API.SAG_CONTINUOUSMONITORINGPLAN_ADD, 'post', SAG_CONTINUOUSMONITORINGPLAN_ADD)// 保存数据
Mock.mock(API.SAG_CONTINUOUSMONITORINGPLAN_DELETE, 'post', SAG_CONTINUOUSMONITORINGPLAN_DELETE)// 删除数据

// SAG管理--持续监控问题汇总
// Mock.mock(API.SAG_MONITORINGPROBLEMS_LIST, 'post', SAG_MONITORINGPROBLEMS_LIST);//列表数据
// Mock.mock(API.SAG_MONITORINGPROBLEMS_GETINFO, 'post', SAG_MONITORINGPROBLEMS_GETINFO);//获取数据
// Mock.mock(API.SAG_MONITORINGPROBLEMS_ADD, 'post', SAG_MONITORINGPROBLEMS_ADD);//提交保存数据

// SAG管理--SAG月报
Mock.mock(API.SAG_MONTHLY_REPORT_LIST, 'post', SAG_MONTHLY_REPORT_LIST)// 列表数据
Mock.mock(API.SAG_MONTHLY_REPORT_GET_INFO, 'post', SAG_MONTHLY_REPORT_GET_INFO)// 获取数据

// 奖惩管理-安全奖励说明表
Mock.mock(API.REWARD_INSTRUCTIONS_INDEX_LIST, 'post', REWARD_INSTRUCTIONS_INDEX_LIST)// 数据列表
Mock.mock(API.REWARD_INSTRUCTIONS_SHOW_INFO, 'post', REWARD_INSTRUCTIONS_SHOW_INFO)// 查看
Mock.mock(API.REWARD_INSTRUCTIONS_ADD, 'post', REWARD_INSTRUCTIONS_ADD)// 新增
Mock.mock(API.REWARD_INSTRUCTIONS_DELETE, 'post', REWARD_INSTRUCTIONS_DELETE)// 删除

// 奖惩管理----安全奖励申请表
Mock.mock(API.REWARD_MANAGEMENT_LIST, 'post', REWARD_MANAGEMENT_LIST)// 获取列表
Mock.mock(API.REWARD_MANAGEMENT_ADD, 'post', REWARD_MANAGEMENT_ADD)// 添加数据
Mock.mock(API.REWARD_MANAGEMENT_SHOWINFO, 'post', REWARD_MANAGEMENT_SHOWINFO)// 数据
Mock.mock(API.REWARD_MANAGEMENT_DELETE, 'post', REWARD_MANAGEMENT_DELETE)// 数据

// 奖惩管理-处罚管理
Mock.mock(API.REWARD_PUNISHMENT_INDEX_LIST, 'post', REWARD_PUNISHMENT_INDEX_LIST)// 数据列表
Mock.mock(API.REWARD_PUNISHMENT_SHOW_INFO, 'post', REWARD_PUNISHMENT_SHOW_INFO)// 查看
Mock.mock(API.REWARD_PUNISHMENT_ADD, 'post', REWARD_PUNISHMENT_ADD)// 新增
Mock.mock(API.REWARD_PUNISHMENT_DELETE, 'post', REWARD_PUNISHMENT_DELETE)// 删除

// 奖惩管理----奖罚通知
Mock.mock(API.REWARD_NOTICELSSUE_LIST, 'post', REWARD_NOTICELSSUE_LIST)// 数据
Mock.mock(API.REWARD_NOTICELSSUE_SHOW_INFO, 'post', REWARD_NOTICELSSUE_SHOW_INFO)// 数据
Mock.mock(API.REWARD_NOTICELSSUE_ADD, 'post', REWARD_NOTICELSSUE_ADD)// 数据
Mock.mock(API.REWARD_NOTICELSSUE_DELETE, 'post', REWARD_NOTICELSSUE_DELETE)// 数据

// 奖惩管理----其它申请录入
Mock.mock(API.REWARD_OTHER_ENTRY, 'post', REWARD_OTHER_ENTRY)// 保存数据

// 奖惩管理--其它
Mock.mock(API.REWARD_OTHER_GET_INFO, 'post', REWARD_OTHER_GET_INFO)// 获取数据
Mock.mock(API.REWARD_OTHER_REWARD_DELETE, 'post', REWARD_OTHER_REWARD_DELETE)// 删除数据

// 奖惩管理
Mock.mock(API.REWARD_PUNISHMENT_LIST, 'post', REWARD_PUNISHMENT_LIST)// 奖罚列表

// 安全绩效管理---安全责任书
Mock.mock(API.SPM_LIABILITYSTATEMENT_INFO_LIST, 'post', SPM_LIABILITYSTATEMENT_INFO_LIST)// 列表
Mock.mock(API.SPM_LIABILITYSTATEMENT_SHOW_INFO, 'post', SPM_LIABILITYSTATEMENT_SHOW_INFO)// 编辑
// Mock.mock(API.SPM_LIABILITYSTATEMENT_SHOW_INFO_CHID, 'post', SPM_LIABILITYSTATEMENT_SHOW_INFO_CHID);//编辑条目
Mock.mock(API.SPM_LIABILITYSTATEMENT_ADD, 'post', SPM_LIABILITYSTATEMENT_ADD)// 添加
Mock.mock(API.SPM_LIABILITYSTATEMENT_DELETE, 'post', SPM_LIABILITYSTATEMENT_DELETE)// 删除

// 风险管理-专家库
Mock.mock(API.RISK_EXPERT_LIBRARY_LIST, 'post', RISK_EXPERT_LIBRARY_LIST)// 列表
Mock.mock(API.RISK_EXPERT_LIBRARY_ADD, 'post', RISK_EXPERT_LIBRARY_ADD)// 添加
Mock.mock(API.RISK_EXPERT_LIBRARY_DEL, 'post', RISK_EXPERT_LIBRARY_DEL)// 删除
Mock.mock(API.RISK_EXPERT_LIBRARY_SHOW_INFO, 'post', RISK_EXPERT_LIBRARY_SHOW_INFO)// 获取
Mock.mock(API.SAFETY_RISK_EXPERT_LIST, 'post', SAFETY_RISK_EXPERT_LIST)// 专家库列表

// 风险管理-评估通告
Mock.mock(API.RISK_ASSESSMENT_BULLETIN_LIST, 'post', RISK_ASSESSMENT_BULLETIN_LIST)// 列表
Mock.mock(API.RISK_ASSESSMENT_BULLETIN_ADD, 'post', RISK_ASSESSMENT_BULLETIN_ADD)// 添加
Mock.mock(API.RISK_ASSESSMENT_BULLETIN_DELETE, 'post', RISK_ASSESSMENT_BULLETIN_DELETE)// 删除
// Mock.mock(API.RISK_ASSESSMENT_BULLETIN_GET_INFO, 'post', RISK_ASSESSMENT_BULLETIN_GET_INFO);//查询

// 风险管理--风险库
Mock.mock(API.RISK_BANK_LIST, 'post', RISK_BANK_LIST)// 列表
Mock.mock(API.RISK_BANK_ADD, 'post', RISK_BANK_ADD)// 列表
Mock.mock(API.RISK_BANK_DELETE, 'post', RISK_BANK_DELETE)// 列表
Mock.mock(API.RISK_BANK_GET_INFO, 'post', RISK_BANK_GET_INFO)// 列表

// 外站管理--外站通讯录
Mock.mock(API.EXTERNAL_STATION_ADDRESS_BOOK_LIST, 'post', EXTERNAL_STATION_ADDRESS_BOOK_LIST)// 列表
Mock.mock(API.EXTERNAL_STATION_ADDRESS_BOOK_ADDINFO, 'post', EXTERNAL_STATION_ADDRESS_BOOK_ADDINFO)// 新增保存 修改
Mock.mock(API.EXTERNAL_STATION_ADDRESS_BOOK_DELETE, 'post', EXTERNAL_STATION_ADDRESS_BOOK_DELETE)// 删除

// 外站管理--属地适用文件
Mock.mock(API.APPLICATION_FILE_INDEX_LIST, 'post', APPLICATION_FILE_INDEX_LIST)// 列表
Mock.mock(API.APPLICATION_FILE_DELETE, 'post', APPLICATION_FILE_DELETE)// 删除
Mock.mock(API.APPLICATION_FILE_ADD, 'post', APPLICATION_FILE_ADD)// 新增信息
Mock.mock(API.APPLICATION_FILE_GET_INFO, 'get', APPLICATION_FILE_GET_INFO)// 获取数据

// 外站管理--外站质量月报
Mock.mock(API.MONTHLY_REPORT_QUALITY_INDEX_LIST, 'post', MONTHLY_REPORT_QUALITY_INDEX_LIST)// 列表
Mock.mock(API.MONTHLY_REPORT_QUALITY_DELETE, 'post', MONTHLY_REPORT_QUALITY_DELETE)// 删除
Mock.mock(API.MONTHLY_REPORT_QUALITY_ADD, 'post', MONTHLY_REPORT_QUALITY_ADD)// 新增信息
Mock.mock(API.MONTHLY_REPORT_QUALITY_GET_INFO, 'get', MONTHLY_REPORT_QUALITY_GET_INFO)// 获取数据
// 安全活动
Mock.mock(API.SECURITY_ACTIVITY_LIST, 'post', SECURITY_ACTIVITY_LIST)// 查询
Mock.mock(API.SECURITY_ACTIVITY_ADD, 'post', SECURITY_ACTIVITY_ADD)// 添加
Mock.mock(API.SECURITY_ACTIVITY_DELETE, 'post', SECURITY_ACTIVITY_DELETE)// 删除
Mock.mock(API.SECURITY_ACTIVITY_SHOWINFO, 'post', SECURITY_ACTIVITY_SHOWINFO)// 获取

// 问题整改
Mock.mock(API.QUESTION_GETINFO, 'post', QUESTION_GETINFO)// 获取数据
Mock.mock(API.QUESTION_SHOWINFO, 'post', QUESTION_SHOWINFO)// 编辑
Mock.mock(API.QUESTION_ADD, 'post', QUESTION_ADD)// 新增
Mock.mock(API.QUESTION_DELETE, 'post', QUESTION_DELETE)// 删除
Mock.mock(API.QUESTION_GET_SOURCE_NO, 'post', QUESTION_GET_SOURCE_NO)// 获取来源编号PKID

// 系统配置
Mock.mock(API.SYSTEM_CONFIGURATION_LIST, 'post', SYSTEM_CONFIGURATION_LIST)// 列表
Mock.mock(API.SYSTEM_CONFIGURATION_MANAGEMENT, 'post', SYSTEM_CONFIGURATION_MANAGEMENT)// 新增编辑删除
