<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="java.util.Iterator"%>  
<%@ page import="java.util.Map"%>  
<%@ page import="java.util.Collection"%> 
<%@ page import="com.zstar.fmp.log.FMPLog"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="java.util.List"%>    
<%
	String rootPath = request.getContextPath();	
	String productTypes = (String)request.getAttribute("productTypes");
	String productTypeNames = (String)request.getAttribute("productTypeNames");
	String[] productType=productTypes.substring(1).split(",");
	String[] productTypeName=productTypeNames.substring(1).split(",");
	FMPLog.printLog("得到的产品类型==========="+productTypes);
	FMPLog.printLog("得到的产品类型名字========"+productTypeNames);

%>
<html>
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<!-- 
<link href="<%=rootPath%>/styles/fmp/list.css" rel="stylesheet" type="text/css" />
 -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" >
var topWindow = getMainWindow();
//var currFrame = topWindow.frames['ifData'+currDivId];

//alert("currDivId==========="+currDivId);
var dataObject = topWindow.dataObject;
topWindow.dataObject = null;
function doAdd(){
	var boxsvalues="";
	var boxsgrouptype="";
	var boxs = document.getElementsByName("productBox");
	for(var i=0;i<boxs.length;i++){	
		if(boxs[i].checked){
		    boxsvalues=boxsvalues+","+boxs[i].value;
		    boxsgrouptype=boxsgrouptype+","+$(boxs[i]).attr("productType");		    
		}
	}
	dataObject.productIds = boxsvalues;
	dataObject.productTypes = boxsgrouptype;
	if(boxsvalues == "" && boxsgrouptype == ""){
		showMessage("MSG0047");//未添加产品，请您重新确认！
		return;
	}
	if (typeof dataObject.backCall != "undefined"){
		dataObject.backCall();
	}	
	closeWindow();
}


function doCheckClick(grouptype,thisObj){
	var boxs = document.getElementsByName("productBox");
	var isCheckBox = "<%=request.getParameter("isCheckBox")%>";
	for(var i=0;i<boxs.length;i++){	
		if (boxs[i] != thisObj){
			if(isCheckBox != "true"){
				if( grouptype == 0){//普通类			
				/*	if(boxs[i].groupType==grouptype){				
						boxs[i].checked = false;
						}	*/		
				}else if(grouptype == 1 ){//资金类
					if(boxs[i].groupType==grouptype){
						boxs[i].checked = false;
						}
				}
			}
		}
	}        
}
</script>
<title>批量增加项目产品页面</title>
</head>
<style>
.getWap {
	Z-INDEX: 301; POSITION: relative; MARGIN-TOP: -1px; 
}
  .getAdvance
  { 
     BORDER-BOTTOM: #d1d1d1 1px dashed; 
     PADDING-BOTTOM: 2px; 
     LINE-HEIGHT: 22px; 
     MARGIN: 0px 10px; 
     PADDING-LEFT: 0px;  
     PADDING-RIGHT: 0px; 
     OVERFLOW: hidden; 
     PADDING-TOP: 7px
     
  }
</style>
<body>


<div class="getWap" id="J-getWap">
                     
          	<form name="chooseForm">
                <% 
                for(int i=0;i<productTypeName.length;i++){
                	
                	String productNamedisp=productTypeName[i];
                	int idx=1;
        			String productTypedisp=productType[i];
        			List productList=(List)request.getAttribute("productList_"+productTypedisp);
        			if(productList != null && productList.size() >0){
                %>
               
                <dl id="productGroup" class="getAdvance">
                 
                	<dt style="COLOR: #777"  ><%=productNamedisp%> </dt>
                	
                    <dd id="productGroup_<%=productNamedisp%>" style="COLOR: #05a" >
                    <table><tr>
                	    <%//for(int j=0;i<productType.length;j++){
                	        
                			for(Iterator it=productList.iterator();it.hasNext();idx++){
                				Map productMap=(Map)it.next();
                				if (idx>6){
            						idx = 1;%>
            						</tr><tr>
            						<% 
            					}
                				String productName=(String)productMap.get("PRODUCTNAME");
                				String productCode=(String)productMap.get("PRODUCTCODE");
                			
                		 %>
                		 <td>
                		<i><input type="checkbox" id="productBox_<%= productCode %>" name="productBox" value="<%= productCode %>"  groupType="<%=i %>" onclick="doCheckClick(<%=i %>,this)" productType="<%=i+1 %>"/><%= productName %></i>                        
                        </td>
                        <%}
                			
                		%>
                		</tr></table>
                	</dd>
                	
                </dl> 
               		<%} %>
                 <%} %>
            <br><br>       
            <div  class="div_detailButton"  align="center">
				<input type="button" id="DoAddSave" class="h5button green medium" value="确认" onclick="doAdd();"></input>
				<input type="reset" class="h5button orange medium" value="重置" />
				<input type="button" id="DoClose" class="h5button orange medium" value="关闭" onclick="closeWindow();"></input>
			</div>                          
            </form>
            </div>


</body>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 