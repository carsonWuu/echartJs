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


function doOnDataListload(){
	
	refreshWebserviceState();
}


function refreshWebserviceState(){
	
	
	var url = rootPath+"/SMMS/IdcInfoBiz/refreshWebserviceState";
	//发送一个ajax请求
	XMLHttp.urlSubmit(url,backCallSendMsg);
	function backCallSendMsg(msg){
		var json = eval(msg);
		for(var i=0 ;i<json.length; i++){
			setDataListValue(json[i].rid,'WEBSERVICE_STATE',json[i].state);
		}
	}	
}


