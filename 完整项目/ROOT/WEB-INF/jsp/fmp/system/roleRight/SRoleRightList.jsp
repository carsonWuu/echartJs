<!-----------------------------------
* @功能说明：岗位权限用到岗位列表SRoleRightList.jsp
------------------------------------>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String rootPath = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<%=rootPath%>/styles/fmp/frameStyle.css" />
<link href="<%=rootPath%>/styles/fmp/tabs_style.css" rel="stylesheet" type="text/css" />
<head>

<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script src="<%=rootPath%>/scripts/tabs_style.js"></script>
<script src="<%=rootPath%>/scripts/uploadify-v2.1.4/jquery-1.4.2.min.js"></script>
<script language="JavaScript" src="<%=rootPath%>/scripts/jquery.form.js"></script>
<title>岗位列表</title>
</head>
<body>
<form id="userform" name="userform" action="">

<div style="width: 100%; border: 0px solid #000; position: absolute; left: 0; top: 0PX; padding: 0px 0px 0px 0px">
<table>
<tr>
	<td><input type="hidden" id="COPYROLEID" name="COPYROLEID" value="${COPYROLEID}"/>
		<input id="modnew" type="button" value="保存岗位权限" class="treebutton" onclick="addRolePermission()" />
	</td>
</tr>
<tr>
   <td><input id="copy" type="button" value="复制权限" class="treebutton" onclick="copyAuthority()" />
   		&nbsp;
   		<input id="paste" type="button" value="粘贴权限" class="treebutton" onclick="pasteAuthority()" />
   </td>
</tr>

<tr>
	<td><input type="hidden" value="" name="ORGID" id="detailId_ORGID" onchange="filterRole(this)">
  	 	<input type="text" readOnly=true name="disp_ORGID" value="" id="disp_detailId_ORGID"  class="d_nodeCondi_text_pops"/>
   		<button id="btn_ORGID" class="popbutton" onclick="openSinOrgPop('SOrg','ORGID','ORGID','ORGNAME')">......</button>
	</td>  
</tr>
</table>

  <table id="datalist" class="d_table">
	     <s:iterator value="#request.userlist" id="vo"  status="index">  
		  <tr>  
		  	  <td width="20px"></td>
			  <!--td> <s:property value="#index.index+1" /></td-->
		      <td width="152px"style= "cursor:hand" onclick="view('<s:property value="#vo.ROLEID" />',this)" ><u><s:property value="#vo.ROLENAME" /></u>
		      <td></td>        
		   </td>
		  </tr>
	     </s:iterator> 
 </table>
 </div>
</form>

</body>
</html>
<script type="text/javascript">
	// wait for the DOM to be loaded  
	var roleId="";
	var selectedRoleName=""; //初始化选中岗位名称
	var moduleIdsViewStr=""; //初始化权限设置前所选模块ID
	var moduleIdsChangeStr=""; //初始化所修改的模块名称
	var ModuleTree = parent.frames["right"].ModuleTree; //获取右边模块树对象
	function view(roleid,obj)
	{ 
		roleId=roleid;
		hilight(obj);//高亮
		var url="<%=rootPath%>/fmp/SRoleRightBiz/GetRoleRightModules";
		XMLHttp.urlSubmit(url,null,"roleid="+roleId);
		parent.frames["right"].setTreeCheck(roleId,XMLHttp.message);
		moduleIdsViewStr=ModuleTree.getAllCheckedBranches();//获取权限设置前所选模块ID
		selectedRoleName =obj.innerText;//获取选中岗位名称
	}
	function addRolePermission()
	{   
		if(roleId==""){
		  showMessage("MSG0077");//请先选择岗位！
          return ;
		}
		showProgressDiv();
		ModuleTree = parent.frames["right"].ModuleTree; //获取右边模块树对象
		var moduleIds=ModuleTree.getAllCheckedBranches();//获取权限设置保存时所选模块ID
        var rootId=ModuleTree.rootId;//获取树的根节点ID
		var moduleIdsArr = moduleIds.split(',');//将设置后的模块ID转化为数组
		for ( var i = 0; i < moduleIdsArr.length; i++) {//迭代上述得到的数组
			if(moduleIdsViewStr.indexOf(moduleIdsArr[i]) == -1){//权限复选框被勾选上时跳入循环
				if(ModuleTree.getParentId(moduleIdsArr[i]) == rootId){//过滤一级目录下的子目录（一级目录：例如“日常管理”）
					if("" != (moduleIdsArr[i]) && moduleIdsChangeStr.indexOf(ModuleTree.getItemText(moduleIdsArr[i])) == -1){//去除重复的一级目录
						moduleIdsChangeStr += ModuleTree.getItemText(moduleIdsArr[i])+",";//获取新增权限的一级目录的模块名称,将其追加到moduleIdsChangeStr
					}
				}
			}
		}
		var moduleIdsViewArr = moduleIdsViewStr.split(',');//将设置前的模块ID转化为数组
		for ( var i = 0; i < moduleIdsViewArr.length; i++) {//迭代上述得到的数组
			if(moduleIds.indexOf(moduleIdsViewArr[i]) == -1){//权限复选框被勾选掉时跳入循环
				if(ModuleTree.getParentId(moduleIdsViewArr[i]) == rootId){//过滤一级目录下的子目录（一级目录：例如“日常管理”）
					if("" != (moduleIdsViewArr[i]) && moduleIdsChangeStr.indexOf(ModuleTree.getItemText(moduleIdsViewArr[i])) == -1){//去除重复的一级目录
						moduleIdsChangeStr += ModuleTree.getItemText(moduleIdsViewArr[i])+",";//获取删除权限的一级目录的模块名称,将其追加到moduleIdsChangeStr
					}
				}
			}
		}
		if(moduleIdsChangeStr.indexOf(",") != -1){
			moduleIdsChangeStr = moduleIdsChangeStr.substring(0, moduleIdsChangeStr.length-1);//去掉末尾的逗号
		}
		var url="<%=rootPath%>/fmp/SRoleRightBiz/RoleRightAdd";
		XMLHttp.urlSubmit(url,null,"roleid="+roleId+"&moduleIds="+moduleIds+"&COPYROLEID="+document.getElementById("COPYROLEID").value+"&moduleIdsChangeStr="+moduleIdsChangeStr+"&selectedRoleName="+selectedRoleName);
		hideProgressDiv();
		showMessage(XMLHttp.message);
		//comAjax(url);
	}
	var theObj;
	function hilight(obj)
	{ 
	   if(theObj!=null){theObj.parentNode.style.background = "#ffffff";}
	   if(theObj = obj){obj.parentNode.style.background = "#FFC060";}
	}

	function copyAuthority(){               //复制权限
		if(roleId==""){
			showMessage("MSG0078");//请先选择岗位复制权限！
		}else{
			document.getElementById("COPYROLEID").value = roleId;
			showMessage("MSG0079");//岗位复制权限成功！
		}
	}

	function pasteAuthority(){              //粘贴权限
		var copyRoleId = document.getElementById("COPYROLEID").value;
		if(roleId==""){                     //判断是否选中粘贴对象
			showMessage("MSG0080");//未选择粘贴对象，请先选择岗位粘贴权限！
		}else{
			if(copyRoleId == ""){           //判断是否选择了复制对象
				showMessage("MSG0081");//未选择复制对象，请先选择岗位复制权限！
			}else{
				var url="<%=rootPath%>/fmp/SRoleRightBiz/GetRoleRightModules";
				XMLHttp.urlSubmit(url,null,"roleid="+copyRoleId);
				parent.frames["right"].setTreeCheck(copyRoleId,XMLHttp.message);
				showMessage("MSG0082");//岗位粘贴权限成功！
			}
		}
	}

	function filterRole(obj){                //根据机构编号过滤不属于本机构的岗位
		var url = "<%=rootPath%>/fmp/SRoleRightBiz/ViewRoleList";
		var form = document.forms[0]; 
		    form.action = comUrl(url);	  	
			form.submit();
	}

	function openSinOrgPop(tableModelId,fid,sid,sname,keyLimitCondition){      //打开机构编号的pop窗口
		  var dataObject = new Object();              
		  dataObject. sid= sid;
		  dataObject. sname= sname;
		  if(keyLimitCondition==null){
			  keyLimitCondition='';
		  }
		  if (document.getElementById("keyLimit")){
			  keyLimitCondition = document.getElementById("keyLimit").value+keyLimitCondition;
		  } 
		  var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=singleVPop&showAllButton=true&tableModelId="+tableModelId+"&keyLimit="+keyLimitCondition;
		  openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
		  
		  if (dataObject.trueValue != null) {   //返回给父窗口隐藏域
			  setFieldValue(fid,dataObject.trueValue,dataObject.dispValue);
		  } 
		  if (typeof(doChange) != "undefined") {
			  doChange(document.getElementById('detailId_'+fid));
		  }  	    
	}
</script> 