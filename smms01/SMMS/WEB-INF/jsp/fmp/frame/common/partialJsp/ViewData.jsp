<!-----------------------------------
* @文件描述：通用详细信息查看页面
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
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.opensymphony.xwork2.ActionContext"%>
<%
	String rootPath=request.getContextPath();
	String moduleId=(String)request.getAttribute("moduleId");
	TableModel currTblMdl = (TableModel) request.getAttribute("tableModel");
	String moduleDesc = currTblMdl.getDesc();

%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}_View.js" type="text/javascript" language="javascript"></script>
<input type="hidden" id="keyLimit" name="keyLimit" value="${keyLimit}"/>
<title>查看数据-<%=moduleDesc%></title>
</head>

<%
	String tableModelId = currTblMdl.getId();
	Map<String,SubTableModelLink> subTableModels = (Map<String,SubTableModelLink>) request.getAttribute("subTableModels");
%>
 
<body >
<script > 
var moduleId="${moduleId}";
</script>
<table class="tab_table">
<tr>
<td>
<div id="con">
<ul id="tags">
	<li class="selectTag">
	<a id="moduleTitle_${tableModelId}" onclick="selectTag('tagContent0',this)" href="javascript:void(0)"><%=moduleDesc%></a>
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
				
    %>
				<li id="subModuleTab_<%=subTblMdlId +idx %>"><a id="subModuleTitle_<%=subTblMdlId %>" onclick="selectTag('tagContent<%=idx %>',this)"
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
<div class="tagContent selectTag" id="tagContent0">
<%
 Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");
 WebComponent wff = FMPContex.webFieldFactory; 
    int maxColumn=2;
	String tdFormat = "<tr>";
	for (int i = 0; i < maxColumn; i++) {  //排版所需
		tdFormat = tdFormat + "<td width=\""+100/maxColumn+"%\"></td>";
	}
	tdFormat = tdFormat + "</tr>";	
 %>
 <script >
 
 function reSetFrameHeight(frameId){
	 var iframe = document.getElementById(frameId);
	 if(iframe){
		 var bHeight = iframe.contentWindow.document.body.scrollHeight;
		 var dHeight = 0;//iframe.contentWindow.document.documentElement.scrollHeight;
		 var height = Math.max(bHeight, dHeight);
		 fmpDebug("===viewdata===reSetFrameHeight======"+height);
		 iframe.height = height; 
	 }
 }


	if(typeof doOnload != "undefined"){
		doOnload();
	}
/*
	function onResize(){
		for (var i = 0;i<50;i++){
			var tagObj = document.getElementById("tagContent"+i);
			if (tagObj){
				
				tagObj.style.height = document.body.offsetHeight - 110;
				fmpDebug("===onResize===reSetFrameHeight======"+tagObj.style.height);
				var ifrObj = document.getElementById("infoFrame_"+i);
				if (ifrObj){
					ifrObj.style.width = document.body.offsetWidth - 60;
				}
			}else{
				return;
			}
		}
	}
*/
	/**
	 * 自动调整高度函数
	 *在子页面调用此函数，通过在本页面传入的iframeId定位子窗口所属的iframe所在的div
	
	function autoResize(iframeIdx){
		var tagObj = document.getElementById("tagContent"+iframeIdx);
		if (tagObj){
			if(tagObj.style.height){
				tagObj.style.height = document.body.offsetHeight - 80;
				fmpDebug("===autoResize===reSetFrameHeight======"+tagObj.style.height);
			}
		}
	}
 */
	if (typeof window.parent != "undefined"){
		//调用父级页面的自动调整高度函数
		if(typeof window.parent.autoResize != "undefined"){
			window.parent.autoResize('${iframeIdx}');
		}
	}
 
 </script>
 
 

<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/DataDetail.jsp" />




 <table width="100%">	
	<tr>
			<td>
<%
	if (subTableModels != null){
		int idx = 1;
		for (Iterator it = subTableModels.values().iterator(); it.hasNext(); idx++) {
			SubTableModelLink subTbl = (SubTableModelLink) it.next();
			if (subTbl.isUpdateListMode()){
	%>
			<div>
			<div class="groupHead" onclick="toggle($(this).next());"><%=subTbl.getSubModuleName() %></div>	
			<div class="groupBody" > 
			<div  style="overflow-x:auto;width: 945px;padding-right: 8px">
				<div id="updateListDiv" class="div_updateList" ></div>
				<br><br><br>
				</div>
			</div>
			</div>
					<script>
						var url = "<%=rootPath%><%=subTbl.getSubTableModelListUrl(detailDataMap)%>&isSubTbl=true&opMode=view&isUpdateListMode=true";
						loadDataListXML("updateListDiv",comUrl(url));				
					</script>			
	<%
			}
		}
	}
%>			
			</td>
	</tr>	
	
	<tr id="tr_buttonArea">
		<td align="center" >
			<div  class="div_detailButton"  align="center">
				<div id="viewButtonArea"></div>
			</div>
		</td>
	</tr>
			
</table>

</div>
<%
	if (subTableModels != null){
	       int idx=1;
	       for(Iterator it =  subTableModels.values().iterator(); it.hasNext(); idx++){
	    	   SubTableModelLink subTbl = (SubTableModelLink) it.next();
	    	   if (!subTbl.isUpdateListMode()){
	    	   %>
				<div class="tagContent" id="tagContent<%=idx %>" >		
					<div id="subTblList_<%=subTbl.getSubTableModelId() %>" >
						<iframe
							src="<%=rootPath%><%=subTbl.getSubTableModelListUrl(detailDataMap) %>&iframeIdx=<%=idx %>&isSubTbl=true&opMode=${opMode}&mainRid=${RID}&mainTableModelId=${tableModelId}"
							id="infoFrame_<%=idx %>" 
							overflow-x="no"
							name="infoFrame_<%=idx %>" 
							frameborder="0" scrolling="auto" height="100%" width="100%">
						</iframe>			
					</div>
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

</body>
</html>
<!-- jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />  -->