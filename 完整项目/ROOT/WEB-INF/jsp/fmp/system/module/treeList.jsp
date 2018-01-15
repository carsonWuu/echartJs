<!-----------------------------------
* @功能说明：模块操作树的展现页面treeList.jsp
------------------------------------>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page import="java.util.*" %>
<%
	String rootPath = request.getContextPath();
%>
<html>
<head><title>模块列表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="STYLESHEET" type="text/css" href="<%=rootPath%>/styles/fmp/dhtmlxtree.css">
<link href="<%=rootPath%>/styles/fmp/frameStyle.css" rel="stylesheet" type="text/css"/>
<script src="<%=rootPath%>/scripts/fmp/forbid.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/Concurrent.Thread.js"></script>
<script src="<%=rootPath%>/scripts/dhtmlxcommon.js"></script>
<script src="<%=rootPath%>/scripts/dhtmlxtree.js"></script>	
<script src="<%=rootPath%>/scripts/commontree.js"></script>	
<script src="<%=rootPath%>/scripts/fmp/fmpcommon.js" type="text/javascript" language="javascript"></script>		
</head>

<body  onload="doOnload();">
    <form id="Treelist" name="Treelist" action="" method="post">
  <div style="width: 100%; border: 0px solid #000; position: absolute; left: 0; top: 15px;" >    
 <table>
    <tr>
    	 <td>
			<div id="TreeTopDiv">
			<a href="javascript: ModuleTree.openAllItems(0);">全部展开</a>|
			<a href="javascript: ModuleTree.closeAllItems(0);">全部收起</a>
			</div>
		</td>
    </tr>
  
	<tr id="tr_fieldArea1">
		<td valign="top" align="left" >
			<div id="treeOpperation"></div>
			<input type="hidden" name="treexmlString" id="treexmlString" value='<s:property value="#request.treeXml"/>'/>
		</td>
	</tr>
</table>
</div>
</form>
</body>
</html>
<script type="text/javascript">		
   //var xml='<?xml version="1.0" encoding="UTF-8"?> <tree id="0"> <item text="rootbook" id="A1" open="1" im0="" im1="" im2="" call="true" select="1"><userdata name="URL">1</userdata><item text=" book1" id="1" child="0"><userdata name="URL">www.google.com.hk</userdata></item><item text="book2" id="2" child="0"><userdata name="URL">www.google.com.hk</userdata></item></item></tree> ';

  function createTree()
  {
		var xml=document.getElementById("treexmlString").value;
		xml=HTMLDecode(xml);
		ModuleTree.setImagePath("<%=rootPath%>/images/maintreeimage/csh_scbrblue/");
		//ModuleTree.enableCheckBoxes(1);
		//ModuleTree.enableThreeStateCheckboxes(true);	
		//ModuleTree.enableSmartRendering;
		//ModuleTree.enableMercyDrag(1);
		ModuleTree.loadXMLString(xml);
		ModuleTree.closeAllItems(0);
		ModuleTree.attachEvent("onClick",function(id){  						
	      var haschild = ModuleTree.hasChildren(id);
	      var arr=id.split("__");
	      var len=arr.length;
	      checkStubItemsType();//新增控制
	      //删除控制
          if(len==2||id.length>=32){//当前为操作,操作ID为32,而模块的MODULEID最大为30
           	  modOrOppTag=1;//0模块，1操作
        	  parent.document.getElementById("moddel").disabled="disabled";
        	  parent.document.getElementById("oppdel").disabled=""; 
        	  view("opp");
           }else{//长度为1，当前为模块
        	  modOrOppTag=0;//0模块，1操作	   		
        	  parent.document.getElementById("moddel").disabled=""; 
        	  parent.document.getElementById("oppdel").disabled="disabled";   
        	  view("mod");   	        
           }
          //alert(modOrOppTag);
        });
	//var treeItem = oduleTree.htmlNode.childNodes[1].clone();
	
	//var treeItem = ModuleTree.insertNewChild(ModuleTree.rootId,"000","泛华综合业务系统","folderClosed.gif","folderClosed.gif","folderClosed.gif",0,"SELECT,CALL,TOP,CHILD,CHCECK"); 
	//ModuleTree.insertNewChild(ModuleTree.htmlNode.childNodes[1].id,"000","2222","folderClosed.gif","folderClosed.gif","folderClosed.gif",0,"SELECT,CALL,CHCECK");
	//ModuleTree.doCutById(ModuleTree.htmlNode.childNodes[1].id);
	//ModuleTree.doPaste("000");  
	 hideProgressDiv();  
   }	

//######################################add#############
	function add(param){
    	if(param=="mod"){
    		parent.frames["right"].location="<%=rootPath%>/fmp/SModuleBiz/TreeModuleAdd?id="+ModuleTree.getSelectedItemId();
        }else{
        	parent.frames["right"].location="<%=rootPath%>/fmp/SModuleOpperationBiz/TreeModuleOpperationAdd?id="+ModuleTree.getSelectedItemId();
        }			
	}
	function view(param)
	{
    	if(param=="mod"){
    		parent.frames["right"].location="<%=rootPath%>/fmp/SModuleBiz/TreeModuleUpdate?id="+ModuleTree.getSelectedItemId();
        }else{
      	    var arr=ModuleTree.getSelectedItemId().split("__");
      	    var opperationSelectId=arr[0];	     
        	parent.frames["right"].location="<%=rootPath%>/fmp/SModuleOpperationBiz/TreeModuleOpperationView?id="+opperationSelectId;
        }	
	}

	
   function insertTreeItem(id,textName){
		var curSelectId = ModuleTree.getSelectedItemId();
		if(!curSelectId ||curSelectId.length==0){
			curSelectId="000";
		}	

		if (curSelectId == "000"){
			curSelectId="999";
		}		  
		if(id.indexOf("opp") ==-1){
			ModuleTree.insertNewChild(curSelectId,id,textName,"folderClosed.gif","folderClosed.gif","folderClosed.gif",0,"SELECT,CALL,CHCECK"); 
		}else{ 
			ModuleTree.insertNewChild(curSelectId,id,textName,"iconText.gif","iconText.gif","iconText.gif",0,"SELECT,CALL,CHCECK"); 
		}
   }


   function insertTreeItemByItemId(itemid,id,textName){
		var curSelectId = itemid;
		if(!curSelectId ||curSelectId.length==0){
			curSelectId="000";
		}	  
		if (curSelectId == "000"){
			curSelectId="999";
		}
		ModuleTree.insertNewChild(curSelectId,id,textName,"iconText.gif","iconText.gif","iconText.gif",0,"SELECT,CALL,TOP,CHCECK");
  }
   	 	 
   function updateTreeItem(id,textName,mod){//MOD 块，OPP为操作
	   ModuleTree.setItemText(ModuleTree.getSelectedItemId(),textName,textName);//第3参数提示
	   ModuleTree.changeItemId(ModuleTree.getSelectedItemId(),id);
	}
	 
    //作用：判断模块下只能添加单一类型，如：模块下一级只能是模块，活操作，不能混合
   function checkStubItemsType()
   {
		var ids=ModuleTree.getSubItems(ModuleTree.getSelectedItemId());
		if(ids.length>0){//底下有子节点
			var idarray=ids.split(",");
	        if(idarray[0].length>=32){  //判断是否系统生成的RID
	        	  parent.document.getElementById("oppnew").disabled="";
	        	  parent.document.getElementById("modnew").disabled="";
			}else{
	        	  parent.document.getElementById("oppnew").disabled="";
	        	  parent.document.getElementById("modnew").disabled="";
		    }
	    }else{//底下没子节点
		    var selectId=ModuleTree.getSelectedItemId();
		    var arr=selectId.split("__");
            if(arr.length==2){
            	  parent.document.getElementById("oppnew").disabled="disabled";
            	  parent.document.getElementById("modnew").disabled="disabled";
            }
            else{
	          	  parent.document.getElementById("oppnew").disabled="";
	        	  parent.document.getElementById("modnew").disabled="";
            }
		}
   }
   function deleteData() {
		var ids=ModuleTree.getSubItems(ModuleTree.getSelectedItemId());
		//if(ids){
		//	alert("请先删除子节点!");
	   // }else{
	    	if (confirm("是否确认要删除？")) {
	    		if(modOrOppTag==0){			
	    			if (confirm("此操作会删除本节点以及下属所有子节点，是否继续？")) {
	    				deleteTreeAndRefreshPage("<%=rootPath%>/fmp/SModuleBiz/Delete?MODULEID="+ModuleTree.getSelectedItemId()+"&tableModelId=SModule");
		    		}
	    		}
	    		else{
		    		var arr=ModuleTree.getSelectedItemId().split("__");
	    			deleteTreeAndRefreshPage("<%=rootPath%>/fmp/SModuleOpperationBiz/Delete?id="+arr[0]+"&tableModelId=SModuleOpperation");
	    		}
	    	}
	  //}
   }

    function deleteTreeAndRefreshPage(url){
		var xmlHttp;
		if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlHttp = new XMLHttpRequest();
		} else {// code for IE6, IE5
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			//var xmlTxt = xmlHttp.responseText;
			// alert("删除成功");    
			}
		}
		xmlHttp.open("POST", url, true);
		xmlHttp.send();	
		//异步后删除，才起效果
		var sNode = ModuleTree._globalIdStorageFind(ModuleTree.getSelectedItemId());
		//var nodes=sNode.getSubItems();
		//isItemChecked(ModuleTree.getSelectedItemId());
		ModuleTree.deleteItem(ModuleTree.getSelectedItemId(),true);    
   	  }

  var modOrOppTag=0;//0模块，1操作
  var ModuleTree=new dhtmlXTreeObject("treeOpperation","100%","100%",0);
  createTree();
  function doOnload(){
	  var treeItem = ModuleTree.insertNewChild(ModuleTree.rootId,"999","系统功能菜单","safe_close.gif","safe_close.gif","safe_close.gif",0,"SELECT,CALL,TOP,CHILD,CHCECK");
	  treeItem.id = "000";
	 // alert(ModuleTree.htmlNode.childNodes.length);
	  for (var i = 1 ; i<ModuleTree.htmlNode.childNodes.length;i++){
		  ModuleTree.doCutById(ModuleTree.htmlNode.childNodes[1].id);
		  ModuleTree.doPaste("999"); 	
	  }
  
  }
  
</script>