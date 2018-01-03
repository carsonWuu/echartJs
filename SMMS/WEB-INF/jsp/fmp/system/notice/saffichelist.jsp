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
     int totalNum=0;
     int pageSize=10; 
     int currentPage=1;
     int sum=0;
     currentPage = Integer.parseInt( request.getAttribute("currentPage").toString());
	 String rootPath = request.getContextPath();
	 List<?> searchDataList = ( List<?>)request.getAttribute("searchDataList");
	 totalNum = Integer.parseInt( request.getAttribute("totalNum").toString());
	 sum=(totalNum)%pageSize;
	 if(totalNum == 0){
		 sum=1;
	 }else{
		 if(sum ==0){    //没有余数，表示最后一页的条数=pageSize
			 sum=totalNum/pageSize;
		 }else{
			 sum=(totalNum/pageSize)+1;  //有余数，表示最后一页的条数<pageSize(就要增加一页)
		 }
	 } 
 %> 


<html>

<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<title>公告信息</title>
<link href="<%=rootPath%>/styles/fmp/homePage.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
function isNumber(val){
     return typeof val == 'number' && isFinite(val);
} 

function skipPage(){
	var skipValue = document.getElementById("skipInput").value;
	var parSkipValue = parseInt(skipValue);	
	var parSum = parseInt(<%=sum%>);
	var currentPage = parseInt(<%=currentPage%>);
	if(isNumber(parSkipValue)){			//判断是否为数字
		if(parSkipValue>0 && parSkipValue<=parSum){	//判断是否在页数范围内
			if(parSkipValue != currentPage){  
				var url="<%=rootPath%>/fmp/system/notice/SAfficheListBiz/SAfficheList?moduleId=s_md_fhzy&tableModelId=SAffiche&pq_currentPage="+parSkipValue+"&pq_maxLine=<%=pageSize%>";
	        	openWindow(fmpEncodeURL(url),"");
			}else{
				alert("当前页数已是第"+parSkipValue+"页！");
			}
		}else{
			alert("无法跳转到第"+parSkipValue+"页,已超出页数范围！");
		}
	}else{
		alert("请输入有效的跳转页数");
	}
}

</script>


</head>
<body>


	<div>
	  <table cellpadding="3" cellspacing="5" >
	      <tr>
	      <td style="width:70px;">
	        <a style="font-size:15px;font-weight: bold;" href="javascript: history.back();"> &lt;&lt;返回 </a>
		  </td>
		  <td style="width:50px;">
	         <a style="font-size:15px;font-weight: bold;" href="<%=rootPath%>/fmp/system/notice/NoticeBiz/ShowNotice?moduleId=s_md_fhzy&tableModelId=SAffiche" >首页</a>
	      </td>
	     </tr>
	   </table>
	</div>
	
	
	<div class="home_div_main">

		  <div class="home_div_top">
			<table style="width:100%">
			<tr>
				<td class="m_icon_announcement">公告</td>
				<td class="m_icon2">
					公告总数：<%=totalNum %> &nbsp;
				</td>
			</tr>
			</table>
		  </div>
		  <div class="clear"></div>
		  

		  <div class="home_div_content">
		  <%  
			  for (Iterator it = searchDataList.iterator();it.hasNext();){
					 Map fldObj = (Map)it.next();
					 String afficheRID = (String)fldObj.get("RID");	 
					 String afficheName = (String)fldObj.get("AFFICHENAME");
					 String kindID = (String)fldObj.get("KINDID");
					 String afficheState = (String)fldObj.get("AFFICHESTATE");
					 String validDate = (String)fldObj.get("VALIDDATE");  //公告有效期
					 String afficheContent = (String)fldObj.get("AFFICHECONTENT");
					 String creatTime = (String)fldObj.get("CREATTIME");
			  %>
    
		     <div  align="left" class=stylelist>
		       <a  href="<%=rootPath%>/fmp/system/notice/SAfficheDetailBiz/SAfficheDetail?moduleId=s_md_fhzy&tableModelId=SAffiche&RID=<%=afficheRID %>"  >
		                   <font style="font-size:13px;font-weight:bold"><%=afficheName %></font><br><%=afficheContent %>
		            </a>
		            <% 
			        	if(it.hasNext()){ %>
			        		<hr>
			        <% 
			        	}
			        %>
		                 
		    </div>  
		 <% }%>

		  </div>
	
   </div>	 <!-- home_div_main end-->
   
   
   <div align="center" >
         <a href="<%=rootPath%>/fmp/system/notice/SAfficheListBiz/SAfficheList?moduleId=s_md_fhzy&tableModelId=SAffiche&pq_currentPage=<%=1 %>&pq_maxLine=<%=pageSize %>" class="link">
                         首页  </a>   &nbsp;                  
          <%         
          //如果当前页数为1，则页数不可以再减
          int frontPage=currentPage;
          if(currentPage==1){
        	  frontPage=currentPage;
          }else{
        	  frontPage--;
          }	  
          %>               
         <a href="<%=rootPath%>/fmp/system/notice/SAfficheListBiz/SAfficheList?moduleId=s_md_fhzy&tableModelId=SAffiche&pq_currentPage=<%=frontPage %>&pq_maxLine=<%=pageSize %>" class="link">
                         上一页  </a>    
       <%
          
          //如果当前页数尾页，则页数不可以再加
          int nextPage=currentPage;
          if(currentPage==sum){
        	  nextPage=currentPage;
          }else{
        	  nextPage++;
          }  		  
          %>               
         <a href="<%=rootPath%>/fmp/system/notice/SAfficheListBiz/SAfficheList?moduleId=s_md_fhzy&tableModelId=SAffiche&pq_currentPage=<%=nextPage%>&pq_maxLine=<%=pageSize %>" class="link">
                           下一页  </a>
                         
           <a href="<%=rootPath%>/fmp/system/notice/SAfficheListBiz/SAfficheList?moduleId=s_md_fhzy&tableModelId=SAffiche&pq_currentPage=<%=sum %>&pq_maxLine=<%=pageSize %>" class="link">
                            尾页  </a>     &nbsp;  
           <input id="skipInput" style="width: 35px;"/> 
           <button id="skip" onclick="skipPage()" class="btn">跳转</button> 
           &nbsp;&nbsp;
            <font>当前页数  <%=currentPage %>/<%=sum %>  总页数</font>
         </div>



</body>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 