<!-----------------------------------
* @功能说明：岗位权限用到岗位列表SRoleRightList.jsp
------------------------------------>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String rootPath = request.getContextPath();
	WebComponent wff = FMPContex.webFieldFactory;
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<input type="hidden" id="keyLimit" name="keyLimit" value=""/>
<script type="text/javascript"> 
	var isOrgUser = "${isOrgUser}";//判断是否机构用户
</script>
<script src="<%=rootPath %>/scripts/BizModuleScript/BuildRight.js" type="text/javascript" language="javascript"></script>


<title>生成权限</title>
</head>
<body>
<form id="BulRight">
<table id="bulidrighttbl" name="bulidrighttbl" border="0" cellspacing="0" width="100%">
				<tr><td width="50%"></td><td width="50%"></td></tr>
				<tr>
					<td ><%=wff.getWebFieldCode("BuildRight", "BUILDRANGE", "add",request)%></td>
				</tr>
				<tr>
					<td ><%=wff.getWebFieldCode("BuildRight", "BUILDOBJ", "add",request)%></td>
				</tr>

				<tr id="tr_buttonArea" style="margin: 15px">
					<td align="center" colspan="1">
					<br>
					<br>
					<input type="button" id="bulidrightbut" value="生成" class="h5button green small" onclick="bulidright()" /> 
					<input type="reset" id="reset" value="重置" class="h5button green small" /></td>
				</tr>
			</table>
</form>
</body>

<SCRIPT language="javascript">
	function bulidright(){
		var buildRange = document.getElementById("detailId_BUILDRANGE").value;
		var buildObj = document.getElementById("detailId_BUILDOBJ").value;
		var form=document.getElementById("BulRight");
	    form.action="<%=rootPath%>/fmp/SModuleBiz/BuildMenuXML";
		if(buildRange == null || buildRange == ""){
			showMessage("MSG0075");//因生成范围和生成对象为空，故不能生成权限，请您重新确认！
			return;
		}else if( buildRange =="6"){
			if(confirm("由于生成的用户过多可能需要等待稍长时间，是否确认继续？")){
				showProgressDiv();
			    form.submit();
			    return;
			}
	
		}else if((buildObj == null || buildObj == "") && buildRange !="6"){
			showMessage("MSG0076");//因生成对象为空，故不能生成权限，请您重新确认！
			return;
		}
		showProgressDiv();
	    form.submit();
	}
</SCRIPT>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 