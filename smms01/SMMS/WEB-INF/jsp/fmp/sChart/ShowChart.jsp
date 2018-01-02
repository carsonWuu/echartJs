<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%
	String rootPath = request.getContextPath();
%>
<!-----------------------------------
* @功能说明：图表显示页面,用于IE6
------------------------------------>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>IE6图表展示</title>
<script src="<%=rootPath%>/scripts/fmp/sChart/excanvas.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/sChart/prototype.js" type="text/javascript" language="javascript"></script>
<script src="<%=rootPath%>/scripts/fmp/sChart/sChart.js" type="text/javascript" language="javascript"></script>
</head>
<body>
<div id="wrapper">
	<div><canvas id="pie1" height="500" width="600"></canvas></div>
</div>
		<div id="footer">		
		</div>
</body>

<SCRIPT type="text/javascript">
<%
	String chartType = (String)request.getAttribute("chartType");
	String chartDataStr = (String)request.getAttribute("chartDataStr");
	if ("2dpie".equals(chartType)){
		%>
			var dataset = <%=chartDataStr%>;
				var options = {
						// Define a padding for the canvas node.
						padding: {
							left: 30, 
							right: 0, 
							top: 10, 
							bottom: 30
						},				
						// Background color to render.
						background: {
							color: '#f2f2f2'
						},					
						// Use the predefined blue colorscheme.
						colorScheme: 'blue',				
						axis: {
							// The fontcolor of the labels is black.
							labelColor: '#000000',
							// Add the ticks. Keep in mind, x and y axis are swapped
							// when the BarOrientation is horizontal.
		 					x: {
								ticks: [
									{v:0, label:'January'}, 
							      	{v:1, label:'February'}, 
							      	{v:2, label:'March'},
							      	{v:3, label:'April'}
								]
							}	
						}
					};
					
					// Instantiate a new PieCart.
					var pie = new SChart.PieChart('pie1',options);
					// Add a dataset to it.
					pie.addDataset(dataset);
					// Render it.
					pie.render();
		<%
	}
%>




</SCRIPT>
</html>
