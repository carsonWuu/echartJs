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
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >

<%
	TableModel currTblMdl = (TableModel) request.getAttribute("tableModel");
    Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData");
    String opMode = (String) request.getAttribute("opMode");
    String rootPath = request.getContextPath();
    
%>

<script language="JavaScript">
	function changClassName(tabCount){
		/**
		*修改group_Head_Right的样式
		**/
		var groupHeadRight = document.getElementById("groupHead_right"+tabCount);
		if(groupHeadRight){
			if(groupHeadRight.className == "groupHead_right_up"){
				//使用groupHead_right_down样式
				groupHeadRight.className = "groupHead_right_down";
	        }else{
	        	//使用groupHead_right_up样式
	        	groupHeadRight.className = "groupHead_right_up";
			}
		}
	}

	
</script>
<table class="dataDetailTable">
<tr>
<td>
<input type="hidden" name="tableModelId" value="${tableModelId}" id="tableModelId" />
<input type="hidden" name="opMode" value="${opMode}" id="opMode" />
	<%
	    
	    WebComponent wff = FMPContex.webFieldFactory; 
		int maxColumn = currTblMdl.getColCount();
		String tdFormat = "<tr>";
		for (int i = 0; i < maxColumn; i++) {  //排版所需，计算每行显示多个字段的长度
			tdFormat = tdFormat + "<td width=\""+100/maxColumn+"%\"></td>";
		}
		tdFormat = tdFormat + "</tr>";		
	%>
	
	
	
		    	<%			
					Collection<TableField> col = currTblMdl.fields.values();
					int span = 0;
					Boolean tableFlag = false;
					Boolean groupFlag = false;
					String lastGroupName = "";
					int groupHeadRightCount=0;	//计算页面有多少个分组
					//迭代表模型字段
					for (Iterator it = col.iterator(); it.hasNext();) {
						TableField tf = (TableField) it.next();
						if ((tf.getCreateInUpdate()&&"update".equals(opMode))||
								(tf.getCreateInView()&&"view".equals(opMode))||
								(tf.getCreateInAdd()&&"add".equals(opMode))) {
							request.setAttribute("tf", tf);
							if ((tf.getHiddenInUpdate()&&"update".equals(opMode))||
									(tf.getHiddenInView()&&"view".equals(opMode))||
									(tf.getHiddenInAdd()&&"add".equals(opMode))){
								%>
									<input type="hidden" name="<%=tf.getColName() %>" value="<%=tf.getTrueValue(detailDataMap) %>" id="detailId_<%=tf.getColName() %>"/>
								<%
							}else{
								//增加分组处理，判断字段如果分组标识不为空，并且不是分组结束标记
								//System.err.println(tf.getGroup()+"--"+tf.getColName()+"--"+tf.getGroupEnd()+"--"+groupFlag);
								span = span + (tf.getColSpan());
								if (!"".equals(tf.getGroup())&& !tf.getGroupEnd()&&!groupFlag){
									System.err.println(span+"==**==="+tf.getColName()+"========"+maxColumn);
									if (tableFlag) {
										tableFlag = false;
									%>
										</tr>  
									</table><!-- end of tagContentTable4 -->										
									<%											
									}									
									
									groupFlag = true;
									lastGroupName = tf.getGroup();
									span = tf.getColSpan();
									groupHeadRightCount++;	//计算页面分组数
									%>	
										<div id="groupDiv<%=groupHeadRightCount %>"> 
											<div id="<%=tf.getGroup() %>" class="groupHead_info" onclick="toggle($(this).next());changClassName('<%=groupHeadRightCount %>');">
											    <table style="width: 100%;border: 0px;">
											    <tr>
											    	<td>
												    	<span>
												    	<img style="margin-top: 4px;" id="leftImage" src="<%=rootPath%>/images/tabimage/ziliao.gif"  ></img> &nbsp;
												    	<font style="font-weight:bold;font-size: 13px"><%=tf.getGroup() %></font>
												    	</span>
											   	    </td>
											   	    <td>
											   	   	    <span id="groupHead_right<%=groupHeadRightCount %>" class="groupHead_right_up" ></span>
											    	</td>
											    </tr>
												</table>
												<span class="groupHead_bottom" > <img id="bottomImage" src="<%=rootPath%>/images/tabimage/shuangxian.gif"  ></img></span>
											</div>					
											
											
											<div id="<%=tf.getGroup() %>_body" class="groupBody">
								
									<%
									
								}else{
									
								}	
								
								if (!tableFlag){
									tableFlag = true;
									%>
									<table class="tagContentTable4"><!-- add for group -->	
									<%=tdFormat  %>
									<tr>		
									<%  					
								}								
								
								
								if ((span > maxColumn) || tf.getForceNewRow()) {
									span = tf.getColSpan();
								%>
									</tr>
									<tr>
								<%											
								}
								
								
								%>
									<td colspan="<%=tf.getColSpan()%>" >
									<%=wff.getWebFieldCode(tf,request) %>
									</td>
									
								<%
								
								
							}
							if (tf.getGroupEnd() && groupFlag){
								tableFlag = false;
								groupFlag = false;
								%>
										</tr>  
									</table><!-- end of tagContentTable4 -->
								</div>	
							</div>									
								<%
								
							}							
							
						}
						
	
	
				}
					
				//如果table没有结束，则增加结束标记	
				if (tableFlag){
					%>
					</tr>  
					</table><!-- end of tagContentTable4 -->

					<%				
				}
 
	
				//如果table没有结束，则增加结束标记	
				if (groupFlag){
					%>
									</div>	
								</div>	

					<%				
				}
				%>		
</td>
</tr>
</table>


	
 