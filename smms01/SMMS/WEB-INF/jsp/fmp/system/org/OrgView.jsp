<!-----------------------------------
* @文件描述：机构查看详细信息页面
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
<title>查看机构数据</title>
</head>
<body>
<div id="con" style="width: 100%; border: 0px solid #000; position: absolute;left: 0; top:0PX;padding:0px 0px 0px 0px">
<ul id="tags">
	<li class="selectTag"><a onclick="selectTag('tagContent0',this)"
		href="javascript:void(0)">查看机构数据</a></li>
</ul>
<div id="tagContent">
<div class="tagContent selectTag" id="tagContent0">
<form id="DoAdd" name="DoAdd" action="" method="post">
<table class="wwFormTable" width="100%">
		<tr id="tr_inputArea" >
		<td>
		<input type='hidden' name='RID' value='<s:property value="#request.detailData.RID"/>' id='detailId_RID'/>
		<input type="hidden" name="tableModelId" value="SOrg" id="tableModelId" />
		<input type="hidden" name="opMode" value="<s:property value="#request.opMode"/>" id="opMode"/>
		<input type='hidden' name='MODIFIERID' value='<s:property value="#request.detailData.MODIFIERID"/>'/>
		<input type='hidden' name='LOCATE' value='<s:property value="#request.detailData.LOCATE"/>'/>	
		<input type='hidden' name='ENNAME' value='<s:property value="#request.detailData.ENNAME"/>'/>
		<input type='hidden' name='FINCODE' value='<s:property value="#request.detailData.FINCODE"/>'/>
		<input type='hidden' name='CONTROL' value='<s:property value="#request.detailData.CONTROL"/>'/>
		<input type='hidden' name='FinanceNumber' value='<s:property value="#request.detailData.FinanceNumber"/>'/>
		<input type='hidden' name='TaxNumber' value='<s:property value="#request.detailData.TaxNumber"/>'/>
		<input type='hidden' name='CREATTIME' value='<s:property value="#request.detailData.CREATTIME"/>'/>
		<input type='hidden' name='CREATORID' value='<s:property value="#request.detailData.CREATORID"/>'/>
		<input type='hidden' name='MODIFIEDTIME' value='<s:property value="#request.detailData.MODIFIEDTIME"/>'/>
		<input type='hidden' name='RECORDSTATE' value='<s:property value="#request.detailData.RECORDSTATE"/>'/>
		<input type='hidden' name='ORGANLEVEL' value='<s:property value="#request.detailData.ORGANLEVEL"/>'/>
		<input type='hidden' name='LAUNCHDATE' value='<s:property value="#request.detailData.LAUNCHDATE"/>'/>

		<table id="view_tblid_SOrg" name="view_tblname_s_org" class="tagContentTable4" border="0" cellspacing="0" width="100%" >
			  <tr> <td><%=wff.getWebFieldCode("SOrg", "ORGID", "update",request)%></td></tr>
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "ORGNAME", "update",request)%></td></tr>
			  <tr> <td><%=wff.getWebFieldCode("SOrg", "ORGANSHORTFORM", "update",request)%></td></tr>
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "SUPORGID", "update",request)%></td></tr>

		  	   <tr><td><%=wff.getWebFieldCode("SOrg", "ORDERNO", "update",request)%></td></tr>
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "ORGANCHIEF", "update",request)%></td></tr>

		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "POSTCODE", "update",request)%></td></tr>
		 	  <tr><td><%=wff.getWebFieldCode("SOrg", "TELNUM", "update",request)%></td></tr>

               <tr><td><%=wff.getWebFieldCode("SOrg", "AREA_DEV_CATE_TYPE", "update",request)%></td></tr>
			  <tr><td colspan="2"><%=wff.getWebFieldCode("SDept", "DISTNO", "update",request)%></td></tr>

			   <tr><td colspan="2"><%=wff.getWebFieldCode("SOrg", "ADDRESS", "update",request)%></td></tr>
		 
		<tr id="tr_buttonArea" style="margin: 15px">
			<td align="center" colspan="4" >
			<br>
		    <br>
			<input type="button" id="DoAdd_AddSave" value="保存" class="button" onclick="addData()" theme="simple"/>
			<input type="reset"  id="reset" value="重置" class="button" theme="simple"/>
			<input type="button" id="setNodeTransactArea" value="设置节点办理区域" class="button" onclick="setTransactArea()" theme="simple"/>
			</td>
		</tr>
	</table>
	</td>
	</tr>
</table>
</form>
</div>
</div>
</div>
</body>

<script>
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
	   self.parent.frames["left"].updateTreeItem(id,name,"ORG");
	   XMLHttp.formSubmit(formObj,"<%=rootPath%>/fmp/SOrgBiz/AddSave");
       //formObj.action="<%=rootPath%>/fmp/SOrgBiz/AddSave.action";
       //formObj.submit();
	   //parent.frames["left"].location.reload();  
	}
}

function setTransactArea(){
	var orgId = document.getElementById("detailId_ORGID").value;
	var url = "<%=rootPath%>/fmp/FrameCommonBiz/DoList?tableModelId=SOrgTransactArea&moduleId=crd_md_jgblqy&opMode=update&isSubTbl=true&keyLimit=ORGID:"+orgId;
	openWindow(url);
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
CheckFieldNotNull();

function doChange(obj){
	if(obj.name == 'ORGID'){
		var preOrgId = document.getElementsByName("pre#ORGID");
		var orgId = obj.value;
		if(preOrgId[0].value != orgId){                           //判断记录值是否不等于修改值
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
	
}
</script>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 