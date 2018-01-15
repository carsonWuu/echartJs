<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.log.FMPLog;"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%
	String rootPath = request.getContextPath();
%>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB2312">

<title>导入EXCEL文件</title>
</head>
<body>
<form action="<%=rootPath %>/fmp/FrameBiz/ToImportExcelNewData" method="post" enctype="multipart/form-data">
   <input type="hidden" name="tableModelId" value="${tableModelId}" id="tableModelId" />
   <input type="file"  name="upload" size="35"/>
   <input type="submit"  value="导入excel文件"/>
</form>

</body>
</html>