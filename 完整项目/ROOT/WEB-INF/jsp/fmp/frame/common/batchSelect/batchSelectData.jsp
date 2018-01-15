<!-----------------------------------
* @文件描述：复制额度通用页面
------------------------------------>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String rootPath = request.getContextPath();
	String hasSetIdsAndNames = (String) request.getAttribute("hasSetIdsAndNames");
	String unsetIdsAndNames = (String) request.getAttribute("unsetIdsAndNames");
	String moduleId = (String) request.getAttribute("moduleId");
	String[] hasSetNameStr = null;
	String[] unsetNameStr = null;
	if (hasSetIdsAndNames != null && !((String) hasSetIdsAndNames).trim().equals("")) {
		hasSetNameStr = ((String) hasSetIdsAndNames).split(";");
	}
	if (unsetIdsAndNames != null && !((String) unsetIdsAndNames).trim().equals("")) {
		unsetNameStr = ((String) unsetIdsAndNames).split(";");
	}
%>
<html>
<head>
<jsp:include
	page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>复制额度-复制到添加选择的客户</title>
</head>
<body>
<input type="hidden" id="RID" name="RID" value="${RID}"/>
<input type="hidden" id="tag" name="tag" value="${tag}"/>
<form name="form1" action="" method="POST">
<table width="100%">
	<td width="40%">
	   <select style="width: 100%;" multiple name="left"
		id="left" size="15">
		<%
				if (unsetNameStr != null) {
					for (int i = 0; i < unsetNameStr.length; i++) {
						String[] unidName = unsetNameStr[i].split(",");
			%>
		<option value="<%=unidName[0]%>"><%=unidName[1]%></option>
		<%
				}
				}
			%>
	   </select>
	</td>
</table>
<p align="center">
<input class="fbutton" type="button" name="add" value="添加" onclick="addQuota();" style="width:50px;"/>
&nbsp;
<input class="fbutton" type="button" name="delete" value="删除" onclick="deleteQuota();" style="width:50px;"/>
&nbsp;
<input class="fbutton" type="button" name="confirmCopy" value="确认复制" onclick="confirmCopyQuota();" style="width:100px;"/>
</p>

</body>
</html>

<script language="JavaScript">
function setValueQuota(id,name){
	if(id == undefined){
		id = "";
	}
	if(name == undefined){
		name = "";
	}
	var e = document.getElementById('left');
	if(e.options.length!=0){                              //判断列表记录是否不为“空”
		var k = 0;
		for ( var j = 0; j < e.options.length; j++) {
			if(e.options[j].value != id){                 //遍历列表记录与需要添加的记录是否不相等
				k = k+1;
			}
		}
		if(k == e.options.length){
			e.options.add(new Option(name, id));          //往表添加记录
		}
	}else{
		e.options.add(new Option(name, id));
	}
}
function addQuota(){                    //添加记录
	var selectedDataList = new Object(); 
	var rid = document.getElementById("RID").value;
	var tag = document.getElementById("tag").value;
	if(tag == "indiCust"){                //标记是否为“个人客户额度”
		var url = rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkPopWithCallBackFunc&tableModelId=CrdIndiCustRiskQuota&checkBoxMode=true&freezeCondition=and detail.RID!='"+rid+"'";
		openModalDialog(url,selectedDataList, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
		for (var i = 0; i<selectedDataList.recordCount;i++){		
			var custCode = selectedDataList.record[i].data["CUSTCODE"];
			var custName = selectedDataList.record[i].data["CUSTNAME"];
			setValueQuota(custCode,custName);	   
		}
	}else if(tag == "corpCust"){           //标记是否为“公司客户额度”
		var url = rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkPopWithCallBackFunc&tableModelId=CrdCorpCustRiskQuota&checkBoxMode=true&freezeCondition=and detail.RID!='"+rid+"'";
		openModalDialog(url,selectedDataList, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
		for (var i = 0; i<selectedDataList.recordCount;i++){		
			var custCode = selectedDataList.record[i].data["CUSTCODE"];
			var custName = selectedDataList.record[i].data["CUSTNAME"];
			setValueQuota(custCode,custName);	   
		}
	}else if(tag == "tml"){                //标记是否为“终端额度”
		var url = rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkPopWithCallBackFunc&tableModelId=CrdTerminalRiskQuota&checkBoxMode=true&freezeCondition=and cti.RID!='"+rid+"'";
		openModalDialog(url,selectedDataList, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
		for (var i = 0; i<selectedDataList.recordCount;i++){		
			var terminalId = selectedDataList.record[i].data["TERMINALID"];
			var terminalName = selectedDataList.record[i].data["TERMINALNAME"];
			setValueQuota(terminalId,terminalName);
		}
	}else if(tag == "org"){                //标记是否为“机构额度”
		var url = rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkPopWithCallBackFunc&tableModelId=SOrgRiskQuota&checkBoxMode=true&freezeCondition=and sorg1.RID!='"+rid+"'";
		openModalDialog(url,selectedDataList, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
		for (var i = 0; i<selectedDataList.recordCount;i++){		
			var orgId = selectedDataList.record[i].data["ORGID"];
			var orgName = selectedDataList.record[i].data["ORGNAME"]; 
			setValueQuota(orgId,orgName);  
		}
	}else if(tag == "user"){                //标记是否为“抵押权人额度”
		var url = rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=checkPopWithCallBackFunc&tableModelId=SUserRiskQuota&checkBoxMode=true&freezeCondition=and user1.RID!='"+rid+"'";
		openModalDialog(url,selectedDataList, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
		for (var i = 0; i<selectedDataList.recordCount;i++){		
			var userId = selectedDataList.record[i].data["USERID"];
			var userName = selectedDataList.record[i].data["USERNAME"];
			setValueQuota(userId,userName);
		}
	}
}

function deleteQuota(){
	var e = document.getElementById('left');
	var len = e.options.length;
	if( e.options.length == 0){
		showMessage("MSG0049");//列表未有记录，请先添加记录！
	}else{
		var m = 0;
		for ( var i = 0; i < e.options.length; i++) {
			if (e.options[i].selected) {         //是否选中记录
				e.remove(i);                     //删除记录
				i = i - 1;
				break;
			}else{
				m = m+1;
			}
		}
		if(m == len){                              //判断是否在列表中未选中记录
			showMessage("MSG0050");//请先在列表中选择一条记录！
		}else{
			showMessage("MSG0051");//成功删除！
		}
	}
}

function confirmCopyQuota() {
	var form0 = document.forms[0];
	var leftList = form0.left;
	var ids = "";
	for (i = 0; i < leftList.length; i++) {
		ids += leftList[i].value + ",";
		leftList[i].selected = true;
	}
	if (ids != "" && ids.length > 0) {
		ids = ids.substring(0, ids.length - 1);
	}
    var rid = document.getElementById("RID").value;
    var tag = document.getElementById("tag").value;
    if(ids != null && ids != ""){
    	if(tag == "indiCust"){            //标记是否为“个人客户额度”
            var url = rootPath+"/credit/riskManage/quotaManage/CrdCustProdQuotaBiz/SaveCustBase?ids="+ids+"&RID="+rid;
        }else if(tag == "corpCust"){      //标记是否为“公司客户额度”
            var url = rootPath+"/credit/riskManage/quotaManage/CrdCustProdQuotaBiz/SaveCustBase?ids="+ids+"&RID="+rid;
        }else if(tag == "tml"){           //标记是否为“终端额度”
            var url = rootPath+"/credit/riskManage/quotaManage/CrdCustProdQuotaBiz/SaveTmlQuota?ids="+ids+"&RID="+rid;
        }else if(tag == "org"){           //标记是否为“机构额度”
            var url = rootPath+"/credit/riskManage/quotaManage/CrdCustProdQuotaBiz/SaveOrgQuota?ids="+ids+"&RID="+rid;
        }else if(tag == "user"){          //标记是否为“抵押权人额度”
            var url = rootPath+"/credit/riskManage/quotaManage/CrdCustProdQuotaBiz/SaveUserQuota?ids="+ids+"&RID="+rid;
        }
    	comAjax(url,backCallSaveRoleUser);
    }else{
    	showMessage("MSG0049");//列表未有记录，请先添加记录！
    }
    
}
function backCallSaveRoleUser(msg){
	if (msg=="success"){
		showMessage("MSG0052");//复制成功！
		closeWindow();
	}else{
		showMessage("MSG0053");//复制失败！
	}	
}

</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 