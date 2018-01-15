<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<!-----------------------------------
* @功能说明：岗位权限用到的模块操作树的展现页面roleRightModuleTree.jsp
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="java.util.*"%>
<%
	String rootPath = request.getContextPath();
%>
<html>
<head>
<title>模块列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="<%=rootPath%>/styles/fmp/frameStyle.css" rel="stylesheet"
	type="text/css" />
<link rel="STYLESHEET" type="text/css"
	href="<%=rootPath%>/styles/fmp/dhtmlxtree.css">
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script src="<%=rootPath%>/scripts/dhtmlxcommon.js"></script>
<script src="<%=rootPath%>/scripts/dhtmlxtree.js"></script>
<script src="<%=rootPath%>/scripts/commontree.js"></script>
</head>
<style>
.RoleModuleScrollDIV {
	width: 240px;
	overflow-y: auto;
	border-style .: solid;
	border-width: 1pt;
	border-color: blue;
}
</style>
<body>
<form id="Treelist" name="Treelist" action="" method="post">
<div
	style="border: 0px solid #000; position: absolute; left: 0; top: 0px;">
<table>
	<tr>
		<td>
		<div id="TreeTopDiv"><a
			href="javascript: ModuleTree.openAllItems(0);">全部展开</a>| <a
			href="javascript: ModuleTree.closeAllItems(0);">全部收起</a></div>
		</td>
	</tr>
	<tr id="tr_fieldArea1">
		<td valign="top" align="left">
		<div id="rolerightTreeOpperation"></div>
		<input type="hidden" name="treexmlString" id="treexmlString"
			value='<s:property value="#request.treeXml"/>' /> <input
			type="hidden" name="roleid" id="roleid"
			value='<s:property value="#request.roleid"/>' /></td>
	</tr>
</table>
</div>
</form>
</body>
</html>
<script type="text/javascript">		
  var ModuleTree = new dhtmlXTreeObject("rolerightTreeOpperation","100%","100%",0);
  function createTree()
  {
	var xml=document.getElementById("treexmlString").value;
	xml=HTMLDecode(xml);
	ModuleTree.setImagePath("<%=rootPath%>/images/maintreeimage/csh_scbrblue/");
	ModuleTree.enableCheckBoxes(1);
	ModuleTree.enableThreeStateCheckboxes(true);		
	ModuleTree.loadXMLString(xml);
	ModuleTree.closeAllItems(0);
	var parentNode=ModuleTree._globalIdStorageFind(ModuleTree.rootId); 
	var itemId=parentNode.childNodes[0].id; 
	ModuleTree.selectItem(itemId);	
	//var moduleIds='<s:property value="#request.moduleIds" />';
	
	ModuleTree.setOnCheckHandler(function(id, state){
		//this.setSubChecked(id,2);
		//this.setCheck(this.getParentId(id),unsure);
	});
	
	
	ModuleTree.attachEvent("onClick", function(){
		view();
	});
	hideProgressDiv();
  }


  function setTreeCheck(roleid,itemIds){
	  document.getElementById("roleid").value = roleid;
	  ModuleTree.setSubChecked(0,0);
	  if(itemIds!="" && itemIds.length>0)
	  {
	     var idsArr=itemIds.split(",");
	     if(ModuleTree){
	     	for(var i=0;i<idsArr.length;i++){
		         if(ModuleTree.hasChildren(idsArr[i])==0){
		        	 ModuleTree.setCheck(idsArr[i],1);
				 }
	        }
	     }
	  }
	  view();
  }

  function view()
	{   
		var modleid=ModuleTree.getSelectedItemId();
		var roleid=document.getElementById("roleid").value;		
  		parent.frames["modledatarange"].location="<%=rootPath%>/fmp/author/moduleDataRange/SModleDataRangeBiz/SModleDataRangeInvocate?tableModelId=SModleDataRange&modelId="+modleid+"&roleId="+roleid;	
	}

  //记得一定放最底
  createTree();
</script>
