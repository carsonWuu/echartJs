<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ page import="com.zstar.fmp.core.base.FMPContex"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.HashSet"%>
<%@ page import="java.util.Set"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>WEB流程图模拟器</title>
<%
	String rootPath = request.getContextPath();
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="author" content="bayu">
<link rel="stylesheet" href="<%=rootPath%>/styles/fmp/bootstrap/menu/style.css" media="screen" type="text/css" />
 <link rel="stylesheet" href="<%=rootPath%>/styles/fmp/bootstrap/menu/font-awesome.css" media="screen" type="text/css" />
<link href="<%=rootPath%>/styles/fmp/bootstrap/css/bootstrap.css"
	rel="stylesheet" type="text/css" />
	
<link href="<%=rootPath%>/styles/fmp/bootstrap/css/button.css"
	rel="stylesheet" type="text/css" />
<!--[if lte IE 6]>
    <link rel="stylesheet" type="text/css" href="<%=rootPath%>/styles/fmp/bootstrap/css/bootstrap-ie6.css">
    <![endif]-->
<!--[if lte IE 7]>
    <link rel="stylesheet" type="text/css" href="<%=rootPath%>/styles/fmp/bootstrap/css/ie.css">
    <![endif]-->
<link href="<%=rootPath%>/styles/fmp/site.css" rel="stylesheet"
	type="text/css" />

<jsp:include page="/WEB-INF/jsp/fmp/frame/common/partialJsp/headinclude.jsp" />
<script type="text/javascript">
        var _root='http://flowdesign.leipi.org/index.php?s=/',_controller = 'flowdesign';
</script>
	  

<link rel="stylesheet" type="text/css"
	href="<%=rootPath%>/scripts/fmp/svgWorkFlow/flowdesign/flowdesign.css" />

<!--select 2-->
<link rel="stylesheet" type="text/css"
	href="<%=rootPath%>/scripts/fmp/svgWorkFlow/jquery.multiselect2side/css/jquery.multiselect2side.css" />

<style> 
        .black_overlay{ 
            display: none; 
            position: absolute; 
            top: 0%; 
            left: 0%; 
            width: 100%; 
            height: 100%; 
            background-color: black; 
            z-index:1001; 
            -moz-opacity: 0.8; 
            opacity:.80; 
            filter: alpha(opacity=88); 
        } 
        .white_content { 
            display: none; 
            position: absolute; 
            top: 25%; 
            left: 25%; 
            width: 45%; 
            height: 30%; 
            padding: 20px; 
            border: 10px solid orange; 
            background-color: white; 
            z-index:1002; 
            overflow: auto; 
        } 
    </style> 
</head>
<body>
<script language="JavaScript">
if('${opMode}' == "simul")
{
	//alert('1');
}
//选择测试实例
function openInstancePop(){
	var tableModelId = $('#bizTableModelId').val();
	if(tableModelId == ''){
		showMessage("MSG0088");//请先选择业务类型！
		return;
	}
	var dataObject = new Object();
	dataObject.sid= "RID";
	dataObject.sname= null;
	dataObject.trueValue= null;
	dataObject.dispValue= null;
	var url=rootPath+"/fmp/FrameCommonBiz/DoPopList?popMode=singleVPop&tableModelId="+tableModelId;
	openModalDialog(url,dataObject, "scroll:no; center:yes; resizable:yes; dialogWidth:800px; dialogLeft:200px; dialogHeight:600px");
	if(dataObject.trueValue !=null){
		//document.getElementById('bizRid').value = "01689816966048739cabccfe1b616d34";
	  document.getElementById('bizRid').value=dataObject.trueValue;
	}
}
//确定测试实例，生成json流
function makeSure(){
	var bizTableModelId = $('#bizTableModelId').val();
	var bizRid = $('#bizRid').val();
	if(bizTableModelId == ''){
		showMessage("MSG0088");//请先选择流程类型！
		return;
	}
	if(bizRid == ''){
		showMessage("MSG0089");//请先选择测试实例！
		return;
	}
	
	var parmaeterObj = getDataListObj('${PARAMETERSQL}','RID='+bizRid);
	parmaeterStr=JSON.stringify(parmaeterObj);
	document.getElementById('light').style.display='none';
	document.getElementById('fade').style.display='none';
	//wf.signNode(currNodeId);
	//nodeIdArray.push('000');  //存放开始节点
}
</script>

<ul id="breadcrumb">
  <li><a href="javascript:void(0)" onclick="closeWindow()"><span class="icon icon-home"> </span>返回上层页面</a></li>
  <li><a href="javascript:void(0)" onclick = "document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block'"><span class="icon icon-ok"> </span> 设置参数</a></li>
  <li><a href="javascript:void(0)" onclick="GoNext()"><span class="icon icon-ok"></span> 下一步</a></li>
  <li><a href="javascript:void(0)" onclick="GoBack()"><span class="icon icon-save"> </span> 还原</a></li>
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
<div class="modal-footer" style="padding: 5px;"><a
	href="http://www.leipi.org" target="_blank"><img
	src="http://www.leipi.org/wp-content/themes/leipi/images/leipi.png"
	alt="" style="width: 40px"></a> <!--a href="#" class="btn btn-danger" data-dismiss="modal" aria-hidden="true"><i class="icon-remove icon-white"></i></a-->
</div>
</div>



<!--contextmenu div-->
<div id="processMenu" style="display: none;">
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
<div id="light" class="white_content">
          <div id=selectSub>
				<table>
					<tr>
						<td>业务类型：</td>
						<td><select class="x-form-field" id="bizTableModelId">
								<option value="">- - 请选择 - -</option>								
							<%
								Map biztypeMap = FMPContex.getDicTypeMap("CRD_BIZTYPE",null);
									 Set<String> set = new HashSet<String>();
								  	 set= biztypeMap.keySet();
								 	 for (String key : set) {
							%>
								  <option value="<%=key %>" ><%=biztypeMap.get(key) %></option>
							<% 
								 	 }
							%>
							</select>
						</td>
					</tr>
					<tr>
						<td>测试实例：</td>
						<td>
						<input class="x-form-field" type="text" id="bizRid" value=""/>
						<button id="" class="btn" onclick="openInstancePop()">...</button>
						</td>
					</tr>
				</table>
			</div>
            <button class="button_svg button-rounded button-tiny" onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'">[取消]</button> 
	      <button class="button_svg button-rounded button-tiny" onclick="makeSure();">[确定]</button>
        
        </div> 
        <div id="fade" class="black_overlay"></div> 


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
	src="<%=rootPath%>/scripts/fmp/svgWorkFlow/flowdesign/simulateSVGWorkFlow.js"
	charset="utf-8"></script>
<script type="text/javascript">
	var the_flow_id = '4';
	function callbackSuperDialog(selectValue) {
		var aResult = selectValue.split('@leipi@');
		$('#' + window._viewField).val(aResult[0]);
		$('#' + window._hidField).val(aResult[1]);
		//document.getElementById(window._hidField).value = aResult[1];

	}

    var jsondata=null;
	var lastobj=null;
	var lastStyle=null;
	var parmaeterStr="";
	var num=null;
	var currNodeId=null;//当前节点
	var lastNodeId=null;//下个节点
	var startport=null;//起始节点
	var startstyle=null;//起始样式
	var lastNum=null;
	var nodeIdArray = new Array();
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
		//上次对象、样式
		var processData = ${processData1};
		jsondata=processData;
		for(var i=0;i<jsondata.nodes.length;i++)
		{
	    	if("000"==jsondata.nodes[i].id)
	    	{
	    		currNodeId=jsondata.nodes[i].process_to;
	    		startport=jsondata.nodes[i].process_to;
				break;
	    	}
		}
		for(var i=0;i<jsondata.nodes.length;i++)
		{
			if(currNodeId==jsondata.nodes[i].id)
			{
	    		startstyle=jsondata.nodes[i].style;//保存样式
				jsondata.nodes[i].style=jsondata.nodes[i].style+";border:solid 3px red;";
				break;
			}
		}
		//alert(processData.list[0].id);
		/*创建流程设计器*/
		var _canvas = $("#flowdesign_canvas")
				.Flowdesign(
						{
							"processData" : processData
							/*,mtAfterDrop:function(params)
							{
							    //alert("连接："+params.sourceId +" -> "+ params.targetId);
							}*/
							/*画面右键*/
							,
							canvasMenus : {
								"cmRefresh" : function(t) {
									location.reload();//_canvas.refresh();
								},
								/*"cmPaste": function(t) {
								    var pasteId = _canvas.paste();//右键当前的ID
								    if(pasteId<=0)
								    {
								      alert("你未复制任何步骤");
								      return ;
								    }
								    alert("粘贴:" + pasteId);
								},*/
								"cmHelp" : function(t) {
									mAlert(
											'__tag_316$36_<li>__tag_316$44_流程设计器 开发文档__tag_316$117_</li>__tag_316$126_<a href="http://formdesign.leipi.org/doc.html" target="_blank">表单设计器 开发文档__tag_316$203_</li>__tag_316$212_<a href="http://formdesign.leipi.org/demo.html" target="_blank">表单设计器 示例DEMO__tag_316$292_</li>__tag_316$301_',
											20000);
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
							},
							"pmAttribute" : function(t) {
								/*重要提示 start*/
								var activeId = getActiveId();//右键当前的ID  
								alert("属性" + activeId);
							},
							"pmForm" : function(t) {
								var activeId = _canvas.getActiveId();//右键当前的ID

								/*重要提示 start*/
								alert("这里使用ajax提交，请参考官网示例，可使用Fiddler软件抓包获取返回格式");
								/*重要提示 end */

								var url = "/index.php?s=/Flowdesign/attribute/op/form/id/"
										+ activeId + ".html";
								ajaxModal(url, function() {
									//alert('加载完成执行')
									});
							},
							"pmJudge" : function(t) {
								var activeId = _canvas.getActiveId();//右键当前的ID

								/*重要提示 start*/
								alert("这里使用ajax提交，请参考官网示例，可使用Fiddler软件抓包获取返回格式");
								/*重要提示 end */

								var url = "/index.php?s=/Flowdesign/attribute/op/judge/id/"
										+ activeId + ".html";
								ajaxModal(url, function() {
									//alert('加载完成执行')
									});
							},
							"pmSetting" : function(t) {
								var activeId = _canvas.getActiveId();//右键当前的ID

								/*重要提示 start*/
								alert("这里要使用程序处理，并非简单html页面，如果无法显示，请建立虚拟站点");
								/*重要提示 end */

								//var url = "/index.php?s=/Flowdesign/attribute/op/style/id/"+activeId+".html";
								var url = 'Public/js/flowdesign/attribute.html?id=' + activeId;
								ajaxModal(url, function() {
									//alert('加载完成执行')
									});
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
	
	//获得目标节点
	function getActiveId() {
		var _canvas = $("#flowdesign_canvas");
		return _canvas.find("#leipi_active_id").val();
	}
	//设置选择当前节点的时候，只显示目标节点的边缘为红框
	function SelectStyle(obj,style)
	{
		 nodeIdArray.length=0;
		 var activeId=getActiveId();
		 for(var i=0;i<jsondata.nodes.length;i++)
         {
             if(activeId==jsondata.nodes[i].id)
             {
                 num=i;
                 document.getElementById("window"+activeId).setAttribute("style",jsondata.nodes[i].style+";border:solid 3px red;");
             }
             else
             {
            	 document.getElementById("window"+jsondata.nodes[i].id).setAttribute("style",jsondata.nodes[i].style);
             }
         }
		 currNodeId=activeId;

	}
	//获得URL参数
	function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
	//下一步功能的实现
	function GoNext()
	{
		if(parmaeterStr==""||parmaeterStr==null)
		{
			//alert("先设置参数");
			showMessage("MSG0018");
		}
		else
		{
		var FLOWTEMPID=getQueryString("FLOWTEMPID");
		//取得目标节点为开始节点
  		if(currNodeId==null)
  		{
		  currNodeId =getActiveId();
  		}

		if(parmaeterStr != ""){
			var url=rootPath+"/fmp/workflow/WorkFlowBiz/SimulateWorkFlowRun?parmaeterStr="+parmaeterStr
			+"&FLOWTEMPID="+FLOWTEMPID
			+"&FROMNODE="+currNodeId;
			XMLHttp.urlSubmit(url,null);
			var rtMsg =XMLHttp.message;
			if(rtMsg.indexOf("Error")>-1){ //获取不到下一节点，直接弹出错误信息
				showMessage("MSG0096");
			}else{			//获取到下一节点
				if(rtMsg == '999'){
					showMessage("MSG0017");//流程流转结束！
				}else{
					//移除当前样式
					//alert(rtMsg);
					 for(var i=0;i<jsondata.nodes.length;i++)
	                {
	                 if(currNodeId==jsondata.nodes[i].id)
	                 {
	                	 lastNum=i;
	                 }
	                }
		             if(currNodeId==startport)
		             {
		            	 document.getElementById("window"+currNodeId).setAttribute("style",startstyle);
			         }else
			         {
					 	document.getElementById("window"+currNodeId).setAttribute("style",jsondata.nodes[lastNum].style);
			         }
					 var nextstyle=null;
					 for(var i=0;i<jsondata.nodes.length;i++)
			         {
			             if(rtMsg==jsondata.nodes[i].id)
			             {
			            	 nextstyle=jsondata.nodes[i].style;
			            	 num=i;
			             }
			         }
			        //下个节点样式附加
					document.getElementById("window"+rtMsg).setAttribute("style",nextstyle+";border:solid 3px red;");
					lastNodeId=currNodeId;
					nodeIdArray.push(currNodeId); //存放流转过的节点
					currNodeId = rtMsg; //将获取的下一节点赋给当前节点
				}
			}
		  }
		}
	}
	//还原功能的实现
	function GoBack()
	{
		//获得列表最后一个ID,lastNum为节点在json中的序号
		var lastNodeId= nodeIdArray.pop();

		//如果最后一个ID为开始节点，则停止移动并显示结果
		if(lastNodeId == '000'){
			 for(var i=0;i<jsondata.nodes.length;i++)
	         {
	             if(currNodeId==jsondata.nodes[i].id)
	             {
	            	 lastNum=i;
	             }
	         }
			document.getElementById("window"+currNodeId).setAttribute("style",jsondata.nodes[lastNum].style);
            //给上个节点附加样式
             for(var i=0;i<jsondata.nodes.length;i++)
	         {
	             if(lastNodeId==jsondata.nodes[i].id)
	             {
	            	 lastNum=i;
	             }
	         }
             document.getElementById("window"+lastNodeId).setAttribute("style",jsondata.nodes[lastNum].style+";border:solid 3px red;");
             currNodeId = lastNodeId;
			 showMessage("MSG0019");//已经还原到第一个节点！
		}else{
			//移除样式
			 for(var i=0;i<jsondata.nodes.length;i++)
	         {
	             if(currNodeId==jsondata.nodes[i].id)
	             {
	            	 lastNum=i;
	             }
	         }
			document.getElementById("window"+currNodeId).setAttribute("style",jsondata.nodes[lastNum].style);
            //给上个节点附加样式
             for(var i=0;i<jsondata.nodes.length;i++)
	         {
	             if(lastNodeId==jsondata.nodes[i].id)
	             {
	            	 lastNum=i;
	             }
	         }
             document.getElementById("window"+lastNodeId).setAttribute("style",jsondata.nodes[lastNum].style+";border:solid 3px red;");
			 currNodeId = lastNodeId;
		}
	}
</script>



<div style="display: none;"></div>
<div style="display: none"><script type="text/javascript">
	var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://"
			: " http://");
	document
			.write(unescape("%3Cscript src='"
					+ _bdhmProtocol
					+ "hm.baidu.com/h.js%3F1e6fd3a46a5046661159c6bf55aad1cf' type='text/javascript'%3E%3C/script%3E"));
</script></div>
</body>
</html>