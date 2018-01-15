/***********************************
 * @文件描述：
 *************************************/
function doOnload(){
	if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
	if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
}

//强制关停按钮所触发的时间
function forceClose(){
	var selectedDataList = new Array();
	selectedDataList = setSelectedDataList();
	var rids = "";
	var total=0;
	if (selectedDataList != null) {
		for (var i = 0; i<selectedDataList.length ;i++){
			var rid=selectedDataList[i].get("RID");  
			rids +=rid+",";
			var mappingMode=selectedDataList[i].get("MAPPING_MODE");
			if(mappingMode==2){
				total=total+1;
			}
		}
		if (confirm("有"+total+"笔安全事件信息属于IP匹配备案信息，匹配的备案信息不一定正确，是否继续强制关停操作？")) {
			var url = rootPath+"/SMMS/SmmsPendingEventBiz/forceClose?RID="+rids;
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
//下发
function sand(){
	var selectedDataList = new Array();
	selectedDataList = setSelectedDataList();
	var rids = "";
	if (selectedDataList != null) {
		for (var i = 0; i<selectedDataList.length ;i++){
			var rid=selectedDataList[i].get("RID");  
			rids +=rid+",";

		}

		var url = rootPath+"/SMMS/SmmsPendingEventBiz/Sand?RID="+rids;
		//发送一个ajax请求
		XMLHttp.urlSubmit(url,backCallSendMsg);
		function backCallSendMsg(msg){
			showMessage(msg);
			//刷新列表
			doRefreshList();

		}
	} 
}
//强制关停全部
function forceCloseAll(){
	var obj = getDataListObj('SmmsPendingEvent.viewAllMappingMode');
	var total=0;
	if (obj!= null) {
		for (var i = 0; i<obj.length ;i++){		
			var mappingMode=obj[i].MAPPING_MODE;
			if(mappingMode!="" && mappingMode==2){
				total=total+1;
			}
		}
		if (confirm("有"+total+"笔安全事件信息属于IP匹配备案信息，匹配的备案信息不一定正确，是否继续强制关停操作？")) {
			var url = rootPath+"/SMMS/SmmsPendingEventBiz/forceCloseAll";
			XMLHttp.urlSubmit(url,backCallSendMsg);
			function backCallSendMsg(msg){
				showMessage(msg);
				doRefreshList();
				}
			}
		}
	}
//	下发
	function sandAll(){

		var url = rootPath+"/SMMS/SmmsPendingEventBiz/SandAll?RID=";
		//发送一个ajax请求
		XMLHttp.urlSubmit(url,backCallSendMsg);
		function backCallSendMsg(msg){
			showMessage(msg);
			//刷新列表
			doRefreshList();
		}
	}

//	关停录入
	function inputForceClose(){

		var url = rootPath+"/SMMS/SmmsPendingEventBiz/forceEntering";

		openWindow(comUrl(url));
	}
//	移至白名单
	function whiteList(){
		var selectedDataList = new Array();
		selectedDataList = setSelectedDataList();
		var rids = "";
		if(selectedDataList != null){
			for (var i = 0; i<selectedDataList.length ;i++){
				var rid=selectedDataList[i].get("RID");  
				rids +=rid+";";

			}
			var url = rootPath+"/SMMS/SmmsPendingEventBiz/whiteList?RID="+rids;
			//发送一个ajax请求
			XMLHttp.urlSubmit(url,backCallSendMsg);
			function backCallSendMsg(msg){	
				showMessage(msg);
				//刷新列表
				doRefreshList();
			}
		}
	}
//	移出白名单
	function updateBlackList(){
		var selectedDataList = new Array();
		selectedDataList = setSelectedDataList();
		var rids = "";
		if(selectedDataList != null){
			for (var i = 0; i<selectedDataList.length ;i++){
				var rid=selectedDataList[i].get("RID");  
				rids +=rid+",";

			}
			var url = rootPath+"/SMMS/SmmsPendingEventBiz/updateBlackList?RID="+rids;
			//发送一个ajax请求
			XMLHttp.urlSubmit(url,backCallSendMsg);
			function backCallSendMsg(msg){
				showMessage(msg);
				//刷新列表
				doRefreshList();
			}	
		}
	}