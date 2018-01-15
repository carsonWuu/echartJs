/*
网流程设计器
 */

(function($) {
	var defaults = {
			processData:{},//步骤节点数据
			//processUrl:'',//步骤节点数据
			fnRepeat:function(){
				alert("步骤连接重复");
			},
			fnClick:function(){
				var activeId = getActiveId();//右键当前的ID  
				alert("角色"+activeId);
			},
			fnDbClick:function(){
				var activeId = getActiveId();//右键当前的ID
				if(confirm("你是否确定删除流程节点"))
				{
					delProcess(activeId);
				}
			},
			canvasMenus : {
				"one": function(t) {alert('画面右键')}
			},
			processMenus: {
				"one": function(t) {alert('步骤右键')}
			},
			/*右键菜单样式*/
			menuStyle: {
				border: '1px solid #5a6377',
				minWidth:'150px',
				padding:'5px 0'
			},
			itemStyle: {
				fontFamily : 'verdana',
				color: '#333',
				border: '0',
				/*borderLeft:'5px solid #fff',*/
				padding:'5px 40px 5px 20px'
			},
			itemHoverStyle: {
				border: '0',
				/*borderLeft:'5px solid #49afcd',*/
				color: '#fff',
				backgroundColor: '#5a6377'
			},
			mtAfterDrop:function(params){
				//alert('连接成功后调用');
				//alert("连接："+params.sourceId +" -> "+ params.targetId);
			},
			//这是连接线路的绘画样式
			connectorPaintStyle : {
				lineWidth:3,
				strokeStyle:"#49afcd",
				joinstyle:"round"
			},
			//鼠标经过样式
			connectorHoverStyle : {
				lineWidth:3,
				strokeStyle:"#da4f49"
			}

	};/*defaults end*/

	//jsPlumb工具的节点配置
	var initEndPoints = function(){
		$(".process-flag").each(function(i,e) {
			var p = $(e).parent();
			jsPlumb.makeSource($(e), {
				parent:p,
				anchor:"Continuous",
				endpoint:[ "Dot", { radius:1 } ],
				connector:[ "Flowchart", { stub:[5, 5] } ],
				connectorStyle:defaults.connectorPaintStyle,
				hoverPaintStyle:defaults.connectorHoverStyle,
				dragOptions:{},
				maxConnections:-1
			});
		});
	}

	/*设置隐藏域保存关系信息*/
	var aConnections = [];
	var setConnections = function(conn, remove) {
		if (!remove) aConnections.push(conn);
		else {
			var idx = -1;
			for (var i = 0; i < aConnections.length; i++) {
				if (aConnections[i] == conn) {
					idx = i; break;
				}
			}
			if (idx != -1) aConnections.splice(idx, 1);
		}
		if (aConnections.length > 0) {
			var s = "";
			for ( var j = 0; j < aConnections.length; j++ ) {
				var from = $('#'+aConnections[j].sourceId).attr('process_id');
				var target = $('#'+aConnections[j].targetId).attr('process_id');
				s = s + "<input type='hidden' value=\"" + from + "," + target + "\">";
			}
			$('#leipi_process_info').html(s);
		} else {
			$('#leipi_process_info').html('');
		}
		jsPlumb.repaintEverything();//重画
	};

	/*Flowdesign 命名纯粹为了美观，而不是 formDesign */
	$.fn.Flowdesign = function(options)
	{
		var _canvas = $(this);
		//右键步骤的步骤号
		_canvas.append('<input type="hidden" id="leipi_active_id"/><input type="hidden" id="leipi_copy_id" value="0"/>');
		_canvas.append('<div id="leipi_process_info"></div>');


		/*配置*/
		$.each(options, function(i, val) {
			if (typeof val == 'object' && defaults[i])
				$.extend(defaults[i], val);
			else 
				defaults[i] = val;
		});
		/*画布右键绑定*/
		var contextmenu = {
				bindings: defaults.canvasMenus,
				menuStyle : defaults.menuStyle,
				itemStyle : defaults.itemStyle,
				itemHoverStyle : defaults.itemHoverStyle
		}
		$(this).contextMenu('canvasMenu',contextmenu);

		jsPlumb.importDefaults({
			DragOptions : { cursor: 'pointer'},
			EndpointStyle : { fillStyle:'#225588' },
			Endpoint : [ "Dot", {radius:1} ],
			ConnectionOverlays : [
			                      [ "Arrow", { location:1 } ],
			                      [ "Label", {
			                    	  location:0.1,
			                    	  id:"label",
			                    	  cssClass:"aLabel"
			                      }]
			                      ],
			                      Anchor : 'Continuous',
			                      ConnectorZIndex:5,
			                      HoverPaintStyle:defaults.connectorHoverStyle
		});
		if( $.support.msie && $.support.version < '9.0' ){ //ie9以下，用VML画图
			jsPlumb.setRenderMode(jsPlumb.VML);
		} else { //其他浏览器用SVG
			jsPlumb.setRenderMode(jsPlumb.SVG);
		}


		//初始化原步骤
		var lastProcessId=0;
		//取得初始化的json流数据
		var processData = defaults.processData;
		if(processData.nodes)
		{
			$.each(processData.nodes, function(i,row) 
					{
				var nodeDiv = document.createElement('div');
				var nodeId = "window" + row.id, badge = 'badge-inverse',icon = 'icon-star';
				if(lastProcessId==0)//第一步
				{
					badge = 'badge-info';
					icon = 'icon-play';
				}
				if(row.icon)
				{
					icon = row.icon;
				}
				if(row.id=="000"||row.id=="999")
				{
					if(row.id=="000")
						badge = 'badge-info';
					else
						badge = 'badge-End';
					//配置通用节点数据
					$(nodeDiv).attr("id",nodeId)
					.attr("style",row.style)
					.attr("process_to",row.process_to)
					.attr("process_id",row.id)
					.addClass("process-step btn btn-small")
					.html('<span class="process-flag badge '+badge+'"><i class="'+icon+' icon-white"></i></span>&nbsp;' + "<span id='text_"+row.id+"' style='width:72px;'>" + row.process_name+"</span>" )
					//.html('<span class="process-flag badge '+badge+'" id="line_'+row.id+'"  style="float:left;margin-left:5px;margin-right:5px"><i class="'+icon+' icon-white"></i></span>' + "<span id='text_"+row.id+"' style='width:72px;float:left'>" + row.process_name+"</span>" )
					.mousedown(function(e){
						if( e.which == 3 ) { //右键绑定
							_canvas.find('#leipi_active_id').val(row.id);
							contextmenu.bindings = defaults.processMenus
							$(this).contextMenu('processMenu', contextmenu);
						}
					});
				}
				else
				{
					//配置通用节点数据
					$(nodeDiv).attr("id",nodeId)
					.attr("style",row.style)
					.attr("process_to",row.process_to)
					.attr("process_id",row.id)
					.addClass("process-step btn btn-small")
					//.html('<span class="process-flag badge '+badge+'"><i class="'+icon+' icon-white"></i></span>&nbsp;' + "<span id='text_"+row.id+"' style='width:72px;'>" + row.process_name+"</span>" )
					.html('<div class="process-flag badge '+badge+'" id="line_'+row.id+'"  style="margin-left:5px;margin-right:5px;cursor:pointer"><i class="'+icon+' icon-white"></i></div>' + "<div id='text_"+row.id+"' style='width:72px;cursor:pointer'>" + row.process_name+"</div>" )
					.mousedown(function(e){
						if( e.which == 3 ) { //右键绑定
							_canvas.find('#leipi_active_id').val(row.id);
							contextmenu.bindings = defaults.processMenus;
							$(this).contextMenu('processMenu', contextmenu);
						}
					});
				}
				_canvas.append(nodeDiv);
				//索引变量
				lastProcessId = row.id;
					});//each
		}

		var timeout = null;
		//点击或双击事件,这里进行了一个单击事件延迟，因为同时绑定了双击事件
		$(".process-step").bind('click',function(){

		});
		
		$(".process-step").on('dblclick',function(){
			var opMode=getQueryString("opMode");
			if(opMode!="view")
			{
				//双击打开节点页面
				_canvas.find('#leipi_active_id').val($(this).attr("process_id")),
				clearTimeout(timeout);
				var obj = this;
				//alert($(this).attr("process_id"));
				propWin($(this).attr("process_id"));
				// defaults.fnClick();
			}
		});
		//使之可拖动
		jsPlumb.draggable(jsPlumb.getSelector(".process-step"));
		initEndPoints();

		//绑定添加连接操作。画线-input text值  拒绝重复连接
		jsPlumb.bind("jsPlumbConnection", function(info) {
			setConnections(info.connection);
		});
		//绑定删除connection事件
		jsPlumb.bind("jsPlumbConnectionDetached", function(info) {
			setConnections(info.connection, true);
		});
		//绑定删除确认操作
		jsPlumb.bind("click", function(c) {
			var opMode=getQueryString("opMode");
			if(opMode!="view")
			{
			//设置计时器来区别单击还是是双击
			 if(clickTimer) {
		          window.clearTimeout(clickTimer);
		          clickTimer = null;
		      }
		      clickTimer = window.setTimeout(function(){
		           // your click process code here
		    	  proLine(c.sourceId,c.targetId);
		      }, 300);
			}
		});
		jsPlumb.bind("dblclick", function(c) {
			var opMode=getQueryString("opMode");
			if(opMode!="view")
			{
			 	if(clickTimer) {
		          window.clearTimeout(clickTimer);
		          clickTimer = null;
		        }
			     if(confirm("你确定删除连接？"))
				{
					jsPlumb.detach(c);
					del(c.sourceId,c.targetId);
				}
			}
		});
		//连接成功回调函数
		function mtAfterDrop(params)
		{
			//console.log(params)
			defaults.mtAfterDrop({sourceId:$("#"+params.sourceId).attr('process_id'),targetId:$("#"+params.targetId).attr('process_id')});

		}
		//节点之间的连接操作以及连接判定
		jsPlumb.makeTarget(jsPlumb.getSelector(".process-step"), {
			dropOptions:{ hoverClass:"hover", activeClass:"active" },
			anchor:"Continuous",
			maxConnections:-1,
			endpoint:[ "Dot", { radius:1 } ],
			paintStyle:{ fillStyle:"#ec912a",radius:1 },
			hoverPaintStyle:this.connectorHoverStyle,
			beforeDrop:function(params){
				if(params.sourceId == params.targetId) 
					return false;/*不能链接自己*/
				if(params.sourceId=='window000'&&params.targetId=='window999')
				{
					// alert("开始不能指向结束");
					showMessage("MSG0010");
					return false;
				}
				if(params.sourceId=='window999'&&params.targetId=='window000')
				{
					//alert("结束不能指向开始");
					showMessage("MSG0101");
					return false
				}
				if(params.targetId=="window000")
				{
					//alert("流程不能指向开始节点");
					showMessage("MSG0011");
					return false;
				}
				if(params.sourceId=="window999")
				{
					//alert("结束节点不能指向流程节点");
					showMessage("MSG0012");
					return false;
				}
				//通过连接判定后，向jsondata增加节点数据
				var FLOWTEMPID=getQueryString("FLOWTEMPID");
				var fromarr = params.sourceId.split("window");
				var toarr=params.targetId.split("window");
				//配置线的数据，向jsondata增加线数据
				var LINK_ID=getUID_svg();
				var newlines={
						"ROUTECONDITION":"",
						"CREATORID":"admin",
						"RID":"8504c24969204805887b3ce9a8d01e64",
						"CREATTIME":"2016-06-15 16:59:10",
						"TONODE":toarr[1],
						"LINKID":LINK_ID,
						"FROMNODE":fromarr[1],
						"FLOWTEMPID":FLOWTEMPID};
				jsondata.lines.push(newlines);
				var j = 0;
				$('#leipi_process_info').find('input').each(function(i){
					var str = $('#' + params.sourceId).attr('process_id') + ',' + $('#' + params.targetId).attr('process_id');
					if(str == $(this).val()){
						j++;
						return;
					}
				});
				if( j > 0 ){
					// defaults.fnRepeat();
					alert("步骤连接重复");
					return false;
				} else {
					mtAfterDrop(params);
					return true;
				}
			}
		});
		//reset  start
		var _canvas_design = function(){

			//连接关联的步骤
			$('.process-step').each(function(i){
				var sourceId = $(this).attr('process_id');
				//var nodeId = "window"+id;
				var prcsto = $(this).attr('process_to');
				var toArr = prcsto.split(",");
				var processData = defaults.processData;
				$.each(toArr,function(j,targetId){

					if(targetId!='' && targetId!=0){
						//检查 source 和 target是否存在
						var is_source = false,is_target = false;
						$.each(processData.nodes, function(i,row) 
								{
							if(row.id == sourceId)
							{
								is_source = true;
							}else if(row.id == targetId)
							{
								is_target = true;
							}
							if(is_source && is_target)
								return true;
								});

						if(is_source && is_target)
						{
							jsPlumb.connect({
								source:"window"+sourceId, 
								target:"window"+targetId
								/* ,labelStyle : { cssClass:"component label" }
                            ,label : id +" - "+ n*/
							});
							return ;
						}
					}
				});
			});
		}//_canvas_design end reset 
		_canvas_design();

//		-----外部调用----------------------
		//return Flowdesign;


	}//$.fn
})(jQuery);
//删除函数，注意只是删除隐藏域的数据，线需要手动删除
function delProcess(activeId) {
	if (activeId <= 0)
		return false;
	for(var i=jsondata.lines.length-1;i>=0;i--)
	{
		if(jsondata.lines[i].FROMNODE==activeId || jsondata.lines[i].TONODE==activeId)
		{		
			//jsPlumb.remove(1,2);
//			alert(jsondata.lines[i].FROMNODE);
//			alert(jsondata.lines[i].TONODE);
			//del(jsondata.lines[i].FROMNODE,jsondata.lines[i].TONODE);
			//alert(i);
			//jsondata.lines.splice(i, 1);
			showMessage("请先删除节点对应的连线，再删除节点！","","error");
			return false;
		}
	}	
	
	var g = null;
	var s = document.getElementById("leipi_process_info").getElementsByTagName("input");
	$("#window" + activeId).remove();
	for ( var i = 0; i < s.length; i++) {
		var ts = s[i].value;
		var arr = ts.split(',');
		if (arr[0] == activeId || arr[1] == activeId) {
			$(s[i]).remove();
			i--;
		}
	}
	return true;
}
//获得目标节点
function getActiveId() {
	var _canvas = $("#flowdesign_canvas");
	return _canvas.find("#leipi_active_id").val();
}
//保存操作
function saveflow() {
	var flow_id=getQueryString("FLOWTEMPID");
	var a = document.getElementsByTagName("div");
	//遍历当前所有的节点ID，找到他们对应的位置，改写json流中的数据
	for ( var i = 0; i < a.length; i++) {
		var ary = a[i].id.split("window");
		if (ary.length > 1)
		{
			var obj=document.getElementById(a[i].id);
			var top=$(obj).css('top');
			var left=$(obj).css('left'); 
			var topa=top.split("px");
			var lefta=left.split("px");
			// alert(topa[0]+","+lefta[0]);
			for(var s=0;s<jsondata.nodes.length;s++)
			{
				if(ary[1]==jsondata.nodes[s].id)
				{
					jsondata.nodes[s].POSTTOP=topa[0];
					jsondata.nodes[s].POSTLEFT=lefta[0];
				}
			}
		}
	}
	//把json流的数据送到后台进行保存操作
	//alert (JSON.stringify(jsondata));
	var url =rootPath+"/fmp/workflow/WorkFlowBiz/SaveWorkFlow";
	//$("#test").val(JSON.stringify(jsondata));
	XMLHttp.urlSubmit(fmpEncodeURI(url),callBackSave,"workFlow="+JSON.stringify(jsondata));
	function  callBackSave(msg){
		//取得消息并且刷新页面
		showMessage(msg);
		this.document.location.reload();
	}
}
//获得url参数
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}
//var processData=${processData};
function propWin(activeId){  
	//遍历json流，存在节点的话，打开相应的节点页面并从json流赋值数据
	for(var i=0;i<jsondata.nodes.length;i++)
	{
		if(activeId==jsondata.nodes[i].id)
		{	
			var dataObject = new Object(); 
			dataObject=jsondata.nodes[i];
			document.getElementById("text_"+activeId).innerHTML=jsondata.nodes[i].NODENAME;
			var url=rootPath+"/fmp/workflow/WorkFlowBiz/ShowWorkFlowPropNodeWin";
			openModalDialog(url,dataObject,'dialogWidth:460px;dialogHeight:480px;scroll:no');
			//回调函数，把修改过的节点名称显示到编辑页面上
			dataObject.backCall=function(obj){
				document.getElementById("text_"+activeId).innerHTML=obj.process_name;
				//alert("window"+activeId);
				var obj=document.getElementById("window"+activeId);
				var height=$(obj).css('height');
				var heightarr=height.split("px");
				//alert(heightarr[0]);SS
			};
		}
	}
}

//打开关联线页面
function proLine(sourceId,targetId)
{
	var sary = sourceId.split("window");
	var tary = targetId.split("window");
	// alert(sary[1]+","+tary[1]);
	//遍历Json流，把对应的线数据赋值到线页面上
	for(var i=0;i<jsondata.lines.length;i++)
	{
		if(sary[1]==jsondata.lines[i].FROMNODE&&tary[1]==jsondata.lines[i].TONODE)
		{
			var url=rootPath+"/fmp/workflow/WorkFlowBiz/ShowWorkFlowPropLineWin?FLOWTEMPID="+jsondata.lines[i].FLOWTEMPID;
			openModalDialog(url,jsondata.lines[i],'dialogWidth:800;dialogHeight:500;scroll:no');
			//alert("1");
		}
	}
}
//删除函数，当页面删除线之后，同时删除json流里面对应的线数据
function del(sourceId,targetId)
{
	var sary = sourceId.split("window");
	var tary = targetId.split("window");
	for(var i=0;i<jsondata.lines.length;i++)
	{
		if(sary[1]==jsondata.lines[i].FROMNODE&&tary[1]==jsondata.lines[i].TONODE)
		{
			// delete jsondata.lines[i];
			jsondata.lines.splice(i, 1);
		}
	}
}
function _click(){
    if(clickTimer) {
        window.clearTimeout(clickTimer);
        clickTimer = null;
    }
    
    clickTimer = window.setTimeout(function(){
         // your click process code here
         alert("你单击了我");
    }, 300);
}

 function _dblclick(){
    if(clickTimer) {
        window.clearTimeout(clickTimer);
        clickTimer = null;
    }
    
   // your click process code here
   alert("你双击了我");
}
//开始节点
function Startnode() {
	if (document.getElementById('window000')) {
		//alert("已经存在开始节点");
		showMessage("MSG0014");
	} else {
		var row = {
				"id" : "000",
				"flow_id" : "4",
				"process_name" : "开始",
				"process_to" : "",
				"icon" : "icon-ok",
				"style" : "background:#d9ffa3;width:70px;height:25px;line-height:25px;color:#0e76a8;left:193px;top:132px;"
		};
		var k = addProcess(row);
	}
}
//结束节点
function Endnode() {
	if (document.getElementById('window999')) {
		//alert("已经存在结束节点");
		showMessage("MSG0015");
	} else {
		var row = {
				"id" : "999",
				"flow_id" : "4",
				"process_name" : "结束",
				"process_to" : "",
				"icon" : "icon-ok",
				"style" : "background:#d9ffa3;width:70px;height:25px;line-height:25px;color:#0e76a8;left:193px;top:132px;"
		};
		var k = addProcess(row);
	}
}
//随机产生节点ID
function getUID_svg() {    
	var S4 = function() {       
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);    
	};    
	return (S4()+S4()+S4());
}
//配置流程节点数据
function flownode() {
	var i = getUID_svg();
	var row = {
			"id" : i,
			"flow_id" : "4",
			"process_name" : "流程",
			"process_to" : "",
			"icon" : "icon-user",
			"style" : "background:yellow;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:7px;color:#0e76a8;left:193px;top:132px;"
	};
	var k = addProcess(row);
}
//计算字节数
function lenfor(str)
{
	var byteLen=0;
	var len=str.length;
	if(str){
		for(var i=0; i<len; i++)
		{
			if(str.charCodeAt(i)>255)
			{
				byteLen += 2;
			}
			else{
				byteLen++;
			}
		}
		return byteLen;
	}
	else
	{
		return 0;
	}
}
//通用增加函数
function addProcess(row) {
	var _canvas = $("#flowdesign_canvas");

	/*
	if (row.id <= 0) {
		return false;
	}
	*/
	//配置通用的节点数据
	var nodeDiv = document.createElement('div');
	var nodeId = "window" + row.id, badge = 'badge-inverse', icon = 'icon-star';
	var contextmenu = {
			bindings : defaults.canvasMenus,
			menuStyle : defaults.menuStyle,
			itemStyle : defaults.itemStyle,
			itemHoverStyle : defaults.itemHoverStyle
	};
	if (row.icon) {
		icon = row.icon;
	}
	if(row.id=="000"||row.id=="999")
	{
		if(row.id=="000")
			badge = 'badge-info';
		else
			badge = 'badge-End';
		$(nodeDiv).attr("id", nodeId).attr("style", row.style).attr(
				"process_to", row.process_to).attr("process_id", row.id)
				.addClass("process-step btn btn-small")
				.html('<span class="process-flag badge '+badge+'"><i class="'+icon+' icon-white"></i></span>&nbsp;' + "<span id='text_"+row.id+"'>" + row.process_name+"</span>" )
				.mousedown(function(e) {
					if (e.which == 3) { //右键绑定，把目标ID暂时保存起来
						_canvas.find('#leipi_active_id').val(row.id);
						contextmenu.bindings = defaults.processMenus
						$(this).contextMenu('processMenu', contextmenu);
					}
					if (e.which == 1) { //左键绑定，把目标ID暂时保存起来
						_canvas.find('#leipi_active_id').val(row.id);
					}
				});
	}
	else
	{
		$(nodeDiv).attr("id", nodeId).attr("style", row.style).attr(
				"process_to", row.process_to).attr("process_id", row.id)
				.addClass("process-step btn btn-small")
				.html('<div class="process-flag badge '+badge+'" id="line_'+row.id+'"  style="margin-left:5px;margin-right:5px;cursor:pointer"><i class="'+icon+' icon-white"></i></div>' + "<div id='text_"+row.id+"' style='width:72px;cursor:pointer'>" + row.process_name+"</div>" )
				.mousedown(function(e) {
					if (e.which == 3) { //右键绑定，把目标ID暂时保存起来
						_canvas.find('#leipi_active_id').val(row.id);
						contextmenu.bindings = defaults.processMenus
						$(this).contextMenu('processMenu', contextmenu);
					}
					if (e.which == 1) { //左键绑定，把目标ID暂时保存起来
						_canvas.find('#leipi_active_id').val(row.id);
					}
				});
	}
	_canvas.append(nodeDiv);
	//使之可拖动 和 连线
	jsPlumb.draggable(jsPlumb.getSelector(".process-step"));
	initEndPoints();
	//使可以连接线
	jsPlumb.makeTarget(jsPlumb.getSelector(".process-step"), {
		dropOptions : {
		hoverClass : "hover",
		activeClass : "active"
	},
	anchor : "Continuous",
	maxConnections : -1,
	endpoint : [ "Dot", {
		radius : 1
	} ],
	paintStyle : {
		fillStyle : "#ec912a",
		radius : 1
	},
	hoverPaintStyle : this.connectorHoverStyle,
	beforeDrop : function(params) {
		if (params.sourceId == params.targetId)
			return false;/*不能链接自己*/
		if (params.sourceId == 'window000'
			&& params.targetId == 'window999') {
			//alert("开始不能指向结束");
			showMessage("MSG0010");
			return false;
		}
		if (params.sourceId == 'window999'
			&& params.targetId == 'window000') {
			//alert("结束不能指向开始");
			showMessage("MSG0101");
			return false
		}
		if (params.targetId == "window000") {
			//alert("流程不能指向开始节点");
			showMessage("MSG0011");
			return false;
		}
		if (params.sourceId == "window999") {
			//alert("结束节点不能指向流程节点");
			showMessage("MSG0012");
			return false;
		}
		//通过连接判定后，向jsondata增加节点数据
		var FLOWTEMPID=getQueryString("FLOWTEMPID");
		var fromarr = params.sourceId.split("window");
		var toarr=params.targetId.split("window");
		var LINK_ID=getUID_svg();
		var newlines={
				"ROUTECONDITION":"",
				"CREATORID":"admin",
				"RID":"8504c24969204805887b3ce9a8d01e64",
				"CREATTIME":"2016-06-15 16:59:10",
				"TONODE":toarr[1],
				"LINKID":LINK_ID,
				"FROMNODE":fromarr[1],
				"FLOWTEMPID":FLOWTEMPID};
		jsondata.lines.push(newlines);
		var j = 0;
		$('#leipi_process_info').find('input').each(
				function(i) {
					var str = $('#' + params.sourceId).attr(
					'process_id')
					+ ','
					+ $('#' + params.targetId).attr(
					'process_id');
					if (str == $(this).val()) {
						j++;
						return;
					}
				});
		if (j > 0) {
			defaults.fnRepeat();
			return false;
		} else {
			return true;
		}
	}
	});
	//绑定删除操作
	$("#pmDelete").click(function() {
		var _canvas = $("#flowdesign_canvas");
		var activeId = getActiveId();//右键当前的ID
		delProcess(activeId);
		for(var i=0;i<jsondata.nodes.length;i++)
		{
			if(activeId==jsondata.nodes[i].id)
			{
				jsondata.nodes.splice(i, 1);
			}
		}
	});

	var timeout = null;
	//双击事件
	var aryid = "#window" + row.id;
	$(aryid).on('dblclick', function() {
		defaults.fnDbClick();
	});
	var FLOWTEMPID=getQueryString("FLOWTEMPID");
	//配置新的节点数据保存在JSON流里面
	var nodetype="1";
	if(row.id=="000")
	{
		nodetype="0";
	}else if(row.id=="999")
	{
		nodetype="2";
	}
	var newnode={
			"NODEBIZTYPE":"",
			"CREATORID":"",
			"SMSTEMPCODE":"",
			"PASSRATE":0,
			"NODEID":row.id,
			"ORGNAMESET":"",
			"DEPTDEFINE":"",
			"FLOWTEMPID":FLOWTEMPID,
			"id":row.id,
			"POSTDEFINE":"",
			"style":"width:121px;height:41px;line-height:41px;color:#0e76a8;left:133px;top:138px",
			"ORGEXTSET":"",
			"process_to":"",
			"ORGDEFINE":"",
			"icon":row.icon,
			"SMSSENDCOND":"",
			"DEPTNAMESET":"",
			"TRANSACTDAYS":"",
			"NODETYPE":nodetype,
			"process_name":row.process_name,
			"DEPTEXTSET":"",
			"NODEDESC":"",
			"POSTTOP":138,
			"NODENAME":row.process_name,
			"ISCONDICONFIRM":"",
			"flow_id":FLOWTEMPID,
			"ISCHECKCONDITION":"",
			"ISLASTREJECT":"",
			"CREATTIME":"",
			"POSTLEFT":133,
			"POSTNAMESET":""};
	jsondata.nodes.push(newnode);
	return true;

}