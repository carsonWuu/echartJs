<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.util.*" %>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.List"%>    
<%@ page import="java.util.Iterator"%>  
<%@ page import="java.util.Map"%>  
<%@ page import="java.util.Collection"%> 
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page import="com.zstar.fmp.utils.Page"%> 

<%
    
	 String rootPath = request.getContextPath();
     Map<String,Object> detailData = ( Map<String,Object>)request.getAttribute("detailData");
     List<?> attachmentList = ( List<?>)request.getAttribute("attachmentList");    //公告附件
     String afficheRID = (String)detailData.get("RID");	 
	 String afficheName = (String)detailData.get("AFFICHENAME");
	 String kindID = (String)detailData.get("KINDID");
	 String afficheState = (String)detailData.get("AFFICHESTATE");
	 String validDate = (String)detailData.get("VALIDDATE");  //公共有效期
	 String afficheContent = (String)detailData.get("AFFICHECONTENT");
	 String creatTime = (String)detailData.get("CREATTIME");
	 if(validDate==null){
			validDate="";
			
		}
 %> 


<html>
<head>


<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<title>公告信息</title>
<link href="<%=rootPath%>/styles/fmp/homePage.css" rel="stylesheet" type="text/css" />
<style>

    #attachment{
	    font-size:13pt; 
	    color:red;
	    font-style:normal
    }

	    
</style>

<script type="text/javascript" language="javascript">
function downloadAttachmentOnView(rid){  //下载文件
	var selectedRid =rid.value;
	if (selectedRid != null) {
		location.href = rootPath+"/fmp/SAttachmentBiz/download?rowid="+selectedRid;
	} 
}
</script>

</head>
<body>

	<div>
	  <table cellpadding="3" cellspacing="5">
	      <tr>
	      <td style="width:70px;">
	        <a style="font-size:15px;font-weight: bold;" href="javascript: history.back();"> &lt;&lt;返回 </a>
		  </td>
		  <td style="width:50px;">
	         <a style="font-size:15px;font-weight: bold;" href="<%=rootPath%>/fmp/system/notice/NoticeBiz/ShowNotice?moduleId=s_md_fhzy&tableModelId=SAffiche">首页</a>
	      </td>
	     </tr>
	   </table>
	</div>
	

 
 
    <div class="home_div_main">

		  <div class="home_div_top">
		  <!--
			<div class="m_icon">风险预警</div>
			<div class="m_icon2">更多>></div>
			-->
			<table style="width:100%">
			<tr>
				<td class="m_icon_announcement">系统公告</td>
				<!--
				<td class="m_icon2">
				<a href="#" onclick="showPage()" >更多>></a>&nbsp;
				</td>
				-->
			</tr>
			</table>
		  </div>
		  <div class="clear"></div>
		  

		  <div class="home_div_content">
		  <ul>
			
			  <li id="liStrong"><%=afficheName %></li>
			  </ul>
			  <br>
		  <table style="width:100%">
		  	<tr>
				<td style="width:35%"></td>
		  		<td align="left" style="width:35%;font-size:15px;color:#353E99;">发布时间：<%=creatTime %></td>
		  		<td align="left" style="width:30%;font-size:15px;color:#353E99;">有效时间：<%=validDate %> </td>
		  	</tr>
		  </table>
		  <!-- 
			<ul>
			
			  <li id="liStrong"><%=afficheName %></li>
			  <li class="left">创建时间：<%=creatTime %></li>
			  <li class="right">有效时间：<%=validDate %> </li>

			 </ul>
			  -->
		</div>

		<div class="home_div_content">
		<hr>
			<ul>
			<li>
			  <%=afficheContent %>
			  </li>
			</ul>
		  </div>
		  
		  
		<div class="home_div_content">   <!-- 公告附件 -->
	        <%
	        if( attachmentList.size()> 0 && attachmentList.get(0) != null){
	        %>
	        <hr>
	        <ul><li>
	        	公告附件 (
			<%
	        }
			%>
	         <%
	         	  int num = 0 ;	
				  for (Iterator it = attachmentList.iterator();it.hasNext();){
						 Map fldObj = (Map)it.next();
						 String rid = (String)fldObj.get("RID");
						 String attachmentName = (String)fldObj.get("ATTACHMENTNAME");
						 num++;
			%>
			 		<input id="rid<%=num %>" name="rid" type="hidden" value="<%=rid %>"></input>
			 		<a  href="#" 
			 			id="attachment"
			 			onclick="downloadAttachmentOnView(document.getElementById('rid<%=num %>'))" >  
			 			<%=attachmentName%>
			 		</a>
			 		
			 		<% 
			 		if(num < attachmentList.size()){
			 			
			 		%>
			 		&nbsp;,
			 		<% 
			 		}	
			 		 %>
			<% 
				  }
			 %>
			
			 <%
	        if( attachmentList.size()> 0 && attachmentList.get(0) != null){
	        %>
	        )
	        </li></ul>
			<%
	        }
			%>
		</div>    
		  <br>
	
   </div>	 <!-- home_div_main end-->
   
   

</body>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 