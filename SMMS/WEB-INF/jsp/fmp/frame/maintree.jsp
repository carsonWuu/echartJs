<%@page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%
	String rootPath = request.getContextPath();
%>
<html>
	<head>
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="STYLESHEET" type="text/css" href="<%=rootPath%>/styles/fmp/dhtmlxtree.css">
		<script src="<%=rootPath%>/scripts/fmp/forbid.js" type="text/javascript" language="javascript"></script>
		<script src="<%=rootPath%>/scripts/dhtmlxcommon.js"></script>
		<script src="<%=rootPath%>/scripts/dhtmlxtree.js"></script>			
	</head>
	<body  style=background-color:#FFFAFA; >
		
		<table >
			<tr>
			<td valign="top" align="left" >
			<!--style="width: 250; height: 218; background-color: #f5f5f5; border: 1px solid Silver;; overflow: auto;" -->
					<b><a href="javascript:tree.openAllItems(0);"><font size=-2>全部打开&nbsp;|</font></a><a href="javascript:tree.closeAllItems();"><font size=1>&nbsp;全部关闭</font></a></b>
					<!-- 
					<a href="javascript:tree2.openAllItems(tree2.getSelectedItemId());"><font size=2>打开</font></a>|<a href="javascript:tree2.closeAllItems(tree2.getSelectedItemId());"><font size=2>关闭</font></a>
					<br><a href="javascript:tree2.setCheck(0,true);"><font size=2>全部选中</font></a>|<a href="javascript:tree2.setCheck(0,false);"><font size=2>全部取消</font></a>|
					<a href="javascript:tree2.setCheck(tree2.getSelectedItemId(),true);"><font size=2>选中</font></a>|<a href="javascript:tree2.setCheck(tree2.getSelectedItemId(),false);"><font size=2>取消</font></a>
					 -->
					<div id="treeboxbox_tree" style="width: 300; height: 525;" 
						></div>
				</td>
			
			</tr>
		</table>
		<script>	
			tree=new dhtmlXTreeObject("treeboxbox_tree","100%","100%",0);
			tree.setImagePath("<%=rootPath%>/images/maintreeimage/csh_yellowbooks/");
			tree.enableCheckBoxes(0);
			tree.enableThreeStateCheckboxes(true);	

				
			//tree.loadXML("<%=rootPath%>/author/${sessionScope.USERID}.xml");
			tree.loadXMLString("<%=rootPath%>/fmp/frame/GetMenuXML");
						
			tree.attachEvent("onClick",function(id){  						
			      var haschild = tree.hasChildren(id);
			      if(haschild==0){
			    	  var url='<%=rootPath%>/WEB-INF/jsp/frm/frame/'+tree.getUserData(id,"file");
			    	  openWindow(url,'infoframe','');
				      return true;
				  }else{
					  showMessage(haschild);
				      return false;
				  }		        
			    });
			   
			//}						
	</script>
	</body>
</html>
