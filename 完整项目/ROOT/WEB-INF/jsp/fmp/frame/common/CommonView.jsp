<!-----------------------------------
* @文件描述：通用的查看页面
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<% 
	TableModel currTblMdl = (TableModel) request.getAttribute("tableModel");
Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");	
	String moduleDesc = currTblMdl.getDesc(detailDataMap);
%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>

<title><%=moduleDesc%>-查看</title>
</head>
<%
	String rootPath=request.getContextPath();
	String moduleId=(String)request.getAttribute("moduleId");
%>
<style type="text/css">
body{
 margin:0px;
 padding:0px;
}
.one{
 width:expression(document.documentElement.clientWidth>600?600:auto);
 height:600px;
}
</style>
 

<body>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />

<table width="100%" id="tbl1232">
	<tr>
		<td>
			<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/ViewData.jsp" />
		</td>
	</tr>
	<tr id="tr_buttonArea">
		<td align="center">
			<div  class="div_detailButton"  align="center">
				<input type="button" id="hiddenButton" style="display:'none'" hidden="true" value="用于动态加按钮" ></input>
				<!--<input type="button" id="DoClose" class="detailbutton" value="关闭" onclick="closeWindow();"></input>-->
			</div>
		</td>
	</tr>	
</table>
<script type="text/javascript">
	if(typeof doOnload != "undefined"){
		doOnload();
	}
 /*
	function onResize(){
		for (var i = 0;i<50;i++){
			var tagObj = document.getElementById("tagContent"+i);
			if (tagObj){
				tagObj.style.height = document.body.offsetHeight - 50;
				
				var ifrObj = document.getElementById("infoFrame_"+i);
				if (ifrObj){
					ifrObj.style.width = document.body.offsetWidth - 100;
					fmpDebug("======commonview.onResize======"+ifrObj.style.width);
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
				tagObj.style.height = document.body.offsetHeight - 180;
				fmpDebug("======commonview.autoResize"+iframeIdx+"======"+tagObj.style.height);
			}
		}
	}
  */ 


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
			//winDiv.style.height = winObj.style.height;// (winObj.style.height)+"px";
			//winObj.style.height = (document.body.offsetHeight)+"px"; //"800px";//ifObj.Height +"px" ;//

			//winObj.style.height = (calHeight - 50) + "px";
			//ifObj.style.height = calHeight + "px";
			fmpDebug("======commonview.fixDivWindow====winDiv.style.height=="+winDiv.style.height);
			fmpDebug("======commonview.fixDivWindow==ifObj.offsetHeight===="+ifObj.offsetHeight);
			fmpDebug("======commonview.fixDivWindow==ifObj.height===="+ifObj.height);
			fmpDebug("======commonview.fixDivWindow==ifObj.scrollHeight===="+ifObj.scrollHeight);
			//alert(winObj.style.height);
		}				
	} 
	//fixDivWindow();  这句代码影响项目办理时的窗口高度

	
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