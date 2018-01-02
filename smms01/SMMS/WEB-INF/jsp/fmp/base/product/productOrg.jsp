<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String rootPath = request.getContextPath();
	String hasSetIdsAndNames = (String) request.getAttribute("hasSetIdsAndNames");
	String unsetIdsAndNames = (String) request.getAttribute("unsetIdsAndNames");
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
<script src="<%=rootPath %>/scripts/BizModuleScript/productOrg.js" type="text/javascript" language="javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>设置产品机构页面</title>
</head>
<body onload="filterSelectBox(document.getElementById('rightFilterText'),'rightSelectBox');filterSelectBox(document.getElementById('leftFilterText'),'leftSelectBox')">
<form name="form1" action="" method="POST">
<table  width="100%">
	<tr>
		<td>
		<CENTER>未选机构</CENTER>
		</td>
		<td></td>
		<td>
		<CENTER>已选机构</CENTER>
		</td>
	</tr>
	<tr>
		<td width="40%">
		<input style="width: 97.5%;" type="text" value="" id="leftFilterText" onkeyup="filterSelectBox(this,'leftSelectBox')"/>
		<select style="width: 100%;" multiple name="leftSelectBox" size="15"  id="leftSelectBox" >
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
		</select></td>
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
		<input style="width: 97.5%;" type="text" value="" id="rightFilterText" onkeyup="filterSelectBox(this,'rightSelectBox')"/>
		<select style="width: 100%;" multiple name="rightSelectBox" id="rightSelectBox" size="13" onclick="getAreaSelect();">
			<%
			if (hasSetNameStr != null) {
				for (int i = 0; i < hasSetNameStr.length; i++) {
					String[] idName = hasSetNameStr[i].split(",");
			%>
			<option value="<%=idName[0]%>"><%=idName[1]%></option>
			<%
				}
				}
			%>
		</select>
		<select style="width: 100%;" name="" id="areaSelectBox"></select>
	
		<input name="PRODUCTCODE" id="PRODUCTCODE" type="hidden" value='<s:property value="#request.Productcode"/>'></input>
		</td>
	</tr>

</table>
<p align="center">
<input class="fbutton" type="button" name="save" value="提交" onclick="saveProductOrg();" style="width:50px;"/>
&nbsp;
<input class="fbutton" type="button" name="return" value="返回" onclick="closeWindow();" style="width:50px;"/>
&nbsp;
<input class="fbutton" type="button" name="" value="机构产品节点设置" onclick="setOrgProductNode();" style="width:120px;"/>
</p>
</body>
</html>
<script language="JavaScript">
	var selectedIndex ='';
	var selectedNode = document.getElementById('rightSelectBox');
	var areas = document.getElementById('areaSelectBox');
	var isSubmit =false;

	addSelectDblClickMethod();

function saveProductOrg() {
	var form0 = document.forms[0];
	var rightList = form0.rightSelectBox;
	var ids = "";
	for (i = 0; i < rightList.length; i++) {
		ids += rightList[i].value + ",";
		rightList[i].selected = true;
	}
	if (ids != "" && ids.length > 0) {
		ids = ids.substring(0, ids.length - 1);
	}
	//alert(ids);
	//form0.action = "<%=rootPath%>/credit/crdbase/product/CrdProductInfoBiz/SaveProductOrgs?ids="+ids;  
    //form0.submit();
    var PRODUCTCODE =document.getElementById("PRODUCTCODE").value;
    var url="<%=rootPath%>/credit/crdbase/product/CrdProductInfoBiz/SaveProductOrgs?productCode="+PRODUCTCODE+"&ids="+ids;
	comAjax(url,backCallSaveProductOrgs);
}
function backCallSaveProductOrgs(backMsg)
{
	if(backMsg =="success"){
		showMessage("MSG0005");//保存成功！
		isSubmit =false;
	}else{
		showMessage("MSG0006");//保存失败！
	}
}

</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 