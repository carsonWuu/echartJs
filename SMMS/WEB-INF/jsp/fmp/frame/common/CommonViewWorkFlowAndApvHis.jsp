<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>流程监控</title>
</head>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%
	String rootPath=request.getContextPath();
	String moduleId=(String)request.getAttribute("moduleId");
%>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<link href="<%=rootPath%>/styles/fmp/apprpve_tabs.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
	/**
	 	加载流程页面
	*/
	function loadWorkFlowView() {
		var url=rootPath+"/fmp/workflow/WorkFlowBiz/ShowWorkFlowEditor?opMode=view&RID=${RID}&FLOWTEMPID=${FLOWTEMPID}&BIZTYPEID=${BIZTYPEID}"; 
		loadDataListXML("workFlowArea",comUrl(url));	
	};
	 
 </script>
<body>
    <div id="con_approve">
        <ul id="tags_approve">
            <li class="selectTag">
            	<a onclick="approveSelectTag('aprovetagContent0',this)" href="javascript:void(0)">流程信息</a>
            </li>  
            <li>
            	<a onclick="approveSelectTag('aprovetagContent1',this)" href="javascript:void(0)">审批历史</a>
			</li>          
        </ul>
	</div>
        <div id="tagContent_approve">
            <div class="tagContent selectTag" id="aprovetagContent0">
            <!-- 加载流程页面 -->
     	         <div id="workFlowArea">     	         
	     	         <iframe id="ifListDate" onload="autoiframesize('ifListDate')" 
								src="<%=rootPath%>/fmp/workflow/WorkFlowBiz/ShowWorkFlowEditor?opMode=view&RID=${RID}&FLOWTEMPID=${FLOWTEMPID}&BIZTYPEID=${BIZTYPEID}"
								marginwidth="0" marginheight="0" frameborder="0" scrolling="auto" height="100%" width="100%">
					</iframe>
     	         </div>
            </div>
            
          	<div class="tagContent" id="aprovetagContent1">
          		<div id="listArea"></div>
         	</div>
    </div>
    <p>
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
    </p>
    
 <script type="text/javascript" defer="true">

	function loadList() {  //显示审批历史列表
		var url = rootPath+"/fmp/workflow/ApproveWorkFlowBiz/HisDataList?tableModelId=WfFlowApvHisDateListShow&RID=${RID}&BIZTYPEID=${BIZTYPEID}";
		
		loadDataListXML("listArea",comUrl(url));	
	}
	loadList();
</script>
    
 <jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />   
</body>
</html>