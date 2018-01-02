<!-----------------------------------
* @文件描述：通用详细信息查看页面
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

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
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
	//Map<String,SubTableModelLink> subTableModels = (Map<String,SubTableModelLink>) request.getAttribute("subTableModels");
%>
 
<body onresize="onResize();">
<script >
	var moduleId="${moduleId}";
</script>
<div id="con">
 
 
<%
 Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");
 WebComponent wff = FMPContex.webFieldFactory; 
    int maxColumn=2;
	String tdFormat = "<tr>";
	for (int i = 0; i < maxColumn; i++) {  //排版所需
		tdFormat = tdFormat + "<td width=\""+100/maxColumn+"%\"></td>";
	}
	tdFormat = tdFormat + "</tr>";	
 %>
 <script >
 function reSetFrameHeight(frameId){
	 var iframe = document.getElementById(frameId);
	 if(iframe){
		 var bHeight = iframe.contentWindow.document.body.scrollHeight;
		 var dHeight = 0;//iframe.contentWindow.document.documentElement.scrollHeight;
		 var height = Math.max(bHeight, dHeight);
		 iframe.height = height; 
	 }
 }
 
 </script>
 
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/DataDetail.jsp" />

</div>
 
<script >
if(typeof doOnload != "undefined"){
	doOnload();
}

function onResize(){
	for (var i = 0;i<50;i++){
		var tagObj = document.getElementById("tagContent"+i);
		if (tagObj){
			tagObj.style.height = document.body.offsetHeight - 110;
			var ifrObj = document.getElementById("infoFrame_"+i);
			if (ifrObj){
				ifrObj.style.width = document.body.offsetWidth - 60;
			}
		}else{
			return;
		}
	}
}

 
</script>

</body>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 