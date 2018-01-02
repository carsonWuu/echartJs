<!-----------------------------------
* @功能说明：岗位权限的Frameset页面RoleRightTreeFrameset.jsp
------------------------------------>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
	String rootPath = request.getContextPath();
%>
<html>
<head><title>岗位权限</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css"	href="<%=rootPath%>/styles/fmp/frameStyle.css" />
<link href="<%=rootPath%>/styles/fmp/tabs_style.css" rel="stylesheet" type="text/css" />
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
</head>

<body style="margin:0px;" onresize="resizeOrg();" onload="resizeOrg();">
 <div id="role_content" >
<iframe id="left" name="left" allowTransparency="true" width="25%"   frameborder="0" src="<%=rootPath%>/fmp/SRoleRightBiz/ViewRoleList">
</iframe>
<iframe id="right" name="right" allowTransparency="true" width="30%"  frameborder="0"  src="<%=rootPath%>/fmp/SRoleRightBiz/RoleRightGetModuleXML" framespacing="1">
</iframe>
<iframe id="modledatarange" name="modledatarange" allowTransparency="true" width="44%"  frameborder="0"  scrolling="no"  src="" marginWidth="10px" framespacing="1" >
</iframe>
 </div>
</body>
<script language="JavaScript">
function resizeOrg() {
	var height=parent.document.body.offsetHeight;
	var width=parent.document.body.clientWidth;
	if (width<960)
	{
	document.getElementById('role_content').style.width = 960+"px";
	}
else{
	document.getElementById('role_content').style.width = "100%"; 
}
	document.getElementById('left').style.height=height-130+"px";
	document.getElementById('right').style.height=height-130+"px";
	document.getElementById('modledatarange').style.height=height-130+"px";
	
}
</script>
</html>
