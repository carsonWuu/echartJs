
<!-----------------------------------
* @文件描述：通用新增页面
------------------------------------>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Collection"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.opensymphony.xwork2.ActionContext"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.SubTableModelLink"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableOpperation"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%
	String rootPath = request.getContextPath();
	String moduleId=(String)request.getAttribute("moduleId");
	String queryString = request.getQueryString();
%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>

<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<input type="hidden" id="keyLimit" name="keyLimit" value="${keyLimit}"/>
<%
	TableModel currTblMdl = (TableModel) request.getAttribute("tableModel");
	Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");
	String tableModelId = currTblMdl.getId();
	String isUpdateListMode = "false";  
	String moduleDesc = currTblMdl.getDesc();
	Map<String,SubTableModelLink> subTableModels = (Map<String,SubTableModelLink>) request.getAttribute("subTableModels");
%>
<script src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}_Add.js" type="text/javascript" language="javascript"></script>
<title><%=moduleDesc%>-新增</title>
</head>
<body onload="">
    
<table class="tab_table">
<tr>
<td>
<div id="con">
<ul id="tags">
	<li class="selectTag"><a id="moduleTitle_<%=tableModelId %>" onclick="selectTag('tagContent0',this)"
		href="javascript:void(0)"><%=moduleDesc%></a></li>
</ul>
</div>
</td>
</tr>
<tr>
<td>
<div id="tagContent">
<div class="tagContent selectTag" id="tagContent0">

<form id="DoAdd" name="DoAdd" method="post">
<% 
	Map<String,Object> extDataMap = (Map<String,Object>)request.getAttribute("extDataMap");
	if (extDataMap != null){
		for (String key:extDataMap.keySet()){
			
			%>
			<input type="hidden" name="<%="extData::"+key %>" value="<%=extDataMap.get(key) %>" id="<%="extData::"+key %>" />
			<%
		}
	}
%>
<input type="hidden" name="tableModelId" value="${tableModelId}" id="tableModelId" />
<input type="hidden" name="moduleId" value="${moduleId}" id="moduleId" />
	<%
		WebComponent wff = FMPContex.webFieldFactory;
		int maxColumn = 2;
		String tdFormat = "<tr>";
		for (int i = 0; i < maxColumn; i++) {  //排版所需
			tdFormat = tdFormat + "<td width=\""+100/maxColumn+"%\"></td>";
		}
		tdFormat = tdFormat + "</tr>";
		//Map dataMap = new HashMap();
	%>
   <jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/DataDetail.jsp" />
		
    <table width="100%">	
		<tr>
			<td>
<%
	int idx = 1;
	if (subTableModels != null){
		for (Iterator it = subTableModels.values().iterator(); it.hasNext(); idx++) {
			SubTableModelLink subTbl = (SubTableModelLink) it.next();
			if (subTbl.isUpdateListMode()){
	%>
				<div>
				<div class="groupHead" onclick="toggle($(this).next())"><%=subTbl.getSubModuleName() %></div>
				<div class="groupBody" > 
					<table class="table_buttonAndList">
						<tr>
							<td>				
								<div id="opperationArea">
									<div align="left">
										<%
										List<TableOpperation> opList = subTbl.getOpperationList();
										if (opList != null){
											for (Iterator i=opList.iterator();i.hasNext();){
												TableOpperation tblOp = (TableOpperation)i.next();
												%>
												<input class="h5button blue small" type="button" id="op_<%=tblOp.getId() %>" onclick="<%=tblOp.getOnClick()%>" value="<%=tblOp.getDesc() %>"></input>
												<%
											}
										}
										%>
									 
									</div>		
								</div>
							</td>
						</tr>
						<tr>
							<td>
							<div  style="overflow-x:auto;width: 945px;padding-right: 25px">
								<div id="updateListDiv" class="div_updateList" ></div>
								</div>
							</td>
						</tr>
					</table>						
					<script>
						var url = "<%=rootPath%><%=subTbl.getSubTableModelListUrl(detailDataMap)%>&isSubTbl=true&opMode=${opMode}&isUpdateListMode=true";
						loadDataListXML("updateListDiv",comUrl(url));				
					</script>
					<!--  
						<iframe
							src="<%=rootPath%><%=subTbl.getSubTableModelListUrl(detailDataMap)%>&isSubTbl=true&opMode=${opMode}&isUpdateListMode=true"
							id="infoFrame_<%=subTbl.getSubTableModelId()%>" overflow-x="no"
							frameborder="0" scrolling="auto" height="350px" width="100%">
						</iframe>	
					-->		
				</div>
				</div>
	<%
				isUpdateListMode = "true";
				break;
			}
		}
	}
%>			
			</td>
		</tr>		
		
		<tr id="tr_buttonArea">
			<td align="center" >
			<br>
			<div  class="div_detailButton"  align="center">
 
				
				<input class="h5button green medium"  type="button" id="DoAddSave" value="保存" onclick="doSubmit();"></input>
				<input class="h5button green medium"  type="button" id="DoAddSaveClose" value="保存后关闭" onclick="doSubmit(true);"></input>
				<input class="h5button orange medium"  type="reset" id="addResetButton" value="重置" />
				<!--<input type="button" id="DoClose" class="detailbutton" value="关闭" onclick="closeWindow();"></input>-->
				
			</div>
			<br>
			</td>
		</tr>
	</table>
</form>
</div>
</div>
</td>
</tr>
</table>
<script type="text/javascript">
var tableModelId="${tableModelId}";
var freezeCondition = "${freezeCondition}";
var mainTableModelId="${mainTableModelId}";
var mainRid="${mainRid}";
var moduleId="${moduleId}";

function doSubmit(canclose){
		var form = document.forms[0];//document.getElementById("DoAdd");
		var result =checkAll(form);
		if (result){
			if (typeof(preSave) != "undefined"){
				result = preSave("add");
			}
		}
		if(result){
			var submitUrl = "";
		       <%
		       if ("true".equals(isUpdateListMode)){   //如果是联合从表模式
		    	   %>
				       if (typeof(updateRowIds) == "undefined"){
				    	   updateRowIds = "";
				       }
				       if (typeof(addRowIds) == "undefined"){
				    	   addRowIds = "";
				       }
				       if (typeof(deletedRowIds) == "undefined"){
				    	   deletedRowIds = "";
				       }	
				       submitUrl = comUrl("SaveUniteSubTableList?updateRids="+updateRowIds+"&addRids="+addRowIds+"&deleteRids="+deletedRowIds);
				       //form.action = comUrl("SaveUniteSubTableList?updateRids="+updateRowIds+"&addRids="+addRowIds+"&deleteRids="+deletedRowIds);	
		    	   <%
		       }else{		
		    	   %>
		    	   submitUrl = comUrl("AddSave");
		    	   		//window
		    	   	   //form.action = "AddSave";
		    	   <%
		       }
		       %>	
		       document.getElementById("DoAddSave").disabled = true; 
		       document.getElementById("DoAddSaveClose").disabled = true;
		       
		       XMLHttp.formSubmit(form,submitUrl,addSaveBackCall);
			//form.submit();
				function addSaveBackCall(msg){
					if (msg.substr(0,4) == "RID="){
						var rid = msg.substr(4);
						if(typeof doAfterSubmit!='undefined'&& doAfterSubmit instanceof Function){          
							doAfterSubmit(); 
						}else{						
							showMessage("MSG0054");//新增数据成功！
							doRefreshList();
							if (canclose){
								closeWindow();
							}
						}
						location.href = comUrl("DoUpdate?RID="+rid);
					}else{
						showMessage(msg);
						document.getElementById("DoAddSave").disabled = false; 
					}
					
				}
		}
}  

//通用在可编辑列表中插入数据的操作
function addDataInUpdateListMode(){
	return sub_addDataInUpdateListMode(window);
};

//通用保存列表的操作
function saveDataList(){
	return sub_saveDataList();
};


if(typeof doOnload != "undefined"){
	doOnload();
}

/**
 * 自动调整高度函数
 *在子页面调用此函数，通过在本页面传入的iframeId定位子窗口所属的iframe所在的div

function autoResize(iframeIdx){
	var tagObj = document.getElementById("tagContent"+iframeIdx);
	if (tagObj){
		if(tagObj.style.height){
			tagObj.style.height = (document.body.offsetHeight - 80)+"px";
		}
	}
	var ifrObj = document.getElementById("infoFrame_"+iframeIdx);
	if (ifrObj){
		ifrObj.style.width = (document.body.offsetWidth - 60)+"px";
	}
}



function onResize(){
	for (var i = 0;i<50;i++){
		var tagObj = document.getElementById("tagContent"+i);
		if (tagObj){
			if(tagObj.style.height){
				tagObj.style.height = document.body.offsetHeight - 80;
			}
		}else{
			return;
		}
	}
}
*/
//调整DIV窗口的高度
function fixDivWindow(){
	var divWinId = getMainWindow().divCount;
	//窗口内容IDV
	var winObj = getMainWindow().document.getElementById("winContent"+divWinId);
	//div窗口
	var winDiv = getMainWindow().document.getElementById("winDiv"+divWinId);
	//框架页
	var ifObj = getMainWindow().document.getElementById("ifData"+divWinId);

	if (winObj){
		//计算子窗体高度
		var calHeight=(document.body.offsetHeight > (window.screen.availHeight - 180))?(window.screen.availHeight - 180):document.body.offsetHeight;


		if ($(winObj).attr("minHeight")){
			if (calHeight < $(winObj).attr("minHeight")){
				calHeight = $(winObj).attr("minHeight");
			}
		}
		$(winObj).attr("minHeight",calHeight);

		winDiv.style.height = calHeight + "px";
	}
} 
 fixDivWindow(); 
 
 
if (typeof window.parent != "undefined"){
	//调用父级页面的自动调整高度函数
	if(typeof window.parent.autoResize != "undefined"){
		window.parent.autoResize('${iframeIdx}');
	}
}

</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />
</body>
</html>