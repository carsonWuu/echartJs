<!-----------------------------------
* @文件描述：部门新增页面
------------------------------------>
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
<script src="<%=rootPath%>/scripts/tabs_style.js"></script>

<title>新增部门数据</title>
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
<body onload="doOnload();">
<div id="con" style="width: 100%; border: 0px solid #000; position: absolute;left: 0; top:0PX;padding:0px 0px 0px 0px">
<ul id="tags">
	<li class="selectTag"><a onclick="selectTag('tagContent0',this)"
		href="javascript:void(0)">新增部门数据</a></li>
</ul>
<div id="tagContent">
<div class="tagContent selectTag" id="tagContent0">
<form id="DoAdd" name="DoAdd" action="" method="post">
<table class="wwFormTable" width="100%">
	<table id="tbl_updown" cellspacing="0" width="100%" align="center">
		<tr id="tr_inputArea" >
		<td>
		<input type='hidden' name='RID' value='<s:property value="#request.RID"/>' id='detailId_RID' />
		<input type="hidden" name="tableModelId" value="SOrg" id="tableModelId" />
		<input type="hidden" name="opMode" value="add" id="opMode"/>
		<input type='hidden' name='MODIFIERID' value='<s:property value="#request.MODIFIERID"/>'/>
		<input type='hidden' name='CREATORID' value='<s:property value="#request.CREATORID"/>'/>
	    <table id="view_tblid_SOrg" name="view_tblname_s_org" class="d_search_table" border="0" cellspacing="0"> 
	    			<tr><td><%=wff.getWebFieldCode("SDept", "DEPTID", "update",request)%></td></tr>              
	                <tr><td><%=wff.getWebFieldCode("SDept", "DEPTNAME", "update",request)%></td></tr>
					<tr><td><%=wff.getWebFieldCode("SDept", "DEPSHORTFORM", "update",request)%></td></tr>
					<tr><td><%=wff.getWebFieldCode("SDept", "ORGID", "update",request)%></td></tr>
					<tr><td><%=wff.getWebFieldCode("SDept", "SUPDEPTID", "update",request)%></td></tr>
					<tr><td><%=wff.getWebFieldCode("SDept", "ORDERNO", "update",request)%></td></tr>
					<tr><td><%=wff.getWebFieldCode("SDept", "DEPCHIEF", "update",request)%></td></tr>
					<tr><td colspan="2"><%=wff.getWebFieldCode("SDept", "DISTNO", "update",request)%></td></tr>
					<tr><td colspan="2"><%=wff.getWebFieldCode("SDept", "MEMO", "update",request)%></td></tr>
				<tr id="tr_buttonArea" style="margin: 15px">
					<td align="center" colspan="4" >
				    <br>
				    <br>
					<input type="button" id="DoAdd_AddSave" value="保存" class="button" onclick="addData()"/>
					<input type="reset"  id="reset" value="重置" class="button"/>
					</td>
				</tr>
	</table>
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

	function CheckFieldNotNull() 
	{
		var ids = "DEPTID,SUPDEPTID,DEPTNAME,DISTNO";
		var arr = ids.split(",");
		for ( var i = 0; i < arr.length; i++) {
			setObjEvens("detailId_" + arr[i], "");
		}
	}
	function addData() {
		var name = document.getElementById("detailId_DEPTNAME").value;
		var formObj = document.getElementById("DoAdd");
		var result=checkAll(formObj);
		if (result==1) {		
			XMLHttp.formSubmit(formObj,"<%=rootPath%>/fmp/SDeptBiz/AddSave",backCall_getDeptIdStr);
			function backCall_getDeptIdStr(deptIdStr){
				if(deptIdStr){
					self.parent.frames["left"].insertTreeItem(deptIdStr + "__SDept", name);
					showMessage("MSG0054");//新增数据成功！
				}
			}
		}
	 }
	CheckFieldNotNull();

	function openSupDeptPop(){
		var orgId = document.getElementById("detailId_ORGID").value;
		var freezeCondition = "and dept.ORGID ='" + orgId +"'";
		openSinPop('SDept','SUPDEPTID','DEPTID','DEPTNAME','',freezeCondition);
	}

	//选择部门负责人的弹出窗口要做下过滤，按照机构码和部门码来过滤
	function openDepChiefPop(){
		var orgId = document.getElementById("detailId_ORGID").value;
		var deptId = document.getElementById("detailId_DEPTID").value;
		var freezeCondition = "and (user1.ORGID ='" + orgId +"') and (user1.DEPTID = '" +deptId+"')";
		openSinPop('SUser','DEPCHIEF','USERID','USERNAME','',freezeCondition);
	}

	function doOnload(obj){
		var orgId = document.getElementById("detailId_ORGID").value;
		var url = "<%=rootPath%>/fmp/SDeptBiz/getDistNoMsg?ORGID="+orgId;
		comAjax(url,backCall_DistNoInfo);
		function backCall_DistNoInfo(distNoStr){
			if(distNoStr != null && distNoStr != ""){
				setFieldValue("DISTNO", distNoStr);
			}
		}
	}
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 