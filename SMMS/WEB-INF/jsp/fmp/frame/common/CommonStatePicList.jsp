<!-----------------------------------
* @文件描述：状态灯列表页面
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
 <%@ taglib prefix="s" uri="/struts-tags" %>
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
    List<?> searchDataList = ( List<?>)request.getAttribute("searchDataList");
    String productset =(String)request.getAttribute("productset");
    Page showPage = (Page)request.getAttribute("page");
    boolean isCheckBoxMode = false;    
    String isSubTbl = (String)request.getAttribute("isSubTbl");
    
    WebComponent wff = FMPContex.webFieldFactory; 
	int maxColumn = 2;
	String tdFormat = "<tr>";
	for (int i = 0; i < maxColumn; i++) {  //排版所需
		tdFormat = tdFormat + "<td width=\""+100/maxColumn+"%\"></td>";
	}
	tdFormat = tdFormat + "</tr>";    
 %>
<html>

<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<title></title>
<head>
	<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
	<script src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}.js" type="text/javascript" language="javascript"></script>
	<script src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}_List.js" type="text/javascript" language="javascript"></script>
    <input type="hidden" id="keyLimit" name="keyLimit" value="${keyLimit}"/>
<script type="text/javascript" >
    var tableModelId="${tableModelId}";
    var freezeCondition = fmpEncodeUrlParam("${freezeCondition}");
    var moduleId="${moduleId}";
    var caseRid="${caseRid}";
    var selectedCaseCode = "${CASECODE}";
    var queryString = "<%=queryString%>";
    var updateRowIds="";       //发生修改的RID集合
	function viewData() {
		if (selectedRid != null) {
			var url = "DoView?RID="+selectedRid+"&tableModelId=${tableModelId}";
			openWindow(url);
		} else {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
		}
	}
	function deleteData() {
		function delCallBack(msg){
			if (msg=="success"){
				showMessage("MSG0051");//成功删除！
				selectedRid=null;
				doRefreshList();
			}else{
				showMessage("MSG1052");//数据删除失败！
			}
		}
		if (selectedRid != null) {
			if (confirm("是否确认要删除？")) {
				var url = "DoDelete?RID="+selectedRid+"&tableModelId=${tableModelId}";
				comAjax(url,delCallBack);
				//window.location = url;
			}
		} else {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
		}
	}

	function addData(){
		var url = "DoAdd?";
    	if (document.getElementById("keyLimit")){
    		url = url + "&keyLimit=" +document.getElementById("keyLimit").value+"&tableModelId=${tableModelId}";
    	}		
		openWindow(url);
	}

	function updateData(){
		if (selectedRid != null) {
    		var url = "<%=rootPath%>/credit/caseManage/node/CrdCaseNodeBiz/DoBussiness?RID="+selectedRid;
    		openWindow(url);
			
/*			if (document.getElementById("keyLimit")){
                var url="DoUpdate?RID="+selectedRid+"&tableModelId=${tableModelId}&keyLimit=" +document.getElementById("keyLimit").value;
                openWindow(url);
				}else{
		var url = "DoUpdate?RID="+selectedRid+"&tableModelId=${tableModelId}";
		//alert(document.getElementById("keyLimit").value);
		openWindow(url);
				}*/
		} else {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
		}
	}	

	function updateNodeMsg() {
		if (selectedRid != null) {
			var url = "DoUpdate?RID="+selectedRid+"&tableModelId=${tableModelId}";
			openWindow(comUrl(url));
		} else {
			showMessage('MSG0001');//请在查询到的结果集中选择一条记录！
		}
	}


	
	function loadAll() {
		var url ="<%=rootPath%>/fmp/FrameBiz/StatePicDataList";
		url = comUrl(url);
		if (document.getElementById("detailId_NODENORMALDATE")) {
			url = url + "&search_hiddenfld_id_NODENORMALDATE="+document.getElementById("detailId_NODENORMALDATE").value;
		}
		if (document.getElementById("detailId_NODEACTUALDATE")){
			url = url + "&search_hiddenfld_id_NODENORMALDATE="+document.getElementById("detailId_NODENORMALDATE").value;
		} 

		if (document.getElementById("detailId_NODETYPECODE")){
			url = url + "&search_hiddenfld_id_NODETYPECODE="+document.getElementById("detailId_NODETYPECODE").value;
		}
       if(document.getElementById("detailId_NODESTATE")){
            url =url + "&search_hiddenfld_id_NODESTATE="+document.getElementById("detailId_NODESTATE").value;
	   }
       if(document.getElementById("detailId_PRODUCTS")){
           url =url + "&search_hiddenfld_id_PRODUCTCODE="+document.getElementById("detailId_PRODUCTS").value;
	   }
       if(document.getElementById("detailId_OVERDAYS")){
           url =url + "&search_hiddenfld_id_OVERDAYS="+document.getElementById("detailId_OVERDAYS").value;
	   }
       if(document.getElementById("detailId_ISCONFIRMD")){
           url =url + "&search_hiddenfld_id_ISCONFIRMD="+document.getElementById("detailId_ISCONFIRMD").value;
	   }
		loadDataListXML("listArea",url);//searchArea			 	
	};

	/*
	function doRefreshList(){
		refreshList();
	}
*/
	function refreshList(){
		loadAll();
		if(selectedRid !=null){
			selectedRid =null;
		}
	}

	loadAll();
</script>
</head>
<body>

<table style="width:50%;">
	<% 
		if (!"true".equals(isSubTbl) && currTblMdl.isHaveSearchFld()){
	%>
			<form>	
			<tr>
				<td>
				<div id="searchArea" style="width:800px">
					<div id="groupHeadDiv" class="groupHead_search" onclick="document.getElementById('searchDiv').style.display='';toggle($(this).next());"><img src="<%=rootPath%>/images/zscrd/Search.gif"></img><font>&nbsp;&nbsp;按条件查询</font></div>
					<div id="searchDiv" class="groupBody" > 
						<table id="search_tblid_<%=currTblMdl.getId() %>" name="search_tblname_<%=currTblMdl.getTblName() %>" class="d_search_table"  border="0">        
						<%=tdFormat%>
						<% 
						
						Collection<TableField> col=currTblMdl.fields.values();
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
									<input type="hidden" id='search_hiddenfld_id_<%=tf.getId() %>'  name='<%=tf.getColName() %>'/>
									<%=wff.getWebFieldCode(tf,request) %>
									</td>
							<%								
							}
						}
						%>
						
						
						
						
						
						</table>
							<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
							<table width="100%"  align="center"  class="searchTb">
								<tr>
									<td colspan="4">
									<div align="center">
										<input type="button" id="button_query" class="fbutton"  onclick="refreshList()" value="查询"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<input id="button_reset" class="fbutton" type="reset" value="重置"/>
									</div>
									</td>
								</tr>
							</table>
					</div>
				</div>
				</td>
			</tr>
 		</form>	
	<%
		}
	%> 		
		<tr>
			<td>
			<form id="dataListForm" style="vertical-align:top;">
				
					<div class="div_opperationArea" id="opperationArea" >
						
							<%
							List<TableOpperation> opList = (List<TableOpperation>)request.getAttribute("OperationList");
							
							for (Iterator i=opList.iterator();i.hasNext();){
								TableOpperation tblOp = (TableOpperation)i.next();
								%>
								<input class="h5button white medium" type="button" id="op_<%=tblOp.getId() %>" onclick="<%=tblOp.getOnClick()%>" value="<%=tblOp.getDesc() %>"></input>
								<%
							}
							%>
								
					</div>
					<div>
					 
						<div id="listArea"></div>
					 
					</div>
			</form>
			</td>
		</tr>
		<tr id="tr_buttonArea" style='display:none'>
			<td align="center">
			<br>
				<input type="button" id="DoSubmit" class="h5button green medium" value="提交办理" onclick="doSubmit();"></input>
			</td>
		</tr>
</table>
	
<script type="text/javascript">
	var productset = '${productset}';
	if(document.getElementById('detailId_PRODUCTS')){
		if(document.getElementById('detailId_PRODUCTS').options != null){
			document.getElementById('detailId_PRODUCTS').options.add(new Option("- - 请选择 - -",""));
		    var productsArr = productset.split(';');
		    for(var i=0;i<productsArr.length;i++){
		    	var products =productsArr[i].split(',');
		    	document.getElementById('detailId_PRODUCTS').options.add(new Option(products[1],products[0]));    	
		    }
		}
	}
    
	if("true"=='${submitMode}'){
	    setObjectDisplay("tr_buttonArea",true);
	}

    function doSubmit(){
    	if (confirm("此操作会自动保存列表，是否确定要提交？")) {
        	saveDataList(saveCallBackFunc);
        }
        function saveCallBackFunc(message){
    		var url=rootPath+"/credit/caseManage/caseInfo/CaseInfoBiz/doSubmitToTra?RID=${selectedRid}&CASECODE=${caseCode}&TRANSACTAREA=${transactArea}";
     		+"&ORGID="+CURR_ORGID;
    		comAjax(url,backCallSubmitToTra);
    		function backCallSubmitToTra(msg){
    			showMessage(message+msg);
    			doRefreshList();
    			closeWindow();
    		}
        }
    }
</script>
<script type="text/javascript">
if(typeof doOnload != "undefined"){
	doOnload();
}
var isStatePic = true ; //判断是否当前是单独打开的状态灯页面
if (typeof window.parent != "undefined"){
	//调用父级页面的自动调整高度函数
	if(typeof window.parent.autoResize != "undefined"){
		window.parent.autoResize('${iframeIdx}');
		isStatePic = false;
	}
}
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />
</body>
</html>

