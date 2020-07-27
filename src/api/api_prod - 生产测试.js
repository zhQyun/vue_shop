/**
 * Created by yz on 2018/3/7 0007.
 * api 生产环境配置文件
 */
const WEBPACK_API = require('./webpackAPI.js');
/*API配置*/
const API = {
    //配置根路劲
    ROOT: WEBPACK_API.ROOT,
    CANCEL_URL:"http://10.136.15.220:9080/sso/logout",//注销地址
    //审核流程
    REVIEW_PROCESS_URL:"http://10.136.15.220/bpm/sys/lbpmdocking/lbpm_docking_main/lbpmDockingMain.do",//页面地址
    REVIEW_PROCESS_SUBMINT:'Template/ApproveNode',//提交数据地址

    //文件处理
    UPLOAD_FILE_URL:'http://11.4.68.16:8087/api/Upload/SaveFilesToServer',//文件上传接口
    UPLOAD_FILE_LOADING:'http://10.136.15.192:8085/api/attachment/',//文件下载
    //文件删除
    UPLOAD_FILE_DELETE:'Upload/DeleteFile',
    //模块文件上传对应code
    UPLOAD_FILECODE:{
        securityInformation:'f7f1ad36b57049449263cd9803b6a862',// 安全信息
        safetyMonitoringReport:'529f4c94a99d4efca86bc85dcc2ed862',// 安全监察报告
        fodList:'88f3e4b42ee5414db7464a245d67c6bb',// FOD表
        qualitySurveyTable:'180dcb361e274b3bb39dab895701faf4',// 质量调查表
        medaTable:'f43fdd08146d4edf8334c8a65cfb848e',// MEDA表
        otherRewardsAndPenalties:'2fbaa03d93464f60af5ffca322b48371',//其它奖励和处罚
        liabilityStatement:'b4c5aeef128f43c8871e713a22a290f8',//安全责任书
        applicationFile:'5a68199b28b042bbb74dac4be46e1e82',//属地适用文件
        monthlyReportQuality:'1540be52547f4a1eabe0d959be476a6a',//外站质量月报
        riskExpertLibrary:'db5c0287504c460cb04d6cf2ee141300',//风险专家库
        riskAssessmentBulletin:'78df637c42bf453ab54329b5055ddf62',//风险评估通告
        RiskBank:'f7162a720cfb4f06824bf79fd99aead4',//维修重要风险库
        securityActivity:'2ce49398c60f481385ecd652777fde96',//安全活动编辑
		problemRectify:'4c2abce817f748b49d28993b2f5d44bd',//问题整改
    },

    //报表查看地址
    REPORTS_VIEW_ROOT:'http://11.4.68.16:8000/WebReport/ReportServer?reportlet=Safety/',

    //公共模块配置
    COMMON_MODEL_TYPE:[
        {url:"securityInformationApprovalLink",value:"FAFF8B38-75FB-4632-BD84-E597118ECA09",name:"安全信息"},
        {url:"monitoringYearPlanApprovalLink",value:"01C4B00E-F5EC-4C83-AF36-2FD6A121A7B2",name:"安全监察年计划"},
        {url:"monitoringMonthPlanApprovalLink",value:"D2F42422-2080-411A-9F54-0E33223D8405",name:"安全监察月计划"},
        {url:"safetyMonitoringSheetApprovalLink",value:"FA007EEB-25CE-4BFE-9CBA-B086D5F4CC47",name:"安全监察单"},
        {url:"safetyMonitoringReportApprovalLink",value:"A47F9385-113F-4483-9921-1300BBAF1BC8",name:"安全监察报告"},
        {url:"qualitySurveyTableApprovalLink",value:"2F02C5B5-71B2-45A8-AC96-4F634390420D",name:"质量调查表"},
        {url:"continuousMonitoringPlanApprovalLink",value:"72093509-3151-46C1-B4EB-5FA565B31B6F",name:"持续监控计划 "},
        {url:"monthlyReportApprovalLink",value:"9F84A6A4-D8CC-4A12-BEDE-21ECDF117FC7",name:"SAG月报"},
        {url:"descriptionTableApprovalLink",value:"3C575F87-E993-448F-B128-9ECC4CC8D778",name:"奖励说明"},
        {url:"applicationFormEntryLink",value:"35237ED0-1502-45E2-9B4F-071A04BE7080",name:"奖励申请"},
        {url:"rewardsAndPunishmentsApprovalLink",value:"FB02EFBE-D285-4319-919D-129F6561AB31",name:"奖罚"},
        {url:"examinationResultsApprovalLink",value:"672622DF-7AAF-4E88-AC88-5CE31C6077A6",name:"考核结果"},
        {url:"applicationFileApprovalLink",value:"A8205897-8811-4ECE-A00F-7FCA0EBB35B5",name:"属地适用文件"},
        {url:"monthlyReportReviewlLink",value:"332B6C9F-44CC-4670-BB09-8713054DD8F9",name:"外站质量月报"},
        {url:"noticeApprovalLink",value:"54E25EAC-47CD-40E4-AE84-55193687B0DC",name:"风险评估通告"},
        {url:"riskSectionApprovalLink",value:"63463906-F2F2-4E14-80A3-2D62A76939A1",name:"维修重要风险库" },
        {url:"feedbackOfSecurityActivitiesLink",value:"0BA27A6E-3192-4C47-B57B-010586B53125",name:"安全活动" },
        {url:"questionFeedbackLink",value:"113EEDAA-CDAC-4662-A508-7D1A46F3C4AC",name:"问题整改"}
    ]
};
//导出信息
export default API;