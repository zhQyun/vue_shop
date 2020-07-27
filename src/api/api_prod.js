/**
 * Created by yz on 2018/3/7 0007.
 * api 生产环境配置文件
 */
const WEBPACK_API = require('./webpackAPI.js')
/* API配置 */
const API = {
  // 配置根路劲
  ROOT: WEBPACK_API.ROOT,
  CANCEL_URL: 'http://sso.xiamenair.com.cn/sso/logout', // 注销地址
  // 审核流程
  REVIEW_PROCESS_URL: 'http://bpm.xiamenair.com.cn/bpm/sys/lbpmdocking/lbpm_docking_main/lbpmDockingMain.do', // 页面地址
  REVIEW_PROCESS_SUBMINT: 'Template/ApproveNode', // 提交数据地址

  // 文件处理
  UPLOAD_FILE_URL: 'http://mesafebs.xiamenair.com.cn/api/Upload/SaveFilesToServer', // 文件上传接口
  UPLOAD_FILE_LOADING: 'http://webservice.xiamenair.com.cn:8006/api/attachment/', // 文件下载
  // 文件删除
  UPLOAD_FILE_DELETE: 'Upload/DeleteFile',

  // 模块文件上传对应code
  UPLOAD_FILECODE: {
    securityInformation: '0f17d06768214240a11029cb1edabd84', // 安全信息
    safetyMonitoringReport: 'dd3c7682028b4a7fa48ae01ba3eac4e5', // 安全监察报告
    fodList: '1adc92794979495aa07476420f5f7e1d', // FOD表
    qualitySurveyTable: '932c06911fec4dcebf0a28ff955d57b5', // 质量调查表
    medaTable: '3842f741c5434166bd21b3d99f72b692', // MEDA表
    otherRewardsAndPenalties: '2ddaad32498043aeb90751bf485fa82e', // 其它奖励和处罚
    liabilityStatement: '94880fd9421a4c298cb613ea0c301908', // 安全责任书
    applicationFile: '56b413de5613470faccf0f26c2d8d7ac', // 属地适用文件
    monthlyReportQuality: 'fb5edebb144545f5a45d563e24afe0c8', // 外站质量月报
    riskExpertLibrary: '7a1c1ed08a134ff895b622760922eda7', // 风险专家库
    riskAssessmentBulletin: '27f864b187c14045bb604818965bbff8', // 风险评估通告
    RiskBank: 'aa55c697cd314c71980db9ed6e40acf0', // 维修重要风险库
    securityActivity: 'f08e0a37547946ff97ee4cc0279241d0', // 安全活动编辑
    problemRectify: '577b36d0027c427d83aee524251d859f'// 问题整改
  },

  // 报表查看地址
  REPORTS_VIEW_ROOT: 'http://report.xiamenair.com.cn/WebReport/ReportServer?reportlet=ME/MESAFE/',

  // 公共模块配置
  COMMON_MODEL_TYPE: [
    {url: 'securityInformationApprovalLink', value: 'FAFF8B38-75FB-4632-BD84-E597118ECA09', name: '安全信息'},
    {url: 'monitoringYearPlanApprovalLink', value: '01C4B00E-F5EC-4C83-AF36-2FD6A121A7B2', name: '安全监察年计划'},
    {url: 'monitoringMonthPlanApprovalLink', value: 'D2F42422-2080-411A-9F54-0E33223D8405', name: '安全监察月计划'},
    {url: 'safetyMonitoringSheetApprovalLink', value: 'FA007EEB-25CE-4BFE-9CBA-B086D5F4CC47', name: '安全监察单'},
    {url: 'safetyMonitoringReportApprovalLink', value: 'A47F9385-113F-4483-9921-1300BBAF1BC8', name: '安全监察报告'},
    {url: 'qualitySurveyTableApprovalLink', value: '2F02C5B5-71B2-45A8-AC96-4F634390420D', name: '质量调查表'},
    {url: 'continuousMonitoringPlanApprovalLink', value: '72093509-3151-46C1-B4EB-5FA565B31B6F', name: '持续监控计划'},
    {url: 'monthlyReportApprovalLink', value: '9F84A6A4-D8CC-4A12-BEDE-21ECDF117FC7', name: 'SAG月报'},
    {url: 'descriptionTableApprovalLink', value: '3C575F87-E993-448F-B128-9ECC4CC8D778', name: '奖励说明'},
    {url: 'applicationFormEntryLink', value: '35237ED0-1502-45E2-9B4F-071A04BE7080', name: '奖励申请'},
    {url: 'rewardsAndPunishmentsApprovalLink', value: 'FB02EFBE-D285-4319-919D-129F6561AB31', name: '奖罚'},
    {url: 'examinationResultsApprovalLink', value: '672622DF-7AAF-4E88-AC88-5CE31C6077A6', name: '考核结果'},
    {url: 'applicationFileApprovalLink', value: 'A8205897-8811-4ECE-A00F-7FCA0EBB35B5', name: '属地适用文件'},
    {url: 'monthlyReportReviewlLink', value: '332B6C9F-44CC-4670-BB09-8713054DD8F9', name: '外站质量月报'},
    {url: 'noticeApprovalLink', value: '54E25EAC-47CD-40E4-AE84-55193687B0DC', name: '风险评估通告'},
    {url: 'riskSectionApprovalLink', value: '63463906-F2F2-4E14-80A3-2D62A76939A1', name: '维修重要风险库' },
    {url: 'feedbackOfSecurityActivitiesLink', value: '0BA27A6E-3192-4C47-B57B-010586B53125', name: '安全活动' },
    {url: 'questionFeedbackLink', value: '113EEDAA-CDAC-4662-A508-7D1A46F3C4AC', name: '问题整改'}
  ]
}
// 导出信息
export default API
