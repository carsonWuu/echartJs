/***********************************
* @文件描述：与机构额度管理相关的js
*************************************/
function doOnload(){
  if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
}

function doChange(obj){
  if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////
}

function copyQuota(){                   //复制额度	
	if(selectedRid != null){
		var url = rootPath+'/credit/riskManage/quotaManage/CrdCustProdQuotaBiz/CopyQuotaPage?tag=org&RID='+selectedRid;
//		openWindow(url);
		openModalDialog(url,window,'dialogWidth:350px;dialogHeight:300px');
		doRefreshList();
	}else{
		showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
	}
}