/***********************************
 * @文件描述：风险消息操作脚本
 *************************************/

function riskDeal(){			//风险处理
	if (selectedRid != null) {
		if(getDataListTrueValue(selectedRid,"ISFEEDBACK")=='1'){			//判断是否需要反馈是否为‘是’
			var url=rootPath+"/fmp/system/riskwarning/SRiskWaringBiz/IsDeal?RID="+selectedRid; 
			comAjax(url,backCallDeal);
		}else{
			showMessage("MSG1226");//该消息不需要处理！
			return;
		}
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

function backCallDeal(msg){
	if(msg == 'allow'){				//判断是否允许处理该风险
		var msgId = getDataListTrueValue(selectedRid,"MSGID");
		var schemeId = getDataListTrueValue(selectedRid,"SCHEMEID");
		if (document.getElementById("keyLimit")){
			var url=rootPath+"/fmp/system/riskwarning/SRiskWaringBiz/RiskDeal?RID="+selectedRid+"&tableModelId=SRiskDeal&keyLimit=" +document.getElementById("keyLimit").value+"&MSGID="+msgId+"&SCHEMEID="+schemeId;
			openWindow(url);
		}else{
			var url =rootPath+"/fmp/system/riskwarning/SRiskWaringBiz/RiskDeal?RID="+selectedRid+"&tableModelId=SRiskDeal&MSGID="+msgId+"&SCHEMEID="+schemeId;
			openWindow(url);
		}
	}else if('refuse'){
		showMessage("MSG1227");//该消息已被处理！
	}
}

function isRead(){		//标记已读
	if (selectedRid != null) {
		if(getDataListTrueValue(selectedRid,"ISREAD")=='2'){
			if (confirm("是否要标记为已读？")) {
				var url=rootPath+"/fmp/system/riskwarning/SRiskWaringBiz/IsRead?RID="+selectedRid;
				comAjax(url,backCallReaded);
			}
		}else{
			showMessage("MSG1228");//已经标记为已读！
		}
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

function backCallReaded(msg){
	if(msg == 'success'){
		showMessage("MSG1229");//成功标记为已读！
		doRefreshList();
	}else{
		showMessage("MSG1230");//更新数据失败！
	}
}

function resultAuditing(){			//处理结果审核
	if (selectedRid != null) {						
		var url=rootPath+"/fmp/system/riskwarning/SRiskWaringBiz/IsAuditing?RID="+selectedRid; 
		comAjax(url,backCallAuditing);
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

function backCallAuditing(msg){
	if(msg == 'allow'){
		if (document.getElementById("keyLimit")){
			var url=rootPath+"/fmp/system/riskwarning/SRiskWaringBiz/SResultAuditing?RID="+selectedRid+"&tableModelId=SResultAuditing&keyLimit=" +document.getElementById("keyLimit").value;
			openWindow(url);
		}else{
			var url = rootPath+"/fmp/system/riskwarning/SRiskWaringBiz/SResultAuditing?RID="+selectedRid+"&tableModelId=SResultAuditing";
			openWindow(url);
		}
	}else if('refuse'){
		showMessage("MSG1231");//该消息已被审核！
	}
}