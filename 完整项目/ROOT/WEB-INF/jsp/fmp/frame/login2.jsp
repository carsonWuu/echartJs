<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String rootPath = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html lang="zh-CN">
<head>
<script src="<%=rootPath%>/scripts/fmp/forbid.js" type="text/javascript" language="javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style>
html, body {
	height: 100%;
	width: 100%;
	background: url(<%=rootPath%>/images/zscrd/kuangjia/Login_bg.png);
	background-size: 100% 100%;
	margin: 0;
}

html, body, input {
	font-family: "Microsoft YaHei", "Microsoft JhengHei", STHeiti,
		MingLiu !important;
}

.Login_container {
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -165px;
	width: 330px;
	height: auto;
	margin-top: -220px;
}

.Login_logo {
	text-align: center;
	width: 330px;
	height: auto;
}

.user, .password {
	height: 38px;
	width: 310px;
	margin-top: 20px;
	background-image: url(<%=rootPath%>/images/zscrd/kuangjia/login_input_bg.png);
}

.input_text {
	width: 290px;
	height: 90%;
	border: none;
	color: #fafafa;
	background-color: transparent !important;
	padding-left: 20px;
}

.input_text:focus {
	outline: none;
}

.Login_btn {
	width: 310px;
	height: 38px;
	margin-top: 20px;
}

.btn_text {
	background-image: url(<%=rootPath%>/images/zscrd/kuangjia/Login_btn_bg.png);
	width: 310px;
	height: 38px;
	padding: 0;
	border: none;
	color: #fefefe;
	background-color: transparent;
	outline: none;
	font-size: 18px;
	cursor: pointer;
}

input:-webkit-autofill {
	margin: 3px 3px 15px 10px;
	height: 32px !important;
	line-height: 32px !important;
	border-radius: 20px 20px 20px 20px;
	transition: background-color 86400s ease-in-out 0s;
	color: #ffffff000;
}

.chrdown {
	height: auto;
	width: 100%;
	text-align: center;
	font-size: 12px;
}

.chrdown a {
	color: #F2F2F2;
}

.chrdown a:hover {
	text-decoration: none;
	color: #F00;
}

</style>
<title>登录界面</title>
</head>


<body>
<div class="Login_container">
	<form id="signOn" action="<%=rootPath%>/fmp/base/Login" method="POST" >
		<div class="Login_logo">
			<img src="<%=rootPath%>/images/zscrd/kuangjia/Login_logo.png" />
		</div>
		<div class="Login_logo">
			<img src="<%=rootPath%>/images/zscrd/kuangjia/Login_title.png" />
		</div>
		<TABLE style="margin-top:10px; margin-left:10px; height:auto">
			<TR>
				<TD>
					<div class="user">
						<input class="input_text" type="text" name="loginCode" placeholder="请输入账号" autocomplete="off" />
					</div>
				</TD>
			</TR>
			<TR>
				<TD>
					<div class="password">
						<input class="input_text" type="password" name="loginPassword" placeholder="请输入密码" autocomplete ="new-password" />
					</div>
				</TD>
			</TR>
			<TR>
				<TD>
					<div class="Login_btn">
						<input class="btn_text" type="submit" name="button" value="登&nbsp;&nbsp;录" />
					</div>
				</TD>
			</TR>
		</TABLE>
	</form>
	<br/>
	<br/>
	<br/>
	<br/>
	<div class="chrdown">
		<a href="<%=rootPath%>/fileDownLoad/Chrome_Setup.exe">下载 Google Chrome 浏览器</a>
	</div>
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

