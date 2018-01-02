<!-----------------------------------
* @文件描述：机构新增页面
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
<title>新增机构数据</title>
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
		href="javascript:void(0)">新增机构数据</a></li>
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
		<input type="hidden" name="opMode" value="<s:property value="#request.opMode"/>" id="opMode"/>
		<input type='hidden' name='MODIFIERID' value='<s:property value="#request.MODIFIERID"/>'/>
		
		<table id="view_tblid_SOrg" name="view_tblname_s_org" class="d_search_table" border="0" cellspacing="0">
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "ORGID", "add",request)%></td></tr>			 
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "ORGNAME", "add",request)%></td></tr>
			   <tr><td><%=wff.getWebFieldCode("SOrg", "ORGANSHORTFORM", "add",request)%></td></tr>
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "SUPORGID", "add",request)%></td></tr>
 
		  	   <tr><td><%=wff.getWebFieldCode("SOrg", "ORDERNO", "add",request)%></td></tr>
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "ORGANCHIEF", "add",request)%></td></tr>
 
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "POSTCODE", "add",request)%></td></tr>
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "TELNUM", "add",request)%></td></tr>
 
               <tr><td><%=wff.getWebFieldCode("SOrg", "AREA_DEV_CATE_TYPE", "add",request)%></td></tr>
			  
		 
 
			<tr>  <td colspan="2"><%=wff.getWebFieldCode("SDept", "DISTNO", "add",request)%></td></tr>
 
			 <tr>  <td colspan="2"><%=wff.getWebFieldCode("SOrg", "ADDRESS", "add",request)%></td></tr>
 
		  <tr height="15px"></tr>
		<tr id="tr_buttonArea" style="margin: 15px">
			<td align="center" colspan="4" >
			<br>
		    <br>
			<input type="button" id="DoAdd_AddSave" value="保存" class="button" onclick="addData()" theme="simple"/>
			<input type="reset"  id="reset" value="重置" class="button" theme="simple"/>
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

	//选择机构负责人的弹出窗口要做下过滤，按照机构码来过滤
	function openOrgAnChief(){
		var orgId = document.getElementById("detailId_ORGID").value;
		var freezeCondition = "and (user1.ORGID ='" + orgId +"')";
		openSinPop('SUser','ORGANCHIEF','USERID','USERNAME','',freezeCondition);
	}
	function addData(){
		var id=document.getElementById("detailId_ORGID").value;
		var name=document.getElementById("detailId_ORGNAME").value;
		var formObj=document.getElementById("DoAdd");
		var result=checkAll(formObj);
		if (result==1) {
		   self.parent.frames["left"].insertTreeItem(id,name);
		   XMLHttp.formSubmit(formObj,"<%=rootPath%>/fmp/SOrgBiz/AddSave");
	       //formObj.action="<%=rootPath%>/fmp/SOrgBiz/AddSave.action";
	       //formObj.submit();
		}
	}
	
	function CheckFieldNotNull() 
	{
		var ids="ORGID,SUPORGID,ORGNAME,ORGANSHORTFORM,DISTNO";
		var arr = ids.split(",");
		for ( var i = 0; i < arr.length; i++) {
			setObjEvens("detailId_" + arr[i], "");
		}
	}
	setObjEvens("detailId_TELNUM" , "mobilephone");
	function checkSUPORGID() 
	{
		var opvalue = document.getElementById("opMode").value;
		if ("add" == opvalue) {
			var value = self.parent.frames["left"].OrgTree.getSelectedItemId();
			
			if (value) {
				document.getElementById("detailId_SUPORGID").value = value;
		} else {
				document.getElementById("detailId_SUPORGID").value = "<%=FMPContex.SYS_TOPORGID%>";
			}
		}
	 }
	 
	checkSUPORGID();
	CheckFieldNotNull();

	function doChange(obj){
		if(obj.name == 'ORGID'){
			var orgId = document.getElementById("detailId_ORGID").value
			var url = rootPath+"/fmp/SOrgBiz/isExistOrgId?ORGID="+orgId; 
			comAjax(url,backCallMsg);
			function backCallMsg(msg){
				if (msg == "exist"){
					showMessage("MSG0074");//此机构码已存在，请重新输入！
					setFieldValue("ORGID","");
				}
			}
		}
	}
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 