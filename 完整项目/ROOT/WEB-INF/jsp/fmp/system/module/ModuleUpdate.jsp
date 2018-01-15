<!-----------------------------------
* @功能说明：模块S_MODULE的修改页面ModuleUpdate.jsp
------------------------------------>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
	String rootPath = request.getContextPath();
	WebComponent wff = FMPContex.webFieldFactory;
%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css"	href="<%=rootPath%>/styles/fmp/frameStyle.css" />
<link href="<%=rootPath%>/styles/fmp/tabs_style.css" rel="stylesheet" type="text/css" />

<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script src="<%=rootPath%>/scripts/BizModuleScript/SModule.js" type="text/javascript" language="javascript"></script>
<title>修改数据</title>
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

<div id="con" style="width: 100%; border: 0px solid #000; position: absolute;left: 0; top:0PX;padding:0px 0px 0px 0px">
<ul id="tags">
	<li class="selectTag"><a onclick="selectTag('tagContent0',this)"
		href="javascript:void(0)">修改数据</a></li>
</ul>
<div id="tagContent">
<div class="tagContent selectTag" id="tagContent0">
<form id="DoAdd" name="DoAdd" action="" method="post">
<table class="wwFormTable" width="100%">
	<table id="tbl_updown" class="tagContentTable2" cellspacing="0" width="100%" align="center">
		<tr id="tr_inputArea" >
		<td>
		
		<input type='hidden' name='RID' value='<s:property value="#request.detailData.RID"/>' id='detailId_RID' />
		<input type="hidden" name="tableModelId" value="SModule" id="tableModelId" />
		<input type="hidden" name="opMode" value="update" id="opMode"/>	
		<div class="tagContentTable2Div">
			<table width="100%" id="view_tblid_SModule" name="view_tblname_s_module" class="tagContentTable4" border="0" cellspacing="0">
 		   
			    <tr ><td ><%=wff.getWebFieldCode("SModule", "MODULEID", "update",request)%></td></tr>
				<tr><td><%=wff.getWebFieldCode("SModule", "MODULENAME", "update",request)%></td></tr>
				  <tr><td><%=wff.getWebFieldCode("SModule", "PARENTID", "update",request)%></td></tr>
				 <tr><td><%=wff.getWebFieldCode("SModule", "ORDERID", "update",request)%></td></tr>
				 <tr><td><%=wff.getWebFieldCode("SModule", "TABLEMODELID", "update",request)%></td></tr>
				  <tr><td><%=wff.getWebFieldCode("SModule", "URL", "update",request)%></td></tr>
				 <tr><td><%=wff.getWebFieldCode("SModule", "SHOWRECORDCOUNT", "update",request)%></td></tr>
				  <tr><td colspan="4"><%=wff.getWebFieldCode("SModule", "MODULEDESC", "update",request)%></td></tr>
			   <tr id="tr_buttonArea" style="margin: 15px">
				<td align="center" colspan="5">
				<br>
				<br>
				<a href="#" id="DoAdd_AddSave" name="action:AddSave"   class="h5button green medium" onclick="addData()"/>保存</a>
				<a href="#" id="Add_CommonOpperation" name="Add_CommonOpperation" class="h5button green medium" onclick="addCommonOperation()"/>增加通用操作</a>
				</td>
			</tr>
	</table></div>

	</td>
	</tr>
</table>
</table>
</form>
</div>
</div>
</div>
</body>
</html>
<script type="text/javascript">

var ModuleTree=parent.frames["left"].ModuleTree;

function addCommonOperation(){
   if(parent.oppnew.disabled){
	  showMessage("MSG0070");//此模块是菜单模块,不能添加通用操作！
   }else{
	    var formObj=document.getElementById("DoAdd");
		var result=checkAll(formObj);
		if (result==1) {
	      formObj.action="<%=rootPath%>/fmp/SModuleOpperationBiz/AddCommonOperationSave?MODULEID="+document.getElementById("detailId_MODULEID").value;
	      var url=formObj.action;
	      comAjax(url,backCall);
		}
	   }
}
 
function backCall(rtStr){
	var ridName;
	var rid;
	var name;
	var ridNames = rtStr.split(";");
	if (ridNames.length>1){
	if (ridNames != null) {
		var ids=ModuleTree.getSelectedItemId();
		for (var i = 0; i < ridNames.length; i++) {
			if (ridNames[i] != ""){
			    ridName = ridNames[i].split(",");
				rid=ridName[0];
				name=ridName[1];
				parent.frames["left"].insertTreeItemByItemId(ids,rid+"__opp",name);
			}
		}
	}    
		showMessage("MSG0071");//添加通用操作成功！
	}
	else{
		showMessage("MSG0072");//已添加通用操作！
	}
	
}
function addData(){
	var id=getFieldTrueValue("MODULEID");
	if (checkVo(rootPath + '/fmp/SModuleBiz/CheckModuleVO?id=')){
		var name=getFieldTrueValue("MODULENAME");
		var preModuleId = getFieldOldValue("MODULEID");
		var formObj=document.getElementById("DoAdd");
		var result=checkAll(formObj);
		if (result==1) {
		   parent.frames["left"].updateTreeItem(id,name,"MOD");
	       XMLHttp.formSubmit(formObj,"<%=rootPath%>/fmp/SModuleBiz/AddSave?PREMODULEID="+preModuleId);
		}
	}else{
		showMessage("MSG0068",id);//模块ID:"%s"已经存在,请重新输入！
		getFieldOldValue("MODULEID").focus();
	}
}
 
 
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 