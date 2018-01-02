/**
 * 检查流程是否允许编辑
 */
function checkApvCanEdit(){
	if (selectedRid != null) {
		var currApproveState = getDataListTrueValue(selectedRid,"APPROVESTATE");
		if(currApproveState !="000" && currApproveState!="" && currApproveState !="701"){
			showMessage("MSG0028");//流程已经启动或者结束，您不能在此阶段进行操作！
			return false;
		}else{
			return true;
		}
	}else{
		return true;
	}		
}

/**
 * 显示流程当前节点
 */
function viewFlowCurrNode(flowtempId,biztypeId){
	if(selectedRid!=null){
		var url=rootPath+"/fmp/workflow/WorkFlowBiz/ShowWorkFlowEditor?opMode=view&RID="+selectedRid+"&FLOWTEMPID="+flowtempId
		               +"&BIZTYPEID="+biztypeId;
		openWindow(url,'当前流程节点',null,null,null,'600px');
	}else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

/**
 * 流程监控
 * @param flowtempId 流程模板id
 * @param biztypeId  业务实例ID
 * @return
 */
function monitorFlow(flowtempId,biztypeId){
	if(selectedRid!=null){
		var currApproveState = getDataListTrueValue(selectedRid,"APPROVESTATE");
		if(currApproveState!="000"){
			var url=rootPath+"/fmp/workflow/WorkFlowBiz/ShowWorkFlowEditor?opMode=view&RID="+selectedRid+"&FLOWTEMPID="+flowtempId
            +"&BIZTYPEID="+biztypeId;
			openWindow(url,'当前流程节点',null,null,null,'600px');
		}else{
			showMessage("MSG0029");//流程未启动！
		}
	}else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}






/**
 *流程复议
 */

function flowReDiscuss(reportTempId){
	if(selectedRid !=null){
		var currApproveState = getDataListTrueValue(selectedRid,"APPROVESTATE");
		if(currApproveState == '800'){
			approveHisViewData('reDiscuss',reportTempId);
		}else{
			showMessage("MSG0030");//被否决的审批才允许执行复议，请确认后操作！
		}
	}else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

/**
 * 审批操作
 */
function doApprove(apvTableModelId,reportTempId){
	if(apvTableModelId){
		var tempTBid = tableModelId;
		tableModelId = apvTableModelId;
		approveViewData(reportTempId);
		tableModelId = tempTBid;
	}else{
		approveViewData(reportTempId); 
	}
}

/**
 *审批历史查询
 */
function apvHisView(apvTableModelId,reportTempId){
	if(apvTableModelId){
		var tempTBid = tableModelId;
		tableModelId = apvTableModelId;
		approveHisViewData(null,reportTempId);
		tableModelId = tempTBid;
	}else{
		approveHisViewData(null,reportTempId);	
	}	
}




/**
 *流程监控+审批历史
 */
function monitorFlowAndHis(flowtempId,biztypeId){
	if(selectedRid!=null){
		var currApproveState = getDataListTrueValue(selectedRid,"APPROVESTATE");
		if(currApproveState!="000"){
			var url=rootPath+"/fmp/workflow/WorkFlowBiz/ViewWorkFlowAndApvHis?RID="+selectedRid+"&FLOWTEMPID="+flowtempId
            +"&BIZTYPEID="+biztypeId;
			openWindow(url,'当前流程节点',null,null,null,'600px');
		}else{
			showMessage("MSG0029");//流程未启动！
		}
	}else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}



/**
 * 节点转办
 * @param bizTypeId 审批业务类型ID
 * @return
 */
function devolveNode(bizTypeId){
	if(selectedRid !=null){		
		var url =rootPath+"/fmp/workflow/WorkFlowBiz/AddDevolveBiz?BIZRID="+selectedRid+"&BIZTYPEID="+bizTypeId+"&tableModelId=WfDevolveHis";
		openWindow(url,"节点转办");	
	}else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}



/**
 * 流程复制
 * @return
 */
function copyWorkFlow(){
	if(selectedRid !=null){		
		if (confirm("是否要复制该流程？")) {
			var url =rootPath+"/fmp/workflow/WorkFlowBiz/copyWorkFlowBiz?RID="+selectedRid;
			comAjax(url, backCallCopyWorkFlow);	
			function backCallCopyWorkFlow(msg){
				showMessage(msg);
				doRefreshList();	
			}
		}
	}else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}


/**
 * 流程启动操作
 * @param rid  记录ID	
 * @param flowTempId	流程模板ID	
 * @param tableModelId	表模型ID		
 * @param bizTypeId		业务类型ID
 * @param parmsUrl		地址参数      eg."&asd=123"
 * @return
 */
function workFlowStartOp(rid,flowTempId,tableModelId,bizTypeId,currApproveState,parmsUrl){
	if(currApproveState=="100"  || currApproveState =="700"){
		showMessage("MSG0031");//该记录已在审批中，请确认后操作！
	}else if(currApproveState=="900" ){
		showMessage("MSG0032");//该记录的流程已经结束，不能再启动，请确认后操作！
	}else if(currApproveState=="800"){
		showMessage("MSG0033");//该记录的流程已经被否决，不能再启动，请确认后操作！
	}else{
		workFlowStartOpSubmit(rid,flowTempId,tableModelId,bizTypeId,parmsUrl);
	} 
}
function workFlowStartOpSubmit(rid,flowTempId,tableModelId,bizTypeId,parmsUrl){		
	var url=rootPath +'/fmp/workflow/WorkFlowBiz/StartWorkFlow?flowTempId='+flowTempId
    +'&RID='+rid
    +'&tableModelId='+tableModelId
    +'&bizTypeId='+bizTypeId;
	if(parmsUrl && parmsUrl != ''){
		url +=parmsUrl;
	}
	openModalDialog(url,"","scroll:no; center:yes; resizable:yes; dialogWidth:600px;dialogHeight:350px");
	doRefreshList();
}

/**
 * 公共启动流程操作
 */
function commStartWorkFlow(flowTempId,tableModelId,bizTypeId){
	if (selectedRid != null) {
		var currApproveState = getDataListTrueValue(selectedRid,"APPROVESTATE");
		workFlowStartOp(selectedRid,flowTempId,tableModelId,bizTypeId,currApproveState);
	}else{
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}


/**
 * 加载审批内容的模板页面
 * @param reportTempID
 * @param rid
 * @return
 */
function loadApvTempView(reportTempID, rid){
	url =rootPath+"/fmp/report/ReportPrintBiz/GenReportTempFile?REPORTTEMPLETID="+reportTempID+"&REPORTDATARID="+rid; 
	XMLHttp.urlSubmit(url,callBack);
	function callBack(tempFileName){
		var iframe = document.getElementById('approve_InfoFrame');
		tempFileName = tempFileName.substring(2);
		//openWindow(tempFileName,"打印项目");
		tempFileName = tempFileName.replace(/\\/g,"-");
		iframe.src = rootPath+'/fmp/report/ReportPrintBiz/ReportPrint?tempFileName='+tempFileName;	 
		//window.location.href = rootPath+'/fmp/system/report/ReportPrintBiz/ReportPrint?tempFileName='+tempFileName;	
	}
	/*
	var iframe = document.getElementById('approve_InfoFrame');
	var tempFileName = "${tempFileName}";
	tempFileName = tempFileName.replace(/-/g,"\\");
    iframe.src = tempFileName; 		
    */
	
	//显示审批附件标签页以及内容
	document.getElementById('apvAttLi').style.display = "block";
	var attIframe = document.getElementById('Attachment_InfoFrame');
	attIframe.src = rootPath+"/fmp/FrameCommonBiz/DoList?tableModelId=SAttachment&isSubTbl=true&keyLimit=RECORDRID:"+rid;

}


/**
 * 通过传入的审批业务类型ID获取相应的操作地址
 * @return
 */
function getBizUrl(opMode){
	var url = "";
	var bizTypeId = getDataListTrueValue(selectedRid,"BIZTYPEID");  
	switch(bizTypeId){
		case '010':{
			//项目审批
			url = rootPath+"/credit/caseManage/caseApprove/CaseApproveBiz/${bizAction}BIZTYPEID=010";
			
			url += "&REPORTTEMPID=000068BBMB;000069BBMB";
			
			//放最后
			if(url.indexOf("&tableModelId=")<0){
				url += "&tableModelId=CrdCaseConsulting";
			}
			break;
		}
		case '030':{
			//退单审批
			url = rootPath+"/credit/caseManage/caseApprove/CaseApproveBiz/${bizAction}BIZTYPEID=030";
			if(opMode == "apv"){
				url += "&tableModelId=CrdCaseUntread";
			}
			
			//放最后
			if(url.indexOf("&tableModelId=")<0){
				url += "&tableModelId=CrdCaseApproveUntread";
			}
			break;
		}
		case '035':{
			//反退单审批
			url = rootPath+"/credit/caseManage/caseApprove/CaseApproveBiz/${bizAction}BIZTYPEID=035";
			if(typeof opMode == "apv"){
				url += "&tableModelId=CrdCaseAntiUntread";
			}
			
			//放最后
			if(url.indexOf("&tableModelId=")<0){
				url += "&tableModelId=CrdCaseApproveUntread";
			}
			break;
		}
		case '050':{
			//项目特批
			url = rootPath+"/credit/caseManage/caseApprove/CaseApproveBiz/${bizAction}BIZTYPEID=050";
			if(typeof opMode == "apv"){
				url += "&tableModelId=CaseApproveNode";
			}
			
			//放最后
			if(url.indexOf("&tableModelId=")<0){
				url += "&tableModelId=CrdCaseNodeApv";
			}
			break;
		}
		case '060':{
			//贷款变更审批
			url = rootPath+"/credit/caseManage/caseApprove/CaseApproveBiz/${bizAction}BIZTYPEID=060";
			if(typeof opMode == "undefined"){
				url += "&tableModelId=CrdLoanVaryAppApprove";
			}
			
			//放最后
			if(url.indexOf("&tableModelId=")<0){
				url += "&tableModelId=CrdLoanVaryApp";
			}
			break;
		}
		case '110':{
			//贷款解除申请
			url = rootPath+"/credit/caseManage/crdReleaseApply/ReleaseApplyApvBiz/${bizAction}BIZTYPEID=110";
			
			
			//放最后
			if(url.indexOf("&tableModelId=")<0){
				url += "&tableModelId=CrdReleaseApply";
			}
			break;
		}
		case '025':{
			//资金业务请款审批
			url = rootPath+"/credit/finance/finApprove/FinApplyBillAprvBiz/${bizAction}BIZTYPEID=025";
			
			
			//放最后
			if(url.indexOf("&tableModelId=")<0){
				url += "&tableModelId=FinFundAppBill";
			}
			break;
		}
		case '210':{
 
			//资金业务请款审批
			url = rootPath+"/qbxt/coopcombat/QbCoopcombatappBiz/${bizAction}BIZTYPEID=210";
			
			
			//放最后
			if(url.indexOf("&tableModelId=")<0){
				url += "&tableModelId=QbCoopcombatapp&moduleId=qb_xtzzsq";
			}
			break;
		}
		default:url = "";
		break;
	}
	return url;
}


/**
 * （汇总业务审批操作）查看
 */
function viewSpecificData(){
	 if (selectedRid != null) {
		 var bizRid = getDataListTrueValue(selectedRid,"BIZRID"); 
		 var url = getBizUrl();
		 if(url == ""){
			 showMessage("审批业务类型不存在，请重新操作。");
		 }else{
			 url = url.replace('${bizAction}', "DoView?RID="+bizRid+"&");
			 openWindow(url,moduleDesc+"-查看");
		 }
		} else {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
		}
}


/**
 * （汇总业务审批操作）审批流程
 */
function doSpecificApprove(){
	if (selectedRid != null) {
		var bizRid = getDataListTrueValue(selectedRid,"BIZRID"); 
		var url = getBizUrl("apv");
		if(url == ""){
			showMessage("审批业务类型不存在，请重新操作。");
		}else{
			url = url.replace('${bizAction}', "DoApproveView?RID="+bizRid+"&");
			openWindow(url,moduleDesc+"-流程审批");
		}
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}


/**
 * （汇总业务审批操作）监控流程
 */
function viewSpecificFlowCurrNode(){
		
	if(selectedRid!=null){
		var currApproveState = getDataListTrueValue(selectedRid,"APPROVESTATE");
		var bizRid = getDataListTrueValue(selectedRid,"BIZRID"); 
		var bizTypeId = getDataListTrueValue(selectedRid,"BIZTYPEID");  
		var flowtempId = getDataListTrueValue(selectedRid,"FLOWTEMPID"); 
		if(currApproveState!="000"){
			var url=rootPath+"/fmp/workflow/WorkFlowBiz/ShowWorkFlowEditor?opMode=view&RID="+bizRid+"&FLOWTEMPID="+flowtempId
            +"&BIZTYPEID="+bizTypeId;
			openWindow(url,'当前流程节点',null,null,null,'600px');
		}else{
			showMessage("MSG0029");//流程未启动！
		}
	}else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}




/**
 * （汇总业务审批操作）流程转办
 */
function devolveSpecificNode(){
	if(selectedRid !=null){		
		var bizRid = getDataListTrueValue(selectedRid,"BIZRID"); 
		var bizTypeId = getDataListTrueValue(selectedRid,"BIZTYPEID");  
		var url =rootPath+"/fmp/workflow/WorkFlowBiz/AddDevolveBiz?BIZRID="+bizRid+"&BIZTYPEID="+bizTypeId+"&tableModelId=WfDevolveHis";
		openWindow(url,"节点转办");	
	}else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}


/**
 * （汇总业务审批操作）流程审批历史
 */
function apvSpecificHisView(){
	
	if (selectedRid != null) {
		var bizRid = getDataListTrueValue(selectedRid,"BIZRID"); 
		var url = getBizUrl();
		if(url == ""){
			showMessage("审批业务类型不存在，请重新操作。");
		}else{
			url = url.replace('${bizAction}', "DoApproveHisView?RID="+bizRid+"&");
			openWindow(url,moduleDesc+"-流程历史");
		}
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}

}


/**
 * （汇总业务审批操作）流程复议
 */
function flowSpecificReDiscuss(){
	if(selectedRid !=null){
		var currApproveState = getDataListTrueValue(selectedRid,"APPROVESTATE");
		if(currApproveState == '800'){
			var bizRid = getDataListTrueValue(selectedRid,"BIZRID"); 
			var url = getBizUrl();
			if(url == ""){
				showMessage("审批业务类型不存在，请重新操作。");
			}else{
				url = url.replace('${bizAction}', "DoApproveHisView?RID="+bizRid+"&showOpMode=reDiscuss&");
				openWindow(url,moduleDesc+"--流程复议");
			}
		}else{
			showMessage("MSG0030");//被否决的审批才允许执行复议，请确认后操作！
		}
	}else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}