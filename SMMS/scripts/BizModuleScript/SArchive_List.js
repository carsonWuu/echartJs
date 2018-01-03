function doOnload(){
  if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
  if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
}

function openAttachment(){
	if (selectedRid != null) {
		var keyLimit ='ARCHIVEID:'+getDataListTrueValue(selectedRid,"ARCHIVEID");
		var url=rootPath+"/fmp/SAttachmentBiz/DoList?tableModelId=SAttachment&moduleId=crd_md_fjb&keyLimit="+keyLimit;
		openWindow(url);
	}else{
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}


function upFile(){
	if (selectedRid != null) {
		var archiveid = getDataListTrueValue(selectedRid,"ARCHIVEID");
		var url=rootPath+'/upload/commonUpload/uploadFile?archiveid='+archiveid;
		//openModalDialog(url,window,'dialogWidth:550px;dialogHeight:550px');
		openWindow(url,'上传附件',null,null,'555px','500px');
	}else{
		showMessage("MSG1203");//请选择上传文件所在的文档！
	}
}