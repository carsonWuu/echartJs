<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String rootPath = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html>
<head>
<script src="<%=rootPath%>/scripts/fmp/forbid.js" type="text/javascript" language="javascript"></script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="<%=rootPath%>/styles/fmp/frameStyle.css" rel="stylesheet" type="text/css" />
<title>验证解屏</title>
<script type="text/javascript">
	
</script>
</head>
<body class="body_lock_screen" onload="focusPassWord()">
<br/><br/>
<TABLE style="margin-left: 110px;">

	<TR>
		<TD align="right">用户名：</TD>
		<TD align="left"><input class="login_div_input" type="text" id="loginCode" value="" readOnly="true"/></TD>
	</TR>
	<TR>
		<TD align="right">&nbsp;密&nbsp;&nbsp;码 ：</TD>
		<TD align="left"><input class="login_div_input" type="text" id="loginPassword" autocomplete="off" onfocus="this.type='password'" onkeydown="if(event.keyCode == 13) validLock();"/></TD>
	</TR>
	<TR>
		<TD colspan="2" >
		<br/><br/>
		<img  src="<%=rootPath%>/images/zscrd/lockScreen/suoping_ico1.gif" id="validLockimg"  onclick="validLock()" onmouseover="setCursorStyle(this)"></img>
		
		<img  src="<%=rootPath%>/images/zscrd/lockScreen/suoping_ico2.gif" id="resetimg"  onclick="reset()" onmouseover="setCursorStyle(this)" ></img>
		
		<img  src="<%=rootPath%>/images/zscrd/lockScreen/suoping_ico3.gif" id="closeLockimg"  onclick="closeLock()" onmouseover="setCursorStyle(this)"></img>
		</TD>
	</TR>
</TABLE>
</body>
<script type="text/javascript" language="javascript">
var topWindow = getMainWindow();
var dataObject = topWindow.dataObject;
	function focusPassWord(){
		document.getElementById('loginPassword').focus();
	}

	
	function reset(){
		document.getElementById('loginPassword').value = "";
		document.getElementById('loginPassword').focus();
	}
	
	dataObject.validvalue = false;
	document.getElementById('loginCode').value = "${loginCode}";

	
	function closeLock(){
		//if(window.confirm("关闭此窗口将一起关闭主页面，您是否确认关闭")){
			dataObject.validvalue = "closeLock";
			if (typeof dataObject.backCall != "undefined"){
				dataObject.backCall();
			}	 			
			//closeWindow();
	    //}else{
	   // 	document.getElementById('loginPassword').focus();
		//}
	}
	function validLock(){
		var loginCode = document.getElementById('loginCode').value;
		var loginPassword = document.getElementById('loginPassword').value;
		if(loginPassword == ""){
			showMessage("验证解屏密码不能为空，请您重新确认！"); 
			document.getElementById('loginPassword').focus();
			return;
		}
		var tag = "lockWindow";
		var url = rootPath+"/fmp/base/ValidLock?loginCode="+loginCode+"&loginPassword="+loginPassword+"&tag="+tag;
		XMLHttp.urlSubmit(url,backCallMsg);
		function backCallMsg(msg){
			if(msg == "success"){
				dataObject.validvalue = true;
				if (typeof dataObject.backCall != "undefined"){
					dataObject.backCall();
				}	 				
				closeWindow();
			}else{
				dataObject.validvalue = false;
				showMessage(msg);
				document.getElementById('loginPassword').value = "";
				document.getElementById('loginPassword').focus();
			}
		}
	}


	function setCursorStyle(Obj){
		if(Obj){
			Obj.style.cursor="hand";		//光标样式为：小手
		}
	}
</script>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 