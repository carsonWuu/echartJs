<!-----------------------------------
* @文件描述：数据列表展示
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>    
<%@ page import="java.util.Iterator"%>  
<%@ page import="java.util.Map"%>  
<%@ page import="java.util.Collection"%> 
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page import="com.zstar.fmp.utils.Page"%>  
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
 <%
 List<?> searchDataList = ( List<?>)request.getAttribute("searchDataList");
 TableModel currTblMdl = (TableModel)request.getAttribute("tableModel");
 //List<String> searchParamListKV = (List<String>)request.getAttribute("searchParamListKV");
 Map<String, Object> searchParamPrintMap = (Map<String, Object>)request.getAttribute("searchParamPrintMap");
 String searchParamPrintMapStr = searchParamPrintMap.toString().substring(1,searchParamPrintMap.toString().lastIndexOf("}"));
 Page showPage = (Page)request.getAttribute("page");
 String rootPath=request.getContextPath();
 %>
<html>
<head>
<title> </title>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
</head>
 <input type="hidden" id="keyLimit" name="keyLimit" value="${keyLimit}"/>
<body>
<!-- 
	<%
	/*
	  if(searchParamListKV != null && searchParamListKV.size()>0){
		  out.println("<table class=\"d_table\" align=\"center\" width=\"100%\">");
		  int count = 0;
		  //获取列表的查询条件,并设置到td中
		  for(Iterator it = searchParamListKV.iterator(); it.hasNext();) {
		      if(count%2 == 0){
		      	 out.println("<tr>");
		      }
		      String keyValueStr = (String) it.next();
		      String[] keyValueArr = keyValueStr.split("=");
		      out.println("<td align=\"left\" width=\"50%\">" + keyValueArr[0]+ "：  "+keyValueArr[1] +"</td>");
		      count++;
		      if((count)%2 == 0){
		      	 out.println("</tr>");		    	  
		      }
		  }
		  out.println("</table>");
	  }
*/
	%>
 -->

	<%
	  if(searchParamPrintMapStr != null && !"".equals(searchParamPrintMapStr)){
		  out.println("<table class=\"d_table\" align=\"center\" width=\"100%\">");
		  String[] searchParamPrintKV = searchParamPrintMapStr.split(",");
		  int count = 0;
		  //获取列表的查询条件,并设置到td中
		  for(int i = 0;i<searchParamPrintKV.length;i++) {
		      if(count%2 == 0){
		      	 out.println("<tr>");
		      }
		      String[] keyValueArr = searchParamPrintKV[i].split("=");
		      out.println("<td align=\"left\" width=\"50%\">" + keyValueArr[0]+ "： "+keyValueArr[1] +"</td>");
		      count++;
		      if((count)%2 == 0){
		      	 out.println("</tr>");		    	  
		      }
		  }
		  out.println("</table>");
	  }
	%>
<br/>

<table style="border: 0px;width: 100%" align="center">
	<tr>
		<td align="left"> 打印用户：${session.CURR_USERNAME}  </td>
		<td align="right"> 打印时间：${printTime} </td>
	</tr>
</table>
        
<table  class="d_table" id="datalist" align="center" width="100%">
   <thead>	
   <!-- 
   <th class="th_statePic" >    
              状态灯
   </th>
    -->
<%
Collection<TableField> col=currTblMdl.fields.values();
for (Iterator i = col.iterator();i.hasNext();){
	TableField tf = (TableField)i.next();
	if (tf.getCreateInList()){
		String displayStyle = "";
		if (tf.getHiddenInList()){
			displayStyle = "style='display:none'";
		}		
			if (tf.getOrderInList()){
			%>
				<th class="th_field" name="<%=tf.getColName() %>" id="datalist_<%=tf.getColName() %>" onclick="doOrderBy('<%=tf.getColName() %>');" style="cursor:pointer" <%=displayStyle %>><%=tf.getDesc() %>&nbsp;&nbsp;&nbsp;<span id="orderSpan_<%=tf.getColName() %>" ></span></th>
				<script type="text/javascript">  
					var orderSpan = document.getElementById("orderSpan_<%=tf.getColName() %>");
					orderSpan.name =  "order_<%=tf.getColName() %>";
					orderSpan.order = "<%=tf.getOrder() %>";
				</script>
			<% 
			}else{
			%>
				<th class="th_field" name="<%=tf.getColName() %>" id="datalist_<%=tf.getColName() %>" <%=displayStyle %>><%=tf.getDesc() %></th>
			<%
			}
	}
}

%>	
   </thead>
   <tbody id="dataListBody">
<%
		int fldIdx=0;
		String rid="";
		for (Iterator<?> it = searchDataList.iterator();it.hasNext();){
			Map record=(Map)it.next();
			%>
			<tr >
			<!--
		   <td class="td_statePic" >
		     <img src="<%=rootPath%>/images/statePic/statePic_<%=(String)record.get("NODESTATE") %>.jpg" />
		  
		   </td>	
		    -->	
			<% 
			fldIdx=0;
			for (Iterator itr = col.iterator();itr.hasNext();){
				TableField tf = (TableField)itr.next();
				if (fldIdx==0){
					rid = (String)record.get("RID");
				}
				if (tf.getCreateInList()){
					String displayStyle = "";
					if (tf.getHiddenInList()){
						displayStyle = "style='display:none'";
					}else{
						displayStyle = "style='width:"+tf.getTitleWidth()+"'";
					}
					
					if (tf.getInputInList()){
						WebComponent wff = FMPContex.webFieldFactory; 
						%>
						<td class="td_field" id="<%=rid+"_"+tf.getColName()%>"onclick="RowClick('<%=rid %>')" <%=displayStyle %> style="width:100%"><%=wff.getWebFieldSampleCode("","_rid_"+rid,tf, "update", record) %></td>
						<script type="text/javascript" >
							<%=wff.getWebFieldScript("","_rid_"+rid,tf, "update", record)%>
						</script>
						<%
					}else{
					%>
						<td class="td_field" id="<%=rid+"_"+tf.getColName()%>" onclick="RowClick('<%=rid %>')" <%=displayStyle %>>
							<input type="hidden" name="<%=tf.getColName()%>_rid_<%=record.get("RID")%>"
							 value="<%=tf.getTrueValue(record)%>"
							 id="<%=tf.getColName()%>_rid_<%=rid%>">					
							 <a id="a_<%=tf.getColName()%>_rid_<%=rid%>"><%=tf.getTransValue(record)%></a>				
					     </td>
					<%
					}
				}
				fldIdx++;
			}	
			%></tr><%
		}		
		
		%>   
    </tbody>
</table>

</body>
<script type="text/javascript" >
if(typeof doOnDataListload != "undefined"){
	doOnDataListload("${tableModelId}");
}

function saveDataList(saveCallBack){
	var form = document.getElementById("dataListForm");
	var result =checkAll(form);
	if(result){
	       if (typeof(updateRowIds) == "undefined"){
	    	   updateRowIds = "";
	       }
       	XMLHttp.formSubmit(form,comUrl("<%=rootPath%>/fmp/FrameStatePicBiz/SaveDataList?updateRids="+updateRowIds),saveCallBack);		     	
	}
}

</script>

</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 
 
