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
 <div align="left">
 
</div>

<table  class="d_table" id="datalist">
   <thead>	
   <th class="th_statePic" >    
              状态灯
   </th>
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
				<th class="th_field" name="<%=tf.getColName() %>" id="datalist_<%=tf.getColName() %>" onclick="doOrderBy('<%=tf.getColName() %>');" style="cursor:pointer" <%=displayStyle %>><%=tf.getDesc() %>&nbsp;&nbsp;&nbsp;<span id="orderSpan_<%=tf.getColName() %>" ><%=tf.getOrderMark() %></span></th>
				<script type="text/javascript" >  
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
		String initRids="";
		for (Iterator<?> it = searchDataList.iterator();it.hasNext();){
			Map record=(Map)it.next();
			%>
			<tr >
		   <td class="td_statePic" >
		   <img src="<%=rootPath%>/images/statePic/statePic_<%=(String)record.get("NODESTATE") %>.jpg" />
		   </td>		
			<% 
			fldIdx=0;
			for (Iterator itr = col.iterator();itr.hasNext();){
				TableField tf = (TableField)itr.next();
				if (fldIdx==0){
					rid = (String)record.get("RID");
					initRids = initRids+","+rid;
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
    <tfoot>
	    <tr>
	    	<td colspan=20>
	    	<input type="hidden" name="pageIndex" id="pageIndex" value="<%=showPage.getCurrentPage() %>"/>
			记录总数：<span name="pq_recordCount" id="pq_recordCount"><%=showPage.getTotalNumber() %></span>&nbsp;&nbsp;&nbsp;
	    	</td>
	    </tr>
    </tfoot>
</table>
<br>

</body>
<script type="text/javascript" >
var InitRids="<%=initRids%>";
if(typeof doOnDataListload != "undefined"){
	doOnDataListload("${tableModelId}");
}

function saveDataList(saveCallBack){
	var form = document.getElementById("dataListForm");
	var result =checkAll(form);
	if(result){
       	XMLHttp.formSubmit(form,comUrl("<%=rootPath%>/fmp/FrameStatePicBiz/SaveDataList?updateRids="+InitRids),saveCallBack);		     	
	}
}

</script>

</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 
 
