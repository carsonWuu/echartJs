<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String rootPath = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html lang="zh-CN">
<head>
<script src="<%=rootPath%>/scripts/fmp/forbid.js" type="text/javascript" language="javascript"></script>
<script type="text/javascript" >
	function onClickReset(){
		//调用表单reset()方法
		document.getElementById("signOn").reset();
	}
	function setCursorStyle(Obj){
		//设置光标为小手
		if(Obj){
			Obj.style.cursor="hand";	
		}
	}
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="<%=rootPath%>/styles/fmp/frameStyle.css" rel="stylesheet" type="text/css" />
<style>
body { 
	background-image: url(<%=rootPath%>/images/zscrd/login/beijing.jpg); 
	background-color:#FFF; 
	background-repeat:no-repeat; 
	background-position:top center;
}

</style>
<title>登录界面</title>
</head>


<body>
<div id="login">
<ul>
<li class="login_1">denglu_2.jpg</li>
<li class="login_2">
	<form id="signOn" action="<%=rootPath%>/fmp/base/Login" method="POST">
		<div style="margin:80px 0px 80px 80px;">
			<TABLE align="center" width="300px">
				<TR>
					<TD align="right">用户名： <input type="text" name="loginCode" class="login_div_input"/></TD>
				</TR>
				<TR>
				
					<TD align="right">密&nbsp;&nbsp;&nbsp;码： <input type="text" name="loginPassword" class="login_div_input" autocomplete="off" onfocus="this.type='password'"/></TD>
				</TR>
				<!-- 
				<tr>
					<td align="right" >验证码： 
		                <input type="text" id="validCode" name="validCode" maxlength="4" class="login_div_input_validCode">
		               <img src ="<%=rootPath%>/fmp/base/Login/ValidCodeImage" id="codeimage" onclick="this.src='<%=rootPath%>/fmp/base/Login/ValidCodeImage?random='+Math.random()" alt="图片看不清，点击重新获取" style="cursor:hand;">
	                </td>
	            </tr>
	             -->
				<TR>
					<TD style="padding-left: 45px;">
					<br/><br/>
		
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="image" src="<%=rootPath%>/images/zscrd/login/login_ico.gif"   />
	 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
			
					<img  id="resetImage" src="<%=rootPath%>/images/zscrd/login/login_ico1.gif"  onclick="onClickReset()" onmouseover="setCursorStyle(this)"></img>
					</TD>
				</TR>
			</TABLE>
		</div>
	</form>
	</li>

<li class="login_3">denglu_3.jpg</li>
</ul>

<div class="bottom_link"><a href="<%=rootPath%>/fileDownLoad/Chrome_Setup.exe">下载google chrome浏览器</a></div>
</div>

</body>
<script>
if (window.top.parent.openerWindow){
	if (typeof window.top.parent.openerWindow.top.main_HideProgressDiv != "undefined"){
		window.top.parent.openerWindow.top.main_HideProgressDiv();
	}
}else{
	if (typeof window.top.main_HideProgressDiv != "undefined"){
		window.top.main_HideProgressDiv();
	}
}	

if (window.parent.document.getElementById("infoFrame")){
	window.parent.location = "<%=rootPath%>";
}

</script>
</html>

