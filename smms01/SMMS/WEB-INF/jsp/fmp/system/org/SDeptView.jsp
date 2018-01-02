<!-----------------------------------
* @文件描述：部门查看详细信息页面
------------------------------------>
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
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<title>部门信息</title>
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

<div id="con"
	style="width: 100%; border: 0px solid #000; position: absolute; left: 0; top: 0PX; padding: 0px 0px 0px 0px">
<ul id="tags">
	<li class="selectTag"><a onclick="selectTag('tagContent0',this)"
		href="javascript:void(0)">部门信息</a></li>
</ul>

<div id="tagContent">
<div class="tagContent selectTag" id="tagContent0">
<form id="DoAdd" name="DoAdd" action="" method="post">
<table class="wwFormTable" width="100%">
	<table id="tbl_updown" class="tagContentTable2" cellspacing="0" width="100%" align="center">
		<tr id="tr_inputArea">
			<td><input type='hidden' name='RID' value='<s:property value="#request.detailData.RID"/>' id='detailId_RID' /> 
				<input type="hidden"name="tableModelId" value="SDept" id="tableModelId" />
				 <input type="hidden" name="opMode" value="view" id="opMode" /> 

				<input type='hidden' name='LevelID' value='<s:property value="#request.detailData.LevelID"/>' />
				<input type='hidden' name='ENNAME' value='<s:property value="#request.detailData.ENNAME"/>' />
				<input type='hidden' name='LAUNCHDATE' value='<s:property value="#request.detailData.LAUNCHDATE"/>' />
				<input type='hidden' name='MODIFIERID' value='<s:property value="#request.detailData.MODIFIERID"/>' />			
			   	<input type='hidden' name='CREATTIME' value='<s:property value="#request.detailData.CREATTIME"/>'/>
		        <input type='hidden' name='CREATORID' value='<s:property value="#request.detailData.CREATORID"/>'/>
		        <input type='hidden' name='MODIFIEDTIME' value='<s:property value="#request.detailData.MODIFIEDTIME"/>'/>
				<input type='hidden' name='RECORDSTATE' value='<s:property value="#request.detailData.RECORDSTATE"/>'/>
			<div class="tagContentTable2Div">
			<table id="view_tblid_SDept" class="tagContentTable4" name="view_tblname_s_SDept" border="0" cellspacing="0" width="100%">
								
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
					<td align="center" colspan="4">
					<br>
					<br>
					<input type="button" id="DoAdd_AddSave" value="保存" class="h5button green medium" onclick="addData()" /> 
					<input type="reset" id="reset" value="重置" class="h5button green medium" /></td>
				</tr>
			</table>
			</div>
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
function addData(){
	var id=document.getElementById("detailId_DEPTID").value;
	var name=document.getElementById("detailId_DEPTNAME").value;
	var formObj=document.getElementById("DoAdd");
	var result=checkAll(formObj);
	if (result==1) {
	   self.parent.frames["left"].updateTreeItem(id,name,"SDept");
	   XMLHttp.formSubmit(formObj,"<%=rootPath%>/fmp/SDeptBiz/AddSave");
       //formObj.action="<%=rootPath%>/fmp/SDeptBiz/AddSave.action";
	   //formObj.submit();
	   //parent.frames["left"].location.reload();  
	   }
	}
CheckFieldNotNull();

function openSupDeptPop(){
	var orgId = document.getElementById("detailId_ORGID").value;
	var preSupDeptId = document.getElementsByName("pre#SUPDEPTID")[0].value;
	var freezeCondition = "and (dept.ORGID ='" + orgId + "' and dept.SUPDEPTID !='" + preSupDeptId + "')";
	openSinPop('SDept','SUPDEPTID','DEPTID','DEPTNAME','',freezeCondition);
}

//选择部门负责人的弹出窗口要做下过滤，按照机构码和部门码来过滤
function openDepChiefPop(){
	var orgId = document.getElementById("detailId_ORGID").value;
	var deptId = document.getElementById("detailId_DEPTID").value;
	var freezeCondition = "and (user1.ORGID ='" + orgId +"') and (user1.DEPTID = '" +deptId+"')";
	openSinPop('SUser','DEPCHIEF','USERID','USERNAME','',freezeCondition);
}
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 