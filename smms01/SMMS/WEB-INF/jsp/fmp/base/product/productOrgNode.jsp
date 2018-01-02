<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String rootPath = request.getContextPath();
	String hasSetIdsAndNames = (String) request.getAttribute("hasSetIdsAndNames");
	String[] hasSetNameStr = null;
	if (hasSetIdsAndNames != null && !((String) hasSetIdsAndNames).trim().equals("")) {
		hasSetNameStr = ((String) hasSetIdsAndNames).split(";");
	}
%>
<html>
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<link rel="stylesheet" type="text/css"	href="<%=rootPath %>/styles/fmp/hidden_divWin_style.css" />
<script src="<%=rootPath %>/scripts/BizModuleScript/productOrgNode.js" type="text/javascript" language="javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>机构产品节点设置页面</title>
</head>
<body>
<form name="form1" action="" method="POST">
<table  width="100%">
	<tr>
		<td>
		<CENTER>已选的项目节点</CENTER>
		</td>
	</tr>
	<tr>
		<td width="60%"><select style="width: 100%;" multiple
			name="right" id="right" size="15" >
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

<input class="fbutton" type="button"  value="设置必备条件" onclick="setNodeCond()" style="width:100px;"/>
&nbsp;
<input class="fbutton" type="button"  value="设置必填选项" onclick="setNodeMust()" style="width:100px;"/>
</p>


</body>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 