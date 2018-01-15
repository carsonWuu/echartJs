<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%
	String rootPath=request.getContextPath();
	String flowinstanceId=(String)request.getParameter("STATE123");
	String flowinstanceId2=(String)request.getAttribute("STATE123");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 
<link rel="stylesheet" type="text/css"	href="<%=rootPath %>/styles/fmp/apprpve_tabs.css" />

<title>流程审批</title>
</head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" /> 
<body>
	       	 <div id="mettingApvListArea" style="display:'none';width:100%; height:auto； ">
	       	 
					<iframe id="ifListDate" onload="autoiframesize('ifListDate')" 
							src="<%=rootPath%>/fmp/FrameCommonBiz/DoList?tableModelId=WfMeetingApvHis&isUpdateListMode=true&opMode=update&isSubTbl=true&keyLimit=FLOWINSTANCEID:${FLOWINSTANCEID},FLOWTEMPID:${FLOWTEMPID},NODEID:${NODEID}&freezeValue=APPROVERCONDI:${APPROVERCONDI}"
							marginwidth="0" marginheight="0" frameborder="0" scrolling="no" height="auto" width="100%">
					</iframe>
     	     </div> 
	       <table style="width:100%;">
	       
    	    <tr>
				<td  style="width:10%;">审批意见</td>
				<td  style="width:90%;" ><textarea  class="textarea_classname" id = "APPROVENOTION" onpropertychange="setMaxLength(this,200)" oninput="setMaxLength(this, 250)">${APPROVENOTION}</textarea><font color="red">*</font></td>
		  	</tr> 
			<tr >
				<td style="width:10%;">审批结果</td> 
				<td style="width:90%;">
			  	 <input type="radio" name="apvresultradio" id="radio_agree" value="1" onclick="isshow('1');">同意
			  	 <input type="radio" name="apvresultradio" id="radio_refuse" value="2" onclick="isshow('2');">否决
			  	 <input type="radio" name="apvresultradio" id="radio_condition" value="3" onclick="isshow('3');">有条件通过  
			  	 <input type="radio" name="apvresultradio" id="" value="4" onclick="isshow('4');">打回到发起人   
			  	 <input type="radio" name="apvresultradio" id="" value="5" onclick="isshow('5');">打回到特定节点
			  	 <font color="red">*</font>
		   		</td>
		   	</tr>
		   	<tr id="conditionTr">
				<td  style="width:10%;">通过条件</td>
				<td  style="width:90%;" >
				   <textarea  class="textarea_classname" id ="PASSCONDITION" onpropertychange="setMaxLength(this,200)" oninput="setMaxLength(this, 250)" >${PASSCONDITION}</textarea><font color="red">*</font>
				</td>
		  	</tr>
		  	
		  	
		  	
		  	<tr id="checkCondDescTr">
				<td  style="width:10%;">通过条件检查情况</td>
				<td  style="width:90%;" >
				   <textarea  class="textarea_classname" id ="CHECKCONDDESC"  onpropertychange="setMaxLength(this,200)" oninput="setMaxLength(this, 250)">${CHECKCONDDESC}</textarea><font color="red">*</font>
				</td>
		  	</tr>
		  	<tr id="checkCondResultTr">
				<td style="width:10%;">通过条件检查结果</td> 
				<td style="width:90%;">
			  	 <input type="radio" name="checkresultradio" id="radio_allMatch" value="1" >全部条件满足
			  	 <input type="radio" name="checkresultradio" id="radio_partMatch" value="2" >部分条件不满足
			  	 <input type="radio" name="checkresultradio" id="radio_noMatch" value="3" >全部条件不满足
			  	 <font color="red">*</font>
		   		</td>
		   	</tr>
		   	
		    <tr id="rediscussTr1">
				<td  style="width:10%;">复议原因</td>
				<td  style="width:90%;" ><textarea  class="textarea_classname" id = "REDISCUSSREASON" readOnly>${REDISCUSSREASON}</textarea></td>
		  	</tr>
		  	<tr id="rediscussTr2">
				<td  style="width:10%;">备注</td>
				<td  style="width:90%;" ><textarea  class="textarea_classname" id = "REDISCUSSREMARK" readOnly>${REDISCUSSREMARK}</textarea></td>
		  	</tr>
		  	<tr id="rediscussTr3">
				<td  style="width:10%;">复议申请人</td>
				<td  style="width:90%;" ><input  class="input_text_classname" id = "REDISCUSSMANTRANS" readOnly></input></td>
		  	</tr>
		  	<tr id="rediscussTr4">
				<td  style="width:10%;">复议时间</td>
				<td  style="width:90%;" ><input class="input_text_classname" id = "REDISCUSSTIME" readOnly></input></td>
		  	</tr>
				
		  	
		  	
		   	<tr id="tr_buttonArea">
	   			<td align="center" colspan="2">
		   		<br><br><br>
					<div  align="center" style="width=100%; text-overflow=ellipsis; overflow=hidden;">
						<input type="button" id="DoSave" class="h5button green medium" value="保存" onclick="doSave();"></input>
						<input type="button" id="DoSubmit" class="h5button green medium" value="提交" onclick="doSubmit();"></input>
					</div>
				</td>
			</tr>
	 	
	 	 </table>       	           	   		
				<input type="hidden" name="flowInstanceId" value="${FLOWINSTANCEID}" id="flowInstanceId" />
				<input type="hidden" name="flowInstanceDate" value="${FLOWTEMPID}" id="flowtempId" />
				<input type="hidden" name="flowInstanceDate" value="${NODEID}" id="nodeId" />
				<input type="hidden" name="flowInstanceDate" value="${NODEBIZTYPE}" id="nodeBizType" />
				<input type="hidden" name="flowInstanceDate" value="${PASSRATE}" id="passrate" />
				<input type="hidden" name="flowInstanceDate" value="${CONDICONFIRM}" id="condiconfirm" />
				<input type="hidden" name="flowInstanceDate" value="${ISLASTREJECT}" id="isLastReject" />
				<input type="hidden" name="flowInstanceDate" value="${SMSSENDCOND}" id="smssendCond" />
				<input type="hidden" name="flowInstanceDate" value="${SMSTEMPCODE}" id="smstempCode" />
				<input type="hidden" name="flowInstanceDate" value="${ISCHECKCONDITION}" id="iscCheckCondition" /> 
</body>
 <script type="text/javascript" >
 	//需要后加载 setObjEvens(
	//界面初始化数据
	function putValue(){
		var oldapproveResult ="${APPROVERESULT}";
		var oldCheckCondResult ="${CHECKCONDRESULT}" ;
		var oldRediscussMan ="${REDISCUSSMAN}" ;
		var oldRediscussTime ="${REDISCUSSTIME}" ;
		//若存在复议申请人
		if(oldRediscussMan !=''){
			document.getElementById('REDISCUSSMANTRANS').value = oldRediscussMan;
			document.getElementById('REDISCUSSTIME').value = oldRediscussTime;
		}else{
			$("#rediscussTr1").hide();
			$("#rediscussTr2").hide();
			$("#rediscussTr3").hide();
			$("#rediscussTr4").hide();
//			document.getElementById('rediscussTr1').style.display='none'; 
//			document.getElementById('rediscussTr2').style.display='none'; 
//			document.getElementById('rediscussTr3').style.display='none'; 
//			document.getElementById('rediscussTr4').style.display='none'; 
		}
		
		radioSelected(oldapproveResult,'apvresultradio');
		radioSelected(oldCheckCondResult,'checkresultradio');

		if(oldapproveResult == '3'){
			$("#conditionTr").show();
			//document.getElementById('conditionTr').style.display='block'; 
		}else{
			$("#conditionTr").hide();
			//document.getElementById('conditionTr').style.display='none'; 
		}		
	}
 

	function loadApproveHisList() {  //显示审批历史列表
		var url = rootPath+"/fmp/workflow/ApproveWorkFlowBiz/DataList?tableModelId=WfFlowApvHisDateListShow&customCondition= and fah.FLOWINSTANCEID='${FLOWINSTANCEID}'";
		loadDataListXML("listArea",comUrl(url));	
	}


	function loadMettingApvSet() {  //显示会签审批历史列表，审批结果设为只读
		if("${NODEBIZTYPE}" == "1"){  //流程节点功能类型-会签节点
			var radioObjs = document.getElementsByName('apvresultradio');
			for (var i = 0;i<radioObjs.length;i++){	
					radioObjs[i].disabled="disabled"; 
			}
			//document.getElementById('mettingApvListArea').style.display='block'; 
			$("#mettingApvListArea").show();
		}else{
			$("#mettingApvListArea").hide();
		}  
	}
	

	function checkCondSet(){
		if('${CONDICONFIRM}' == '1'){
			$("#checkCondDescTr").show();
			$("#checkCondResultTr").show();
			//document.getElementById('checkCondDescTr').style.display='block'; 
			//document.getElementById('checkCondResultTr').style.display='block';
		}else{
			$("#checkCondDescTr").hide();
			$("#checkCondResultTr").hide();			
			//document.getElementById('checkCondDescTr').style.display='none'; 
			//document.getElementById('checkCondResultTr').style.display='none';
		}


		if('${ISCHECKCONDITION}' == '1'){
			$("#radio_condition").attr("disabled", false); 
			//document.getElementById('radio_condition').disabled=false; 
		}else{
			$("#radio_condition").attr("disabled", true); 
			//document.getElementById('radio_condition').disabled=true;
		}
	}

	putValue();
	loadApproveHisList();
	loadMettingApvSet();
	checkCondSet();
	
 </script>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 