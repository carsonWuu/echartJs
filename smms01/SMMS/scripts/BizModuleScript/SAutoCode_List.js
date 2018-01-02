function doOnload(){
	if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
	if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
}

function intelligentMaintenance(){      //智能维护（机构自动编码）
	var url = rootPath+"/fmp/system/autocode/SAutoCodeBiz/IntelligentMaintenance";
	comAjax(url,backCallMsg);
	function backCallMsg(msg){
		if(msg == "success"){
			showMessage("MSG1208");//智能维护成功！
		}else if(msg == "noData"){
			showMessage("MSG1209");//没有数据可以进行智能维护，请您重新确认！
		}else{
			showMessage("MSG1210");//智能维护出现异常！
		}
	}
}

function add_allOrgAutoCode() {         //增加所有机构自动编码
	if (selectedRid != null) {
		var url = rootPath+"/fmp/system/autocode/SAutoCodeBiz/add_allOrgAutoCode.action?tableModelId=SAutoCode&RID="+selectedRid;
		var coderule = getDataListTrueValue(selectedRid,"CODERULE");
		if(coderule.indexOf("${ORGID}") != -1){
			comAjax(url,backCallallOrgAutoCode);
		}else{
			showMessage("MSG1211");//请选择有机构码的编码规则！
		}
	}else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

function backCallallOrgAutoCode(msg){
	if (msg == "success"){
		showMessage("MSG1212");//设置所有机构自动编码成功！	
		doRefreshList();
	}if (msg == "hasset"){
		showMessage("MSG1277");//已经设置了所有机构自动编码！	
		doRefreshList();
	}
}