<!-----------------------------------
* @文件描述：报表子模板新增页面
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ page import="com.zstar.fmp.log.FMPLog;"%>
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
<script src="<%=rootPath%>/scripts/BizModuleScript/SReportSubTemplet.js" type="text/javascript" language="javascript"></script>
<title>修改报表子模板数据</title> 
</head>
<body>

<div id="con" style="width: 100%; border: 0px solid #000; position: absolute;left: 0; top:0PX;padding:0px 0px 0px 0px">
<ul id="tags">
	<li class="selectTag"><a onclick="selectTag('tagContent0',this)"
		href="javascript:void(0)">修改报表子模板数据</a></li>
</ul>
<div id="tagContent">
<div class="tagContent selectTag" id="tagContent0">
<form id="DoUpdate" name="DoUpdate" action="" method="post" enctype="multipart/form-data">

	<table id="tbl_updown" cellspacing="0" width="100%" align="center">
		<tr id="tr_inputArea" >
		<td>
		<input type="hidden" name="opMode" value="${opMode}" id="opMode"/>
		<!--  
		<input type='hidden' name='RID' value='<s:property value="#request.RID"/>' id='detailId_RID'/>
		<input type="hidden" name="tableModelId" value="SReportSubTemplet" id="tableModelId" />
		<input type='hidden' name='MODIFIERID' value='<s:property value="#request.MODIFIERID"/>'/>
		-->
		<table id="view_tblid_reportSubTemplet"  class="d_search_table" border="0" cellspacing="0">  
		 	   <tr>
		 	   <td colSpan="1"><%=wff.getWebFieldSampleCode("SReportSubTemplet", "RID", "update",request)%></td>
		 	   <td colSpan="1"><%=wff.getWebFieldSampleCode("SReportSubTemplet", "REPORTTEMPLETID", "update",request)%></td>
		 	   </tr>
		 	   
		 	   <tr height="5px">
		 	   <td></td>
		 	   </tr>
		 	   
		 	   <tr>
		 	   <td colSpan="1"><%=wff.getWebFieldCode("SReportSubTemplet", "SERIALNUM", "update",request)%></td>
		 	   <td colSpan="1"><%=wff.getWebFieldCode("SReportSubTemplet", "SUBTEMPLETNAME", "update",request)%></td>
		 	   </tr> 
		 	   
		  	   <tr height="5px">
		  	   <td></td>
		  	   </tr>
		  	   
		 	   <tr>
		 	   <td colSpan="1"><%=wff.getWebFieldCode("SReportSubTemplet", "DATAOBJTYPE", "update",request)%></td>
		 	   <td colSpan="1"><%=wff.getWebFieldCode("SReportSubTemplet", "DATAOBJNAME", "update",request)%></td>
		 	   </tr>
		 	   
		 	   <tr height="5px">
		 	   <td></td>
		 	   </tr>	
		 	   
		 	   		
			   <tr><td colSpan="2"><label class="label">子模板上传文件</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="file"  name="upload" style="width:79%; border-width: 1px; border-color: #6699CC; border-style: solid;" /></td></tr>
		  <tr height="15px"></tr>
		<tr id="tr_buttonArea" style="margin: 15px">
			<td align="center" colspan="4" >
			<br>
		    <br>
			<input type="button" id="DoUpdate_UpdateSave" value="保存" class="h5button green medium" onclick="updateData()" theme="simple"/>
			<input type="reset"  id="reset" value="重置" class="h5button orange medium" theme="simple"/>
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
</html>
<script type="text/javascript">

function updateData(){
	var form=document.getElementById("DoUpdate");
	var result =checkAll(form);
	if (result){
		var reportTempleId=document.getElementById("REPORTTEMPLETID").value; 
	    form.action="<%=rootPath%>/fmp/system/report/reportSubTemplet/SReportSubTempletBiz/updateSaveSReportSubTemletData?REPORTTEMPLETID="+reportTempleId;
	    form.submit();
 		/*
	    form.action="<%=rootPath%>/fmp/system/report/reportSubTemplet/SReportSubTempletBiz/updateSaveSReportSubTemletData";
	    form.submit();
		doRefreshList();
		closeWindow();
 */
	}
}
	
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />