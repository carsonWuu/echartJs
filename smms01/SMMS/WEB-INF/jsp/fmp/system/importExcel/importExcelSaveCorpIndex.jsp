<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.log.FMPLog;"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%
	String rootPath = request.getContextPath();
%>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB2312">
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />

<title>导入EXCEL文件</title>
</head>
<body>
<form id="fileForm" action="<%=rootPath %>/credit/resource/cust/cusBase/CrdCusBaseBiz/ImportExcelSaveCorpIndex" method="post" enctype="multipart/form-data">
   <input type="file"  name="upload" size="35"/>
   <input type="hidden"  name="CUSTCODE" id="CUSTCODE" value="${request.CUSTCODE}"/>
   <input type="button" onclick="submitFile()" value="导入excel文件"/>
</form>

</body>
<script type="text/javascript">
	function submitFile(){
		var formObj = document.getElementById("fileForm");
		XMLHttp.formSubmit(formObj, "<%=rootPath %>/credit/resource/cust/cusBase/CrdCusBaseBiz/ImportExcelSaveCorpIndex", backCall);
		function backCall(msg){
			showMessage(msg);
		}
	}
</script>
</html>