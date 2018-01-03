<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.util.*"%>
<%@ taglib prefix="fmp" uri="/WEB-INF/tlds/fmp-tags.tld"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Collection"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Date"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="com.zstar.fmp.web.component.*"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="com.zstar.fmp.utils.Page"%>

<%
	String rootPath = request.getContextPath();
 	List<?> SAsearchDataList = (List<?>) request
 			.getAttribute("SAsearchDataList");
 	List<?> SRWsearchDataList = (List<?>) request
 			.getAttribute("SRWsearchDataList");
 	List<?> SRMsearchDataList = (List<?>) request
		.getAttribute("SRMsearchDataList");
 	
 	String afficheName = null; //公告名称
 	String afficheContent = null; //公告内容
 	String safficheData = null; //临时公告数据
 	String MsgContent = null;
 	String creatTime = null;
 	String MsgEndDate = null;
 	String RiskEndDate = null;
 	SimpleDateFormat format =   new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss" );

 	Long msgEndDate = null;   	//消息结束时间
 	Long riskEndDate = null;	//风险预警结束时间
 	Long saCreatTime = null;
	Long syetemCurrentTime = (Long) request.getAttribute("syetemCurrentTime");

%>
<html>
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<title>首页</title>
<link href="<%=rootPath%>/styles/fmp/homePage.css" rel="stylesheet" type="text/css" />


<!--  注意，每次登陆界面的时候都应该查询一次数据库，已更新显示的数据内容  -->
<script language="javascript">
	function doShow() {
		document.getElementById('warnTopHidden').style.display = 'none';
		document.getElementById('warnDataHidden').style.display = 'none';
		document.getElementById('messageTopHidden').style.display = 'none';
		document.getElementById('messageDataHidden').style.display = 'none';
	}

	function setHeight() {
 		 var height = document.body.clientHeight; //整页高度
		 document.getElementById('moved').style.height = height - 65;
	}

 
</script>



</head>
<body onLoad="doShow();setHeight();" onresize="setHeight()">
	<div> <!-- 上面有日历，用div套起来 -->
		<table cellpadding="5" cellspacing="3" align="left" valign="top"
			width="99%" height="100%">
			<tr>
<!-- ************************************************风险预警********************************************** -->
				<td align="left" valign="top">
					<div class="home_div_main">
						  <div id="warnTopShow" class="home_div_top"  
						  >
						  <!-- 
						  onclick="document.getElementById('warnTopShow').style.display='none';
							  	   document.getElementById('warnTopHidden').style.display='';
							  	   document.getElementById('warnDataShow').style.display='none';
							  	   document.getElementById('warnDataHidden').style.display='';"
							-->
							<table style="width:100%">
							<tr>
								<td class="m_icon_yujing">风险预警</td>
								<td class="m_icon2">
								<a style=" position: relative;top: 5px;" class="m_icon4" href="<%=rootPath%>/fmp/system/notice/RiskListBiz/WRiskList?tableModelId=SRiskWarnMsg"  >更多&gt;&gt;</a>&nbsp;</td>
							</tr>
							</table>
						  </div>
						  
						  <div id="warnTopHidden" class="home_div_top"
						  >
						  <!-- 
						   onclick="document.getElementById('warnTopHidden').style.display='none';
							  	   document.getElementById('warnTopShow').style.display='';
							  	   document.getElementById('warnDataHidden').style.display='none';
							  	   document.getElementById('warnDataShow').style.display='';"
							 -->  	   
							<table style="width:100%">
							<tr>
								<td class="m_icon_yujing">风险预警</td>
								<td class="m_icon2">
								<a style=" position: relative;top: 5px;" class="m_icon4" href="<%=rootPath%>/fmp/system/notice/RiskListBiz/WRiskList?tableModelId=SRiskWarnMsg"  >更多&gt;&gt;</a>&nbsp;</td>
							</tr>
							</table>
						  </div>
						  
						  
						  <div class="clear"></div>
						  
				
						  <div id="warnDataShow" class="home_div_content">
						  
						  	<%
								//遍历searchDataList
								Long riskOverData = 0L;
						  		boolean firstWData = true;
								for (Iterator it = SRWsearchDataList.iterator(); it.hasNext();) {
									Map fldObj = (Map) it.next();
									String RID = (String) fldObj.get("RID");
									MsgContent = (String) fldObj.get("MSGCONTENT");
									MsgEndDate = (String) fldObj.get("MSGENDDATE");		//消息截止日期								
									riskEndDate = format.parse(MsgEndDate+" 00:00:00").getTime();
									riskOverData = syetemCurrentTime-riskEndDate;	//当前时间-结束时间
							%>
								<div id="<%=RID%>" onclick="jumpPageByHref('<%=rootPath%>/fmp/system/notice/RiskDetailBiz/WRiskDetail?tableModelId=SRiskWarnMsg&RID=<%=RID%>')">
								<% 
									if(firstWData) {
										firstWData = false;
									}else{
								%>
									<hr color="#D1E6FB">
								<% 
								  	} 
								%>
									<%=MsgContent%>
								
								<%
									//判断该信息是否已超出提醒日期
									if(riskOverData > 0){
								%>
									<span style="color:red">&nbsp;&nbsp;(已过期)</span>
								<% 
									}
								%>
									&nbsp;&nbsp;&nbsp;
									<span style="color:green;cursor:hand;" onclick="markRead('<%=RID%>')" >标记已读</span>
								</div>
							<%
								}
							%>

						  </div>
						  
						  <div id="warnDataHidden" class="home_div_content"></div>
					
				   </div>	 <!-- home_div_main end-->
				
				<br><br>

<!-- ************************************************风险预警********************************************** -->
	
	
<!-- ************************************************最新提醒********************************************** -->
					<div class="home_div_main">
						  <div id="messageTopShow" class="home_div_top"
						  >
						  <!-- 
						   onclick="document.getElementById('messageTopShow').style.display='none';
							  	   document.getElementById('messageTopHidden').style.display='';
							  	   document.getElementById('messageDataShow').style.display='none';
							  	   document.getElementById('messageDataHidden').style.display='';"
					    	 -->	  	   
							<table style="width:100%">
							<tr>
								<td class="m_icon_xiaoxi">消息提醒</td>
								<td class="m_icon2">
								<a style=" position: relative;top: 5px;" class="m_icon4" href="<%=rootPath%>/fmp/system/notice/RiskListBiz/MRiskList?tableModelId=SRiskWarnMsg"  >更多&gt;&gt;</a>&nbsp;</td>
							</tr>
							</table>
						  </div>
						  
						  
						  <div id="messageTopHidden" class="home_div_top"
						  >
						  <!-- 
						   onclick="document.getElementById('messageTopHidden').style.display='none';
							  	   document.getElementById('messageTopShow').style.display='';
							  	   document.getElementById('messageDataHidden').style.display='none';
							  	   document.getElementById('messageDataShow').style.display='';"
						   -->
							<table style="width:100%">
							<tr>
								<td class="m_icon_xiaoxi">消息提醒</td>
								<td class="m_icon2" >
								<a style=" position: relative;top: 5px;" class="m_icon4" href="<%=rootPath%>/fmp/system/notice/RiskListBiz/MRiskList?tableModelId=SRiskWarnMsg"  >更多&gt;&gt;</a>&nbsp;</td>
							</tr>
							</table>
						  </div>
						  
						  
						  <div class="clear"></div>
						  
				
						  <div id="messageDataShow" class="home_div_content">
							  <%
							    Long msgoverData = 0L;
							  	boolean firstMData = true;
								for (Iterator it = SRMsearchDataList.iterator(); it.hasNext();) {
									Map fldObj = (Map) it.next();
									String RID = (String) fldObj.get("RID");
									MsgContent = (String) fldObj.get("MSGCONTENT");
									MsgEndDate = (String) fldObj.get("MSGENDDATE");		//消息截止日期								
									msgEndDate = format.parse(MsgEndDate+" 00:00:00").getTime();
									msgoverData = syetemCurrentTime-msgEndDate;	//当前时间-结束时间
								%>
								<div id="<%=RID%>" onclick="jumpPageByHref('<%=rootPath%>/fmp/system/notice/RiskDetailBiz/MRiskDetail?tableModelId=SRiskWarnMsg&RID=<%=RID%>')">
								<% 
									if(firstMData) {
										firstMData = false;
									}else{
								%>
									<hr color="#D1E6FB">
								<% 
								  	} 
								%>
									<%=MsgContent%>
								<%
									//判断该信息是否已超出提醒日期
									if(msgoverData > 0){
								%>
									<span style="color:red">&nbsp;&nbsp;(已过期)</span>
								<% 
									}
								%>
									&nbsp;&nbsp;&nbsp;
									<span style="color:green;cursor:hand;" onclick="markRead('<%=RID%>')" >标记已读</span>
								</div>
							<%
								}
							%>
						  </div>
						  
						  <div id="messageDataHidden" " class="home_div_content"></div>
						  
				   </div>	 <!-- home_div_main end-->




<!-- ************************************************最新提醒********************************************** -->


<!-- ************************************************通          知********************************************** -->
				<td align="left" valign="top" width="260" height="100%">
		  
					<div  style="height:100%;">
						<div id="a" class="home_div_top" style="padding-right:8px">
							<table style="width:100%;">
								<tr>
								<td class="m_icon_announcement" >公告</td>
								<td class="m_icon2" >
									<a style=" position: relative;top: 5px;" class="m_icon4" href="<%=rootPath%>/fmp/system/notice/SAfficheListBiz/SAfficheList?moduleId=s_md_fhzy&tableModelId=SAffiche" >更多&gt;&gt;</a>
								</td>
							</table>
						</div>
						<div id="moved" class="stylelist"  style="width: 100%; overflow:hidden;border: 1px solid #dddddd;" >
 
							<div id="moved1" class="stylelist"  style="height:100%; width:100%;" >

								<%
										int i = 0;
										Long overData = 0L;
										for (Iterator it = SAsearchDataList.iterator(); it.hasNext();) {
											Map fldObj = (Map) it.next();
											String afficheRID = (String) fldObj.get("RID");
											afficheName = (String) fldObj.get("AFFICHENAME");
											afficheContent = (String) fldObj.get("AFFICHECONTENT");
											creatTime = (String) fldObj.get("CREATTIME"); 
	
											saCreatTime = format.parse(creatTime).getTime();
											overData = (syetemCurrentTime-saCreatTime)/(60*60*24*1000);
											creatTime = creatTime.substring(0,10);

											i++;
								%> 
								
								<a href="<%=rootPath%>/fmp/system/notice/SAfficheDetailBiz/SAfficheDetail?tableModelId=SAffiche&moduleId=s_md_fhzy&RID=<%=afficheRID%>">
									<%=i %> : <%=afficheName%>
									
									
								</a>
											<% 
											if(overData<3){
											%>
											<!-- overData:发布时间与系统当前时间相差的日期，使用时间戳计算，new图片只在发布后3天显示   -->
											<img src="<%=rootPath%>/images/homePage/new.gif" width="31" height="13" />
											<% 
											}
											%>
								
								<hr>
								<% 
									}
					 			%>
								
							</div>
							<div id="moved2"></div>
						</div>
							
					</div>
				</td>
<!-- ************************************************通          知********************************************** -->
			</tr>
		</table>
	</div>
<SCRIPT type="text/javascript">
	var MyMar;
	var isStart=false;
	var isRun = true;
 	var moved = document.getElementById('moved');
 	var moved1 = document.getElementById('moved1');
	var speed=100;//数值越小速度越快  
	function Marquee(){
		var remainingHigh = parseInt(moved.scrollHeight) - parseInt(moved.scrollTop);
		if (remainingHigh <= moved.scrollTop) {
			moved.scrollTop = 0;//使moved处于最顶端--相当于滚动条一下移上最顶端--达到初始状态
		}else{
			moved.scrollTop++;//被卷去的部分逐渐增加1-----相当于滚动条下拉----相当于文字上移(肉眼效果)
		}
	}
	moved.onmouseover = function() {
		isRun = false;
		if(isStart){
			clearInterval(MyMar);//鼠标经过时清除定时器达到滚动停止的目的
		}
	};
	moved.onmouseout = function() {
		isRun = true;
		if(isStart){
			MyMar=setInterval(Marquee,speed);//鼠标移开时重设定时器
		}
	};
 	setTimeout("delay()",10000);// 延迟10秒钟再执行“delay()”方法 
 	function delay(){
 		if(document.body.offsetHeight-100 > moved.scrollHeight ){//判断通知内容是否超屏 
 	 		if(moved.scrollHeight > moved.offsetHeight){
 				moved1.innerHTML = moved1.innerHTML + moved1.innerHTML;// 克隆moved1为两个moved1
 	 		 }
 		}else{
 			if(moved.scrollHeight >= moved.offsetHeight){
 				moved1.innerHTML = moved1.innerHTML + moved1.innerHTML;
 	 		 }
 		}
 		if(isRun){
 			MyMar=setInterval(Marquee,speed); //设置定时器
 	 	}
 		isStart=true;
 	}

 	/**
 	*	根据href跳转到相应的页面
 	*/
 	function jumpPageByHref(href){
 	 	//window.location.href = href; //厦门客户不需要这个跳转功能
 	 }

	//标记已读
 	function markRead(rid){
 		var url=rootPath+"/fmp/system/riskwarning/SRiskWaringBiz/IsRead?RID="+rid;
		comAjax(url, backCall);
 		function backCall(msg){
 	 		if(msg == "success"){
 	 	 		var obj = document.getElementById(rid);
 	 			obj.parentNode.removeChild(obj);
 	 	 	}else{
 	 	 		showMessage("MSG1230");//更新数据失败！
 	 	 	}
 	 	}
 	}
</SCRIPT>
</body>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 