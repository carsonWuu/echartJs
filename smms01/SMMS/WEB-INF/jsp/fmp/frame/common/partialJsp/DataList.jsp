<!-----------------------------------
* @文件描述：数据列表展示
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>    
<%@ page import="java.util.Iterator"%>  
<%@ page import="java.util.Map"%>  
<%@ page import="java.util.Collection"%> 
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page import="com.zstar.fmp.utils.Page"%>  
 <%
 

 String rootPath=request.getContextPath();
 List<?> searchDataList = ( List<?>)request.getAttribute("searchDataList");
 TableModel currTblMdl = (TableModel)request.getAttribute("tableModel");
 Page showPage = (Page)request.getAttribute("page");
 WebComponent wdf = FMPContex.webDataListFactory; 
 String opMode = (String)request.getAttribute("opMode");
 String checkBoxMode=(String)request.getAttribute("checkBoxMode"); 
 Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");
 boolean isCheckBoxMode = "true".equals(checkBoxMode);
 String queryString = request.getQueryString();
 String checkDisplay="";
if(!isCheckBoxMode){
	checkDisplay ="style='display:none'";
}
 %>
<html>
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<title> </title>

</head>
 
<body>

<div id="selectColDiv" visible=false>
	
</div>
 
<div align="left">
 
</div>
<%=wdf.getWebDataListCode(currTblMdl,searchDataList,showPage,checkDisplay,opMode) %>
</body>


<script id="needToReset_999" >
var deletedRowIds="";		//在页面删除的RID集合
var updateRowIds="";       //发生修改的RID集合
var InitRids="<%=wdf.getListFieldSet(searchDataList,"RID",",")%>";		//列表中的RID集合
var addRowIds="";		    //在页面新增加的RID集合
var freezeCondition = fmpEncodeUrlParam("${freezeCondition}");
var hiddenColumns="";
var dataListTableModelId="${tableModelId}";
var queryString = fmpDecodeUrlParam("<%=queryString%>");
var iframeIdx = "${iframeIdx}";

/**
 * 获取在列表刷新和加载是产生的结果集RID集合
 */
function getInitRidsFromDatalist(){
	return "<%=wdf.getListFieldSet(searchDataList,"RID",",")%>";
}

/**
 * 获取在列表刷新和加载时生成的固化查询条件串
 */
function getFreezeConditionFromDatalist(){
	return fmpEncodeUrlParam("${freezeCondition}");
}

//在列表中增加数据，并没有在数据库中增加
function sub_addDataInUpdateListMode(winObj){
	if(typeof winObj == "undefined"){
		winObj = window;
	}	
	var rdNum = getUID();//Math.random();
	var dataTable = document.getElementById("dataListBody");
	//dataTable.style.display = "none";
	var newTR = dataTable.insertRow();  
	addRowIds +=","+rdNum;
	setObjectDisplay("TR_NoRecord",false);
	<%
	Collection<TableField> col=currTblMdl.fields.values();
	for (Iterator itr = col.iterator();itr.hasNext();){
		
		String rid = "#FREEZERIDNUMFORREPLACE#";  //设定固定的RID，最后需要用随机数替换
		TableField tf = (TableField)itr.next();	
		if (!tf.getCreateInList()){
			continue;
		}		
		%>
		newTR.id = "rowid_"+rdNum;
		var newTD= newTR.insertCell(); 
		newTD.id = rdNum+"_<%=tf.getColName()%>";
		newTD.className = "td_field";
		newTD.width = "<%=tf.getTitleWidth()%>";
		newTD.onclick=new Function("RowClick('"+rdNum+"');");  
		<%
		if (tf.getHiddenInList()){
			out.println("newTD.style.cssText=\"display:none\";");
		}
		String sellText = null;
		String sellScript = null;
		if ("view".equals(opMode) || tf.getInputInList() == false){
			if (tf.getWebTypeExt().startsWith("money")
					||tf.getWebTypeExt().startsWith("number")
					||tf.getWebTypeExt().startsWith("decimal")
					||tf.getWebTypeExt().startsWith("percent")
				)
			{
				out.println("newTD.align =\"right\";");
			}			
			sellText = "<a id=\"a_"+tf.getColName()+"_rid_"+rid+"\">"+tf.getTransValue(detailDataMap)+"</a>";
			%>
			newTD.innerHTML = '<%=sellText%>'.replace(/<%=rid%>/g,rdNum);
			<%
			//out.println("newTD.innerHTML ='"+sellText+"'.replace(/"+rid+"/g,rdNum);");
		}else{
			WebComponent wff = FMPContex.webFieldFactory; 
			sellText = wff.getWebFieldSampleCodeWithoutScript("","_rid_"+rid,tf, "updateList", detailDataMap);
			//sellText += "<a id=\"a_"+tf.getColName()+"_rid_"+rid+"\">"+tf.getTransValue(detailDataMap)+"</a>";
			//增加错误输出的span
			//rtStr.append("<span id=\"errInfo_").append(tf.getColName()).append("#_#").append(record.get("RID")).append("\" style=\"color:red\"></span>");						
			//sellScript = wff.getWebFieldScript(tmptf, opMode, detailDataMap);
			//out.println("newTD.innerHTML ='"+sellText+"'.replace(/"+rid+"/g,rdNum);");
			%>
			var st = '<%=sellText%>'.replace(/<%=rid%>/g,rdNum);
			newTD.innerHTML = st;
			winObj.eval('<%=wff.getWebFieldScript("","_rid_"+rid,tf, opMode, detailDataMap)%>'.replace(/<%=rid%>/g,rdNum));<%
		}	
	}
	%>
	ejiaA1('ejiaA1','#FFFFFF','#f6f7f7','#f0f2fd','#ffe3a8');
	return rdNum;
}

//保存列表
function sub_saveDataList(){
	var form = document.getElementById("dataListForm");//document.forms[0];
	var result =checkAll(form);
	if(result){	
	       if (typeof(updateRowIds) == "undefined"){
	    	   updateRowIds = "";
	       }
	       if (typeof(addRowIds) == "undefined"){
	    	   addRowIds = "";
	       }
	       if (typeof(deletedRowIds) == "undefined"){
	    	   deletedRowIds = "";
	       }		
   		 XMLHttp.formSubmit(form,comUrl("SaveDataList?updateRids="+updateRowIds+"&addRids="+addRowIds+"&deleteRids="+deletedRowIds));
   		 doRefreshList();
   		 return true;
	}else{
		showMessage("MSG0099");  //  保存列表失败!
	}		     	
}

/**  
 * 多选框checkbox全选js函数
 */  
function checkboxall(obj){
	var boxs = document.getElementsByName("selectbox");
	for(var i=0;i<boxs.length;i++){
		if(obj.checked){
			boxs[i].checked=true; 
		}else{
			boxs[i].checked=false; 
		}
	}
}
 
</script>
<script type="text/javascript" id="needToReset_001">
 
if(typeof doOnDataListload != "undefined"){
	doOnDataListload("${tableModelId}");
	
}

if (document.getElementById("selectColDiv")){
	document.getElementById("selectColDiv").hide = function() {
		this.style.display = "none";
	};
}

//隐藏空列表的标签页
if(InitRids == ""){
	if (window.parent.document.getElementById("subModuleTab_"+dataListTableModelId+iframeIdx)){
		window.parent.document.getElementById("subModuleTab_"+dataListTableModelId+iframeIdx).style.display="none";
	}
}
 
</script>

</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 
 
