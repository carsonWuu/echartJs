<!-----------------------------------
* @文件描述：系统头文件包含页面
------------------------------------>

<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<%
	String rootPath=request.getContextPath();
%>

<link rel="stylesheet" type="text/css"	href="<%=rootPath%>/styles/fmp/frameStyle.css" />
<link href="<%=rootPath%>/styles/fmp/tabs_style.css" rel="stylesheet" type="text/css" />

<script type="text/javascript">
	var rootPath = "<%=rootPath%>";
	var CRD_MAINORGID = "<%=FMPContex.MAINORGID%>";
	var CURR_DATE="${sessionScope.CURR_DATE}";
	var CURR_USERID="${sessionScope.CURR_USERID}";
	var CURR_USERNAME="${sessionScope.CURR_USERNAME}";
	var CURR_ORGID="${sessionScope.CURR_ORGID}";
	var CURR_ORGNAME="${sessionScope.CURR_ORGNAME}";
	var CURR_DEPTID="${sessionScope.CURR_DEPTID}";
	var CURR_DEPTNAME="${sessionScope.CURR_DEPTNAME}";
	var CURR_ROLEID="${sessionScope.CURR_ROLEID}";
	var CURR_ROLENAME="${sessionScope.CURR_ROLENAME}";
	var CURR_POSTID="${sessionScope.CURR_POSTID}";
	var CURR_POSTNAME="${sessionScope.CURR_POSTNAME}";	
	var RANDOMID = "${sessionScope.RANDOMID}";
	var TEMP_FILE_URL="<%=FMPContex.getSystemProperty("TEMP_FILE_URL")%>";
	var DBTYPE = "<%=FMPContex.DBType%>";
	var freezeParams = "${freezeParams}";
	var freezeParamMaps = '${freezeParamMap}';
	var freezeParamMap;
	var divWinPath = '${divWinPath}';
	var currDivId = '${currDivId}';
	var parentDivId = '${parentDivId}';
	try{
		freezeParamMap = eval('('+freezeParamMaps+')');
	}catch(e){
		//这里无需抛出异常，不影响！
	}

	
</script>

<script src="<%=rootPath%>/scripts/fmp/forbid.js" type="text/javascript" language="javascript"></script>

<script src="<%=rootPath%>/scripts/fmp/jquery-1.11.3.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/ajaxSubmit.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/Calendar.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/fmpcommon.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/workFlow.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/datafield.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/dataList.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/tabs_style.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/smms/smmscommon.js" type="text/javascript" language="javascript"></script>	  
 