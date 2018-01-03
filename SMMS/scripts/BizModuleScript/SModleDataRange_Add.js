function doOnload(){
  if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于新增操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
  if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于新增操作，页面元素发生改变是要执行的代码在此完成//////////
  
  
}


/**  
 * 打开checkbox pop窗口
 */   
function openModleDataRangeCheckPop(id,fid,tableModelId,fieldId,fieldName){
		var dataObject = new Object(); 
		dataObject.fieldId = fieldId;
		dataObject.fieldName = fieldName;
	   var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkSinPop&tableModelId="+tableModelId+"&checkBoxMode=true";
	   openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
	   
	   dataObject.backCall=function(){
		   if(dataObject.dispValue!=null && dataObject.trueValue!=null){
			      document.getElementById('detailId_'+id).value=dataObject.trueValue;
			      document.getElementById('disp_detailId_'+id).value=dataObject.dispValue;
			      document.getElementById("detailId_"+fid).value=dataObject.dispValue;     
		   }
	   };
}

function preSave(opMode){
	var orgFldName=document.getElementById("detailId_ORGFLDNAME").value;  
	var userFldName=document.getElementById("detailId_USERFLDNAME").value;
	var orgSet=document.getElementById("detailId_ORGSET").value;
	var userSet=document.getElementById("detailId_USERSET").value;
	var orgExtSet=document.getElementById("detailId_ORGEXTSET").value;
	var userExtSet=document.getElementById("detailId_USEREXTSET").value;
	var extCond=document.getElementById("detailId_EXTCOND").value;
//	alert(opMode);
	var flag=false;
	if((extCond==null || extCond=="") || (extCond!=null && extCond!="")){
		if(((orgFldName!=null && orgFldName!="") && ((orgSet!=null && orgSet!="") || ((orgExtSet!=null && orgExtSet!=""))) &&  (userFldName!=null &&  userFldName!="") && ((userSet!=null && userSet!="") || (userExtSet!=null && userExtSet!=""))) ){
			flag=true;
		}else if(((orgFldName==null || orgFldName=="") && ((orgSet==null || orgSet=="") && (orgExtSet==null || orgExtSet==""))) &&  ((userFldName!=null &&  userFldName!="") && ((userSet!=null && userSet!="") || (userExtSet!=null && userExtSet!=""))) ){
			flag=true;
		}else if(((orgFldName!=null && orgFldName!="") && ((orgSet!=null && orgSet!="") || (orgExtSet!=null && orgExtSet!=""))) &&  ((userFldName==null ||  userFldName=="") && ((userSet==null || userSet=="") && (userExtSet==null || userExtSet=="")))){
			flag=true;
		}else if((orgFldName==null || orgFldName=="") && (orgSet==null || orgSet=="") && (orgExtSet==null || orgExtSet=="") &&  (userFldName==null ||  userFldName=="") && (userSet==null || userSet=="") && (userExtSet==null || userExtSet=="")){
			flag=true;
		}else{
			 showMessage("MSG1224");//您填写的信息不完整！请认真核对后再保存！
		}
	}
	return flag;
}






