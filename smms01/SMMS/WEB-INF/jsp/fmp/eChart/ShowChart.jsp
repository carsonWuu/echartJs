<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
     String rootPath = request.getContextPath();
%>
 
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
    <script src="<%=rootPath %>/scripts/fmp/jquery-1.11.3.js" type="text/javascript" language="javascript"></script>    
    <!-- 引入 echarts.js -->
    <script src="<%=rootPath %>/scripts/fmp/echarts.min.js" type="text/javascript" language="javascript"></script>    
</head>
<body>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <br><br><br><br>
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
 
    $("#main").css("height",document.body.scrollHeight);
    $("#main").css("width",document.body.scrollWidth);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title : {
                text: '${chartTitle}',
                x: 'center'
            },           
            tooltip: {},
            legend: {
                data:${labels},   //data:['销量']
                x: 'left'
            },
            xAxis: {
                data:${xAxis}//["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]  // 
            },
            yAxis: {
 
			},
            series: ${chartDataStr}


                /* [{
                name: '销量',
                type: '${chartType}',
                data: [5, 20, 36, 10, 10, 20]
            }]*/
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    </script>
</body>
</html>