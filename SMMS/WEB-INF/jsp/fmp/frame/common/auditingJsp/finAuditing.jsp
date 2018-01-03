<!-----------------------------------
* @文件描述：通用财务审核页面
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
  <table class="wwFormTable">
  	<tr>
		<td>
		<div>
		</div>
			<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/ViewData.jsp" />
			<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
		</td>
	</tr>
 	<tr>
 	<td>
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
                           <%=wff.getWebFieldSampleCode(tableModelId, "AUDITREMARK","update", request)%> 
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
    </td>
    </tr>
    <tr id="tr_buttonArea" align="center" >
    <td>		
			<div  class="div_detailButton"  align="center" style="width:100%;">
					<input type="button" id="DoUpdateSave" class="h5button green medium" value="保存" onclick="doSubmit();"></input>
					<input type="reset" class="h5button orange medium" value="重置" />
					<input type="button" class="h5button green medium" value="完成审核"  onclick="confirmdOver()" />
	   		</div>
	</td>   		
   </tr>   
 </table>
 
 
<script language="JavaScript">
	var moduleId="${moduleId}";
   $("#tagContent0").height(300);
if(typeof doOnload != "undefined"){
	doOnload();
}
</script>
</fmp:form>
</html>



<script language="JavaScript">
function doSubmit(){
	var form = document.forms[0];//.getElementById("DoUpdate");
	var result =checkAll(form);
	if (result) {
			if (typeof (updateRowIds) == "undefined") {
				updateRowIds = "";
			}
			XMLHttp.formSubmit(form,
					comUrl("FinAuditSaveUniteSubTableList?opMode=update&updateRids="
							+ updateRowIds
							+ "&tableModelId=<%= tableModelId%>&RID=${RID}"),callBackDoSubmit);	  
		}
		function callBackDoSubmit() { 
			showMessage("MSG0005");//保存成功！
			doRefreshList();
		}
	}


function confirmdOver(){    //完成审核的保存处理
	var make=window.confirm("是否确定完成审核");
	if(make==true){   
        var form = document.forms[0];//.getElementById("DoUpdate");
		var result =checkAll(form);
		if (result) {
			if (typeof (updateRowIds) == "undefined") {
				updateRowIds = "";
			}
 
			XMLHttp.formSubmit(form,
					comUrl("FinAuditSaveUniteSubTableList?opMode=update&updateRids=" + updateRowIds

							+ "&KINDID="+getFieldTrueValue("KINDID")
							+ "&RECEID="+getFieldTrueValue("RECEID")							
							+ "&tableModelId=<%= tableModelId%>&RID=${RID}&AUDITSTATE=2&AUDITTIME=<%=currTime%>" ),
							callBackConfirmdOver);	//保存的时候把审核状态改为2		
		    }
			
			function callBackConfirmdOver() {       
				showMessage("MSG0048");//审核完成！
				doRefreshList();
				closeWindow();
			}
		
		}
	}


</script>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 