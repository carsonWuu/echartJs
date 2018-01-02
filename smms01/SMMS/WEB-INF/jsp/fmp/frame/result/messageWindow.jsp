<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>

<html>
<head><title>提示消息</title>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" /> 
</head>

<body>
	<div align="center" style="height:100%;vertical-align:middle;  ">
	<br>
		<table border="0" cellSpacing = "0" width="510">
		 <tr>
		 	<td class="messageTitle" >
		 	提示
		  	</td>
		 </tr>
		 
		 <tr>
		  <td height="100" >
		  <table class="d_table"  width="100%" height="100%">
		  <tr>
		  <td valign="top">
		  <br><br>
		   <div id="div_msg" style="padding:0px 0px 0px 12px;"></div>
		   </td>
		   </tr>
		   </table>
		</td>
		</tr>
		 <tr>
		  <td  height="32" align="center">
		  <div id="div_ReturnBack">
		  <input type="button" id="ReturnBack" class="h5button green medium" value="返回" onclick="javascript:history.go(-1)"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  </div>
		  <div id="div_ReturnClose">
		  <input type="button" id="ReturnClose" class="h5button orange medium" value="关闭" onclick="closeWindowAndRefresh();"></input> 
		  </div>
		  </td>
		  
		 </tr>
		</table>
	</div>

    
</body>

<script language="javascript"> 
    if (typeof(window.dialogArguments) !=  "undefined" || "${winType}" == "divWin" ){ //模态窗口
    	setFieldDisplay("ReturnBack",false);
    }else {
    	setFieldDisplay("ReturnClose",false);
    }
 
	document.getElementById("div_msg").innerHTML = HTMLDecode("${msg}")+"<br>";

	function closeWindowAndRefresh(){
		closeWindow();
		doRefreshList();
	}

</script> 

</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 