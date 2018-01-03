/*******************************************************************************
 * @文件描述：自动编码规则唯一性验证脚本
 ******************************************************************************/
// //本方法不能删除，也不能修改，因为此函数作为调用函数，并且有可能被覆盖////
function doOnload() {
	doOnload_Super();
	// 请不要在此写任何业务逻辑
}

// //本方法不能删除，也不能修改，因为此函数作为调用函数，并且有可能被覆盖////
function doChange(obj) {
	doChange_Super(obj);
	// 请不要在此写任何业务逻辑
}
// /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////

function doOnload_Super() {
	// //////对于所有操作，页面加载时要执行的代码在此完成//////////

}

function doChange_Super(obj) {
	// //////对于所有操作，页面元素发生改变是要执行的代码在此完成//////////

}

function backCallCT(msg) {
	if(msg != "Success"){
		if("oldExist" == msg){
			setErrMessage('CODETYPE', "此编码规则已经存在对应的所属机构在数据库中已备份，请通知管理员恢复数据或者重新输入！");
		}else if("newExist" == msg){
			setErrMessage('CODETYPE', "此编码规则已经存在对应的所属机构，请您重新确认输入！");
		}else{
			setErrMessage('CODETYPE', "未知的错误！" + msg);
		}
	}
}

function backCallOI(msg) {
	if(msg != "Success"){
		if("oldExist" == msg){
			setErrMessage('ORGID', "此机构已经存在对应的编码规则在数据库中已备份，请通知管理员恢复数据或者重新输入！");
		}else if("newExist" == msg){
			setErrMessage('ORGID', "此机构已经存在对应的编码规则，请您重新确认输入！");
		}else{
			setErrMessage('ORGID', "未知的错误！" + msg);
		}
	}
}

// 自动编码机构pop窗口
function openSinOrgPop(tableModelId, fid, sid, sname, keyLimitCondition) {
	var dataObject = new Object();
	dataObject.sid = sid;
	dataObject.sname = sname;
	dataObject.trueValue = null;
	dataObject.dispValue = null;
	if (keyLimitCondition == null) {
		keyLimitCondition = '';
	}
	if (document.getElementById("keyLimit")) {
		keyLimitCondition = document.getElementById("keyLimit").value
				+ keyLimitCondition;
	}
	var url = rootPath
			+ "/fmp/FrameCommonBiz/DoPopList?popMode=singleVPop&showAllButton=true&tableModelId="
			+ tableModelId + "&keyLimit=" + keyLimitCondition;
	openModalDialog(
			url,
			dataObject,
			"scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
	dataObject.backCall=function(){
		if (dataObject.trueValue != null) { // 返回给父窗口隐藏域
			setFieldValue(fid, dataObject.trueValue, dataObject.dispValue);
		}
		if (typeof(doChange) != "undefined") {
			doChange(document.getElementById('detailId_' + fid));
		} 
	};


}
