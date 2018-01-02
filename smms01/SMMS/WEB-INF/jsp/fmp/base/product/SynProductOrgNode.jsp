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
<link rel="stylesheet" type="text/css"	href="<%=rootPath %>/styles/fmp/frameStyle.css" />
<link rel="stylesheet" type="text/css"	href="<%=rootPath %>/styles/fmp/hidden_divWin_style.css" />
<script src="<%=rootPath %>/scripts/BizModuleScript/productOrgNode.js" type="text/javascript" language="javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>机构产品节点设置页面</title>
</head>
<body onload="">
<form name="form1" action="" method="POST">
<table  width="100%">
	<tr>
		<td>
		<CENTER>未选项目节点</CENTER>
		</td>
		<td></td>
		<td>
		<CENTER>已选项目节点</CENTER>
		</td>
	</tr>
	<tr>
		<td width="30%">
		<input style="width: 97%;" type="text" value="" id="leftFilterText" onkeyup="filterSelectBox(this,'leftSelectBox')"/>
		<select style="width: 100%;" multiple name="leftSelectBox" size="15"  id="leftSelectBox" >
			<%
			   if (unsetNameStr != null) {
				for (int i = 0; i < unsetNameStr.length; i++) {
					String[] unidName = unsetNameStr[i].split(",");
			%>
			<option value="<%=unidName[0]%>" ><%=unidName[1]%></option>
			<%
				}
				}
			%>
		</select></td>
		<td width="10%" align="center">
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
		<input class="button_moveoption" type="button" value=" ↑ " onClick="moveUpOption(document.getElementById('rightSelectBox'))" style="width:50px;"/>
		<br>
		<br>
		<input class="button_moveoption" type="button" value=" ↓ " onClick="moveDownOption(document.getElementById('rightSelectBox'))" style="width:50px;"/>
		<br>
		<br>
		</td>
		<td width="60%">
		<!-- <input type="text" value="" id="rightFilterText" onkeyup="filterSelectBox(this,'rightSelectBox')"/> -->
		<br>
		<select style="width: 100%;" multiple name="rightSelectBox" id="rightSelectBox" size="15" >
			<%
			if (hasSetNameStr != null) {
				for (int i = 0; i < hasSetNameStr.length; i++) {
					String[] idName = hasSetNameStr[i].split(",");
					if(idName.length>2){
						String tempIdName ="";
						for(int n = 1;n<idName.length;n++){	
							tempIdName+=idName[n]+",";
						}
						idName[1]=tempIdName.substring(0,tempIdName.length()-1);
					}
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

<input class="fbutton" type="button" name="save" value="提交" onclick="saveOrgProductNode();" style="width:50px;"/>
&nbsp;
<input class="fbutton" type="button" name="return" value="返回" onclick="closeWindow();" style="width:50px;"/>
&nbsp;
<input class="fbutton" type="button"   value="设置下一节点" onclick="setNextNode()" style="width:100px;"/>
</p>


<DIV id=bg></DIV>
<DIV class=hidden id=selectItem>
	<DIV class="tit bgc_ccc move">
	<H2 class=left>请选择下一节点</H2>
	<SPAN class="pointer right" onclick="openBg(0);openSelect(0);">[取消]</SPAN> 
	<SPAN class="pointer right" onclick="makeSure();">[确定]</SPAN>
	</DIV>
<DIV class=cls></DIV>
<DIV class=cont>
<DIV id=selectSub></DIV>
</DIV>
</DIV>

</body>
</html>
<script language="JavaScript">
	var selectedIndex ='';
	var selectedNode = document.getElementById('rightSelectBox');
	var selectedOrg = '${selectedOrg}';
	var selectedArea = '${selectedArea}';

	addSelectDblClickMethod();
	
	//filterSelectBox(document.getElementById('rightFilterText'),'rightSelectBox');
	filterSelectBox(document.getElementById('leftFilterText'),'leftSelectBox')
	//-->
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 