/*******************************************************************************
 * @文件描述：模块信息的js
 ******************************************************************************/
function doChange(obj) {
	if (obj.name == "MODULEID") {
		checkVo(rootPath + '/fmp/SModuleBiz/CheckModuleVO?id=');
	}
}

function doBlur(obj) {
	if (obj && obj.name == "PARENTID") {
		var parentId = document.getElementById("detailId_PARENTID").value;
		var moduleId = document.getElementById("detailId_MODULEID").value;
		if (parentId == "" || trim(parentId) == "") {
			return;
		}
		if (parentId == moduleId) {
			setErrMessage("PARENTID", "录入的上级ID不能是当前的模块ID");
			return;
		}
		var url = rootPath + "/fmp/SModuleBiz/CheckSModuleParentID?id="
				+ parentId;
		comAjax(url, backCallCheckSModuleParentID);
	}
}

function backCallCheckSModuleParentID(msg) {
	// var parentIdObj =document.getElementById("detailId_PARENTID");
	if ("Success" == msg)// 存在
	{
		setErrMessage("PARENTID", "上级模块ID不存在,请重新录入! ");
	} else if ("subOppExist" == msg) {
		// setErrMessage("PARENTID","该上级模块下有模块操作,请输入另一个上级模块ID!");
	} else if ("moduleExist" == msg) {// 存在,可以录入
		setErrMessage("PARENTID", "");
	} else {
		setErrMessage('PARENTID', "未知的错误！" + msg);
	}

}

function checkVo(url) {
	var idValue = getFieldTrueValue("MODULEID");
    if (getFieldOldValue("MODULEID") != idValue){
		url += idValue;
		var msg = comAjax(url,null);
    	if (trim(msg)=="Success"){
    		return true;
    	}else{
    		return false;
    	}
    }else{
    	return true;
    }
    
}
