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
<script src="<%=rootPath %>/scripts/BizModuleScript/SUser_List.js"
	type="text/javascript" language="javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>设置机构公告页面</title>
</head>
<body>
<form name="form1" action="" method="POST">
<table  width="100%">
	<tr>
		<td>
		<CENTER>可授机构</CENTER>
		</td>
		<td></td>
		<td>
		<CENTER>已授机构</CENTER>
		</td>
	</tr>
	<tr>
	    <td width="40%"><select style="width: 100%;" multiple
			name="right" id="right" size="15">
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
		<input name="afficheid" id="afficheid" type="hidden" value='<s:property value="#request.afficheId"/>'></input>
		</td>
			
		<td width="20%" >
		<center>
		<input  class="button_moveoption" type="button" value=" > " onClick="moveOption(document.getElementById('right'), document.getElementById('left'))" style="width:50px;" />
		<br>
		<br>
		<input  class="button_moveoption" type="button" value=" < " onClick="moveOption(document.getElementById('left'), document.getElementById('right'))"" style="width:50px;" />
		<br>
		<br>
		<input  class="button_moveoption" type="button" value=" >> " onClick="moveAllOption(document.getElementById('right'), document.getElementById('left'))" style="width:50px;" />
		<br>
		<br>
		<input class="button_moveoption" type="button" value=" << " onClick="moveAllOption(document.getElementById('left'), document.getElementById('right'))" style="width:50px;" />
		<br>
		<br>
		</center>
		</td>
		
		<td width="40%"><select style="width: 100%;" multiple name="left"
			size="15"  id="left" >
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
		</select></td>		
		
	</tr>

</table>
<p align="center">
<input class="fbutton" type="button" name="save" value="提交" onclick="saveAfficheOrg();" style="width:50px;"/>
&nbsp;
<input class="fbutton" type="button" name="return" value="返回" onclick="closeWindow();" style="width:50px;"/>
</p>
</body>
</html>
<script language="JavaScript">
function saveAfficheOrg() {
	var form0 = document.forms[0];
	var leftList = form0.left;
	var ids = "";
	for (i = 0; i < leftList.length; i++) {
		ids += leftList[i].value + ",";
		leftList[i].selected = true;
	}
	if (ids != "" && ids.length > 0) {
		ids = ids.substring(0, ids.length - 1);
	}
    var afficheid =document.getElementById("afficheid").value;
    var url="<%=rootPath%>/fmp/system/sysAffiche/affich/SAfficheBiz/SaveOrgSAffiche?ids="+ids+"&afficheid="+afficheid;
	comAjax(url,backCallsaveAfficheOrg);
}
function backCallsaveAfficheOrg(backMsg)
{
	showMessage("MSG0003");//提交成功！
}
	   
	//-->
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 