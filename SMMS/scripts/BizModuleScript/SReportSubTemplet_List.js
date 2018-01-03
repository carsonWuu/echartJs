/***********************************
 * @文件描述：
 *************************************/

function doOnload(){
  if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
  if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
}

function addSReportSubTempletData(){
	     var keyLimit=document.getElementById("keyLimit").value;
	     var reportTempleId=keyLimit.substring(keyLimit.indexOf(":")+1);
	     var url=rootPath+"/fmp/system/report/reportSubTemplet/SReportSubTempletBiz/addSReportSubTemletData?opMode=add&REPORTTEMPLETID="+reportTempleId;
	     openWindow(url);
	     
	     
}

function updateSReportSubTempletData(){
    if(selectedRid!=null){
    	var url=rootPath+"/fmp/system/report/reportSubTemplet/SReportSubTempletBiz/updateSReportSubTemletData?opMode=update&RID="+selectedRid;
        openWindow(url);
           	
    }else{
    	showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
    }
    
}