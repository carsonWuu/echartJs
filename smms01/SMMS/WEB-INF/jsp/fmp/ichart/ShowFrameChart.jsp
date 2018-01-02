<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%
	String rootPath = request.getContextPath();
%>
<!-----------------------------------
* @功能说明：图表显示，用于IE9
------------------------------------>
<html>
<head>
<title>IE9图表展示</title>
<META http-equiv="X-UA-Compatible" content="IE=10" />
<script src="<%=rootPath%>/scripts/fmp/ichart.latest.min.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/ajaxSubmit.js" type="text/javascript" language="javascript"></script>
</head>
<body>
	<div id="showChart" style="width:50%;float:left;">
	</div>
	<div id="showChart2" style="width:50%;float:right;">
	</div>
	<input type="button" value="开始/暂停" onclick="testEvent1()" style="width:50%;float:left"/>
	<input type="button" value="开始/暂停" onclick="testEvent2()" style="width:50%;float:right;"/>
</body>

<script type="text/javascript">
	function hideProgressDiv(){
		var obj = window.parent.document.getElementById("divprogressbar");
		if(obj){
			window.parent.document.body.removeChild(obj);
		}	
		
	}
	
	function drawLineChart(div, data, labels){
		if(!window.lineChartDataObj1){
			window.lineChartDataObj1 = {
					render : div,
					data: data,
					align:'center',
					title : 'CPU使用情况',
					subtitle : '详细记录每个CPU每秒钟使用的百分比(单位：%)',
					footnote : '数据来源：模拟数据',
					width : document.body.clientWidth/2,
					height : 450,
					background_color:'#FEFEFE',
					tip:{
						enable:true,
						shadow:true,
						move_duration:400,
						border:{
							enable:true,
							radius : 5,
							width:2,
							color:'#3f8695'
						},
						listeners:{
							//tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
							parseText:function(tip,name,value,text,i){
								return name+"使用百分比:"+value+"%";
							}
						}
					},
					tipMocker:function(tips,i){
						return "<div style='font-weight:600'>"+
						beforeSecond(window.date1, 30 - i)+//日期
						"</div>"+tips.join("<br/>");
					},
					legend : {
						enable : true,
						row:1,//设置在一行上显示，与column配合使用
						column : 'max',
						valign:'top',
						sign:'bar',
						background_color:null,//设置透明背景
						offsetx:-80,//设置x轴偏移，满足位置需要
						border : true
					},
					crosshair:{
						enable:true,
						line_color:'#62bce9'//十字线的颜色
					},
					sub_option : {
						//smooth : true,//平滑曲线
						label:false,
						point_size:10
					},
					coordinate:{
						//width:500,
						//valid_width: 300,
						height:300,
						axis:{
							color:'#dcdcdc',
							width:1
						},
						scale:[{
							position:'left',
							start_scale:0,
							end_scale:100,
							scale_space:10,
							scale_size:2,
							scale_color:'#9f9f9f'
							},{
							position:'bottom',
							labels:labels
							}]
					}
				};
		}else{
			window.lineChartDataObj1.data = data;
			window.lineChartDataObj1.coordinate.scale[1].labels = labels;
		}
		//window.lineChartObj1 = null;
		if(!window.lineChartObj1){
			window.lineChartObj1 = new iChart.LineBasic2D(window.lineChartDataObj1);
			window.lineChartObj1.draw();
			hideProgressDiv();
		}else{
			window.lineChartObj1.load(data);
		}
	}

	function drawLineChart2(div, data, labels){
		if(!window.lineChartDataObj2){
			window.lineChartDataObj2 = {
					render : div,
					data: data,
					align: 'center',
					title : {
						text:'CPU使用情况',
						fontsize:24,
						color:'#f7f7f7'
					},
					subtitle : {
						text:'详细记录CPU3每秒钟使用的百分比(单位：%)',
						color:'#f1f1f1'
					},
					footnote : {
						text:'数据来源：模拟数据',
						color:'#f1f1f1'
					},
					width : document.body.clientWidth/2,
					height : 450,
					shadow:true,
					shadow_color : '#20262f',
					shadow_blur : 4,
					shadow_offsetx : 0,
					shadow_offsety : 2,
					background_color:'#8DB7EB',
					tip:{
						enable:true,
						shadow:true,
						listeners:{
							//tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
							parseText:function(tip,name,value,text,i){
								return name+"使用百分比:"+value+"%";
							}
						}
					},
					tipMocker:function(tips,i){
						return "<div style='font-weight:600'>"+
						beforeSecond(window.date2, 30 - i)+//日期
						"</div>"+tips.join("<br/>");
					},
					crosshair:{
						enable:true,
						line_color:'#62bce9'
					},
					sub_option : {
						label:false,
						hollow_inside:false,
						point_size:8
					},
					coordinate:{
						//width:500,
						height:300,
						grid_color:'#cccccc',
						axis:{
							color:'#cccccc',
							width:[0,0,2,2]
						},
						grids:{
							vertical:{
								way:'share_alike',
								value: 3
							}
						},
						scale:[{
							position:'left',
							start_scale:0,
							end_scale:100,
							scale_space:10,
							scale_size:2,
							label : {color:'#ffffff',fontsize:11},
							scale_color:'#9f9f9f'
							},{
							position:'bottom',
							label : {color:'#ffffff',fontsize:11},
							labels:labels
							}]
					}
				};
		}else{
			window.lineChartDataObj2.data = data;
			window.lineChartDataObj2.coordinate.scale[1].labels = labels;
		}
		//window.lineChartObj2 = null;
		if(!window.lineChartObj2){
			window.lineChartObj2 = new iChart.LineBasic2D(window.lineChartDataObj2);
			window.lineChartObj2.draw(); 
		}else{
			window.lineChartObj2.load(data); 
		}
	}

	showCharts1();
	showCharts2();
	var event1 = setInterval(showCharts1, 1000);
	var event2 = setInterval(showCharts2, 1000);
	
	function testEvent1(){
		if(event1){
			clearInterval(event1);
			event1 = null;
		}else{
			showCharts1();
			event1 = setInterval(showCharts1, 1000);
		}
	}
	function testEvent2(){
		if(event2){
			clearInterval(event2);
			event2 = null;
		}else{
			showCharts2();
			event2 = setInterval(showCharts2, 1000);
		}
	}
	
	var cpu1 = [], cpu2 = [], cpu3 = [];
	for(var i=0; i<31; i++){
		cpu1[i] = 0;
		cpu2[i] = 0;
		cpu3[i] = 0;
	}
	
	function showCharts1(){
		var url = "<%=rootPath%>/fmp/FrameBiz/ShowCPUChart";
		XMLHttp.urlSubmit(url, backCall);
		function backCall(msg){
			window.date1 = new Date();
			drawLineChart("showChart", getLineChartData(msg), getLabels(window.date1));
		}
	}

	function showCharts2(){
		var url = "<%=rootPath%>/fmp/FrameBiz/ShowCPUChart";
		XMLHttp.urlSubmit(url, backCall);
		function backCall(msg){
			window.date2 = new Date();
			drawLineChart2("showChart2", getLineChartData2(msg), getLabels(window.date2));
		}
	}

	function getLineChartData(msg){
		cpu1.splice(0, 1);
		cpu2.splice(0, 1);
		try{
			if(msg == "failure"){
				cpu1[30] = cpu1[29];
				cpu2[30] = cpu2[29];
			}else{
				var obj = eval('('+msg+')');
				cpu1[30] = obj[0];
				cpu2[30] = obj[1];
			}
		}catch(e){
			//cpu1[30] = Math.ceil(Math.random()*100);
			//cpu2[30] = Math.ceil(Math.random()*100);
		}
		return [
				{
					name : 'CPU1',
					value: cpu1,
					color: '#aad0db',
					line_width: 2
					},
					{
					name : 'CPU2',
					value: cpu2,
					color: '#f68f70',
					line_width: 2
					}
			];
	}

	function getLineChartData2(msg){
		cpu3.splice(0, 1);
		try{
			if(msg == "failure"){
				cpu3[30] = cpu3[29];
			}else{
				var obj = eval('('+msg+')');
				cpu3[30] = obj[0];
			}
		}catch(e){
			//cpu3[30] = Math.ceil(Math.random()*100);
		}
		return [
				{
					name : 'CPU3',
					value: cpu3,
					color: '#0d8ecf',
					line_width: 2
					}
			];
	}

	function getLabels(date){
		var labels = [];
		for(var i=0; i<4; i++){
			labels.push(beforeSecond(date, 30 - 10*i));
		}
		return labels;
	}

	function beforeSecond(date, befSec){
		var showDate = new Date(date);
		showDate.setSeconds(showDate.getSeconds()-befSec);
		var currHour = showDate.getHours();
		var currMinute = showDate.getMinutes();
		var currSecond = showDate.getSeconds();
		currHour = (currHour < 10) ? ('0' + currHour) : currHour;
		currMinute = (currMinute < 10) ? ('0' + currMinute) : currMinute;
		currSecond = (currSecond < 10) ? ('0' + currSecond) : currSecond;
		return currHour + ":" + currMinute + ":" + currSecond;
	}
</script>
</html>
