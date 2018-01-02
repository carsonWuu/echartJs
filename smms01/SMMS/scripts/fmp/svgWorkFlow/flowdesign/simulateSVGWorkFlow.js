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
  };
 
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
        _canvas.append('<input type="hidden" id="leipi_active_id" value="000"/><input type="hidden" id="leipi_copy_id" value="0"/>');
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
            //.html('<span class="process-flag badge '+badge+'" id="line_'+row.id+'"  style="float:left;margin-left:5px;margin-right:5px"><i class="'+icon+' icon-white"></i></span>' + "<span id='text_"+row.id+"' style='width:72px;float:left'>" + row.process_name+"</span>" )
            .mousedown(function(e){
              if( e.which == 3 ) { //右键绑定
                  _canvas.find('#leipi_active_id').val(row.id);
                  contextmenu.bindings = defaults.processMenus
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
	
    $(".process-step").on('click',function(){
        //激活
    	_canvas.find('#leipi_active_id').val($(this).attr("process_id")),
    	clearTimeout(timeout);
        var obj = this;
        //保存上个对象和样式
        var style=$(this).attr("style");
        SelectStyle(obj,style); 
        //alert($(this).attr("process_id"));
       // propWin($(this).attr("process_id"));
    }).on('dblclick',function(){

    });

    //使之可拖动
   // jsPlumb.draggable(jsPlumb.getSelector(".process-step"));
    initEndPoints();

    //绑定添加连接操作。画线-input text值  拒绝重复连接
   // jsPlumb.bind("jsPlumbConnection", function(info) {
    //    setConnections(info.connection)
   // });
    //绑定删除connection事件
    jsPlumb.bind("jsPlumbConnectionDetached", function(info) {
        setConnections(info.connection, true);
    });
    //绑定删除确认操作
    //jsPlumb.bind("click", function(c) {
    //    if(confirm("提示：进入路由条件Y，删除连接N"))
    //    {
        	//alert(c.sourceId+","+c.targetId);
     //   	proLine(c.sourceId,c.targetId);
     //   }
      //});
    //连接成功回调函数
    function mtAfterDrop(params)
    {
        //console.log(params)
        defaults.mtAfterDrop({sourceId:$("#"+params.sourceId).attr('process_id'),targetId:$("#"+params.targetId).attr('process_id')});
        
    }
    
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
            })
        });
    }//_canvas_design end reset 
    _canvas_design();
    return Flowdesign;
  };//$.fn
})(jQuery);

