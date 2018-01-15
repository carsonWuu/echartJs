function doChange(obj){
	if (typeof(doChange_Super) != "undefined") { doChange_Super(obj);}  //如果存在onChange的超级方法，则先执行
////////对于新增操作，页面元素发生改变是要执行的代码在此完成//////////
	if (obj.name == "BUILDRANGE"){
		setFieldValue("BUILDOBJ","");
		var buildRange = document.getElementById("detailId_BUILDRANGE").value;
		if(buildRange=="1"){         //判断生成范围是否选择为机构
			if(isOrgUser=="true"){         //判断是否机构用户
				setFieldValue("BUILDOBJ",CURR_ORGID,CURR_ORGNAME);
			}
			setObjectDisplay("div_BUILDOBJ",true);
		}else if(buildRange=="6"){ //生成范围是全部
			setObjectDisplay("div_BUILDOBJ",false);
			reSetFieldValue("BUILDOBJ");
		}else{
			setObjectDisplay("div_BUILDOBJ",true);
		}
	}

}
function openPop(){		
	var buildrange=document.getElementById("detailId_BUILDRANGE").value;	

	if(buildrange==""){         //判断生成范围是否选择为空
		showMessage("MSG1003");//请先选择生成范围！
	}
	if(buildrange=="1"){         //判断生成范围是否选择为机构
		if(isOrgUser=="true"){
			showMessage("MSG1004");//不可改变此生成对象！
		}else{
			openBulidRightPop("SOrg");
		}
	}
	if(buildrange=="2"){         //判断生成范围是否选择为部门	
		if(isOrgUser=="true"){
			openBulidRightPopOrg("SDept");
		}else{
			openBulidRightPop("SDept");
		}
	}
	if(buildrange=="4"){         //判断生成范围是否选择为岗位
		if(isOrgUser=="true"){
			openBulidRightPopOrg("SRole");
		}else{
			openBulidRightPop("SRole");
		}
	}
	if(buildrange=="5"){         //判断生成范围是否选择为用户
		if(isOrgUser=="true"){
			openBulidRightPopOrg("SUser");
		}else{
			openBulidRightPop("SUser");
		}
	}
}

function openBulidRightPopOrg(tableModelId,keyLimitCondition){
	var dataObject = new Object();
	dataObject.tableModelId = tableModelId;
	if(keyLimitCondition==null){
		keyLimitCondition='';
	}	
	if(tableModelId=='SDept'){
		var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=STATPop&tableModelId="+tableModelId+"&freezeCondition=and (dept.ORGID='"+CURR_ORGID+"' or dept.ORGID='[ALL]')";
		openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:1000px; dialogLeft:100px;");
		dataObject.backCall=function(){
			if (dataObject.trueValue != '') {   //返回给父窗口隐藏域
				setFieldValue('BUILDOBJ',dataObject.trueValue,dataObject.dispValue);     
			}  
		};	
	}

	if(tableModelId=='SRole'){
		var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=STATPop&tableModelId="+tableModelId+"&freezeCondition=and (rol.ORGID='"+CURR_ORGID+"' or rol.ORGID='[ALL]')";
		openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:1000px; dialogLeft:100px;");
		dataObject.backCall=function(){
			if (dataObject.hiddROLEID != '') {   //返回给父窗口隐藏域
				setFieldValue('BUILDOBJ',dataObject.trueValue,dataObject.dispValue); 
			}  
		}
	}

	if(tableModelId=='SUser'){
		var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=STATPop&tableModelId="+tableModelId+"&freezeCondition=and (user1.ORGID='"+CURR_ORGID+"' or user1.ORGID='[ALL]')";
		openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogHeight:480px; dialogLeft:100px;");
		dataObject.backCall=function(){
			if (dataObject.hiddUSERID != '') {   //返回给父窗口隐藏域
				setFieldValue('BUILDOBJ',dataObject.trueValue,dataObject.dispValue);      
			} 
		}
	}
}


function openBulidRightPop(tableModelId,keyLimitCondition){
	var dataObject = new Object();
	dataObject.tableModelId = tableModelId;
	if(keyLimitCondition==null){
		keyLimitCondition='';
	}
	var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=STATPop&tableModelId="+tableModelId+"&keyLimit="+document.getElementById("keyLimit").value+keyLimitCondition;
	openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes;dialogWidth:800px; dialogHeight:480px; dialogLeft:100px;");
	dataObject.backCall=function(){
		if (dataObject.trueValue != null) {   //返回给父窗口隐藏域
			setFieldValue('BUILDOBJ',dataObject.trueValue,dataObject.dispValue);     
		}
	}
}





