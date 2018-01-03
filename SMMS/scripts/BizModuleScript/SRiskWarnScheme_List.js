/***********************************
 * @文件描述：风险预警方案的js
 *************************************/
function doOnload(){
	if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
	if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
}

function trigWarnMessage(){
	var url=rootPath+"/fmp/system/riskwarning/SRiskWaringBiz/TrigWarnMessage"; 
	comAjax(url,backCallInfo);
	function backCallInfo(msg){
		if(msg == "success"){
			showMessage("MSG1232");//触发风险预警消息成功！
		}else{
			showMessage("MSG1233");//触发风险预警消息失败！
		}
	}
}