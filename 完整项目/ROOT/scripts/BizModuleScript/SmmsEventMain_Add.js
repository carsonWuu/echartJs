/***********************************
* @文件描述：
*************************************/
function doOnload(){
  if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于新增操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
  if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于新增操作，页面元素发生改变是要执行的代码在此完成//////////
}
function preSave(opmode){
	var url=getFieldTrueValue('URL');
	var ip=getFieldTrueValue('IP');
	
	//用正则验证IP地址格式是否正确
	if(ip!=null && ip!=""){
	   var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;//正则表达式   
	   if(re.test(ip))   
	   {   
	       if( RegExp.$1<256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) 
	       return true;   
	   }   
	   showMessage("目标IP地址格式有误！");
	   return false;
	   }
	if (opmode="add"){
		var objUrl = getDataMapObj('SmmsEventMain.countDomainTotal&DOMAIN_NAME='+url);
		var objIp = getDataMapObj('SmmsEventMain.countIpTotal&IP='+ip);
		if(objUrl != null && objUrl.DOMAINTOTAL != 0){
			
			var url = rootPath+"/SMMS/SmmsEventMainBiz/UpdateDetialCountAddOne?RID="+objUrl.MAIN_RID;
			//发送一个ajax请求
			XMLHttp.urlSubmit(url,backCallSendMsg);
			function backCallSendMsg(msg){}
			
			showMessage("域名已存在");
			doRefreshList();
			return false;
		}else if(objIp != null && objIp.IPTOTAL != 0){
			var url = rootPath+"/SMMS/SmmsEventMainBiz/UpdateDetialCountAddOne?RID="+objIp.MAIN_RID;
			//发送一个ajax请求
			XMLHttp.urlSubmit(url,backCallSendMsg);
			function backCallSendMsg(msg){}
			showMessage("IP已存在");
			doRefreshList();
			return false;
		}else{
			
			return true;
		}	
	}
}