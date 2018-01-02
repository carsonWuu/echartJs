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
<title>当前用户的机构数据</title>
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
		href="javascript:void(0)">查看机构数据</a></li>
</ul>
<div id="tagContent" >
<div class="tagContent selectTag" id="tagContent0" >
<form id="DoAdd" name="DoAdd" action="" method="post">
<table class="wwFormTable" width="100%">
		<tr id="tr_inputArea" >
		<td>
		<input type='hidden' name='RID' value='<s:property value="#request.detailData.RID"/>' id='detailId_RID' />
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

		<table id="view_tblid_SOrg" name="view_tblname_s_org" class="tagContentTable4" border="0" cellspacing="0" width="100%">
			   <tr><td><%=wff.getWebFieldCode("SOrg", "ORGID", "view",request)%></td></tr>
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "SUPORGID", "view",request)%></td></tr>

		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "ORGNAME", "view",request)%></td></tr>
			   <tr><td><%=wff.getWebFieldCode("SOrg", "ORGANSHORTFORM", "view",request)%></td></tr>

		  	   <tr><td><%=wff.getWebFieldCode("SOrg", "ORDERNO", "view",request)%></td></tr>
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "ORGANCHIEF", "view",request)%></td></tr>

		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "POSTCODE", "view",request)%></td></tr>
		 	   <tr><td><%=wff.getWebFieldCode("SOrg", "TELNUM", "view",request)%></td></tr>

               <tr><td><%=wff.getWebFieldCode("SOrg", "AREA_DEV_CATE_TYPE", "view",request)%></td></tr>
			   <tr><td><%=wff.getWebFieldCode("SOrg", "STATE", "update",request)%></td></tr>

			  <tr><td colspan="2"><%=wff.getWebFieldCode("SDept", "DISTNO", "view",request)%></td></tr>

			   <tr><td colspan="2"><%=wff.getWebFieldCode("SOrg", "ADDRESS", "view",request)%></td></tr>
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
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 