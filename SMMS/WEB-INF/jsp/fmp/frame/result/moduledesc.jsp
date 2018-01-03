<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.Map"%>

<html>
<%
	
    Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");
	String moduleDesc ="未定义模块说明！";
	if (detailDataMap != null){
		moduleDesc = (String)detailDataMap.get("MODULEDESC");
		if (moduleDesc == null){
			moduleDesc = "未定义模块说明！";
		}
		moduleDesc=moduleDesc.replaceAll("[\\n\\r\\t]", "<br>");
	}
%>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" /> 
<head><title>模块信息描述</title></head>
<style type="text/css">
.moduleDescDiv 
            {
                font: 145% normal;
                color: #ffe3a8;
                left: 4px;
                margin:0; 
                padding-bottom: .2em;
            }
</style>



<body>
	<div align="center">
		<table border="0" cellSpacing = "0" width="510">
		 <tr >
		 	<td class="fenleileft" >
		 	
			</td>
			
		 	<td class="fenleicenter" > 
				<br>	
		 	<a><font style="padding:53px 10px 10px 12px; color:#293038;font-weight: bold">模块说明：</font></a>
		  	</td>
		  	
		 	<td class="fenleiright">
		 	</td>  
		 </tr>
		 
		 <tr>
		  <td height="100" colSpan="3">
		  <table class="d_table_module"  width="100%" height="100%" vertical-align="middle">
		  <tr>
		  <td valign="top">
		  <br><br>
		   <div id="div_msg" height="400" style="padding:0px 0px 0px 12px; "></div>
		   </td>
		   </tr>
		   </table>
		</td>
		</tr>
		</table>
	</div>
</body>

<script language="javascript"> 
	document.getElementById("div_msg").innerHTML = HTMLDecode("<%=moduleDesc%>");

	

</script> 

</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 