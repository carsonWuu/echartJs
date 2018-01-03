<!-----------------------------------
* @功能说明：模块操作S_MODULEOPPERATION的新增页面OpperationAdd.jsp
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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<%=rootPath%>/styles/fmp/frameStyle.css" />
<link href="<%=rootPath%>/styles/fmp/tabs_style.css" rel="stylesheet" type="text/css" />
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />

<title>新增数据</title>
<style type="text/css">
        #tagContent DIV.selectTag
        {
            display: block;
            color: #373737;
            position:absolute;
            overflow:auto; 
            height: 600px; 
            width: 97%;           
        }
</style>
</head>
<body>

<div id="con" style="width: 100%; border: 0px solid #000; position: absolute; left: 0; top: 0PX; padding: 0px 0px 0px 0px">
<ul id="tags">
	<li class="selectTag"><a onclick="selectTag('tagContent0',this)" href="javascript:void(0)">新增数据</a></li>
</ul>
<div id="tagContent">
<div class="tagContent selectTag" id="tagContent0">
<form id="DoAdd" name="DoAdd" action="" method="post">
<table class="wwFormTable" width="100%">
<tr><td>
	<table id="tbl_updown" cellspacing="0" width="100%" align="center">
		<tr id="tr_inputArea">
			<td><input type='hidden' name='RID'
				value='<s:property value="#request.RID"/>' id='detailId_RID' /> <input
				type="hidden" name="opMode" value="add" id="opMode" /> <input
				type="hidden" name="tableModelId" value="SModuleOpperation"
				id="tableModelId" value="SModuleOpperation" />
			<table id="view_tblid_SModuleOpperation" name="view_tblname_s_moduleOpperation" class="d_search_table" border="0" cellspacing="0">
			   
			    <tr><td><%=wff.getWebFieldCode("SModuleOpperation", "OPID", "update",request)%></td></tr>
				<tr><td><%=wff.getWebFieldCode("SModuleOpperation", "MODULEID", "update",request)%></td>	</tr>
				
			    <tr><td><%=wff.getWebFieldCode("SModuleOpperation", "ORDERID", "update",request)%></td></tr>
			     <tr><td><%=wff.getWebFieldCode("SModuleOpperation", "OPDESC", "update",request)%></td></tr>
				 <tr><td><%=wff.getWebFieldCode("SModuleOpperation", "OPSCRIPT", "update",request)%></td></tr>

			</table>
			</td>
		</tr>
	</table>
	</td>
	</tr>
	<tr id="tr_buttonArea">
		<td align="center">
		<br>
		<br>
		<input type="button" id="DoAdd_AddSave" value="保存" class="h5button green small" onclick="addData()" /> 
		<input type="reset" value="重置" id="reset" class="h5button green small" /></td>
	</tr>
</table>
</form>
</div>
</div>
</div>
</body>
</html>
<script>

function addData(){
	var id=document.getElementById("detailId_RID").value;
	var name=document.getElementById("detailId_OPDESC").value;
	var formObj=document.getElementById("DoAdd");
	var result=checkAll(formObj);
	if (result==1) {
	   parent.frames["left"].insertTreeItem(id+"__opp",name);
       //formObj.action="<%=rootPath%>/fmp/SModuleOpperationBiz/AddSave.action";
       //formObj.submit();
	   XMLHttp.formSubmit(formObj,"<%=rootPath%>/fmp/SModuleOpperationBiz/AddSave");
	}
}
 
document.getElementById("detailId_MODULEID").value=parent.frames["left"].ModuleTree.getSelectedItemId();
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 