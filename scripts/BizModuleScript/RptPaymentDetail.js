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

/**
 * 申请人查询条件
 */
function openPop(){	
	var custType=document.getElementById("detailId_CUSTTYPE").value;	
	if(custType==""){
		showMessage("MSG1016");//请先选择申请人类型！
	}else if(custType=="1"){        //申请人类型为企业
		openSinPop("CrdCustBase_Corp","CUSTID","CUSTCODE","CUSTNAME");
	}else if(custType=="2"){        //申请人类型为个人
		openSinPop("CrdCustBase_Indi","CUSTID","CUSTCODE","CUSTNAME");
	}
}