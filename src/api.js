/**
 * Created by yz on 2018/3/7 0007.
 * api 路径配置文件
 */

import API_DEV from './api/api_dev.js'// 测试环境配置
import API_PROD from './api/api_prod.js'// 生产环境配置

// 基础配置
const API_COMMON = {
  // 加载动画效果
  LOADING_INFO: {
    text: '玩命加载中...',
    background: 'rgba(255,255,255, 0.3)'
  },
  SAVE_INFO: {
    text: '数据正在处理，请稍候...',
    background: 'rgba(255,255,255, 0.3)'
  },
  CANCEL_INFO: {
    text: '注销中，请稍候...',
    background: 'rgba(255,255,255, 0.3)'
  },
  // 页码大小配置
  PAGE_SIZE: [50, 100, 200],

  // 公共下拉类型
  COMMON_INFO_SOURCE: 'Select/GetSelectCodeList', // 获取字段表信息接口
  COMMON_APPLY_OFFICE: 'Select/GetSelectOfficeList', // 获取申请处室信息接口

  // 安全管理-SMS信息管理
  MEQUALITY_SMS: 'http://mequality.xiamenair.com.cn/safety/sms/list', // 查询
  MEQUALITY_SMSE: 'http://mequality.xiamenair.com.cn/safety/sms/deptcount?deptid=10.120', // 统计
  MEQUALITY_BI: 'http://dmbi.xiamenair.com.cn/BIReport/main.action',

  // 下拉选择搜索标识
  INFO_ALL_TYPE: {
    INFO_SOURCE: 'SAFETY_INFO_SOURCE', // 安全信息--来源
    INFO_TYPE: 'SAFETY_INFO_TYPE', // 安全信息--信息类型
    EVA_OPINION: 'EVALUATE_PROPOSAL', // 安全信息-评估建议
    RI_STATUS: 'RI_STATUS', // 风险管理状态
    CONTROL_DEPT: 'DEPARTMENT', // 风险管理部门
    SI_STATUS: 'SI_STATUS', // 安全信息状态
    PB_STATUS: 'PB_STATUS', // 模块公共状态
    PA_STATUS: 'PA_STATUS', // 活动与问题状态
    OT_STATUS: 'OT_STATUS', // 其它奖励或处罚状态
    PW_STATUS: 'PW_STATUS', // 安全奖励说明表状态
    AA_STATUS: 'AA_STATUS', // 安全奖励申请表状态
    DEPARTMENT: 'DEPARTMENT', // 部门
    SAG_DEPT: 'SAGDEPARTMENT', // SAG部门
    // 质量调查
    EVENT_SITE: 'EVENT_LOCATION', // 事件发生地点
    MODEL: 'AC_TYPE', // 机型
    EVENT_PROPERTY: 'EVENT_PROPERTY', // 事件发生地点
    PB_OBJECT_TYPE: 'EVENT_PROPERTY', // 事件发生地点
    EVENT_SECTION: 'EVENT_TIME_PERIOD', // 事件发生地点
    // SAG管理
    DEPT: 'DEPARTMENT', // 成员所在部门
    // CONTROL_CYCLE:'PERFORMANCE_MONITOR_TARGET_CYCLE',//监控周期
    CONTROL_UNIT: 'SAGDEPARTMENT', // 监控单位
    // 奖惩管理
    OBJECT_DEPT: 'DEPARTMENT', // 部门
    OBJECT_TYPE: 'REWARD_TYPE', // 奖励级别
    OBJECT_GRADE: 'REWARD_GRADE', // 奖励等级
    OBJECT_LEVEL: 'REWARD_LEVEL', // 奖励类别
    PENALTY_TYPE: 'PENALTY_TYPE', // 处罚类别
    PEN_OBJECT_TYPE: 'PENALTY_TYPE', // 处罚类别
    DUTY_DIVIDE: 'REPONSIBILITY_PARTITION', // 责任划分

    SUP_OFFICE: 'DEPARTMENT', // 被检测单位
    STAFF_TYPE: 'POSITION', // 人员类型
    FILE_BASE: 'FIT_OUTSTATION', // 外站管理-适用属地
    DUTY_OFFICE: 'SAG_REPORT_UNIT', // 责任单位
    PROBLEM_TYPE: 'ISSUE_CATEGORY_PRIMARY', // 问题整改--大问题分类
    PROBLEM_ITEM: 'ISSUE_CATEGORY_SECOND', // 问题整改--小问题分类
    ERROR_TYPE: 'MAINTENANCE_ERROR_TYPE', // 问题整改--维修差错类型
    ERROR_ITEM: 'MAINTENANCE_ERROR_TYPE_SECOND', // 问题整改--维修差错类型子项
    CAUSE_TYPE: 'INDUCE_ANALYSIS_TYPE', // 问题整改--诱因分析类型
    CAUSE_ITEM: 'INDUCE_ANALYSIS_TYPE_SECOND', // 问题整改--诱因分析类型子项
    PROBLEM_SOURCE: 'ISSUE_SOURCE', // 问题整改--问题来源
    DUTY_DEPT: 'SAGDEPARTMENT', // 安全绩效管理/维修重要风险库--部门
    PERFORMANCE_MONITOR_CYCLE: 'PERFORMANCE_MONITOR_CYCLE', // 监控周期
    ISSUE_SOURCE: 'ISSUE_SOURCE', // 问题来源,
    SA_STATUS: 'SA_STATUS', // SAG状态
    MAINTENANCE_ERROR_TYPE: 'MAINTENANCE_ERROR_TYPE', // 维修差错类型
    MAINTENANCE_ERROR_TYPE_SECOND: 'MAINTENANCE_ERROR_TYPE_SECOND', // 维修差错类型(续)
    INDUCE_ANALYSIS_TYPE: 'INDUCE_ANALYSIS_TYPE', // 诱因分析类型
    REWARD_GRADE: 'REWARD_GRADE', // 奖励等级
    INDUCE_ANALYSIS_TYPE_SECOND: 'INDUCE_ANALYSIS_TYPE_SECOND', // 安全绩效管理--部门
    ITEM_TYPE: 'PERFORMANCE_CRITERION', // 安全绩效管理--分类
    ITEM_NAME: 'PERFORMANCE_SUBJECT', // 安全绩效管理--项目
    SUB_ITEM: 'PERFORMANCE_ITEM', // 安全绩效管理--小项
    TYPE: 'PERFORMANCE_INDEX_CATEGORY', // 安全绩效管理--类别
    INDICATOR_ITEM: 'PERFORMANCE_INDEX', // 安全绩效管理--绩效指标
    INDICATOR_SOURCE: 'PERFORMANCE_INDEX_REFERENCE', // 安全绩效管理--指标来源（识别途径）
    UNIT: 'PERFORMANCE_INDEX_MEASURE', // 安全绩效管理--度量单位
    CONTROL_CYCLE: 'PERFORMANCE_MONITOR_TARGET_CYCLE', // 安全绩效管理--目标控制周期
    MONITOR_CYCLE: 'PERFORMANCE_MONITOR_CYCLE', // 安全绩效管理--监测周期
    SUP_SOURCE: 'PERFORMANCE_MONITOR_REFRENCE', // 安全绩效管理--监控信息来源
    EXPERT_DEPT: 'DEPARTMENT', // 部门
    RISK_DOMAIN: 'RISK_DOMAIN', // 重要维修风险库编辑--风险领域
    DANGER_SCALE: 'SEVERITY', // 风险评估通告编辑--严重程度
    RISK_SCALE: 'SEVERITY', // 风险评估通告编辑--严重程度
    DANGER_POSSIBILITY: 'POSSIBILITY'// 风险评估通告编辑--可能性
  },

  // 文字提示配置
  TOOL_TIPS: {
    REQUIRED_TEXT: '存在必填项未填，请检查后重试！',
    MANDATORY_FIELD: '带*号为必填！'
  },

  // 选择人员接口
  PERSON_SELECT: 'PersonSelect/GetOfficeByDept',

  // 新增获取信息
  GETOBJMODEL: 'TaskInfo/GetObjmodel',

  // 树形结构选择人员
  SEL_TREE_SELECT: 'Select/GetSelectOfficeEmp',

  // 首页
  PENDINGPROCESS: 'Template/GetMyProcess', // 审核流程
  WAITINGTASK: 'Template/GetMyTask', // 审核流程

  // 安全信息接口

  SECURITY_INFORMATION_INDEX_LIST: 'SafetyInfo/GetSafetyInfoList', // 编辑查看列表
  SECURITY_INFORMATION_APPROVE: 'SafetyInfo/GetSafetyInfoAppList', // 编辑审批列表
  SECURITY_INFORMATION_ADD: 'SafetyInfo/SaveSafetyInfoInfoAddorUpdate', // 新增保存数据
  SECURITY_INFORMATION_DELETE: 'SafetyInfo/DelSafetyInfo', // 编辑删除
  SECURITY_INFORMATION_SHOW_INFO: 'SafetyInfo/GetSafetyInfoOne', // 查看信息
  SECURITY_INFORMATION_FEEDBACK: 'SafetyInfo/CloseSafetyInfo', // 意见反馈提交
  SECURITY_INFORMATION_VERSION: 'SafetyInfo/GetRevOne', // 获取版本编号
  SECURITY_INFORMATION_VERSION_LIST: 'SafetyInfo/GetRevEditList', // 获取版本列表
  SECURITY_INFORMATION_VERSION_DETAIL: 'SafetyInfo/GetRevDetail', // 获取版本列表详情
  SECURITY_INFORMATION_VERSION_ADD: 'SafetyInfo/SaveRevSafetyInfo', // 添加版本列表详情
  SECURITY_INFORMATION_VERSION_SAVE: 'SafetyInfo/SaveRev', // 添加版本列表详情
  SECURITY_INFORMATION_VERSION_DELETE: 'SafetyInfo/DelRevSafetyInfo', // 删除版本列表详情
  SECURITY_INFORMATION_VERSION__LIST_DELETE: 'SafetyInfo/DelRev', // 删除版本列表详情
  SECURITY_INFORMATION_ExportToExcel: 'Export/ExportToExcelSafetyInfo', // 导出Excel

  // 安全监察--监察计划
  SM_SURVEILLANCEPROGRAMME_YEAR_LIST: 'SafetySupPlanYear/GetSafetySupPlanYearList', // 年编辑列表
  SM_SURVEILLANCEPROGRAMME_YEARAPPROVAL_LIST: 'SafetySupPlanYear/GetSafetySupPlanYearApprovalList', // 年审批列表
  SM_SURVEILLANCEPROGRAMME_YEAR_ADD: 'SafetySupPlanYear/SaveSafetySupPlanYearAddorUpdate', // 新增保存数据
  SM_SURVEILLANCEPROGRAMME_YEAR_EDIT: 'SafetySupPlanYear/GetSafetySupPlanYearIdModel', // 编辑
  SM_SURVEILLANCEPROGRAMME_YEAR_DEIT_CHILD: 'SafetySupPlanYear/GetSafetySupPlanYearIdList', // 编辑子表
  SM_SURVEILLANCEPROGRAMME_YEAR_DELETE: 'SafetySupPlanYear/DelSafetySupPlanYear', // 删除

  SM_SAFETY_GROUP: 'SafetySupPlanYear/SafetyGroupList', // 获取安全监察组员

  SM_SURVEILLANCEPROGRAMME_MONTH_BYDATE: 'SafetySupPlanMonth/ReviseSafetySupPlanMonthItem', // 修订监察月计划
  SM_SURVEILLANCEPROGRAMME_MONTH_LIST: 'SafetySupPlanMonth/GetSafetySupPlanMonthList', // 月计划列表
  SM_SURVEILLANCEPROGRAMME_MONTHAPPROVAL_LIST: 'SafetySupPlanMonth/GetSafetySupPlanMonthApprovalList', // 月审批列表
  SM_SURVEILLANCEPROGRAMME_MONTH_ADD: 'SafetySupPlanMonth/SaveSafetySupPlanMonthAddorUpdate', // 新增保存数据
  SM_SURVEILLANCEPROGRAMME_MONTH_EDIT: 'SafetySupPlanMonth/GetSafetySupPlanMonthIdModel', // 编辑
  SM_SURVEILLANCEPROGRAMME_MONTH_DEIT_ITEMCHILD: 'SafetySupPlanMonth/GetSafetySupPlanMonthIdListITEM', // 编辑子表
  SM_SURVEILLANCEPROGRAMME_MONTH_DEIT_RELATEDCHILD: 'SafetySupPlanMonth/GetSafetySupPlanMonthIdListRELATED', // 编辑子表
  SM_SURVEILLANCEPROGRAMME_MONTH_DELETE: 'SafetySupPlanMonth/DelSafetySupPlanMonth', // 删除
  SM_SURVEILLANCEPROGRAMME_MONTH_SUPERVISION_FORM: 'SafetySupPlanMonth/GetSupervisionFormSelectList', // 监察单下拉
  SM_SURVEILLANCEPROGRAMME_MONTH_INFO_NO: 'SafetySupPlanMonth/GetInfoNoSelectList', // 安全信息编号下拉
  SM_SURVEILLANCEPROGRAMME_MONTH_ISFORM: 'SafetySupPlanMonth/GetDealWithTaskModel', // 根据任务PKID查询是否已有月计划
  SM_SURVEILLANCEPROGRAMME_MONTH_PLAN: 'SafetySupPlanMonth/GotYearPlansMonthItem', // 根据年月获取对应的监察计划

  SM_SURVEILLANCEPROGRAMME_SUPTASK_LIST: 'SafetySupPlanMonth/GetSafetySupTaskList', // 获取执行计划记录列表

  TASKINFO_LIST: 'TaskInfo/GetReturnTaskTest', // 根获取任务列表
  TASKINFO_STOP: 'TaskInfo/StopReturnTaskTest', // 终止任务

  SM_SURVEILLANCEPROGRAMME_TASK_LIST: 'SafetySupPlanMonth/GetSafetySupPlanTaskList', // 月列表--执行
  SM_SURVEILLANCEPROGRAMME_TASK_ADD: 'SafetySupPlanMonth/SaveSafetySupPlanTaskAddorUpdate', // 新增保存数据--执行
  SM_SURVEILLANCEPROGRAMME_TASK_EDIT: 'SafetySupPlanMonth/GetSafetySupPlanTaskIdModel', // 编辑--执行
  SM_SURVEILLANCEPROGRAMME_TASK_DEIT_CHILD: 'SafetySupPlanMonth/GetSafetySupPlanTaskIdList', // 编辑子表--执行

  // 安全监察单
  SM_SAFETYMONITORINGSHEET_INDEX_LIST: 'SafetySupForm/GetSafetySupFormList', // 编辑列表
  SM_SAFETYMONITORINGSHEET_APPROVAL_LIST: 'SafetySupForm/GetSafetySupFormApprovalList', // 审批列表
  SM_SAFETYMONITORINGSHEET_SHOW_INFO: 'SafetySupForm/GetSafetySupFormId', // 编辑
  SM_SAFETYMONITORINGSHEET_SHOW_INFO_CHID: 'SafetySupForm/GetSafetySupFormIdModel', // 编辑条目
  SM_SAFETYMONITORINGSHEET_ADD: 'SafetySupForm/SaveSafetySupFormAddorUpdate', // 新增
  SM_SAFETYMONITORINGSHEET_DELETE: 'SafetySupForm/DelSafetySupForm', // 删除
  SM_SAFETYMONITORINGSHEET_REVISE: 'SafetySupForm/ChangePageAddForm', // 修订

  // 安全监察--安全监察报告
  SM_SAFETYMONITORINGREPORT_LIST: 'SafetySupReport/GetSafetySupReportList', // 编辑列表
  SM_SAFETYMONITORINGREPORT_APPROVAL_LIST: 'SafetySupReport/GetSafetySupReportApprovalList', // 审批列表
  SM_SAFETYMONITORINGREPORT_SHOW_INFO: 'SafetySupReport/GetSafetySupReportId', // 编辑
  SM_SAFETYMONITORINGREPORT_ADD: 'SafetySupReport/SaveSafetySupReportAddorUpdate', // 添加列表
  SM_SAFETYMONITORINGREPORT_DELETE: 'SafetySupReport/DelSafetySupReport', // 删除列表

  // 质量调查--质量调查表
  QS_QUALITYSURVEYTABLE_TASK_LIST: 'QualitySurveyTable/GetQualitySurveyList', // 任务列表
  QS_QUALITYSURVEYTABLE_TASK_END: 'qualitySurvey/qualitySurveyTable/End', // 终止任务
  QS_QUALITYSURVEYTABLE_LIST: 'QualitySurveyTable/GetQualitySurveyList', // 信息列表
  QS_QUALITYSURVEYTABLE_EDIT_DELETE: 'QualitySurveyTable/DelQualitySurveyList', // 编辑删除信息
  QS_QUALITYSURVEYTABLE_ADD: 'QualitySurveyTable/AddQualitySurveyList', // 新增保存数据
  QS_QUALITYSURVEYTABLE_GETINFO: 'QualitySurveyTable/GetQualitySurveyOne', // 获取数据
  QS_QUALITYSURVEYTABLE_APPLIST: 'QualitySurveyTable/GetQualitySurveyAppList', // 获取审批列表

  // 质量调查--MEDA表
  QS_MEDATABLE_INDEX_LIST: 'QualitySurveyMEDA/GetQualitySurveyList', // 列表
  QS_MEDATABLE_ADD: 'QualitySurveyMEDA/AddQualitySurveyList', // 新增保存数据
  QS_MEDATABLE_DELETE: 'QualitySurveyMEDA/DelQualitySurveyList', // 编辑删除信息
  QS_MEDATABLE_GETINFO: 'QualitySurveyMEDA/GetQualitySurveyOne', // 获取数据
  QS_MEDATABLE_MAINTENANCE_ETTOR: 'QualitySurveyMEDA/MaintenanceError', // 维修差错
  QS_MEDATABLE_INDUCEMENT_ANALYSIS: 'QualitySurveyMEDA/InducementAnalysis', // 诱因分析

  // 质量调查--FOD清单
  QS_FODLIST_LIST: 'QualitySurveyFOD/GetQualitySurveyList', // 任务列表
  QS_FODLIST_ADD: 'QualitySurveyFOD/AddQualitySurveyList', // 新增保存数据
  QS_FODLIST_DELETE: 'QualitySurveyFOD/DelQualitySurveyList', // 删除数据成功
  QS_FODLIST_GETINFO: 'QualitySurveyFOD/GetQualitySurveyOne', // 获取数据

  // SAG管理----SAG成员管理
  SAG_MEMBER_MANAGEMENT_ALL_LIST: 'SAGMemberManagement/GetSAGMemberAllList', // 列表加子表
  SAG_MEMBER_MANAGEMENT_LIST: 'SAGMemberManagement/GetSAGMemberList', // 列表
  SAG_MEMBER_MANAGEMENT_ADD: 'SAGMemberManagement/SaveSAGMemberList', // 增加
  SAG_MEMBER_MANAGEMENT_DELETE: 'SAGMemberManagement/DelSAGMemberList', // 删除
  SAG_MEMBER_MANAGEMENT_SHOW_INFO: 'SAGMemberManagement/GetSAGMember', // 获取

  // SAG管理----持续监控计划
  SAG_CONTINUOUS_MONITORING_PLAN_LIST: 'SAGMonitoringPlan/GetSAGPlanList', // 列表
  SAG_CONTINUOUS_MONITORING_PLAN_APP_LIST: 'SAGMonitoringPlan/GetSAGPlanAppList', // 审批列表
  SAG_CONTINUOUS_MONITORING_PLAN_GETINFO: 'SAGMonitoringPlan/GetSAGPlanOne', // 编辑
  SAG_CONTINUOUS_MONITORING_PLAN_ADD: 'SAGMonitoringPlan/SaveSAGPlanList', // 新增
  SAG_CONTINUOUS_MONITORING_PLAN_DELETE: 'SAGMonitoringPlan/DelSAGPlanList', // 删除
  SAG_CONTINUOUS_MONITORING_PLAN_CHECK: 'SAGMonitoringPlan/CheckPlanList', // 验证

  // SAG-管理--SAG持续问题监控汇总
  SAG_MONITORING_PROBLEMS_LIST: 'SAGMonitoringProblem/GetSAGProblemList', // 所有列表
  SAG_MONITORING_PROBLEMS_MONTH_LIST: 'SAGMonitoringProblem/GetSAGProblemListByCurrentMonth', // 当前月列表
  SAG_MONITORING_PROBLEMS_SHOW_INFO: 'SAGMonitoringProblem/GetSAGProblemAndRectify', // 获取数据
  SAG_MONITORING_PROBLEMS_ADD: 'SAGMonitoringProblem/AddProblemRectify', // 问题录入
  SAG_MONITORING_PROBLEMS_DELETE: 'SAGMonitoringProblem/DelProblemRectify', // 问题删除
  SAG_MONITORING_PROBLEMS_MAIN_ADD: 'SAGMonitoringProblem/ModifySAGProblem', // 编辑
  SAG_MONITORING_PROBLEMS_APPROVAL: 'SAGMonitoringProblem/ApproveSAGProblem', // 批准

  // SAG-管理--SAG月报
  SAG_MONTHLY_REPORT_LIST: 'SAGMonthlyReport/GetSAGReportList', // 列表
  SAG_MONTHLY_REPORT_APP_LIST: 'SAGMonthlyReport/GetSAGReportAppList', // 审批列表
  SAG_MONTHLY_REPORT_ADD: 'SAGMonthlyReport/SaveSAGReportList', // 新增
  SAG_MONTHLY_REPORT_DELETE: 'SAGMonthlyReport/DelSAGReportList', // 删除
  SAG_MONTHLY_REPORT_GET_INFO: 'SAGMonthlyReport/GetSAGReportOne', // 获取

  // 奖惩管理-安全奖励说明表
  REWARD_INSTRUCTIONS_INDEX_LIST: 'AwardDescriptionTable/GetDescriptionTableList', // 列表
  REWARD_INSTRUCTIONS_APPROVAL_LIST: 'AwardDescriptionTable/GetDescriptionTableApprovalList', // 审批列表
  REWARD_INSTRUCTIONS_SHOW_INFO: 'AwardDescriptionTable/GetDescriptionTableIdModel', // 编辑
  REWARD_INSTRUCTIONS_SHOW_INFO_CHID: 'AwardDescriptionTable/GetDescriptionTableIdList', // 编辑条目
  REWARD_INSTRUCTIONS_ADD: 'AwardDescriptionTable/SaveDescriptionTableAddorUpdate', // 新增
  REWARD_INSTRUCTIONS_DELETE: 'AwardDescriptionTable/DelDescriptionTable', // 删除

  // 奖惩管理--安全奖励申请表
  REWARD_MANAGEMENT_LIST: 'AwardApply/GetAwardApplyList', // 列表
  REWARD_MANAGEMENT_APP_LIST: 'AwardApply/GetAwardApplyAppList', // 审批列表
  REWARD_MANAGEMENT_ADD: 'AwardApply/UpdateAwardApplyData', // 新增
  REWARD_MANAGEMENT_DELETE: 'AwardApply/StopSafetyActivityData', // 删除
  REWARD_MANAGEMENT_SHOW_INFO: 'AwardApply/GetAwardApplyDataById', // 编辑

  // 奖惩管理-处罚管理
  REWARD_PUNISHMENT_INDEX_LIST: 'AwardOther/GetAwardOtherList', // 列表
  REWARD_PUNISHMENT_APP_LIST: 'AwardOther/GetAwardOtherAppList', // 审批列表
  // REWARD_PUNISHMENT_SHOW_INFO: 'AwardOther/GetSafetySupFormId6',//编辑
  REWARD_PUNISHMENT_ADD: 'AwardOther/AddSafetyActivityList', // 新增
  REWARD_PUNISHMENT_DELETE: 'AwardOther/DelAwardOtherData', // 删除

  // 奖惩管理--奖罚通知
  REWARD_NOTICELSSUE_LIST: 'AwardOther/GetNoticeList',
  REWARD_NOTICELSSUE_DELETE: 'AwardOther/DelAwardNoticeData',
  REWARD_NOTICELSSUE_ADD: 'AwardOther/AddAwardOtherNotice',
  REWARD_NOTICELSSUE_SHOW_INFO: 'AwardOther/GetNoticeModel',
  REWARD_NOTICELSSUE_APP_LIST: 'AwardOther/GetUnpublishedList',
  REWARD_NOTICELSSUE_APP_INFO: 'AwardOther/GetAwardOtherDataById', // 根据pkid其他奖励申请数据

  // 奖惩管理--其它奖励录入
  REWARD_OTHER_ENTRY: 'rewardManagement/otherEntry',

  // 奖惩管理--获取数据
  REWARD_OTHER_GET_INFO: 'rewardManagement/otherRewardGetInfo',
  REWARD_OTHER_REWARD_DELETE: 'rewardManagement/otherRewardDeleteInfo', // 编辑删除信息

  // 奖惩管理--奖罚审批
  REWARD_PUNISHMENT_LIST: 'rewardManagement/rewardAndPunishmentList',

  // 安全绩效管理--安全责任书
  SPM_LIABILITYSTATEMENT_INFO_LIST: 'PerformDuty/GetPerformDutyList', // 列表
  SPM_LIABILITYSTATEMENT_SHOW_INFO: 'PerformDuty/GetPerformDutyDataById', // 编辑
  SPM_LIABILITYSTATEMENT_ADD: 'PerformDuty/UpdatePerformDutyData', // 新增
  SPM_LIABILITYSTATEMENT_DELETE: 'PerformDuty/DelPerformDutyData', // 删除

  // 安全绩效管理--考核标准
  SPM_RULE_INFO_LIST: 'PerformRule/GetPerformRuleList', // 列表
  SPM_RULE_SHOW_INFO: 'PerformRule/GetPerformRuleDataById', // 编辑
  SPM_RULE_ADD: 'PerformRule/UpdatePerformRuleData', // 新增
  SPM_RULE_DELETE: 'PerformRule/DelPerformRuleData', // 删除
  SPM_RULE_COPY: 'PerformRule/GetPerformRuleAll', // 复制历史
  SPM_RULE_COPY_LIST: 'PerformRule/GetPerformRuleItem', // 复制历史

  // 安全绩效管理--考核结果
  SPM_RESULT_INFO_LIST: 'PerformResult/GetPerformResultList', // 列表
  SPM_RESULT_INFO_APPLIST: 'PerformResult/GetPerformResultAppList', // 审批列表
  SPM_RESULT_SHOW_INFO: 'PerformResult/GetPerformResultDataById', // 编辑
  SPM_RESULT_ADD: 'PerformResult/UpdatePerformResultData', // 新增
  SPM_RESULT_DELETE: 'PerformResult/DelPerformResultData', // 删除
  SPM_RESULT_SCORE: 'PerformResult/GetPerformResultScore', // 计算得分
  SPM_RESULT_CKECK_SHOW_INFO: 'PerformResult/GetPerformResultDataById_CKECK', // 查询

  // 安全绩效管理--指标库
  SPM_INDEXLIBRARY_INFO_LIST: 'PerformIndicator/GetPerformIndicatorList', // 列表
  SPM_INDEXLIBRARY_SHOW_INFO: 'PerformIndicator/GetPerformIndicatorDataById', // 编辑
  SPM_INDEXLIBRARY_ADD: 'PerformIndicator/UpdatePerformIndicatorData', // 新增
  SPM_INDEXLIBRARY_DELETE: 'PerformIndicator/DelPerformIndicatorData', // 删除
  SPM_INDEXLIBRARY_COPY: 'PerformIndicator/GetPerformIndicatorHistory', // 删除
  SPM_INDEXLIBRARY_COPY_LIST: 'PerformIndicator/GetPerformIndicatorHistoryItem', // 删除
  SPM_INDEXLIBRARY_LIB_NO_LIST: 'PerformIndicator/GetPerformIndicatorSelectList', // 指标库下拉
  SPM_INDEXLIBRARY_CHILD_INFO_LIST: 'PerformIndicator/GetPerformIndicatorChildList', // 子父关联查询列表
  SPM_INDEXLIBRARY_SHOW_INFO_CHID_MODEL: 'PerformIndicator/GetPerformIndicatorIdModel', // 字表单条信息

  // 外站管理--外站通讯录
  EXTERNAL_STATION_ADDRESS_BOOK_LIST: 'ExternalStationAddressBook/GetExternalStationAddressBookList',
  EXTERNAL_STATION_ADDRESS_BOOK_ADDINFO: 'ExternalStationAddressBook/ExternalStationAddressBookAddorUpdate',
  EXTERNAL_STATION_ADDRESS_BOOK_DELETE: 'ExternalStationAddressBook/DelExternalStationAddressBook',

  // 外站管理--属地适用文件
  APPLICATION_FILE_INDEX_LIST: 'ExternalStationApplicationFile/GetExternalStationApplicationFileList', // 列表
  APPLICATION_FILE_APPROVE_LIST: 'ExternalStationApplicationFile/GetExternalStationApplicationFileAppList', // 编辑审批列表
  APPLICATION_FILE_DELETE: 'ExternalStationApplicationFile/DelExternalStationApplicationFile', // 编辑删除
  APPLICATION_FILE_ADD: 'ExternalStationApplicationFile/ExternalStationApplicationFileAddorUpdate', // 新增
  APPLICATION_FILE_GET_INFO: 'ExternalStationApplicationFile/GetExternalStationApplicationFile', // 获取数据

  // 外站管理--质量月报
  MONTHLY_REPORT_QUALITY_INDEX_LIST: 'ExternalStationMonthlyReport/GetExternalStationMonthlyReportList', // 列表
  MONTHLY_REPORT_QUALITY_APPROVE_LIST: 'ExternalStationMonthlyReport/GetExternalStationMonthlyReportAppList', // 编辑审批列表
  MONTHLY_REPORT_QUALITY_DELETE: 'ExternalStationMonthlyReport/DelExternalStationMonthlyReport', // 编辑删除
  MONTHLY_REPORT_QUALITY_ADD: 'ExternalStationMonthlyReport/ExternalStationMonthlyReportAddorUpdate', // 保存
  MONTHLY_REPORT_QUALITY_GET_INFO: 'ExternalStationMonthlyReport/GetExternalStationMonthlyReport', // 获取数据

  // 风险管理--风险专家库
  RISK_EXPERT_LIBRARY_LIST: 'RiskManage/GetRiskHireNoteList', // 查询
  RISK_EXPERT_LIBRARY_ADD: 'RiskManage/AddRiskHireNote', // 添加
  RISK_EXPERT_LIBRARY_DEL: 'RiskManage/DelRiskHireNote', // 删除
  RISK_EXPERT_LIBRARY_SHOW_INFO: 'RiskManage/GetRiskHireNoteById', // 获取
  SAFETY_RISK_EXPERT_LIST: 'RiskManage/GetRiskExpertList', // 专家库查询

  // 风险管理--风险评估通告
  RISK_ASSESSMENT_BULLETIN_LIST: 'RiskManage/GetRiskEvaNoteList', // 列表
  RISK_ASSESSMENT_BULLETIN_APPROVE_LIST: 'RiskManage/GetRiskEvaNoteAppList', // 列表
  RISK_ASSESSMENT_BULLETIN_ADD: 'RiskManage/AddRiskEvaNote', // 保存
  RISK_ASSESSMENT_BULLETIN_DELETE: 'RiskManage/DelRiskEvaNote', // 编辑删除
  RISK_ASSESSMENT_BULLETIN_GET_INFO: 'RiskManage/GetRiskEvaNoteById', // 获取数据

  // 风险管理--风险措施反馈
  RISK_MEASURES_TRACKING_ADD: 'RiskManage/FeedBackRiskEvaNote', // 措施反馈
  RISK_MEASURES_TRACKING_SURE: 'RiskManage/ConfirmRiskEvaNote', // 反馈确认
  RISK_MEASURES_TRACKING_ITEM_EDIT: 'RiskManage/FeedBackRiskEvaNoteItem', // 措施反馈子项实时更新

  // 风险管理--风险库
  RISK_BANK_LIST: 'RiskImportant/GetRiskImportantList', // 列表
  RISK_BANK_ADD: 'RiskImportant/SaveRiskImportantAddorUpdate', // 添加
  RISK_BANK_DELETE: 'RiskImportant/DelRiskImportantData', // 删除
  RISK_BANK_GET_INFO: 'RiskImportant/GetRiskImportantDataById', // 获取
  RISK_BANK_SHOW_LIST: 'RiskImportant/GetRiskImportantAppList', // 获取审批状态列表
  RISK_BANK_REVISE: 'RiskImportant/ReviseRiskImportant', // 修订
  RISK_BANK_LOG: 'RiskImportant/GetRiskImportantLogList', // 日志

  // 安全活动
  SECURITY_ACTIVITY_LIST: 'SafetyActivity/GetSafetyActivityList', // 查询
  SECURITY_ACTIVITY_APPROVAL_LIST: 'SafetyActivity/GetSafetyActivityAppList', // 审批
  SECURITY_ACTIVITY_DELETE: 'SafetyActivity/DelSafetyActivityList', // 删除
  SECURITY_ACTIVITY_ADD: 'SafetyActivity/AddSafetyActivityList', // 添加
  SECURITY_ACTIVITY_SHOWINFO: 'SafetyActivity/GetSafetyActivityOne', // 获取

  // 问题整改
  QUESTION_GETINFO: 'ProblemRectify/GetProblemRectifyList', // 数据列表
  QUESTION_SHOWINFO: 'ProblemRectify/GetProblemRectifyDataById', // 编辑
  QUESTION_ADD: 'ProblemRectify/UpdateProblemRectifyData', // 新增
  QUESTION_FEEDBACK_SUBMIT: 'ProblemRectify/UpdateFeedbackProblemRectifyData', // 反馈提交信息
  QUESTION_CLOSE_SUBMIT: 'ProblemRectify/UpdateShutProblemRectifyData', // 反馈提交信息
  QUESTION_DELETE: 'ProblemRectify/DelProblemRectifyData', // 删除
  QUESTION_GET_SOURCE_LIST: 'ProblemRectify/GetProblemRectifySourceList', // 根据问题来源获取问题编号
  QUESTION_GET_SOURCE_NO: 'questionEntryLink/omfp5', // 获取来源编号PKID

  // 文件检索
  FULL_TEXT_RETRIEVA_LLINK: 'FullSearch/GetAwardApplyList',

  // 系统配置
  SYSTEM_CONFIGURATION_LIST: 'Select/GetSelectList', // 列表
  SYSTEM_CONFIGURATION_MANAGEMENT: 'Select/OperateSelectList', // 新增修改删除
  SYSTEM_MANAGEMENT_LIST: 'Select/GetEtmSelectList', // 获取指定字典表子表数据

  // 根据机型获取机号
  SYSTEM_AC_LIST: 'Select/GetAcSelectList',
  // 根据机号获取机型
  SYSTEM_MODEL_LIST: 'Select/GetModelSelectList',

  // 月份
  MONTHS: [{name: '1月', val: '1'}, {name: '2月', val: '2'}, {name: '3月', val: '3'},
    {name: '4月', val: '4'}, {name: '5月', val: '5'}, {name: '6月', val: '6'},
    {name: '7月', val: '7'}, {name: '8月', val: '8'}, {name: '9月', val: '9'},
    {name: '10月', val: '10'}, {name: '11月', val: '11'}, {name: '12月', val: '12'}
  ],

  MAINTENANCE_ERROR: [{
    name: '安装不当',
    arrList: [{name: '未安装所需要的设备/零件', val: 'a1'},
      {name: '安装错误设备/零件', val: 'a2'},
      {name: '方向不对/位置不妥', val: 'a3'},
      {name: '安装未完成', val: 'a4'},
      {name: '安装了多余部件', val: 'a5'},
      {name: '接近盖板未关', val: 'a6'},
      {name: '未恢复系统设备', val: 'a7'},
      {name: '损毁', val: 'a8'},
      {name: '其它', val: 'a9'}]
  }, {
    name: '放行前或工作后遗漏',
    arrList: [{name: '放行前未取下销子或堵头', val: 'b1'},
      {name: '勤务盖板未关', val: 'b2'},
      {name: '检查/校验后未关', val: 'b3'},
      {name: '其它', val: 'b4'}]
  }, {
    name: '故障隔离/检查/测试欠妥',
    arrList: [{name: '未发现性能下降', val: 'c1'},
      {name: '接近盖板未关', val: 'c2'},
      {name: '未使系统功能恢复/停止', val: 'c3'},
      {name: '未作适当测试', val: 'c4'},
      {name: '未将故障作隔离', val: 'c5'},
      {name: '未作适当检查', val: 'c6'},
      {name: '其它', val: 'c7'}]
  }, {
    name: '损坏飞机/发动机/附件',
    arrList: [{name: '移动/运输/滑行时损坏', val: 'd1'},
      {name: '被车辆/工作梯损坏', val: 'd2'},
      {name: '设备使用不当', val: 'd3'},
      {name: '使用有故障的设备', val: 'd4'},
      {name: '未将故障作隔离', val: 'd5'},
      {name: '未作适当检查', val: 'd6'},
      {name: '其它', val: 'd7'}]
  }, {
    name: '外来物影响安全和使用',
    arrList: [{name: '将物件遗忘飞机/发动机内', val: 'e1'},
      {name: '外来物掉入开放系统', val: 'e2'},
      {name: '其它机坪上的碎屑', val: 'e3'},
      {name: '其它', val: 'e4'}]
  }, {
    name: '勤务缺陷',
    arrList: [{name: '液/气不足或过多', val: 'f1'},
      {name: '液体型号不对', val: 'f2'},
      {name: '未按需加注', val: 'f3'},
      {name: '车辆勤务保障不当', val: 'f4'},
      {name: '其它', val: 'f5'}]
  }, {
    name: '修理不当',
    arrList: [{name: '器材损坏或未正确使用', val: 'g1'},
      {name: '修理工艺偏差', val: 'g2'},
      {name: '未完成修理', val: 'g3'},
      {name: '试验不充分', val: 'g4'},
      {name: '工具设备缺陷', val: 'g5'},
      {name: '其它', val: 'g6'}]
  }, {
    name: '导致人员受伤的行为',
    arrList: [{name: '接触性危险', val: 'h1'},
      {name: '滑/绊/跌倒', val: 'h2'},
      {name: '突发性的危险', val: 'h3'},
      {name: '未使用保护设备', val: 'h4'},
      {name: '其它', val: 'h5'}]
  }, {
    name: '其它类型',
    arrList: [{name: '其它类型描述', val: 'i1'}]
  }],

  INDUCEMENT_ANALYSIS: [{
    name: '一、飞机设计/构造/零配件',
    val: 'a',
    arrList: [{name: '构型复杂/缺陷', val: 'a1'},
      {name: '不易接近', val: 'a2'},
      {name: '构型不变', val: 'a3'},
      {name: '备件标识缺陷', val: 'a4'},
      {name: '防错设计不充分', val: 'a5'},
      {name: '其它', val: 'a6'}]
  }, {
    name: '二、初始批准的维修文件',
    val: 'b',
    arrList: [{name: '不易理解', val: 'b1'},
      {name: '不正确/不完善', val: 'b2'},
      {name: '前后矛盾/参考过多', val: 'b3'},
      {name: '不具备/无法得到', val: 'b4'},
      {name: '资料未及时更新', val: 'b5'},
      {name: '其它', val: 'b6'}]
  }, {
    name: '三、公司维修文件',
    val: 'c',
    arrList: [{name: '文件不正确、不完善', val: 'c1'},
      {name: '工作单可操作性差', val: 'c2'},
      {name: '未得到有效文件或文件不一致', val: 'c3'},
      {name: '错误地改制造厂文件', val: 'c4'},
      {name: '必检要求不当', val: 'c5'},
      {name: '支持信息不及时或丢失', val: 'c6'},
      {name: '缺少实用文件', val: 'c7'},
      {name: '其它', val: 'c8'}]
  }, {
    name: '四、器材管理',
    val: 'f',
    arrList: [{name: '缺乏备件', val: 'f1'},
      {name: '不具备合格标签', val: 'f2'},
      {name: '使用超时限器材', val: 'f3'},
      {name: '不具备保管条件', val: 'f4'},
      {name: '发/领料差错', val: 'f5'},
      {name: '其他', val: 'f6'}
    ]
  },
  {
    name: '五、设备和工具',
    val: 'd',
    arrList: [{name: '不安全/不可靠', val: 'd1'},
      {name: '控制器和显示器布局不合理', val: 'd2'},
      {name: '校准缺陷', val: 'd3'},
      {name: '无法获取', val: 'd4'},
      {name: '不适使用', val: 'd5'},
      {name: '没有说明', val: 'd6'},
      {name: '过于复杂', val: 'd7'},
      {name: '标识不对', val: 'd8'},
      {name: '用错工具或设备', val: 'd9'},
      {name: '管理失控', val: 'd10'},
      {name: '其它', val: 'd11'}]
  }, {
    name: '六、环境和实施',
    val: 'e',
    arrList: [{name: '强噪音', val: 'e1'},
      {name: '炎热', val: 'e2'},
      {name: '寒冷', val: 'e3'},
      {name: '潮湿', val: 'e4'},
      {name: '雨/雪', val: 'e5'},
      {name: '光线差', val: 'e6'},
      {name: '风', val: 'e7'},
      {name: '振动', val: 'e8'},
      {name: '危险/有毒物质', val: 'e9'},
      {name: '整洁', val: 'e10'},
      {name: '通风不良', val: 'e11'},
      {name: '其它', val: 'e12'}]
  }, {name: '七、工作任务',
    val: 'g',
    arrList: [{name: '单调/重复', val: 'g1'},
      {name: '复杂/易混淆', val: 'g2'},
      {name: '新任务或任务有变化', val: 'g3'},
      {name: '与类似的任务不同', val: 'g4'},
      {name: '时间和人力不足', val: 'g5'},
      {name: '其他', val: 'g6'}
    ]
  }, {
    name: '八、知识和技能',
    val: 'h',
    arrList: [{name: '任务知识不足', val: 'h1'},
      {name: '技能不足', val: 'h2'},
      {name: '任务计划不足', val: 'h3'},
      {name: '公司程序和规定的知识不足', val: 'h4'},
      {name: '专业知识不足', val: 'h5'},
      {name: '其他', val: 'h6'}
    ]
  }, {
    name: '九、个人因素',
    val: 'i',
    arrList: [{name: '身体健康', val: 'i1'},
      {name: '疲劳', val: 'i2'},
      {name: '时间限制', val: 'i3'},
      {name: '同事的压力', val: 'i4'},
      {name: '过于自信', val: 'i5'},
      {name: '身材/力量', val: 'i6'},
      {name: '个人事物', val: 'i7'},
      {name: '工作中断', val: 'i8'},
      {name: '场所干扰', val: 'i9'},
      {name: '其它', val: 'i10'}
    ]
  }, {
    name: '十、计划和监管',
    val: 'j',
    arrList: [{name: '缺乏分工和提示', val: 'j1'},
      {name: '工作先后次序安排欠佳', val: 'j2'},
      {name: '分配任务欠妥', val: 'j3'},
      {name: '不现实的态度/期望', val: 'j4'},
      {name: '过多或缺少监管', val: 'j5'},
      {name: '缺少检验和互检', val: 'j6'}
    ]
  }, {
    name: '十一、信息沟通',
    val: 'k',
    arrList: [{name: '部门之间', val: 'k1'},
      {name: '人员之间', val: 'k2'},
      {name: '工作班次之间', val: 'k3'},
      {name: '员工和领班之间', val: 'k4'},
      {name: '领班和经理之间', val: 'k5'},
      {name: '飞行机组与维护人员之间', val: 'k6'},
      {name: '缺乏沟通所需的手段', val: 'k7'},
      {name: '其他', val: 'k8'}
    ]
  }, {
    name: '十二、组织机构',
    val: 'l',
    arrList: [{name: '公司政策缺陷', val: 'l1'},
      {name: '公司程序和规定缺陷', val: 'l2'},
      {name: '容忍习惯性作法', val: 'l3'},
      {name: '员工队伍不稳定', val: 'l4'},
      {name: '检验员不能正确行使职能', val: 'l5'},
      {name: '部门间工作任务不平衡', val: 'l6'},
      {name: '缺乏对人员的全面评估', val: 'l7'},
      {name: '其他', val: 'k8'}
    ]
  }, {name: '其它类型',
    val: 'n',
    arrList: []
  }]
}

/* API配置 */
let NEW_API = {}
if (process.env.NODE_ENV === 'production') {
  NEW_API = API_PROD
} else {
  NEW_API = API_DEV
}
let API = Object.assign(NEW_API, API_COMMON)
// 导出信息
export default API
