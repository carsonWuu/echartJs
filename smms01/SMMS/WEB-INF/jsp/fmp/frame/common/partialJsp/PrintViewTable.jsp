<!-----------------------------------
* @文件描述：通用详细信息页面
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Collection"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%
	String rootPath=request.getContextPath();
	TableModel currTblMdl = (TableModel) request.getAttribute("tableModel");
	List<?> searchDataList = (List<?>)request.getAttribute("searchDataList");	
    Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");
    String opMode = (String) request.getAttribute("opMode");
    String tableModelId = (String) request.getAttribute("tableModelId");
    %>

    <%
		if (searchDataList != null && searchDataList.size() >0){
			%>
				<div>
				<div name="printViewGroup" id="groupHead_<%=currTblMdl.getId() %>" open="true" class="printGroupHead" onclick="toggle($(this).next());"><%=currTblMdl.getDesc() %></div>	
				<div class="printGroupBody" >    			
				<input type="hidden" name="tableModelId" value="${tableModelId}" id="tableModelId" />			
			<% 
			for (Iterator itList= searchDataList.iterator();itList.hasNext();){
				%>
				<div class="pv_div_record">
				<%
				detailDataMap = (Map<String,Object>)itList.next();
				Boolean haveGroup = false;
				if (detailDataMap != null){
					String recordRid = (String)detailDataMap.get("RID");
					Collection<TableField> col = currTblMdl.fields.values();
					for (Iterator it = col.iterator(); it.hasNext();) {
						TableField tf = (TableField) it.next();
						String fldIdExt = tableModelId+"_"+tf.getColName()+"_rid_"+recordRid;
						//增加分组处理
						if (!"".equals(tf.getGroup())){
							if (haveGroup == false){
								haveGroup = true;
							}else{
								%>
									</fieldset>
								<% 
							}
							%>
						    <fieldset class="fs_fldGroup">
						    <legend><%=tf.getGroup() %></legend>							
							<%  
						}						
						if ((tf.getCreateInView()&&"view".equals(opMode))||tf.getShowInPrintView()) {
								if (tf.getShowInPrintView()){
									%>
									<input type="hidden" name="<%=fldIdExt %>" value="<%=tf.getTrueValue(detailDataMap) %>" id="detailId_<%=fldIdExt %>"/>
									&nbsp;<div id="div_<%=fldIdExt %>" class="pv_div_field">
										&nbsp;&nbsp;&nbsp;&nbsp;<a class="pv_fieldDesc"><%=tf.getDesc() %>:</a> 
										<div class="pv_div_fieldValue">
											<a id="a_<%=fldIdExt %>" class="pv_fieldValue">&nbsp;<%=tf.getPrintViewValue(detailDataMap) %>&nbsp;</a>&nbsp;&nbsp;
										</div>
									</div>
								    <%		
								    if (tf.getColSpan()>1 || tf.getForceNewRow()){
								    	%>
								    	<br>
								    	<% 
								    }								    
								}else if (tf.getHiddenInView()&&"view".equals(opMode)){
									%>
									<input type="hidden" name="<%=fldIdExt %>" value="<%=tf.getTrueValue(detailDataMap) %>" id="detailId_<%=fldIdExt %>"/>
								    <%									
								}
						}
					}
					if (haveGroup == true){
						%>
							</fieldset>
						<% 
					}					
					%>
					</div><br><br>
					<script type="text/javascript" >
						if (typeof(<%=tableModelId %>_PrintViewOnload) != "undefined") { <%=tableModelId %>_PrintViewOnload("<%=recordRid %>");}   
					</script>					
					<%
				}
			}			
		}
	%>
</div>
</div>