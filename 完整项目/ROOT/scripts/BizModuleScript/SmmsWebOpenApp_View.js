/***********************************
* @文件描述：
*************************************/
function doOnload(){
  if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于查看操作，页面加载时要执行的代码在此完成//////////
  var yn = false;
  var objId = "viewButtonArea";
  setObjectDisplay(objId,yn);
  var btnText="关闭";
  var clickFunc = "submitClose(this)";
  addButton(objId,btnText,clickFunc,'h5button orange medium');
  
  var yn = false;
  var objId = "viewButtonArea";
  setObjectDisplay(objId,yn);
  var btnText="提交";
  var clickFunc = "submitExam(this)";
  addButton(objId,btnText,clickFunc,yn);
  $("#detailId_APP_LEVEL").attr("disabled",false);
  $("#div_APP_LEVEL").css("display","none");
  $("[id=rdo_IS_ACCEPT]").attr("disabled",false);
  $("#detailId_REJECT_REASON").attr("disabled",false);
  $("#detailId_REJECT_REASON").attr("readOnly",false);
  $("#div_REJECT_REASON").css("display","none");
  if($("input:radio:checked").val() ==1){
	  $("#div_APP_LEVEL").css("display","block"); 
	  $("#div_REJECT_REASON").css("display","none");
  }
 
  if($("input:radio:checked").val() ==2){
	  $("#div_APP_LEVEL").css("display","none"); 
	  $("#div_REJECT_REASON").css("display","block");
  } 
  
}

function doChange(obj){
  if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于查看操作，页面元素发生改变是要执行的代码在此完成//////////
  if($("input:radio:checked").val() ==1){
	  $("#div_APP_LEVEL").css("display","block"); 
	  $("#div_REJECT_REASON").css("display","none");
  }
 
  if($("input:radio:checked").val() ==2){
	  $("#div_APP_LEVEL").css("display","none"); 
	  $("#div_REJECT_REASON").css("display","block");
  } 
}
function doClick(obj){
	//THREAT_TYPE1(AF) EVENT_TYPE1='vpno'(AC vpn) THREAT_TYPE4（ackey）
	var rid=getFieldDisplayValue('EVENT_RID');
	var obj = getDataMapObj('SmmsEventMain.findEventMainUrl&RID='+rid);
	var url="";
	if(obj !=null && obj!=""){
		if(obj.THREAT_TYPE1!=null && obj.THREAT_TYPE1!=""){
			 url = rootPath+"/SMMS/SmmsEventMain_aqsjBiz/DoView?RID="+rid+"&tableModelId=SmmsEventMain_aqsj";
		}else if(obj.EVENT_TYPE1!=null && obj.EVENT_TYPE1!=""){
			 url=rootPath+"/SMMS/SmmsEventMain_vpnBiz/DoView?RID="+rid+"tableModelId=SmmsEventMain_vpn";
		}else{
			url=rootPath+"/SMMS/SmmsEventMain_keyBiz/DDoView?RID="+rid+"tableModelId=SmmsEventMain_key";
		}
	}
	if(url!=""){
		openWindow(comUrl(url));
	}
	
}

function submitExam(obj){
	var rid = $("#detailId_RID").val();
	var accept = $("input:radio:checked").val();
	var level = $("#detailId_APP_LEVEL").val();
	var reason = $("#detailId_REJECT_REASON").val();
	reason = EncodeUtf8(reason,"UTF-8");
	var url = rootPath + "/SMMS/SmmsWebOpenAppBiz/submitExam?RID="+rid+"&IS_ACCEPT="+accept+"&APP_LEVEL="+level+"&REJECT_REASON="+reason;
	url = encodeURI(url);
	XMLHttp.urlSubmit(url, backCallSendMsg);
	function backCallSendMsg(msg){
		if(msg=='000'){
			selectedRid = rid;
			commStartWorkFlow('000033LCMB','SmmsWebOpenApp','300');
		}
		
		//刷新列表
		//doRefreshList();
		//closeWindow();
	}
	
}
function submitClose(obj){
	closeWindow();
}