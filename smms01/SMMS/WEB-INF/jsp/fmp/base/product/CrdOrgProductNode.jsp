<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="java.util.Iterator"%>  
<%@ page import="java.util.Map"%>  
<%@ page import="java.util.Collection"%> 
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="java.util.List"%>   
<%
	String rootPath = request.getContextPath();
	List<?> searchDataList = ( List<?>)request.getAttribute("searchDataList");
	TableModel currTblMdl = (TableModel)request.getAttribute("tableModel");
    String queryString = request.getQueryString();
%>
<html>
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script src="<%=rootPath %>/scripts/BizModuleScript/productOrgNode.js" type="text/javascript" language="javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" >
    var tableModelId="${tableModelId}";
    var freezeCondition = "${freezeCondition}";
    var moduleId="${moduleId}";
    var isUpdateListMode = "${isUpdateListMode}";
    var queryString = "<%=queryString%>";
 </script>
<title>机构产品节点设置页面</title>
</head>
<body>
<input name="PRODUCTCODE" id="PRODUCTCODE" type="hidden" value='<s:property value="#request.Productcode"/>'></input>
<form id="dataListForm">
<h3><center>已选的项目节点</center></h3>
<!--<a href="<%=rootPath%>/fmp/FrameBiz/SearchDataList?opMode=update&<%=queryString %>">测试</a>  -->
 <jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/DataList.jsp" />
 </form>
<p align="center">
<input class="fbutton" type="button"  value="设置必备条件" onclick="setNodeCond()" style="width:100px;"/>
&nbsp;
<input class="fbutton" type="button"  value="设置必填选项" onclick="setNodeMust()" style="width:100px;"/>
&nbsp;
<input class="fbutton" type="button"  value="保存列表" onclick="saveDataList()" style="width:100px;"/>
</p>


</body>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 
