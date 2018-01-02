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
<script src="<%=rootPath %>/scripts/BizModuleScript/SUser_List.js" type="text/javascript" language="javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>设置产品费用项目页面</title>
</head>
<body onload="filterSelectBox(document.getElementById('rightFilterText'),'rightSelectBox');filterSelectBox(document.getElementById('leftFilterText'),'leftSelectBox')">
<form name="form1" action="" method="POST">
<table  width="100%">
	<tr>
		<td>
		<CENTER>未选费用项目</CENTER>
		</td>
		<td></td>
		<td>
		<CENTER>已选费用项目</CENTER>
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
		<select style="width: 100%;" multiple name="rightSelectBox" id="rightSelectBox" size="15">
			<%	if (hasSetNameStr != null) {
				for (int i = 0; i < hasSetNameStr.length; i++) {
					String[] idName = hasSetNameStr[i].split(",");
			%>
			<option value="<%=idName[0]%>"><%=idName[1]%></option>
			<%
				}
				}
			%>
		</select>
		<input name="PRODUCTCODE" id="PRODUCTCODE" type="hidden" value='<s:property value="#request.Productcode"/>'></input>
		</td>
	</tr>

</table>
<p align="center">
<input class="fbutton" type="button" name="save" value="提交" onclick="saveProductFeeitems();" style="width:50px;"/>
&nbsp;
<input class="fbutton" type="button" name="return" value="返回" onclick="closeWindow();" style="width:50px;"/>
</p>
</body>
</html>
<script language="JavaScript">
addSelectDblClickMethod();

function saveProductFeeitems() {
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

    var PRODUCTCODE =document.getElementById("PRODUCTCODE").value;
    var url="<%=rootPath%>/credit/crdbase/product/CrdProductInfoBiz/SaveProductFeeitems?PRODUCTCODE="+PRODUCTCODE+"&ids="+ids;
	comAjax(url,backCallSaveProductFeeitems);
}
function backCallSaveProductFeeitems(backMsg)
{
	if(backMsg =="success"){
		showMessage("MSG0005");//保存成功！
		}else{
			showMessage("MSG0006");//保存失败！
			}
}
	//-->
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 