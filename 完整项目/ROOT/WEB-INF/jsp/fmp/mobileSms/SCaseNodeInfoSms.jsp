<!-----------------------------------
* @功能说明：节日短信发送页面
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
<script src="<%=rootPath %>/scripts/BizModuleScript/SCaseNodeInfoSms.js" type="text/javascript" language="javascript"></script>


<title>项目节点短息发送</title>
</head>
<body>
<form id="SCaseNodeInfoSms">
<table id="sholidaytbl" name="sholidaytbl" border="0" cellspacing="0" width="100%">
				<tr>
					<td ><%=wff.getWebFieldCode("SCaseNodeInfoSmsTbl", "SMSSENDGROUP", "add",request)%></td>
				</tr>
				<tr>
					<td ><%=wff.getWebFieldCode("SCaseNodeInfoSmsTbl", "SMSCONTENT", "add",request)%></td>
				</tr>

				<tr id="tr_buttonArea" style="margin: 15px">
					<td align="center" colspan="4">
					<br>
					<br>
					<input type="button" id="Sendsms" value="发送" class="button" onclick="sendsms();" /> 
					<input type="reset" id="reset" value="重置" class="button" />
					<input type="button" id="Back" value="返回" class="button" onclick="javascript:history.go(-1);" />
					</td>
				</tr>
			</table>
			<input type="hidden" id="CASECODE" name="CASECODE" value="${CASECODE}"/>
</form>
</body>

<SCRIPT language="javascript">
document.getElementById('detailId_SMSCONTENT').value = '${SMSTEMPLATE}';

function sendsms(){	
	if(document.getElementById('SMSSENDGROUP').value==""){
		showMessage("MSG0066");//请在发送群体中至少选择一项！
		return;
	}else if(document.getElementById('SMSCONTENT').value==""){
		showMessage("MSG0067");//请填写所需发送的短消息内容！
		return;
	}
	if (confirm("是否确认发送？")) {	
		var form=document.getElementById("SCaseNodeInfoSms");
		var url = rootPath+"/credit/caseManage/nodeTransact/CrdNodeTransactBiz/SendNodeInfoSms";
	    XMLHttp.formSubmit(form,url,sendsmsCallBack);
	    function sendsmsCallBack(msg){
			showMessage(msg);
	    }
	}
}
</SCRIPT>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 
