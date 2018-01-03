<!-----------------------------------
* @文件描述：通用打印详细信息查看页面
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Collection"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.SubTableModelLink"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.opensymphony.xwork2.ActionContext"%>
<%
	String rootPath=request.getContextPath();
	String moduleId=(String)request.getAttribute("moduleId");
	TableModel currTblMdl = (TableModel) request.getAttribute("tableModel");
	String moduleDesc = currTblMdl.getDesc();

%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<input type="hidden" id="keyLimit" name="keyLimit" value="${keyLimit}"/>
<title>查看数据-<%=moduleDesc%></title>
</head>

<%
	String tableModelId = currTblMdl.getId();
	Map<String,SubTableModelLink> subTableModels = (Map<String,SubTableModelLink>) request.getAttribute("subTableModels");
	String isSubTbl = (String) request.getAttribute("isSubTbl");
%>
 
<body >
<script >
	var moduleId="${moduleId}";
</script>
<div id="con">
<%
    Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");

 %>

			 <span>						
					<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/PrintViewTable.jsp" /> 	
			 </span>
		
<%
	if (detailDataMap != null && subTableModels != null){
		int idx = 1;
		for (Iterator it = subTableModels.values().iterator(); it.hasNext(); idx++) {
			SubTableModelLink subTbl = (SubTableModelLink) it.next();
			if (subTbl.getShowInPrintView()){
				String uid = FMPContex.getNewUUID();
%>
				<script src="<%=rootPath%>/scripts/BizModuleScript/<%=subTbl.getSubTableModelId() %>.js" type="text/javascript" language="javascript"></script>
			    <script src="<%=rootPath%>/scripts/BizModuleScript/<%=subTbl.getSubTableModelId() %>_View.js" type="text/javascript" language="javascript"></script>		
					<span>	
							<div id="printViewArea<%=uid %>"></div>
							<script >
								var url = "<%=rootPath%><%=subTbl.getSubTableModelListUrl(detailDataMap)%>&isPrintView=true&isSubTbl=true&opMode=${opMode}";
								loadDataListXML("printViewArea<%=uid %>",url);
							</script>
					</span>
					
<%
			}
		}	
	}
%>			


</div>
</body>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 