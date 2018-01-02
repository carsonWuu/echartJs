<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.HashSet"%>
<%@ page import="java.util.Set"%>
<%
	String rootPath = request.getContextPath();
%>
<html xmlns:v="urn:schemas-microsoft-com:vml">
<link href='<%=rootPath%>/styles/fmp/workflow.css'
	rel='stylesheet' type='text/css'>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>WEB流程图编辑器</title>
<style type="text/css">
v\:*{BEHAVIOR:url(#default#VML)}
</style>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script src="<%=rootPath%>/scripts/fmp/flowEditor.js" type="text/javascript" language="javascript"></script>
</head>
<body class='btype'  onload="document.getElementById('flowEditor').focus();" oncontextmenu="self.event.returnvalue=false">
<div id="tool"></div>
<div id="flowEditor" onselectstart="return false;"><!-- onselectstart,该div中的内容不能被鼠标选中 -->
</div>
<script>
	var flowtempid ='${FLOWTEMPID}';
	var firstNodeId = '${CURRNODEID}';
	var currNodeId ='${CURRNODEID}';
	var currApproverSet = '${CURRAPPROVERSET}';
	var flowtempName = fmpDecodeURI('${FLOWTEMPNAME}');
    var rootPath= '<%=rootPath%>';
	var wf = new WorkFlow();
	var m = new Menu();
	if('${opMode}' == "view"){
		wf.init("view",'${CURRNODEID}'); //查看模式 
		m.init("view");
	}else if('${opMode}' == "simul"){
		wf.init("simul"); //模拟模式 
		m.init("simul");
	}else{
		wf.init("edit");   //编辑模式
		m.init("edit");
	}	
	wf.setEditorArea();
	var dbJsonStr = '${jsonStr}'; 
//  var str = '{"nodes":[{"NODEBIZTYPE":"0","CREATORID":"admin","NODETYPE":"1","RID":"1bf00806efdc409d856604c915421dd0","POSTTOP":218,"ORGEXTSET":"1","CREATTIME":"2012-02-14 15:40:22 ","NODEID":"201221116219171","POSTLEFT":482,"FLOWTEMPID":"000002LCMB","NODENAME":"新节点3"},{"NODEBIZTYPE":"0","CREATORID":"admin","NODETYPE":"1","RID":"83b50365fd8d4b3eb60bf95794fc8c86","POSTTOP":218,"ORGEXTSET":"1","CREATTIME":"2012-02-14 15:40:22 ","NODEID":"201221116219703","POSTLEFT":330,"FLOWTEMPID":"000002LCMB","NODENAME":"新节点2"},{"NODEBIZTYPE":"0","CREATORID":"admin","NODETYPE":"1","RID":"ae41311ae6894f1b97b01bf7640a0385","POSTTOP":208,"ORGEXTSET":"1","CREATTIME":"2012-02-14 15:40:22 ","NODEID":"201221116220312","POSTLEFT":154,"FLOWTEMPID":"000002LCMB","NODENAME":"新节点1"},{"NODEBIZTYPE":"0","CREATORID":"admin","NODETYPE":"1","RID":"552fda2293684b07ade03528d6e3559b","POSTTOP":85,"NODEID":"201221116220906","ORGNAMESET":"昆山,深圳泛华联合投资集团有限公司无锡分公司,泰州,启东泛华财务管理有限公司,深圳泛华联合投资集团有限公司南通分公司","FLOWTEMPID":"000002LCMB","NODENAME":"新节点","POSTDEFINE":"1,1","ORGEXTSET":"1","CREATTIME":"2012-02-14 15:40:22 ","POSTLEFT":343,"ORGDEFINE":"024,021,020,019,018","POSTNAMESET":"TEST,TEST2"},{"CREATORID":"admin","NODETYPE":"0","RID":"ae5fc042e8054b5ca53cd37b1ea42560","POSTTOP":80,"CREATTIME":"2012-02-14 15:40:22 ","NODEID":"000","POSTLEFT":100,"FLOWTEMPID":"000002LCMB","NODENAME":"开始"},{"CREATORID":"admin","NODETYPE":"2","RID":"cbbc006f92754baabd4fb1d272de6d6a","POSTTOP":429,"CREATTIME":"2012-02-14 15:40:22 ","NODEID":"999","POSTLEFT":325,"FLOWTEMPID":"000002LCMB","NODENAME":"结束"}],"lines":[{"CREATORID":"admin","RID":"1cfefe6fc7a64b50adaf17b86b6fcc94","CREATTIME":"2012-02-14 15:40:22 ","TONODE":"201221116220906","LINKID":"201221116232187","FROMNODE":"000","FLOWTEMPID":"000002LCMB"},{"ROUTECONDITION":" $#aaa#=11  and  $#bbb#= 22","CREATORID":"admin","RID":"9c521be4eab84e37a0a5678db398eceb","CREATTIME":"2012-02-14 15:40:22 ","TONODE":"201221116220312","LINKID":"201221116233203","FROMNODE":"201221116220906","FLOWTEMPID":"000002LCMB"},{"ROUTECONDITION":" $#aaa#=11  and  $#bbb#= 11","CREATORID":"admin","RID":"6af17304b0b948f381fd92ca6e0f37fa","CREATTIME":"2012-02-14 15:40:22 ","TONODE":"201221116219703","LINKID":"201221116235218","FROMNODE":"201221116220906","FLOWTEMPID":"000002LCMB"},{"ROUTECONDITION":" $#aaa#=11  and  $#bbb#= 11","CREATORID":"admin","RID":"3fd135561ee54c5b867462b7f631fcf9","CREATTIME":"2012-02-14 15:40:22 ","TONODE":"201221116219171","LINKID":"201221116236453","FROMNODE":"201221116220906","FLOWTEMPID":"000002LCMB"},{"CREATORID":"admin","RID":"56f0e1596bbc48f4be6f48752b409286","CREATTIME":"2012-02-14 15:40:22 ","TONODE":"999","LINKID":"201221116240687","FROMNODE":"201221116220312","FLOWTEMPID":"000002LCMB"},{"CREATORID":"admin","RID":"fcd6f5f2f6b34ad3b2ed61dee1ac70a3","CREATTIME":"2012-02-14 15:40:22 ","TONODE":"999","LINKID":"201221116242718","FROMNODE":"201221116219703","FLOWTEMPID":"000002LCMB"},{"CREATORID":"admin","RID":"b01a5e22c4f14f2094558c40b05deb62","CREATTIME":"2012-02-14 15:40:22 ","TONODE":"999","LINKID":"201221116244390","FROMNODE":"201221116219171","FLOWTEMPID":"000002LCMB"}]}';
	var j = JSON.decode(dbJsonStr);  
    wf.jsonTo(j);
    var initJson = wf.toJson();  ///初始生成流程图的json串 
	
</script>

<DIV id=bg></DIV>
<DIV class=hidden id=selectItem>
	<DIV class="tit bgc_ccc move">
	<H2 class=left>参数设置</H2>
	<SPAN class="pointer right" onclick="openBg(0);openSelect(0);">[取消]</SPAN> 
	<SPAN class="pointer right" onclick="makeSure();">[确定]</SPAN>
	</DIV>
		<DIV class=cls></DIV>
		<DIV class=cont>
			<DIV id=selectSub>
				<table>
					<tr>
						<td>业务类型：</td>
						<td><select class="x-form-field" id="bizTableModelId">
								<option value="">- - 请选择 - -</option>								
							<%
								Map biztypeMap = FMPContex.getDicTypeMap("CRD_BIZTYPE",null);
									 Set<String> set = new HashSet<String>();
								  	 set= biztypeMap.keySet();
								 	 for (String key : set) {
							%>
								  <option value="<%=key %>" ><%=biztypeMap.get(key) %></option>
							<% 
								 	 }
							%>
							</select>
						</td>
					</tr>
					<tr>
						<td>测试实例：</td>
						<td>
						<input class="x-form-field" type="text" id="bizRid" value=""/>
						<button id="" class="btn" onclick="openInstancePop()">...</button>
						</td>
					</tr>
				</table>
			</DIV>
		</DIV>
	</DIV>
</body>
</html>

<script language="JavaScript">
	var parmaeterStr ="";
	var nodeIdArray = new Array(); //用于存放流转过的节点ID
	function openInstancePop(){
		var tableModelId = $('#bizTableModelId').val();
		if(tableModelId == ''){
			showMessage("MSG0088");//请先选择业务类型！
			return;
		}
		var dataObject = new Object();
		dataObject.sid= "RID";
		dataObject.sname= null;
		dataObject.trueValue= null;
		dataObject.dispValue= null;
		var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=singleVPop&tableModelId="+tableModelId;
		openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");

		if(dataObject.trueValue !=null){
			document.getElementById('bizRid').value = dataObject.trueValue;
		}
	}

	function makeSure(){
		var bizTableModelId = $('#bizTableModelId').val();
		var bizRid = $('#bizRid').val();
		if(bizTableModelId == ''){
			showMessage("MSG0088");//请先选择流程类型！
			return;
		}
		if(bizRid == ''){
			showMessage("MSG0089");//请先选择测试实例！
			return;
		}
		
		var parmaeterObj = getDataListObj('${PARAMETERSQL}','RID='+bizRid);
		parmaeterStr = JSON.encode(parmaeterObj);
		wf.signNode(currNodeId);
		nodeIdArray.push('000');  //存放开始节点
		openBg(0);
		openSelect(0);
	}
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 