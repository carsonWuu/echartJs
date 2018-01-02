<!-----------------------------------
* @文件描述：自定义界面模板页
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%
	String rootPath = request.getContextPath();
	WebComponent wff = FMPContex.webFieldFactory;
%>
<head>
<script
	src="<%=rootPath%>/scripts/fmp/svgWorkFlow/jquery-1.9.0.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include
	page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />

<title>Insert title here</title>
<style>
a {
	text-decoration: none
}

.test {
	color: #666666;
}

.myTest {
	color: #323232;
}

.leftClass {
	position: relative;
	left: 160px;
	color: #323232;
}

.leftTest {
	color: #666666;
	position: relative;
	left: 160px;
}
</style>
</head>
<body>
<form>
<table width="100%" id="test">
	<tr>
		<td>
		<table border="0" cellspacing="0" width="100%">
			<tr>
				<td><%=wff.getWebFieldCode("SmmsPendingEvent", "URL", "add",
					request)%></td>
			</tr>
			<tr>
				<td><%=wff.getWebFieldCode("SmmsPendingEvent", "THREAT_NAME",
					"add", request)%></td>
			</tr>
			<tr>
				<td><%=wff.getWebFieldCode("SmmsPendingEvent", "IP", "add",
					request)%></td>
			</tr>
			<tr>
				<td><%=wff.getWebFieldCode("SmmsPendingEvent",
					"FORCE_CLOSE_DESCE", "add", request)%></td>
			</tr>
		</table>
</tr>


		<tr>
			<td><br>
			<div align="center">
			<input class="h5button green medium"
				type="button" onclick="viewUrl(getFieldTrueValue('URL'));"
				value="页面解析" /> 
			<input class="h5button green medium" type="button"
				value="信息比对" onclick="checkUrl();"/> 
			<input class="h5button orange medium" type="button" onclick="rectification();" value="下发整改" /></div>
			<br>
			</td>
		</tr>
</table>
</form>
<div class="message" id="viewTable"></div>

<script type="text/javascript">
var json="";
	function checkUrl() {
		$("#viewTable").empty();
		if ((getFieldTrueValue('URL') == null || getFieldTrueValue('URL').length == 0)
				&& (getFieldTrueValue('IP') == null || getFieldTrueValue('IP').length == 0)) {
			showMessage('目标网站URL和目标ip不能同时为空');
		} else {
			var getUrl = getFieldTrueValue('URL');
			var ip = getFieldTrueValue('IP');
			var url = rootPath + "/SMMS/SmmsPendingEventBiz/checkUrl?URL="
					+ getUrl + "&IP=" + ip;
			XMLHttp.urlSubmit(url, backCallSendMsg);
			function backCallSendMsg(msg) {
				if (msg != null && msg != '') {
					json = JSON.parse(msg);

					$("#viewTable")
							.append(
									"<table  id ='table' style='margin-left:180px;border-spacing:10px 20px;' border='0'>"
											+ "<tr>" + "<td class='test'>"
											+ '运营商名称:'
											+ "</td>"
											+ "<td class='myTest'><a href='#' id='idc_name' onclick='openwinIdcName()'></a></td>"
											+ "<td class='leftTest'>"
											+ '机&nbsp;房&nbsp;序&nbsp;号:'
											+ "</td>"
											+ "<td id='room_idx' class='leftClass'></td>"
											+ "</tr>"
											+ "<tr>"
											+ "<td class='test'>"
											+ '机&nbsp;房&nbsp;名&nbsp;称:'
											+ "</td>"
											+ "<td id='room_name' class='myTest'></td>"
											+ "<td class='leftTest'>"
											+ '机房所在地:'
											+ "</td>"
											+ "<td class='leftClass'><a href='#' id='room_address' onclick='openwinRoomAddress()'></a></td>"
											+ "</tr>"
											+ "<tr>"
											+ "<td class='test'>"
											+ '主体备案号:'
											+ "</td>"
											+ "<td class='myTest'><a href='#' id='sponser_case_num' onclick='openwinWebCaseNum()'></a></td>"
											+ "<td class='leftTest'>"
											+ '网&nbsp;站&nbsp;名&nbsp;称:'
											+ "</td>"
											+ "<td id='website_name' class='leftClass'></td>"
											+ "</tr>"
											+ "<tr>"
											+ "<td class='test''>"
											+ '网站首页URL:'
											+ "</td>"
											+ "<td class='myTest'><a href='#' id='website_url' onclick='viewUrl()'></a></td>"
											+ "</tr>" + "</table>");

					$("#idc_name").text(json.idc_name);
					//机房名称
					$("#room_name").text(json.room_name);
					//机房序号
					$("#room_idx").text(json.room_idx);
					//机房地址
					$("#room_address").text(json.room_address);
					//主体备案号 
					$("#sponser_case_num").text(json.sponser_case_num);
					//网站名称
					$("#website_name").text(json.website_name);
					//网站首页
					$("#website_url").text(json.website_url);

				} else {
					showMessage('查不到数据');
				}
			}
		}
	}
	function openwinIdcName() {
		var idcUrl = rootPath + "/SMMS/IdcInfoBiz/DoView?RID=" + json.siiRid
				+ "&tableModelId=IdcInfo";
		openWindow(comUrl(idcUrl), "运营商信息");

	}

	function openwinRoomAddress() {
		var roomUrl = rootPath + "/SMMS/SmmsRoomInfoBiz/DoView?RID="
				+ json.ssrRid + "&tableModelId=SmmsRoomInfo";
		openWindow(comUrl(roomUrl), "机房信息");

	}

	function openwinWebCaseNum() {
		var sponserCaseNum = rootPath + "/SMMS/WebCaseBiz/DoView?RID="
				+ json.swcRid + "&tableModelId=WebCase";
		openWindow(comUrl(sponserCaseNum), "主体备案号");

	}

	function openwinWebCaseUrl() {
		var swcUrl = rootPath + "/SMMS/WebCaseBiz/DoView?RID=" + json.swcRid
				+ "&tableModelId=WebCase";
		openWindow(comUrl(swcUrl), "网站首页");
	}

	function rectification() {
		$("#viewTable").empty();
		if ((getFieldTrueValue('URL') == null || getFieldTrueValue('URL').length == 0)
				&& (getFieldTrueValue('IP') == null || getFieldTrueValue('IP').length == 0)) {
			showMessage('目标网站URL和目标ip不能同时为空');
		} else {
			var form = document.forms[0];
			var submitUrl = comUrl(rootPath + "/SMMS/SmmsPendingEventBiz/rectification");
			XMLHttp.formSubmit(form, submitUrl, backCallSendMsg);

			function backCallSendMsg(msg) {
				var message = msg.substr(0, 3);
				if (message == '000') {
					var msg = msg.substr(4, 8);
					showMessage(msg);
					setFieldValue('URL', null);
					setFieldValue('IP', null);
					setFieldValue('THREAT_NAME', null);
					setFieldValue('FORCE_CLOSE_DESCE', null);
				} else {
					alert(msg);
				}
			}

		}

	}

	function viewUrl() {
		var URL=json.website_url;
		var urlStr = 'http://' + URL.replace(/^http:\/\//i, '');
		openWindow(comUrl(urlStr));

	}

</script>


<jsp:include
	page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />
</body>
</html>