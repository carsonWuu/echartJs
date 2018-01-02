////本方法不能删除，也不能修改，因为此函数作为调用函数，并且有可能被覆盖////
function doOnload(){
  doOnload_Super();
//请不要在此写任何业务逻辑
}

////本方法不能删除，也不能修改，因为此函数作为调用函数，并且有可能被覆盖////
function doChange(obj){
  doChange_Super(obj);
//请不要在此写任何业务逻辑
}
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////



function doOnload_Super(){
////////对于所有操作，页面加载时要执行的代码在此完成//////////

}

function doChange_Super(obj){
////////对于所有操作，页面元素发生改变是要执行的代码在此完成//////////
	
}



function openReportTemplet(){
	     if(selectedRid!=null){
	    	var reportTempletId = getDataListTrueValue(selectedRid,"REPORTTEMPLETID");
	    	var url =rootPath+"/fmp/system/report/reportTemplet/SReportTempletBiz/OpenSReportTemplet?tableModelId=SReportSubTemplet&REPORTTEMPLETID="+reportTempletId; 
	    	url = fmpEncodeURI(comUrl(url));
	    	location.href = url;	    	 
	     }else{
	    	 showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	     }
}









