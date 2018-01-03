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
	if (selectedRid != null) {
		var url = rootPath+"/SMMS/SmmsPendingEventBiz/forceClose?RID="+selectedRid;
		//发送一个ajax请求
		XMLHttp.urlSubmit(url,backCallSendMsg);
		function backCallSendMsg(msg){
			var message=msg.substr(0,3);
			if(message=='000'){
				var msg=msg.substr(4,8);
				showMessage(msg);}
			else{
				showMessage(msg);
			}


			//刷新列表
			doRefreshList();
		}


	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}	
}
//下发
function sand(){
	if (selectedRid != null) {
		var url = rootPath+"/SMMS/SmmsPendingEventBiz/Sand?RID="+selectedRid;
		//发送一个ajax请求
		XMLHttp.urlSubmit(url,backCallSendMsg);
		function backCallSendMsg(msg){
			showMessage(msg);
			//刷新列表
			doRefreshList();
		}

	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}	
}
//强制关停全部
function forceCloseAll(){
	var url = rootPath+"/SMMS/SmmsPendingEventBiz/forceCloseAll";
	XMLHttp.urlSubmit(url,backCallSendMsg);
	function backCallSendMsg(msg){
		var message=msg.substr(0,3);
		if(message=='000'){
			var msg=msg.substr(4,msg.length);
			showMessage(msg);}
		else{
			showMessage(msg);
		}
		doRefreshList();
	}

}
//下发
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
//关停录入
function inputForceClose(){
	var url = rootPath+"/SMMS/SmmsPendingEventBiz/forceEntering";
	openWindow(comUrl(url));
}

//移到白名单
function whiteList(){
	if (selectedRid != null) {
		var url = rootPath+"/SMMS/SmmsPendingEventBiz/whiteList?RID="+selectedRid;
		//发送一个ajax请求
		XMLHttp.urlSubmit(url,backCallSendMsg);
		function backCallSendMsg(msg){
			showMessage(msg);
			//刷新列表
			doRefreshList();
		}	
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}	
}
//移出白名单
function updateBlackList(){
	if (selectedRid != null) {
		var url = rootPath+"/SMMS/SmmsPendingEventBiz/updateBlackList?RID="+selectedRid;
		//发送一个ajax请求
		XMLHttp.urlSubmit(url,backCallSendMsg);
		function backCallSendMsg(msg){
			showMessage(msg);
			//刷新列表
			doRefreshList();
		}	
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}	
}