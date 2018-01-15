/***********************************
 * @文件描述：短信模板的js
 *************************************/
function doOnload(){
	if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
	if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
}

function trigSmsMessage(){
	var url = rootPath+"/fmp/mobileSms/MmAccountInfoBiz/TrigSmsMessage"; 
	comAjax(url,backCallInfo);
	function backCallInfo(msg){
		if(msg == "success"){
			showMessage("MSG1234");//触发短信消息成功！
		}else{
			showMessage("MSG1235");//触发短信消息失败！
		}
	}
}

function sentSms(){
	var url = rootPath+"/fmp/FrameCommonBiz/DoAdd?tableModelId=SentSmsTemplet"; 
	openWindow(url);
}