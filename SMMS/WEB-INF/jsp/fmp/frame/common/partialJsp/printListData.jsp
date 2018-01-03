<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.util.*"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Collection"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="com.zstar.fmp.utils.Page"%>
<%
	String rootPath = request.getContextPath();
%>
<html>
<head>
<title>打印</title>
<script src="<%=rootPath %>scripts/fmp/fmpcommon.js" type="text/javascript" language="javascript"></script>
<style type="text/css">
#print_iframe{
	border: 0px;
	margin: 0px;
	padding: 0px;
	background-color: gray;
	width: 920px;
	height: 470px;
	overflow: no ;
}
</style>

</head>
<body >
<!-- <input type="hidden" id="pq_maxLine" name="pq_maxLine" value="${pq_maxLine}"/>-->
		<iframe id="print_iframe" name="print_iframe"  
			src="${iframeUrl}?tableModelId=${tableModelId}&moduleId=${moduleId}&pq_currentPage=${pq_currentPage}&pq_maxLine=${pq_maxLine}&queryString=true&searchParamStr=${searchParamStr}"  
			frameborder="no"
			onload="printIframeInfo(this)">
		</iframe>

	<!-- <input type="button" onclick="printIframeInfo()" value="打印"> -->
</body>

<script type="text/javascript" language="javascript">

//ie打印的一些属性
var HKEY_Root,HKEY_Path,HKEY_Key;
HKEY_Root="HKEY_CURRENT_USER";
HKEY_Path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";

//设置网页打印的页眉页脚为空(默认会打印页眉页脚)
function PageSetup_Null(){
      var Wsh=new ActiveXObject("WScript.Shell");
      HKEY_Key="header";
      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"");
      HKEY_Key="footer";
      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"");
      
      HKEY_Key="margin_left"; 
      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0.2"); //键值设定--左边边界

      HKEY_Key="margin_top"; 
      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0.46"); //键值设定--上边边界

      HKEY_Key="margin_right"; 
      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0.2"); //键值设定--右边边界

      HKEY_Key="margin_bottom"; 
      Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0.455"); //键值设定--下边边界
}

//iframe加载完成后调用的打印操作
function printIframeInfo(ifram){
	try{
		PageSetup_Null();		//设置网页打印的页眉页脚为空
		document.all.print_iframe.ExecWB(7,1); // 打印预览(7,1)会打开预览模式
	} catch (e){
		if(confirm("浏览器不支持默认打印方式，可能导致打印样式不正确。是否继续打印?")){
			document.getElementById('print_iframe').contentWindow.focus();
			window.print();
		}
	}
	closeWindow();
}
</script>

</html>
