<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>流程审批历史</title>
</head>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%
	String rootPath=request.getContextPath();
	String moduleId=(String)request.getAttribute("moduleId");
	String reportTempId=(String)request.getAttribute("REPORTTEMPID");
	Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");
	String riskBillType = (String) detailDataMap.get("RISKBILLTYPE");	
%>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<link href="<%=rootPath%>/styles/fmp/apprpve_tabs.css" rel="stylesheet" type="text/css" />
<body>
    <div id="con_approve">
        <ul id="tags_approve">
            <li class="selectTag">
            	<a onclick="approveSelectTag('aprovetagContent0',this)" href="javascript:void(0)">审批历史</a>
            </li>
            <li>
            	<a onclick="approveSelectTag('aprovetagContent1',this,true)" href="javascript:void(0)">审批内容</a>
			</li>  
            <li id="apvAttLi" style="display:none">
            	<a onclick="approveSelectTag('aprovetagContent2',this)" href="javascript:void(0)" >审批附件</a>
            </li>            
        </ul>
	</div>
        <div id="tagContent_approve">
            <div class="tagContent selectTag" id="aprovetagContent0">
     	         <div id="listArea"></div>
     	         <div id="reDisArea"></div>
            </div>
            
            
            
          <div class="tagContent" id="aprovetagContent1">
             
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
    </div>
    <div  align="center"><input type="hidden" id="DoClose" class="button_mouseout" onmouseover="this.className='button_mouseover'" onmouseout="this.className='button_mouseout'"
                        onmousedown="this.className='button_mousedown'" onmouseup="this.className='button_mouseover'" value="关闭" onclick="closeWindow();"></input></div>
    <p>
<script type="text/javascript">
     function approveSelectTag(showContent, selfObj,refreshDiv) {
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
         var showContectObj = document.getElementById(showContent);
         showContectObj.style.display = "block";

         //点击标签页刷新div
		 if(typeof refreshDiv != "undefined"){
			 if(refreshDiv){
				 showContectObj.innerHTML = showContectObj.innerHTML;
			 }
	      }

     }

 </script>
    </p>
    
 <script type="text/javascript">
 var tableModelId="WfFlowApvHisDateListShow";
	function loadList() {
		var temp_freezeCondition = "${freezeCondition}";

		//当审批业务是退单或者反退单时，从地址带过来的freezeCondition中带有REUNTREADSTATE(退单状态)字段不需要用于审批历史的查询条件，故在此处去掉。
		if(temp_freezeCondition.indexOf("REUNTREADSTATE")!=-1){
			temp_freezeCondition = temp_freezeCondition.substring(0,temp_freezeCondition.lastIndexOf("and"));
		}
		
		var url = rootPath+"/fmp/workflow/ApproveWorkFlowBiz/HisDataList?tableModelId=WfFlowApvHisDateListShow&RID=${RID}&freezeCondition="+temp_freezeCondition+"&BIZTYPEID=${BIZTYPEID}";
		loadDataListXML("listArea",url);	
	};
	loadList();
	
	//若存在模板id，则审批内容显示该模板数据
	if('' != '${REPORTTEMPID}'){
		loadApvTempView('${REPORTTEMPID}', '${RID}');
	}
	
	function loadReDisView() {
		var url = rootPath+"/fmp/workflow/ApproveWorkFlowBiz/ViewFlowReDiscuss?tableModelId=WfReDiscuss&RID=${RID}&BIZTYPEID=${BIZTYPEID}";
		loadDataListXML("reDisArea",url);	
	};
	
	if('${showOpMode}' =='reDiscuss'){
		loadReDisView();
		addButton('DoClose','提交复议','reDisSubmit()','h5button green medium');
		
	
	}

	function reDisSave(){
		var form=document.getElementById("reDiscussForm");
		var result =checkAll(form);
		if(result){
		    var url = "<%=rootPath%>/fmp/workflow/ApproveWorkFlowBiz/SaveFlowReDiscuss";
		    XMLHttp.formSubmit(form,comUrl(url));
			return true;
		}else{
			return false;
		}
		
	}
	function reDisSubmit(){
		if (confirm("是否确认要提交？")) {
			if(reDisSave()){
				doRefreshList();
				closeWindow();
			}
		}
	}

</script>
    
 <jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />   
</body>
</html>
</html>