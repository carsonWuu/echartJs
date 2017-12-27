/***********************************
* @文件描述：
*************************************/
function doOnload(){
  if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于列表操作，页面加载时要执行的代码在此完成//////////
  
  setObjectDisplay("DoAddSave",false);
  addButton("DoAddSave","提交转办","doDevolve()","h5button green medium");
  
}

function doChange(obj){
  if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于列表操作，页面元素发生改变是要执行的代码在此完成//////////

  if(obj.name =="ASSIGNEE"){
	  if(obj.value == CURR_USERID){
		  showMessage("MSG1249");//受托人不可以是本人，请确认后选择！
		  $('#disp_detailId_ASSIGNEE').val("");
		  $('#detailId_ASSIGNEE').val("");
	  }
  }
}


/**
 * 打开委托人pop窗口
 */
function openUserPop(){
	var keyLimitCondition = "ORGID:"+CURR_ORGID;
	openSinPop("SUser","ASSIGNEE","USERID","USERNAME",keyLimitCondition);
}


/**
 * 提交转办节点
 * @return
 */
function doDevolve(){
	var form = document.forms[0];//document.getElementById("DoAdd");
	var result =checkAll(form);
	if (result){
		if (typeof(preSave) != "undefined"){
			result = preSave("add");
		}
	}
	if(result){
		var submitUrl = comUrl("DoDevolveBiz");
	       XMLHttp.formSubmit(form,submitUrl,addSaveBackCall);
	}
	function addSaveBackCall(msg){
		if (msg.substr(0,4) == "RID="){
			showMessage("MSG1250");//提交转办成功！
			doRefreshList();
			closeWindow();
		}else{
			showMessage(msg);
		}
	}
}