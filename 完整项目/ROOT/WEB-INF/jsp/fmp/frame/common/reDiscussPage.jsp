<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%
	String rootPath = request.getContextPath();
	WebComponent wff = FMPContex.webFieldFactory;
	
	
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<title>审批复议</title>
</head>
<body>


<form id="reDiscussForm">
   <table id="reDiscusstbl"  border="0" cellspacing="0" width="100%">
				<tr>
					<td colspan="2"><%=wff.getWebFieldCode("WfReDiscuss", "REDISCUSSREASON", "update",request)%></td>
					
				</tr>
				
				<tr>
					
					<td colSpan="2"><%=wff.getWebFieldCode("WfReDiscuss", "REDISCUSSREMARK", "update",request)%></td>
				</tr>
				<tr>
				 	<td><%=wff.getWebFieldSampleCode("WfReDiscuss", "RID", "update",request)%></td>
				</tr>
	</table>
</form>
</body>
<SCRIPT language="javascript">

</SCRIPT>
</html>

<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 
