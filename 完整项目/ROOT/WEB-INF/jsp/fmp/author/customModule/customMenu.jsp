<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page import="java.util.*" %>
<%
	String rootPath = request.getContextPath();

%>
<html>
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />

<title>自定义菜单</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="STYLESHEET" type="text/css" href="<%=rootPath%>/styles/fmp/dhtmlxtree.css">
<link href="<%=rootPath%>/styles/fmp/tabs_style.css" rel="stylesheet" type="text/css" />
<script src="<%=rootPath%>/scripts/dhtmlxcommon.js"></script>
<script src="<%=rootPath%>/scripts/dhtmlxtree.js"></script>	
<script src="<%=rootPath%>/scripts/commontree.js"></script>	

</head>
<body style="margin:0px" onload="doOnload();doOnloads();CustomModuleTree.closeAllItems(0);ModuleTree.closeAllItems(0);">

  <div  class="div_module_menu">
  
  	 <!-- 左边div块 -->
	  <div class="div_module_tree_left">
		  	<span class="module_tree_left_top" style="background:url('<%=rootPath%>/images/zscrd/customMenu/Menu background.gif') top repeat-x;">我的权限菜单</span>
		  	<span class="module_tree_left_open_close">
			  	 &nbsp;&nbsp;&nbsp;
			  	 <a href="javascript: ModuleTree.openAllItems(0);">全部展开</a>  &nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;
				 <a href="javascript: ModuleTree.closeAllItems(0);">全部收起</a>
		  	</span>
		  	<!-- 我的权限菜单 -->
		  	<span id="ModuleTreeOpperation" class="module_tree_left_content"></span>
	  </div>
	  
	  <!-- 中间div块 -->
	  <div class="div_module_tree_center">
	  		<img src="<%=rootPath%>/images/zscrd/customMenu/add.gif"  onclick="move()" onmouseover="setCursorStyle(this)"></img>
	  </div>
	  
	  <!-- 右边div块 -->
	  <div class="div_module_tree_right">
		  	<span class="module_tree_right_top">
			  	<img  src="<%=rootPath%>/images/zscrd/customMenu/New Menu.gif"  onclick="add()" onmouseover="setCursorStyle(this)"></img>
			  	<img  src="<%=rootPath%>/images/zscrd/customMenu/strike out.gif"  onclick="deleteData()" onmouseover="setCursorStyle(this)"></img>
			  	<img  src="<%=rootPath%>/images/zscrd/customMenu/alter.gif"  onclick="updateData()" onmouseover="setCursorStyle(this)"></img>
		  	</span>
		  	<span class="module_tree_right_open_close">
			  	 &nbsp;&nbsp;&nbsp;
			  	 <a href="javascript: CustomModuleTree.openAllItems(0);">全部展开</a>  &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
			     <a href="javascript: CustomModuleTree.closeAllItems(0);">全部收起</a>
		  	</span>
		  	<!-- 自定义快捷菜单 -->
		  	<span id="CustomModuleTreeOpperation" class="module_tree_right_content"></span>
	  </div>
 
  </div>
  
</body>
  
<script type="text/javascript" >

var CustomModuleTree = new dhtmlXTreeObject("CustomModuleTreeOpperation","100%","100%",0);   //创建自定义菜单树
var ModuleTree = new dhtmlXTreeObject("ModuleTreeOpperation","100%","100%",0);   //创建系统菜单树

function doOnload(){
	var treeItem = CustomModuleTree.insertNewChild(CustomModuleTree.rootId,"999","我的快捷菜单","safe_close.gif","safe_close.gif","safe_close.gif",0,"SELECT,CALL,TOP,CHILD,CHCECK");
	treeItem.id = "000";
	createCustomModuleTree();
	for (var i = 1 ; i<CustomModuleTree.htmlNode.childNodes.length;i++){
		CustomModuleTree.doCutById(CustomModuleTree.htmlNode.childNodes[1].id);
		CustomModuleTree.doPaste("999"); 	
	}
	CustomModuleTree.selectItem("999");
}
function createCustomModuleTree(){    //生成自定义树菜单
	var url = "<%=rootPath%>/fmp/author/customModule/SCustomModuleBiz/GetCustomModuleTree";
	XMLHttp.urlSubmit(url,null,"");	
	var xml= XMLHttp.message;
	xml=HTMLDecode(xml);
	CustomModuleTree.setImagePath("<%=rootPath%>/images/maintreeimage/csh_scbrblue/");
	CustomModuleTree.loadXMLString(xml);
}	

function doOnloads(){
	var treeItem = ModuleTree.insertNewChild(ModuleTree.rootId,"999","系统功能菜单","safe_close.gif","safe_close.gif","safe_close.gif",0,"SELECT,CALL,TOP,CHILD,CHCECK");
	treeItem.id = "000";
	createTree();
	for (var i = 1 ; i<ModuleTree.htmlNode.childNodes.length;i++){
		ModuleTree.doCutById(ModuleTree.htmlNode.childNodes[1].id);
		ModuleTree.doPaste("999"); 	
	}
	ModuleTree.selectItem("999");
}
function createTree(){    //生成系统树菜单
	var url = "<%=rootPath%>/fmp/author/customModule/SCustomModuleBiz/GetModuleTree";
	XMLHttp.urlSubmit(url,null,"");
	var xml= XMLHttp.message;
	xml=HTMLDecode(xml);
	ModuleTree.setImagePath("<%=rootPath%>/images/maintreeimage/csh_scbrblue/");
	ModuleTree.loadXMLString(xml);
}
function move(){   //新增快捷菜单操作
	var parentId = CustomModuleTree.getSelectedItemId();  //获取新节点的父ID
	var itemId = ModuleTree.getSelectedItemId();          //获取新节点的目标ID
	if(parentId!="" && parentId!=null && itemId!="" && itemId!=null){ //判断是否已选择我的权限菜单节点和我的快捷菜单节点
		if(itemId!="000"){                                            //判断所选择的我的权限菜单节点是否为根节点
			if(ModuleTree.hasChildren(itemId)==0){                    //判断所选择的我的权限菜单节点是否为叶子节点
				var itemText = ModuleTree.getItemText(itemId);        //获取新节点的名称
			    var haschild = CustomModuleTree.hasChildren(parentId);
			    var orderId = haschild + 1;                           //设置排序字段
				var custModuleId = CustomModuleTree.getSelectedItemId();   //获取新节点的ID
				var url = "<%=rootPath%>/fmp/author/customModule/SCustomModuleBiz/AddSave?opMode=add"
				            +"&DESMODULEID="+itemId+"&PARENTID="+parentId+"&CUSTOMMODULENAME="+itemText
				            +"&ORDERID="+orderId;
				XMLHttp.urlSubmit(fmpEncodeURI(url),backCall_getCustomModuleIds);
				function backCall_getCustomModuleIds(customModuleIdStr){
				    insertTreeItem(customModuleIdStr,itemText);     //生成新节点
				    showMessage("MSG0039");//我的权限菜单下的叶子菜单成功添加到我的快捷菜单！
				}
			}else{
				showMessage("MSG0040");//只能选择我的权限菜单下的叶子菜单作为快捷菜单，请您重新选择！
			}	
		}else{
			showMessage("MSG0040");//只能选择我的权限菜单下的叶子菜单作为快捷菜单，请您重新选择！
		}
	}else{
		showMessage("MSG0041");//请您先选择我的快捷菜单下的菜单与我的权限菜单下的叶子菜单！
	}	
}

function deleteData() {   //删除自定义菜单节点
	var itemId = CustomModuleTree.getSelectedItemId();
	if(itemId != null && itemId != ""){                     //判断是否选中我的快捷菜单节点
		if(itemId == "000"){
			showMessage("MSG0042");//不能删除我的快捷菜单根节点！
		}else{
			var ids=CustomModuleTree.getSubItems(CustomModuleTree.getSelectedItemId());
			if(ids){			 
				showMessage("MSG0043");//请您先删除该菜单下的所有子菜单！
		    }else{
		    	if (confirm("是否确认要删除？")) {		
		    		deleteTreeAndRefreshPage("<%=rootPath%>/fmp/author/customModule/SCustomModuleBiz/Delete?id="+CustomModuleTree.getSelectedItemId()+"&tableModelId=SCustomModule");
		    	}
		    }
		}	
	}else{
		showMessage("MSG0044");//请您先在我的快捷菜单下选择叶子菜单！
	}	
}
function deleteTreeAndRefreshPage(url){
	var xmlHttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlHttp = new XMLHttpRequest();
	} else {                    // code for IE6, IE5
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlHttp.onreadystatechange = function() {
	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		//var xmlTxt = xmlHttp.responseText;
		//alert("删除成功");    
		}
	}
	xmlHttp.open("POST", url, true);
	xmlHttp.send();	
	//异步后删除，才起效果
	var sNode = CustomModuleTree._globalIdStorageFind(CustomModuleTree.getSelectedItemId());
	CustomModuleTree.deleteItem(CustomModuleTree.getSelectedItemId(),true);    
}

function updateData(){    //修改自定义菜单节点名称
	var itemId = CustomModuleTree.getSelectedItemId();
	var itemText = CustomModuleTree.getItemText(itemId);
	if(itemId != null && itemId != ""){                                    //判断是否选中我的快捷菜单节点
		var str = window.prompt("自定义模块名称",itemText);
		if(str!="" && str!=null){
			CustomModuleTree.setItemText(itemId,str,"节点名称修改成功");    //修改节点名称
			if(str!=itemText){
				var url = "<%=rootPath%>/fmp/author/customModule/SCustomModuleBiz/AddSave?opMode=update&CUSTOMMODULEID="+itemId+"&CUSTOMMODULENAME="+str;
				XMLHttp.urlSubmit(fmpEncodeURI(url));
				//showMessage(XMLHttp.message);
			}
		}
	}else{
		showMessage("MSG0045");//请您先在我的快捷菜单下选择菜单！
	}	
}

function add(){   //新增分组菜单操作
	var parentId = CustomModuleTree.getSelectedItemId();  //获取新节点的父ID
	if(parentId!="" && parentId!=null){
		var itemText = "节点名称";   //为节点名称设置默认值
		var haschild = 0;            //获取子节点数
		if(parentId == "000"){
			haschild = CustomModuleTree.hasChildren("999");
		}else{
			haschild = CustomModuleTree.hasChildren(parentId);
		}
	    var orderId = haschild + 1;                           //设置排序字段
		var url = "<%=rootPath%>/fmp/author/customModule/SCustomModuleBiz/AddSave?opMode=add"
	        +"&PARENTID="+parentId+"&CUSTOMMODULENAME="+itemText
	        +"&ORDERID="+orderId;
	    XMLHttp.urlSubmit(fmpEncodeURI(url),backCall_getCustomModuleId);
	    function backCall_getCustomModuleId(customModuleIdStr){
	    	insertTreeItem(customModuleIdStr,itemText);
	    	showMessage("MSG0046");//在我的快捷菜单下成功添加菜单分组！
	    }
	}else{
		showMessage("MSG0045");//请您先在我的快捷菜单下选择菜单！
	}
}

function insertTreeItem(id,textName){    //在自定义快捷树菜单中插入节点菜单
		var curSelectId = CustomModuleTree.getSelectedItemId();
		if(!curSelectId ||curSelectId.length==0){
			curSelectId="000";
		}
		if (curSelectId == "000"){
			curSelectId="999";
		}		  
		CustomModuleTree.insertNewChild(curSelectId,id,textName,"folderClosed.gif","folderClosed.gif","folderClosed.gif",0,"SELECT,CALL,CHCECK"); 
}

function setCursorStyle(Obj){
	//设置光标为小手
	if(Obj){
		Obj.style.cursor="hand";	
	}
}
</script>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 