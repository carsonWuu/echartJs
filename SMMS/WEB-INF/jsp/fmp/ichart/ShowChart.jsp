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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>IE9图表展示</title>
<script src="<%=rootPath%>/scripts/fmp/ichart.latest.min.js" type="text/javascript" language="javascript"></script>
</head>
<body>
	<div id='canvasDiv'></div>
</body>

<SCRIPT type="text/javascript">
<%
	String chartType = (String)request.getAttribute("chartType");
	String chartDataStr = (String)request.getAttribute("chartDataStr");
	if ("2dpie".equals(chartType)){
		%>
		$(function(){
			var data = <%=chartDataStr%>;
        	
			new iChart.Pie2D({
				render : 'canvasDiv',
				data: data,
				title : '${chartTitle}',
				legend : {
					enable : true,
					align : 'left',
					valign : 'bottom',
					row:5,
					column:'max'
				},
				tip:{
					enable : true
				},
				listeners:{
					parseTipText:function(d, t, i){
						return ''+data[t].value;
					},			
				},		
				animation:true,
				showpercent:true,
				decimalsnum:2,
				width : 800,
				height : 600,
				top: 0,
				radius:140
			}).draw();
		});	
		<%
	}else if ("3dpie".equals(chartType)){
		%>
		$(function(){
			var data = <%=chartDataStr%>;
        	
			new iChart.Pie3D({
				render : 'canvasDiv',
				data: data,
				title :  '${chartTitle}',
				legend : {
					enable : true,
					align : 'left',
					valign : 'bottom',
					row:5,
					column:'max'
				},
				tip:{
					enable : true
				},	
				listeners:{
					parseTipText:function(d, t, i){
						return ''+data[t].value;
					}			
				},		
				animation:true,
				showpercent:true,
				decimalsnum:1,
				width : 800,
				height : 500,
				radius:140
			}).draw();
		});		
		<%
	}else  if ("2dbar".equals(chartType)){
		%>
		$(function(){
			var data =<%=chartDataStr%>;
        	
			new iChart.Bar2D({
				render : 'canvasDiv',
				background_color : '#EEEEEE',
				data: data,
				title :  '${chartTitle}',
				subtitle : '',
				footnote : '',
				width : 800,
				height : 500,
				coordinate:{
					width:600,
					height:300,
					axis:{
						width:[0,0,1,1]
					},
					scale:[{
						 position:'bottom',	
						 start_scale:${startScale},
						 end_scale: ${endScale},
						 scale_space:${scaleSpace}
					}]
				},
				animation:true,
				rectangle:{
					listeners:{
						drawLabelText:function(r,t){
							return t;
						}
					}
				},
				legend:{
					enable:true,
					align : 'center',
					valign : 'bottom',
					row:2,
					column:'max'
					},
				tip:{
					enable : true
				},				
			}).draw();
		});
		<%
	}else  if ("2dcolumn".equals(chartType)){
		%>
		$(function(){
			var data =<%=chartDataStr%>;
        	
			new iChart.Column2D({
				render : 'canvasDiv',
				data: data,
				title : '${chartTitle}',
				showpercent:false,
				decimalsnum:2,
				width : 800,
				height : 500,
				legend : {
					enable : true,
					align : 'center',
					valign : 'bottom',
					row:2,
					column:'max'
				},
				tip:{
					enable : true
				},
				coordinate:{
					width:800,
					height : 300,
					scale:[{
						 position:'left',	
						 start_scale:${startScale},
						 end_scale:${endScale},
						 scale_space:${scaleSpace},
						 listeners:{
							parseText:function(t,x,y){
								return {text:t}
							}
						}
					}]
				},
				animation:true
			}).draw();
		});
		<%
	}else  if ("2dmulticolumn".equals(chartType)){
		%>
		$(function(){
			var data =<%=chartDataStr%>;
        	
			new iChart.ColumnMulti2D({//
				render : 'canvasDiv',
				data: data,
				data_labels: ${labels},
				title : '${chartTitle}',
				decimalsnum:2,
				width : 800,
				height : 500,
				legend : {
					enable : true,
					align : 'center',
					valign : 'bottom',
					row:2,
					column:'max'
				},
				tip:{
					enable : true
				},
				coordinate:{
					width:800,
					height : 300,
					scale:[{
						 position:'left',	
						 start_scale:${startScale},
						 end_scale:${endScale},
						 scale_space:${scaleSpace},
						 listeners:{
							parseText:function(t,x,y){
								return {text:t}
							}
						}
					}]
				},
				animation:true
			}).draw();
		});
						
		<%
	}else  if ("3dcolumn".equals(chartType)){
		%>
		$(function(){
			var data =<%=chartDataStr%>;
        	
			new iChart.Column3D({//
				render : 'canvasDiv',
				data: data,
				title : '${chartTitle}',
				showpercent:false,
				decimalsnum:2,
				width : 800,
				height : 500,
				legend : {
					enable : true,
					align : 'center',
					valign : 'bottom',
					row:2,
					column:'max'
				},
				tip:{
					enable : true
				},
				coordinate:{
					width:800,
					height : 300,
					scale:[{
						 position:'left',	
						 start_scale:${startScale},
						 end_scale:${endScale},
						 scale_space:${scaleSpace}
					},{ 
						 position:'bottom',	
						 scale_enable : false,
						 labels:${labels},
						 listeners:{
						 	 parseText:function(t,x,y){
									//自定义左侧坐标系刻度文本的格式。
									var reStr = "(.{5}|.*)"; 
									var reg = new RegExp(reStr,"g"); 
									var ocArray = t.match(reg);
									var arrLength = ocArray.length+1; 
									for(var element=0;element<arrLength;element+=2){ 
										ocArray.splice(element+1,0,'\n');
									}
									 								
									return {text: ''};
									
							}
						}							 
					}]
				},
				animation:true
			}).draw();
		});
		<%
	}else  if ("3dmulticolumn".equals(chartType)){
		%>
		$(function(){
			var data =<%=chartDataStr%>;
			new iChart.ColumnMulti3D({//
				render : 'canvasDiv',
				data: data,
				data_labels: ${labels},
				title : '${chartTitle}',
				decimalsnum:2,
				width : 800,
				height : 500,
				legend : {
					enable : true,
					align : 'center',
					valign : 'bottom',
					row:2,
					column:'max'
				},
				tip:{
					enable : true
				},
				coordinate:{
					width:800,
					height : 300,
					scale:[{
						 position:'left',	
						 start_scale:${startScale},
						 end_scale:${endScale},
						 scale_space:${scaleSpace},
						 listeners:{
							parseText:function(t,x,y){
								return {text:t}
							}
						}
					}


					,{
						 position:'bottom',	
						 scale_enable : false,
						 labels:${labels},
						 listeners:{
						 	parseText:function(t,x,y){
									//自定义左侧坐标系刻度文本的格式。
									
									var reStr = "(.{5}|.*)"; 
									var reg = new RegExp(reStr,"g"); 
									var ocArray = t.match(reg);
									var arrLength = ocArray.length+1; 
									for(var element=0;element<arrLength;element+=2){ 
										ocArray.splice(element+1,0,'\n');
									}
									 								
									return {text: ocArray.join('')};
									
							}
						}
					}
					
					]
				
				},
				animation:true
			}).draw();
		});		
		<%
	}else if ("2dline".equals(chartType)){
		%>
		$(function(){
			var data = <%=chartDataStr%>;
			var line = new iChart.LineBasic2D({
				render : 'canvasDiv',
				data: data,
				align:'center',
				valign : 'top',
				title : '${chartTitle}',
				subtitle : '',
				footnote : '',
				width : 800,
				height : 450,
				animation:true,
				tip:{
					enable:true,
					shadow:true
				},
				legend : {
					enable : true,
					align : 'right',
					valign : 'top',
					row: 2,
					column: 'max' 
				},
				crosshair:{
					enable:true,
					line_color:'#62bce9'
				},
				coordinate:{
					width:600,
					height:260,
					axis:{
						color:'#9f9f9f',
						width:[0,0,2,2]
					},
					grids:{
						vertical:{
							way:'share_alike',
					 		value:5
						}
					},
					scale:[{
						 position:'left',	
						 start_scale:${startScale},
						 end_scale:${endScale},
						 scale_space:${scaleSpace}*2,
						 scale_size:2,
						 scale_color:'#9f9f9f', 
					},{
						 position:'bottom',	
						 scale_enable : false,
						 labels:${labels},
						 listeners:{
						 	parseText:function(t,x,y){
									//自定义左侧坐标系刻度文本的格式。
									
									var reStr = "(.{5}|.*)"; 
									var reg = new RegExp(reStr,"g"); 
									var ocArray = t.match(reg);
									var arrLength = ocArray.length+1; 
									for(var element=0;element<arrLength;element+=2){ 
										ocArray.splice(element+1,0,'\n');
									}
									 								
									return {text: ocArray.join('')};
									
							}
						}						 
					}]				
				}
			});
		
		//开始画图
		line.draw();
	});		
		<%
	}
		%>



</SCRIPT>
</html>
