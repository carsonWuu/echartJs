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
}

function upFile(){                  //上传文件
	var url=rootPath+'/upload/commonUpload/uploadFile?tag=single&tableid='+mainTableModelId+'&recordrid='+mainRid;
	//openModalDialog(url,window,'dialogWidth:550px;dialogHeight:550px');
	openWindow(url,'上传附件',null,null,'555px','500px');
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
		for (var i = 0; i<dataObject.recordCount;i++){   //循环所选记录
			if(rid == ""){
				rid = dataObject.record[i].data["RID"];
			}else{
				rid += "," + dataObject.record[i].data["RID"];
			}
		}
		if(rid != ""){
			location.href = rootPath+"/fmp/SAttachmentBiz/batchDownLoad?rid="+rid;
		}
	};
}