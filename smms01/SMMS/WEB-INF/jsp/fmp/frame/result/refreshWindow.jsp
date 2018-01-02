<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>

<html>
<head><title>提示消息</title>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" /> 
</head>

<body>
	<div align="center">
		<table border="0" cellSpacing = "0" width="510">
		 <tr >
		 	<td class="fenleileft" >
		 	
			</td>
			
		 	<td class="fenleicenter" > 
				<br>	
		 	<a><font style="padding:50px 10px 10px 12px; color:white;">提示：</font></a>
		  	</td>
		  	
		 	<td class="fenleiright">
		 	</td>  
		 </tr>
		 
		 <tr>
		  <td height="100" colSpan="3">
		  <table class="d_table"  width="100%" height="200">
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
		  <td  height="32" colSpan="3" align="center">
		  <div id="div_Refresh">
		  <input type="button" id="Refresh" class="h5button green medium" value="刷新" onclick="reloadWindow()"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		  </div>
		  </td>
		  
		 </tr>
		</table>
	</div>

    
</body>

<script language="javascript"> 
	if(window.opener!=null && typeof(window.opener) != "undefined"){//存在父窗口
		try{
			doRefreshList();
			setFieldDisplay("ReturnBack",false);
		}catch (e) {
			setFieldDisplay("ReturnClose",false);
		}
		
	}else{//不存在父窗口
		if (typeof(window.dialogArguments) !=  "undefined"){ //模态窗口
			setFieldDisplay("ReturnBack",false);
		}else{
			setFieldDisplay("ReturnClose",false);
		}
	}

	document.getElementById("div_msg").innerHTML = HTMLDecode("${msg}");

	

</script> 

</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 