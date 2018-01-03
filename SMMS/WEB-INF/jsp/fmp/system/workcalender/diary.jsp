<!-----------------------------------
* @文件描述：工作日历页面
------------------------------------>
<%@ page import="java.util.Calendar,java.util.GregorianCalendar,java.util.Collection,java.util.Iterator"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Collection"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableModel"%>
<%@ page import="com.zstar.fmp.core.frame.tablemodel.TableField"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%
	String rootPath = request.getContextPath();

	String currOrgId = (String)request.getAttribute("CURR_ORGID");
	Calendar cal = new GregorianCalendar();
	String year = Integer.toString(cal.get(Calendar.YEAR));
	String thisyear = year;
	String month = Integer.toString(cal.get(Calendar.MONTH) + 1);
	String thismonth = month;
	String today = Integer.toString(cal.get(Calendar.DAY_OF_MONTH));


	if (request.getParameter("tbSelYear") != null
			&& request.getParameter("tbSelMonth") != null) {
		year = request.getParameter("tbSelYear");
		month = request.getParameter("tbSelMonth");

	}

	session.setAttribute("year", year);
	session.setAttribute("month", month);

	String workdate = request.getParameter("workdate");
%>

<html>
<link href='<%=rootPath%>/styles/fmp/mis_diary.css'
	rel='stylesheet' type='text/css'>
<link href='<%=rootPath%>/styles/fmp/main_diary.css'
	rel='stylesheet' type='text/css'>
<link href='<%=rootPath%>/styles/fmp/frameStyle.css'
	rel='stylesheet' type='text/css'>
	
<head>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
</head>
<body onload='fUpdateCal(dCurDate.getFullYear(),dCurDate.getMonth())'>

<%
Map<String,Object> detailDataMap = (Map<String,Object>)request.getAttribute("detailData"); 
String dType = "";
String wDate = "";
if(detailDataMap!=null){
	dType = (String) detailDataMap.get("DATETYPE");
	wDate = (String) detailDataMap.get("WORKDATE");
}
if (dType == null){
	dType = "";
}
if(wDate == null){
	wDate = "";
}
%>

<SCRIPT type="text/javascript">
var dType = '<%=dType%>';
var selectYM='<%=year%>'+'-'+'<%=month%>';
var wDate = '<%=wDate%>';
var dDate = new Date();
var dCurMonth = dDate.getMonth();
var dCurDayOfMonth = dDate.getDate();
var dCurYear = dDate.getFullYear();
var objPrevElement = new Object();
var holidaystr="节假日";
var workstr="工作日";


function fGetDaysInMonth(iMonth, iYear) {
	var dPrevDate = new Date(iYear, iMonth, 0);
	return dPrevDate.getDate();
	
}

function fBuildCal(iYear, iMonth, iDayStyle) {
	var aMonth = new Array();
	aMonth[0] = new Array(7);
	aMonth[1] = new Array(7);
	aMonth[2] = new Array(7);
	aMonth[3] = new Array(7);
	aMonth[4] = new Array(7);
	aMonth[5] = new Array(7);
	aMonth[6] = new Array(7);
	var dCalDate = new Date(iYear, iMonth-1, 1);
	var iDayOfFirst = dCalDate.getDay();//当前月的第一天星期几
	var iDaysInMonth = fGetDaysInMonth(iMonth, iYear);//当月的日数
	var iVarDate = 1;
	
	if (iDayStyle == 2) {
		aMonth[0][0] = "Sunday";
		aMonth[0][1] = "Monday";
		aMonth[0][2] = "Tuesday";
		aMonth[0][3] = "Wednesday";
		aMonth[0][4] = "Thursday";
		aMonth[0][5] = "Friday";
		aMonth[0][6] = "Saturday";
	} else if (iDayStyle == 1) {
		aMonth[0][0] = "星期天";
		aMonth[0][1] = "星期一";
		aMonth[0][2] = "星期二";
		aMonth[0][3] = "星期三";
		aMonth[0][4] = "星期四";
		aMonth[0][5] = "星期五";
		aMonth[0][6] = "星期六";
	} else {
		aMonth[0][0] = "Su";
		aMonth[0][1] = "Mo";
		aMonth[0][2] = "Tu";
		aMonth[0][3] = "We";
		aMonth[0][4] = "Th";
		aMonth[0][5] = "Fr";
		aMonth[0][6] = "Sa";
	}

	for (var d = iDayOfFirst; d < 7; d++) {
		aMonth[1][d] = iVarDate;
		iVarDate++;
	}
	for (var w = 2; w < 7; w++) {
		for (d = 0; d < 7; d++) {
			if (iVarDate <= iDaysInMonth) {
				aMonth[w][d] = iVarDate;
				iVarDate++;
			}
		}
	}
	return aMonth;
}


function returnType(date){
	var str=dType;
	  if(str.charAt(date)==1){
             return "节假日";
		  }
	  if(str.charAt(date)==0){
          return "工作日";
		  }
}

function colorType(date){
	var str=dType;
	if(str.charAt(date)==1){
		return "red";
	}
	if(str.charAt(date)==0){
		return "black";
	}
}


function fDrawCal(iYear, iMonth, iCellWidth, iCellHeight, sDateTextSize, sDateTextWeight, iDayStyle) {
	var myMonth;	
	var holidaystr="节假日";
	var workstr="工作日";	
	//myMonth是一个二维数组
	myMonth = fBuildCal(iYear, iMonth, iDayStyle);
	document.write("<table id='calender' border='1px' cellspacing='0px' style='border-collapse:collapse' frame='void'>");
	document.write("<tr>");//表头
	document.write("<td align='center' style='FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT: bold'>" + myMonth[0][0] + "</td>");
	document.write("<td align='center' style='FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT: bold'>" + myMonth[0][1] + "</td>");
	document.write("<td align='center' style='FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT: bold'>" + myMonth[0][2] + "</td>");
	document.write("<td align='center' style='FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT: bold' >" + myMonth[0][3] + "</td>");
	document.write("<td align='center' style='FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT: bold'>" + myMonth[0][4] + "</td>");
	document.write("<td align='center' style='FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT: bold'>" + myMonth[0][5] + "</td>");
	document.write("<td align='center' style='FONT-FAMILY:Arial;FONT-SIZE:12px;FONT-WEIGHT: bold'>" + myMonth[0][6] + "</td>");
	document.write("</tr>");
	
	var tdIdx=0;
	for (var w = 1; w < 7; w++) {
		document.write("<tr>");
		for (var d = 0; d < 7; d++) {
			tdIdx++;
			if (!isNaN(myMonth[w][d])) {
				if(dType!=null&&wDate==selectYM){
					document.write("<td align='center'  valign='top' width='" + iCellWidth + "' height='" + iCellHeight + "' id=calCell"+tdIdx+" style='CURSOR:Hand' onclick=fSetSelectedDay(this);javascript:onClickCell(this)>");				    					   
					document.write("<font id=calDateText style='CURSOR:Hand;FONT-FAMILY:Arial;FONT-SIZE:" + sDateTextSize + ";FONT-WEIGHT:" + 
					sDateTextWeight + ";color:" + colorType(myMonth[w][d]-1) + "' onclick=fSetSelectedDay(this);fToggleColor(this)>" + myMonth[w][d]+"<br>"+returnType(myMonth[w][d]-1)+"<br></font>");
					}else{
				        document.write("<td align='center'  valign='top' width='" + iCellWidth + "' height='" + iCellHeight + "' id=calCell"+tdIdx+" style='CURSOR:Hand' onclick=fSetSelectedDay(this);javascript:onClickCell(this)>");
					    if(myMonth[w][d]==myMonth[1][0]||myMonth[w][d]==myMonth[1][6]||myMonth[w][d]==myMonth[2][0]||myMonth[w][d]==myMonth[2][6]
					    ||myMonth[w][d]==myMonth[3][0]||myMonth[w][d]==myMonth[3][6]||myMonth[w][d]==myMonth[4][0]||myMonth[w][d]==myMonth[4][6] 
					    ||myMonth[w][d]==myMonth[5][0]||myMonth[w][d]==myMonth[5][6]||myMonth[w][d]==myMonth[6][0]||myMonth[w][d]==myMonth[6][6])
				    {
				    	document.write("<font id=calDateText style='CURSOR:Hand;FONT-FAMILY:Arial;FONT-SIZE:" + sDateTextSize 
				    		+ ";FONT-WEIGHT:" + sDateTextWeight + ";color:red' onclick=fSetSelectedDay(this)>" 
				    		+ myMonth[w][d]+"<br>"+holidaystr +"<br></font>");
				    } else {
				    	document.write("<font id=calDateText style='CURSOR:Hand;FONT-FAMILY:Arial;FONT-SIZE:" + sDateTextSize 
				    		+ ";FONT-WEIGHT:" + sDateTextWeight 
				    		+ ";color:black' onclick=fSetSelectedDay(this)>" 
				    		+ myMonth[w][d]+"<br>"+workstr +"<br></font>");
				    }
			    }
			} else {
				document.write("<td align='left' valign='top' width='" + iCellWidth + "' height='" + iCellHeight + "' id=calCell >");
				document.write("上月<font id=calDateText style='CURSOR:Hand;FONT-FAMILY:Arial;FONT-SIZE:" + 
					sDateTextSize + ";FONT-WEIGHT:" + sDateTextWeight + "'> </font>");
			}
	
			document.write("</td>");
		}
		document.write("</tr>");
	}
	document.write("</table>");
}

function fUpdateCal(iYear, iMonth) {
	myMonth = fBuildCal(iYear, iMonth);
	objPrevElement.bgColor = "";
	document.all.calSelectedDate.value = "";
	for (var w = 1; w < 7; w++) {
		for (var d = 0; d < 7; d++) {
			if (!isNaN(myMonth[w][d])) {
				calDateText[((7*w)+d)-7].innerText = myMonth[w][d];
			} else {
				calDateText[((7*w)+d)-7].innerText = " ";
			}
		}
	}
}


function onClickCell(pra){	
	var context=pra.innerHTML;
	var workstr=context.replace(/节假日/g,"工作日");
	var holidaystr=context.replace(/工作日/g,"节假日");
	if(context.indexOf("节假日")!=-1){
		pra.innerHTML=workstr;
	}else if(context.indexOf("工作日")!=-1){
		pra.innerHTML=holidaystr;	
		}

	for (var i in pra.children) {
		if (pra.children[i].id == "calDateText") {
			if(pra.children[i].style.color == "red"){
				pra.children[i].style.color = "black";
			}else{
				pra.children[i].style.color = "red";
			}
		}
	}
	//context=<%=workdate%>;
	
	//var str=document.getElementById("calCell");
	
	//alert(pra.calDateText);
	
	//open("content.jsp?id="+pra+"","newwindow", "height=402, width=641, top=100,left=200,toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
}

function fToggleColor(myElement) {
	var today="<%=today%>";
	var toggleColor = "red";
	if (myElement.id == "calDateText") {
		if (myElement.color == toggleColor) {
			myElement.color = "";
		} else {
			myElement.color = toggleColor;
		}
	} else if (myElement.id == "calCell") {
		for (var i in myElement.children) {
			if (myElement.children[i].id == "calDateText") {
				if (myElement.children[i].color == toggleColor) {
					myElement.children[i].color = "";
				} else {
					myElement.children[i].color = toggleColor;
				}
			}
		}
	}
}

function fSetSelectedDay(myElement){
	if (myElement.id == "calCell") {
		if (!isNaN(parseInt(myElement.children["calDateText"].innerText))) {
			myElement.bgColor = "#c0c0c0";
			objPrevElement.bgColor = "";
			document.all.calSelectedDate.value = parseInt(myElement.children["calDateText"].innerText);
			objPrevElement = myElement;
		}
	}
}



</script>

<form name="frmCalendarSample" id ="frmCalendarSample" method="post" action="<%=rootPath%>/fmp/SWorkCalenderBiz/ShowDate">
<input type="hidden" name="calSelectedDate">
<table border="1px" cellspacing="0px" style="border-collapse:collapse" rules="all" width="100%">
	<tr>
		<td>月份:
		<select id="tbSelMonth" name="tbSelMonth" class="d_WorkCalender_select"
			onchange='fUpdateCal(frmCalendarSample.tbSelYear.value, frmCalendarSample.tbSelMonth.value);creatCal()'>
			<option value="1">一月</option>
			<option value="2">二月</option>
			<option value="3">三月</option>
			<option value="4">四月</option>
			<option value="5">五月</option>
			<option value="6">六月</option>
			<option value="7">七月</option>
			<option value="8">八月</option>
			<option value="9">九月</option>
			<option value="10">十月</option>
			<option value="11">十一月</option>
			<option value="12">十二月</option>
		</select>
		年份: 
		<select id="tbSelYear" name="tbSelYear" class="d_WorkCalender_select"
			onchange='fUpdateCal(frmCalendarSample.tbSelYear.value, frmCalendarSample.tbSelMonth.value);creatCal()'>
			<option value="2001">2001</option>
			<option value="2002">2002</option>
			<option value="2003">2003</option>
			<option value="2004">2004</option>
			<option value="2005">2005</option>
			<option value="2006">2006</option>
			<option value="2007">2007</option>
			<option value="2008">2008</option>
			<option value="2009">2009</option>
			<option value="2010">2010</option>
			<option value="2011">2011</option>
			<option value="2012">2012</option>
			<option value="2013">2013</option>
			<option value="2014">2014</option>
			<option value="2015">2015</option>
			<option value="2016">2016</option>
			<option value="2017">2017</option>
			<option value="2018">2018</option>
			<option value="2019">2019</option>
			<option value="2020">2020</option>	
		</select>
		</td>
		<%if(FMPContex.MAINORGID.equals(currOrgId)){ %>
		<td>	
		<div  id="ORGSETTING" align="left">
			<font style="align:right">设置机构：</font>
			<input class="x-form-field" type="text" id="disp_detailId_SETORGID" readonly />
			<input class="" type="hidden" id="detailId_SETORGID" onchange="creatCal()"/>
			<button id="" class="btn" onclick="openSinPop('SOrg','SETORGID','ORGID','ORGNAME')">...</button>
		</div>

		</td>	
		<% }%>
	</tr>
	<tr><td colspan="2">下面是日历</td></tr>
	<tr>
		<td colspan ="2">
<script language="JavaScript">
var dCurDate = new Date(2001,1,1);

<% out.print("dCurDate = new Date(" + year + "," + month + ",1);");%>


fDrawCal(dCurDate.getFullYear(), dCurDate.getMonth(), 60, 50, "17px", "bold", 1);
</script>
</td>
	</tr>
</table>
<br>
<input  type = 'button' value = '保存' class='button' onclick = 'dosave()'/>
</form>
</body>

<script language="JavaScript" for=window event=onload>
var MonthId = dCurDate.getMonth();
var YearId = dCurDate.getFullYear();
//alert(YearId+","+MonthId);

if (MonthId==0){
	MonthId = 12;
	YearId = YearId -1;
}

frmCalendarSample.tbSelMonth.options[MonthId-1].selected = true;
for (var i = 0; i < frmCalendarSample.tbSelYear.length; i++)
	if (frmCalendarSample.tbSelYear.options[i].value == YearId)
		frmCalendarSample.tbSelYear.options[i].selected = true;
</script>

<script language="JavaScript">	
var setOrgName = "${ORGNAME}";
var setOrgId = "${ORGID}";
if(setOrgName !=""){
	$('#detailId_SETORGID').val(setOrgId);
	$('#disp_detailId_SETORGID').val(fmpDecodeURI(setOrgName));
	setOrgName ="";
	setOrgId = "";
}
	function creatCal(){
		var formObj = $_('frmCalendarSample');
	    setOrgId = $_('detailId_SETORGID').value;
		setOrgName = $_('disp_detailId_SETORGID').value;
		var url = formObj.action + formObj.action+"?ORGID="+setOrgId+"&ORGNAME="+setOrgName;
		formObj.action = fmpEncodeURI(url);
		formObj.submit();
	}
	function getValue(e){
		var objdate = document.getElementById(e);
		var tempValue ="";
		for(var i=0;i<objdate.length;i++){
				if(objdate.options[i].selected ==true){
					tempValue = objdate.options[i].value;
					}
			}
		return tempValue;
	}
	function dosave(){
		if (confirm("是否确认保存设置？")) {
			 var dateType;  //日期类型，0为工作日，1为节假日	  
			 var currDay=getValue("tbSelYear")+"-"+getValue("tbSelMonth");
			 var typeStr='';
			 
			  var t=document.getElementById("calender").childNodes.item(0);
		
			   for(var i=0;i< t.childNodes.length;i++)
				   
			   {
			      for(var j=0;j<t.childNodes(i).childNodes.length;j++)
			         {
			    		var cont=t.childNodes(i).childNodes(j).innerText;
			    		if(cont.indexOf("节假日")!=-1){
			    			dateType=1;
			    		}else if(cont.indexOf("工作日")!=-1){
			    			dateType=0;
			    			}else{dateType="";}
			    		
				         if(dateType!=null){
				        	 typeStr=typeStr+dateType;
				         }
			         }
			   }
			   var bizOrgId = "";
			   if($_('detailId_SETORGID') && ($_('detailId_SETORGID').value) !=""){
					bizOrgId = $_('detailId_SETORGID').value;
			   }else{
					bizOrgId = CURR_ORGID;
			   }
				setOrgName = $_('disp_detailId_SETORGID').value;
		  	   var url=rootPath+"/fmp/SWorkCalenderBiz/doSave?tableModelId=SWorkCalender&WORKDATE="+currDay
		  					+"&DATETYPE="+typeStr
		  					+"&ORGID="+bizOrgId
		  					+"&ORGNAME="+setOrgName; 
		  	   comAjax(url,backCallDiary);
		}
		 
   }

function backCallDiary(msg){
	showMessage(msg);
  }

</script>
</html>
<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/afterinclude.jsp" /> 