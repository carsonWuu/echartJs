<!-----------------------------------
* @文件描述：通用修改页面
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
<%@ page import="com.zstar.fmp.core.frame.tablemodel.SubTableModelLink"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ page import="com.opensymphony.xwork2.ActionContext"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableOpperation"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%
	String moduleId=(String)request.getAttribute("moduleId");
	String queryString = request.getQueryString();
	String rootPath = request.getContextPath();  
	TableModel currTblMdl = (TableModel) request.getAttribute("tableModel");
	Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");	
	String moduleDesc = currTblMdl.getDesc(detailDataMap);
	String selectedTableModelId = (String)request.getAttribute("selectedTableModelId");  //选中标签页的表模型
%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<input type="hidden" id="keyLimit" name="keyLimit" value="${keyLimit}"/>
<title><%=moduleDesc%>-修改</title>
</head>

<%
    Map<String,SubTableModelLink> subTableModels = (Map<String,SubTableModelLink>) request.getAttribute("subTableModels");
    String isUpdateListMode = "false";   
%>
<script src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}_Update.js" type="text/javascript" language="javascript"></script>
<script type="text/javascript">
var tableModelId="${tableModelId}";
var mainTableModelId="${mainTableModelId}";
var freezeCondition = "${freezeCondition}";
var moduleId="${moduleId}";
var rids = "";		//列表中的RID集合
</script>
 
<body onload="" >
<table class="tab_table">
<tr>
<td>
<div id="con">
<ul id="tags">
					<%
				if (selectedTableModelId == null){
					%>
					<li  class="selectTag">
					<%
				}else{
					%>
					<li>
					<%				
				}
					%>
		<a id="moduleTitle_${tableModelId}" onclick="selectTag('tagContent0', this)" href="javascript:void(0)"><%=moduleDesc%></a>
	</li>

	<%
	if (subTableModels != null){
     	Iterator its = subTableModels.keySet().iterator();
        for(int idx = 1; its.hasNext(); idx++){
        	Object key = its.next();
			SubTableModelLink subTMLink = subTableModels.get(key);
			if (!subTMLink.isUpdateListMode()){
				String subTblMdlId = subTMLink.getSubTableModelId();
				TableModel subTblMdl = FMPContex.getTableModel(subTblMdlId);
				String subModuleDesc = (String)subTMLink.getSubModuleName();
				if (subModuleDesc == null){
					subModuleDesc = subTblMdl.getDesc();
				}	
				if (subTblMdlId.equals(selectedTableModelId) ){//当前标签页是否被选中
					%>
					<li  class="selectTag">
					<%
				}else{
					%>
					<li>
					<%				
				}
				String reload = subTMLink.getReload()?"true":"false";
    %>
				<a id="subModuleTitle_<%=subTblMdlId %>" onclick="selectTag('tagContent<%=idx%>',this,<%=reload %>)"
				href="javascript:void(0)"><%=subModuleDesc %></a></li>
	<%
			}
		}
	}
	%>

</ul>
</div>
</td>
</tr>
<tr>
<td>
<div id="tagContent">
<% 
    String selectFlag = "";
	if(selectedTableModelId == null){
		selectFlag = "selectTag";
	} 
%>
  <div class="tagContent selectTag" id="tagContent0">
<form id="DoUpdate" name="DoUpdate" method="post">
 
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
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/DataDetail.jsp" />
 <table width="100%">
		<tr>
			<td>
<%
	if (subTableModels != null){
		int idx = 99;
		for (Iterator it = subTableModels.values().iterator(); it.hasNext(); idx++) {
			SubTableModelLink subTbl = (SubTableModelLink) it.next();
			if (subTbl.isUpdateListMode()){
	%>
				<div id="groupDiv<%=idx %>"> 
				<div class="groupHead_info" onclick="toggle($(this).next());changClassName('<%=idx %>');">
											    <table style="width: 100%;border: 0px;">
											    <tr>
											    	<td>
												    	<span>
												    	<img style="margin-top: 4px;" id="leftImage" src="<%=rootPath%>/images/tabimage/ziliao.gif"  ></img> &nbsp;
												    	<font style="font-weight:bold;font-size: 13px"><%=subTbl.getSubModuleName() %></font>
												    	</span>
											   	    </td>
											   	    <td>
											   	   	    <span id="groupHead_right<%=idx %>" class="groupHead_right_up" ></span>
											    	</td>
											    </tr>
												</table>
												<span class="groupHead_bottom" > <img id="bottomImage" src="<%=rootPath%>/images/tabimage/shuangxian.gif"  ></img></span>				
				</div>
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
		
		<tr id="tr_buttonArea"><br>
			<td >
				<div  class="div_detailButton"  align="center">
						<input class="h5button green medium"  type="button" id="DoUpdateSave" value="保存" onclick="doSubmit();"></input>
						<input class="h5button green medium"  type="button" id="DoAddSaveClose" value="保存后关闭" onclick="doSubmit(true);"></input>
						<input class="h5button orange medium"  type="reset" id="updateResetButton" value="重置" />
				<!--<input type="button" id="DoClose" class="detailbutton" value="关闭" onclick="closeWindow();"></input>-->
		   		</div>
		   		<br>
		    </td>
		</tr>
				
	</table>
 
</form>
</div>
<%
	if (subTableModels != null){
		int idx = 1;
		for (Iterator it = subTableModels.values().iterator(); it.hasNext(); idx++) {
			SubTableModelLink subTbl = (SubTableModelLink) it.next();
			if (!subTbl.isUpdateListMode()){
				String subTblMdlId = subTbl.getSubTableModelId();
				selectFlag = "";
				if (subTblMdlId.equals(selectedTableModelId)){ //当前标签页是否被选中
					selectFlag = "selectTag";
				}
				
 			   %>
			   <div class="tagContent <%=selectFlag %>" id="tagContent<%=idx %>" >
						<div id="subTblList_<%=subTbl.getSubTableModelId() %>" >
								<iframe
									id="infoFrame_<%=idx%>"
									src="<%=rootPath%><%=subTbl.getSubTableModelListUrl(detailDataMap)%>&iframeIdx=<%=idx %>&isSubTbl=true&opMode=${opMode}&mainRid=${RID}&mainTableModelId=${tableModelId}&currDivId=${currDivId}" 
									name="infoFrame_<%=idx %>" onload="autoiframesize('infoFrame_<%=idx%>')" 
									frameborder="0" scrolling="auto" height="100%" width="100%">
								</iframe>
						</div>
						<script type="text/javascript">
							try{
								document.getElementById("tagContent<%=idx%>").style.height = document.body.offsetHeight - 110;
							    //$_("infoFrame_<%=subTbl.getSubTableModelId()%>").style.width = document.body.offsetWidth - 60;
							}catch(e){
								//这里不处理异常，不影响业务
							}
						</script>
				</div>
						
				<%
			}                       
		}
	}
%>
</div>
</td>
</tr>
</table>
<script type="text/javascript">
updateDocTitle("<%=moduleDesc%>-修改");
function doSubmit(canclose){
	var form = document.forms[0];//.getElementById("DoUpdate");
	var result =checkAll(form);
	if (result){
		if (typeof(preSave) != "undefined"){
			result = preSave("update");
		}
	}else{
		showMessage("MSG1019");//请检查信息是否填写完整！
		return;
	}	
	if(result){
		//form.action = "AddSave";
		//form.submit();
       //	XMLHttp.formSubmit(form,"AddSave",callBack);
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
    	   		XMLHttp.formSubmit(form,comUrl("SaveUniteSubTableList?updateRids="+updateRowIds+"&addRids="+addRowIds+"&deleteRids="+deletedRowIds),callBack);	
    	   <%
       }else{		
    	   %>
    	   		XMLHttp.formSubmit(form,comUrl("AddSave"),callBack);   	   			
    	   <%
       }
       %>	
			     	
	}

	function callBack(msg){
		if(msg.substr(0,4) == 'RID='){ // 判断保存是否成功
			if(typeof doAfterUpdate!='undefined'&& doAfterUpdate instanceof Function){          
				doAfterUpdate(); 
			}else{
				showMessage('MSG0005');//保存成功！
			}
		} else {
			showMessage(msg);
		}
		doRefreshList();		
		if (canclose){
			closeWindow();
		} 		
	}
}

function setRids(s){
	rids = s;
}



//通用在可编辑列表中插入数据的操作
function addDataInUpdateListMode(){
	return sub_addDataInUpdateListMode(window);
};

//通用保存列表的操作
function saveDataList(){
	return sub_saveDataList();
};



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

if(typeof doOnload != "undefined"){
	doOnload();
}


</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />
</body>
</html>