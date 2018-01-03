<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> 
<!-----------------------------------
* @功能说明：模块操作树的Frameset页面
------------------------------------>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
	String rootPath = request.getContextPath();
%>
<html>
<head><title>treeFrameset.jsp</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
</head>

<body style="margin:0px" onresize="resizeOrg();" onload="resizeOrg();">
<div class="div_absolutePos" id="butmenu">
  <table width="100%">
    <div class="div_NoNoWrap"> 
     	<input id="modnew" type="button" class="shortbutton" value="新增模块"  onclick="left.add('mod')" />
     	<input id="moddel" type="button" class="shortbutton" value="删除模块"  onclick="left.deleteData()"/>
     	<input id="oppnew" type="button" class="shortbutton" value="新增操作"  onclick="left.add('opp')" />
     	<input id="oppdel" type="button" class="shortbutton" value="删除操作"  onclick="left.deleteData()"/>
   </div>
 </table>
 </div>
  <div id="module_content">
<iframe id="left" name="left" allowTransparency="true" width="35%"   scrolling="auto" frameborder="0" src="<%=rootPath%>/fmp/SModuleBiz/GetModuleOpperationXML">
</iframe>
<iframe id="right" name="right" allowTransparency="true" width="64%"   scrolling="no" frameborder="0" src="" >
</iframe>
</div>
</body>
<script language="JavaScript">
function resizeOrg() {
	var width = document.body.clientWidth;
	var height=parent.document.body.offsetHeight;
 
	document.getElementById('left').style.height=height-130+"px";
	document.getElementById('right').style.height=height-130+"px";
 
	if (width<960)
		{
		document.getElementById('module_content').style.width = 960+"px";
		}
	else{
		document.getElementById('module_content').style.width = width+"px";
	}
}
</script>
</html>