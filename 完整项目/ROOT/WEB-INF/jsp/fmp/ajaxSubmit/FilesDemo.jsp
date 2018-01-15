<!-----------------------------------
* @功能说明：异步提交数据页面
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String rootPath = request.getContextPath();
	String moduleId = "123456";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<!--script language="JavaScript" src="<%=rootPath%>/scripts/jquery142.js"></script-->
<script src="<%=rootPath%>/scripts/uploadify-v2.1.4/jquery-1.4.2.min.js"></script>
<script language="JavaScript" src="<%=rootPath%>/scripts/jquery.form.js"></script>
<script type="text/javascript">
	// wait for the DOM to be loaded   
	$(document).ready(function() {
		// bind 'myForm' and provide a simple callback function   
		$('#myform').ajaxForm(function() {
			var options = {
				url : '<%=rootPath%>/fmp/Sameple/AjaxSample', //提交给哪个执行   
				type : 'POST',
				dataType : 'json',
				success : function(json) {
				alert(json.mymessage);
				}
			};
			$('#myform').ajaxSubmit(options);
			return false;
		});
	});
</script>
</head>
<body>
<form id="myform" name="myform">
<table>
<tr><td>name:</td><td><input name="name"> </td></tr>
<tr><td>qq:</td><td><input name="qq"> </td></tr>
<tr><td>email:</td><td><input name="email"> </td></tr>
<tr><td>phone:</td><td><input name="phone"> </td></tr>
<tr><td>birthday:</td><td><input name="birthday"> </td></tr>
<tr><td colspan="2" align="center"><input type="submit" value="提交"> </td></tr>
</table>
</form>
</body>
</html>