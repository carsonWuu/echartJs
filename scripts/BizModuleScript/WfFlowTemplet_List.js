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

function showFlowEditor(){
	if (selectedRid != null) {
		var url =rootPath+"/fmp/workflow/WorkFlowBiz/ShowWorkFlowEditor?FLOWTEMPID="+getDataListDisplayValue(selectedRid,"FLOWTEMPID");
		openWindow(url,'流程编辑器',null,null,null,'600px');
	}else{
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}

}

//流程模拟
function simulateWorkFlow(){
	if (selectedRid != null) {
		var url =rootPath+"/fmp/workflow/WorkFlowBiz/simulateSVGWorkFlow?FLOWTEMPID="+getDataListDisplayValue(selectedRid,"FLOWTEMPID")
						+"&opMode=simul"
						+"&PARAMETERSQL="+getDataListTrueValue(selectedRid,"PARAMETERSQL")
						+"&FLOWTEMPNAME="+fmpEncodeURI(getDataListTrueValue(selectedRid,"FLOWTEMPNAME"));
		openWindow(url,'流程模拟器',null,null,null,'600px');
	}else{
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}