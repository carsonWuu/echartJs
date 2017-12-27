/***********************************
 * @文件描述：SMMS系统公共的js，与SMMS相关的js函数都写在这
 *************************************/
//通过点击事件获取运行商编号的值（IDC_ID）并弹出一个查看页面
function viewIdcByAccessId(idcId){

	//在pop页面阻止打开查看页面
	if(typeof canOpenDivWindow  != "undefined" && !canOpenDivWindow){
		return;
	}

	var obj = getDataMapObj('IdcInfo.getIdcInfoByIdcId&IDC_ID='+idcId);
	if(obj != null && obj.RID != null){
		var rid = obj.RID;
		var url = rootPath+"/SMMS/IdcInfoBiz/DoView?RID="+rid+"&tableModelId=IdcInfo";

		openWindow(comUrl(url));
	}

}

function viewWebCaseByRid(rid){
	var url = rootPath+"/SMMS/IdcInfoBiz/DoView?RID="+rid+"&tableModelId=WebCase";
	openWindow(comUrl(url));


}
//显示日志事件详情页
function viewPendingByRid(rid){
	var obj = getDataMapObj('SmmsPending_rzjz.findSnapshopByRid&RID='+rid);
	if(obj.SNAPSHOP != null && obj.SNAPSHOP !='' && obj.SNAPSHOP != 'null'){
		var url = rootPath+"/SMMS/SmmsPending_rzjzBiz/DoView?RID="+rid+"&tableModelId=SmmsPending_rzjz";
		openWindow(comUrl(url));}
}
function viewAFlogByRid(rid){
	var obj = getDataMapObj('SmmsAfLog.findEventEvidence&RID='+rid);
	if(obj.EVENT_EVIDENCE!= null && obj.EVENT_EVIDENCE !='' && obj.EVENT_EVIDENCE!= 'null'){
		var url = rootPath+"/SMMS/SmmsAfLogTwoBiz/DoView?RID="+rid+"&tableModelId=SmmsAfLogTwo";
		openWindow(comUrl(url));}
}
function viewUrl(URL){
	//在pop页面阻止打开查看页面
	if(typeof canOpenDivWindow  != "undefined" && !canOpenDivWindow){
		return;
	}
	var urlStr = 'http://' + URL.replace(/^http:\/\//i, '');
	openWindow(comUrl(urlStr));

}
//下发关键字的方法
function sandKeys(){
	var url = rootPath+"/SMMS/SmmsKeywordBiz/sandKey";
	XMLHttp.urlSubmit(url,backCallSendMsg);
	function backCallSendMsg(msg){
		showMessage(msg);
		doRefreshList();
	}
}
//删除列表的方法
function deleteList(){
	var selectedDataList = new Array();
	selectedDataList = setSelectedDataList();
	var rids = "";
	if (selectedDataList != null) {
		if (confirm("是否确认要删除？")) {
			for (var i = 0; i<selectedDataList.length ;i++){
				var rid=selectedDataList[i].get("RID");  
				rids +=rid+",";

			}
			var url = rootPath+"/SMMS/PendingEventForCloseBiz/DeleteList?RID="+rids;
			//发送一个ajax请求
			XMLHttp.urlSubmit(url,backCallSendMsg);
			function backCallSendMsg(msg){
				showMessage(msg);
				//刷新列表
				doRefreshList();
			}
		}
	} 
}

//移至待关停操作，目的是：修改字段‘是否强制关停’的值为1 ，代表是
function moveToClose(){
	var selectedDataList = new Array();
	//获取多选框的值
	selectedDataList = setSelectedDataList();
	//取出相应数值
	if(selectedDataList != null){
		for(var i = 0;i<selectedDataList.length;i++){
			var rid = selectedDataList[i].get("RID");
			var url = rootPath+"/SMMS/PendingEvent_aqsjBiz/MoveToClose?RID="+rid;
			XMLHttp.urlSubmit(url,backCallSendMsg);
			function backCallSendMsg(msg){
				showMessage(msg);
				//刷新列表
				doRefreshList();
			}
		}

	}else{
		showMessage("数据异常，请稍后再试。");
	}

}

//移至待整改操作，目的是：修改字段‘是否强制关停’的值为2 ，代表否
function moveToRectify(){
	var selectedDataList = new Array();
	//获取多选框的值
	selectedDataList = setSelectedDataList();
	//取出相应数值
	if(selectedDataList != null){
		for(var i = 0;i<selectedDataList.length;i++){
			var rid = selectedDataList[i].get("RID");
			var url = rootPath+"/SMMS/PendingEvent_aqsjBiz/MoveToRectify?RID="+rid;
			XMLHttp.urlSubmit(url,backCallSendMsg);
			function backCallSendMsg(msg){
				showMessage(msg);
				//刷新列表
				doRefreshList();
			}
		}

	}else{
		showMessage("数据异常，请稍后再试。");
	}
}


