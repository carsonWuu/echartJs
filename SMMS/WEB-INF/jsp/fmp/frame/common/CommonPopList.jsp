<!-----------------------------------
* @文件描述：通用pop列表页面
------------------------------------>
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
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%
	String rootPath=request.getContextPath();
	String moduleId=(String)request.getAttribute("moduleId");
    String queryString = request.getQueryString();
    TableModel currTblMdl = (TableModel)request.getAttribute("tableModel");
    List<?> searchDataList = ( List<?>)request.getAttribute("searchDataList");
    Page showPage = (Page)request.getAttribute("page");
    boolean isCheckBoxMode = false; 
    String isSubTbl = (String)request.getAttribute("isSubTbl");
    String showAllButton="";
    if((String)request.getAttribute("showAllButton")!=null){
    	 showAllButton = (String)request.getAttribute("showAllButton") ;
    }
    
    String closeButton="";
    if((String)request.getAttribute("closeButton")!=null){
    	closeButton = (String)request.getAttribute("closeButton") ;
    }
    
    WebComponent wff = FMPContex.webFieldFactory; 
	int maxColumn = 2;
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
var topWindow = getMainWindow();
//var currFrame = topWindow.frames['ifData'+currDivId];

 //alert("currDivId==========="+currDivId);
var dataObject = topWindow.dataObject;
topWindow.dataObject = null;
/*
if (currFrame != undefined){
	alert(topWindow.frames['ifData'+currDivId].abc);
	dataObject = $(topWindow.frames['ifData'+currDivId]).attr("dataObject");
}
*/
if (dataObject == null){
	showMessage("pop数据对象为空");
	//closeWindow();
}
 
	dataObject.trueValue = null;
	dataObject.dispValue = null;
 
    var tableModelId="${tableModelId}";
    var checkBoxMode = "${checkBoxMode}";
    var moduleId="${moduleId}";
    var popMode="${popMode}";
    queryString = "<%=queryString%>";
    var closeButton = "<%=closeButton%>";
    var canOpenDivWindow = false;
	function loadAll() {
		var url = "<%=rootPath%>/fmp/FrameBiz/SearchDataList?<%=queryString %>";
		loadDataListXML("listArea",comUrl(url));	
	};

	loadAll();
	
</script>
</head>
<body>

<table width="700px">
	<% 
		if (!"true".equals(isSubTbl) && currTblMdl.isHaveSearchFld()){
	%>
	<tr>
		
		<td>
		<form>
		<div id="searchArea">
		<div id="groupHeadDiv" class="groupHead_search"
			onclick="document.getElementById('searchDiv').style.display='';toggle(document.getElementById('searchDiv'))"><img
			src="<%=rootPath%>/images/zscrd/Search.gif"></img><font>&nbsp;&nbsp;按条件查询</font></div>
		<div id="searchDiv" class="groupBody" style="display: 'none'";>
				
		<table id="search_tblid_<%=currTblMdl.getId() %>"
			name="search_tblname_<%=currTblMdl.getTblName() %>"
			class="d_search_table" border="0">
			<%=tdFormat%>
			<% 
							
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
										<% if (tf.getIsRangeSearch()){%>
											<input type="hidden" id='search_hiddenfld_id_$B$<%=tf.getId() %>'  name='$B$<%=tf.getColName() %>'/>
											<input type="hidden" id='search_hiddenfld_id_$E$<%=tf.getId() %>'  name='$E$<%=tf.getColName() %>'/>
										<%}else{ %>
											<input type="hidden" id='search_hiddenfld_id_<%=tf.getId() %>'  name='<%=tf.getColName() %>'/>
										<%} %>
										
										<%=wff.getWebFieldCode(tf,request) %>
										</td>
									<%								
								}
							}
				%>
			
		</table>
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<table width="100%" align="center" class="searchTb">
			<tr>
				<td colspan="4">
				<div align="center"><input type="button" id="button_query"
					class="h5button green small" onclick="doQuery()" value="查询" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input id="button_reset" class="h5button green small" type="reset"
					value="重置" /></div>
				</td>
			</tr>
		</table>
        </div>
		</div>
		</form>
		</td>
		
	</tr>
	<%
		}
	%>
	<tr>
		<td>
		<div class="div_opperationArea" id="opperationArea"><a href="#"
			class="h5button white medium" onclick="setValues()">确认选择</a> <a
			href="#" class="h5button white medium" onclick="cancelValues()">清空选择</a>

		<%
	          if(showAllButton.equals("true")){
	         %> <a href="#" class="h5button white medium"
			onclick="setAllValues()">全部选择</a> <%
	           }
	         %> <a href="#" class="h5button white medium"
			onclick="JavaScript:closeWindow()">取消</a> <input type="hidden"
			id="all" name="all" value="[ALL]" /> <input type="hidden"
			id="trans_all" name="trans_all" value="[全部]" /> <%
	          if(closeButton.equals("true")){
	        %> <a href="#" class="h5button white medium"
			onclick="JavaScript:closeWindow()">关闭</a> <%
	           }
	         %>
		</div>
		
		</td>
	</tr>
</table>
<div 
	style="overflow-x: auto; width: 100%; padding-left: 3px; padding-right: 5px border-width: 0 1px 2px 1px; 
			border-style: solid;
			border-color:  #e0e0e0;  ">
<div id="listArea">数据加载中...</div>
<br>
<br>
<br>
</div>
<br>
<br>
 
<script type="text/javascript">
	var keyList=[
<%
	for (Iterator i = col.iterator();i.hasNext();){
		TableField tf = (TableField)i.next();
		out.append("'").append(tf.getColName()).append("',");
	}
	out.append("'']");
%>

	function setAllValues(){
		setSinOrgPopValue();
	}
	   
  
	function setValues(){
	    if(popMode =='multiVPop'){
	    	setMultiValue(keyList);
	    }else if(popMode =='checkPop') {
	        setCheckValue();
        }else if(popMode=='singleVPop'){
	    	setSingieValue();
	    }else if(popMode=='STATPop'){
	    	setSTATValue();
	    }else if(popMode=='checkSinPop'){
	    	setCheckSinValue();
	    }else if (popMode=='checkPopWithCallBackFunc'){
		    setSelectedDataList();
		}
	}
 
  
  
	function cancelValues(){
	
	    if(popMode =='multiVPop'){
	    	canMultiValue(keyList);
	    }else{
	    	dataObject.trueValue = '';
	    	dataObject.dispValue = '';  
			if (typeof dataObject.backCall != "undefined"){
				dataObject.backCall();
			}	    		
	    	closeWindow();  	 	    	 
        }

	}

	  /**  
	   *  处理显示信息
	   */  
	function setSingieValue() {   
		var sid = dataObject.sid;
		var sname = dataObject.sname;
		if(selectedRid==null){
		 showMessage("MSG0050");//请先在列表中选择一条记录！
		 return;
		}

		dataObject.trueValue = getDataListTrueValue(selectedRid,sid);   
		dataObject.dispValue = getDataListDisplayValue(selectedRid,sname); 
		if (dataObject.listMap){
			var listMap = dataObject.listMap;
			if(selectedRid==null){
				showMessage("MSG0050");//请先在列表中选择一条记录！
				return;
			}		 
			for(i= 0;i<keyList.length;i++){
				if(keyList[i]!=0){
					if(document.getElementById(selectedRid+'_'+keyList[i])!=null){
						listMap.put('disp_'+keyList[i],getDataListDisplayValue(selectedRid,keyList[i])); 
						listMap.put(keyList[i],getDataListTrueValue(selectedRid,keyList[i])); 
					}
				}
			}
		}	
		if (typeof dataObject.backCall != "undefined"){
			dataObject.backCall();
		}
		closeWindow();   
	}
 
	 function setMultiValue(keyList) {   
		 var listMap = dataObject.listMap;
		 if(selectedRid==null){
			 showMessage("MSG0050");//请先在列表中选择一条记录！
			 return;
		 }		 
		 for(i= 0;i<keyList.length;i++){
			 if(keyList[i]!=0){
				 if(document.getElementById(selectedRid+'_'+keyList[i])!=null){
					 listMap.put('disp_'+keyList[i],getDataListDisplayValue(selectedRid,keyList[i])); 
					 listMap.put(keyList[i],getDataListTrueValue(selectedRid,keyList[i])); 
				 }
			 }
		 }
		if (typeof dataObject.backCall != "undefined"){
			dataObject.backCall();
		}		 
		closeWindow();   
	 }
	 
	 
	 function canMultiValue(keyList) {   
		 var listMap = dataObject.listMap;
		 for(i= 0;i<keyList.length;i++){
			 if(keyList[i]!=0){
				 listMap.put(keyList[i],''); 
				 listMap.put('disp_'+keyList[i],'');
			 }
		 }
			if (typeof dataObject.backCall != "undefined"){
				dataObject.backCall();
			}		 
		 closeWindow();   
	 }
	 

	 function setSTATValue(){
		 if(selectedRid==null){
			 showMessage("MSG0050");//请先在列表中选择一条记录！
			 return;
		 }
		 var tableModelId = dataObject.tableModelId;
		 if(tableModelId =='SDept'){
	  		dataObject.trueValue = document.getElementById(selectedRid+'_DEPTID').innerText;   
	  		dataObject.dispValue = document.getElementById(selectedRid+'_DEPTNAME').innerText; 
		 }else if(tableModelId =='SUser')
		 {
			  //却掉第一个字符为空格的字符串,add by hyc
			  var s=document.getElementById(selectedRid+'_USERID').innerText
			  if (s.substr(0,1)==' ')
				   s=s.substr(1);
			  dataObject.trueValue = s;   
			  dataObject.dispValue = document.getElementById(selectedRid+'_USERNAME').innerText;
		 }else if(tableModelId =='SOrg'){
	  		dataObject.trueValue = document.getElementById(selectedRid+'_ORGID').innerText;   
	  		dataObject.dispValue = document.getElementById(selectedRid+'_ORGNAME').innerText; 
		 }else if(tableModelId =='SRole'){
			 dataObject.trueValue = document.getElementById(selectedRid+'_ROLEID').innerText;   
			 dataObject.dispValue = document.getElementById(selectedRid+'_ROLENAME').innerText; 
		}else if(tableModelId =='SPost'){
			 dataObject.trueValue = document.getElementById(selectedRid+'_POSTID').innerText;   
			 dataObject.dispValue = document.getElementById(selectedRid+'_POSTNAME').innerText; 
		}
			if (typeof dataObject.backCall != "undefined"){
				dataObject.backCall();
			}		 
		 closeWindow();  
	 }
	 
	 
	 
	 function setSinOrgPopValue(){	 
		 dataObject.trueValue = document.getElementById("all").value;   
		 dataObject.dispValue = document.getElementById("trans_all").value;  
			if (typeof dataObject.backCall != "undefined"){
				dataObject.backCall();
			}		 
		 closeWindow();  
	}
	  

	  /**  
	   * 根据超连接传入的隐藏域和显示域的字段ID，返回逗号分割的隐藏域和显示域信息
	   */ 
	  function setCheckSinValue() {  
		  var fieldId = dataObject.fieldId;
		  var fieldName = dataObject.fieldName;
			  var boxs = document.getElementsByName("selectbox");
			  var selectfieldName = "";
			  var selectfieldId="";
	        var cheaked=false;
			  for(var i=0;i<boxs.length;i++){
				   if(boxs[i].checked){
						  var selectedRid = boxs[i].id.substring(4);
						
						  selectfieldName =selectfieldName+","+document.getElementById(selectedRid+'_'+fieldName).innerText;
						  selectfieldId =selectfieldId+","+document.getElementById(selectedRid+'_'+fieldId).innerText;
					cheaked=true;
				  }
				
		     }
			  if(cheaked==false){
				  showMessage("MSG0063");//您至少要选择一条记录！
				  return;
			  }
			  
			  var returnSelectfieldName = selectfieldName.substring(1);
			  var returnSelectfieldId = selectfieldId.substring(1);
			  dataObject.dispValue = returnSelectfieldName;
			  dataObject.trueValue= returnSelectfieldId;
				if (typeof dataObject.backCall != "undefined"){
					dataObject.backCall();
				}			  
			  closeWindow();   
	}
	  
	  /**  
	   * 根据超连接传入的字段ID，返回逗号分割域数据信息
	   */ 	  
	function setCheckValue() {   
		var fieldName = dataObject.fieldName;
		var boxs = document.getElementsByName("selectbox");
		var selectStr = "";
		var cheaked=false;
		for(var i=0;i<boxs.length;i++){
			if(boxs[i].checked){
				var selectedRid = boxs[i].id.substring(4);
				selectStr =selectStr+","+document.getElementById(selectedRid+'_'+fieldName).innerText;
				cheaked=true;
			}
		}
		if(cheaked==false){
			showMessage("MSG0063");//您至少要选择一条记录！
			return;
		}
			//  alert(selectStr.substring(1));
		var returnSelectStr = selectStr.substring(1);
		dataObject.trueValue = returnSelectStr;   
		if (typeof dataObject.backCall != "undefined"){
			dataObject.backCall();
		}		
		closeWindow();   
	}
 
 

	/**
	*  多选框设置返回参数，组织返回结果集
	*/
	function setSelectedDataList(){
	      var boxs = document.getElementsByName("selectbox");
	      var cheaked =false;
	      dataObject.recordCount = 0;   
	      dataObject.record = new Array();

	      if (checkBoxMode == "false"){
	      		dataObject.recordCount = 1;   //对于单选框的选择，这里设置为1
	    	    var listMap = new Map();	
				for(var j= 0;j<keyList.length;j++){
					if(selectedRid==null){
						showMessage("MSG0050");//请先在列表中选择一条记录！
						return;
					}
					if(keyList[j]!=0){
						if(document.getElementById(selectedRid+'_'+keyList[j])!=null){
							listMap.put('disp_'+keyList[j],getDataListDisplayValue(selectedRid,keyList[j])); 
							listMap.put(keyList[j],getDataListTrueValue(selectedRid,keyList[j])); 
							//alert(getDataListTrueValue(selectedRid,keyList[j]));
						}
					}
				}
				dataObject.record[dataObject.record.length]= listMap;	
				cheaked=true;
		  }else{
			  for(var i=0;i<boxs.length;i++){
				   if(boxs[i].checked){
					   	dataObject.recordCount += 1;
						selectedRid = boxs[i].id.substring(4);
						var listMap = new Map();				
						for(var j= 0;j<keyList.length;j++){
							if(selectedRid==null){
								showMessage("MSG0050");//请先在列表中选择一条记录！
								return;
							}
							if(keyList[j]!=0){
								if(document.getElementById(selectedRid+'_'+keyList[j])!=null){
									listMap.put('disp_'+keyList[j],getDataListDisplayValue(selectedRid,keyList[j])); 
									listMap.put(keyList[j],getDataListTrueValue(selectedRid,keyList[j])); 
								}
	
								
								//if(document.getElementById(selectedRid+'_'+keyList[j])!=null){
								//	listMap.put(keyList[j],document.getElementById(selectedRid+'_'+keyList[j]).innerText); 
								//}
							}
						}
						dataObject.record[dataObject.record.length]= listMap;	
						cheaked=true;
				  }
		      }
		  }
		  if(cheaked==false){
			  showMessage("MSG0063");//您至少要选择一条记录！
			  return;
		  }
	
		  if (closeButton=="true"){
	      		dataObject.opener.addDataRow(dataObject);	
	      }else{ 
	  		if (typeof dataObject.backCall != "undefined"){
				dataObject.backCall();
			}		      
	      		closeWindow();
	      }
	}

	var searchDivObj = document.getElementById("searchArea");
	if (searchDivObj) {
		searchDivObj.onkeydown = function(e){
			var e = e||event;
			if (e.keyCode == 13) {
				doQuery();
			}
		}
	}	

	function RowDBLClick(rid){
		setValues();
	}

</script>

</body>
</html>
<jsp:include
	page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />
