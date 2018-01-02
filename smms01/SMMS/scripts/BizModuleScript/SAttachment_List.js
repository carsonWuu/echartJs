/***********************************
 * @文件描述：与上传文件和下载文件相关的js
 *************************************/
function doOnload(){
	if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
	if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
	if(obj.name == "ARCHIVETYPE_rid_"+selectedRid || obj.name == "ATTACHMENTNAME_rid_"+selectedRid){
		setAttachmentName();
	}
}

function setAttachmentName(){			//设置附件名称（项目编号+文档类型+文档名称）
	var fileCode = getDataListTrueValue(selectedRid,"FILECODE");				  //项目编号
	var attachmentName = getDataListTrueValue(selectedRid,"ATTACHMENTNAME"); 	  //附件名称
	var trueArchiveType = getDataListTrueValue(selectedRid,"ARCHIVETYPE");    	  //项目类型真实值
	var dispArchiveType = getDataListDisplayValue(selectedRid,"ARCHIVETYPE");     //项目类型显示值
	if(fileCode == null || fileCode == "" || attachmentName == null || attachmentName == "" || 
			trueArchiveType == null || trueArchiveType == ""){
		return;
	}
	if(attachmentName.indexOf("+") == -1){		//判断附件名称是否存在“+”
		attachmentName = fileCode + "+" + dispArchiveType + "+" + attachmentName;
	}else{
		attachmentName = fileCode + "+" + dispArchiveType + "+" + attachmentName.substring(attachmentName.lastIndexOf("+")+1);	
	}
	setDataListValue(selectedRid,"ATTACHMENTNAME",attachmentName,attachmentName);
}

function upFile(){                  //上传文件
	var url=rootPath+'/upload/commonUpload/uploadFile?tag=single&tableid='+mainTableModelId+'&recordrid='+mainRid;
	//openModalDialog(url,window,'dialogWidth:550px;dialogHeight:550px');
	openWindow(url,'上传附件',null,null,'555px','500px');
}

function batchUpFile(){             //批量上传文件
	var url=rootPath+'/upload/commonUpload/uploadFile?tag=batch';
	//openModalDialog(url,window,'dialogWidth:550px;dialogHeight:550px');
	openWindow(url);
}

function confirmSingleFileState(){               //修改选中附件的附件状态为“已确认”
	if(selectedRid != null) {
		var url = rootPath+"/fmp/SAttachmentBiz/ConfirmFileState?tag=single&RID="+selectedRid;
		comAjax(url,backCallMsg);
		function backCallMsg(msg){
			if(msg == "success"){
				showMessage("MSG1204");//成功修改选中附件的附件状态为已确认！
				doRefreshList();
			}else{
				showMessage("MSG1205");//修改附件状态发生异常！
			}
		}
	}else{
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

function confirmAllFileState(){                  //修改全部的附件状态为“已确认”
	var url = rootPath+"/fmp/SAttachmentBiz/ConfirmFileState?tag=all";
	comAjax(url,backCallMsg);
	function backCallMsg(msg){
		if(msg == "success"){
			showMessage("MSG1206");//成功修改全部附件的附件状态为已确认！
			doRefreshList();
		}else{
			showMessage("MSG1205");//修改附件状态发生异常！
		}
	}
}

function downloadAttachment(){                   //下载文件
	if (selectedRid != null) {
		//comAjax(rootPath+"/fmp/SAttachmentBiz/download?rowid="+selectedRid,null);
		location.href = rootPath+"/fmp/SAttachmentBiz/download?tableModelId="+tableModelId+"&rowid="+selectedRid;
	} else {
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}

function batchDownLoad(){   //批量下载附件
	var dataObject = new Object();
	dataObject.opener = window;
	var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkPopWithCallBackFunc&popDataType=Pop&isSubTbl=true&tableModelId="+tableModelId+"&checkBoxMode=true&"+getSearchListUrl("0")+"&"+getSearchParamStr();
	openModalDialog(url,dataObject, "scroll:yes; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");

	dataObject.backCall=function(){
		var rid = "";
		for (var i = 0; i<selectedDataList.recordCount;i++){   //循环所选记录
			if(rid == ""){
				rid = selectedDataList.record[i].data["RID"];
			}else{
				rid += "," + selectedDataList.record[i].data["RID"];
			}
		}
		if(rid != ""){
			location.href = rootPath+"/fmp/SAttachmentBiz/batchDownLoad?rid="+rid;
		}
	};
}

/**
 * 导入附件
 * @param fileId 导入对象字段
 * @param tableModelId 表模型Id
 * @return
 */
function importAttachment(fileId,tableModelId){
	var url = rootPath+"/fmp/SAttachmentBiz/ImportAttBiz?fileId="+fileId
	+"&mainRid="+mainRid
	+"&tableModelId="+tableModelId;
	comAjax(url,backCallImportAttachment);
	function backCallImportAttachment(msg){
		showMessage(msg);
		doRefreshList();
	}
}

/**
 * 上传所缺附件
 * @return
 */
function uploadLackAtt(){
	var freezeCondition = "and cci.RID='"+mainRid+"'";
	var url=rootPath+"/fmp/FrameCommonBiz/DoList?&moduleId=crd_md_scsqfj&opMode=update&isSubTbl=true&tableModelId=SAttachmentForLack&uploadTag=true&freezeCondition="+freezeCondition;
    openWindow(url);
}