<!-----------------------------------
* @文件描述：通用财务审核查看页面
------------------------------------>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Collection"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.SubTableModelLink"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.opensymphony.xwork2.ActionContext"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" >
<%
	String rootPath=request.getContextPath();
	String moduleId=(String)request.getAttribute("moduleId");
	WebComponent wff = FMPContex.webFieldFactory;
%>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>

<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<input type="hidden" id="keyLimit" name="keyLimit" value="${keyLimit}"/>
<title>审核</title>
</head>

<%
	String tableModelId = (String) request.getAttribute("tableModelId");
    String currTime = (String) request.getAttribute("currTime");
%>
<script src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/BizModuleScript/${tableModelId}_View.js" type="text/javascript" language="javascript"></script>

 
<body>
<fmp:form	method="post">
 <table width="100%">
 	<tr>
		<td>
			<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/ViewData.jsp" />
		</td>
	</tr>
<tr>
 <table class="wwFormTable">
          <table id="tbl_updown" class="tagContentTable1" cellspacing="18" width="100%">
            <tr id="tr_inputArea">
              <td><input type="hidden" name="tableModelId" value="FinReceBill" id="tableModelId" />
                <table id="view_tblid_FinReceBill" name="view_tblname_Fin_ReceBill" class="tagContentTable2" border="0" cellspacing="0">
                  <tr id="tr_fieldArea1">
                    <td><!-- add for group -->
                      <div class="tagContentTable2Div">
                      
                        <!-- add for group -->
                        <table align="left" valign="top" width="90%">              
                          <tr>
                           <td  valign="top" width="105">
                                                                            审核备注
                           </td>
                           <td colspan="2">
                           <%=wff.getWebFieldSampleCode(tableModelId, "AUDITREMARK","view", request)%> 
                           </td>                         
                          </tr>
                          
                          <tr>
                            <td width="105">
                                                                       审核人
                            </td>
                            <td >
                            <%=wff.getWebFieldSampleCode(tableModelId, "AUDITORID","view", request)%>
                            </td>
                            <td width="60%">
                            </td >
                          </tr> 
                        </table>  
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
</table>
</td>


<tr>
<tr id="tr_buttonArea" align="center" ><br>
    <td>		
	</td>   		
</tr>
</tr>
</table>


<script>
	var moduleId="${moduleId}";
</script>

<script>
if(typeof doOnload != "undefined"){
	doOnload();
}
</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" />

</fmp:form>
</html>
