
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="com.zstar.fmp.utils.Page"%>
<%@ page import="com.opensymphony.xwork2.ActionContext"%>
<%@ page import="java.util.Collection"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ page import="java.util.List"%>
<%@ page import="com.zstar.fmp.utils.Page"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableOpperation"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="java.util.List"%>
<%
	String rootPath=request.getContextPath();
    String moduleId=(String)request.getAttribute("moduleId");
    String queryString = request.getQueryString();
    TableModel currTblMdl = (TableModel)request.getAttribute("tableModel");
    String moduleDesc = currTblMdl.getDesc();
    //List<?> searchDataList = ( List<?>)request.getAttribute("searchDataList");
    Page showPage = (Page)request.getAttribute("page");
    boolean isCheckBoxMode = false;    
    String isSubTbl = (String)request.getAttribute("isSubTbl");
    String isUpdateListMode = (String)request.getAttribute("isUpdateListMode"); 
    
    WebComponent wff = FMPContex.webFieldFactory; 
	int maxColumn = currTblMdl.getSearchColCount();
	String tdFormat = "<tr>";
	for (int i = 0; i < maxColumn; i++) {  //排版所需
		tdFormat = tdFormat + "<td width=\""+100/maxColumn+"%\"></td>";
	}
	tdFormat = tdFormat + "</tr>";    
	Collection<TableField> col=currTblMdl.fields.values();
 %>

<html>

<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<title></title>
<head>
<jsp:include
	page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}.js"
	type="text/javascript" language="javascript"></script>
<script
	src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}_List.js"
	type="text/javascript" language="javascript"></script>
<input type="hidden" id="keyLimit" name="keyLimit" value="${keyLimit}" />
<script type="text/javascript"> 
	var isOrgUser = "${isOrgUser}";//判断是否机构用户
</script>

<script type="text/javascript" >
    var tableModelId="${tableModelId}";
    var mainRid="${mainRid}";
    var mainTableModelId="${mainTableModelId}";
    var freezeCondition = fmpEncodeUrlParam("${freezeCondition}");
    var moduleId="${moduleId}";
    var isUpdateListMode = "${isUpdateListMode}";
    var queryString = "<%=queryString%>";
    var moduleDesc = "<%=moduleDesc%>";
    var dataListScriptReLoaded = false; //列表的js是否已经重新加载
    var checkBoxMode = "${checkBoxMode}";


    function goback(){
    	history.go(-1);
    }
    //打开审批界面
	function approveViewData(reportTempId) {
		if (selectedRid != null) {
			var url = "DoApproveView?RID="+selectedRid;
			if(reportTempId){
				url +="&REPORTTEMPID="+reportTempId;
			}
			openWindow(comUrl(url),moduleDesc+"-流程审批");
		} else {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
		}
	};

	//打开审批历史界面
	function approveHisViewData(showOpMode,reportTempId) {
		if (selectedRid != null) {
			var url = "DoApproveHisView?RID="+selectedRid;
			if(reportTempId){
				url +="&REPORTTEMPID="+reportTempId;
			}
			if(showOpMode){
				url+="&showOpMode="+showOpMode;
				openWindow(comUrl(url),moduleDesc+"-流程复议");
			}else{
				openWindow(comUrl(url),moduleDesc+"-流程历史");
			}
		} else {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
		}
	};

	//通用的查看数据操作
	function viewData() {
		if (selectedRid != null) {
			var url = "DoView?RID="+selectedRid;
			openWindow(comUrl(url),moduleDesc+"-查看");
		} else {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
		}
	};

	//通用打印界面
	function printView() {
		if (selectedRid != null) {
			var url = "PrintView?RID="+selectedRid+"&isPrintView=false";
			openWindow(comUrl(url),moduleDesc+"-打印");
		} else {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
		}
	};

	//通用删除操作
	function deleteData() {
		if (selectedRid != null) {
			if (confirm("是否确认要删除？")) {						
				var url = "DoDelete?RID="+selectedRid;
				comAjax(comUrl(url),delCallBack);
			}
		} else {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
		}
		
		function delCallBack(msg){
			if (msg=="success"){
				selectedRid=null;
				doRefreshList();
				if(typeof doAfterDelete!='undefined'&& doAfterDelete instanceof Function){          
					doAfterDelete(); 
				}
			}else{
				showMessage("MSG1052");//数据删除失败！
			}
		}		
	};

	//通用新增操作
	function addData(){
		var url = "DoAdd";
		openWindow(comUrl(url),moduleDesc+"-新增");
	};

	//通用修改操作
	function updateData(){
		if (selectedRid != null) {
            var url= "DoUpdate?RID="+selectedRid;
            openWindow(comUrl(url),moduleDesc+"-修改");
		} else {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
		}
	};	

	//通用在可编辑列表中插入数据的操作
	function addDataInUpdateListMode(){
		return sub_addDataInUpdateListMode(window);
	};

	//通用保存列表的操作
	function saveDataList(){
		return sub_saveDataList();
	};


	//通用加载列表数据操作
	function loadAll() {
		var url = "<%=rootPath%>/fmp/FrameBiz/SearchDataList?<%=queryString %>";
		loadDataListXML("listArea",comUrl(url),null,reLoadDataListScript);		
	};

	//通用刷新列表操作
	function refreshList(selectedTableModelId){
		if(selectedTableModelId){
			reloadWindow("&selectedTableModelId="+selectedTableModelId);//用于刷新tab标签,刷新后选中指定标签页 
		}else{
			goPage(getCurrentPage());//getCurrentPage()
		}
		if(selectedRid !=null){
			selectedRid =null;
		}
	};

	//通用重新加载列表js脚本的操作
	function reLoadDataListScript(winObj){
		if (dataListScriptReLoaded == false){
			dataListScriptReLoaded = true; 			
			var scripts = document.getElementsByTagName("script");
			for (var i=0;i<scripts.length;i++){
				if (typeof(scripts[i].id) != "undefined"){
					if (scripts[i].id.indexOf("needToReset_", 0)>-1 || 
							scripts[i].id.indexOf("dataListFldScript_", 0)>-1){
						winObj.eval(scripts[i].text);
					}
				}
				//winObj.eval(scripts[i].text);
				//winObj.eval(document.getElementById("addToListScript").text);
			}			
			
		}	
	};

	loadAll();

	/**
	*  多选框设置返回参数，组织返回结果集
	*/
	function setSelectedDataList(){
	      var boxs = document.getElementsByName("selectbox");
	      var cheaked =false;
	      var selectedDataList =  new Array();
	      var recordCount = 0 ;
	      if (checkBoxMode == "true"){
				  for(var i=0;i<boxs.length;i++){
					   if(boxs[i].checked){
							selectedRid = boxs[i].id.substring(4);
							var listMap = new Map();				
							for(var j= 0;j<keyList.length;j++){
								if(selectedRid==null){
									showMessage("MSG0050");//请先在列表中选择一条记录！
									return null;
								}
								if(keyList[j]!=0){
									if(document.getElementById(selectedRid+'_'+keyList[j])!=null){
										listMap.put('disp_'+keyList[j],getDataListDisplayValue(selectedRid,keyList[j])); 
										listMap.put(keyList[j],getDataListTrueValue(selectedRid,keyList[j])); 
									}
								}
							}
							selectedDataList[recordCount] = listMap;
						    recordCount += 1;
							cheaked=true;
					  }
			      }				
		  }else{
	    		var listMap = new Map();	
				for(var j= 0;j<keyList.length;j++){
					if(selectedRid==null){
						showMessage("MSG0050");//请先在列表中选择一条记录！
						return null;
					}
					if(keyList[j]!=0){
						if(document.getElementById(selectedRid+'_'+keyList[j])!=null){
							listMap.put('disp_'+keyList[j],getDataListDisplayValue(selectedRid,keyList[j])); 
							listMap.put(keyList[j],getDataListTrueValue(selectedRid,keyList[j])); 
						}
					}
				}
				selectedDataList[0] = listMap; //对于单选框的选择
				cheaked=true;
		  }
		  if(cheaked==false){
			  showMessage("MSG0063");//您至少要选择一条记录！
			  return null;
		  }
	
			return selectedDataList;
	}
	var keyList=[
<%
	for (Iterator i = col.iterator();i.hasNext();){
		TableField tf = (TableField)i.next();
		out.append("'").append(tf.getColName()).append("',");
	}
	out.append("'']");
%>

	var searchDivObj = document.getElementById("searchDiv");
	if (searchDivObj) {
		searchDivObj.onkeydown = function(e){
			var e = e||event;
			if (e.keyCode == 13) {
				doQuery();
			}
		}
	}
	
</script>
</head>
<body onload="">

<input type="hidden" name="opMode" value="${opMode}" id="opMode" />
<input type="hidden" name="isSubTbl" value="${isSubTbl}" id="isSubTbl" />
<% 
if (!"true".equals(isSubTbl) && currTblMdl.isHaveSearchFld()){
%>
<form id="searchConditionForm">
<table>
	<tr>

		<td>
		<div id="searchArea" style="width: 800px">
		<div id="groupHeadDiv" class="groupHead_search"
			onclick="document.getElementById('searchDiv').style.display='';toggle(document.getElementById('searchDiv'))"><img
			src="<%=rootPath%>/images/zscrd/Search.gif"></img><font>&nbsp;&nbsp;按条件查询</font></div>
		<div id="searchDiv" class="groupBody" style="display: 'none'";>
		
		
		<table style="width: 800px" >
			<tr>
				<td>
					<table id="search_tblid_<%=currTblMdl.getId() %>"
						name="search_tblname_<%=currTblMdl.getTblName() %>"
						class="d_search_table" border="0">
						<%=tdFormat%>
						<% 
									
									//Collection<TableField> col=currTblMdl.fields.values();
									int span = 0;
									
									for (Iterator i = col.iterator();i.hasNext();){
										TableField tf = (TableField)i.next();
										if (tf.getIsSearch()){
											span = span + (tf.getColSpan());
											if (span > maxColumn) {
												span = tf.getColSpan();
												%>
						</tr>
						<tr>
							<%											
											}
											%>
							<td colspan="<%=tf.getColSpan()%>">
							<% if (tf.getIsRangeSearch()){%> <input type="hidden"
								id='search_hiddenfld_id_$B$<%=tf.getId() %>'
								name='$B$<%=tf.getColName() %>' /> <input type="hidden"
								id='search_hiddenfld_id_$E$<%=tf.getId() %>'
								name='$E$<%=tf.getColName() %>' /> <%}else{ %> <input type="hidden"
								id='search_hiddenfld_id_<%=tf.getId() %>'
								name='<%=tf.getColName() %>' /> <%} %> <%=wff.getWebFieldCode(tf,request) %>
							</td>
							<%								
										}
									}
									%>
						
					</table>
			</td>
	        <td>
					<div align="center">
					<input type="button" id="button_query"
						class="h5button green small" onclick="doQuery()" value="查询" />
					<input id="button_reset" class="h5button orange small" type="reset" value="重置" />
					</div>
	 
			</td>
		</tr>
		</table>
		</div>
		</div>
		</td>

	</tr>

</table>
</form>
<%
}
%>
<form id="dataListForm">
<table class="table_buttonAndList">
	<tr>
		<td width="1%" valign="bottom"><img
			src="<%=rootPath%>/images/selectcols.gif"
			onclick="showColumnSelector();"></img></td>
		<td width="100%">
		<div class="div_opperationArea" id="opperationArea">
		<%
					List<TableOpperation> opList = (List<TableOpperation>)request.getAttribute("OperationList");
					
					for (Iterator i=opList.iterator();i.hasNext();){
						TableOpperation tblOp = (TableOpperation)i.next();
						%> 
					<input type="button" id="op_<%=tblOp.getId() %>"
						class="h5button white medium" onclick="if (checkOpperation('op_<%=tblOp.getId() %>')){<%=tblOp.getOnClick()%>}" value="<%=tblOp.getDesc() %>" />							

			<%
					}
					 
             %>
					
		</div>
		</td>
	</tr>
	<tr>

		<td colspan=2> <!-- a class="button1 blue" href="#" onclick="" >打开图表</a>   -->
		<div id="listArea">数据加载中...</div>
		</td>
	</tr>
</table>
</form>
<script type="text/javascript">
	toggle(document.getElementById('searchDiv'));
	if(typeof doOnload != "undefined"){
		doOnload();
	}
	if (typeof window.parent != "undefined"){
		//调用父级页面的自动调整高度函数
		if(typeof window.parent.autoResize != "undefined"){
			window.parent.autoResize('${iframeIdx}');
		}
	}
	
</script>
<jsp:include
	page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />
</body>
</html>

