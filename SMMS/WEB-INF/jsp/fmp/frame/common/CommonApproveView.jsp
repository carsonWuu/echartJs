<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%
	String rootPath=request.getContextPath();
	String moduleId=(String)request.getAttribute("moduleId");
	String bizTypeId=(String)request.getAttribute("BIZTYPEID");
	String reportTempId=(String)request.getAttribute("REPORTTEMPID");
	Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");
	String riskBillType = null;
	if (detailDataMap != null){
		riskBillType = (String) detailDataMap.get("RISKBILLTYPE");	
	}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>流程审批</title>
</head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<link href="<%=rootPath%>/styles/fmp/apprpve_tabs.css" rel="stylesheet" type="text/css" />

<body>
    <div id="con_approve">
        <ul id="tags_approve">  
            <li class="selectTag">
            	<a onclick="approveSelectTag('aprovetagContent0',this)" href="javascript:void(0)">审批内容</a>
			</li>  
            <li id="apvAttLi" style="display:none">
            	<a onclick="approveSelectTag('aprovetagContent2',this)" href="javascript:void(0)" >审批附件</a>
            </li>  
            <li>
            	<a onclick="approveSelectTag('aprovetagContent1',this)" href="javascript:void(0)">审批意见</a>
            </li>        
        </ul>
	</div>
        <div id="tagContent_approve">
            
            
            
          <div class="tagContent selectTag" id="aprovetagContent0" style="height:95%">
          	<% 
          	if(reportTempId != null && !"".equals(reportTempId)) {//若模板id不为空，则审批内容显示模板内容
          	%>
          	         <iframe
							id="approve_InfoFrame" 
							overflow-x="no"
							name="approve_InfoFrame" 
							frameborder="0" scrolling="auto" height="500" width="100%">
					 </iframe>          		

          		<%
          	}else if(riskBillType != null && !"".equals(riskBillType)) {//若风控单类型不为空，则显示风控单
          		%>
					<iframe id="ifRiskDate" onload="autoiframesize('ifRiskDate')" 
							src="<%=rootPath%>/credit/riskManage/riskBill/riskBillBiz/riskBillPage?RID=${RID}&isReadOnly=true"
							marginwidth="0" marginheight="0" frameborder="0" scrolling="no" height="auto" width="100%">
					</iframe>          		

          		<%
          	}else{
				%>
             <jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/ViewData.jsp" />          
             	<%
          	}
             %>            
          	         
          	
          </div>
          <div class="tagContent" id="aprovetagContent2">
          			<iframe
							id="Attachment_InfoFrame" 
							overflow-x="no"
							name="Attachment_InfoFrame" 
							frameborder="0" scrolling="auto" height="500" width="100%">
					 </iframe>   
          </div>
          
          <div class="tagContent" id="aprovetagContent1">
            				<div id="listArea"></div>
     	           	   		<div id="approveArea"></div>
          </div>
            
    </div>


<script type="text/javascript">
     function approveSelectTag(showContent, selfObj) {
         // 操作标签
         var tag = document.getElementById("tags_approve").getElementsByTagName("li");
         var taglength = tag.length;
         for (i = 0; i < taglength; i++) {
             tag[i].className = "";
         }
         selfObj.parentNode.className = "selectTag";
         // 操作内容
         for (i = 0; j = document.getElementById("aprovetagContent" + i); i++) {
             j.style.display = "none";
         }
         document.getElementById(showContent).style.display = "block";
     }
     
 </script>
<script type="text/javascript">
	function loadView() {
		var url = rootPath+"/fmp/workflow/ApproveWorkFlowBiz/DoApprove?RID=${RID}&BIZTYPEID=${BIZTYPEID}"; 
		loadDataListXML("approveArea",comUrl(url));	
	};
	


	//若存在模板id，则审批内容显示该模板数据
	if('' != '${REPORTTEMPID}'){
		loadApvTempView('${REPORTTEMPID}', '${RID}');
	}


	



	loadView();

	var approveResult=""; 
	var approveNotion="";
	var passCondition="";	
	var checkCondDesc ="" ;
	var checkCondResult ="" ;
	var isLastReject = "";
	var smssendCond = "";
	var smstempCode = "";
	/**
	 *获取页面数据并校验是否为空	
	 */

	function getValue(){		
		isLastReject = document.getElementById('isLastReject').value;
		smssendCond = document.getElementById('smssendCond').value;
		smstempCode = document.getElementById('smstempCode').value;

		
		approveNotion=document.getElementById('APPROVENOTION').value;
		if(approveNotion == ""){
			showMessage("MSG0055");//审批意见不能为空！
			return false;
		}		
		var radioObjs = document.getElementsByName('apvresultradio');
		for (var i = 0;i<radioObjs.length;i++){
			if(radioObjs[i].checked){
				approveResult =radioObjs[i].value;
			}
		}
		if(approveResult == ""){
			showMessage("MSG0056");//审批结果不能为空！
			return false;
		}
		if(approveResult == "3"){
			passCondition = document.getElementById('PASSCONDITION').value;
			if(passCondition ==""){
				showMessage("MSG0057");//通过条件不能为空！
				return false;
			}
		}

		if(document.getElementById('condiconfirm').value == "1"){
			checkCondDesc = document.getElementById('CHECKCONDDESC').value;
			if(checkCondDesc ==""){
				showMessage("MSG0058");//通过条件检查情况不能为空！
				return false;
			}
			var radioObjs = document.getElementsByName('checkresultradio');
			for (var i = 0;i<radioObjs.length;i++){
				if(radioObjs[i].checked){
					checkCondResult =radioObjs[i].value;
				}
			}
			if(checkCondResult == ""){
				showMessage("MSG0059");//通过条件检查结果不能为空！
				return false;
			}
		}
				
	}
	
	function doSave(){
		if(getValue()==false){
			return;
		}
		var url = rootPath+"/fmp/workflow/ApproveWorkFlowBiz/DoSave?APPROVERESULT="+approveResult
		             +"&APPROVENOTION="+fmpEncodeURI(fmpEncodeUrlParam(approveNotion))
		             +"&PASSCONDITION="+fmpEncodeURI(fmpEncodeUrlParam(passCondition))
		             +"&FLOWINSTANCEID="+document.getElementById('flowInstanceId').value
		             +"&FLOWTEMPID="+document.getElementById('flowtempId').value
		             +"&NODEID="+document.getElementById('nodeId').value
		             +"&CHECKCONDDESC="+fmpEncodeURI(fmpEncodeUrlParam(checkCondDesc))
		             +"&CHECKCONDRESULT="+checkCondResult;
		openModalDialog(url,"","scroll:no; center:yes; resizable:yes; dialogWidth:600px;dialogHeight:350px");
		//loadList();
	}

	

	function doSubmit(){
		if (confirm("是否确认要提交？")) {
			if(getValue()==false){
				return;
			}
			var toNodeId = null;
			if(approveResult == "5"){  //打回到特定节点 
				if(selectedRid == "" ||  typeof(selectedRid) =="undefined"){
					showMessage("MSG0060");//请在列表选择打回的目标节点！
					return;
				}else{
					if(getDataListDisplayValue(selectedRid,"STATE")=="无效"){
						showMessage("MSG0061");//请选择'有效'状态的流程节点！
						return;
					}else{
						toNodeId = getDataListDisplayValue(selectedRid,"NODEID");
						if(toNodeId == document.getElementById('nodeId').value){
							showMessage("MSG0062");//请选择除当前节点外的有效节点！
							return;
						}
					}
				}
			}
			if(approveResult == "4"){  //打回到发起人
				toNodeId = "000";
			}
			var url = rootPath+"/fmp/workflow/ApproveWorkFlowBiz/DoSubmit?APPROVERESULT="+approveResult
            +"&APPROVENOTION="+fmpEncodeURI(fmpEncodeUrlParam(approveNotion))
            +"&PASSCONDITION="+fmpEncodeURI(fmpEncodeUrlParam(passCondition))
            +"&FLOWINSTANCEID="+document.getElementById('flowInstanceId').value
            +"&FLOWTEMPID="+document.getElementById('flowtempId').value
            +"&NODEID="+document.getElementById('nodeId').value
            +"&NODEBIZTYPE="+document.getElementById('nodeBizType').value
            +"&CHECKCONDDESC="+fmpEncodeURI(fmpEncodeUrlParam(checkCondDesc))
            +"&CHECKCONDRESULT="+checkCondResult
            +"&toNodeId="+toNodeId
            +"&bizRid=${RID}"
            +"&ISLASTREJECT="+isLastReject
            +"&SMSSENDCOND="+smssendCond
            +"&SMSTEMPCODE="+smstempCode
            +"&opMode=submit";
            var dataObject = new Object();   
			openModalDialog(url,dataObject,"scroll:no; center:yes; resizable:yes; dialogWidth:600px;dialogHeight:350px");
			dataObject.backCall=function(){
				doRefreshList();  
				closeWindow();
			};
  
		}
	}
	
	function isshow(type){
			if(type == '3'){  //有条件通过
				$("#conditionTr").show();
				//document.getElementById('conditionTr').style.display='block';
			}else{
				document.getElementById('PASSCONDITION').value ='';
				$("#conditionTr").hide();
				//document.getElementById('conditionTr').style.display='none';
				if(type == '5'){   //打回指定节点
					selectedRid ='';
				}
			}		
	}



</script> 
      
 <jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />   
</body>
</html>