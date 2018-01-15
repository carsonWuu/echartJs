<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>WEB流程图编辑器</title>
<%
	String rootPath = request.getContextPath();
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="author" content="bayu">

<link rel="stylesheet" href="<%=rootPath%>/styles/fmp/bootstrap/menu/style.css" media="screen" type="text/css" />
<link rel="stylesheet" href="<%=rootPath%>/styles/fmp/bootstrap/menu/font-awesome.css" media="screen" type="text/css" />
<link href="<%=rootPath%>/styles/fmp/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="<%=rootPath%>/styles/fmp/bootstrap/css/button.css" rel="stylesheet" type="text/css" />	 
<!--[if lte IE 6]>
<link rel="stylesheet" type="text/css" href="<%=rootPath%>/styles/fmp/bootstrap/css/bootstrap-ie6.css">
<![endif]-->
<!--[if lte IE 7]>
<link rel="stylesheet" type="text/css" href="<%=rootPath%>/styles/fmp/bootstrap/css/ie.css">
<![endif]-->
<link href="<%=rootPath%>/styles/fmp/site.css" rel="stylesheet" type="text/css" />

<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script type="text/javascript">
        var _root='http://flowdesign.leipi.org/index.php?s=/',_controller = 'flowdesign';
</script> 

<link rel="stylesheet" type="text/css" href="<%=rootPath%>/scripts/fmp/svgWorkFlow/flowdesign/flowdesign.css" />

<!--select 2-->
<link rel="stylesheet" type="text/css" href="<%=rootPath%>/scripts/fmp/svgWorkFlow/jquery.multiselect2side/css/jquery.multiselect2side.css" />
<script src="<%=rootPath%>/scripts/fmp/jquery-1.9.0.js"></script>
<script>

var opMode="${opMode}";
window.onload=function()
{
	//页面加载的时候判断进来的浏览模式，Key为opMode，Value=view为流程监控模式,Value=edit为流程图编辑模式
	//String opMode=getQueryString("FLOWTEMPID");
	
	if("${opMode}"=="view")
	{
		//浏览模式下，标记节点办理人的状态和节点名称
		$("#window"+"${CURRNODEID}").attr("style",$("#window"+"${CURRNODEID}").attr("style")+";border:solid 3px red;");//标记红框
		$("#window"+"${CURRNODEID}").attr("title","当前节点办理人为:${CURRAPPROVERSET}");//标记节点办理人
	}else
	{
		//当进来的模式为编辑模式-开放所有的编辑按钮
		$("#breadcrumb").append(
				  '<li><a href="javascript:void(0)" onclick="Startnode()"><span class="icon icon-ok"> </span> 开始节点</a></li>'+
				  '<li><a href="javascript:void(0)" onclick="Endnode()"><span class="icon icon-ok"></span> 结束节点</a></li>'+
				  '<li><a href="javascript:void(0)" onclick="flownode()"><span class="icon icon-user"> </span> 流程节点</a></li>'+
				  '<li><a href="javascript:void(0)" onclick="saveflow()"><span class="icon icon-save"> </span> 保存流程</a></li>');
	}
};
function getOpMode()
{
	return opMode;
}
</script>
</head>
<body>

<ul id="breadcrumb">
 
</ul>
<!-- fixed navbar -->
<div class="navbar navbar-inverse navbar-fixed-top"></div>






<!-- Modal -->
<div id="alertModal" class="modal hide fade" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal"
	aria-hidden="true">×</button>
<h3>消息提示</h3>
</div>
<div class="modal-body">
<p>提示内容</p>
</div>
<div class="modal-footer">
<button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">我知道了</button>
</div>
</div>

<!-- attributeModal -->
<div id="attributeModal" class="modal hide fade" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
	style="width: 800px; margin-left: -350px">
<div class="modal-body" style="max-height: 500px;"><!-- body --></div>

</div>



<!--contextmenu div-->
<div id="processMenu" style="display: none;">
<ul>
	<li id="pmDelete"><i class="icon-trash"></i>&nbsp;<span
		class="_label">删除</span></li>

</ul>
</div>
<div id="canvasMenu" style="display: none;">
<ul>
	<li id="cmRefresh"><i class="icon-refresh"></i>&nbsp;<span
		class="_label">刷新 F5</span></li>
</ul>
</div>
<!--end div-->

<div class="container mini-layout" id="flowdesign_canvas"></div>
<!-- /container -->













<script type="text/javascript"
	src="<%=rootPath%>/scripts/fmp/svgWorkFlow/jquery-1.9.0.js"></script>
<script type="text/javascript"
	src="<%=rootPath%>/styles/fmp/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="<%=rootPath%>/scripts/fmp/svgWorkFlow/jquery-ui/jquery-ui-1.9.2-min.js"></script>
<script type="text/javascript"
	src="<%=rootPath%>/scripts/fmp/svgWorkFlow/jsPlumb/jquery.jsPlumb-1.4.0-all.js"></script>
<script type="text/javascript"
	src="<%=rootPath%>/scripts/fmp/svgWorkFlow/jquery.contextmenu.r2.js"></script>
<!--select 2-->
<script type="text/javascript"
	src="<%=rootPath%>/scripts/fmp/svgWorkFlow/jquery.multiselect2side/js/jquery.multiselect2side.js"></script>
<!--flowdesign-->
<script type="text/javascript"
	src="<%=rootPath%>/scripts/fmp/svgWorkFlow/flowdesign/leipi.flowdesign.v3.js" charset="utf-8"></script>
<script type="text/javascript">
	var the_flow_id = '4';
	function callbackSuperDialog(selectValue) {
		var aResult = selectValue.split('@leipi@');
		$('#' + window._viewField).val(aResult[0]);
		$('#' + window._hidField).val(aResult[1]);
		//document.getElementById(window._hidField).value = aResult[1];

	}
    var jsondata=null;
	var clickTimer = null;
	$(function() {
		var alertModal = $('#alertModal'), attributeModal = $("#attributeModal");
		//消息提示
		mAlert = function(messages, s) {
			if (!messages)
				messages = "";
			if (!s)
				s = 2000;
			alertModal.find(".modal-body").html(messages);
			alertModal.modal('toggle');
			setTimeout(function() {
				alertModal.modal("hide")
			}, s);
		}

		//属性设置
		attributeModal.on("hidden", function() {
			$(this).removeData("modal");//移除数据，防止缓存
			});
		ajaxModal = function(url, fn) {
			url += url.indexOf('?') ? '&' : '?';
			url += '_t=' + new Date().getTime();
			attributeModal.find(".modal-body").html('__tag_227$49_');
			attributeModal.modal( {
				remote : url
			});

			//加载完成执行
			if (fn) {
				attributeModal.on('shown', fn);
			}

		}
		//刷新页面
		function page_reload() {
			location.reload();
		}

		/*
		php 命名习惯 单词用下划线_隔开
		js 命名习惯：首字母小写 + 其它首字线大写
		 */
		/*步骤数据*/
		// var processData = 
		//{"total":5,"list":[{"id":"001","flow_id":"4","process_name":"开始","process_to":"63,64","icon":"icon-ok","style":"width:121px;height:41px;line-height:41px;color:#0e76a8;left:193px;top:132px;"},
		//{"id":"62","flow_id":"4","process_name":"\u5ba1\u62792","process_to":"999","icon":"icon-star","style":"width:120px;height:30px;line-height:30px;color:#0e76a8;left:486px;top:337px;"},
		//{"id":"63","flow_id":"4","process_name":"\u5feb\u6377\u5ba1\u6279","process_to":"999","icon":"icon-star","style":"width:120px;height:30px;line-height:30px;color:#0e76a8;left:193px;top:472px;"},
		//{"id":"64","flow_id":"4","process_name":"\u5ba1\u62791","process_to":"62,999","icon":"icon-star","style":"width:120px;height:30px;line-height:30px;color:#ff66b5;left:486px;top:137px;"},
		//{"id":"999","flow_id":"4","process_name":"结束","process_to":"","icon":"icon-star","style":"width:120px;height:30px;line-height:30px;color:#0e76a8;left:738px;top:472px;"}]};
		
		//processData是初始化Json流数据
		var processData = ${processData1};

		//jsondata是用于保存数据的json流数据
		jsondata=processData;
		//alert(processData.list[0].id);
		/*创建流程设计器*/
		var _canvas = $("#flowdesign_canvas")
				.Flowdesign(
						{
							"processData" : processData
							,
							canvasMenus : {
								"cmRefresh" : function(t) {
									location.reload();//_canvas.refresh();
								}
							}
							/*步骤右键*/
							,
							processMenus : {
								"pmDelete" : function(t) {
								var activeId = getActiveId();//右键当前的ID
								delProcess(activeId);
								for(var i=0;i<jsondata.nodes.length;i++)
						          {
						                if(activeId==jsondata.nodes[i].id)
						                {
						            	  jsondata.nodes.splice(i, 1);
							            }
						          }
							}
							},
							fnRepeat : function() {
								//alert("步骤连接重复1");//可使用 jquery ui 或其它方式提示
							mAlert("步骤连接重复了，请重新连接");
						}

						});
	});

	//以上为数据库提取数据生成流程图
	//+++++++++++++++++++++++++++++++++++++++
	//以下为增加节点数据Js函数
	var timeout = null;
	//增加节点的默认函数
	var defaults = {
		processData : {},//步骤节点数据
		//processUrl:'',//步骤节点数据
		fnRepeat : function() {
			alert("步骤连接重复");
		},
		fnClick : function() {

		},
		fnDbClick : function(event) {
			var activeId = getActiveId();//右键当前的ID  
		    //alert("window" + activeId);
			propWin(activeId);
	},
	canvasMenus : {
		"one" : function(t) {
			alert('画面右键');
		}
	},
	processMenus : {
		"one" : function(t) {
			alert('步骤右键');
		}
	},
	/*右键菜单样式*/
	menuStyle : {
		border : '1px solid #5a6377',
		minWidth : '150px',
		padding : '5px 0'
	},
	itemStyle : {
		fontFamily : 'verdana',
		color : '#333',
		border : '0',
		padding : '5px 40px 5px 20px'
	},
	itemHoverStyle : {
		border : '0',
		/*borderLeft:'5px solid #49afcd',*/
		color : '#fff',
		backgroundColor : '#5a6377'
	},
	mtAfterDrop : function(params) {
		//alert('连接成功后调用');
		//alert("连接："+params.sourceId +" -> "+ params.targetId);
	},
	//这是连接线路的绘画样式
		connectorPaintStyle : {
			lineWidth : 3,
			strokeStyle : "#49afcd",
			joinstyle : "round"
		},
		//鼠标经过样式
		connectorHoverStyle : {
			lineWidth : 3,
			strokeStyle : "#da4f49"
		}

	}
	//配置节点
	var initEndPoints = function() {
		$(".process-flag").each(function(i, e) {
			var p = $(e).parent();
			jsPlumb.makeSource($(e), {
				parent : p,
				anchor : "Continuous",
				endpoint : [ "Dot", {
					radius : 1
				} ],
				connector : [ "Flowchart", {
					stub : [ 5, 5 ]
				} ],
				connectorStyle : defaults.connectorPaintStyle,
				hoverPaintStyle : defaults.connectorHoverStyle,
				dragOptions : {},
				maxConnections : -1
			});
		});
	};
	
</script>



<div style="display: none;"></div>
<div style="display: none">
</div>
</body>
</html>