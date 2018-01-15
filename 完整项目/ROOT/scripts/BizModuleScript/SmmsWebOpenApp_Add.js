/***********************************
* @文件描述：
*************************************/
function doOnload(){
  if (typeof(doOnload_Super) != "undefined") { doOnload_Super();}  //如果存在页面加载超级方法，则先执行
////////对于新增操作，页面加载时要执行的代码在此完成//////////
  var objId1 = "DoAddSave";
  var yn = false
  setObjectDisplay(objId1,yn);
  var objId2 = "DoAddSaveClose";
  setObjectDisplay(objId2,yn);
  var objId = "addResetButton";
  setObjectDisplay(objId,yn);
  var btnText="提交";
  var clickFunc = "doSubmit(true)";
  addButton(objId,btnText,clickFunc,yn);
}

function doChange(obj){
  if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于新增操作，页面元素发生改变是要执行的代码在此完成//////////
}

function doAfterSubmit(msg){
	showMessage(msg);
	doRefreshList();
	closeWindow();
}
