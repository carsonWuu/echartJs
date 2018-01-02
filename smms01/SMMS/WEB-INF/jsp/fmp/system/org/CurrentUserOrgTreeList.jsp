<!-----------------------------------
* @文件描述：当前用户对应的机构树页面
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%
	String rootPath = request.getContextPath();
%>
<html>
<head><title>机构树</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="STYLESHEET" type="text/css" href="<%=rootPath%>/styles/fmp/dhtmlxtree.css">
<link href="<%=rootPath%>/styles/fmp/frameStyle.css" rel="stylesheet" type="text/css"/>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script src="<%=rootPath%>/scripts/dhtmlxcommon.js"></script>
<script src="<%=rootPath%>/scripts/dhtmlxtree.js"></script>			
<script src="<%=rootPath%>/scripts/commontree.js"></script>			
</head>
<body>
    <form id="Treelist" name="Treelist" action="" method="post">
    <div style="width: 100%; border: 0px solid #000; position: absolute; left: 0; top: 15px;" >
 <table>
    <tr>
    	 <td>
			<div id="TreeTopDiv">
			<a href="javascript: OrgTree.openAllItems(0);">全部展开</a>|
			<a href="javascript: OrgTree.closeAllItems(0);">全部收起</a>
			</div>
		</td>
    </tr>
 
 
	<tr id="tr_fieldArea1">
		<td valign="top" align="left" >
			<div id="treeOrg" ></div>
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
	OrgTree.setImagePath("<%=rootPath%>/images/maintreeimage/csh_scbrblue/");
	//OrgTree.enableCheckBoxes(1);
	//OrgTree.enableThreeStateCheckboxes(true);		
	OrgTree.loadXMLString(xml);
	var parentNode=OrgTree._globalIdStorageFind(OrgTree.rootId);
	var itemId=parentNode.childNodes[0].id;
	OrgTree.selectItem(itemId);
	OrgTree.attachEvent("onClick",function(id){
		deleteControl(id);
	});
    //初始化时的按钮控制
    if(OrgTree.getSelectedItemId()){
        //新增操作控制
        var arr=OrgTree.getSelectedItemId().split("__");
        if(arr && arr.length>1){
        	checkStubItemsType();
        }
        //删除操作控制
        deleteControl(OrgTree.getSelectedItemId());
     }
    hideProgressDiv();
   }	

//######################################add#############
	function add(argParam){
  	        var arr=OrgTree.getSelectedItemId().split("__");
  	        //需要取到对应的机构码，必填项
  	        var curSelectId = OrgTree.getSelectedItemId();
  	        var type="dept";
  	        if(curSelectId&&curSelectId.split("__").length==1){
  	  	        type="org";
  	  	     }
 	  	     var orgValue="";
 	  	     try{
 	  	    	orgValue =parent.frames["right"].document.getElementById("detailId_ORGID").value;
             }catch(e){};
        	parent.frames["right"].location="<%=rootPath%>/fmp/SDeptBiz/SDeptAdd?id="+arr[0]+"&sourceComeFrom="+type+"&orgValue="+orgValue;			
	}
	function view(type)
	{
    	if(type=="org"){
    		parent.frames["right"].location="<%=rootPath%>/fmp/SOrgBiz/CurrentOrgTreeView?id="+OrgTree.getSelectedItemId();
        }else{ 
  	        var arr=OrgTree.getSelectedItemId().split("__");
        	parent.frames["right"].location="<%=rootPath%>/fmp/SDeptBiz/SDeptView?id="+arr[0];
        }	
	}

   function insertTreeItem(id,textName){
		var curSelectId = OrgTree.getSelectedItemId();
		if(!curSelectId){
			curSelectId="<%=FMPContex.SYS_TOPORGID%>";
		}
	   if(id) {
          var arr=id.split("__");
          if(arr.length>1){
        	   OrgTree.insertNewChild(curSelectId,id,textName,"iconText.gif","iconText.gif","iconText.gif",0,"SELECT,CALL,CHCECK");
              }else{
               OrgTree.insertNewChild(curSelectId,id,textName,"folderClosed.gif","folderClosed.gif","folderClosed.gif",0,"SELECT,CALL,CHCECK");
              }
		}
	 }
	 
	 
   function updateTreeItem(id,textName,mod){//ORG 为机构，SDept为操作
	   	OrgTree.setItemText(id+"_opp",textName,textName);//第3参数提示
	}
	 
    //作用：机构下可以是有机构和部门，但部门下不能新增机构
   function checkStubItemsType()
   {  
	    var currentid=OrgTree.getSelectedItemId();
		//var ids=OrgTree.getSubItems(currentid);
		var idarr=currentid.split("__");
        if(idarr.length==2){
        	  parent.document.getElementById("oppnew").disabled="";
		}else{
        	  parent.document.getElementById("oppnew").disabled="";
	    }
   }
   //删除操作控制
   function deleteControl(currentSeletedID)
   {
	      //alert(currentSeletedID);
	      var haschild = OrgTree.hasChildren(currentSeletedID);
	      var arr=currentSeletedID.split("__");
	      var len=arr.length;
	      checkStubItemsType();//新增控制
	      //删除控制
          if(len==2){//当前为部门
        	  parent.document.getElementById("oppdel").disabled=""; 
        	  view("dept");//
           }else{//长度为1，当前为机构   		
        	  parent.document.getElementById("oppdel").disabled="disabled";   
        	  view("org");   	        
           }
    }
   function deleteData() {
		var ids=OrgTree.getSubItems(OrgTree.getSelectedItemId());
		if(ids){
			showMessage("MSG0073");//请先停用子节点！
	    }else{
	    	if (confirm("是否确认要停用？")) {
		    		var arr=OrgTree.getSelectedItemId().split("__");
	    			deleteTreeAndRefreshPage("<%=rootPath%>/fmp/SDeptBiz/Delete?id="+arr[0]+"&tableModelId=SDept");
	    	}
	  }
   }

    function deleteTreeAndRefreshPage(url){
		comAjax(url);
		OrgTree.deleteItem(OrgTree.getSelectedItemId(),true);    
   	  }
  var OrgTree=new dhtmlXTreeObject("treeOrg","100%","100%",0);
  createTree(); 
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 