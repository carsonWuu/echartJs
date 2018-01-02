/***********************************
* @文件描述：与上传所缺附件相关的js
*************************************/
function doOnload(){
	if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
	if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
}

/**
 * 上传附件
 * @return
 */
function uploadLackAttachment(){
	if(selectedRid==null){
		 showMessage("MSG0050");//请先在列表中选择一条记录！
		 return;
	}
	var recordRid = getDataListTrueValue(selectedRid, "RECORDRID");
	var archiveType = getDataListTrueValue(selectedRid, "ARCHIVETYPE");
	var attachmentName = getDataListTrueValue(selectedRid, "ATTACHMENTNAME");
	var attachmentRemark = getDataListTrueValue(selectedRid, "ATTACHMENTREMARK");
	var url = rootPath+"/upload/commonUpload/uploadFile?tag=uploadLackAtt&tableid=CrdCaseInfo&recordrid="+recordRid
			+"&ARCHIVETYPE="+archiveType+"&ATTACHMENTNAME="+fmpEncodeURI(attachmentName)+"&ATTACHMENTREMARK="+fmpEncodeURI(attachmentRemark);
	openWindow(url,'上传附件',null,null,'555px','500px');
}
