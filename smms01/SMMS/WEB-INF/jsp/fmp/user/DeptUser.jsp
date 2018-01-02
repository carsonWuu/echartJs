<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String rootPath = request.getContextPath();
	String hasSetIdsAndNames = (String) request.getAttribute("hasSetIdsAndNames");
	String unsetIdsAndNames = (String) request.getAttribute("unsetIdsAndNames");
	String moduleId = (String) request.getAttribute("moduleId");
	String[] hasSetNameStr = null;
	String[] unsetNameStr = null;
	if (hasSetIdsAndNames != null && !((String) hasSetIdsAndNames).trim().equals("")) {
		hasSetNameStr = ((String) hasSetIdsAndNames).split(";");
	}
	if (unsetIdsAndNames != null && !((String) unsetIdsAndNames).trim().equals("")) {
		unsetNameStr = ((String) unsetIdsAndNames).split(";");
	}
%>
<html>
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script src="<%=rootPath %>/scripts/BizModuleScript/SUser_List.js"
	type="text/javascript" language="javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>设置用户部门页面</title>
</head>
<body onload="filterSelectBox(document.getElementById('rightFilterText'),'rightSelectBox');filterSelectBox(document.getElementById('leftFilterText'),'leftSelectBox')">
<form name="form1" action="" method="POST">
<table  width="100%">
	<tr>
		<td>
		<CENTER>可授部门</CENTER>
		</td>
		<td></td>
		<td>
		<CENTER>已授部门</CENTER>
		</td>
	</tr>
	<tr>
	
	    <td width="40%">
	    <input style="width: 96.3%;" type="text" value="" id="leftFilterText" onkeyup="filterSelectBox(this,'leftSelectBox')"/>
		<select style="width: 100%;" multiple name="leftSelectBox" id="leftSelectBox" size="15">
			<%
				if (unsetNameStr != null) {
					for (int i = 0; i < unsetNameStr.length; i++) {
						String[] unidName = unsetNameStr[i].split(",");
			%>
			<option value="<%=unidName[0]%>"><%=unidName[1]%></option>
			<%
				}
				}
			%>
		</select>
		<input name="userid" id="userid" type="hidden" value='<s:property value="#request.userId"/>'></input>
		<input name="orgid" id="orgid" type="hidden" value='<s:property value="#request.orgId"/>'></input>
		
		</td>
		
		<td width="20%" align="center">
		<input class="button_moveoption" type="button" value=" > " onClick="moveOption(document.getElementById('leftSelectBox'), document.getElementById('rightSelectBox'))" style="width:50px;"/>
		<br>
		<br>
		<input class="button_moveoption" type="button" value=" < " onClick="moveOption(document.getElementById('rightSelectBox'), document.getElementById('leftSelectBox'))"" style="width:50px;"/>
		<br>
		<br>
		<input class="button_moveoption" type="button" value=" >> " onClick="moveAllOption(document.getElementById('leftSelectBox'), document.getElementById('rightSelectBox'))" style="width:50px;"/>
		<br>
		<br>
		<input class="button_moveoption" type="button" value=" << " onClick="moveAllOption(document.getElementById('rightSelectBox'), document.getElementById('leftSelectBox'))" style="width:50px;"/>
		<br>
		<br>
		</td>
		
		
		<td width="40%">
		<input style="width: 96.3%;" type="text" value="" id="rightFilterText" onkeyup="filterSelectBox(this,'rightSelectBox')"/>
		<select style="width: 100%;" multiple name="rightSelectBox" size="15"  id="rightSelectBox" >
			<%
				if (hasSetNameStr != null) {
					for (int i = 0; i < hasSetNameStr.length; i++) {
						String curruserdeptId = (String) request.getAttribute("curruserdeptId");
						String[] idName = hasSetNameStr[i].split(",");
						if(idName[0].equals(curruserdeptId)){%>
							
							<option value="<%=idName[0]%>"><%=idName[1]%>(主属)</option>
				<% 		}else{
			%>
			<option value="<%=idName[0]%>"><%=idName[1]%></option>
			<%
				}
				}
				}
			%>
		</select></td>
	</tr>

</table>
<p align="center">
<input class="fbutton" type="button" name="save" value="提交" onclick="saveDeptUser();" style="width:50px;"/>
&nbsp;
<input class="fbutton" type="button" name="return" value="返回" onclick="closeWindow();" style="width:50px;"/>
&nbsp;
<input class="fbutton" type="button" name="setmaindept" value="设置主属部门" onclick="setMainDept();" style="width:100px;"/>
</p>
</body>
</html>
<script language="JavaScript">
addSelectDblClickMethod();

function saveDeptUser() {
	var form0 = document.forms[0];
	var rightList = form0.rightSelectBox;
	var ids = "";
	var maindeptexist;
	var selectedOp;
	var maindeptid="";
	var userid =document.getElementById("userid").value;
    var orgid =document.getElementById("orgid").value;
	for (i = 0; i < rightList.length; i++) {
		ids += rightList[i].value + ",";
		rightList[i].selected = true;
		selectedOp = rightList[i].text;
		if(selectedOp.indexOf('(') !=-1){
			maindeptid = rightList[i].value;
		}
	}	
	
	if (ids != "" && ids.length > 0) {
		ids = ids.substring(0, ids.length - 1);
	}
	  
    var url="<%=rootPath%>/fmp/SUser/SaveDeptUser?ids="+ids+"&userid="+userid+"&orgid="+orgid+"&maindeptid="+maindeptid;
    for (i = 0; i < rightList.length; i++) {
    	if(rightList[i].text.indexOf('(') !=-1){
    		maindeptexist=true;
       		break;	
		}else{
			maindeptexist=false;
		}
	}
	if(maindeptexist){
		comAjax(url,backCallSaveRoleUser);
	}else{
		showMessage("MSG0083");//请设置主属部门！
	}
}
function backCallSaveRoleUser(backMsg)
{
	showMessage("MSG0003");//提交成功！
}
	   
	//-->
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 