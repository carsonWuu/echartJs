<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String rootPath = request.getContextPath();
%>
<html>
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<link rel="stylesheet" type="text/css"	href="<%=rootPath %>/styles/fmp/frameStyle.css" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改密码</title>
<script language="javascript" type="text/javascript">
function savePassword(){
	var OLDPWD = document.getElementById("OLDPWD").value;
	var NEWPWD= document.getElementById("NEWPWD").value;
	var ReNEWPWD = document.getElementById("ReNEWPWD").value;
	if (OLDPWD=="" || NEWPWD=="" || ReNEWPWD=="") {showMessage("MSG0084"); return false;}  //请先将三个输入框填写完整！
	if (NEWPWD != ReNEWPWD) {showMessage("MSG0085"); return false;} //两次输入的新密码不一致！
	
	var url="<%=rootPath%>/fmp/SUser/SavePassword?pwdMode=save&USERID=${CURR_USERID}";
    url += "&OLDPWD="+OLDPWD;
    url += "&NEWPWD="+NEWPWD;
	comAjax(url,backCallSavePassword);
}
function backCallSavePassword(backMsg)
{
	if(backMsg =='success'){
		showMessage("MSG0086");//密码修改成功！
		}else{
		showMessage("MSG0087");//密码修改失败，请联系管理员！
			}
}
</script>
</head>
<body>
<br><br>
<table width="80%" border="0">
  <tr>
    <td align="left" width="40%"></td>
    <td align="left" width="10%">原密码</td>
    <td><input name="OLDPWD" type="password" maxlength="20" id="OLDPWD" style="width:150px;" />
    </td>
  </tr>
  <tr>
    <td align="left" width="40%"></td>
    <td align="left" width="10%">新密码</td>
    <td><input name="NEWPWD" type="password" maxlength="20" id="NEWPWD" style="width:150px;" />
    </td>
  </tr>
  <tr>
    <td align="left" width="40%"></td>
    <td align="left" width="10%">确认新密码</td>
    <td><input name="ReNEWPWD" type="password" maxlength="20" id="ReNEWPWD" style="width:150px;" />
    </td>
  </tr>
  <tr>
    <td colspan="3" align="center"><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="h5button green small" type="button" name="save" value="提交" onclick="savePassword();"  />
      &nbsp;
      <input class="h5button green small" type="button" name="return" value="返回" onclick="history.go(-1);"  /></td>
  </tr>
</table>
</body>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 