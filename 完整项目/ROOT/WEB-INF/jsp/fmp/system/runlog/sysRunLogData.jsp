<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.Map"%>
<html>
<%
	String rootPath = request.getContextPath();
    String fileContent = (String)request.getAttribute("fileContent");
%>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" /> 
<head><title>系统运行日志</title></head>
<body>

	<div id="contentDiv" align="center">
		<table border="0" cellSpacing = "0" width="100%">
		 <tr>
		 	<td> 
		 	<font style="font-size:16pt;padding:50px 10px 10px 12px; color:black;">系统运行日志：</font>
		 	<a href="<%=rootPath%>/fmp/system/runLog/SysRunLogBiz/DownLoadLogFile.action">[下载日志文件]</a>
		  	</td>
		 </tr>
		 
		 <tr>
		  <td  colSpan="3">
				<textarea  class="log_textarea" >
				<%=fileContent%>
				</textarea>		   
		  </td>
		</tr>
		</table>
	</div>
</body>
 <script>
   window.scroll(0, 999999);
 </script>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 